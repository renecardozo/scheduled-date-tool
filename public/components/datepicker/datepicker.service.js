(function (){
  'use strict';

  /**
   * @function DatePickerService
   * @author Rene Cardozo
   * @description  Custom service
   * @param {Object} moment            Third party library to interact with dates
   */
  function DatePickerService(moment){

    /**
     * @function showCalendar
     * @description  Custom service where is the datepicker to be used
     * as constructor of calendar of holidays 
     * @author Rene Cardozo
     * @param  {Array} holidays      List of holidays
     * @param  {Integer} months The months where is the holidays
     * @param  {String} startDate   Start date to search the holidays
     * @param  {String} endDate     End date to searhc the holidays
     */
    function showCalendar(holidays, months, startDate, endDate){
      var minDate = startDate;
      var maxDate = endDate;
     $("#schedulerDatePicker").datepicker({
        numberOfMonths: months,
        dateFormat: 'yy-mm-dd',
        minDate: minDate,
        maxDate: maxDate,
        beforeShowDay: function(d) {
            var styleHoliday = [true, '', ''];
            if (d.getDay() == 6 || d.getDay() === 0 ) {
              styleHoliday = [true, 'weekend-days', ''];
            } else {
              styleHoliday = [true, 'not-weekend-days', ''];
            }
            for(var idx=0; idx<holidays.length; idx++) {
              var date = new Date(holidays[idx].date);
              date.setHours(0,0,0,0);
              if (date.getTime() === d.getTime()) {
                styleHoliday =  [true, 'holiday', holidays[idx].name];
                break;
              }
            }
            return styleHoliday;
        }
      });
    }

    /**
     * @fuinction addDays
     * @param {Date} date It is used to calculate the next month to the range of month
     * @param {Integer} days Quantity to be used to calculate the next month
     * @return {String} The end date to be used to search the holidays
     */
    function addDays(date, days) {
      var days = parseInt(days);
      var nextMonth = new Date(date);
      nextMonth.setDate(nextMonth.getDate() + days);
      return moment(nextMonth).format('YYYY-MM-DD');
    }

    /**
     * @function getMonths
     * @author  Rene Cardozo
     * @param  {String} startDate The start date to search the holidays
     * @param  {String} endDate   The end date to search the holidays
     * @return {Array}           List of months to use as range to search the holidays
     */
    function getMonths(startDate, endDate){
      var startDate = moment(startDate);
      var endDate = moment(endDate);
      var months = [];
      if (endDate.isBefore(startDate)) {
         console.log('End date must be greated than start date.');
      }
      var currentDate = startDate.clone();
      while (currentDate.isBefore(endDate)) {
        var month = new Date(currentDate).getMonth() + 1;
        months.push({
          month: month,
          year: new Date(currentDate).getFullYear()
        });
        currentDate.add(1, 'month');
      }
      return months;
    }
    return {
      showCalendar: showCalendar,
      addDays: addDays,
      getMonths: getMonths
    }
  }

  var app = angular.module('myApp');
  app.service('datePickerService', DatePickerService)
})();