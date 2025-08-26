myApp.controller("printerCtrl", function($scope, $http, $timeout, $routeParams, $rootScope){
	$scope.entryLimit = 5; //max no of items to display in a page
	$rootScope.logout = true;
	$rootScope.login = false;

	 $http.post('backend/fetch.php?what=clearedApplicants').success(function(response){
		if(response.status == 'ok')
		{
			$scope.data1 =response.data;
			$scope.currentPage = 1; //current page
			$scope.entryLimit = 5; //max no of items to display in a page
			$scope.filteredItems = $scope.data1.length; //Initially for no filter  
			$scope.totalItems = $scope.data1.length;
			//$scope.numPages =5;
			$scope.maxSize = 7;
			$scope.messages = "Welcome! select an Applicant to process"
				$timeout(function() {
				  $scope.messages = "";
				}, 6000);	
		
		}
		else if (response.status == "not ok")
		{
		
		$scope.messages = "Unable to retrieve Applicants"
				$timeout(function() {
				  $scope.messages = "";
				}, 5000);	
		}
    });
	

    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
		
	
	});
	
	
myApp.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

	
	
	
	
