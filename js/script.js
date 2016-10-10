var myApp=angular.module('myApp', ['ui.bootstrap','pascalprecht.translate']);

// code inside config
myApp.config(function ($translateProvider, $translatePartialLoaderProvider) {
  $translateProvider.useLoader('$translatePartialLoader', {
  urlTemplate: '/i18n/{part}/{lang}.json'
});
});

// functions of controller
myApp.controller('myController',['$scope','$modal','$translatePartialLoader','$translate',function($scope,$modal,$translatePartialLoader,$translate){
	$scope.changed_langg='en';
	$scope.datas=[{tid:"100",tname:"Task 1"},{tid:"101",tname:"Task 2"}];

	$translatePartialLoader.addPart('home');
	$translate.refresh();
	$translate.use($scope.changed_langg);

	$scope.update_langg=function(){
	 	$translate.use($scope.changed_langg);
	}
	// function to display popup for adding datas
	$scope.open_popup=function(){
		$scope.tid="";
		$scope.tname="";
		console.log('opening pop up');
		$translatePartialLoader.addPart('popup');
		$translate.refresh();
		$translate.use($scope.changed_langg);
		var modalInstance = $modal.open({
			templateUrl: 'add.html',
			controller:'popupController',
			resolve: {
				datas_array: function () {
					return $scope.datas;
				}
			}
		});
	}
	// function to remove table data
	$scope.remove=function(ind){
		$scope.datas.splice(ind,1);
	}
}]);
// code inside popupController
myApp.controller('popupController',['$scope','$modalInstance','datas_array',function($scope,$modalInstance,datas_array){
	// function to add data to table
	$scope.datas=datas_array;
	$scope.addData=function(){
		var flag=0;
		if($scope.tid==""||$scope.tname==""||$scope.tid==undefined||$scope.tname==undefined){
			alert("Fill all input fields");

		}
		else{
			angular.forEach($scope.datas,function(value,key){
				if($scope.tid==value.tid){
					flag=1;
				}
			});
			if(flag==1){
				alert("Task Id already present!!!");
				$scope.tid="";
				$scope.tname="";
			}else{
				$scope.datas.push({tid:$scope.tid,tname:$scope.tname});
				$modalInstance.dismiss('cancel');
			}
		}
		$scope.tid="";
		$scope.tname="";
		
	}
	$scope.cancel=function(){
		$scope.tid="";
		$scope.tname="";
		$modalInstance.dismiss('cancel');
		
	}

}]);
