(function(){
  'use strict';
  var app = angular.module('myApp', ['angularMoment'])
  .constant('BASE_URL', 'https://holidayapi.com/v1/holidays')
  .constant('API_KEY', '76f213e0-6cab-4161-85d4-25ac155dd395');
})()