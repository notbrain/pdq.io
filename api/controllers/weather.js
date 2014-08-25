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
    'Expires': 0,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PUT',
    'Access-Control-Allow-Headers': 'Authorization,content-type,accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since'
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

router.get('/forecastNEW',
  function(req, res) {
    //f30c5e510b0f910bd35f540a9d1dec12
    // 37.7857361,-122.4318036
    // https://api.forecast.io/forecast/f30c5e510b0f910bd35f540a9d1dec12/37.7857361,-122.4318036
    request.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=San+Francisco&cnt=3&mode=json&units=imperial', function(err, response, body){
      
      console.log(body)
      
      var json = JSON.parse(body)
      
      var forecast = {
        'current': json.currently,
        'day1': json.daily.data[0],
        'day2': json.daily.data[1],
        'day3': json.daily.data[2]
      }
      
      res.json(forecast)
    })
    
})

module.exports = {
  controller: router
}