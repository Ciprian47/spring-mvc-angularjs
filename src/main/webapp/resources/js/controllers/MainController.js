'use strict';

/**
* MainController
* @constructor
* Celelalte controllere sunt accesate prin $routeProvider. Doar asta este accesat din ng-controller.
*/
App.controller('MainController', function ($scope, $rootScope, $http, i18n, $location, $filter) {
    $scope.language = function () {
        return i18n.language;
    };
    $scope.setLanguage = function (lang) {
        i18n.setLanguage(lang);
    };
    $scope.activeWhen = function (value) {
        return value ? 'active' : '';
    };

    $scope.path = function () {
        return $location.url();
    };

    $scope.login = function () {
        $scope.$emit('event:loginRequest', $scope.username, $scope.password);
        $('#login').modal('hide');
    };
    $scope.logout = function () {
        $rootScope.user = null;
        $scope.username = $scope.password = null;
        $scope.$emit('event:logoutRequest');
        $location.url('/action/cars');
    };

    //inceput paginatie
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.data = [];
    $scope.q = '';

    $scope.getData = function () {
        // needed for the pagination calc
        // https://docs.angularjs.org/api/ng/filter/filter
        return $filter('filter')($scope.data, $scope.q);
        /*
         // manual filter
         // if u used this, remove the filter from html, remove above line and replace data with getData()

         var arr = [];
         if($scope.q == '') {
         arr = $scope.data;
         } else {
         for(var ea in $scope.data) {
         if($scope.data[ea].indexOf($scope.q) > -1) {
         arr.push( $scope.data[ea] );
         }
         }
         }
         return arr;
         */
    };

    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);
    };

    for (var i=0; i<65; i++) {
        $scope.data.push("Item "+i);
    }
    //sfarsit paginatie

});