chartuiApp.factory('mockDataModel', function () {
    var mockDataModel = function(data) {
        angular.extend(this, {
            "timestamp" : null,
            "memory_usage" : null,
            "memory_available" : null,
            "cpu_usage" : null,
            "network_throughput" : {
                "in" : null,
                "out" : null
            },
            "network_packet" : {
                "in" : null,
                "out" : null
            }
        }, data);
    };
    return mockDataModel;
});

chartuiApp.factory('chartProperties', function () {
    var chartProperties = function(data) {
        angular.extend(this, {
            'field' : 'memory_usage',
            'field2' : 'memory_usage',
            'markerColor' : '#4f81bd',
            'markerColor2' : '#c0504d',
            'title' : null
        }, data);
    };
    return chartProperties;
});