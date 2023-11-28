import Map from './components/Map'
import SearchBar from './components/SearchBar'
import SpotifyLogin from './components/SpotifyLogin'
import { useEffect, useState } from 'react'

import { getLocationData } from './services/nominatim'
import { handleAuthorizationRedirct, fetchApiToken } from './services/spotifyAuthorization'

const App = () => {
    const [startQuery, setStartQuery] = useState('')
    const [endQuery, setEndQuery] = useState('')
    const [startCoords, setStartCoords] = useState(null)
    const [endCoords, setEndCoords] = useState(null)

    const searchStartQuery = query => {
        getLocationData(query)
            .then(locationData => setStartCoords([locationData[0].lat, locationData[0].lon]))
    }

    const searchEndQuery = query => {
        getLocationData(query)
            .then(locationData => setEndCoords([locationData[0].lat, locationData[0].lon]))
    }

    const handleQueryChangeStart = (event) => {
        setStartQuery(event.target.value)
    }

    const handleQueryChangeEnd = event => {
        setEndQuery(event.target.value)
    }
    
    const handleKeyPressStart = (event) => {
        if (event.keyCode === 13) {
            searchStartQuery(startQuery)
        }
    }

    const handleKeyPressEnd = (event) => {
        if (event.keyCode === 13) {
            searchEndQuery(endQuery)
        }
    }

    useEffect(() => {
        if (window.location.search.length > 0) {
            const code = handleAuthorizationRedirct()
            console.log(code)
            fetchApiToken(code)
        }
        
    }, [])

    return (
        <>
            <SearchBar label={'Start Location'} searchQuery={startQuery} handleQueryChange={handleQueryChangeStart} handleKeyPress={handleKeyPressStart}/>
            <SearchBar label={'End Location'} searchQuery={endQuery} handleQueryChange={handleQueryChangeEnd} handleKeyPress={handleKeyPressEnd}/>
            <SpotifyLogin />
            <Map startCoords={startCoords} endCoords={endCoords} />
        </>
    )
}

export default App