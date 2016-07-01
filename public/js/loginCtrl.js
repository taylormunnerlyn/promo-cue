angular.module('app').controller('loginCtrl', function($scope, $state, mainService) {

  $scope.login = function(user) {
    mainService.login(user).then(function(response) {
      if (!response.data) alert('user not found');
      else {
        console.log(response.data);
        $state.go('newClient');
      }
    }).catch(function(err) {
      alert('Login Failed');
    })
  }

  $scope.register = function(newUser) {
    newUser.clients = [];
    newUser.messages = [];
    mainService.register(newUser).then(function(response) {
      if (!response.data) alert('user not created');
      else {
        $scope.newUser = {};
        alert('User Successfully Created');
        $state.go('login');
      }
    })
  }

})
