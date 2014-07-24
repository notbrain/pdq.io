// 

var express       = require('express')
var request       = require('request')
var _             = require('lodash')
var moment        = require('moment')
var router        = express.Router()

// var passport = require('../config/passport').passport

// apiRouter.use(passport.initialize())
// apiRouter.use(passport.authenticate('bearer', { session: false }))

router.use(function(req, res, next) {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': 0
  });
  next()
})

router.get('/forecast',
  function(req, res) {
    
    request.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=San+Francisco&cnt=3&mode=json&units=imperial', function(err, response, body){
      
      console.log(body)
      
      var json = JSON.parse(body)
      
      var forecast = {
        'day1': json.list[0],
        'day2': json.list[1],
        'day3': json.list[2]
      }
      
      res.json(forecast)
    })
    
})

module.exports = {
  controller: router
}