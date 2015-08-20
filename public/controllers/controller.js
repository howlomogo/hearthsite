var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
	console.log("This controller is working");

// This works fine, but does refresh when a new contact is added
// $http.get('/contactlist').success(function(response) {
// 	console.log("I got the data I requested");
// 	$scope.contactlist = response;
// });

var refresh = function() {
	$http.get('/contactlist').success(function(response) {
		console.log("I got the data I requested");
	 	$scope.contactlist = response;
	 	$scope.contact = ""; // Reset input fields
	});
};

refresh(); // Call refresh on page load


$scope.addContact = function() {
	console.log($scope.contact);
	$http.post('/contactlist', $scope.contact).success(function(response) {
		console.log(response);
		refresh(); // Refresh when we add a new user
	});
};

$scope.remove = function(id) {
	console.log(id);
	$http.delete('/contactlist/' + id).success(function(response) {
		refresh();
	});
};

$scope.edit = function(id) {
	console.log(id);
	$http.get('/contactlist/' + id).success(function(response) {
		$scope.contact = response; // Put the response into the respective properties in the view 
	});
};

$scope.update = function() {
	console.log($scope.contact._id);
	$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success( function (response) {
		refresh();
	}); // contact will be sent to the server
};

$scope.deselect = function() {
	$scope.contact = "";
};

}]);