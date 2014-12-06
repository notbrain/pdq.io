'use strict';

/**
 * @ngdoc overview
 * @name btcApp
 * @description
 * # btcApp
 *
 * Main module of the application.
 */
angular
  .module('btcApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/sanfrancisco.html',
        controller: 'MainCtrl'
      })
      .when('/theme/sf', {
        templateUrl: 'views/sanfrancisco.html',
        controller: 'MainCtrl'
      })
      .when('/theme/proto', {
        templateUrl: 'views/default.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/legacy', {
        templateUrl: 'views/legacy.html',
        controller: 'LegacyCtrl'
      })
      .when('/btc', {
        templateUrl: 'views/btc.html',
        controller: 'BlockchainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      })
  })
  .config(function($httpProvider, $locationProvider) {
    $httpProvider.defaults.useXDomain = true
    $locationProvider.html5Mode(true);
  })
