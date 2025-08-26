myApp.controller("bodyCtrl", function($rootScope, $scope, $location, $modal, $rootScope, $timeout, $localStorage)
{
	$scope.menu = {
					"Contact" : {"Technical": {"Visibility": 'true'},
								  "Admission":{"Visibility": 'true'},
								  "me":'true'},
					"Check" : {"Eligibility": {"Visibility": 'true'},
								  "me":'true'},
					"Print" : {"Invitation": {"Visibility": 'true'},
								  "PUTMEResut":{"Visibility": 'true'},
								  "me":'true'},
					"BioData" : {"ViewBiodata": {"Visibility": 'true'},
								  "UTMEBiodata":{"Visibility": 'true'},
								  "DEBiodata":{"Visibility": 'true'},
								  "me":'true'},
					"PastQuestion" : {"OnlyQuestions": {"Visibility": 'true'},
								  "QuestionsAndAnswers":{"Visibility": 'true'},
								  "me":'true'},
					"AdmissionStatus" : {"UTMEAdmissionStatus": {"Visibility": 'true'},
								  "DEAdmissionStatus":{"Visibility": 'true'},
								  "me":'true'},
					"Locations" : {"Examination": {"Visibility": 'true'},
								  "UI":{"Visibility": 'true'},
								  "me":'true'},
					"Administration" : {"Setting": {"Visibility": 'true'},
								  "UserAccount":{"Visibility": 'true'},
								  "AdmissionOfficerSign":{"Visibility": 'true'},
								  "Statistics":{"Visibility": 'true'},
								  "me":'true'}			
			};
			
	$scope.user = {
			"username": "",
			"userpassword" : ""
		}
		
    $scope.login = function(size)
	{
		var modalInstance = $modal.open(
		{
          templateUrl: 'partials/login.html',
          controller: 'validationCtrl',
          size: size,
		  keyboard : false
		  
        });
	   
	}
	
    $scope.logout = function()
	{
		//alert('Hi');
		$rootScope.user_details = "";
		$rootScope.authenticated = false;
		$localStorage.$reset();
		$location.path("/");
	   
	}

	});