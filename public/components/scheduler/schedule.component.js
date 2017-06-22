(function(){
  'use strict';
  function ScheduleController(schedulerService, datePickerService, moment){
    var scheduleCtrl = this;
    function calculateSchedule(){
      var endDate = datePickerService.addDays(scheduleCtrl.startDate, scheduleCtrl.numberOfDays)
      var rangeMonth =  datePickerService.getMonths(scheduleCtrl.startDate, endDate);
      getHoliDays(rangeMonth, scheduleCtrl.countryCode);
    }
    function $onInit(){
      scheduleCtrl.showCalendar = false;
    }
    function getHoliDays(months, countryCode){
      schedulerService.getHolidays(months, countryCode)
      .then(
        function onSuccessResponse(response){
          datePickerService.showCalendar(response.holidays, response.months);
          scheduleCtrl.showCalendar = !scheduleCtrl.showCalendar;
        }, 
        function onFailurResponse(error){
          console.log(error);
        }
      );
    }
    scheduleCtrl.$onInit = $onInit;
    scheduleCtrl.calculateSchedule = calculateSchedule;
  }

  var app = angular.module('myApp')
  .component('scheduleCompoment',{
      templateUrl:'./components/scheduler/schedule.component.html' ,
      controller: 'scheduleController',
      controllerAs: 'scheduleCtrl'
  })
  .controller('scheduleController', ScheduleController);
})();