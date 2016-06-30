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
