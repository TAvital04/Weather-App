import {useState} from "react"

import SearchCoords from "./SearchCoords.tsx"
import SearchZip from "./SearchZip.tsx"

import mainStyle from "../../styles/main.module.css"
import style from "../../styles/search.module.css"

const Search = (props: any) => {
    const [coords, setCoords] = useState(false)
    return (
        <>
            <div className = {style.contents}>
                <h2 className = {`${style.heading} ${mainStyle.heading}`}>Search</h2>
                
                <div className = {style.body}>
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