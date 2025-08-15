import { useState, useEffect } from "react";

import Search from "./components/search/Search";
import Weather from "./components/weather/Weather";
import Background from "./components/visuals/Background";

import mainStyle from "./styles/main.module.css"
import style from "./styles/app.module.css";

const key = import.meta.env.VITE_API_KEY as string;

const App = () => {
  const [apiData, setApiData] = useState<any>(null);
  
  useEffect(() => {
    if (!apiData) return;

    const reRenderData = async (loc: { lat: number; lon: number }) => {
      const res = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${loc.lat}&lon=${loc.lon}&units=metric&appid=${key}`
      );
      const resJSON = await res.json();
      setApiData(resJSON);
    };

    const interval = setInterval(() => {
      reRenderData({ lat: apiData.lat, lon: apiData.lon });
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [apiData]);

  useEffect(() => {
    if(apiData) {
      let darkMode
      
      if(apiData.current.dt < apiData.current.sunrise || apiData.current.dt > apiData.current.sunset) {
        darkMode = "dark"
      } else {
        darkMode = "light"
      }

      document.documentElement.dataset.darkMode = darkMode
    }
  }, [apiData])

  return (
    <>
      <div className = {style.background}>
          {apiData && (
          <Background
            code={apiData.current.weather[0].id}
            timezoneOffset={apiData.timezone_offset}
            dt={apiData.current.dt}
            sunrise={apiData.current.sunrise}
            sunset={apiData.current.sunset}
          />
        )}
      </div>
      <div className={style.contents}>
        <div className = {style.inPadding}>
          <h1 className = {`${style.title} ${mainStyle.heading}`}>Weather</h1>

          <div className={style.body}>
            <Search setApiData={setApiData} />
            {apiData && <Weather apiData={apiData} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
