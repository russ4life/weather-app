const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Expess config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views loction
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Russell Burdikin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Russell Burdikin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Russell Burdikin',
        message: 'This is a message'
    })
})

app.get('/weather', (req, res) => {
    const { address = "" } = req.query
    if (address === "") {
        return res.send({
            error: 'You must provide an Address'
        })
    }
    geocode(address, (error, { latitude = 0, longitude = 0, location = '' } = {}) => {
        if (error) {
            return res.send({
                error
            })
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            return res.send({
                address,
                forecast: forecastData,
                location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help Error',
        name: 'Russell Burdikin',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Russell Burdikin',
        message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})