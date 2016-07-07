// INITILIZE CONTROLLER
// ============================================================
angular.module("app").controller("csvCtrl", function($scope, Upload, $timeout, $state) {

  $scope.isActive = false;
  $scope.hidden = true;


  $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: '/csv',
                data: {file: file}
            });

            file.upload.then(function (response) {
                // $timeout(function () {
                //     file.result = response.data;
                // });
                $state.go('clients')
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                                         evt.loaded / evt.total));
            });
        }
    }

    $scope.faded = []
    $scope.activeButton = function() {
    $scope.isActive = !$scope.isActive;
    $scope.faded.splice(0);
    $scope.faded.push('animated fadeInRight')
    $scope.hidden = !$scope.hidden;
    }

});
