'use strict';

angular.module('btcApp')
.controller('MainCtrl', function ($window, $log, $scope, $http, $interval, APPCONFIG) {
  
  $log.info('[MainCtrl]')
  
  $scope.$watch('coinbase', function(newVal, oldVal) {
    
    $log.info('[$scope.$watch(\'coinbase\')] ' + moment().format('X.SSS'))
    
    if( !_.isUndefined(oldVal) && newVal !== oldVal ) {
      // store price for graph if new value
      // $log.info({newval: newVal, oldval: oldVal})
      //$http.post('http://192.168.1.12:3000/api/record/update/price', {price:newVal.subtotal.amount})
    }
    
  }, true);
  
  var matrixCalendar = function() {
    // $log.info('[matrixCalendar]')
    
    var months = []
    for(var i=0; i<12; i++) {
      
      // get days in month
      var dt = moment()
      
      dt.month(i)
      
      // $log.info('Month '+ i +': ', dt.format('YYYY-MM-DD HH:mm Z'))
      
      var month = {
        daysInMonth: dt.daysInMonth(),
        days: []
      }
      
      for(var d = 1; d <= month.daysInMonth; d++) {
        
        dt.date(d)
        
        // $log.info('dt : ', dt.format('YYYY-MM-DD HH:mm Z'))
        // $log.info('now: ', moment().format('YYYY-MM-DD HH:mm Z'))
        
        var isToday = false
        
        if(dt.isSame(moment(), 'day')) {
          // $log.info('NOW: ' + moment().format('MMDD HH:mm'))
          isToday = true
        }
        
        var day = {
          isToday: isToday,
          dt: dt.format('D'),
          isWeekend: dt.day() === 0 || dt.day() === 6
        }
        
        month.days.push(day)
      }
      
      months.push(month)
      
    }
    
    $scope.months = months
    
  }
  
  $scope.daysInYear = function(){
    
    var ary = []
    for(var i = 1; i < 365; i++) {
      ary.push(i)
    }
    
    return ary
    
  }
  
  var refreshBlockchainData = function() {
    
    $log.info('[refreshBlockchainData]')
    
    $http.get('https://blockchain.info/q/totalbc?cors=true').success(function(response) {
      $scope.totalbtc = parseFloat(response) / 100000000000000
    })
    
    $http.get('https://blockchain.info/q/marketcap?cors=true').success(function(response) {
      $scope.btcmarketcap = parseFloat(response) / 1000000000
    })
     
    $http.get('https://blockchain.info/q/hashrate?cors=true').success(function(response){
      $scope.btchashrate = parseFloat(response) / 1000000
    })
    
    $http.get('https://blockchain.info/q/24hrtransactioncount?cors=true').success(function(response) {
      $scope.transactioncount = parseFloat(response)
    })
    
    $http.get('https://blockchain.info/q/getdifficulty?cors=true').success(function(response) {
      $scope.diff = parseFloat(response) / 1000000000
    })
    
  }
  
  var refreshCoinbaseData = function() {
    
    $log.info('[refreshCoinbaseData]')
    
    $http.get(APPCONFIG.apiHost + '/coinbase/sellprice').success(function(response) {
      
      $scope.coinbase = response
      $scope.twentybtcnet = (response.amount * 20) / 1000
      
    })
  }
  
  var refreshMuniData = function() {
    
    $log.info('[refreshMuniData]')
    
    $http.get(APPCONFIG.apiHost + '/sfmuni/6592', null).success(function(response) {
      
      // $log.info(response)
      
      $scope.two = _.find(response, function(obj) {
          if(obj.title === '2-Clement') {
            return true
          }
      })
      
      $scope.three = _.find(response, function(obj) {
          if(obj.title === '3-Jackson') {
            return true
          }
      })
      
    })
    
    $http.get(APPCONFIG.apiHost + '/sfmuni/4640', null).success(function(response) {
      
      $scope.twentyTwo = _.find(response, function(obj) {
          if(obj.title === '22-Fillmore') {
            return true
          }
      })
      
    })
    
    $http.get(APPCONFIG.apiHost + '/sfmuni/4296', null).success(function(response) {
      
      $scope.thirtyEight = _.find(response, function(obj) {
          if(obj.title === '38-Geary') {
            return true
          }
      })
    })
  }
  
  var refreshWeatherForecast = function(){
    
    var url = APPCONFIG.apiHost + '/weather/forecast'
    
    $http({
      method: 'GET',
      url: url,
      responseType: 'json',
      timeout: 10000
    }).success(function(response) {
    
    // $http.get(APPCONFIG.apiHost + '/weather/forecast', null).success(function(response) {
      
      $scope.weatherForecast = response
      
      $scope.tomorrowHeading = moment(response.day1.dt, 'X').format('dddd, MMMM D')
      
      $scope.twoDaysFromNow = moment(response.day2.dt, 'X').format('dddd, MMMM D')
      
      $scope.threeDaysFromNow = moment(response.day3.dt, 'X').format('dddd, MMMM D')
      
    })
    
  }
  
  var getMLBStandings = function() {
    
    // cache layer
    
    var url = APPCONFIG.apiHost + '/sports/mlb/nl'
    $http({
      method: 'GET',
      url: url,
      cache: true,
      responseType: 'json',
      timeout: 10000
    }).success(function(response) {
      
      var standings = response.standings_all_league_repeater.standings_all.queryResults.row
      
      $log.debug(standings)
      
      $scope.nlWestStandings = _.filter(standings, function(obj, idx, coll) {
        return obj.division === 'National League West'
      })
      
      $log.debug($scope.nlWestStandings)
      
    })
    
  }
  
  $interval(function() {
    refreshBlockchainData()
    refreshCoinbaseData()
    refreshWeatherForecast()
  }, 60000*5)
  
  refreshMuniData()
  refreshBlockchainData()
  refreshCoinbaseData()
  refreshWeatherForecast()
  
  // time tick
  $interval(function() {
    refreshMuniData()
    $scope.dateTimeKST = moment().zone('+09:00').format('dddd, HH:mm')
    $scope.todaysDate  = moment().format('MMMM Do')
    $scope.now         = moment().format('h:mma')
  }, 60000)
  
  $scope.todaysDate = moment().format('MMMM Do')
  
  $scope.dateTimeKST = moment().zone('+09:00').format('dddd, HH:mm')
  
  $scope.now = moment().format('h:mma')
  
  matrixCalendar()
  getMLBStandings()
  
});
