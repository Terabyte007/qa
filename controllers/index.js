myApp.controller("indexCtrl", function($scope, $modal, $location, $rootScope){
	$scope.loginIsReady = false;
	$scope.loginSuccessful = false;
	$rootScope.logout = false;
	$rootScope.login = true;
	$rootScope.rootshow = true;
	
	//this is the begining of the the modal window handlers
	
	$scope.showLogin = function (size) {

        var modalInstance = $modal.open(
		{
          templateUrl: 'partials/login.html',
          controller: 'validationCtrl',
          size: size,
		  keyboard : false
		  
		  /*,
          resolve: {
            item: function () 
			{
				`userId`, `username`, `userPassword`, `userType`
              return p;
            }
         }*/
        });
        modalInstance.result.then(function(selectedObject) {
	   $scope.loginSuccessful = true;
			if(selectedObject.userType == "applicant")
			{
			   $location.path("personal");
			}else if(selectedObject.userType == "Admin")
			{
			 $location.path("adminsection");
			}
			else if(selectedObject.userType == "banker")
			{
			 $location.path("banker");
			}else if(selectedObject.userType == "printer")
			{
			 $location.path("printer");
			}
			else if(selectedObject.userType == "banker")
			{
			 $location.path("banker");
			}
			else
			{
			$scope.messages = "Please see the admin for clarification";	
			}
        });
    };
	
	// this is the end of the modal window handler
	/*$scope.login = function(){
	$location.path("login");	
		}*/
	$scope.signOut = function()
	{
	//	alert("kilode?");
		$location.path("carousel");
		$rootScope.login = true;
		$rootScope.logout = false;


		}
	});