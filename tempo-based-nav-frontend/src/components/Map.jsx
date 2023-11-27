import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, useMap, Marker} from 'react-leaflet'
import RoutingControl from './RoutingControl'
import Routing from './RoutingControl'

import axios from 'axios'

const ChangeMapView = ({ coords }) => {
    const map = useMap();
    map.setView(coords, 13)
    return null
}

const Map = ({ startCoords, endCoords }) => {
    const [position, setPosition] = useState(null)

    const ipApiUrl = 'http://ip-api.com/json/'

    const geoOptions = {
        enableHighAccuracy: true,
        timeOut: 20000,
        maximumAge: 60 * 60 * 24
    }

    const geoSuccess = (position) => {
        const lat = position.coords.latitude
        const long = position.coords.longitude
        console.log(`Latitude: ${lat}, Longitude: ${long}`)
        const coords = [lat, long]
        setPosition(coords)
    }

    useEffect(() => {
        const source = axios.CancelToken.source()
    
        navigator.geolocation.getCurrentPosition(geoSuccess, (error) => {
            console.log(`Error (${error.code}): ${error.message}`)
            console.log('Geolocation not supported by this browser')
    
            axios.get(ipApiUrl, { cancelToken: source.token })
                .then(response => {
                    const lat = response.data.lat
                    const long = response.data.lon
                    console.log(`Latitude: ${lat}, Longitude: ${long} (from IP API)`)
                    const coords = [lat, long]
                    setPosition(coords)
                    console.log(coords)
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        console.log('Request canceled', error.message)
                    } else {
                        console.log(error)
                    }
                })
        }, geoOptions)
    
        return () => {
            source.cancel('Operation canceled by the user.')
        }
    }, [])

    return (
        <>
            {position && (
                <MapContainer
                    style={{ height: "100vh", width: "100%", zIndex: -1 }}
                    center={position}
                    zoom="13"
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ChangeMapView coords={position} />
                    {startCoords && (<Marker position={startCoords}></Marker>)}
                    {endCoords && (<Marker position={endCoords}></Marker>)}
                    {/* <RoutingControl startCoords={startCoords} endCoords={endCoords}/> */}
                    <Routing startCoords={startCoords} endCoords={endCoords}></Routing>
                </MapContainer>
            )}
        </>
    )
}

export default Map