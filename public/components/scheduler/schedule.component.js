(function(){
  'use strict';

  /**
   * @function ScheduleController
   * @author Rene Cardozo
   * @description Controller function added to component scheduler
   * @param {Function} schedulerService  Custom service to get the holidays
   * @param {Function} datePickerService Custon service to put the datepicker element
   * @param {Object} moment            Third party library to interact with dates
   */
  function ScheduleController(schedulerService, datePickerService, moment){
    var scheduleCtrl = this;

    /**
     * @function calculateSchedule
     * @author Rene Cardozo
     * @description Calculate the date to do the request for holidays.
     */
    function calculateSchedule(){
      var startDate = scheduleCtrl.startDate || undefined;
      var numberOfDays = scheduleCtrl.numberOfDays || undefined;
      var countryCode = scheduleCtrl.countryCode? scheduleCtrl.countryCode.toUpperCase() : '';
      var endDate = datePickerService.addDays(startDate, numberOfDays)
      var rangeMonth =  datePickerService.getMonths(startDate, endDate);
      getHoliDays(rangeMonth, countryCode, startDate, endDate);
    }

    /**
     * @function $onInit
     * @author  Rene Cardozo
     * @description Init the properties of component
     */
    function $onInit(){
      scheduleCtrl.showCalendar = false;
      scheduleCtrl.requestErrorHolidays = false;
    }

    /**
     * @function getHolidays
     * @author Rene Cardozo
     * @description Get the holidays given the range of months ans country code.
     * @param  {Array} months      List of months where search the holidays
     * @param  {String} countryCode The code country to be used  to search the holidays
     * @param  {String} startDate   Start date to search the holidays
     * @param  {String} endDate     End date to searhc the holidays
     */
    function getHoliDays(months, countryCode, startDate, endDate){
      schedulerService.getHolidays(months, countryCode)
      .then(
        function onSuccessResponse(response){
          datePickerService.showCalendar(response.holidays, response.months, startDate, endDate);
          scheduleCtrl.showCalendar = !scheduleCtrl.showCalendar;
        }, 
        function onFailurResponse(error){
          console.log(error);
          scheduleCtrl.errorMessageHoliday = error;
          scheduleCtrl.requestErrorHolidays = !scheduleCtrl.requestErrorHolidays;
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