myApp.controller('settingCtrl', function ($scope, $http, $timeout) {
  $scope.oneAtATime = true;

alert($scope.menu.Contact.me); 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  $scope.user = {"name": "user1@ui.edu.ng",
  				"password": "",
				"pf":"",
				"type":"Select User Type",
				"repeatPassword": ""
				
  				}; 
  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  
  $scope.messages = "";
  
  
  
  
  
  
  
  
  $scope.createUser = function()
  {
	  
	if($scope.user.type == "Select User Type")
	{
			$scope.messages = "Select User Type";
	}else if($scope.user.name == "user1@ui.edu.ng")
	{	
			$scope.messages = "Enter User name";	
	}else if($scope.user.password == "")
	{
			$scope.messages = "Please Enter user password";	
	}else if($scope.user.pf == "")
	{
			$scope.messages = "Please Enter user PF Number";	
	}
	else if($scope.user.repeatPassword== "")
	{
		$scope.messages="Repeat the password"
	}
	else if($scope.user.password != $scope.user.repeatPassword)
	{
		$scope.messages = "Your passwords do not match";	
	} 
	else
	
		{
				
					// send the data for save or update
						$http.post("away/saveOperations.php?usercreation=yes", $scope.user)
							.success(function(data){
							if(data.status=="ok" || data.status=="not ok" || data.status=="exist") 
							{
									$scope.messages = data.message;
							}
							})
							.error(function(errMes){
							$scope.messages = errMes;
					
							});

						// end of send data for update
		} 
	  
 }
 
 
 
});