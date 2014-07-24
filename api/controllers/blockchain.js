var express       = require('express')
var blockchain = express.Router()

// var passport = require('../config/passport').passport

// apiRouter.use(passport.initialize())
// apiRouter.use(passport.authenticate('bearer', { session: false }))

blockchain.use(function(req, res, next) {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': 0
  });
  next()
})

blockchain.get('/',
  function(req, res) {
    
    
    
})

module.exports = {
  controller: blockchain
}