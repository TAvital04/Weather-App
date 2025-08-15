import {useState, useEffect} from "react"

import WeatherCurrent from "./WeatherCurrent.tsx"
import WeatherHourly from "./WeatherHourly.tsx"
import WeatherDaily from "./WeatherDaily.tsx"

import * as renderUtils from "../../modules/renderUtils.tsx"

import mainStyle from "../../styles/main.module.css"
import style from "../../styles/weather.module.css"

const key = import.meta.env.VITE_API_KEY

const Weather = (props: any) => {
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [metric, setMetric] = useState(true)

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
        setDate(renderUtils.getDate(props.apiData.current.dt, props.apiData.timezone))
        setTime(renderUtils.getTime(props.apiData.current.dt, props.apiData.timezone))
    }, [props.apiData])

    return (
        <div className = {style.contents}>
            <button onClick = {() => setMetric(!metric)}>{metric? "Metric": "Customary"}</button>

            <div className = {style.heading}>
                {location != "" && <h2>{location}</h2>}
                {props.apiData && <h4>{date}: {time}</h4>}                
            </div>


            <div className = "body">
                {props.apiData && <WeatherCurrent apiData = {props.apiData} unit = {metric}/>}
                {props.apiData && <WeatherHourly apiData = {props.apiData} unit = {metric}/>}
                {props.apiData && <WeatherDaily apiData = {props.apiData} unit = {metric}/>}
            </div>
        </div>
    )
}

export default Weather