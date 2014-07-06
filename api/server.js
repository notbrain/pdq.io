/*
           _         _
          | |       (_)
 _ __   __| | __ _   _  ___
| '_ \ / _` |/ _` | | |/ _ \
| |_) | (_| | (_| |_| | (_) |
| .__/ \__,_|\__, (_)_|\___/
| |             | |
|_|             |_|

*/

var express          = require('express')
var morgan           = require('morgan')
// var methodOverride   = require('method-override')
var bodyParser       = require('body-parser')

var app              = express()

app.use(bodyParser.json())

var port = process.env.NGXP4SEED_PORT || 3000

var env  = process.env.NODE_ENV || 'dev'

var db = require('./config/mongo').db

app.all('*',function(req, res, next) {
  console.log('[console.log] %s %s %s', req.method, req.url, req.path)
  // console.dir(req)
  next()
})

//                      __
//    _________  __  __/ /____  _____
//   / ___/ __ \/ / / / __/ _ \/ ___/
//  / /  / /_/ / /_/ / /_/  __(__  )
// /_/   \____/\__,_/\__/\___/____/
// 
// app.use('/', require('./routes/public').router)
// app.use('/auth', require('./routes/auth').router)
app.use('/api/sfmuni',     require('./controllers/sfmuniAPI').controller)
app.use('/api/blockchain', require('./controllers/blockchain').controller)
app.use('/api/coinbase',   require('./controllers/coinbase').controller)
app.use('/api/record',     require('./controllers/record').controller)

// SERVER
app.listen(port)
console.log('Listening for connections on port ' + port)
