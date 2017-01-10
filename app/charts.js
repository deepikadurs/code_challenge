chartuiApp.controller('chart.ChartCtrl', ['$scope', '$q', '$rootScope', 'mockDataModel', '$alert', 'chartProperties',
  function($scope, $q, $rootScope, mockDataModel, $alert, chartProperties) {
    $scope.challenge = {
      chart : null,
      chartStyle : [{
        "label" : "Line Chart",
        "value" : "line"
      }, 
      {
        "label" : "Bar Chart",
        "value" : "bar"
      },
      {
        "label" : "Column Chart",
        "value" : "column"
      }],
      startDate : null,
      endDate : null,
      // field : 'memory_usage',
      fieldList : ['memory_usage', 'memory_available', 'cpu_usage', 'network_throughput', 'network_packet'],
      fieldList2 : ['memory_usage', 'memory_available', 'cpu_usage'],
      // markerColor : '#4f81bd',
      // title : null,
      chartModifier : new chartProperties(),
      dataRecord : new mockDataModel(),
      plotTwoCharts : false
    }

    $scope.generateChart = function() {
      var initTimeStamp = {
        'startDate' : $scope.challenge.startDate,
        'endDate' : $scope.challenge.endDate
      };console.log("timestamp " + JSON.stringify(initTimeStamp));

      if($scope.challenge.chart==null){
        $alert({
            title: 'Please select a chart type : ',
            content: '',
            type: "danger",
            duration: 3,
            placement: 'center',
            container: $("#ChartErrorPanel")
        });
      } else if($scope.challenge.startDate==null || $scope.challenge.endDate==null || isNaN($scope.challenge.startDate.getTime())||isNaN($scope.challenge.endDate.getTime())){
        $alert({
            title: 'Please enter valid timestamps : ',
            content: '',
            type: "danger",
            duration: 3,
            placement: 'center',
            container: $("#ChartErrorPanel")
        });
      }

      if($scope.challenge.chart == 'bar'){
        $scope.$broadcast('chartLoad', initTimeStamp);
      } else if($scope.challenge.chart == 'line') {console.log("line");
        $scope.$broadcast('lineChartLoad', initTimeStamp)
      } else if($scope.challenge.chart == 'column') {console.log("column");
        $scope.$broadcast('columnChartLoad', initTimeStamp)
      }
    }

    $scope.applyToChart = function() {
      var modifyFields = $scope.challenge.chartModifier;
      if(!$scope.challenge.plotTwoCharts) {
        modifyFields.field2 = null;
      }
      if($scope.challenge.chart == 'bar'){
        $scope.$broadcast('chartModify', modifyFields);
      } else if($scope.challenge.chart == 'line') {
        $scope.$broadcast('lineChartModify', modifyFields)
      } else if($scope.challenge.chart == 'column') {
        $scope.$broadcast('columnChartModify', modifyFields)
      }
      $scope.resetModifiers();
    }

    $scope.resetModifiers = function() {
      $scope.challenge.chartModifier = new chartProperties();
      $scope.challenge.plotTwoCharts = false;
    }

    $scope.saveData = function() {
      if($scope.challenge.chart == 'bar'){
        $scope.$broadcast('saveBarChart', $scope.challenge.dataRecord);
      } else if($scope.challenge.chart == 'line') {
        $scope.$broadcast('saveLineChart', $scope.challenge.dataRecord)
      } else if($scope.challenge.chart == 'column') {
        $scope.$broadcast('saveColumnChart', $scope.challenge.dataRecord)
      }
      $scope.challenge.dataRecord = new mockDataModel();
    }

  }
]);