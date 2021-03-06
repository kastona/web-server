const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')


const app = express()
const PORT = process.env.PORT || 3000

const staticFolder = path.join(__dirname, '../public')
const templatesFolder = path.join(__dirname, '../templates/views')
const partialsFolder = path.join(__dirname, '../templates/partials')


app.use(express.static(staticFolder))
app.set('view engine', 'hbs')
app.set('views', templatesFolder)
hbs.registerPartials(partialsFolder)

app.get('', (req, res) => {
    res.render('index', {title: 'Weather', description: 'This is the main page of the app', name: 'Steve'})
})

app.get('/about', (req, res) => {
    res.render('about', {description: 'This is a little message to tell you more about us.', title: 'About App', name: 'Steve'})
})

app.get('/help', (req, res) => {
    res.render('help', {title: 'help page', description: 'This page provides help to you.', name: 'Steve'})
})



app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({error: 'No address provided'})
    }

    geocode(address, (error,{latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }

        weather(latitude, longitude, (error, {temperature, probabilityOfRain}) => {
            if(error) return res.send({error})
        

        res.send({
            temperature,
            probabilityOfRain,
            location,
            searchAddress: address
        })

    })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {error: 'Help article not found'})
})

app.get('*', (req, res) => {
    res.render('404', {error: 'Page not found'})
})


app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})