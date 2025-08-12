import {useState, useEffect} from "react"

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

const WeatherCurrent = (props: any) => {
    const [data, setData] = useState<Data | null>(null)

    useEffect(() => {
        setData({
            weather: {
                status: props.apiData.current.weather[0].main,
                description: props.apiData.current.weather[0].description,
                id: props.apiData.current.weather[0].id
            },
            conditions: {
                temp: props.apiData.current.temp,
                feelsLike: props.apiData.current.feels_like,
                rain: props.apiData.current.rain?.["1h"] ?? 0,
                snow: props.apiData.current.snow?.["1h"] ?? 0,
                clouds: props.apiData.current.clouds,
                humidity: props.apiData.current.humidity,
                pressure: props.apiData.current.pressure,
                uvIndex: props.apiData.current.uvi,
                visibility: props.apiData.current.visibility,
                wind: {
                    speed: props.apiData.current.wind_speed,
                    direction: props.apiData.current.wind_deg,
                    gust: props.apiData.current.wind_gust
                },
                sun: {
                    rise: props.apiData.current.sunrise,
                    set: props.apiData.current.sunset
                }
            }
        })
    }, [props.apiData]);

    return (
        <>
            
        </>
    )
}

export default WeatherCurrent