import {useState, useEffect} from "react"

import * as renderElementUtils from "../../modules/renderElementUtils.tsx"

import mainStyle from "../../styles/main.module.css"
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
        <div className = {style.element}>
            <h4 className = {style.elementHeading}>{renderElementUtils.getDate(props.element.time.time, props.element.time.timezone)}</h4>
            
            <div className = {style.elementChild}>{renderElementUtils.getStatus(props.element.weather.status)}</div>
            <div className = {style.elementChild}>{renderElementUtils.getTemp(props.element.conditions.temp, props.unit, "Temperature")}</div>
            <div className = {style.elementChild}>{renderElementUtils.getTemp(props.element.conditions.feelsLike, props.unit, "Feels Like")}</div>
            <div className = {style.elementChild}>{renderElementUtils.getRain(props.element.conditions.rain, props.unit)}</div>
            <div className = {style.elementChild}>{renderElementUtils.getSnow(props.element.conditions.snow, props.unit)}</div>
            <div className = {style.elementChild}>{renderElementUtils.getClouds(props.element.conditions.clouds)}</div>
            <div className = {style.elementChild}>{renderElementUtils.getHumidity(props.element.conditions.humidity)}</div>
            <div className = {style.elementChild}>{renderElementUtils.getPressure(props.element.conditions.pressure)}</div>
            <div className = {style.elementChild}>{renderElementUtils.getUVIndex(props.element.conditions.uvIndex)}</div>
            <div className = {style.elementChild}>{renderElementUtils.getWind(props.element.conditions.wind.speed, props.element.conditions.wind.direction, props.unit)}</div>
            <div className = {style.elementChild}>{renderElementUtils.getSun(props.element.conditions.sun.rise, props.element.conditions.sun.set, props.element.conditions.timezone)}</div>
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
        <div className = {style.contents}>
            <h3 className = {`${style.heading} ${mainStyle.heading}`}>Daily Weather</h3>

            <div className = {style.body}>
                {data && data.list.map((element) => (                    
                    <WeatherDailyElement key = {element.time.time} element = {element} unit = {props.unit}/>
                ))}                    
            </div>
        </div>
    )
}

export default WeatherDaily