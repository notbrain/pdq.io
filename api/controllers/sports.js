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
  
  var expires = moment().minute(0).second(0).add('hours', 8).format('ddd, DD MMM YYYY HH:mm:ss')
  console.log(expires)
  
  res.set({
    // 'Cache-Control': 'no-cache, no-store, must-revalidate',
    // 'Pragma': 'no-cache',
    // Thu, 01 Dec 1983 20:00:00 GMT
    // 'Expires': 0,
    'Expires': expires + ' GMT',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PUT',
    'Access-Control-Allow-Headers': 'Authorization,content-type,accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since'
  });
  next()
})

router.get('/mlb/nl',
  function(req, res) {
    
    // http://sanfrancisco.giants.mlb.com/lookup/json/named.standings_all_league_repeater.bam?sit_code=%27h0%27&season=2014&standings_all.col_in=division_champ,place,wild_card,playoffs_flag_mlb,playoffs_sw,division_id,division,team_short,file_code,w,l,pct,gb&league_id=103&league_id=104
    
    request.get('http://sanfrancisco.giants.mlb.com/lookup/json/named.standings_all_league_repeater.bam?sit_code=%27h0%27&season=2014&standings_all.col_in=division_champ,place,wild_card,playoffs_flag_mlb,playoffs_sw,division_id,division,team_short,file_code,w,l,pct,gb&league_id=104', function(err, response, json){
      
      res.json(JSON.parse(json))
      
    })
    
})

module.exports = {
  controller: router
}