'use strict';

var AngularSpringApp = {};

var httpHeaders, message, App = angular.module('AngularSpringApp', ['AngularSpringApp.filters', 'AngularSpringApp.services', 'AngularSpringApp.directives','ngRoute','angularUtils.directives.dirPagination']);

//var
////the HTTP headers to be used by all requests
//    httpHeaders,
//
////the message to be shown to the user
//    message= angular.module('AngularSpringApp', []);

// Declare app level module which depends on filters, and services
App.config(function ($routeProvider, $locationProvider) {
    //configure the rounting of ng-view
    $routeProvider.when('/cars', {
        templateUrl: 'html/cars/layout.html',
        controller: 'CarController'
    });

    $routeProvider.when('/trains', {
        templateUrl: 'html/trains/layout.html',
        controller: 'TrainController'
    });

    $routeProvider.when('/frontfiles', {
        templateUrl: 'html/frontfiles/layout.html',
        controller: 'FrontFileController'
    });

    $routeProvider.when('/bicicles', {
        url: 'html/bicicles/layout.html',
        templateUrl: 'html/bicicles/layout.html',
        controller: 'BicicleController'
    });

    $routeProvider.when('/action/teste', {
        url: 'html/teste/teste.html',
        templateUrl: 'html/teste/teste.html'
        //controller: 'BicicleController'
    });

    $routeProvider.otherwise('/cars');

    $locationProvider.html5Mode(true);

});

App.config(function ($httpProvider) {
    //configure $http to catch message responses and show them
    $httpProvider.interceptors.push(function ($q) {
        var setMessage = function (response) {
            //if the response has a text and a type property, it is a message to be shown
            if (response.data.text && response.data.type) {
                message = {
                    text: response.data.text,
                    type: response.data.type,
                    show: true
                };
            }
        };
        return function (promise) {
            return promise.then(
                //this is called after each successful server request
                function (response) {
                    setMessage(response);
                    return response;
                },
                //this is called after each unsuccessful server request
                function (response) {
                    setMessage(response);
                    return $q.reject(response);
                }
            );
        };
    });

    //configure $http to show a login dialog whenever a 401 unauthorized response arrives
    $httpProvider.interceptors.push(function ($rootScope, $q) {
        return function (promise) {
            return promise.then(
                //success -> don't intercept
                function (response) {
                    return response;
                },
                //error -> if 401 save the request and broadcast an event
                function (response) {
                    if (response.status === 401) {
                        var deferred = $q.defer(),
                            req = {
                                config: response.config,
                                deferred: deferred
                            };
                        $rootScope.requests401.push(req);
                        $rootScope.$broadcast('event:loginRequired');
                        return deferred.promise;
                    }
                    return $q.reject(response);
                }
            );
        };
    });
    httpHeaders = $httpProvider.defaults.headers;
});

App.run(function ($rootScope, $http, base64) {
    //make current message accessible to root scope and therefore all scopes
    $rootScope.message = function () {
        return message;
    };

    /**
     * Holds all the requests which failed due to 401 response.
     */
    $rootScope.requests401 = [];

    $rootScope.$on('event:loginRequired', function () {
        $('#login').modal('show');
    });

    /**
     * On 'event:loginConfirmed', resend all the 401 requests.
     */
    $rootScope.$on('event:loginConfirmed', function () {
        var i,
            requests = $rootScope.requests401,
            retry = function (req) {
                $http(req.config).then(function (response) {
                    req.deferred.resolve(response);
                });
            };

        for (i = 0; i < requests.length; i += 1) {
            retry(requests[i]);
        }
        $rootScope.requests401 = [];
    });

    /**
     * On 'event:loginRequest' send credentials to the server.
     */
    $rootScope.$on('event:loginRequest', function (event, username, password) {
        httpHeaders.common['Authorization'] = 'Basic ' + base64.encode(username + ':' + password);
        $http.get('action/user').success(function (data) {
            $rootScope.user = data;
            $rootScope.$broadcast('event:loginConfirmed');
        });
    });

    /**
     * On 'logoutRequest' invoke logout on the server and broadcast 'event:loginRequired'.
     */
    $rootScope.$on('event:logoutRequest', function () {
        httpHeaders.common['Authorization'] = null;
    });
});
