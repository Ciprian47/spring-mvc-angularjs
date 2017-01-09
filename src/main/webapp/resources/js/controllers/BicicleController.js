'use strict';

/**
 * BicicleController
 * @constructor
 */
App.controller('BicicleController', function($scope, $http) {
    $scope.fetchBiciclesList = function() {
        $http.get('action/bicicles/biciclelist.json').then(function(bicicleList){
            $scope.bicicles = bicicleList;
        });
    };

    $scope.addNewBicicle = function(newBicicle) {
        $http.post('action/bicicles/addBicicle/' + newBicicle).then(function() {
            $scope.fetchBiciclesList();
        });
        $scope.bicicleName = '';
    };

    $scope.removeBicicle = function(bicicle) {
        $http.delete('action/bicicles/removeBicicle/' + bicicle).then(function() {
            $scope.fetchBiciclesList();
        });
    };

    $scope.removeAllBicicles = function() {
        $http.delete('action/bicicles/removeAllBicicles').then(function() {
            $scope.fetchBiciclesList();
        });

    };

    $scope.fetchBiciclesList();
});