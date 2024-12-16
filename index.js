const express = require('express');
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5200;
app.use(express.json())
app.use(cors())




app.get('/', (req, res) => {
    res.send("Your app is running.")
})

app.listen(port, (req, res) => {
    console.log(`App is Running at Port : ${port}`)
})