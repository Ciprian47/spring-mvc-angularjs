'use strict';

/**
 * frontfileController
 * @constructor
 */
App.controller('FrontFileController', function($scope, $http) {
    $scope.rs = {};
    $scope.editMode = false;
    $scope.secondClick=0;
    $scope.clasa='';

    $scope.fetchFrontFilesList = function() {
        $http.get('action/frontfiles/frontfilelist.json').then(function(rsList){
            debugger;
            $scope.frontfiles = rsList.data;
        });
    };

    $scope.addNewFrontFile = function(rs) {

        $scope.resetError();

        $http.post('action/frontfiles/add', rs).then(function() {
            $scope.fetchFrontFilesList();
            $scope.rs.name = '';
            $scope.rs.extension = '';
            $scope.rs.path = '';
        }).catch(function() {
            $scope.setError('Could not sinc files');
        });
    };

    $scope.showDuplicatesOptim = function() {
        ++$scope.secondClick;

        if ($scope.secondClick & 1) {

            $scope.clasa='btn-success';
            $scope.resetError();
            $scope.mm = {};
            var ss = [];
            var memmory = $scope.frontfiles;
            var i = 0;
            var indexes = [];

            for (i ; i < memmory.length; i++) {

                indexes.push(memmory[i].name);

            }
            for (i=0; i< indexes.length; i++){

                if (indexes.indexOf(indexes[i]) != indexes.lastIndexOf(indexes[i])) {

                    ss.push(memmory[i]);

                }

            }
            debugger;
            $scope.frontfiles = ss;

            ss = [];
        }else {
            $scope.clasa='';
            $scope.fetchFrontFilesList();
        }
    };

    $scope.showDuplicates = function() {
        ++$scope.secondClick;
        debugger;
        var inceput = performance.now();

        if ($scope.secondClick & 1) {

            $scope.clasa='btn-success';
            $scope.resetError();
            $scope.mm = {};
            var ss = [];
            var temp = [];
            var num = [];


            var memmory = $scope.frontfiles;
            var i = 0;
            var indexes = 0;

            for (i ; i < memmory.length; i++) {

                var j = i+1;
                var firstPass = 0;
                var k =0;
                var allready=0;
                var l = 0;
                for (l; l<num.length; l++){

                    if (num[l] == i){
                        indexes = 1;
                    }

                }

                if (indexes == 0) {
                    for (j; j < memmory.length; j++) {

                        if (memmory[j].name == memmory[i].name) {
                            num.push(j);
                            if (firstPass == 0) {
                                firstPass = 1;
                                ss.push(memmory[i]);
                            }
                            ss.push(memmory[j]);
                        }

                    }
                }


            }
            var h= [];
            var k=0;
            var primSfarsit = performance.now();
            console.log("Call to doSomething took prim:" + (primSfarsit - inceput) + " milliseconds.");

            $scope.frontfiles = ss;
            ss = [];

            var sfarsit = performance.now();
            console.log("Call to doSomething took total" + (sfarsit - inceput) + " milliseconds.");
            console.log("Call to doSomething took sec:" + (sfarsit - primSfarsit) + " milliseconds.");

            debugger;
        }else {
            $scope.clasa='';
            $scope.fetchFrontFilesList();
        }
    };

    $scope.editFrontFile = function(rs) {
        $scope.resetError();
        $scope.rs = rs;
        $scope.editMode = true;
    };

    $scope.removeFrontFile = function(id) {
        $scope.resetError();

        $http.delete('action/frontfiles/remove/' + id).then(function() {
            $scope.fetchFrontFilesList();
        }).catch(function() {
            $scope.setError('Could not remove train');
        });
        
        $scope.rs = '';
    };

    $scope.removeAllFrontFiles = function() {
        $scope.resetError();

        $http.delete('action/frontfiles/removeAll').then(function() {
            $scope.fetchFrontFilesList();
        }).catch(function() {
            $scope.setError('Could not remove all FrontFiles');
        });

    };

    $scope.resetFrontFileForm = function() {
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

    $scope.fetchFrontFilesList();

    $scope.predicate = 'id';

});