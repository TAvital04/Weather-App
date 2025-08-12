import {useState} from "react"

import WeatherCurrent from "../weather/WeatherCurrent.tsx"
import WeatherHourly from "../weather/WeatherHourly.tsx"
import WeatherDaily from "../weather/WeatherDaily.tsx"

type Coord = {
    lat: number;
    lng: number;
}

const SearchCoords = () => {
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")
    const [coords, setCoords] = useState<Coord | null>(null)

    const [error, setError] = useState(false)

    const validateCoords = (latData: string, lngData: string) => {
        let lat = Number(latData)
        let lng = Number(lngData)

        let latBool = false
        let lngBool = false

        if(!Number.isNaN(lat) && latData != "") {
            if(lat >= -90 && lat <= 90) {
                latBool = true
            }
        }

        if(!Number.isNaN(lng) && lngData != "") {
            if(lng >= -180 && lng <= 180) {
                lngBool = true
            }
        }

        if(latBool && lngBool) {
            setError(false)
            setCoords({lat, lng})
        } else {
            setError(true)
        }
    }

    return (
        <div className = "contents">
            <h1 className = "title">Search</h1>

            <div className = "search">
                <div className = "input">
                    <input
                        type = "number"
                        placeholder = "latitude"
                        value = {lat}
                        onChange = {(e) => setLat(e.target.value)}
                    />

                    <input
                        type = "number"
                        placeholder = "longitude"
                        value = {lng}
                        onChange = {(e) => setLng(e.target.value)}
                    />
                </div>

                <div className = "error">
                    {error && 
                        <ul>
                            <li>Latitude must be greater than -90 and less than 90</li>
                            <li>Longitude must be greater than -180 and less than 180</li>
                        </ul>
                    }
                </div>

                <div className = "submit">
                    <button
                        onClick = {() => validateCoords(lat, lng)}
                    >Submit</button>        
                </div>
            </div>

            { 
                coords != null && 
                <WeatherCurrent coords = {coords}/> &&
                <WeatherHourly coords = {coords}/> &&
                <WeatherDaily coords = {coords}/>
            }
            
        </div>
    )
}

export default SearchCoords
