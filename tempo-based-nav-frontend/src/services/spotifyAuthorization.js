const REDIRECT_URL = "http://localhost:5173"

export const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}
  
const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
}

export async function requestAuthorization(clientId) {
    const AUTHORIZE_URL = new URL("https://accounts.spotify.com/authorize")
    const PERMISSIONS = [
        "user-library-read",
        "user-library-modify",
        "user-read-recently-played",
        "user-top-read",
        "user-read-currently-playing",
        "playlist-modify-public",
        "playlist-read-private"
    ]

    localStorage.setItem('client_id', clientId);

    let storedCodeVerifier = localStorage.getItem('code_verifier');
    let codeVerifier;
    if (!storedCodeVerifier) {
        codeVerifier = generateRandomString(64);
        localStorage.setItem('code_verifier', codeVerifier);
    }
    else {
        codeVerifier = storedCodeVerifier;
    }

    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    const scope = PERMISSIONS.join(" ")

    const params = {
        response_type: "code",
        client_id: clientId,
        scope: scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: encodeURI(REDIRECT_URL),
    }

    AUTHORIZE_URL.search = new URLSearchParams(params).toString();
    return AUTHORIZE_URL.toString();
}
  
export function handleAuthorizationRedirct() {
    const queryString = window.location.search
    return queryString.length > 0 ? new URLSearchParams(queryString).get('code') : null
}

export const fetchApiToken = async code => {
    let codeVerifier = localStorage.getItem('code_verifier'); // stored in the previous step
  
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: localStorage.getItem("client_id"),
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URL,
        code_verifier: codeVerifier,
      }),
    }
  
    const body = await fetch("https://accounts.spotify.com/api/token", payload);
    const response = await body.json();
    console.log(response);
  
    localStorage.setItem('access_token', response.access_token);
  }