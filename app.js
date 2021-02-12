const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')

const app = express()

//Models

//Controllers
const indexController = require('./controllers/index')
const errorController = require('./controllers/error')

//Routes
const indexRoutes = require('./routes/index')

// Views
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/', indexRoutes)

app.get('/500', errorController.get500)

app.use(errorController.get404)

app.use((error, req, res, next) => {
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    errorMessage: error
  })
})

let port = process.env.PORT
if (port == null || port == '') {
  port = 3000
}

app.listen(port, function () {
  console.log(`Server started on port ${port}`)
})
