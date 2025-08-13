import {useState, useEffect} from "react"

import * as renderUtils from "../../modules/renderUtils.tsx"

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

const WeatherCurrentElement = (props: any) => {
    return (
        <ul>
            <li>{renderUtils.getStatus(props.data.weather.status)}</li>
            <li>{renderUtils.getTemp(props.data.conditions.temp, props.unit, "Temperature")}</li>
            <li>{renderUtils.getTemp(props.data.conditions.feelsLike, props.unit, "Feels Like")}</li>
            <li>{renderUtils.getRain(props.data.conditions.rain, props.unit)}</li>
            <li>{renderUtils.getSnow(props.data.conditions.snow, props.unit)}</li>
            <li>{renderUtils.getClouds(props.data.conditions.clouds)}</li>
            <li>{renderUtils.getHumidity(props.data.conditions.humidity)}</li>
            <li>{renderUtils.getPressure(props.data.conditions.pressure)}</li>
            <li>{renderUtils.getUVIndex(props.data.conditions.uvIndex)}</li>
            <li>{renderUtils.getVisibility(props.data.conditions.visibility, props.unit)}</li>
            <li>{renderUtils.getWind(props.data.conditions.wind.speed, props.data.conditions.wind.direction, props.unit)}</li>
            <li>{renderUtils.getSun(props.data.conditions.sun.rise, props.data.conditions.sun.set, props.data.conditions.sun.timezone)}</li>
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
                {data && <WeatherCurrentElement data = {data} unit = {props.unit}/>}
            </div>
        </div>
    )
}

export default WeatherCurrent