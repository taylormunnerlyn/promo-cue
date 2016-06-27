angular.module('app', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider
      .otherwise('/login')

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: './views/login-tmpl.html'
      })
      .state('newClient', {
        url: '/newClient',
        templateUrl: './views/newClient-tmpl.html'
      })
      .state('defaultMessage', {
        url: '/defaultMessage',
        templateUrl: './views/defaultMessage-tmpl.html'
      })
      .state('massText', {
        url: '/massText',
        templateUrl: './views/massText-tmpl.html'
      })
      .state('csvPage', {
        url: '/csv',
        templateUrl: './views/csv-tmpl.html'
      })
      .state('newAdmin', {
        url: '/newAdmin',
        templateUrl: './views/newAdmin-tmpl.html'
      })
      .state('clients', {
        url: '/clients',
        templateUrl: './views/clients-tmpl.html',
        controller: 'clientsCtrl'
      })
  })
