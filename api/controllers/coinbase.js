var express       = require('express')
var request       = require('request')
var _             = require('lodash')
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

router.get('/sellprice',
  function(req, res) {
    
    request.get('https://coinbase.com/api/v1/prices/sell', function(err, response, body){
      res.json(JSON.parse(body))
    })
    
})

router.get('/historical/:page',
  function(req, res) {
    
    // res.set({
    //   'Content-type': 'application/json; charset=UTF-8'
    // })
    
    request.get('https://coinbase.com/api/v1/prices/historical', function(err, response, body){
      
      var arrPrices = body.split('\n')
      
      var jsonPrices = []
      
      _.forEach(arrPrices, function(val, idx, coll) {
        
        var aryDatePrice = val.split(',')
        
        var pricePoint = {
          date: aryDatePrice[0],
          price: parseFloat(aryDatePrice[1])
        }
        
        // console.log(pricePoint)
        
        jsonPrices.push(pricePoint)
        
      })
      
      res.json(200, jsonPrices)
    })
    
})

module.exports = {
  controller: router
}