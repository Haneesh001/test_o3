require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParse = require('cookie-parser')
const cors = require('cors')

const passport = require('passport')

//Common Response
const responseModel = require('./api/utilities/response_model')

//Swagger
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

//DB Connection
const config = require('./config/config')

// Passport config
require('./config/passport')(passport)

//Routes file directory


const userApi = require('./api/controllers/userAPI')



let session = require('express-session');

app.enable('trust proxy')
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requeted-With, Content-Type, Accept, Authorization'
  )
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
  }
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    return res.status(200).json({})
  }
  next()
})

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

//MiddleWares
app.use(bodyParser.json())
app.use(cookieParse())
app.use(cors())



//Api Document Url
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//My Routes


app.use('/userApi', userApi)




app.get('/test', (req, res) => {
  return res.send({
    message: 'Working...',
  })
})

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

//Handled any Internal server Err
app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json(
      responseModel.show(500, false, null, error.message || 'Please try again')
    )
})

global.__basedir = __dirname + '/'

//PORT
const PORT = process.env.PORT || config.app.port

// Set base url for hets.




//Starting a server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})

module.exports = { passport }
