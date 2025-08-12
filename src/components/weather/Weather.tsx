import WeatherCurrent from "./WeatherCurrent.tsx"
import WeatherHourly from "./WeatherHourly.tsx"
import WeatherDaily from "./WeatherDaily.tsx"

const Weather = (props: any) => {
    return (
        <>
            <WeatherCurrent apiData = {props.apiData}/>
            <WeatherHourly apiData = {props.apiData}/>
            <WeatherDaily apiData = {props.apiData}/>
        </>
    )
}

export default Weather