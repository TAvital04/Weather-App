import {useState} from "react"

import SearchCoords from "./SearchCoords.tsx"
import SearchZip from "./SearchZip.tsx"

import style from "../../styles/search.module.css"

const Search = (props: any) => {
    const [coords, setCoords] = useState(true)
    return (
        <>
            <div className = {style.contents}>
                <h1>Search</h1>
                
                <div className = {style.search}>
                    <button onClick={() => setCoords(!coords)}>
                        {coords? "Search By Zip": "Search By Coordinates"}
                    </button>
                    
                    {coords?
                        <SearchCoords setApiData = {props.setApiData}/>: 
                        <SearchZip setApiData = {props.setApiData}/>
                    }
                </div>
            </div>
        </>
    )
}

export default Search