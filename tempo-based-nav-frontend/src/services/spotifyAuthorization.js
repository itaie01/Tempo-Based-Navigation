export function requestAuthorization(clientId, clientSecret) {
    localStorage.setItem('client_id', clientId)
    localStorage.setItem('client_secret', clientSecret)
    const AUTHORIZE_URL = "https://accounts.spotify.com/authorize"
    const REDIRECT_URL = "http://localhost:5173"
    const PERMISSIONS = [
        "user-library-read",
        "user-library-modify",
        "user-read-recently-played",
        "user-top-read",
        "user-read-currently-playing",
        "playlist-modify-public",
        "playlist-read-private"
    ]

    return `${AUTHORIZE_URL}?client_id=${clientId}&response_type=token&show_dialog=true&redirect_uri=${encodeURI(REDIRECT_URL)}&scope=${PERMISSIONS.join(" ")}`
}

export function getTokenFromUrl() {
    return window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
            let parts = item.split("=")
            initial[parts[0]] = decodeURIComponent(parts[1])
            
            return initial
        }, {})
}