// INITILIZE CONTROLLER
// ============================================================
angular.module("app").controller("massTextCtrl", function($scope, mainService) {

  $scope.isActive = false;
  $scope.hidden = true;

  $scope.numbers = [];
  mainService.getUser().then(function(response) {
    $scope.user = response.data;
    var user = response.data;
    for (var i = 0; i < user.clients.length; i++) {
      $scope.numbers.push(user.clients[i].phone);
    }
  });
  $scope.sendText = function(numbers, message){
    mainService.sendText(numbers, $scope.message).then(function(response) {
      alert('Message Sent');
      $scope.message = '';
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
