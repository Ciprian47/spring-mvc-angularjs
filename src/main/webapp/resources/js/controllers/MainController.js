'use strict';

/**
 * MainController
 * @constructor
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

};