myApp.controller("documentsCtrl", function($scope, $http, $location, $routeParams, $timeout, $rootScope){
// get the file stuff
	$rootScope.logout = true;
	$rootScope.login = false;

$scope.applicantId = $routeParams.idnumber;
$scope.surname = $routeParams.surname;
$scope.firstname = $routeParams.firstname;
$scope.lastname = $routeParams.lastname;
$scope.homeTown = $routeParams.homeTown;
$scope.gender = $routeParams.gender;
$scope.maritalStatus = $routeParams.maritalStatus;
$scope.nationality = $routeParams.nationality;
$scope.state = $routeParams.state;
$scope.lga = $routeParams.lga;


$scope.uploadFile = function(files) {
    	var fd = new FormData();
			fd.append("file", files[0]);
			var certificateFilename = $scope.surname + $scope.applicantId + $scope.firstname;
			fd.append("name", certificateFilename);
			$scope.fd = fd;

		};
		
$scope.sendFile = function(theIndex) {
	if($scope.fd === undefined )
	{
	
	$scope.messages = "Please select your scanned birth certificate/age declaration for upload"
	$timeout(function() {
      $scope.messages = "";
    }, 2000);
	}else{
    		$http.post("backend/certificate.php", $scope.fd, {withCredentials: true, headers: {'Content-Type': undefined },transformRequest: angular.identity })
			.success(function(data){
				$scope.messages = data;
				$timeout(function() {
				  $scope.messages = "";
				}, 2000);
				})
			.error(function(errMes){
				$scope.messages = "An error of " + errMes + "has occured. Try again";
				$timeout(function() {
				  $scope.messages = "";
				}, 2000);
				
				});
	}
		};


$scope.uploadFile1 = function(files) {
    	var fd = new FormData();
			fd.append("file", files[0]);
			var certificateFilename = $scope.surname + $scope.applicantId + $scope.firstname;
			fd.append("name", certificateFilename);
			$scope.fd1 = fd;

		};
		
$scope.sendFile1 = function(theIndex) {
	if($scope.fd1 === undefined )
	{
	$scope.messages = "Please select your scanned qualification for upload"
	$timeout(function() {
      $scope.messages = "";
    }, 2000);
	}else{
    		$http.post("backend/qualification.php", $scope.fd1, {withCredentials: true, headers: {'Content-Type': undefined },transformRequest: angular.identity })
			.success(function(data){
				$scope.messages = data;
				$timeout(function() {
				  $scope.messages = "";
				}, 2000);
				})
			.error(function(errMes){
				$scope.messages = "An error of " + errMes + "has occured. Try again";
				$timeout(function() {
				  $scope.messages = "";
				}, 2000);
				
				});
	}
		};

 
 $scope.uploadFile2 = function(files) {
    	var fd = new FormData();
			fd.append("file", files[0]);
			var certificateFilename = $scope.surname + $scope.applicantId + $scope.firstname;
			fd.append("name", certificateFilename);
			$scope.fd2 = fd;

		};
		
$scope.sendFile2 = function(theIndex) {
	if($scope.fd2 === undefined )
	{
	$scope.messages = "Please select your scanned ID Card for upload"
	$timeout(function() {
      $scope.messages = "";
    }, 2000);
	}else{
    		$http.post("backend/idcard.php", $scope.fd2, {withCredentials: true, headers: {'Content-Type': undefined },transformRequest: angular.identity })
			.success(function(data){
				$scope.messages = data;
				$timeout(function() {
				  $scope.messages = "";
				}, 2000);
				})
			.error(function(errMes){
				$scope.messages = "An error of " + errMes + "has occured. Try again";
				$timeout(function() {
				  $scope.messages = "";
				}, 2000);
				
				});
	}
		};



 $scope.uploadFile3 = function(files) {
    	var fd = new FormData();
			fd.append("file", files[0]);
			var certificateFilename = $scope.surname + $scope.applicantId + $scope.firstname;
			fd.append("name", certificateFilename);
			$scope.fd3 = fd;

		};
		
$scope.sendFile3 = function(theIndex) {
	if($scope.fd3 === undefined )
	{
	$scope.messages = "Please select your scanned Passport for upload"
	$timeout(function() {
      $scope.messages = "";
    }, 2000);
	}else{
    		$http.post("backend/passport.php", $scope.fd3, {withCredentials: true, headers: {'Content-Type': undefined },transformRequest: angular.identity })
			.success(function(data){
				$scope.messages = data;
				$timeout(function() {
				  $scope.messages = "";
				}, 2000);
				})
			.error(function(errMes){
				$scope.messages = "An error of " + errMes + "has occured. Try again";
				$timeout(function() {
				  $scope.messages = "";
				}, 2000);
				
				});
	}
		};


 $scope.backward = function()
 {
	 $location.path("personal1"+ "/" + $scope.applicantId + "/" + $scope.surname + "/" + $scope.firstname + "/" + $scope.lastname + "/" + $scope.homeTown + "/" + $scope.gender + "/" + $scope.maritalStatus + "/" + $scope.nationality + "/" + $scope.state + "/" + $scope.lga);	
	 
 }

 
 $scope.preview  = function()
{
	if($scope.fd === undefined || $scope.fd1 === undefined || $scope.fd2 === undefined || $scope.fd3 === undefined)
	{
		$scope.messages = "All the documents are compulsory";
				$timeout(function() {
				  $scope.messages = "";
				}, 2000);	
	}
	else
	{
	$location.path("printout"+ "/" + $scope.applicantId + "/" + $scope.surname + "/" + $scope.firstname );
	}
	}
	});
	
