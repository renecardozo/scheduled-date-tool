(function(){
  'use strict';
  var app = angular.module('myApp');
  function SchedulerService($http, $q, BASE_URL, API_KEY){
    var URL = BASE_URL +'?key=' + API_KEY;

    function requestHolidays(params){
      var deferred = $q.defer();
      $http.get(URL, {
        params: params
      })
      .then(
        function onSuccessResponse(response){
          deferred.resolve(response.data.holidays);
        },
        function onFailurResponse(reject){
          deferred.reject(reject.data.error);
        })
      return deferred.promise;
    }

    function getHolidays(months, countryCode){
      var promises = [];
      var deferred = $q.defer();
      angular.forEach(months, function iterator(item){
        var params = {
          month: item.month,
          year: item.year,
          country: countryCode
        }
        promises.push(requestHolidays(params));
      });
      $q.all(promises)
      .then(
        function onSuccess(response){
          var holidays = [];
          angular.forEach(response, function(item){
            holidays = holidays.concat(item)
          })
          deferred.resolve({
            holidays:holidays,
            months: response.length
          });
        },
        function onFailur(reject){
          deferred.reject(reject);
        })
      return deferred.promise;
    }

    return {
      getHolidays: getHolidays
    };
  }
  app.service('schedulerService', SchedulerService);
})();