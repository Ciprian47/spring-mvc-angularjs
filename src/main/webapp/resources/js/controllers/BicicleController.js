'use strict';

/**
 * BicicleController
 * @constructor
 */
var BicicleController = function($scope, $http) {
    $scope.fetchBiciclesList = function() {
        $http.get('action/bicicles/biciclelist.json').success(function(bicicleList){
            $scope.bicicles = bicicleList;
        });
    };

    $scope.addNewBicicle = function(newBicicle) {
        $http.post('action/bicicles/addBicicle/' + newBicicle).success(function() {
            $scope.fetchBiciclesList();
        });
        $scope.bicicleName = '';
    };

    $scope.removeBicicle = function(bicicle) {
        $http.delete('action/bicicles/removeBicicle/' + bicicle).success(function() {
            $scope.fetchBiciclesList();
        });
    };

    $scope.removeAllBicicles = function() {
        $http.delete('action/bicicles/removeAllBicicles').success(function() {
            $scope.fetchBiciclesList();
        });

    };

    $scope.fetchBiciclesList();
};