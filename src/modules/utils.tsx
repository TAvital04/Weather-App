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