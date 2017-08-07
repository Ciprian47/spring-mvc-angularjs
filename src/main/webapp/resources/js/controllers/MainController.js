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

    //paginatie
    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.order = '+';

    $scope.orderBy = function (property) {
        $scope.order = ($scope.order[0] === '+' ? '-' : '+') + property;
    };

    $scope.orderIcon = function (property) {
        return property === $scope.order.substring(1) ? $scope.order[0] === '+' ? 'glyphicon glyphicon-chevron-up' : 'glyphicon glyphicon-chevron-down' : '';
    };
    //paginatie

});

App.controller('FolderController', function ($scope, $rootScope, $http, i18n, $location, $filter) {
    //$scope.language = function () {
    //    return i18n.language;
    //};
    //$scope.setLanguage = function (lang) {
    //    i18n.setLanguage(lang);
    //};
    //$scope.activeWhen = function (value) {
    //    return value ? 'active' : '';
    //};
    //
    //$scope.path = function () {
    //    return $location.url();
    //};
    //
    //$scope.login = function () {
    //    $scope.$emit('event:loginRequest', $scope.username, $scope.password);
    //    $('#login').modal('hide');
    //};
    //$scope.logout = function () {
    //    $rootScope.user = null;
    //    $scope.username = $scope.password = null;
    //    $scope.$emit('event:logoutRequest');
    //    $location.url('/action/cars');
    //};

    ////paginatie
    //$scope.currentPage = 1;
    //$scope.pageSize = 5;
    //$scope.order = '+';
    //
    //$scope.orderBy = function (property) {
    //    $scope.order = ($scope.order[0] === '+' ? '-' : '+') + property;
    //};
    //
    //$scope.orderIcon = function (property) {
    //    return property === $scope.order.substring(1) ? $scope.order[0] === '+' ? 'glyphicon glyphicon-chevron-up' : 'glyphicon glyphicon-chevron-down' : '';
    //};
    ////paginatie

});