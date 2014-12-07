
//             _
//  ___ ____  (_)
// / _ `/ _ \/ /
// \_,_/ .__/_/
//    /_/
//

var express          = require('express')
var morgan           = require('morgan')
// var methodOverride   = require('method-override')
var bodyParser       = require('body-parser')

var app              = express()

app.use(bodyParser.json())

var port = process.env.NODE_PORT || 3000

var env  = process.env.NODE_ENV || 'dev'

// var db = require('./config/mongo').db

app.all('*',function(req, res, next) {
  console.log('[console.log] %s %s %s', req.method, req.url, req.path)
  // console.dir(req)
  next()
})



//                  __
//   _______  __ __/ /____ ___
//  / __/ _ \/ // / __/ -_|_-<
// /_/  \___/\_,_/\__/\__/___/
// 
// app.use('/', require('./routes/public').router)
// app.use('/auth', require('./routes/auth').router)
app.use('/',           require('./controllers/apiRoot').controller)
app.use('/sfmuni',     require('./controllers/sfmuniAPI').controller)
app.use('/blockchain', require('./controllers/blockchain').controller)
app.use('/coinbase',   require('./controllers/coinbase').controller)
app.use('/record',     require('./controllers/record').controller)
app.use('/weather',    require('./controllers/weather').controller)
app.use('/sports',     require('./controllers/sports').controller)

// SERVER
app.listen(port)
console.log('Listening for connections on port ' + port)
