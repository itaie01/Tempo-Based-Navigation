import { useState } from "react";
import { requestAuthorization } from "../services/spotifyAuthorization";

const SpotifyLogin = () => {
    const [clientId, setClientId] = useState('')
    const [clientSecret, setClientSecret] = useState('')


    const handleClientIdChange = (event) => {
        setClientId(event.target.value)
        console.log(event.target.value)
    }

    const handleClientSecretChange = (event) => {
        setClientSecret(event.target.value)
        console.log(event.target.value)
    }

    return (
        <>
            <div>
                <label htmlFor="cliendId">Client ID</label>
                <input type="text" placeholder="" value={clientId} onChange={handleClientIdChange} />
            </div>
            <div>
                <label htmlFor="clientSecret">Client Secret</label>
                <input type="text" id="clientSecret" value={clientSecret} onChange={handleClientSecretChange} />
            </div>
            <div>
                <a href={requestAuthorization(clientId, clientSecret)}>Request Authorization</a>
            </div>
        </>
    )
}

export default SpotifyLogin;