import {useState, useEffect} from "react"

const key = import.meta.env.VITE_API_KEY

type Coord = {
    lat: number;
    lng: number
}

type ListElement = {
    time: number
    weather: {
        status: string
        description: string
        id: number
    },
    conditions: {
        temp: number
        feelsLike: number
        clouds: number
        humidity: number
        pressure: number
        uvIndex: number
        visibility: number
        wind: {
            speed: number
            direction: number
            gust: number
        }
    }
}

type Data = {
    list: ListElement[]
}

const getHourlyWeather = (resJSON: any) => {
    const result = []

    for(let i = 0; i < 48; i += 3) {
        result.push({
            time: resJSON.hourly[i].dt,
            weather: {
                status: resJSON.hourly[i].weather[0].main,
                description: resJSON.hourly[i].weather[0].description,
                id: resJSON.hourly[i].weather[0].id
            },
            conditions: {
                temp: resJSON.hourly[i].temp,
                feelsLike: resJSON.hourly[i].feels_like,
                clouds: resJSON.hourly[i].clouds,
                humidity: resJSON.hourly[i].humidity,
                pressure: resJSON.hourly[i].pressure,
                uvIndex: resJSON.hourly[i].uvi,
                visibility: resJSON.hourly[i].visibility,
                wind: {
                    speed: resJSON.hourly[i].wind_speed,
                    direction: resJSON.hourly[i].wind_deg,
                    gust: resJSON.hourly[i].wind_gust
                }
            }
        })
    }

    return result
}

const WeatherHourly = (props: { 
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
            list: getHourlyWeather(resJSON)
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

export default WeatherHourly