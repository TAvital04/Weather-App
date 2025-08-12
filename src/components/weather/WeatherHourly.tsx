import {useState, useEffect} from "react"

type ListElement = {
    time: number
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
            gust: number
        }
    }
}

type Data = {
    list: ListElement[]
}

const getHourlyWeather = (apiData: any) => {
    const result = []

    for(let i = 0; i < 48; i += 3) {
        result.push({
            time: apiData.hourly[i].dt,
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
                    gust: apiData.hourly[i].wind_gust
                }
            }
        })
    }

    return result
}

const WeatherHourly = (props: any) => {
    const [data, setData] = useState<Data | null>(null)

    useEffect(() => {
        const data: Data = {
            list: getHourlyWeather(props.apiData)
        };

        setData(data);
    }, [props.apiData]);

    return (
        <>
            
        </>
    )
}

export default WeatherHourly