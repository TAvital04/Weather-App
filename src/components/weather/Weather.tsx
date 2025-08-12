import {useState, useEffect} from "react"

import WeatherCurrent from "./WeatherCurrent.tsx"
import WeatherHourly from "./WeatherHourly.tsx"
import WeatherDaily from "./WeatherDaily.tsx"

const key = import.meta.env.VITE_API_KEY
const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
]
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

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

            if(res.ok) {
                const resJSON = await res.json()

                setLocation(`${resJSON[0].name}, ${resJSON[0].country}`)
            }
        }

        fetchData(props.apiData)

    }, [])

    useEffect(() => {
        const newDate = new Date(props.apiData.current.dt * 1000)
        setDate(`
            ${days[newDate.getDay()]}, 
            ${months[newDate.getMonth()]} 
            ${newDate.getDay()}
        `)
        setTime(`
            ${newDate.getHours() % 12}:
            ${newDate.getMinutes()}:
            ${newDate.getSeconds()}
            ${newDate.getHours() > 12? "PM": "AM"}
        `)
    }, [props.apiData])

    return (
        <div className = "contents">
            {location != "" && <h2>{location}</h2>}

            <div className = {style.body}>
                {props.apiData &&
                    <h4>{date}: {time}</h4> ||

                    <WeatherCurrent apiData = {props.apiData}/> ||
                    <WeatherHourly apiData = {props.apiData}/> || 
                    <WeatherDaily apiData = {props.apiData}/>
                }
            </div>
        </div>
    )
}

export default Weather