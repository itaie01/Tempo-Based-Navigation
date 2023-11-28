import axios from 'axios'

const serverUrl = 'http://localhost:3001'

export function getLocationData(query) {
    const request = axios.get(`${serverUrl}/search/${query}`)
    return request.then(response => response.data)
}