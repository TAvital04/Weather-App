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
                <ul>
                    {data && <li><h4>{data.weather.status}</h4></li>}
                    {data && <li>Temperature: {data.conditions.temp} C</li>}
                    {data && <li>Feels Like: {data.conditions.feelsLike} C</li>}
                    {data && <li>Rain: {data.conditions.rain} mm/h</li>}
                    {data && <li>Snow: {data.conditions.snow} mm/h</li>}
                    {data && <li>Clouds: {data.conditions.clouds}%</li>}
                    {data && <li>Humidity: {data.conditions.humidity}%</li>}
                    {data && <li>Pressure: {data.conditions.pressure} hPa</li>}
                    {data && <li>UV Index: {data.conditions.uvIndex}</li>}
                    {data && <li>Visibility: {data.conditions.visibility} m</li>}
                    {data && <li>Wind Speed: {data.conditions.wind.speed} m/s</li>}
                    {data && <li>Wind Direction: {data.conditions.wind.direction} degrees from North</li>}
                    {data && <li>Sunrise: {getTime(data.conditions.sun.rise, data.conditions.sun.timezone)}</li>}
                    {data && <li>Sunset: {getTime(data.conditions.sun.set, data.conditions.sun.timezone)}</li>}
                </ul>
            </div>
        </div>
    )
}

export default WeatherCurrent