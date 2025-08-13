import {useState, useEffect} from "react"

import {getDate, getTime} from "../../modules/utils.tsx"

import style from "../../styles/weatherDaily.module.css"

type ListElement = {
    time: {
        time: number
        timezone: string
    }
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
        wind: {
            speed: number
            direction: number
        },
        sun: {
            rise: number
            set: number
        }
    }
}

type Data = {
    list: ListElement[]
}

const getWeatherDaily = (apiData: any) => {
    const result = []

    for(let i = 1; i < 8; i++) {
        result.push({
            time: {
                time: apiData.daily[i].dt,
                timezone: apiData.timezone
            },
            weather: {
                status: apiData.daily[i].weather[0].main,
                description: apiData.daily[i].weather[0].description,
                id: apiData.daily[i].weather[0].id
            },
            conditions: {
                temp: (apiData.daily[i].temp.min + apiData.daily[i].temp.max)/2,
                feelsLike: (apiData.daily[i].feels_like.day + apiData.daily[i].feels_like.morn)/2,
                rain: apiData.daily[i].rain?.["1h"] ?? 0,
                snow: apiData.daily[i].snow?.["1h"] ?? 0,
                clouds: apiData.daily[i].clouds,
                humidity: apiData.daily[i].humidity,
                pressure: apiData.daily[i].pressure,
                uvIndex: apiData.daily[i].uvi,
                wind: {
                    speed: apiData.daily[i].wind_speed,
                    direction: apiData.daily[i].wind_deg,
                },
                sun: {
                    rise: apiData.daily[i].sunrise,
                    set: apiData.daily[i].sunset
                }
            }
        })
    }

    return result
}

const WeatherDailyElement = (props: any) => {
    return (
        <div className = {style.contentsElement}>
            <h4>{getDate(props.element.time.time, props.element.time.timezone)}</h4>

            <ul>
                <li><h5>{props.element.weather.status}</h5></li>
                <li>Temperature {props.element.conditions.temp} C</li>
                <li>Feels Like {props.element.conditions.feelsLike} C</li>
                <li>Rain: {props.element.conditions.rain} mm/h</li>
                <li>Snow: {props.element.conditions.snow} mm/h</li>
                <li>Clouds: {props.element.conditions.clouds}%</li>
                <li>Humidity: {props.element.conditions.humidity}%</li>
                <li>Pressure: {props.element.conditions.pressure} hPa</li>
                <li>UV Index: {props.element.conditions.uvIndex}</li>
                <li>Wind Speed: {props.element.conditions.wind.speed}</li>
                <li>Wind Direction: {props.element.conditions.wind.direction} degrees from North</li>
                <li>Sunrise: {getTime(props.element.conditions.sun.rise, props.element.conditions.timezone)}</li>
                <li>Sunset: {getTime(props.element.conditions.sun.set, props.element.conditions.timezone)}</li>
            </ul>
        </div>
    )
}

const WeatherDaily = (props: any) => {
    const [data, setData] = useState<Data | null>(null)

    useEffect(() => {
        const data: Data = {
            list: getWeatherDaily(props.apiData)
        };

        setData(data);
    }, [props.apiData]);

    return (
        <div className = "contents">
            <h3>Daily Weather</h3>

            <div className = {style.body}>
                <ul>
                    {data && data.list.map((element) => (                    
                        <li key = {element.time.time}><WeatherDailyElement element = {element}/></li>
                    ))}                    
                </ul>

            </div>
        </div>
    )
}

export default WeatherDaily