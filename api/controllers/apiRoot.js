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

router.get('/apiroot',
  function(req, res) {
    
    res.json({
      name: 'apiroot',
      auth_request: '/token'
    })
    
})

module.exports = {
  controller: router
}