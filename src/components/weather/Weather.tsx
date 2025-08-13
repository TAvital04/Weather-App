import {useState, useEffect} from "react"

import WeatherCurrent from "./WeatherCurrent.tsx"
import WeatherHourly from "./WeatherHourly.tsx"
import WeatherDaily from "./WeatherDaily.tsx"

const key = import.meta.env.VITE_API_KEY

import style from "../../styles/weather.module.css"

const Weather = (props: any) => {
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    useEffect(() => {
        const fetchData = async (apiData: any) => {
            const res = await fetch(
                `https://api.openweathermap.org/geo/1.0/reverse?lat=${apiData.lat}&lon=${apiData.lon}&limit=1&appid=${key}`
            )

            const resJSON = await res.json()

            if(resJSON[0]) {
                setLocation(`${resJSON[0].name}, ${resJSON[0].country}`)
            } else {
                setLocation("Unnamed Location")
            }
        }

        fetchData(props.apiData)
    }, [props.apiData])

    useEffect(() => {
        const dateTime = props.apiData.current.dt * 1000
        const timezone = props.apiData.timezone

        setDate(new Date(dateTime).toLocaleDateString("en-US", {
            timeZone: timezone, weekday: "long", month: "long", day: "numeric"
        }))

        setTime(new Date(dateTime).toLocaleTimeString("en-US", {
            timeZone: timezone, hour: "numeric", minute: "2-digit", hour12: true
        }))
    }, [props.apiData])

    return (
        <div className = "contents">
            {location != "" && <h2>{location}</h2>}

            <div className = "body">
                {props.apiData && <h4>{date}: {time}</h4>}
                {props.apiData && <WeatherCurrent apiData = {props.apiData}/>}
                {props.apiData && <WeatherHourly apiData = {props.apiData}/>}
                {props.apiData && <WeatherDaily apiData = {props.apiData}/>}
            </div>
        </div>
    )
}

export default Weather