'use strict';

angular.module('btcApp').directive('btcGraph', function($log) {
  // $log.info('[btcGraph]')
  return {
    templateUrl: 'views/_btcGraph.html',
    restrict: 'E',
    transclude: true,
    replace: true,
    link: function() { // attrs
      
      $log.info('[btcGraph#link:]')
      
      
    }
    
  }
  
})