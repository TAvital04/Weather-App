import {useState, useEffect} from "react"

const key = import.meta.env.VITE_API_KEY

type Coord = {
    lat: number;
    lng: number
}

type ListEntry = {

}
type Data = {
    list: ListEntry
}

// const mapEntry = (entry: any): ListEntry => {
//     return {

//     }
// }

const getDailyForecast = async (coords: Coord) => {
    const result = []

    for(let i = 1; i < 5; i++) {
  
        result.push(resJSON);
    }

    return result
}

const WeatherHourly = (props: { 
    coords: Coord
}) => {
    const [data, setData] = useState<Data | null>(null)

    useEffect(() => {
    async function handleData(coords: Coord) {
        const data: Data = {
            list: await getDailyForecast(coords)
        };

        setData(data);

        console.log(data)
    }
    handleData(props.coords);
    }, [props.coords]);
 
    return (
        <>
            
        </>
    )
}

export default WeatherHourly