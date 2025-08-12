import {useState} from "react"

import Search from "./components/search/Search.tsx"
import Weather from "./components/weather/Weather.tsx"

const App = () => {
  const [apiData, setApiData] = useState(null)

  return (
    <>
      <Search setApiData = {setApiData}/>
      {apiData && <Weather apiData = {apiData}/>}
    </>
  )
}

export default App
