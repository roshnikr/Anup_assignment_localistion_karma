describe('myController', function() {
  beforeEach(module('myApp'));
  describe('$scope.datas', function() {
  	it('contains tid 100',function(){
  		expect('$scope.datas').toContain('{tid:"100",tname:"Task 1"}');
  	});

  }
}