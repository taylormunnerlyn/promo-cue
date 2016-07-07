angular.module('app').controller('clientsCtrl', function($scope, mainService, user){

  $scope.isActive = false;
  $scope.hidden = true;

  $scope.getClients = function() {
    mainService.getUser().then(function(response) {
      $scope.clients = response.data.clients;
    });
  }
  $scope.clients = user.data.clients;
  $scope.getClients();

  $scope.deleteClient = function(id) {
    mainService.deleteClient(id).then(function(response) {
      alert('Client Successfully Deleted');
      $scope.getClients();
    });
  }

  $scope.updateClient = function(id, updatedClient) {
    mainService.editClients(id, updatedClient).then(function(response) {
      alert('Client Successfully Changed');
      $scope.getClients();
    });
  }

  $scope.faded = []
  $scope.activeButton = function() {
  $scope.isActive = !$scope.isActive;
  $scope.faded.splice(0);
  $scope.faded.push('animated fadeInRight')
  $scope.hidden = !$scope.hidden;
  }



})
