import {useState, useEffect} from "react"

const key = import.meta.env.VITE_API_KEY

type Coord = {
    lat: number;
    lng: number
}

type Data = {
    weather: {
        status: string
        description: string
        id: number
    },
    conditions: {
        temp: number
        feelsLike: number
        rain: number
        snow: number
        clouds: number
        humidity: number
        pressure: number
        uvIndex: number
        visibility: number
        wind: {
            speed: number
            direction: number
            gust: number
        },
        sun: {
            rise: number
            set: number
        }
    } 
}

const WeatherCurrent = (props: { 
    coords: Coord
}) => {
    const [data, setData] = useState<Data | null>(null)

    useEffect(() => {
    async function handleData(coords: Coord) {
        const res = await fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lng}&units=metric&appid=${key}`
        );
        const resJSON = await res.json();

        const data: Data = {
            weather: {
                status: resJSON.current.weather[0].main,
                description: resJSON.current.weather[0].description,
                id: resJSON.current.weather[0].id
            },
            conditions: {
                temp: resJSON.current.temp,
                feelsLike: resJSON.current.feels_like,
                rain: resJSON.current.rain?.["1h"] ?? 0,
                snow: resJSON.current.snow?.["1h"] ?? 0,
                clouds: resJSON.current.clouds,
                humidity: resJSON.current.humidity,
                pressure: resJSON.current.pressure,
                uvIndex: resJSON.current.uvi,
                visibility: resJSON.current.visibility,
                wind: {
                    speed: resJSON.current.wind_speed,
                    direction: resJSON.current.wind_deg,
                    gust: resJSON.current.wind_gust
                },
                sun: {
                    rise: resJSON.current.sunrise,
                    set: resJSON.current.sunset
                }
            }
        };

        setData(data);
    }
    handleData(props.coords);
    }, [props.coords, key]);

    return (
        <>
            
        </>
    )
}

export default WeatherCurrent