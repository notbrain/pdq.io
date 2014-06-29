'use strict';

angular.module('btcApp')
.controller('MainCtrl', function ($log, $scope, $http, $interval) {
  
  $scope.$watch('coinbase', function(newVal, oldVal) {
    if(newVal !== oldVal) {
      // store price for graph if new value
      $log.info({newval: newVal, oldval: oldVal})
      $http.post('http://192.168.1.12:3000/api/record/update/price', {price:newVal.subtotal.amount})
    }
  }, true)
  
  var refreshBlockchainData = function() {
    
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
    $http.get('http://192.168.1.12:3000/api/coinbase/sellprice').success(function(response) {
      
      $scope.coinbase = response
      $scope.coinbase.twentybtcnet = (response.amount * 20) / 1000
      
    })
  }
  
  var refreshMuniData = function(){
    
    $log.info('refreshing data')
    
    $http.get('http://192.168.1.12:3000/api/sfmuni/6592', null).success(function(response) {
      
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
    
    $http.get('http://192.168.1.12:3000/api/sfmuni/4640', null).success(function(response){
      
      $scope.twentyTwo = _.find(response, function(obj) {
          if(obj.title === '22-Fillmore') {
            return true
          }
      })
      
    })
    
    $http.get('http://192.168.1.12:3000/api/sfmuni/4296', null).success(function(response){
      
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
});
