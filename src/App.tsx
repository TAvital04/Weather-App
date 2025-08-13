import {useState, useEffect} from "react"

import Search from "./components/search/Search.tsx"
import Weather from "./components/weather/Weather.tsx"

import style from "./styles/app.module.css"

const key = import.meta.env.VITE_API_KEY

const App = () => {
  const [apiData, setApiData] = useState(null)

  useEffect(() => {
    const reRenderData = async (apiData: any) => {
      const res = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${apiData.lat}&lon=${apiData.lon}&units=metric&appid=${key}`
      )

      const resJSON = await res.json()

      setApiData(resJSON)
    }

    const interval = setInterval(() => {
      if(apiData) {
        reRenderData(apiData)
      }
    }, 6000 * 1000)

    return () => clearInterval(interval)
  }, [apiData])

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
