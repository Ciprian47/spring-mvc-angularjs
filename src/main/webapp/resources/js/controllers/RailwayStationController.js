'use strict';

/**
 * RailwayStationController
 * @constructor
 */
App.controller('RailwayStationController', function($scope, $http) {
    $scope.rs = {};
    $scope.editMode = false;
    $scope.secondClick=0;
    $scope.clasa='';

    $scope.fetchRailwayStationsList = function() {
        $http.get('action/railwaystations/railwaystationlist.json').then(function(rsList){
            debugger;
            $scope.railwaystations = rsList.data;
        });
    };

    $scope.addNewRailwayStation = function(rs) {

        $scope.resetError();

        $http.post('action/railwaystations/add', rs).then(function() {
            $scope.fetchRailwayStationsList();
            $scope.rs.name = '';
            $scope.rs.extension = '';
            $scope.rs.path = '';
        }).catch(function() {
            $scope.setError('Could not add a new station');
        });
    };

    $scope.showDuplicates = function() {
        ++$scope.secondClick;

        if ($scope.secondClick & 1) {

            $scope.clasa='btn-success';
            $scope.resetError();
            $scope.mm = {};

            var ss = [];
            var memmory = $scope.railwaystations;
            var i = 0;
            var k = -1;

            for (i ; i < memmory.length; i++) {
                debugger;
                var indexCount = memmory.filter(function(e) { return e.name == memmory[i].name; }).length;

                /* checking to see if elements already added to array */
                try {
                    var secCount = ss.filter(function (e) {
                        return e.name == memmory[i].name;
                    }).length;
                }catch( e){
                    secCount = 0;
                }

                /* memmory contains more elements */
                if (indexCount > 1 && secCount == 0) {
                    var getDupli = memmory.filter(function(e) { return e.name == memmory[i].name; });
                    var j = 0;

                    for (j; j<getDupli.length; j++){
                        ss.push(getDupli[j]);
                    }

                }

            }
            debugger;
            $scope.railwaystations = ss;

            ss = [];
        }else {
            $scope.clasa='';
            $scope.fetchRailwayStationsList();
        }
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