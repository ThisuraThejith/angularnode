
var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope, $http){

	$scope.myName = "Thisura Thejith Charles Philips";

	$scope.itsName = "Bella";

	//$scope.departments = [];

	//get departments
	alert('came');
	$http.get("localhost:8080/departments").then(function(response){
		//console.log(response.data);
		alert('came');
		$scope.departments = response.data;
	});
});