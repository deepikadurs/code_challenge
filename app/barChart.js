chartuiApp.controller('chart.BarChartCtrl', ['$scope', '$q', '$rootScope', '$http', '$resource', 'mockServerAPI', 'mockDataModel', 'googleChartApiPromise',
    function($scope, $q, $rootScope, $http, $resource, mockServerAPI, mockDataModel, googleChartApiPromise) {

        $scope.barChart = {
            barColor1 : '#4f81bd',
            barColor2 : '#c0504d',
            data : {},
            role_1 : null,
            role_2 : null,
            showGraph : false,
            graphHeight : null,
            field : 'memory_usage',
            field2 : null
        }

        $scope.$on('chartLoad', function(e, initTimeStamp) {
            if((initTimeStamp.startDate != null) && (initTimeStamp.endDate != null)) {
                $http({
                    url: '/getTimeStamps', 
                    method: "GET",
                    params: {'starttime': initTimeStamp.startDate, 'endtime': initTimeStamp.endDate}
                }).then(function(response) {
                    console.log(JSON.stringify(response));
                    $scope.barChart.data = response.data;console.log("build chart 1 " + JSON.stringify($scope.barChart.data));
                    if($scope.barChart.data !== [] || $scope.barChart.data[0] !== null) {
                        $scope.barChart.showGraph = true;console.log("build chart " + JSON.stringify($scope.barChart.data));
                        googleChartApiPromise.then(buildDataTable);
                    } else {
                        $scope.barChart.showGraph = false;
                    }
                });
            }
        });

        
        $scope.$on('chartModify', function(e, modifyFields) {
            $scope.barChart.barColor1 = modifyFields.markerColor;
            $scope.barChart.barColor2 = modifyFields.markerColor2;
            if(modifyFields.title != null){
                $scope.bChart.catalogItemChart.options.title = modifyFields.title;
            }
            $scope.barChart.field2 = modifyFields.field2;
            // if(modifyFields.labels != null){
            //     $scope.bChart.catalogItemChart.options.vAxis.ticks = angular.copy(modifyFields.labels.split(','));
            // }
            $scope.barChart.field = modifyFields.field; 
            googleChartApiPromise.then(buildDataTable);
        });

        $scope.$on('saveBarChart', function(e, dataRecord) {console.log("in");
            $http({
                url: '/saveRecord', 
                method: "POST",
                params: dataRecord
             }).then(function(response) {
                console.log("saved record " + JSON.stringify(response));
                if(response.data == 'success') {
                    console.log("data " + JSON.stringify(response.config.params));
                    $scope.barChart.data.push(response.config.params);
                    googleChartApiPromise.then(buildDataTable);
                }
            });
        });

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
                console.log(JSON.stringify(response));
            });
        }       
        
        $scope.bChart = {
            catalogItemChart: {
                type: "BarChart",
                options: {
                    title: 'Time series chart',
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
                    bar: {groupWidth: 18},
                    bars: 'vertical',
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
            $scope.bChart.catalogItemChart.data = new google.visualization.DataTable();
            $scope.barChart.graphHeight = ($scope.barChart.data.length * 30);
            ($scope.barChart.graphHeight > 350) ? $scope.bChart.catalogItemChart.options.height = $scope.barChart.graphHeight : 
            $scope.bChart.catalogItemChart.options.height = 350;console.log("build chart " + JSON.stringify($scope.barChart.data));
            var graphData = [];
            
            var barColor1 = $scope.barChart.barColor1;
            var barColor2 = $scope.barChart.barColor2;
            if($scope.barChart.field == 'memory_usage' && $scope.barChart.field2==null) {
                graphData.push(['Timestamp', $scope.barChart.field, { role: 'style' }]);
                angular.forEach($scope.barChart.data, function(item) {
                    graphData.push([item.timestamp, item.memory_usage, barColor1]);
                });
            } else if ($scope.barChart.field == 'memory_available' && $scope.barChart.field2==null) {
                graphData.push(['Timestamp', $scope.barChart.field, { role: 'style' }]);
                angular.forEach($scope.barChart.data, function(item) {
                    graphData.push([item.timestamp, item.memory_available, barColor1]);
                });
            } else if ($scope.barChart.field == 'cpu_usage' && $scope.barChart.field2==null) {
                graphData.push(['Timestamp', $scope.barChart.field, { role: 'style' }]);
                angular.forEach($scope.barChart.data, function(item) {
                    graphData.push([item.timestamp, item.cpu_usage, barColor1]);
                });
            } else if ($scope.barChart.field == 'network_throughput' && $scope.barChart.field2==null) {
                graphData.push(['Timestamp', 'network_throughput_in', { role: 'style' }, 'network_throughput_out', { role: 'style' }]);
                angular.forEach($scope.barChart.data, function(item) {
                    graphData.push([item.timestamp, item.network_throughput.in, barColor1, item.network_throughput.out, barColor2]);
                });
            } else if ($scope.barChart.field == 'network_packet' && $scope.barChart.field2==null) {
                graphData.push(['Timestamp', 'network_packet_in', { role: 'style' }, 'network_packet_out', { role: 'style' }]);
                angular.forEach($scope.barChart.data, function(item) {
                    graphData.push([item.timestamp, item.network_packet.in, barColor1, item.network_packet.out, barColor2]);
                });
            } else if ($scope.barChart.field2!=null) {
                graphData.push(['Timestamp', $scope.barChart.field, { role: 'style' }, $scope.barChart.field2, { role: 'style' }]);
                var f1 = $scope.barChart.field;
                var f2 = $scope.barChart.field2;
                angular.forEach($scope.barChart.data, function(item) {
                    graphData.push([item.timestamp, item[f1], barColor1, item[f2], barColor2]);
                });
            }
            $scope.bChart.catalogItemChart.data = new google.visualization.arrayToDataTable(graphData);
        }

        // $scope.init = function() {
        //     $scope.loadAPI();
        // }

        // $scope.init();

    }
]);