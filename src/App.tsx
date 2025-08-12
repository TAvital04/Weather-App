import {useState} from "react"

import Search from "./components/search/Search.tsx"
import Weather from "./components/weather/Weather.tsx"

import style from "./styles/app.module.css"

const App = () => {
  const [apiData, setApiData] = useState(null)

  return (
    <div className = {style.contents}>
      <Search setApiData = {setApiData}/>
      {apiData && <Weather apiData = {apiData}/>}
    </div>
  )
}

export default App
