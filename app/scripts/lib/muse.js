
// // Siren Aware API Consumer

// var sirenJSON = {
//   'class': ['className', 'subClassName'],
//   'properties': {
    
//   },
//   'entities': [
    
//   ]
  
// }



// angular.module('muse', []).config(function(){
    
//     // config
    
//   }
  
// )


// angular.module('muse').service('', function(){
  
// })

// // Usage Design
// ///////////////////////////////////////////////////////////////////////////

// api-root address

// http://api.domain.tld/

// dependency inject Muse module


// // Set up initial api root access - /current-user for example
// var APIMuse = Muse.config({
//   root_endpoint: 'http://api'
// })

// // 
// APIMuse
// .get({'entity':'installation', 'accountNumber': 29348})
// .performAction({'installation-performance'})
// .then(function(performanceData){
//   $log.info(performanceData)
// })
  
// // Alternative Syntax
// APIMuse.getEntity({
//   'class':'installation',                  // subset classes make this harder to do
//   'accountNumber': 29348,
//   'perform': {                             // perform described action when resolved
//     'action': 'installation-performance',
//     'params': {
//       'granularity': 'daily',
//       'from': '2014-05-01',
//       'to': '2014-05-30'
//     },
//     'returnProperty': 'performance'        // instead of result.properties.performance
//   }
// }).then(function(result){
//   // use result in controller
//   // 
//   $scope.graphData = performance
  
  
// })