
var $controller;
describe('myController', function() {
    beforeEach(module('myApp'));
    beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
    }));

  describe('$scope.datas ', function() {
    //for checking the default values in the array
    it('checking array', function() {
      var $scope={};
      var controller = $controller('myController', { $scope: $scope });
      expect($scope.datas).toContain({ tid: '100', tname: 'Task 1' });
    });
    //for checking deletion in arary
    it('deleting array datas', function() {
      var $scope = {};
      var controller = $controller('myController', { $scope: $scope });
      $scope.remove(1);
      expect($scope.datas).not.toContain({ tid: '101', tname: 'Task 2' });
    });
     
  });  
  describe('popupController',function(){
    //for checking addition of elements to the array
    it('adding datas to array', function(){
      var $scope = {};
      var modalInstance;
      modalInstance = {  // Create a mock object using spies
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('modalInstance.result.then')
        }
      }
    // modalInstance = _$uibModal_.open({
     //     templateUrl: 'add.html'
    // });
           
      var controller = $controller('popupController', {
        $scope: $scope,
        $uibModalInstance: modalInstance,
        // datas_array: function () { return $scope.datas;} 
      });
    // var controller = $controller('popupController', { 
    //   $scope: $scope,
    //   $uibModalInstance: modalInstance,
    //   datas_array: function () { return $scope.datas; }
    //  });
      $scope.tid="1000";
      $scope.tname="jk";
      $scope.addData();
      expect($scope.datas).toContain({ tid:"1000",tname:"jk"});

    });
    });
   
}); 