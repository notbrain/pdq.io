/* jshint unused:vars */
'use strict';

angular.module('btcApp', [])
.directive('btcGraph', function($log) {
  $log.info('[btcGraph]')
  return {
    templateUrl: '/views/_performanceGraph.html',
    restrict: 'E',
    transclude: true,
    replace: true,
    controller: function() { // attrs
      
      $log.info('[btcGraph#link:]')
      
      
    }
    
  }
  
});
