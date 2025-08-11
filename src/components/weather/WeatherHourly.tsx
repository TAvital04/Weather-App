import {useState, useEffect} from "react"

const key = import.meta.env.VITE_API_KEY

type Coord = {
    lat: number;
    lng: number
}

type ListElement = {

}

type Data = {

}

const getHourlyWeather = (resJSON: any) => {
    const result = []

    for(let i = 0; i < 48; i += 3) {
        result.push({
            weather: {
                status: resJSON.hourly[i].weather[0].main,
                description: resJSON.hourly[i].weather[0].description,
                id: resJSON.hourly[i].weather[0].id
            },
            conditions: {
                
            }
        })
    }
}

const WeatherCurrent = (props: { 
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
            list: getHourlyWeather(resJSON)
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