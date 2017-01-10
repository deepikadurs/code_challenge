chartuiApp.factory('mockServerAPI', ['$resource', '$http', '$httpBackend', 'mockDataModel',
    function($resource, $http, $httpBackend, mockDataModel) {

        var matchParams = function (query) {
            var match;
            var params = {};
            // replace addition symbol with a space
            var pl = /\+/g;
            // delimit params
            var search = /([^&=]+)=?([^&]*)/g;
            var decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
            while (match = search.exec(query))
             params[decode(match[1])] = decode(match[2]);
            return params;
        }

        var generateMockData = function(params, recordCount) {
            var sDate = new Date(params.starttime);console.log("sDate " + sDate.valueOf());
            var eDate = new Date(params.endtime);console.log("eDate " + eDate.getTime());
            var responseList = new Array();
            for(var i = 1; i <= recordCount; i++) {console.log(i);
                var mockData = new mockDataModel();
                // timestamp
                mockData.timestamp = new Date(+sDate + Math.random() * (eDate - sDate));
                // memory_usage
                mockData.memory_usage = Math.floor((Math.random() * 10) + 1);
                // memory_available
                mockData.memory_available = Math.floor((Math.random() * 10) + 1);
                // cpu_usage
                mockData.cpu_usage = Math.floor((Math.random() * 10) + 1);
                // network_throughput
                mockData.network_throughput.in = Math.floor((Math.random() * 10) + 1);
                // network_throughput
                mockData.network_throughput.out = Math.floor((Math.random() * 10) + 1);
                // network_packet
                mockData.network_packet.in = Math.floor((Math.random() * 10) + 1);
                // network_packet
                mockData.network_packet.out = Math.floor((Math.random() * 10) + 1);

                responseList.push(mockData);
            }
            return responseList;
        }

        // GET
        var urlRegex = /\/getTimeStamps\?endtime=(.*)&starttime=(.*)/;
        var responseData = $httpBackend.when('GET',urlRegex).respond(function(method, url) {
            var params = matchParams(url.split('?')[1]);
            console.log("params " + JSON.stringify(params));

            // Construct header
            var headerObj = {
                "target_name" : "localhost",
                "time_range" : {
                    "start" : params.starttime,
                    "end" : params.endtime
                },
                "recordCount" : Math.floor((Math.random() * 10) + 1)
            };
            var dataObj = generateMockData(params, headerObj.recordCount);
            return [200, dataObj, headerObj];
        });
        // console.log(JSON.stringify(responseData));method, url, data, header, param

        // POST
        // var urlRegexPOST = /\/saveRecord\?endtime=(.*)&starttime=(.*)/;
        var urlRegexPOST = /\/saveRecord\?cpu_usage=(\d+)&memory_available=(\d+)&memory_usage=(\d+)&network_packet=(.*)&network_throughput=(.*)&timestamp=(.*)/
        var responseData = $httpBackend.when('POST',urlRegexPOST).respond(function(method, url) {
            return [200, 'success'];
        });

        return responseData;

    }
]);