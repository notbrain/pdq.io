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
  
  var expires = moment().minute(0).second(0).add(8, 'hours').format('ddd, DD MMM YYYY HH:mm:ss')
  
  res.set({
    // 'Cache-Control': 'no-cache, no-store, must-revalidate',
    // 'Pragma': 'no-cache',
    // 'Expires': 0,
    'Expires': expires + ' GMT',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PUT',
    'Access-Control-Allow-Headers': 'Authorization,content-type,accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since'
  });
  next()
})

router.get('/forecast',
  function(req, res) {
    
    console.log('/weather/forecast')
    
    request.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=San+Francisco&cnt=3&mode=json&units=imperial', function(err, response, body){
      
      var json = {}
      var forecast = {}
      
      if(_.isEmpty(body)) {
        
        console.log('FORECAST DATA EMPTY JSON BODY')
        
      } else {
        
        json = JSON.parse(body)
      
        forecast = {
          'day1': json.list[0],
          'day2': json.list[1],
          'day3': json.list[2]
        }
        
      }
      
      res.json(200, forecast)
      
    })
    
})

router.get('/v2/forecast',
  function(req, res) {
    
    request.get('https://api.forecast.io/forecast/f30c5e510b0f910bd35f540a9d1dec12/37.7857361,-122.4318036', function(err, response, body){
      
      console.log(err)
      
      var json = JSON.parse(body)
      
      var forecast = {
        'current': json.currently,
        'daily':   json.daily,
        'day1':    json.daily.data[0],
        'day2':    json.daily.data[1],
        'day3':    json.daily.data[2]
      }
      
      res.json(forecast)
    })
    
})

module.exports = {
  controller: router
}