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
        rain: number
        snow: number
        clouds: number
        humidity: number
        pressure: number
        uvIndex: number
        wind: {
            speed: number
            direction: number
            gust: number
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

const getDailyWeather = (apiData: any) => {
    const result = []

    for(let i = 1; i < 8; i++) {
        result.push({
            time: apiData.daily[i].dt,
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
                    gust: apiData.daily[i].wind_gust
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

const WeatherDaily = (props: any) => {
    const [data, setData] = useState<Data | null>(null)

    useEffect(() => {
        const data: Data = {
            list: getDailyWeather(props.apiData)
        };

        setData(data);
    }, [props.apiData]);

    return (
        <>
            
        </>
    )
}

export default WeatherDaily