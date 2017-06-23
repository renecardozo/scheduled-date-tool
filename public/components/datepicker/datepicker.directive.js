(function(){
  'use strict';
  /**
   * @description Custom service where is the datepicker to be shown 
   * to select the start date
   */
  function DatePickerDirective(){
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl){
        $(function(){
            element.datepicker({
                dateFormat: 'yy-mm-dd',
                inline:true,
                showOtherMonths: true,
                dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                onSelect:function (date) {
                    ngModelCtrl.$setViewValue(date);
                    scope.$apply();
                }
            });
        });
      }
    }
  }
  var app = angular.module('myApp');
  app.directive('datepicker', DatePickerDirective)
})();