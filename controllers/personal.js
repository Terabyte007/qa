myApp.controller("personalCtrl", function($scope, $http, $location, $rootScope, $timeout){
$scope.applicant = {"nationality":"[ Select Nationality ]",
					"state":"[ Select State ]",
					"lga":"[ Select LGA ]",
					"surname":"",
					"firstname":"",
					"lastname":"",
					"homeTown":"",
					"maritalStatus":"[ Marital Status ]",
					"gender":"[ Select Gender ]"
					};
					
$rootScope.logout = true;
$rootScope.login = false;
				
	// fetch all the countries from the database
$http.post("backend/fetch.php?what=countries")
	.success(function(response){
			if(response.status=="ok")
				{
					$scope.countries = response.data;
				}
			})
	.error(function(erroMessage){
			$scope.message1 = "" + errorMessage ;
			cleanMessage()
			});

	// end of fecth countries from the database

	// initialise state array
	$scope.states = [];
	
	// fetch states based on the country selected from the database
$scope.updateState = function()
	{
	if($scope.applicant.nationality =="Nigeria")
		{
			// var country = $scope.applicant.nationality ;
		$http.post("backend/fetch.php?what=state")
			.success(function(response){
					if(response.status=="ok")
						{
							$scope.states = response.data;
						}
						else
						{
							$scope.states = [];
						}
					})
			.error(function(erroMessage){
					$scope.message1 = "" + errorMessage ;
					cleanMessage()
					});
		
		}else
		{
			$scope.states = [];
				
		}
	}
		// end of fecth state from the database
		
		// initialise lgas when nothing is yet selected
		$scope.lgas = [];

	// fetch states based on the country selected from the database
$scope.updateLga = function()
	{
		var carrier = {"stateName":$scope.applicant.state };
		$http.post("backend/fetch.php?what=lga", carrier)
			.success(function(response){
					if(response.status=="ok")
						{
							$scope.lgas = response.data;
						}
						else
						{
							$scope.lgas = [];
						}
					})
			.error(function(erroMessage){
					$scope.message1 = "" + errorMessage ;
					cleanMessage();
					});
		
	}
		// end of fecth state from the database

$scope.message1 = "";
// save operation begins here

$scope.save = function()
{
	if($scope.applicant.nationality =="[ Select Nationality ]")
	{
	$scope.message1 = "You did not select nationality";
	cleanMessage()

	}
	else if ($scope.applicant.nationality =="Nigeria" && $scope.applicant.state =="[ Select State ]")
	{
		$scope.message1 = "You did not select State";
		cleanMessage()

	}
	else if ($scope.applicant.gender =="[ Select Gender ]")
	{
		$scope.message1 = "You did not select State";
		cleanMessage()

	}else if ($scope.applicant.maritalStatus =="[ Marital Status ]")
	{
		$scope.message1 = "You did not select State";
		cleanMessage()

	}
	else if ($scope.applicant.nationality =="Nigeria" && $scope.applicant.state !="[ Select State ]" && $scope.applicant.lga == "[ Select LGA ]")
	{
		$scope.message1 = "You did not select LGA";
		cleanMessage()

	} 
	else
	{
			$http.post("backend/fetch.php?what=saveApplicant", $scope.applicant)
			.success(function(response){
					if(response.status=="ok")
						{
							$scope.nextIsReady = true;
							$scope.message1 = response.message;
							cleanMessage()
							
						}
						else
						{
							$scope.message1 = response.message;
							cleanMessage()
						}
					})
			.error(function(erroMessage){
					$scope.message1 = "Error in operation. The error is: " + errorMessage ;
					cleanMessage()
					});
		
		
	}
	
	
	
}
// save operation ends here

// begining of cancel operation
$scope.cancel = function()
{
	$scope.applicant = {"nationality":"[ Select Nationality ]",
					"state":"[ Select State ]",
					"lga":"[ Select LGA ]",
					"surname":"",
					"firstname":"",
					"lastname":"",
					"homeTown":"",
					"maritalStatus":"[ Marital Status ]",
					"gender":"[ Select Gender ]"
					};
	
}
// end of cancel operations


//initialisation of next controller variable
$scope.nextIsReady = false;

// change location
$scope.nextButton = function()
{
	$http.post("backend/fetch.php?what=getNumber", $scope.applicant)
			.success(function(response){
					if(response.status=="ok")
						{
							$scope.nextIsReady = true;
							$scope.data = response.data;
						}
						
					});
					
				/*`applicantId`, `applicantSurname`, `applicantFirstname`, `applicantLastname`, `applicantHomeTown`, `applicantLga`, `applicantState`, `applicantNationality`, `applicantGender`, `applicantMaritalStatus`, `approval`*/
			
$location.path("documents/"+ $scope.data[0].applicantId + "/" + $scope.data[0].applicantSurname + "/" + $scope.data[0].applicantFirstname + "/" + $scope.data[0].applicantLastname + "/" + $scope.data[0].applicantHomeTown + "/" + $scope.data[0].applicantGender + "/" + $scope.data[0].applicantMaritalStatus + "/" + $scope.data[0].applicantNationality + "/" + $scope.data[0].applicantState + "/" + $scope.data[0].applicantLga);	
	
}
	

 function cleanMessage()
 { 
	 $timeout(function() {
		$scope.message1 = "";
	  }, 2000);
 }
});