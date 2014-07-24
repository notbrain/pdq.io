var express = require('express')
var request = require('request')
var moment  = require('moment')
var _       = require('lodash')
var router  = express.Router()

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
  })
  next()
})

router.post('/update/price',
  function(req, res) {
    
    console.log(req.param('price'))
    res.json({price:req.param('price')})
    
})

var getHistoricalPage = function(page, callback) {
  
  request.get('https://coinbase.com/api/v1/prices/historical?page='+page, function(err, response, body){
    return callback()
  })
  
}

router.get('/historical/days/30', function(req, res) {
  
  // res.send(200)
  // make call for first page, then
  //   if not far enough back, make call for 2nd page, then
  //     if not far enough back, recurse
  // var oldest_date = moment().subtract('days', '30')
  request.get('https://coinbase.com/api/v1/prices/historical', function(err, response, body){
    
    console.log('coinbase historical callback')
    
    if(err) console.dir(err)
    
    var dateDoc = {
      ticks: []
    }
    
    var dateStrings = body.split('\n')
    
    _.forEach(dateStrings, function(dStr) {
      
      var duo = dStr.split(',')
      
      var tick = moment(duo[0])
      
      if(tick.isAfter(moment().subtract('days','31'))) {
        
        var obj = {
          datetime: duo[0],
          price: duo[1]
        }
        
        dateDoc.ticks.push(obj)
        
        console.dir(obj)
        
      }
      
    })
    
    
    res.json(dateDoc)
    
  })
  
})

module.exports = {
  controller: router
}