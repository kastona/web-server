const path = require('path')
const express = require('express')
const weather = require('../objects/weather')


const app = express()

const staticFolder = path.join(__dirname, '../public')
const templatesFolder = path.join(__dirname, '../templates')


app.use(express.static(staticFolder))
app.set('view engine', 'hbs')
app.set('views', templatesFolder)

app.get('', (req, res) => {
    res.render('index', {title: 'some title', name: 'some name'})
})

app.get('/about', (req, res) => {
    res.render('about', {aboutUs: 'This is a little message to tell you more about us.'})
})

app.get('/help', (req, res) => {
    res.render('help', {helpMessage: 'If you want any help, just hit me up.'})
})



app.get('/weather', (req, res) => {
    res.send(weather)
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})