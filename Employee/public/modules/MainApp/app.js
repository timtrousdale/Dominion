var app = angular.module('MainApp', [
    'ui.router', 'ui.bootstrap', "chart.js"
]).constant('httpUrl', 'https://api-dev.dominioninsurance.com');


//Configuration of Routes using UI-Router plugin
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/app');
    $stateProvider
        .state('app', {
            url: '/app',
            templateUrl: 'modules/MainApp/app.html',
            controller: 'MainController as main'
        })
        .state('client', {
            url: '/app/client',
            templateUrl: 'modules/MainApp/client.html',
            controller: 'MainController as main'
        })


});



//***************************************************************************************************************
//                                  HTTP REQUEST FUNCTIONS AND RELATED FUNCTIONS
//***************************************************************************************************************

// --------------------------------------------------------------------------------------------------------------
//                                                    LOGIN & SIGNUP
// --------------------------------------------------------------------------------------------------------------

//Service used to carry over OAuth2 Token after refresh of page. The login function stores the
// received token in a session storage and and retrieves it on a browser refresh. This eliminates the
// need to use local storage and clears it on tab/browser close
// app.factory('bearerTokenService', function ($http, $state) {
//     var updateToken = function () {
//         var header = $http.defaults.headers.common['Authorization'];
//         var storage = sessionStorage.getItem('bearerToken');
//         $http.defaults.headers.common['Authorization'] = (header === undefined) ? storage : header;
//         if (header === undefined && storage === undefined) {
//             logoutService('', 'Your session has timed out, you will need to log back in to continue.');
//         }
//     };
//     return updateToken
// });

// //              *******************  LOGIN SERVICE RETURNS AND STORES VALIDATION TOKEN   *******************
//
// app.factory('verifyLogin', function ($http, $httpParamSerializerJQLike, $state, errorHandler, loadingCircle, httpUrl, myAccount, rates) {
//     var login = function (data) {
//         $requestData = {
//             //Why is this needed - Talk to Carson
//             client_id: 'testclient',
//             grant_type: 'password',
//             username: data.email,
//             password: data.password
//         };
//         $http({
//             method: 'POST',
//             url: httpUrl + '/member/api/login',
//             data: $httpParamSerializerJQLike($requestData),
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Authorization': undefined
//             }  // set the headers so angular passing info as form data (not request payload)
//         })
//             .then(function successCallback(response) {
//                 //console.log(response);
//                 var token = 'Bearer ' + response.data.access_token;
//                 $http.defaults.headers.common['Authorization'] = token;
//                 sessionStorage.setItem('bearerToken', token);
//                 sessionStorage.setItem('isLoggedIn', true);
//                 $state.go('app.home');
//                 myAccount.getAll();
//                 rates.getAll();
//                 loadingCircle.hide();
//             }, function errorCallback(error) {
//                 console.log(error);
//                 errorHandler(error);
//             });
//     };
//     return login;
//
// });



// --------------------------------------------------------------------------------------------------------------
//                                              MY ACCOUNT FUNCTION
// --------------------------------------------------------------------------------------------------------------
app.service('getFirms', function ($http, httpUrl) {
    var vm = this;

    //********************** Get Firm by Info **********************
    vm.list = {hello: 'what'};
    vm.getFirms = function (data) {
        var promise = $http.get(httpUrl + '/firms?sort=' + data.firmName || '%' + '&state=' + data.firmState || '%' + '&status=' + data.firmStatus || '%').then(function (response) {
            console.log(response);
            var data = response.data;

            //Clear out Object while keeping Angular's Object reference
            for (var obj in vm.list) {
                delete vm.list[obj];
            }
            for (var attrname in data.response) {
                vm.list[attrname] = data.response[attrname];
            }
            console.log(vm.list);

        }, function errorCallback(error) {
            console.log(error);
        });
        return promise;
    };
    vm.clearList = function () {
        for (var obj in vm.list) {
            delete vm.list[obj];
        }
    };

    //********************** Get Firm by ID **********************
    
    vm.getFirmByID = function (data) {
        var promise = $http.get(httpUrl + '/firms/' + data.firmID).then(function (response) {
            console.log(response);
            var data = response.data;

            //Clear out Object while keeping Angular's Object reference
            for (var obj in vm.list) {
                delete vm.list[obj];
            }
            for (var attrname in data.response) {
                vm.list[attrname] = data.response[attrname];
            }
            console.log(vm.list);


        }, function errorCallback(error) {
            console.log(error);
        });
        return promise;
    };
    vm.clearList = function () {
        for (var obj in vm.list) {
            delete vm.list[obj];
        }
    };



});
