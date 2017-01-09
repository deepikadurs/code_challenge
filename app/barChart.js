chartuiApp.controller('chart.BarChartCtrl', ['$scope', '$q', '$rootScope', '$http', '$resource', 'mockServerAPI', 'mockDataModel', 'googleChartApiPromise',
    function($scope, $q, $rootScope, $http, $resource, mockServerAPI, mockDataModel, googleChartApiPromise) {

        $scope.barChart = {
            barColor1 : '#4f81bd',
            barColor2 : '#c0504d',
            filter : {
                "timePeriod" : null
            },
            data : {},
            role_1 : null,
            role_2 : null,
            showGraph : false,
            graphHeight : null
        }

        $scope.$on('chartLoad', function(e, initTimeStamp) {
            if((initTimeStamp.startDate != null) && (initTimeStamp.endDate != null)) {
                $http({
                    url: '/getTimeStamps', 
                    method: "GET",
                    params: {'starttime': initTimeStamp.startDate, 'endtime': initTimeStamp.endDate}
                }).then(function(response) {
                    console.log(JSON.stringify(response));
                });
            }
        });

        // $scope.$on('dashboardLoad', function(e, duration) {
        //     $scope.barChart.filter.timePeriod = duration;
        //     DashboardService.getbarChart($scope.barChart.filter).then(function(serverResponse) {
        //         $scope.barChart.data = serverResponse.data;
        //         $scope.barChart.role_1 = $scope.barChart.data[0].role;
        //         $scope.barChart.role_2 = null;
        //         angular.forEach($scope.barChart.data, function(item) {
        //             $scope.barChart.role_2 = (item.role != $scope.barChart.role_1) ? item.role : $scope.barChart.role_2;
        //         });
        //         if(itnIsEmpty($scope.barChart.data)) {
        //             $scope.barChart.showGraph = false;
        //         } else {
        //             $scope.barChart.showGraph = true;
        //             googleChartApiPromise.then(buildDataTable);
        //         }
        //     });
        // });

        $scope.loadDelinquentComplaints = function() {

$http({
    url: '/getTimeStamps', 
    method: "GET",
    params: {'starttime': 'yyyy:mm:dd hh:mm:ss', 'endtime': 'yyyy:mm:dd hh:mm:ss'}
 }).then(function(response) {
                    console.log(JSON.stringify(response));
                });


$http({
    url: '/saveRecord', 
    method: "POST",
    params: {'starttime': 'yyyy:mm:dd hh:mm:ss', 'endtime': 'yyyy:mm:dd hh:mm:ss'}
 }).then(function(response) {
                    console.log(JSON.stringify(response));
                });



            // var resourceTimeStamps = $resource('/getTimeStamps');
            // return resourceTimeStamps.get({
            //         'starttime': starttime,
            //         'endtime' : endtime
            //     }).$promise.then(function(response) {
            //         console.log(JSON.stringify(response.data));
            //         return response.data;
            //     }, function(err) {
            //         console.log("REST Error >>>>>>" + err);
            //         return err;
            //     });

            // DashboardService.getbarChart(starttime, endtime).then(function(serverResponse) {
            //     $scope.barChart.data = serverResponse.data;
            //     // $scope.barChart.role_1 = $scope.barChart.data[0].role;
            //     // $scope.barChart.role_2 = null;
            //     // angular.forEach($scope.barChart.data, function(item) {
            //     //     $scope.barChart.role_2 = (item.role != $scope.barChart.role_1) ? item.role : $scope.barChart.role_2;
            //     // });
            //     // if(dataIsEmpty($scope.barChart.data)) {
            //     //     $scope.barChart.showGraph = false;
            //     // } else {
            //     //     $scope.barChart.showGraph = true;
            //     //     googleChartApiPromise.then(buildDataTable);
            //     // }
            // });            
        }

        $scope.bChart = {
            catalogItemChart: {
                type: "BarChart",
                options: {
                    title: 'Delinquent Complaint Breakdown',
                    titleTextStyle: {
                        fontSize: 22
                    },
                    titlePosition: 'none',
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
                    chartArea: {left:150, top:50, bottom:10},                  
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
            $scope.bChart.catalogItemChart.options.height = 350;
            var graphData = [];
            graphData.push(['Status', '# Complaint Cases', { role: 'style' }]);
            var barColor = null;
            angular.forEach($scope.barChart.data, function(item) {
                if(item.role == $scope.barChart.role_1) {
                    barColor = $scope.barChart.barColor1;
                } else {
                    barColor = $scope.barChart.barColor2;
                }
                graphData.push([item.name, item.delinquentComplaints, barColor]);
            });
            $scope.bChart.catalogItemChart.data = new google.visualization.arrayToDataTable(graphData);
        }

        $scope.init = function() {
            $scope.barChart.filter.timePeriod = 30;
            $scope.loadDelinquentComplaints();
        }

        $scope.init();

    }
]);







//         $scope.chart = {
//             wrap: null
//         }

//         $scope.testFunc = function() {
//             // $scope.chart.wrap.setOption({'title':'Population Density (people/km^2)'});
//             $scope.chart.wrap.setOption('height', 600);
//             $scope.chart.wrap.setOption('overflow-y', scroll);
//             $scope.chart.wrap.draw();
//         }

//         function buildDataTable(){
//             // $scope.data = new google.visualization.DataTable();
//             // Continue building the data table.
//         itnLog("$scope.dashboard.testDelinquent " + $scope.dashboard.testDelinquent);


// $scope.chart.wrap = new google.visualization.ChartWrapper({
//        'chartType':'BarChart',
//        // 'dataSourceUrl':'http://spreadsheets.google.com/tq?key=pCQbetd-CptGXxxQIG7VFIQ&pub=1',
//        'containerId':'visualization',
//        'dataTable': [
//                     ['Status', '# Complaint Cases', { role: 'style' }],
//                     ['TP_1', 50000, '#7FB2E8'],
//                     ['DC_1', 80000, '#E8917F'],
//                     ['TP_2', 70000, '#7FB2E8'],
//                     ['TP_3', 60000, '#7FB2E8'],
//                     ['DC_2', 50000, '#E8917F'],
//                     ['SP_1', 80000, '#7FE8AA'],
//                     ['SP_2', 60000, '#7FE8AA'],
//                     ['TP_4', 80000, '#7FB2E8'],
//                     ['SP_3', 50000, '#7FE8AA'],
//                     ['DC_3', 70000, '#E8917F'],
//                     ['DC_4', 80000, '#E8917F']
//                     // [$scope.deepika.deeepika,$scope.deepika.deeepika,'#435462']
//                 ],
//        'options': {
//                     title: 'Delinquent Complaint Breakdown',
//                     titleTextStyle: {
//                         fontSize: 22
//                     },
//                     // titlePosition: 'none',
//                     displayExactValues: true,
//                     // sliceVisibilityThreshold: 0,
//                     width: 500,
//                     height: 400, 
//                     backgroundColor: 'transparent',
//                     legend: { 
//                         position: 'none',
//                         alignment: 'center',
//                         textStyle : {
//                             fontSize: '14'
//                         }
//                     },
//                     // bar: {groupWidth: 20},
//                     bars: 'vertical',
//                     // pieSliceText : 'label',                      
//                     tooltip : {
//                         ignoreBounds: true
//                     //     text : 'percentage'
//                     }
//                 }
//        });
// $scope.chart.wrap.draw();
// }
