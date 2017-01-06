'use strict';

/**
 * CarController
 * @constructor
 */
App.controller('CarController', function($scope, $http) {
    $scope.fetchCarsList = function() {
        $http.get('action/cars/carlist.json').then(function(carList){
            $scope.cars = carList;
        });
    };

    $scope.addNewCar = function(newCar) {
        debugger;
        $http.post('action/cars/addCar/' + newCar).then(function() {
            debugger;
            $scope.fetchCarsList();
        });
        $scope.carName = '';
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

    $scope.fetchCarsList();
});