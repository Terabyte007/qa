

myApp.controller("uploadCtrl", function($scope, $http, $location, $rootScope, $timeout){

$scope.previewIsDone = false;


	$rootScope.logout = true;
	$rootScope.login = false;



/////////////////////////////////////////////////////////sdjhsjdhsdjshdj

	
	$scope.messages =""
	
	$scope.readyForProcessing = false;
	$scope.uploadLeaveSendFile1 = function(files){
		var fileHolder = new FormData();
			fileHolder.append("file", files[0]);
			$scope.fileHolder =fileHolder;
		};
		
	$scope.backWithData=false;	
	$scope.previewIsDone=false;
		
		$scope.uploadLeaveSendFile = function(){
			if( $scope.fileHolder===undefined)
			{
				$scope.messages ="Please select an excel file first";
				$timeout(function() {
					  $scope.messages = "";
					}, 3000);
			}
			else
			{
			
			$http.post("backend/upload.php", $scope.fileHolder, {withCredentials: true, headers: {'Content-Type': undefined },transformRequest: angular.identity })
			.success(function(data){
				
				$scope.messages =data;
				$timeout(function() {
					  $scope.messages = "";
					}, 3000);
				$scope.readyForProcessing = true;
				
				
				})
			.error(function(errMes){
				$scope.messages ="Error: "+ errMes;
				$timeout(function() {
					  $scope.messages = "";
					}, 3000);
				
				});
			}
		};

	$scope.cancelList = function(){
		
		$scope.readyForProcessing = false;
		$scope.leaveData = [];

		};
		
		$scope.previewList = function(){

			
			$http.post("backend/processpin.php?displaySpreadsheet=yes")
				.success(function(sentData){
					
				$scope.leaveData = sentData;
				$scope.leaveDatalength = $scope.leaveData.length;
				$scope.backWithData=true;	
				$scope.previewIsDone=true;


					
					})
				.error(function(errMes){
					$scope.messages ="Error: "+ errMes;
					$timeout(function() {
					  $scope.messages = "";
					}, 3000);
					
					});
					
		
		// end of some filter operations


		};
		
		// upload list function
		
		$scope.uploadList = function(){

			$http.post("backend/processpin.php?uploadListProcess=yes")
			.success(function(sentData){
				$scope.messages =sentData.status;
					$timeout(function() {
					  $scope.messages = "";
					}, 3000);
			})
			.error(function(errMes){
				$scope.messages = "Error from Transaction"+errMes;
					$timeout(function() {
					  $scope.messages = "";
					}, 3000);
					
			});
		};
		
		

/////////////////////////////////////////////////////////// dhsdjhsdjhsdjs	
});