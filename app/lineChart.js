chartuiApp.controller('chart.LineChartCtrl', ['$scope', '$q', '$rootScope', '$http', '$resource', 'mockServerAPI', 'mockDataModel', 'googleChartApiPromise',
    function($scope, $q, $rootScope, $http, $resource, mockServerAPI, mockDataModel, googleChartApiPromise) {

        $scope.lineChart = {
            lineColor1 : '#4f81bd',
            lineColor2 : '#c0504d',
            data : {},
            role_1 : null,
            role_2 : null,
            showGraph : false,
            graphHeight : null,
            field : 'memory_usage'
        }

        $scope.$on('lineChartLoad', function(e, initTimeStamp) {
            if((initTimeStamp.startDate != null) && (initTimeStamp.endDate != null)) {console.log("in");
                $http({
                    url: '/getTimeStamps', 
                    method: "GET",
                    params: {'starttime': initTimeStamp.startDate, 'endtime': initTimeStamp.endDate}
                }).then(function(response) {
                    console.log(JSON.stringify(response));
                    $scope.lineChart.data = response.data;console.log("build chart 1 " + JSON.stringify($scope.lineChart.data));
                    if($scope.lineChart.data !== [] || $scope.lineChart.data[0] !== null) {
                        $scope.lineChart.showGraph = true;console.log("build chart " + JSON.stringify($scope.lineChart.data));
                        googleChartApiPromise.then(buildDataTable);
                    } else {
                        $scope.lineChart.showGraph = false;
                    }
                });
            }
        });

        
        $scope.$on('lineChartModify', function(e, modifyFields) {
            $scope.lineChart.lineColor1 = modifyFields.markerColor;
            $scope.lineChart.lineColor2 = modifyFields.markerColor2;
            if(modifyFields.title != null) {
                $scope.lChart.catalogItemChart.options.title = modifyFields.title;
            }
            $scope.lineChart.field = modifyFields.field;
            $scope.lineChart.field2 = modifyFields.field2;
            googleChartApiPromise.then(buildDataTable);
        });

        $scope.$on('saveLineChart', function(e, dataRecord) {
            $http({
                url: '/saveRecord', 
                method: "POST",
                params: dataRecord
             }).then(function(response) {
                console.log("saved record " + JSON.stringify(response));
                if(response.data == 'success') {
                    console.log("data " + JSON.stringify(response.config.params));
                    $scope.lineChart.data.push(response.config.params);
                    googleChartApiPromise.then(buildDataTable);
                }
            });
        });

        // API definition
        $scope.loadAPI = function() {
            // GET API
            $http({
                url: '/getTimeStamps', 
                method: "GET",
                params: {'starttime': 'yyyy:mm:dd hh:mm:ss', 'endtime': 'yyyy:mm:dd hh:mm:ss'}
             }).then(function(response) {
                console.log(JSON.stringify(response));
            });

             // POST API
            $http({
                url: '/saveRecord', 
                method: "POST",
                params: {'starttime': 'yyyy:mm:dd hh:mm:ss', 'endtime': 'yyyy:mm:dd hh:mm:ss'}
             }).then(function(response) {
                console.log("saved record " + JSON.stringify(response));
            });
        }       
        
        $scope.lChart = {
            catalogItemChart: {
                type: "LineChart",
                options: {
                    title: 'Time series line chart',
                    titleTextStyle: {
                        fontSize: 22
                    },
                    // titlePosition: 'none',
                    displayExactValues: true,
                    // width: 600,
                    // height: 400, 
                    backgroundColor: 'transparent',
                    legend: { 
                        position: 'none',
                        alignment: 'center',
                        textStyle : {
                            fontSize: '14'
                        }
                    },
                    fontSize: '14',
                    chartArea: {left:150, top:100, bottom:10},                  
                    tooltip : {
                        ignoreBounds: true
                        // isHtml: true
                    //     text : 'percentage'
                    }
                }                     
            }
        }

        function buildDataTable(){
            $scope.lChart.catalogItemChart.data = new google.visualization.DataTable();
            $scope.lineChart.graphHeight = ($scope.lineChart.data.length * 30);
            ($scope.lineChart.graphHeight > 350) ? $scope.lChart.catalogItemChart.options.height = $scope.lineChart.graphHeight : 
            $scope.lChart.catalogItemChart.options.height = 350;console.log("build chart " + JSON.stringify($scope.lineChart.data));
            var graphData = [];
            
            var lineColor1 = $scope.lineChart.lineColor1;
            var lineColor2 = $scope.lineChart.lineColor2;
            if($scope.lineChart.field == 'memory_usage' && $scope.lineChart.field2==null) {
                graphData.push(['Timestamp', $scope.lineChart.field, { role: 'style' }]);
                angular.forEach($scope.lineChart.data, function(item) {
                    graphData.push([item.timestamp, item.memory_usage, lineColor1]);
                });
            } else if ($scope.lineChart.field == 'memory_available' && $scope.lineChart.field2==null) {
                graphData.push(['Timestamp', $scope.lineChart.field, { role: 'style' }]);
                angular.forEach($scope.lineChart.data, function(item) {
                    graphData.push([item.timestamp, item.memory_available, lineColor1]);
                });
            } else if ($scope.lineChart.field == 'cpu_usage' && $scope.lineChart.field2==null) {
                graphData.push(['Timestamp', $scope.lineChart.field, { role: 'style' }]);
                angular.forEach($scope.lineChart.data, function(item) {
                    graphData.push([item.timestamp, item.cpu_usage, lineColor1]);
                });
            } else if ($scope.lineChart.field == 'network_throughput' && $scope.lineChart.field2==null) {
                graphData.push(['Timestamp', 'network_throughput_in', { role: 'style' }, 'network_throughput_out', { role: 'style' }]);
                angular.forEach($scope.lineChart.data, function(item) {
                    graphData.push([item.timestamp, item.network_throughput.in, lineColor1, item.network_throughput.out, lineColor2]);
                });
            } else if ($scope.lineChart.field == 'network_packet' && $scope.lineChart.field2==null) {
                graphData.push(['Timestamp', 'network_packet_in', { role: 'style' }, 'network_packet_out', { role: 'style' }]);
                angular.forEach($scope.lineChart.data, function(item) {
                    graphData.push([item.timestamp, item.network_packet.in, lineColor1, item.network_packet.out, lineColor2]);
                });
            } else if ($scope.lineChart.field2!=null) {
                graphData.push(['Timestamp', $scope.lineChart.field, { role: 'style' }, $scope.lineChart.field2, { role: 'style' }]);
                var f1 = $scope.lineChart.field;
                var f2 = $scope.lineChart.field2;
                angular.forEach($scope.lineChart.data, function(item) {
                    graphData.push([item.timestamp, item[f1], lineColor1, item[f2], lineColor2]);
                });
            }
            $scope.lChart.catalogItemChart.data = new google.visualization.arrayToDataTable(graphData);
        }

        // $scope.init = function() {
        //     $scope.loadAPI();
        // }

        // $scope.init();

    }
]);