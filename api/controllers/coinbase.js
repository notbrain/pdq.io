var express       = require('express')
var request       = require('request')
var async         = require('async')
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

router.get('/sellprice',
  function(req, res) {
    
    request.get('https://coinbase.com/api/v1/prices/sell', function(err, response, body){
      res.json(JSON.parse(body))
    })
    
})

var fetch = function(url,cb){
  request.get(url, function(err,response,body){
    if ( err){
      cb(err);
    } else {
      cb(null, body); // First param indicates error, null=> no error
    }
  })
}

router.get('/historical2', function(req, res){
  
  console.log('/coinbase/historical2')
  
  var historical_url = 'https://coinbase.com/api/v1/prices/historical'
    
  var pages = [1,2,3,4,5]
  
  var page_urls = []
  
  _.forEach(pages, function(num, idx) {
    
    page_urls[idx] = historical_url + '?page=' + num
    
  })
  
  
  
})

router.get('/historical',
  function(req, res) {
    
    console.log('/coinbase/historical')
    
    var historical_url = 'https://coinbase.com/api/v1/prices/historical'
    
    var pages = [1,2,3,4,5]
    
    var page_urls = []
    
    _.forEach(pages, function(num, idx) {
      
      page_urls[idx] = historical_url + '?page=' + num
      
    })
    
    async.map(page_urls, fetch, function(err, results) {
      
      if (err){
        console.log('async.map ERROR!!!')
        console.dir(err)
        
      } else {
        
        // results[0] -> "file1" body
        // results[1] -> "file2" body
        // results[2] -> "file3" body
        body = results.join('\n')
        
        var arrPrices = body.split('\n')
        
        var jsonPrices = []
        
        var changeCount = 0
        _.forEach(arrPrices, function(val, idx, coll) {
          
          // console.log(val)
          
          changeCount++
          
          var aryDatePrice = val.split(',')
          
          var pricePoint = {
            date: moment(aryDatePrice[0]).format('YYYY-MM-DDTHH:mm:ss'),
            price: parseFloat(aryDatePrice[1])
          }
          
          if(!_.isNull(aryDatePrice[0])) {
            jsonPrices.push(pricePoint)
          }
          
        })
        
        console.log('count: ' + changeCount)
        
        res.json(200, jsonPrices)
      }
    })
    
})

module.exports = {
  controller: router
}