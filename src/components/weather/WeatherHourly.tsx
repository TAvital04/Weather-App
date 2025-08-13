import {useState, useEffect} from "react"

import * as renderUtils from "../../modules/renderUtils.tsx"

import style from "../../styles/weatherHourly.module.css"

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
        clouds: number
        humidity: number
        pressure: number
        uvIndex: number
        visibility: number
        wind: {
            speed: number
            direction: number
        }
    }
}

type DataArray = {
    list: ListElement[]
}

const getHourlyWeather = (apiData: any) => {
    const result = []

    for(let i = 0; i <= 24; i += 3) {
        result.push({
            time: {
                time: apiData.hourly[i].dt,
                timezone: apiData.timezone
            },
            weather: {
                status: apiData.hourly[i].weather[0].main,
                description: apiData.hourly[i].weather[0].description,
                id: apiData.hourly[i].weather[0].id
            },
            conditions: {
                temp: apiData.hourly[i].temp,
                feelsLike: apiData.hourly[i].feels_like,
                clouds: apiData.hourly[i].clouds,
                humidity: apiData.hourly[i].humidity,
                pressure: apiData.hourly[i].pressure,
                uvIndex: apiData.hourly[i].uvi,
                visibility: apiData.hourly[i].visibility,
                wind: {
                    speed: apiData.hourly[i].wind_speed,
                    direction: apiData.hourly[i].wind_deg,
                }
            }
        })
    }

    return result
}

const WeatherHourlyElement = (props: any) => {
    return (
        <div className = "contents-element">                
            <h4>{renderUtils.getTime(props.element.time.time, props.element.time.timezone)}</h4>
{console.log(props)|| true}
            <ul>
                <li>{renderUtils.getStatus(props.element.weather.status)}</li>
                <li>{renderUtils.getTemp(props.element.conditions.temp, props.unit, "Temperature")}</li>
                <li>{renderUtils.getTemp(props.element.conditions.feelsLike, props.unit, "Feels Like")}</li>
                <li>{renderUtils.getClouds(props.element.conditions.clouds)}</li>
                <li>{renderUtils.getHumidity(props.element.conditions.humidity)}</li>
                <li>{renderUtils.getPressure(props.element.conditions.pressure)}</li>
                <li>{renderUtils.getUVIndex(props.element.conditions.uvIndex)}</li>
                <li>{renderUtils.getWind(props.element.conditions.wind.speed, props.element.conditions.wind.direction, props.unit)}</li>
            </ul>
        </div>
    )
}

const WeatherHourly = (props: any) => {
    const [data, setData] = useState<DataArray | null>(null)

    useEffect(() => {
        const data: DataArray = {
            list: getHourlyWeather(props.apiData)
        };

        setData(data);
    }, [props.apiData]);

    return (
        <>
            <div className = "contents">
                <h3>Hourly Weather</h3>

                <div className = {style.body}>
                    <ul>
                        {data && data.list.map((element) => (                    
                            <li key = {element.time.time}><WeatherHourlyElement element = {element} unit = {props.unit}/></li>
                        ))}  
                    </ul>
                </div>
            </div>
        </>
    )
}

export default WeatherHourly