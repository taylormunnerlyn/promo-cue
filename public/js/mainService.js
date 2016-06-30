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
