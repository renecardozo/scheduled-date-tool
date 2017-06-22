(function (){
  'use strict';
  function DatePickerService(moment){

    function showCalendar(holidays, months){
      var minDate = holidays[0].date;
      var maxDate = holidays[holidays.length - 1 ].date;
     $("#schedulerDatePicker").datepicker({
        numberOfMonths: 3,
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

    function addDays(date, days) {
      var days = parseInt(days);
      var nextMonth = new Date(date);
      nextMonth.setDate(nextMonth.getDate() + days);
      return moment(nextMonth).format('YYYY-MM-DD');
    }

    function getMonths(startDate, endDate){
      var startDate = moment(startDate);
      var endDate = moment(endDate);
      var months = [];
      if (endDate.isBefore(startDate)) {
         console.log('End date must be greated than start date.');
      }
      var currentDate = startDate.clone();
      while (currentDate.isBefore(endDate)) {
          months.push({
            month: new Date(currentDate).getMonth(),
            year: new Date(currentDate).getFullYear(),
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