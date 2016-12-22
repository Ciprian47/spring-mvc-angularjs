'use strict';

/**
 * CarController
 * @constructor
 */
var CarController = function($scope, $http) {
    $scope.fetchCarsList = function() {
        $http.get('WEB-INF/html/cars/carlist.json').success(function(carList){
            $scope.cars = carList;
        });
    };

    $scope.addNewCar = function(newCar) {
        $http.post('WEB-INF/html/cars/addCar/' + newCar).success(function() {
            $scope.fetchCarsList();
        });
        $scope.carName = '';
    };

    $scope.removeCar = function(car) {
        $http.delete('WEB-INF/html/cars/removeCar/' + car).success(function() {
            $scope.fetchCarsList();
        });
    };

    $scope.removeAllCars = function() {
        $http.delete('WEB-INF/html/cars/removeAllCars').success(function() {
            $scope.fetchCarsList();
        });

    };

    $scope.fetchCarsList();
};