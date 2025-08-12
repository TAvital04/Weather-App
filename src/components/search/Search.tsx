import {useState} from "react"

import SearchCoords from "./SearchCoords.tsx"
import SearchZip from "./SearchZip.tsx"

const Search = (props: any) => {
    const [coords, setCoords] = useState(true)
    return (
        <>
            <h1>Search</h1>
            <button onClick={() => setCoords(!coords)}>
                {coords? "Search By Zip": "Search By Coordinates"}
            </button>

            {coords && 
                coords? 
                    <SearchCoords setApiData = {props.setApiData}/>: 
                    <SearchZip setApiData = {props.setApiData}/>
            }
        </>
    )
}

export default Search