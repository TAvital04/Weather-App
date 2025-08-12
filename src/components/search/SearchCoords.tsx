import {useState} from "react"

const key = import.meta.env.VITE_API_KEY

const SearchCoords = (props: any) => {
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")

    const [error, setError] = useState(false)

    const handleApiData = async (lat: number, lng: number, setApiData: any) => {
        const res = await fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${key}`
        );

        const resJSON = await res.json();

        setApiData(resJSON)
    }

    const validateCoords = async (latData: string, lngData: string, setApiData: any) => {
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
            handleApiData(lat, lng, setApiData)
        } else {
            setError(true)
        }
    }

    return (
        <div className = "contents">
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
                        onClick = {async () => await validateCoords(lat, lng, props.setApiData)}
                    >Submit</button>        
                </div>
            </div>
        </div>
    )
}

export default SearchCoords
