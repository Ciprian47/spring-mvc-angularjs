'use strict';

/**
 * RailwayStationController
 * @constructor
 */
App.controller('RailwayStationController', function($scope, $http) {
    $scope.rs = {};
    $scope.editMode = false;

    $scope.fetchRailwayStationsList = function() {
        $http.get('action/railwaystations/railwaystationlist.json').then(function(rsList){
            $scope.railwaystations = rsList.data;
        });
    };

    $scope.addNewRailwayStation = function(rs) {

        $scope.resetError();

        $http.post('action/railwaystations/add', rs).then(function() {
            $scope.fetchRailwayStationsList();
            $scope.rs.name = '';
            $scope.rs.train.name = '';
            $scope.rs.train.speed = '';
            $scope.rs.train.diesel = false;
        }).catch(function() {
            $scope.setError('Could not add a new station');
        });
    };

    $scope.updateRailwayStation = function(rs) {
        $scope.resetError();

        $http.put('action/railwaystations/update', rs).then(function() {
            $scope.fetchRailwayStationsList();
            $scope.rs.name = '';
            $scope.rs.train.name = '';
            $scope.rs.train.speed = '';
            $scope.rs.train.diesel = false;
            $scope.editMode = false;
        }).catch(function() {
            $scope.setError('Could not update the train');
        });
    };

    $scope.editRailwayStation = function(rs) {
        $scope.resetError();
        $scope.rs = rs;
        $scope.editMode = true;
    };

    $scope.removeRailwayStation = function(id) {
        $scope.resetError();

        $http.delete('action/railwaystations/remove/' + id).then(function() {
            $scope.fetchRailwayStationsList();
        }).catch(function() {
            $scope.setError('Could not remove train');
        });
        
        $scope.rs = '';
    };

    $scope.removeAllRailwayStations = function() {
        $scope.resetError();

        $http.delete('action/railwaystations/removeAll').then(function() {
            $scope.fetchRailwayStationsList();
        }).catch(function() {
            $scope.setError('Could not remove all RailwayStations');
        });

    };

    $scope.resetRailwayStationForm = function() {
        $scope.resetError();
        $scope.rs = {};
        $scope.editMode = false;
    };

    $scope.resetError = function() {
        $scope.error = false;
        $scope.errorMessage = '';
    };

    $scope.setError = function(message) {
        $scope.error = true;
        $scope.errorMessage = message;
    };

    $scope.fetchRailwayStationsList();

    $scope.predicate = 'id';

});