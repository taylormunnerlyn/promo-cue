// INITILIZE CONTROLLER
// ============================================================
angular.module("app").controller("newClientCtrl", function($scope, mainService) {

    $scope.isActive = false;
    $scope.hidden = true;

    $scope.createClients = function() {
        mainService.createClients($scope.newClient).then(function(response) {
            $scope.newestClient = response;
            alert('client successfully created');
            $scope.newClient = {};
        }).catch(function(err) {
            alert('client creation failed')
        });
    }


    $scope.faded = []
    $scope.activeButton = function() {
    $scope.isActive = !$scope.isActive;
    $scope.faded.splice(0);
    $scope.faded.push('animated fadeInRight')
    $scope.hidden = !$scope.hidden;

    }
});
