'use strict';

angular.module('btcApp')
.controller('MainCtrl', function ($log, $scope, $http, $interval, APPCONFIG) {
  
  $log.info('[MainCtrl]')
  
  $scope.$watch('coinbase', function(newVal, oldVal) {
    
    $log.info('[$scope.$watch(\'coinbase\')] ' + moment().format('X.SSS'))
    
    if( !_.isUndefined(oldVal) && newVal !== oldVal ) {
      // store price for graph if new value
      $log.info({newval: newVal, oldval: oldVal})
      $http.post('http://192.168.1.12:3000/api/record/update/price', {price:newVal.subtotal.amount})
    }
  }, true)
  
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
  
  $interval(function() {
    refreshMuniData()
    refreshBlockchainData()
    refreshCoinbaseData()
  }, 60000)
  
  refreshMuniData()
  refreshBlockchainData()
  refreshCoinbaseData()
  // drawGraph()
});
