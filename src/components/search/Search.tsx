import {useState} from "react"

import SearchCoords from "./SearchCoords.tsx"
import SearchCity from "./SearchCity.tsx"

const Search = (props: any) => {
    const [coords, setCoords] = useState(true)
    return (
        <>
            <h1>Search</h1>
            <button onClick={() => setCoords(!coords)}>
                {coords? "Search By City": "Search By Coordinates"}
            </button>

            {coords && 
                coords? 
                    <SearchCoords setApiData = {props.setApiData}/>: 
                    <SearchCity setApiData = {props.setApiData}/>
            }
        </>
    )
}

export default Search