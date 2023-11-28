import { useState, useEffect } from "react";
import { requestAuthorization, generateRandomString } from "../services/spotifyAuthorization";

const SpotifyLogin = () => {
    const [clientId, setClientId] = useState(localStorage.getItem('client_id'))

    const handleClientIdChange = (event) => {
        setClientId(event.target.value)
    }

    return (
        <>
            <div>
                <label htmlFor="cliendId">Client ID</label>
                <input type="text" placeholder="" value={clientId} onChange={handleClientIdChange} />
            </div>
            <div>
                <a href={requestAuthorization(clientId)}>Request Authorization</a>
            </div>
        </>
    )
}

export default SpotifyLogin;