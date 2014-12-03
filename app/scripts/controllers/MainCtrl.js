'use strict';

angular.module('btcApp')
.controller('MainCtrl', function ($window, $log, $scope, $http, $interval, $timeout, APPCONFIG) {
  
  $log.info('[MainCtrl]')
  
  // $scope.$watch('coinbase', function(newVal, oldVal) {
    
  //   $log.info('[$scope.$watch(\'coinbase\')] ' + moment().format('X.SSS'))
    
  //   if( !_.isUndefined(oldVal) && newVal !== oldVal ) {
  //     // store price for graph if new value
  //     // $log.info({newval: newVal, oldval: oldVal})
  //     //$http.post('http://192.168.1.12:3000/api/record/update/price', {price:newVal.subtotal.amount})
  //   }
    
  // }, true);

  $scope.epochToDate = function(epoch, format) {
    var mmnt = moment.unix(epoch)
    return mmnt.format(format)
  }
  
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
  
  var refreshCoinbaseHistoricalData = function() {
    
    $log.info('[refreshCoinbaseHistoricalData]')
    
    $http.get(APPCONFIG.apiHost + '/coinbase/historical').success(function(response) {
      
      $scope.historicalData = response
      
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
      
    }).then(function(){
      
      if(_.isUndefined($scope.two) || _.isNull($scope.two.predictions)) {
        $scope.two = {
          predictions: ['-','-']
        }
        
      }
      
      if(_.isUndefined($scope.three) || _.isNull($scope.three.predictions)) {
        $scope.three = {
          predictions: ['-','-']
        }
        
      }
      
    })
    
    $http.get(APPCONFIG.apiHost + '/sfmuni/4640', null).success(function(response) {
      
      $scope.twentyTwo = _.find(response, function(obj) {
          if(obj.title === '22-Fillmore') {
            return true
          }
      })
      
    }).then(function(){
      
      if(_.isUndefined($scope.twentyTwo) || _.isNull($scope.twentyTwo.predictions)) {
        
        $scope.twentyTwo = {
          predictions: ['-','-']
        }
        
      }
      
    })
    
    $http.get(APPCONFIG.apiHost + '/sfmuni/4296', null).success(function(response) {
      
      $scope.thirtyEight = _.find(response, function(obj) {
          if(obj.title === '38-Geary') {
            return true
          }
      })
    }).then(function(){
      if(_.isUndefined($scope.thirtyEight) || _.isNull($scope.thirtyEight.predictions)) {
        $scope.thirtyEight = {
          predictions: ['-','-']
        }
        
      }
    })
  }
  
  var refreshWeatherForecast = function(){
    
    $log.info('[refreshWeatherForecast]')
    
    var url = APPCONFIG.apiHost + '/weather/v2/forecast'
    
    $http({
      method: 'GET',
      url: url,
      responseType: 'json',
      timeout: 10000
    }).success(function(response) {
      
      $log.debug(response)
      
      $scope.weather = response
      
      $log.info('[render Skycons]')
      
      var skycons = new Skycons({"color": "#e9e9e9"});
      
      // skycons.add("skycon-today", response.current.icon);
      // skycons.add("skycon-tomorrow", response.day1.icon);
      // skycons.add("skycon-2days", response.day2.icon);
      
      $log.debug('response.current.icon', response.current.icon)
      $log.debug('response.day1.icon', response.day1.icon)
      $log.debug('response.day2.icon', response.day2.icon)
      
      
      $timeout(function() {
        _.forEach(response.daily.data, function(datum, idx){
          skycons.add("skycon-" + idx, datum.icon);
        })
        skycons.play();
      }, 3000)
      
    }).error(function(response){
      $log.debug("[refreshWeatherForecast] FAIL", response)
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
  
  var onceAMinute = function() {
    
    refreshMuniData()
    
    var now = moment()
    
    $scope.todaysDate  = now.format('MMM D')
    $scope.now         = now.format('h:mm')
    $scope.ampm        = now.format('a')
    $scope.dayOfWeek   = now.format('dddd')
    $scope.dateTimeKST = now.zone('+09:00').format('ddd, HH:mm')
    
  }
  
  var everyFifteenMinutes = function() {
    
    refreshBlockchainData()
    refreshCoinbaseData()
    refreshCoinbaseHistoricalData()
    
  }
  
  
  // hourly on meta refresh
  // matrixCalendar()
  // getMLBStandings()
  refreshWeatherForecast()
  everyFifteenMinutes()
  onceAMinute()
  
  // time tick
  $interval(function() {
    onceAMinute()
  }, 60000)
  
  $interval(function() {
    everyFifteenMinutes()
  }, 60000*15)
  
});
