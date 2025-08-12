import {useState, useEffect} from "react"

import WeatherCurrent from "./WeatherCurrent.tsx"
import WeatherHourly from "./WeatherHourly.tsx"
import WeatherDaily from "./WeatherDaily.tsx"

const key = import.meta.env.VITE_API_KEY

const Weather = (props: any) => {
    const [location, setLocation] = useState("")

    useEffect(() => {
        const fetchData = async (apiData: any) => {
            const res = await fetch(
                `https://api.openweathermap.org/geo/1.0/reverse?lat=${apiData.lat}&lon=${apiData.lon}&limit=1&appid=${key}`
            )

            const resJSON = await res.json()

            setLocation(`${resJSON[0].name}, ${resJSON[0].country}`)
        }

        fetchData(props.apiData)
    }, [props.apiData])

    return (
        <div className = "contents">
            {location != "" && <h2>{location}</h2>}
            <WeatherCurrent apiData = {props.apiData}/>
            <WeatherHourly apiData = {props.apiData}/>
            <WeatherDaily apiData = {props.apiData}/>
        </div>
    )
}

export default Weather