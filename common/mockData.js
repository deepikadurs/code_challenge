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
//       this.data = [
//         {
//             "timestamp" : "23:23:23 PST",
//             "memory_usage" : 200,
//             "memory_available" : 2300,
//             "cpu_usage" : 344,
//             "network_throughput" : {
//                 "in" : 2,
//                 "out" : 3
//             },
//             "network_packet" : {
//                 "in" : 3,
//                 "out" : 7
//             }
//         },
//         {
//             "timestamp" : "23:23:23 PST",
//             "memory_usage" : 200,
//             "memory_available" : 2300,
//             "cpu_usage" : 344,
//             "network_throughput" : {
//                 "in" : 2,
//                 "out" : 3
//             },
//             "network_packet" : {
//                 "in" : 3,
//                 "out" : 7
//             }
//         },
//         {
//             "timestamp" : "23:23:23 PST",
//             "memory_usage" : 200,
//             "memory_available" : 2300,
//             "cpu_usage" : 344,
//             "network_throughput" : {
//                 "in" : 2,
//                 "out" : 3
//             },
//             "network_packet" : {
//                 "in" : 3,
//                 "out" : 7
//             }
//         }
//     ];
    
//     this.getData = function() {
//         return this.data;
//     };
    
//     this.setData = function(data) {
//         this.data = data;
//     };

// //     $httpBackend.expectGET('/getTimeStamps').respond(function(method, url, data) {
// //         // parse the matching URL to pull out the id (/games/:id)
// //         // var starttime = url.split('/')[2];
// //         // var starttime = url.split('/')[3];
// //         // var game = mockData.findOne(gameid);
// // console.log("in here");
// //     });
    

//     $httpBackend.whenGET('/games').respond(function(method, url, data) {
//         var games = mockData.findAll();
//         return [200, games, {}];
//     });
    
//     $httpBackend.whenGET(/\/games\/\d+/).respond(function(method, url, data) {
//         // parse the matching URL to pull out the id (/games/:id)
//         var gameid = url.split('/')[2];
        
//         var game = mockData.findOne(gameid);

//         return [200, game, {}];
//     });

//     // this is the creation of a new resource
//     $httpBackend.whenPOST('/games').respond(function(method, url, data) {
//         var params = angular.fromJson(data);

//         var game = mockData.addOne(params);
        
//         // get the id of the new resource to populate the Location field
//         var gameid = game.gameid;
        
//         return [201, game, { Location: '/games/' + gameid }];
//     });

//     // this is the update of an existing resource (ngResource does not send PUT for update)
//     $httpBackend.whenPOST(/\/games\/\d+/).respond(function(method, url, data) {
//         var params = angular.fromJson(data);

//         // parse the matching URL to pull out the id (/games/:id)
//         var gameid = url.split('/')[2];
        
//         var game = mockData.updateOne(gameid, params);
        
//         return [201, game, { Location: '/games/' + gameid }];
//     });
    
//     // this is the update of an existing resource (ngResource does not send PUT for update)
//     $httpBackend.whenDELETE(/\/games\/\d+/).respond(function(method, url, data) {
//         // parse the matching URL to pull out the id (/games/:id)
//         var gameid = url.split('/')[2];
        
//         mockData.deleteOne(gameid);
        
//         return [204, {}, {}];
//     });
// });


// var c = new Date(+a + Math.random() * (b - a));

// chartuiApp.service('mockServerData', function mockServerData() {
//     this.data = [
//         {
//             "timestamp" : "23:23:23 PST",
//             "memory_usage" : 200,
//             "memory_available" : 2300,
//             "cpu_usage" : 344,
//             "network_throughput" : {
//                 "in" : 2,
//                 "out" : 3
//             },
//             "network_packet" : {
//                 "in" : 3,
//                 "out" : 7
//             }
//         },
//         {
//             "timestamp" : "23:23:23 PST",
//             "memory_usage" : 200,
//             "memory_available" : 2300,
//             "cpu_usage" : 344,
//             "network_throughput" : {
//                 "in" : 2,
//                 "out" : 3
//             },
//             "network_packet" : {
//                 "in" : 3,
//                 "out" : 7
//             }
//         },
//         {
//             "timestamp" : "23:23:23 PST",
//             "memory_usage" : 200,
//             "memory_available" : 2300,
//             "cpu_usage" : 344,
//             "network_throughput" : {
//                 "in" : 2,
//                 "out" : 3
//             },
//             "network_packet" : {
//                 "in" : 3,
//                 "out" : 7
//             }
//         }
//     ];
    
//     this.getData = function() {
//         return this.data;
//     };
    
//     this.setData = function(data) {
//         this.data = data;
//     };
// });
   
    // this.findOne = function(gameid) {
    //     // find the game that matches that id
    //     var list = $.grep(this.getData(), function(element, index) {
    //         return (element.gameid == gameid);
    //     });
    //     if(list.length === 0) {
    //         return {};
    //     }
    //     // even if list contains multiple items, just return first one
    //     return list[0];
    // };
   
    // this.findAll = function() {
    //     return this.getData();
    // };
    
    // // options parameter is an object with key value pairs
    // // in this simple implementation, value is limited to a single value (no arrays)
    // this.findMany = function(options) {
    //     // find games that match all of the options
    //     var list = $.grep(this.getData(), function(element, index) {
    //         var matchAll = true;
    //         $.each(options, function(optionKey, optionValue) {
    //             if(element[optionKey] != optionValue) {
    //                 matchAll = false;
    //                 return false;
    //             }
    //         });
    //         return matchAll;
    //     });        
    // };
    
    // // add a new data item that does not exist already
    // // must compute a new unique id and backfill in
    // this.addOne = function(dataItem) {
    //     // must calculate a unique ID to add the new data
    //     var newId = this.newId();
    //     dataItem.gameid = newId;
    //     this.data.push(dataItem);
    //     return dataItem;
    // };
    
    // // return an id to insert a new data item at
    // this.newId = function() {
    //     // find all current ids
    //     var currentIds = $.map(this.getData(), function(dataItem) { return dataItem.gameid; });
    //     // since id is numeric, and we will treat like an autoincrement field, find max
    //     var maxId = Math.max.apply(Math, currentIds);
    //     // increment by one
    //     return maxId + 1;
    // };
    
    // this.updateOne = function(gameid, dataItem) {
    //     // find the game that matches that id
    //     var games = this.getData();
    //     var match = null;
    //     for (var i=0; i < games.length; i++) {
    //         if(games[i].gameid == gameid) {
    //             match = games[i];
    //             break;
    //         }
    //     }
    //     if(!angular.isObject(match)) {
    //         return {};
    //     }
    //     angular.extend(match, dataItem);
    //     return match;
    // };
    
    // this.deleteOne = function(gameid) {
    //     // find the game that matches that id
    //     var games = this.getData();
    //     var match = false;
    //     for (var i=0; i < games.length; i++) {
    //         if(games[i].gameid == gameid) {
    //             match = true;
    //             games.splice(i, 1);
    //             break;
    //         }
    //     }
    //     return match;
    // };
    
