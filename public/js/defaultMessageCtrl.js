angular.module("app").controller("defaultMessageCtrl", function($scope, mainService, user) {

  $scope.isActive = false;
  $scope.hidden = true;

    $scope.getDefaultMessage = function() {
        mainService.getUser().then(function(response) {
            $scope.user = response.data;
            for (var i = 0; i < response.data.messages.length; i++) {
              if (response.data.messages[i]._id === $scope.user.defaultMessage) {
                var item = response.data.messages.splice(i, 1)[0];
                response.data.messages.unshift(item);
              }
            }
            $scope.defaultMessage = response.data.messages;
            console.log(123, $scope.user);
            console.log(124, $scope.defaultMessage);
        });
    };
    $scope.user = user.data;
    $scope.defaultMessage = user.data.messages;
    $scope.getDefaultMessage();

    $scope.createDefaultMessage = function() {
        mainService.createDefaultMessage($scope.newMessage).then(function(response) {
            $scope.defaultMessage = response.data;
            alert('client successfully created');
            $scope.newMessage = '';
            $scope.getDefaultMessage();
        });
    };

    $scope.updateMessage = function(id, updatedMessage) {
        mainService.editDefaultMessage(id, updatedMessage).then(function(response) {
          console.log('edition successful');
          $scope.getDefaultMessage();
        });
    }

    $scope.deleteMessage = function(id) {
        mainService.deleteDefaultMessage(id).then(function(response) {
          console.log('deletion successful');
          $scope.getDefaultMessage();
        });
    }

    $scope.makeDefault = function(id) {
      mainService.editAdmin({defaultMessage: id}).then(function(response) {
        alert('Default Message Changed')
        $scope.getDefaultMessage();
      })
    }

    $scope.faded = []
    $scope.activeButton = function() {
    $scope.isActive = !$scope.isActive;
    $scope.faded.splice(0);
    $scope.faded.push('animated fadeInRight')
    $scope.hidden = !$scope.hidden;
    }

});
