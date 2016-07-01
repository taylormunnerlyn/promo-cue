angular.module("app").controller("defaultMessageCtrl", function($scope, mainService, user) {

    $scope.getDefaultMessage = function() {
        mainService.getUser().then(function(response) {
            $scope.user = response.data;
            $scope.defaultMessage = response.data.messages;
        });
    };
    $scope.user = user.data;
    console.log(user.data);
    $scope.defaultMessage = user.data.messages;

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

    // $scope.getUser = function() {
    //   mainService.getUser().then(function(response) {
    //     $scope.user = response.data;
    //   })
    // }
    // $scope.getUser();

});
