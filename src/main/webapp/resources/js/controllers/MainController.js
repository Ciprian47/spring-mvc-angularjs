'use strict';

/**
* MainController
* @constructor
* Celelalte controllere sunt accesate prin $routeProvider. Doar asta este accesat din ng-controller.
*/
var MainController = function ($scope, $rootScope, $http, i18n, $location) {
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

};