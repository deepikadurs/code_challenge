chartuiApp.controller('chart.ChartCtrl', ['$scope', '$q', '$rootScope',
  function($scope, $q, $rootScope) {
    $scope.challenge = {
      chart : null,
      chartStyle : [{
        "label" : "Line Chart",
        "value" : "line"}, 
      {
        "label" : "Bar Chart",
        "value" : "bar"
      }],
      startDate : null,
      endDate : null
    }

    $scope.generateChart = function() {
      var initTimeStamp = {
        'startDate' : $scope.challenge.startDate,
        'endDate' : $scope.challenge.endDate
      };
      $scope.$broadcast('chartLoad', initTimeStamp);
    }
  }
]);