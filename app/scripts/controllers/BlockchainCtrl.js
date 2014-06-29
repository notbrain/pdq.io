'use strict';

/**
 * @ngdoc function
 * @name btcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the btcApp
 */
angular.module('btcApp')
.controller('BlockchainCtrl', function ($scope, $http, $interval) {
  
  var refreshBlockchainData = function() {
    
    $http.get('https://blockchain.info/q/totalbc?cors=true').success(function(response){
      $scope.totalbtc = parseFloat(response) / 100000000
    })
    
    $http.get('https://blockchain.info/q/marketcap?cors=true').success(function(response){
      $scope.marketcap = parseFloat(response) / 1000000000
    })
    
    // $scope.blockchain.marketcap = $http.get('https://blockchain.info/q/marketcap')
    // $scope.blockchain.hashrate = $http.get('https://blockchain.info/q/hashrate')
    
  }
  
  $interval(function() {
    refreshBlockchainData()
  }, 60000)
  
  refreshBlockchainData()
  
})
