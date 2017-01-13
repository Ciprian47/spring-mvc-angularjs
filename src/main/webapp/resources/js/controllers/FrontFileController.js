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

    $scope.showDuplicates = function() {
        ++$scope.secondClick;

        if ($scope.secondClick & 1) {

            $scope.clasa='btn-success';
            $scope.resetError();
            $scope.mm = {};

            var ss = [];
            var memmory = $scope.frontfiles;
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
            $scope.frontfiles = ss;

            ss = [];
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