var myApp=angular.module('myApp', ['ui.bootstrap','pascalprecht.translate']);

// code inside config
myApp.config(function ($translateProvider, $translatePartialLoaderProvider) {
  $translateProvider.useLoader('$translatePartialLoader', {
  urlTemplate: '/i18n/{part}/{lang}.json'
});
});
myApp.factory('myFactory',function(){
	var obj={};
	var data_list=[
	{tid:"100",tname:"Task 1"},
	{tid:"101",tname:"Task 2"}
	];
	obj.getData=function(){
		return data_list;
	}
	obj.setData=function(t,n){
		data_list.push({tid:t,tname:n});
	}
	return obj;
});

// functions of controller
myApp.controller('myController',['$scope','myFactory','$uibModal','$translatePartialLoader','$translate',function($scope,myFactory,$uibModal,$translatePartialLoader,$translate){
	$scope.changed_langg='en';
	$scope.test1="hai";
	$scope.datas=myFactory.getData();

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
		var modalInstance = $uibModal.open({
			templateUrl: 'add.html',
			controller:'popupController',
			// resolve: {
			// 	datas_array: function () {
			// 		return $scope.datas;
			// 	}
			// }
		});
	}
	// function to remove table data
	$scope.remove=function(ind){
		$scope.datas.splice(ind,1);
	}
}]);
// code inside popupController
myApp.controller('popupController',['$scope','myFactory','$uibModalInstance',function($scope,myFactory,$uibModalInstance){
	// function to add data to table
	
	$scope.addData=function(){
		$scope.datas=myFactory.getData();
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
				myFactory.setData($scope.tid,$scope.tname);
				$uibModalInstance.dismiss('cancel');
			}
		}
		$scope.tid="";
		$scope.tname="";
		
	}
	$scope.cancel=function(){
		$scope.tid="";
		$scope.tname="";
		$uibModalInstance.dismiss('cancel');
		
	}

}]);
