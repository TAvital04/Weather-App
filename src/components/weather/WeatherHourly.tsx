import {useState, useEffect} from "react"

import {getTime} from "../../modules/utils.tsx"

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
            <h4>{getTime(props.element.time.time, props.element.time.timezone)}</h4>

            <ul>
                <li><h5>{props.element.weather.status}</h5></li>
                <li>Temperature: {props.element.conditions.temp} C</li>
                <li>Feels Likes: {props.element.conditions.feelsLike} C</li>
                <li>Clouds: {props.element.conditions.clouds}%</li>
                <li>Humidity: {props.element.conditions.humidity}%</li>
                <li>Pressure: {props.element.conditions.pressure} hPa</li>
                <li>UV Index: {props.element.conditions.uvIndex}</li>
                <li>Visibility: {props.element.conditions.visibility} m</li>
                <li>Wind Speed: {props.element.conditions.wind.speed} m/s</li>
                <li>Wind Direction: {props.element.conditions.wind.direction} degrees from North</li>
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

                <div className = "body">
                    <ul>
                        {data && data.list.map((element) => (                    
                            <li key = {element.time.time}><WeatherHourlyElement element = {element}/></li>
                        ))}  
                    </ul>
                </div>
            </div>
        </>
    )
}

export default WeatherHourly