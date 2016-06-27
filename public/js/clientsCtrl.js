angular.module('app').controller('clientsCtrl', function($scope, mainService){


  $scope.clients = mainService.getClients();



})
