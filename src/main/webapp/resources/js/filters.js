'use strict';

/* Filters */

var AppFilters = angular.module('AngularSpringApp.filters', []);

App.filter('interpolate', ['version', function (version) {
    return function (text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    }
}]);

