myApp.controller('validationCtrl', function ($scope, $modalInstance, $http, $timeout, $rootScope) {
		$scope.count = 0;
		$scope.login=false;
		$scope.showError = false;
		$scope.errorMessage = "";
		$scope.user 	=	{
						username : "",
						userPassword : ""
							}
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
		/*$scope.closeIt = function()
		{
			$scope.showError = false;
			
		}*/
		
		 $scope.validate = function () {
			 if($scope.user.username=="" || $scope.user.userPassword=="")
			 	{
			 		$scope.showError = true;
					$scope.errorMessage = "Your Acoount Information is not Complete";
				}
				else
				{
				$http.post("backend/validate.php?getInformation=yes", $scope.user).success(function(response){
				
				if (response.status == "ok")
				{
					$scope.showError = true;
					
					//$scope.errorMessage = "You are on to UI Admissions";
					$scope.login=true;

					transmittedObject = response.data;
					$timeout(function() {
					  $scope.errorMessage = "";
					  $scope.login=false;
					  $modalInstance.close(transmittedObject);
					}, 5000);
						
				} 
			   else
				{
					$scope.showError = true;
					$scope.errorMessage = "Your Acoount Information is not Correct. " + "  Need help? call 080..." ;
					$timeout(function() {
					 $scope.errorMessage = "";
					  
					}, 3000);
					$scope.count += 1;
					
				}
			  });	
		
	
            		
				}
        };

});
