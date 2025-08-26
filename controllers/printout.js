myApp.controller("printCtrl", function($scope, $http, $location, $rootScope, $routeParams, $timeout){
	$rootScope.logout = true;
	$rootScope.login = false;

$scope.names = $routeParams.surname + " " + $routeParams.firstname;
$scope.number = $routeParams.idnumber;
$scope.passport =  $routeParams.surname + $routeParams.idnumber + $routeParams.firstname + ".jpg";

$scope.printout = function()
{
$rootScope.rootshow = false;
$timeout(function() {
window.print();
}, 6000);

	
	
};


//date manipulations
	$scope.todaysDate = new Date();
	dd = $scope.todaysDate.getDate();
	mm = $scope.todaysDate.getMonth()+1;
	$scope.yyyy = $scope.todaysDate.getFullYear();
	$scope.todaysDate = $scope.yyyy + " - "+mm+ " - " + dd;
	
// end of date manipulations






						/*$scope.leaveLetterArray[i].dateOfCommencement = $scope.leaveLetterArray[i].dateOfCommencement.getDate() + "-" + $scope.leaveLetterArray[i].dateOfCommencement.getMonth() + "-" + $scope.leaveLetterArray[i].dateOfCommencement.getFullYear();*/

						var d1 = new Date();
						var days = 0;
						while(days<7)
							{
								day = d1.getDay();
								if(day!=0 && day!=6) days++;
								d1.setDate(d1.getDate()+1);
								//alert(d1);
							}
								if(d1.getDay()==0)
									{
									theday = d1.getDate()+1;
									}
									else if( d1.getDay()==6)
									{
										theday= d1.getDate()+2;
									
									}else
									{
										theday = d1;
										
									}
						$scope.todaysDate1 = new Date(theday)		
						dd1 = $scope.todaysDate1.getDate();
						mm1 = $scope.todaysDate1.getMonth()+1;
						$scope.yyyy1 = $scope.todaysDate1.getFullYear();
						$scope.nextWorkingDay = $scope.yyyy1 + " - "+mm1+ " - " + dd1;
						
});