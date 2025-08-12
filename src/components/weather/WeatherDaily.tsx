import {useState, useEffect} from "react"

const key = import.meta.env.VITE_API_KEY

type Coord = {
    lat: number;
    lng: number
}

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

const getDailyWeather = (resJSON: any) => {
    const result = []

    for(let i = 1; i < 8; i++) {
        result.push({
            time: resJSON.daily[i].dt,
            weather: {
                status: resJSON.daily[i].weather[0].main,
                description: resJSON.daily[i].weather[0].description,
                id: resJSON.daily[i].weather[0].id
            },
            conditions: {
                temp: (resJSON.daily[i].temp.min + resJSON.daily[i].temp.max)/2,
                feelsLike: (resJSON.daily[i].feels_like.day + resJSON.daily[i].feels_like.morn)/2,
                rain: resJSON.daily[i].rain?.["1h"] ?? 0,
                snow: resJSON.daily[i].snow?.["1h"] ?? 0,
                clouds: resJSON.daily[i].clouds,
                humidity: resJSON.daily[i].humidity,
                pressure: resJSON.daily[i].pressure,
                uvIndex: resJSON.daily[i].uvi,
                wind: {
                    speed: resJSON.daily[i].wind_speed,
                    direction: resJSON.daily[i].wind_deg,
                    gust: resJSON.daily[i].wind_gust
                },
                sun: {
                    rise: resJSON.daily[i].sunrise,
                    set: resJSON.daily[i].sunset
                }
            }
        })
    }

    return result
}

const WeatherDaily = (props: { 
    coords: Coord
}) => {
    const [data, setData] = useState<Data | null>(null)

    useEffect(() => {
    async function handleData(coords: Coord) {
        const res = await fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lng}&units=metric&appid=${key}`
        );
        const resJSON = await res.json();

        const data: Data = {
            list: getDailyWeather(resJSON)
        };

        setData(data);

        console.log(data)
    }
    handleData(props.coords);
    }, [props.coords, key]);

    return (
        <>
            
        </>
    )
}

export default WeatherDaily