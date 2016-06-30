// INITILIZE CONTROLLER
// ============================================================
angular.module("app").controller("newClientCtrl", function($scope, mainService) {

    $scope.createClients = function() {
        mainService.createClients($scope.newClient).then(function(response) {
            $scope.newestClient = response;
            alert('client successfully created');
            $scope.newClient = {};
        }).catch(function(err) {
            alert('client creation failed')
        });
    }

});
