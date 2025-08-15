import { useEffect, useRef } from "react";

/** The palette buckets we render */
type TimeOfDay = "morning" | "afternoon" | "sunset" | "night";
type WeatherType = "storm" | "rain" | "snow" | "mist" | "clear" | "clouds";

export interface WeatherSceneProps {
  /** OpenWeather condition code (e.g., 212, 602, 800, …) */
  code: number;

  /** OpenWeather (root) timezone offset in seconds (e.g., apiData.timezone_offset) */
  timezoneOffset?: number;

  /** OpenWeather current.dt (UNIX seconds, UTC) */
  dt?: number;

  /** OpenWeather current.sunrise (UNIX seconds, UTC) */
  sunrise?: number;

  /** OpenWeather current.sunset (UNIX seconds, UTC) */
  sunset?: number;

  /** Optional: manually force a palette; if provided, this overrides astronomical calc */
  overrideTimeOfDay?: TimeOfDay;

  /** Optional: make canvas fill its parent instead of the full window height */
  fillParent?: boolean;

  className?: string;
}

/* -------------------------- Weather classification ------------------------- */

function classifyWeather(c: number): WeatherType {
  if (c >= 200 && c < 300) return "storm";
  if (c >= 300 && c < 600) return "rain"; // drizzle + most rain
  if (c === 511) return "rain"; // freezing rain (customize later)
  if (c >= 600 && c < 700) return "snow";
  if (c >= 700 && c < 800) return "mist";
  if (c === 800) return "clear";
  if (c >= 801 && c <= 804) return "clouds";
  return "clear";
}

/* ---------------------------- Time-of-day palette --------------------------- */

function getGradientColors(tod: TimeOfDay): [string, string] {
  const skies: Record<TimeOfDay, [string, string]> = {
    morning: ["#4facfe", "#00f2fe"], // fresh blue
    afternoon: ["#2193b0", "#6dd5ed"], // bright blue
    sunset: ["#ff8a65", "#4e342e"], // orange to deep dusk
    night: ["#0f2027", "#203a43"], // dark blues
  };
  return skies[tod];
}

/** Solid sky color used by both canvas and CSS variable */
function getSkyColor(tod: TimeOfDay, type: WeatherType): string {
  const isNight = tod === "night";

  const NIGHT: Record<WeatherType, string> = {
    clear: "#0b1020", // deep blue-black
    clouds: "#111827", // very dark slate
    mist: "#0f172a", // inky blue-gray
    storm: "#0a0f14", // almost black
    rain: "#0a0f14",
    snow: "#0b1725", // cold dark blue
  };

  const DAY: Partial<Record<WeatherType, string>> = {
    storm: "#263238",
    clouds: "#cfd8dc",
    mist: "#b0bec5",
  };

  if (isNight) return NIGHT[type] ?? NIGHT.clear;
  const [c1] = getGradientColors(tod); // daytime base
  return DAY[type] ?? c1;
}

/** Pick a readable foreground for the given hex bg (simple YIQ heuristic) */
function foregroundFor(bgHex: string): string {
  const hex = bgHex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 150 ? "#111827" : "#e5e7eb"; // dark text on light bg, light text on dark bg
}

/**
 * Convert OpenWeather timestamps (UTC seconds) to a TimeOfDay bucket using
 * sunrise/sunset and timezoneOffset. Adds “golden hour” padding.
 *
 * Heuristics:
 *   - Night: before sunrise - 45m OR after sunset + 45m
 *   - Morning: [sunrise - 45m, sunrise + 90m]
 *   - Sunset (golden): [sunset - 60m, sunset + 30m]
 *   - Afternoon: everything else that’s daytime
 */
function timeOfDayFromAstronomy(args: {
  dt?: number;
  sunrise?: number;
  sunset?: number;
  timezoneOffset?: number;
}): TimeOfDay {
  const { dt, sunrise, sunset, timezoneOffset } = args;

  // Fallback if we’re missing pieces
  if (!dt || !sunrise || !sunset) {
    if (dt && typeof timezoneOffset === "number") {
      const localMs = (dt + timezoneOffset) * 1000;
      const h = new Date(localMs).getHours();
      if (h >= 5 && h < 12) return "morning";
      if (h >= 12 && h < 17) return "afternoon";
      if (h >= 17 && h < 20) return "sunset";
      return "night";
    }
    return "afternoon";
  }

  const offset = timezoneOffset ?? 0;

  // Convert all to local milliseconds
  const dtLocal = (dt + offset) * 1000;
  const sunriseLocal = (sunrise + offset) * 1000;
  const sunsetLocal = (sunset + offset) * 1000;

  const GOLDEN_BEFORE_SUNSET = 60 * 60 * 1000; // 60m
  const GOLDEN_AFTER_SUNSET = 30 * 60 * 1000; // 30m
  const MORNING_BEFORE_SR = 45 * 60 * 1000; // 45m
  const MORNING_AFTER_SR = 90 * 60 * 1000; // 90m

  const morningStart = sunriseLocal - MORNING_BEFORE_SR;
  const morningEnd = sunriseLocal + MORNING_AFTER_SR;

  const sunsetStart = sunsetLocal - GOLDEN_BEFORE_SUNSET;
  const sunsetEnd = sunsetLocal + GOLDEN_AFTER_SUNSET;

  const isNight = dtLocal < morningStart || dtLocal > sunsetEnd;

  if (isNight) return "night";
  if (dtLocal >= morningStart && dtLocal <= morningEnd) return "morning";
  if (dtLocal >= sunsetStart && dtLocal <= sunsetEnd) return "sunset";
  return "afternoon";
}

