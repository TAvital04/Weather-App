import {useState} from "react"

type Coord = {
    lat: number;
    lng: number;
}

function Search() {
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")
    const [coords, setCoords] = useState<Coord | null>(null)

    function tryCoords(latData: string, lngData: string) {
        let lat = Number(latData)
        let lng = Number(lngData)

        let latBool = false
        let lngBool = false

        if(!Number.isNaN(lat)) {
            if(lat >= -90 && lat <= 90) {
                latBool = true
            }
        }

        if(!Number.isNaN(lng)) {
            if(lng >= -180 && lng <= 180) {
                lngBool = true
            }
        }

        if(latBool && lngBool) {
            setCoords({lat, lng})
        }
    }

    return (
        <>
            <h1>Search</h1>

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

            <button
                onClick = {() => tryCoords(lat, lng)}
            >Submit</button>

            {coords != null && <h1>{`${coords.lat}, ${coords.lng}`}</h1>}
        </>
    )
}

export default Search
