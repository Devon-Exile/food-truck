const express = require('express')
const app = express()
const port = 3000

// Allows us to send JSON
app.use(express.json())

// Allows us to respond with static webpages
app.use(express.static('public'))

// API endpoints
app.use('/api/v1/', require('./routes/api/v1/food'))
app.use(require('./routes/static'))

app.listen(port, () => console.log(`http://localhost:${port}/`))