/* --------------------------------- Component -------------------------------- */

export default function WeatherScene({
  code,
  timezoneOffset,
  dt,
  sunrise,
  sunset,
  overrideTimeOfDay,
  fillParent = false,
  className,
}: WeatherSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const particlesRef = useRef<any[]>([]);
  const weatherTypeRef = useRef<WeatherType>(classifyWeather(code));
  const lightningRef = useRef({ active: false, timer: 0 });

  // compute palette bucket
  const effectiveTimeOfDay: TimeOfDay =
    overrideTimeOfDay ??
    timeOfDayFromAstronomy({ dt, sunrise, sunset, timezoneOffset });

  /* ------------------------------- Particle seeds ------------------------------ */

  function createRain(canvas: HTMLCanvasElement, count: number) {
    const arr = new Array(count).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 20 + 10,
      speed: Math.random() * 4 + 4,
    }));
    particlesRef.current = arr;
  }

  function createSnow(canvas: HTMLCanvasElement, count: number) {
    const arr = new Array(count).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 0.5,
      drift: Math.random() * 1 - 0.5,
    }));
    particlesRef.current = arr;
  }

  function createMist(canvas: HTMLCanvasElement, count: number) {
    const arr = new Array(count).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 30 + 20,
      speed: Math.random() * 0.2 + 0.1,
    }));
    particlesRef.current = arr;
  }

  /* --------------------------------- Drawing ---------------------------------- */

  function drawSky(ctx: CanvasRenderingContext2D, type: WeatherType) {
    const color = getSkyColor(effectiveTimeOfDay, type);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  function drawRain(ctx: CanvasRenderingContext2D) {
    const p = particlesRef.current;
    ctx.strokeStyle = "rgba(174,194,224,0.55)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < p.length; i++) {
      const r = p[i];
      ctx.moveTo(r.x, r.y);
      ctx.lineTo(r.x, r.y + r.length);
      r.y += r.speed;
      if (r.y > ctx.canvas.height) {
        r.y = -r.length;
        r.x = Math.random() * ctx.canvas.width;
      }
    }
    ctx.stroke();
  }

  function drawSnow(ctx: CanvasRenderingContext2D) {
    const p = particlesRef.current;
    ctx.fillStyle = "white";
    for (let i = 0; i < p.length; i++) {
      const s = p[i];
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();
      s.y += s.speed;
      s.x += s.drift * 0.3;
      if (s.y > ctx.canvas.height) {
        s.y = -s.radius;
        s.x = Math.random() * ctx.canvas.width;
      }
    }
  }

  function drawMist(ctx: CanvasRenderingContext2D) {
    const p = particlesRef.current;
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    for (let i = 0; i < p.length; i++) {
      const m = p[i];
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
      ctx.fill();
      m.y += m.speed;
      if (m.y > ctx.canvas.height) {
        m.y = -m.radius;
        m.x = Math.random() * ctx.canvas.width;
      }
    }
  }

  function drawLightning(ctx: CanvasRenderingContext2D) {
    const L = lightningRef.current;
    if (Math.random() < 0.002 && !L.active) {
      L.active = true;
      L.timer = 5; // frames
    }
    if (L.active) {
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      L.timer--;
      if (L.timer <= 0) L.active = false;
    }
  }

  /* --------------------------------- Effects ---------------------------------- */

  // Publish the sky color to CSS as --sky-bg (and a readable --sky-fg)
  useEffect(() => {
    const type = weatherTypeRef.current;
    const color = getSkyColor(effectiveTimeOfDay, type);
    document.documentElement.style.setProperty("--sky-bg", color);
    document.documentElement.style.setProperty("--sky-fg", foregroundFor(color));
  }, [effectiveTimeOfDay, code]);

  // Resize + (re)seed particles on mount/resize and when palette bucket changes
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function sizeCanvas() {
      if (fillParent) {
        const parent = canvas.parentElement!;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    }
    sizeCanvas();

    const onResize = () => {
      sizeCanvas();
      seedParticles();
    };
    window.addEventListener("resize", onResize, { passive: true });

    function seedParticles() {
      const wt = weatherTypeRef.current;
      if (wt === "storm" || wt === "rain") createRain(canvas, 300);
      else if (wt === "snow") createSnow(canvas, 220);
      else if (wt === "mist") createMist(canvas, 55);
      else particlesRef.current = [];
    }

    function loop() {
      drawSky(ctx, weatherTypeRef.current);
      switch (weatherTypeRef.current) {
        case "storm":
          drawRain(ctx);
          drawLightning(ctx);
          break;
        case "rain":
          drawRain(ctx);
          break;
        case "snow":
          drawSnow(ctx);
          break;
        case "mist":
          drawMist(ctx);
          break;
        default:
          // clear / clouds -> just sky
          break;
      }
      rafRef.current = requestAnimationFrame(loop);
    }

    seedParticles();
    loop();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fillParent, effectiveTimeOfDay]);

  // Reclassify weather + reseed when code changes
  useEffect(() => {
    weatherTypeRef.current = classifyWeather(code);
    const canvas = canvasRef.current!;
    if (!canvas) return;

    if (weatherTypeRef.current === "storm" || weatherTypeRef.current === "rain") {
      createRain(canvas, 300);
    } else if (weatherTypeRef.current === "snow") {
      createSnow(canvas, 220);
    } else if (weatherTypeRef.current === "mist") {
      createMist(canvas, 55);
    } else {
      particlesRef.current = [];
    }
  }, [code]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: fillParent ? "100%" : "100vh",
        overflow: "hidden",
        background: "black", // fallback while canvas paints
      }}
      aria-label="Animated weather scene"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
