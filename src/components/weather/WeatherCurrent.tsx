import {useState, useEffect} from "react"

import * as renderUtils from "../../modules/renderUtils.tsx"

import style from "../../styles/weatherCurrent.module.css"

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
        <>
            <div className = {style.main}>
                <div className = {`${style.mainChild} ${style.top}`}>{renderUtils.getTemp(props.data.conditions.temp, props.unit, "Temperature")}</div>
                <div className = {`${style.mainChild} ${style.top}`}>{renderUtils.getStatus(props.data.weather.status)}</div>
                <div className = {`${style.mainChild} ${style.mainSub} ${style.bottom}`}>
                    <div className = {style.mainSubChild}>{renderUtils.getTemp(props.data.conditions.feelsLike, props.unit, "Feels Like")}</div>
                    <div className = {style.mainSubChild}>{renderUtils.getRainSnow(props.data.conditions.rain, props.data.conditions.snow, props.unit)}</div>
                    <div className = {style.mainSubChild}>{renderUtils.getUVIndex(props.data.conditions.uvIndex)}</div>
                </div>
            </div>

            <div className = {style.other}>
                <div className = {style.otherChild}>{renderUtils.getClouds(props.data.conditions.clouds)}</div>
                <div className = {style.otherChild}>{renderUtils.getHumidity(props.data.conditions.humidity)}</div>
                <div className = {style.otherChild}>{renderUtils.getPressure(props.data.conditions.pressure)}</div>
                <div className = {style.otherChild}>{renderUtils.getVisibility(props.data.conditions.visibility, props.unit)}</div>
                <div className = {style.otherChild}>{renderUtils.getWind(props.data.conditions.wind.speed, props.data.conditions.wind.direction, props.unit)}</div>
                <div className = {style.otherChild}>{renderUtils.getSun(props.data.conditions.sun.rise, props.data.conditions.sun.set, props.data.conditions.sun.timezone)}</div>
            </div>
        </>
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
        <div className = {style.contents}>
            <h3 className = {style.heading}>Current Weather</h3>
            
            <div className = {style.body}>
                {data && <WeatherCurrentElement data = {data} unit = {props.unit}/>}
            </div>
        </div>
    )
}

export default WeatherCurrent