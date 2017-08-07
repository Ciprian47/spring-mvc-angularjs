'use strict';

/**
 * FolderController
 * @constructor
 */
App.controller('FolderController', function($scope, $http) {
    $scope.fetchFoldersList = function() {
        $http.get('action/folder/folderlist.json').then(function(folderList){
            $scope.Folders = folderList;
        });
    };

    $scope.addNewFolder = function(newFolder) {
        $http.post('action/folder/addFolder/' + newFolder).then(function() {
            $scope.fetchFoldersList();
        });
        $scope.folderName = '';
    };

    $scope.removeFolder = function(Folder) {
        $http.delete('action/folder/removeFolder/' + Folder).then(function() {
            $scope.fetchFoldersList();
        });
    };

    //$scope.removeAllFolders = function() {
    //    $http.delete('action/folder/removeAllFolders').then(function() {
    //        $scope.fetchFoldersList();
    //    });
    //
    //};

    $scope.fetchFoldersList();
});
