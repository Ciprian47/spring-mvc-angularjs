'use strict';

/**
 * TrainController
 * @constructor
 */
App.controller('TrainController', function($scope, $http) {
    $scope.train = {};
    $scope.editMode = false;

    $scope.fetchTrainsList = function() {
        $http.get('action/trains/trainslist.json').then(function(trainList){
            $scope.trains = trainList.data;
            debugger;
        });
    };

    $scope.addNewTrain = function(train) {
        $scope.resetError();

        $http.post('action/trains/addTrain', train).then(function() {
            $scope.fetchTrainsList();
            $scope.train.name = '';
            $scope.train.speed = '';
            $scope.train.diesel = '';
        }).catch(function() {
            $scope.setError('Could not add a new train');
        });
    };

    $scope.updateTrain = function(train) {
        $scope.resetError();

        $http.put('action/trains/updateTrain', train).then(function() {
            $scope.fetchTrainsList();
            $scope.train.name = '';
            $scope.train.speed = '';
            $scope.train.diesel = false;
            $scope.editMode = false;
        }).catch(function() {
            $scope.setError('Could not update the train');
        });
    };

    $scope.editTrain = function(train) {
        $scope.resetError();
        $scope.train = train;
        $scope.editMode = true;
    };

    $scope.removeTrain = function(id) {
        $scope.resetError();

        $http.delete('action/trains/removeTrain/' + id).then(function() {
            $scope.fetchTrainsList();
        }).catch(function() {
            $scope.setError('Could not remove train');
        });
        $scope.train.name = '';
        $scope.train.speed = '';
    };

    $scope.removeAllTrains = function() {
        $scope.resetError();

        $http.delete('action/trains/removeAllTrains').then(function() {
            $scope.fetchTrainsList();
        }).catch(function() {
            $scope.setError('Could not remove all trains');
        });

    };

    $scope.resetTrainForm = function() {
        $scope.resetError();
        $scope.train = {};
        $scope.editMode = false;
    };

    //$scope.shtrain = function() {
    //    $scope.resetError();
    //    $scope.train = {};
    //    $scope.editMode = false;
    //};

    $scope.resetError = function() {
        $scope.error = false;
        $scope.errorMessage = '';
    };

    $scope.setError = function(message) {
        $scope.error = true;
        $scope.errorMessage = message;
    };

    $scope.fetchTrainsList();

    $scope.predicate = 'id';
});