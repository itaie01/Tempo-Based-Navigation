import Map from './components/Map'
import SearchBar from './components/SearchBar'
import { useState } from 'react'

import getLocationData from './services/nominatim'

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
            // setStartCoords(searchQuery(startQuery))
            searchStartQuery(startQuery)
        }
    }

    const handleKeyPressEnd = (event) => {
        if (event.keyCode === 13) {
            searchEndQuery(endQuery)
        }
    }

    return (
        <>
            <SearchBar label={'Start Location'} searchQuery={startQuery} handleQueryChange={handleQueryChangeStart} handleKeyPress={handleKeyPressStart}/>
            <SearchBar label={'End Location'} searchQuery={endQuery} handleQueryChange={handleQueryChangeEnd} handleKeyPress={handleKeyPressEnd}/>
            <Map startCoords={startCoords} endCoords={endCoords} />
        </>
    )
}

export default App