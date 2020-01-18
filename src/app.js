const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weather = require('../objects/weather')


const app = express()

const staticFolder = path.join(__dirname, '../public')
const templatesFolder = path.join(__dirname, '../templates/views')
const partialsFolder = path.join(__dirname, '../templates/partials')


app.use(express.static(staticFolder))
app.set('view engine', 'hbs')
app.set('views', templatesFolder)
hbs.registerPartials(partialsFolder)

app.get('', (req, res) => {
    res.render('index', {title: 'The root page', description: 'This is the main page of the app', name: 'Steve'})
})

app.get('/about', (req, res) => {
    res.render('about', {description: 'This is a little message to tell you more about us.', title: 'About App', name: 'Steve'})
})

app.get('/help', (req, res) => {
    res.render('help', {title: 'help page', description: 'This page provides help to you.', name: 'Steve'})
})



app.get('/weather', (req, res) => {
    res.send(weather)
})

app.get('*', (req, res) => {
    res.render('404')
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})