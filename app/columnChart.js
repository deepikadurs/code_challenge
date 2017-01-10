chartuiApp.controller('chart.ColumnChartCtrl', ['$scope', '$q', '$rootScope', '$http', '$resource', 'mockServerAPI', 'mockDataModel', 'googleChartApiPromise',
    function($scope, $q, $rootScope, $http, $resource, mockServerAPI, mockDataModel, googleChartApiPromise) {

        $scope.columnChart = {
            columnColor1 : '#4f81bd',
            columnColor2 : '#c0504d',
            data : {},
            role_1 : null,
            role_2 : null,
            showGraph : false,
            graphHeight : null,
            field : 'memory_usage'
        }

        $scope.$on('columnChartLoad', function(e, initTimeStamp) {
            if((initTimeStamp.startDate != null) && (initTimeStamp.endDate != null)) {console.log("in");
                $http({
                    url: '/getTimeStamps', 
                    method: "GET",
                    params: {'starttime': initTimeStamp.startDate, 'endtime': initTimeStamp.endDate}
                }).then(function(response) {
                    console.log(JSON.stringify(response));
                    $scope.columnChart.data = response.data;console.log("build chart 1 " + JSON.stringify($scope.columnChart.data));
                    if($scope.columnChart.data !== [] || $scope.columnChart.data[0] !== null) {
                        $scope.columnChart.showGraph = true;console.log("build chart " + JSON.stringify($scope.columnChart.data));
                        googleChartApiPromise.then(buildDataTable);
                    } else {
                        $scope.columnChart.showGraph = false;
                    }
                });
            }
        });

        
        $scope.$on('columnChartModify', function(e, modifyFields) {
            $scope.columnChart.columnColor1 = modifyFields.markerColor;
            $scope.columnChart.columnColor2 = modifyFields.markerColor2;
            if(modifyFields.title != null) {
                $scope.cChart.catalogItemChart.options.title = modifyFields.title;
            }
            $scope.columnChart.field = modifyFields.field;
            $scope.columnChart.field2 = modifyFields.field2;
            googleChartApiPromise.then(buildDataTable);
        });

        $scope.$on('saveColumnChart', function(e, dataRecord) {
            $http({
                url: '/saveRecord', 
                method: "POST",
                params: dataRecord
             }).then(function(response) {
                console.log("saved record " + JSON.stringify(response));
                if(response.data == 'success') {
                    console.log("data " + JSON.stringify(response.config.params));
                    $scope.columnChart.data.push(response.config.params);
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
        
        $scope.cChart = {
            catalogItemChart: {
                type: "ColumnChart",
                options: {
                    title: 'Time series column chart',
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
            $scope.cChart.catalogItemChart.data = new google.visualization.DataTable();
            $scope.columnChart.graphHeight = ($scope.columnChart.data.length * 30);
            ($scope.columnChart.graphHeight > 350) ? $scope.cChart.catalogItemChart.options.height = $scope.columnChart.graphHeight : 
            $scope.cChart.catalogItemChart.options.height = 350;console.log("build chart " + JSON.stringify($scope.columnChart.data));
            var graphData = [];
            
            var columnColor1 = $scope.columnChart.columnColor1;
            var columnColor2 = $scope.columnChart.columnColor2;
            if($scope.columnChart.field == 'memory_usage' && $scope.columnChart.field2==null) {
                graphData.push(['Timestamp', $scope.columnChart.field, { role: 'style' }]);
                angular.forEach($scope.columnChart.data, function(item) {
                    graphData.push([item.timestamp, item.memory_usage, columnColor1]);
                });
            } else if ($scope.columnChart.field == 'memory_available' && $scope.columnChart.field2==null) {
                graphData.push(['Timestamp', $scope.columnChart.field, { role: 'style' }]);
                angular.forEach($scope.columnChart.data, function(item) {
                    graphData.push([item.timestamp, item.memory_available, columnColor1]);
                });
            } else if ($scope.columnChart.field == 'cpu_usage' && $scope.columnChart.field2==null) {
                graphData.push(['Timestamp', $scope.columnChart.field, { role: 'style' }]);
                angular.forEach($scope.columnChart.data, function(item) {
                    graphData.push([item.timestamp, item.cpu_usage, columnColor1]);
                });
            } else if ($scope.columnChart.field == 'network_throughput' && $scope.columnChart.field2==null) {
                graphData.push(['Timestamp', 'network_throughput_in', { role: 'style' }, 'network_throughput_out', { role: 'style' }]);
                angular.forEach($scope.columnChart.data, function(item) {
                    graphData.push([item.timestamp, item.network_throughput.in, columnColor1, item.network_throughput.out, columnColor2]);
                });
            } else if ($scope.columnChart.field == 'network_packet' && $scope.columnChart.field2==null) {
                graphData.push(['Timestamp', 'network_packet_in', { role: 'style' }, 'network_packet_out', { role: 'style' }]);
                angular.forEach($scope.columnChart.data, function(item) {
                    graphData.push([item.timestamp, item.network_packet.in, columnColor1, item.network_packet.out, columnColor2]);
                });
            } else if ($scope.columnChart.field2!=null) {
                graphData.push(['Timestamp', $scope.columnChart.field, { role: 'style' }, $scope.columnChart.field2, { role: 'style' }]);
                var f1 = $scope.columnChart.field;
                var f2 = $scope.columnChart.field2;
                angular.forEach($scope.columnChart.data, function(item) {
                    graphData.push([item.timestamp, item[f1], columnColor1, item[f2], columnColor2]);
                });
            }
            console.log('graphData' + JSON.stringify(graphData));
            $scope.cChart.catalogItemChart.data = new google.visualization.arrayToDataTable(graphData);
        }

        // $scope.init = function() {
        //     $scope.loadAPI();
        // }

        // $scope.init();

    }
]);