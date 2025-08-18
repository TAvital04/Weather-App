import style from "../styles/renderElementUtils.module.css"

//Date and time
export const getDate = (dateTime: number, timezone: string): string => {
    return new Date(dateTime * 1000).toLocaleDateString("en-US", {
        timeZone: timezone, weekday: "long", month: "long", day: "numeric"
    })
}

export const getTime = (dateTime: number, timezone: string): string => {
    return new Date(dateTime * 1000).toLocaleTimeString("en-US", {
        timeZone: timezone, hour: "numeric", minute: "2-digit", hour12: true
    })
}

// Status
const Status = (props: any) => {
    return (
        <div className = {style.contents}>
            <div className = {style.heading}>Status</div>
            
            <div className = {`${style.body} ${style.bodyText}`}>{props.status}</div>
        </div>
    )
}
export const getStatus = (status: string) => {
    return <Status status = {status}/>
}

// Temperature
const Temp = (props: any) => {
    const type = props.type
    const temp = props.unit? props.temp.toFixed(0): (props.temp * (9/5) + 32).toFixed(0)
    const unit = props.unit? "C": "F"

    return (
        <div className = {style.contents}>
            <div className = {style.heading}>{type}</div>
            
            <div className = {`${style.body} ${style.bodyText}`}>{temp} {unit}</div>
        </div>
    )
}
export const getTemp = (temp: number, unit: boolean, type: string) => {
    return <Temp temp = {temp} unit = {unit} type = {type}/>
}

// Rain and snow
const Rain = (props: any) => {
    const rain = props.unit? (props.rain * 24).toFixed(1): ((props.rain * 24) / 25.4).toFixed(1)
    const unit = props.unit? "mm/d": "in/d"

    return (

        <div className = {style.contents}>
            <div className = {style.heading}>Rain</div>
            
            <div className = {`${style.body} ${style.bodyText}`}>{rain} {unit}</div>
        </div>
    )
}
export const getRain = (rain: number, unit: boolean) => {
    return <Rain rain = {rain} unit = {unit}/>
}

const Snow = (props: any) => {
    const snow = props.unit? (props.snow * 24).toFixed(1): ((props.snow * 24) / 25.4).toFixed(1)
    const unit = props.unit? "mm/d": "in/d"

    return (
        <div className = {style.contents}>
            <div className = {style.heading}>Snow</div>
            
            <div className = {`${style.body} ${style.bodyText}`}>{snow} {unit}</div>
        </div>
    )
}
export const getSnow = (snow: number, unit: boolean) => {
    return <Snow snow = {snow} unit = {unit}/>
}

export const getRainSnow = (rain: number, snow: number, unit: boolean) => {
    if(snow > 0) {
        return <Snow snow = {snow} unit = {unit}/>
    } else {
        return <Rain rain = {rain} unit = {unit}/>
    }
}

//Clouds
const Clouds = (props: any) => {
    return (
        <div className = {style.contents}>
            <div className = {style.heading}>Clouds</div>
            
            <div className = {`${style.body} ${style.bodyText}`}>{props.clouds}%</div>
        </div>
    )
}
export const getClouds = (clouds: number) => {
    return <Clouds clouds = {clouds}/>
}

// Humidity
const Humidity = (props: any) => {
    return (
        <div className = {style.contents}>
            <div className = {style.heading}>Humidity</div>
            
            <div className = {`${style.body} ${style.bodyText}`}>{props.humidity}%</div>
        </div>
    )
}
export const getHumidity = (humidity: number) => {
    return <Humidity humidity = {humidity}/>
}

// Pressure
const Pressure = (props: any) => {
    return (
        <div className = {style.contents}>
            <div className = {style.heading}>Pressure</div>
            
            <div className = {`${style.body} ${style.bodyText}`}>{props.pressure} hPa</div>
        </div>
    )
}
export const getPressure = (pressure: number) => {
    return <Pressure pressure = {pressure}/>
}

// UV Index
const UV = (props: any) => {
    return (
        <div className = {style.contents}>
            <div className = {style.heading}>UV Index</div>
            
            <div className = {`${style.body} ${style.bodyText}`}>{props.uvIndex}</div>
        </div>
    )
}
export const getUVIndex = (uvIndex: number) => {
    return <UV uvIndex = {uvIndex}/>
}

// Visibility
const Visibility = (props: any) => {
    const visibility = props.unit? props.visibility: props.visibility * 1.09
    const unit = props.unit? "m": "y"

    return (
        <div className = {style.contents}>
            <div className = {style.heading}>Visibility</div>
            
            <div className = {`${style.body} ${style.bodyText}`}>{visibility} {unit}</div>
        </div>
    )
}
export const getVisibility = (visibility: number, unit: boolean) => {
    return <Visibility visibility = {visibility} unit = {unit}/>
}

// Wind
const Wind = (props: any) => {
    const windSpeed = props.unit? (props.windSpeed).toFixed(2): (props.windSpeed * 2.24).toFixed(2)
    const unit = props.unit? "m/s": "mi/h"

    let direction
    if(props.direction > 337 || props.direction <= 22) {
        direction = "N"
    } else if(props.direction > 22 && props.direction <= 67) {
        direction = "NE"
    } else if(props.direction > 67 && props.direction <= 112) {
        direction = "E"
    } else if(props.direction > 112 && props.direction <= 157) {
        direction = "SE"
    } else if(props.direction > 157 && props.direction <= 202) {
        direction = "S"
    } else if(props.direction > 202 && props.direction <= 247) {
        direction = "SW"
    } else if(props.direction > 247 && props.direction <= 292) {
        direction = "W"
    } else if(props.direction > 292 && props.direction <= 337) {
        direction = "NW"
    }

    return (
        <div className = {style.contents}>
            <div className = {style.heading}>Wind</div>
            
            <div className = {style.body}>
                <div className = {style.subContents}>
                    <div className = {style.subHeading}>Speed</div>
                    <div className = {`${style.body} ${style.bodyText} ${style.subBody}`}>{windSpeed} {unit}</div>
                </div>

                <div className = {style.subContents}>
                    <div className = {style.subHeading}>Direction</div>
                    <div className = {`${style.body} ${style.bodyText} ${style.subBody}`}>{direction}</div>
                </div>
            </div>
        </div>
    )
}
export const getWind = (windSpeed: number, direction: number, unit: boolean) => {
    return <Wind windSpeed = {windSpeed} direction = {direction} unit = {unit}/>
}

const Sun = (props: any) => {
    const sunrise = getTime(props.sunrise, props.timezone)
    const sunset = getTime(props.sunset, props.timezone)

    return (
        <div className = {style.contents}>
            <div className = {style.heading}>Sun</div>
            
            <div className = {style.body}>
                <div className = {style.subContents}>
                    <div className = {style.subHeading}>Rises</div>
                    <div className = {`${style.body} ${style.bodyText} ${style.subBody}`}>{sunrise}</div>
                </div>

                <div className = {style.subContents}>
                    <div className = {style.subHeading}>Sets</div>
                    <div className = {`${style.body} ${style.bodyText} ${style.subBody}`}>{sunset}</div>
                </div>
            </div>
        </div>
    )
}
export const getSun = (sunrise: number, sunset: number, timezone: string) => {
    return <Sun sunrise = {sunrise} sunset = {sunset} timezone = {timezone}/>
}