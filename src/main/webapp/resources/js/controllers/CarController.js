'use strict';

/**
 * CarController
 * @constructor
 */
var CarController = function($scope, $http) {
    $scope.fetchCarsList = function() {
        $http.get('action/cars/carlist.json').success(function(carList){
            $scope.cars = carList;
        });
    };

    $scope.addNewCar = function(newCar) {
        debugger;
        $http.post('action/cars/addCar/' + newCar).success(function() {
            debugger;
            $scope.fetchCarsList();
        });
        $scope.carName = '';
    };

    $scope.removeCar = function(car) {
        $http.delete('html/cars/removeCar/' + car).success(function() {
            $scope.fetchCarsList();
        });
    };

    $scope.removeAllCars = function() {
        $http.delete('html/cars/removeAllCars').success(function() {
            $scope.fetchCarsList();
        });

    };

    $scope.fetchCarsList();
};