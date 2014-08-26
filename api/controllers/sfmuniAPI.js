var express       = require('express')
var apiController = express.Router()
var sfmuni        = require('nextbusjs').client();

// var passport = require('../config/passport').passport

// apiRouter.use(passport.initialize())
// apiRouter.use(passport.authenticate('bearer', { session: false }))

apiController.use(function(req, res, next) {
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

apiController.get('/:stopNumber',
  function(req, res) {
    
    sfmuni.cacheAgency('sf-muni', function (err) {
      if (err) {
        console.log(' ➺ muni failure')
        console.dir(err)
        // throw err
        res.status(500)
        
      } else {
        
        sfmuni.stopPredict(req.params.stopNumber, null, function (err, data) {
          console.log(' ➺ muni failure')
          console.dir(err)
          
          res.json(data)
          
        }, 'minutes')
        
      }
    });
    
})

module.exports = {
  controller: apiController
}