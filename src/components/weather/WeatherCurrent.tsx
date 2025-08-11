import {useState, useEffect} from "react"

const key = import.meta.env.VITE_API_KEY

type Coord = {
    lat: number;
    lng: number
}

type Data = {
    coords: {
        lat: number;
        lng: number;
    },
    main: {
        id: number;
        status: string;
        description: string;
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
            gust: number;
        },
        clouds: number;
        rain: number;
        snow: number;
    },
    location: {
        timezone: number;
        name: number;
        dateTime: number;
    }  
}

const WeatherCurrent = (props: { 
    coords: Coord
}) => {
    const [data, setData] = useState<Data | null>(null)

    useEffect(() => {
    async function handleData(coords: Coord) {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&units=metric&appid=${key}`
        );
        const resJSON = await res.json();

        const data: Data = {
            coords: {
                lat: resJSON.coord.lat,
                lng: resJSON.coord.lon
            },
            main: {
                id: resJSON.weather[0].id,
                status: resJSON.weather[0].main,
                description: resJSON.weather[0].description
            },
            conditions: {
                temp: resJSON.main.temp,
                feelsLike: resJSON.main.feels_like,
                pressure: resJSON.main.pressure,
                humidity: resJSON.main.humidity,
                visibility: resJSON.visibility,
                wind: {
                    speed: resJSON.wind.speed,
                    direction: resJSON.wind.deg,
                    gust: resJSON.wind.gust
                },
                clouds: resJSON.clouds.all,
                rain: resJSON.rain?.["1h"] ?? 0,
                snow: resJSON.show?.["1h"] ?? 0,
            },
            location: {
                timezone: resJSON.timezone,
                name: resJSON.name,
                dateTime: resJSON.dt
            }
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

export default WeatherCurrent