'use strict';

/**
 * CarController
 * @constructor
 */
App.controller('CarController', function($scope, $http) {

    $scope.car = {};

    $scope.fetchCarsList = function() {
        $http.get('action/cars/carlist.json').then(function(carList){
            debugger;
            $scope.cars = carList.data;
        });
    };

    $scope.addNewCar = function(car) {
        $scope.resetError();
        debugger;
        $http.post('action/cars/addCar', car).then(function() {
            debugger;
            $scope.fetchCarsList();
            $scope.car.name = '';
        }).catch(function() {
            $scope.setError('Could not add a new car');
        });

    };

    $scope.removeCar = function(car) {
        $http.delete('action/cars/removeCar/' + car).then(function() {
            $scope.fetchCarsList();
        });
    };

    $scope.removeAllCars = function() {
        $http.delete('action/cars/removeAllCars').then(function() {
            $scope.fetchCarsList();
        });

    };

    $scope.resetError = function() {
        $scope.error = false;
        $scope.errorMessage = '';
    };

    $scope.setError = function(message) {
        $scope.error = true;
        $scope.errorMessage = message;
    };

    $scope.fetchCarsList();
});