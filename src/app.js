const path = require('path')
const express = require('express')
const weather = require('../objects/weather')


const app = express()
app.set('view engine', 'hbs')

const myPath = path.join(__dirname, '../public')

app.use(express.static(myPath))

app.get('', (req, res) => {
    res.render('index')
})



app.get('/weather', (req, res) => {
    res.send(weather)
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})