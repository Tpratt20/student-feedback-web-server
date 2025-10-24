// use node server.js to run manually, CTRL+C to stop server, npx nodemon to allow server to update automatically


const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index.js')

const app = express() // creates the web application server

// enable parsing of POST request body
app.use(bodyParser.urlencoded({extended: false}))

const staticFileLocation = path.join(__dirname, 'public')
app.use(express.static(staticFileLocation))

// tell app where the views are
app.set('views', path.join(__dirname, 'views'))

// use handlebars to generate views
app.set('view engine', 'hbs')

app.use('/', indexRouter) // all request to the app will be pass
// to indexRouter

// start server running
const server = app.listen(process.env.PORT || 3000, function() {
    console.log('Server running on port', server.address().port)
})