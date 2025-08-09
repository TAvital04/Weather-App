function Weather(props: { 
    coords: { 
        lat: number; 
        lng: number 
    } 
}) {
    return (
        <>
            <p>{`${props.coords.lat} ${props.coords.lng}`}</p>
        </>
    )
}

export default Weather