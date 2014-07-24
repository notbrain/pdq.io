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
    'Expires': 0
  });
  next()
})

apiController.get('/:stopNumber',
  function(req, res) {
    
    sfmuni.cacheAgency('sf-muni', function (err) {
      if (err) {
        throw err;
      } else {
        
        sfmuni.stopPredict(req.params.stopNumber, null, function (err, data) {
          // console.dir(err)
          console.dir(data)
          
          res.json(data)
          
        }, 'minutes');
        
        // sfmuni.stopPredict(6592, null, function (err, data) {
        //   // console.dir(err)
        //   console.dir(data)
        // }, 'minutes');
        
        // sfmuni.stopPredict(4640, null, function (err, data) {
        //   // console.dir(err)
        //   console.dir(data)
        // }, 'minutes');
        
        // sfmuni.stopPredict(4296, null, function (err, data) {
        //   // console.dir(err)
        //   console.dir(data)
        // }, 'minutes');
        
        // var nearest = sfmuni.closestStops(37.7856142,-122.4331905);
        // console.dir(nearest)
        
      }
    });
    
})

module.exports = {
  controller: apiController
}