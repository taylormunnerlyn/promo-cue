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
