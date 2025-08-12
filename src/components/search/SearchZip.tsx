import {useState} from "react"

const key = import.meta.env.VITE_API_KEY

import style from "../../styles/searchZip.module.css"

const SearchZip = (props: any) => {
    const [zip, setZip] = useState("")
    const [country, setCountry] = useState("")

    const [error, setError] = useState(false)

    const handleApiData = async (zip: string, country: string, setApiData: any) => {
        const geo = await fetch(
            `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${key}`
        )

        if(geo.ok) {
            const geoJSON = await geo.json()
            
            const weather = await fetch(
                `https://api.openweathermap.org/data/3.0/onecall?lat=${geoJSON.lat}&lon=${geoJSON.lon}&units=metric&appid=${key}`
            )

            const weatherJSON = await weather.json()

            setApiData(weatherJSON)

            setError(false)
        } else {
            setError(true)
        }
    }

    return (
        <div className = {style.contents}>
            <div className = "input">
                <input
                    type = "text"
                    placeholder = "zip code"
                    value = {zip}
                    onChange = {(e) => setZip(e.target.value)}
                />

                <input
                    type = "text"
                    placeholder = "country code"
                    value = {country}
                    onChange = {(e) => setCountry(e.target.value)}
                />
            </div>

            <div className = "error">
                {error && <p>This combination does not exist</p>}
            </div>

            <div className = "submit">
                <button
                    onClick = {async () => await handleApiData(zip, country, props.setApiData)}
                >Submit</button>
            </div>
        </div>
    )
}

export default SearchZip