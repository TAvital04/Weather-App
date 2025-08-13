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
        },
        sun: {
            timezone: string
            rise: number
            set: number
        }
    } 
}

const getTime = (dateTime: number, timezone: string): string => {
    return new Date(dateTime * 1000).toLocaleTimeString("en-US", {
        timeZone: timezone, hour: "numeric", minute: "2-digit", hour12: true
    })
}

const WeatherCurrentElement = (props: any) => {
    return (
        <ul>
            <li><h4>{props.data.weather.status}</h4></li>
            <li>Temperature: {props.data.conditions.temp} C</li>
            <li>Feels Like: {props.data.conditions.feelsLike} C</li>
            <li>Rain: {props.data.conditions.rain} mm/h</li>
            <li>Snow: {props.data.conditions.snow} mm/h</li>
            <li>Clouds: {props.data.conditions.clouds}%</li>
            <li>Humidity: {props.data.conditions.humidity}%</li>
            <li>Pressure: {props.data.conditions.pressure} hPa</li>
            <li>UV Index: {props.data.conditions.uvIndex}</li>
            <li>Visibility: {props.data.conditions.visibility} m</li>
            <li>Wind Speed: {props.data.conditions.wind.speed} m/s</li>
            <li>Wind Direction: {props.data.conditions.wind.direction} degrees from North</li>
            <li>Sunrise: {getTime(props.data.conditions.sun.rise, props.data.conditions.sun.timezone)}</li>
            <li>Sunset: {getTime(props.data.conditions.sun.set, props.data.conditions.sun.timezone)}</li>
        </ul>
    )
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
                },
                sun: {
                    timezone: props.apiData.timezone,
                    rise: props.apiData.current.sunrise,
                    set: props.apiData.current.sunset
                }
            }
        })
    }, [props.apiData]);

    return (
        <div className = "contents">
            <h3>Current Weather</h3>

            <div className = "body">
                {data && <WeatherCurrentElement data = {data}/>}
            </div>
        </div>
    )
}

export default WeatherCurrent