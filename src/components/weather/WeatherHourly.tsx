import {useState, useEffect} from "react"

const key = import.meta.env.VITE_API_KEY

type Coord = {
    lat: number;
    lng: number
}

type ListEntry = {
    dateTime: number;
    main: {
        id: number;
        status: string;
        description: string
    },
    conditions: {
        temp: number;
        feelsLike: number;
        pressure: number;
        humidity: number;
        visibility: number;
        wind: {
            speed: number;
            direction: number;
            gust: number
        },
        clouds: number;
        rain: number;
        snow: number
    }
}
type Data = {
    list: ListEntry
}

const mapEntry = (entry: any): ListEntry => {
    return {
        dateTime: entry.dt,
        main: {
            id: entry.weather[0].id,
            status: entry.weather[0].main,
            description: entry.weather[0].description
        },
        conditions: {
            temp: entry.main.temp,
            feelsLike: entry.main.feels_like,
            pressure: entry.main.pressure,
            humidity: entry.main.humidity,
            visibility: entry.visibility,
            wind: {
                speed: entry.wind.speed,
                direction: entry.wind.deg,
                gust: entry.wind.gust
            },
            clouds: entry.clouds.all,
            rain: entry.rain?.["3h"] ?? 0,
            snow: entry.snow?.["3h"] ?? 0
        }
    }
}

const WeatherHourly = (props: { 
    coords: Coord
}) => {
    const [data, setData] = useState<Data | null>(null)

    useEffect(() => {
    async function handleData(coords: Coord) {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lng}&units=metric&appid=${key}&cnt=8`
        );
        const resJSON = await res.json();

        const data: Data = {
            list: resJSON.list.map(mapEntry)
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

export default WeatherHourly