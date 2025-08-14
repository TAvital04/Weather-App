import {useState, useEffect} from "react"

import * as renderElementUtils from "../../modules/renderElementUtils.tsx"

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
            <h4>{renderElementUtils.getDate(props.element.time.time, props.element.time.timezone)}</h4>
            <ul>
                <li>{renderElementUtils.getStatus(props.element.weather.status)}</li>
                <li>{renderElementUtils.getTemp(props.element.conditions.temp, props.unit, "Temperature")}</li>
                <li>{renderElementUtils.getTemp(props.element.conditions.feelsLike, props.unit, "Feels Like")}</li>
                <li>{renderElementUtils.getRain(props.element.conditions.rain, props.unit)}</li>
                <li>{renderElementUtils.getSnow(props.element.conditions.snow, props.unit)}</li>
                <li>{renderElementUtils.getClouds(props.element.conditions.clouds)}</li>
                <li>{renderElementUtils.getHumidity(props.element.conditions.humidity)}</li>
                <li>{renderElementUtils.getPressure(props.element.conditions.pressure)}</li>
                <li>{renderElementUtils.getUVIndex(props.element.conditions.uvIndex)}</li>
                <li>{renderElementUtils.getWind(props.element.conditions.wind.speed, props.element.conditions.wind.direction, props.unit)}</li>
                <li>{renderElementUtils.getSun(props.element.conditions.sun.rise, props.element.conditions.sun.set, props.element.conditions.timezone)}</li>
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
                        <li key = {element.time.time}><WeatherDailyElement element = {element} unit = {props.unit}/></li>
                    ))}                    
                </ul>
            </div>
        </div>
    )
}

export default WeatherDaily