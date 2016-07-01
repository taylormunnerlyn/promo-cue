// INITILIZE CONTROLLER
// ============================================================
angular.module("app").controller("massTextCtrl", function($scope, mainService) {
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
});
