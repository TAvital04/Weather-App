import {useEffect} from "react"

const key = import.meta.env.VITE_API_KEY

const Weather = (props: { 
    coords: { 
        lat: number; 
        lng: number 
    } 
}) => {
    async function getData() {
        const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${props.coords.lat}&lon=${props.coords.lng}&appid=${key}`)
        const data = await res.json()

        console.log(data)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {<p>{`${props.coords.lat} ${props.coords.lng}`}</p>}
        </>
    )
}

export default Weather