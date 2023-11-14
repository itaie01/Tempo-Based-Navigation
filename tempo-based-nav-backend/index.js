const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 3001

app.get('/', (req, res) => {
    res.send('Welcome to CORS server 😁')
})

app.get('/search/:query', (req, res) => {
    const encodedNominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(req.params.query)}&format=jsonv2`
    console.log(encodedNominatimUrl)
    axios.get(encodedNominatimUrl)
        .then(response => {
            res.json(response.data)
        })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})