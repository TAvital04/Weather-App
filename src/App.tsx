import {useState} from "react"

import Search from "./components/search/Search.tsx"
import Weather from "./components/weather/Weather.tsx"

import style from "./styles/app.module.css"

const App = () => {
  const [apiData, setApiData] = useState(null)

  return (
    <div className = {style.contents}>
      <h1>Weather</h1>
      <div className = {style.body}>
        <Search setApiData = {setApiData}/>
        {apiData && <Weather apiData = {apiData}/>}
      </div>
    </div>
  )
}

export default App
