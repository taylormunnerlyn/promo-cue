angular.module('app', ['ui.router', 'ngFileUpload'])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider
      .otherwise('/')

    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: './views/login-tmpl.html',
        controller: 'loginCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: './views/register-tmpl.html',
        controller: 'loginCtrl'
      })
      .state('newClient', {
        url: '/newClient',
        templateUrl: './views/newClient-tmpl.html',
        controller: 'newClientCtrl'
      })
      .state('defaultMessage', {
        url: '/defaultMessage',
        templateUrl: './views/defaultMessage-tmpl.html',
        controller: 'defaultMessageCtrl',
        resolve: { user: function(mainService) {
          return mainService.getUser();
        } }
      })
      .state('massText', {
        url: '/massText',
        templateUrl: './views/massText-tmpl.html',
        controller: 'massTextCtrl'
      })
      .state('csvPage', {
        url: '/csv',
        templateUrl: './views/csv-tmpl.html',
        controller: 'csvCtrl'
      })
      .state('clients', {
        url: '/clients',
        templateUrl: './views/clients-tmpl.html',
        controller: 'clientsCtrl',
        resolve: { user: function(mainService) {
          return mainService.getUser();
        } }
      })
  })

angular.module('app').controller('clientsCtrl', function($scope, mainService, user){

  $scope.getClients = function() {
    mainService.getUser().then(function(response) {
      $scope.clients = response.data.clients;
    });
  }

  $scope.clients = user.data.clients;

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



})

// INITILIZE CONTROLLER
// ============================================================
angular.module("app").controller("csvCtrl", function($scope, Upload, $timeout) {
  $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: '/csv',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                                         evt.loaded / evt.total));
            });
        }
    }
});

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

angular.module('app').service('mainService', function($http){

  this.getAdmin = function(){
    return $http({
      method: "GET",
      url: '/admin?5771b31cfe55859e4af4db0d'
    })
  }

  this.login = function(user) {
    return $http({
      method: 'POST',
      url: '/login',
      data: user
    }).then(function(response){
      console.log(response);
      return response;
    })
  }

  this.logout = function() {
    return $http({
      method: 'GET',
      url: '/logout'
    }).then(function(response){
      return response;
    })
  }

  this.register = function(user) {
    return $http({
      method: 'POST',
      url: '/register',
      data: user
    }).then(function(response) {
      return response;
    })
  }
  this.editAdmin = function(updatedAdmin) {
    return $http({
      method: 'PUT',
      url: "/admin",
      data: updatedAdmin
    }).then(function(response) {
      return response;
    });
  };

    this.getClients = function(id) {
      var query = "";
      if (id) query = '?_id=' + id;
      return $http({
        method: 'GET',
        url: '/clients' + query
      }).then(function(response) {
        return response.data;
      });
    };
    this.createClients = function(newClient) {
      var date = moment();
      newClient.reminderDate = date.add(newClient.number, 'weeks')
      return $http({
        method: 'POST',
        url: '/clients',
        data: newClient
      }).then(function(response) {
        return response;
      });
    };
    this.editClients = function(id, updatedClient) {
      return $http({
        method: 'PUT',
        url: "/clients/" + id,
        data: updatedClient
      }).then(function(response) {
        return response;
      });
    };
    this.deleteClient = function(id) {
      return $http({
        method: 'DELETE',
        url: '/clients/' + id
      }).then(function(response) {
        return response;
      });
    };

    this.getDefaultMessage = function() {
      return $http({
        method: 'GET',
        url: '/defaultMessage'
      }).then(function(response) {
        return response.data;
      });
    };
    this.createDefaultMessage = function(newDefaultMessage) {
      console.log(newDefaultMessage);
      return $http({
        method: 'POST',
        url: '/defaultMessage',
        data: { message: newDefaultMessage }
      }).then(function(response) {
        return response;
      });
    };
    this.editDefaultMessage = function(id, updatedDefaultMessage) {
      return $http({
        method: 'PUT',
        url: "/defaultMessage/" + id,
        data: updatedDefaultMessage
      }).then(function(response) {
        return response;
      });
    };
    this.deleteDefaultMessage = function(id) {
      return $http({
        method: 'DELETE',
        url: '/defaultMessage/' + id
      }).then(function(response) {
        return response;
      });
    };
    this.getUser = function() {
      return $http({
        method: 'GET',
        url: '/me'
      }).then(function(response) {
        return response;
      })
    }
    this.sendText = function(to, message) {
      return $http({
        method: 'POST',
        url: '/text',
        data: { to: to, message: message }
      }).then(function(response) {
        return response;
      }).catch(function(err) {
        console.log(err);
      });
    }
    // OTHER FUNCTIONS
    // ============================================================


})

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

angular.module('app').directive('navBarDirective', function() {

    return {
        restrict: 'E',
        templateUrl: './views/navBar-tmpl.html',
        controller: function($scope, $state, mainService) {
            $scope.logout = function() {
                mainService.logout().then(function(response) {
                    $state.go('login');
                })
            }
        }
    }
})

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
