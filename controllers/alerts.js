myApp.controller("alertCtrl", function($scope, items, $modalInstance){
	$scope.message = items;

	$scope.takeAway = function () {
			$modalInstance.dismiss('cancel');
        };
	
	});