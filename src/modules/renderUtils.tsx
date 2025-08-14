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
        <>
            {props.status}
        </>
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
        <>
            {type} = {temp} {unit}
        </>
    )
}
export const getTemp = (temp: number, unit: boolean, type: string) => {
    return <Temp temp = {temp} unit = {unit} type = {type}/>
}

// Rain
const Rain = (props: any) => {
    const rain = props.unit? (props.rain * 24).toFixed(1): ((props.rain * 24) / 25.4).toFixed(1)
    const unit = props.unit? "mm/d": "in/d"

    return (
        <>
            Rain: {rain} {unit}
        </>
    )
}
export const getRain = (rain: number, unit: boolean) => {
    return <Rain rain = {rain} unit = {unit}/>
}

// Snow
const Snow = (props: any) => {
    const snow = props.unit? (props.snow * 24).toFixed(1): ((props.snow * 24) / 25.4).toFixed(1)
    const unit = props.unit? "mm/d": "in/d"

    return (
        <>
            Snow: {snow} {unit}
        </>
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
        <>
            Clouds: {props.clouds}%
        </>
    )
}
export const getClouds = (clouds: number) => {
    return <Clouds clouds = {clouds}/>
}

// Humidity
const Humidity = (props: any) => {
    return (
        <>
            Humidity: {props.humidity}%
        </>
    )
}
export const getHumidity = (humidity: number) => {
    return <Humidity humidity = {humidity}/>
}

// Pressure
const Pressure = (props: any) => {
    return (
        <>
            Pressure: {props.pressure} hPa
        </>
    )
}
export const getPressure = (pressure: number) => {
    return <Pressure pressure = {pressure}/>
}

// UV Index
const UV = (props: any) => {
    return (
        <>
            UV Index: {props.uvIndex}
        </>
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
        <>
            Visibility: {visibility} {unit}
        </>
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
    } else if(props.direction > 122 && props.direction <= 157) {
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
        <>
            Wind:
                Speed = {windSpeed} {unit}
                Direction = {direction}
        </>
    )
}
export const getWind = (windSpeed: number, direction: number, unit: boolean) => {
    return <Wind windSpeed = {windSpeed} direction = {direction} unit = {unit}/>
}

const Sun = (props: any) => {
    const sunrise = getTime(props.sunrise, props.timezone)
    const sunset = getTime(props.sunset, props.timezone)

    return (
        <>
            Sun
                Rises: {sunrise}
                Sets: {sunset}
        </>
    )
}
export const getSun = (sunrise: number, sunset: number, timezone: string) => {
    return <Sun sunrise = {sunrise} sunset = {sunset} timezone = {timezone}/>
}