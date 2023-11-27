import Map from './components/Map'
import SearchBar from './components/SearchBar'
import SpotifyLogin from './components/SpotifyLogin'
import { useEffect, useState } from 'react'
import { getTokenFromUrl } from './services/spotifyAuthorization'
import SpotifyWebApi from 'spotify-web-api-js';

import getLocationData from './services/nominatim'

const App = () => {
    const [startQuery, setStartQuery] = useState('')
    const [endQuery, setEndQuery] = useState('')
    const [startCoords, setStartCoords] = useState(null)
    const [endCoords, setEndCoords] = useState(null)
    const [spotifyToken, setSpotifyToken] = useState("")
    const SPOTIFY = new SpotifyWebApi()

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
        const urlParams = getTokenFromUrl()
        window.location.hash = ""
        const _spotifyToken = urlParams.access_token
        console.log(`Spotify Token: ${_spotifyToken}`)

        if (_spotifyToken) {
            setSpotifyToken(_spotifyToken)
            SPOTIFY.setAccessToken(_spotifyToken)
            SPOTIFY.getMe().then(user => console.log(user))
        }
    }, [SPOTIFY])

    return (
        <>
            <SearchBar label={'Start Location'} searchQuery={startQuery} handleQueryChange={handleQueryChangeStart} handleKeyPress={handleKeyPressStart}/>
            <SearchBar label={'End Location'} searchQuery={endQuery} handleQueryChange={handleQueryChangeEnd} handleKeyPress={handleKeyPressEnd}/>
            <Map startCoords={startCoords} endCoords={endCoords} />
            <SpotifyLogin />
        </>
    )
}

export default App