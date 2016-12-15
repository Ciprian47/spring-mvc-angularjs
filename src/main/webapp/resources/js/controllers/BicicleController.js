'use strict';

/**
 * BicicleController
 * @constructor
 */
var BicicleController = function($scope, $http) {
    $scope.fetchBiciclesList = function() {
        $http.get('bicicles/biciclelist.json').success(function(bicicleList){
            $scope.bicicles = bicicleList;
        });
    };

    $scope.addNewBicicle = function(newBicicle) {
        $http.post('bicicles/addBicicle/' + newBicicle).success(function() {
            $scope.fetchBiciclesList();
        });
        $scope.bicicleName = '';
    };

    $scope.removeBicicle = function(bicicle) {
        $http.delete('bicicles/removeBicicle/' + bicicle).success(function() {
            $scope.fetchBiciclesList();
        });
    };

    $scope.removeAllBicicles = function() {
        $http.delete('bicicles/removeAllBicicles').success(function() {
            $scope.fetchBiciclesList();
        });

    };

    $scope.fetchBiciclesList();
};