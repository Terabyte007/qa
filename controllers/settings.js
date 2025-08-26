// carousal controller
myApp.controller("addPotfolioCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$scope.potfolio = $routeParams['potfolio'];
	//var myString = new String("howdy");
	$rootScope.content_loaded = false;
	$rootScope.isMain = false;
	$scope.add_single = true;
	$scope.edit_single_dean = false;
	$scope.add_multiple = false;
	$scope.edit_dean = true;
	$scope.download_dean_template = false;
	$scope.searchbox = "";
	$scope.updating_dean = false;
	$scope.submittingDean = false;
	$scope.staff_not_in_existence = false;
	$scope.create_staff = false;
	$scope.question_section = true;
	$scope.button_section = true;
	$scope.portfolio_template = String($scope.potfolio).toLowerCase();
	$scope.departments = [];
	$scope.item_data = {
						  faculty: '',
						  department: '',
						  surname: '',
						  pf_number: '',
						  firstname: '',
						  middlename: '',
						  title: ''
					  };
$scope.select_department = function(faculty){
	$http.post('backend/sqlprocesses.php?get_department=yes', {"name_of_faculty": faculty})
		.success(function(response) {
		$scope.loading_depts = false;
			if(response.status === "ok"){
				$scope.departments = response.data;
			}
		})
		.error(function(data) {
		});
	}

$scope.yes = function()
{
	$scope.create_staff = true; 
	$scope.question_section = false;
	$scope.button_section = false;	
}
$scope.no = function()
{
	$scope.staff_not_in_existence = false; 
}


$scope.portfolio_affirmed = function(item_data)
{
	//alert(JSON.stringify(item_data));
//$scope.submittingDean = true;
	$http.post('backend/sqlprocesses.php?portfolio_affirmed=yes', item_data)
		.success(function(response) {
			if(response.status === "ok"){
				$scope.button_section = true;
				$scope.savePortfolioBtn(item_data);
				$scope.staff_not_in_existence = false;
			}else if(response.status === "not ok")
			{
				message_code = {
							  status: 'error',
							  message: 'Your information was not saved successfully therefore ' + item_data.title + " "+ item_data.surname + 
							  "has not been made dean"
						  };
				Data.toast(message_code);

			}
		})
		.error(function(errorMessage){
			});
			
}	
$scope.dean_declined = function(item_data)
{
	$scope.staff_not_in_existence = false;
}
 	
$scope.savePortfolioBtn = function (item_data) 
{
	$scope.submittingDean = true;
	//alert(JSON.stringify(item_data));
	$http.post('backend/sqlprocesses.php?save_POTFOLIO=yes&&potfolio='+ $scope.potfolio, item_data)
	.success(function(response) {
	$scope.submitting = false;
	if(response.status === "ok"){
	message_code = {
					  status: 'success',
					  message: 'Your information was saved successfully and ' + item_data.title + " "+ item_data.surname + " "+ item_data.firstname + " has been made a/an"+ $scope.potfolio
				  };
	Data.toast(message_code);
				
	}else if(response.status === "not ok")
	{
		message_code = {
						  status: 'error',
						  message: 'Your information was not saved successfully'
						};
			Data.toast(message_code);
			}else if(response.status === "exist")
			{
				message_code = {
							  status: 'error',
							 message: 'Your information was not saved successfully because ' + item_data.title + " "+ item_data.surname +  " "+ item_data.firstname +" is already a/an " + $scope.potfolio 
						  };
			Data.toast(message_code);
			}else if(response.status === 'not a staff')
			{
				$scope.staff_not_in_existence = true;
				
			}
		})
		.error(function(data) {

		});
		
		$scope.submittingDean = false;
    };
	

	$scope.saveEditDean = function(details_object)
	{
	$scope.updating_dean = true;
		$http.post('backend/sqlprocesses.php?update_dean=yes', details_object)
		.success(function(response) {
			if(response.status === "ok"){
				message_code = {
							  status: 'success',
							  message: 'You information was updated successfully'
						  };
			Data.toast(message_code);
				
			}else if(response.status === "not ok")
			{
				message_code = {
							  status: 'error',
							  message: 'You information was not updated successfully'
						  };
			Data.toast(message_code);
			}
		})
		.error(function(data) {

		});
	$scope.updating_dean = false;
	}
	

	$scope.openAddSingleDv = function(){
	$scope.add_single = true;
	$scope.edit_single_dean = false;
	$scope.add_multiple = false;
	$scope.download_dean_template = false;
	};
	
	$scope.openAddMultipleDv = function(){
		$scope.add_single = false;
		$scope.edit_single_dean = false;
		$scope.add_multiple = true;
		$scope.download_dean_template = false;
	};
	
	$scope.openRemoveSingleDv = function(){
		$scope.add_single = false;
		$scope.edit_single_dean = true;
		$scope.add_multiple = false;
		$scope.download_dean_template = false;

	};
	
	$scope.openDownloadTemaplateDv = function(){
		$scope.add_single = false;
		$scope.edit_single_dean = false;
		$scope.add_multiple = false;
		$scope.download_dean_template = true;

	};



	$http.get('backend/sqlprocesses.php?get_faculties=yes')
	.success(function(response) {
		if(response.status === "ok"){
			$scope.faculties = response.data;
			$rootScope.content_loaded = true;
		}
	})
	.error(function(data) {
		$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			
		$rootScope.content_loaded = true;
	});
	
	
	$http.post('backend/sqlprocesses.php?get_titles=yes')
		.success(function(response) {
		$scope.loading_depts = false;
			if(response.status === "ok"){
				$scope.titles = response.data;
				$rootScope.content_loaded = true;
			}
		})
		.error(function(data) {
		 $scope.loading_depts = false;
			$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			$rootScope.content_loaded = true;
		});
		
	$scope.searchbutton = function(searchbox){
	$http.post('backend/sqlprocesses.php?get_portfolio=yes',{"pf_number":searchbox, "portfolio": $scope.potfolio})
	.success(function(response) {
		if(response.status === "ok"){
			$scope.staff = [];
			$scope.staff.push(response.data);
			$rootScope.content_loaded = true;
		}else
		{
			$scope.staff = [];
		}
	})
	.error(function(data) {
		$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			
		$rootScope.content_loaded = true;
	});
	}
	
	$scope.edit_details = function(details_object)
	{
		//$scope.edit_dean_details = true;
		$scope.edit_dean_information = true;
		$scope.edit_data = angular.copy(details_object);
		
	}
	$scope.cancel_details = function()
	{
		//$scope.edit_dean_details = true;
		$scope.edit_dean_information = false;
		
	}
	$scope.delete_dean_title = function(details_object)
	{
		if(confirm("Are you sure to delete the dean title from " + details_object.title + " " + details_object.surname + " " + details_object.othernames))
		 {
			$http.post('backend/sqlprocesses.php?delete_dean_title=yes', details_object)
			.success(function(response) {
				if(response.status === "ok"){
				alert(details_object.title + " " + details_object.surname + " " + details_object.othernames + " has been removed from being dean");
				$scope.staff = [];
				$scope.cancel_details();
				$scope.edit_data = angular.copy($scope.staff);	
				$scope.searchbox = "";
				}else if(response.status === "not ok")
				{
				alert(details_object.title + " " + details_object.surname + " " + details_object.othernames + " could not be removed from being dean");	
				}
			})
			.error(function(data) {
	
			});
		 }else
		 {
		    ////////////////// do nothing
		 }
		
	}
///////////////////////// begining of bulk upload
	$scope.pickupthefileformassupload = function(files) {
		var fd1 = new FormData();
		fd1.append("file", files[0]);
		fd1.append("name", "massDataForDean");
		fd1.append("savefilename", "massDataForDean");
		$scope.fd1 = fd1;
		$scope.isSelected = true;
		  };
	$scope.unsavedData = [];
	$scope.savedData = [];
	$scope.notOk = [];
	$scope.unsavedRecord = false;
	$scope.okRecord = false;
	$scope.notOkRecord = false;
	
	
	$scope.uploadMassDean = function(the_potfolio)
	{
			if( $scope.fd1===undefined)
			{
			   message_code = {status: 'error', message: "Please select a file before you upload"};
			   Data.toast(message_code);

			}
			else
			{

    		$http.post("backend/sqlprocesses.php?location=uploadedfilefolder&&filename=massDataForDean&&massDataUploadForPotfolio=yes&&potfolio="+the_potfolio, $scope.fd1, {withCredentials: true, headers: {'Content-Type': undefined },transformRequest: angular.identity })
			.success(function(data){
				if(data.exist != undefined ) 
				{
					$scope.unsavedData = data.exist;
					$scope.unsavedRecord = true;
				}
				if(data.ok != undefined ) 
				{
					$scope.savedData = data.ok;
					$scope.okRecord = true;
				}
				
				if(data.notok != undefined ) 
				{
					$scope.savedData = data.notok;
					$scope.unsavedRecord = true;
				}
				
				if(data.status == "Connection problems. Consult the administrator" ) 
				{
					 message_code = {status: 'error', message: data.status};
			   		Data.toast(message_code);
				}
				if(data.status == "Possible file attack problem. Consult the administrator" ) 
				{
					 message_code = {status: 'error', message: data.status};
			   		Data.toast(message_code);
				}
				alert(JSON.stringify($scope.savedData));

				})
			.error(function(errMes){
				
				});
			};
	
	function entitle(title)
	{
		part_one = title.charAt(0).big();
		part_two = title.substr(1);
		return part_one + part_two
	}			
	}
	
	
///////////////////////// end of bulk upload
	
	
	


});
myApp.controller("addHodCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.content_loaded = false;
	$rootScope.isMain = false;
	$scope.add_single = true;
	$scope.edit_single_HOD = false;
	$scope.add_multiple = false;
	$scope.edit_HOD = true;
	$scope.download_HOD_template = false;
	$scope.searchbox = "";
	$scope.updating_HOD = false;
	$scope.submittingHOD = false;
	$scope.staff_not_in_existence = false;
	$scope.create_staff = false;
	$scope.question_section = true;
	$scope.button_section = true;
	
	$scope.departments = [];
	$scope.item_data = {
						  faculty: '',
						  department: '',
						  surname: '',
						  pf_number: '',
						  firstname: '',
						  middlename: '',
						  title: ''
					  };
$scope.select_department = function(faculty){
	$http.post('backend/sqlprocesses.php?get_department=yes', {"name_of_faculty": faculty})
		.success(function(response) {
		$scope.loading_depts = false;
			if(response.status === "ok"){
				$scope.departments = response.data;
			}
		})
		.error(function(data) {
		});
	}

$scope.yes = function()
{
	$scope.create_staff = true; 
	$scope.question_section = false;
	$scope.button_section = false;	
}
$scope.no = function()
{
	$scope.staff_not_in_existence = false; 
}


$scope.HOD_affirmed = function(item_data)
{
	//alert(JSON.stringify(item_data));
//$scope.submittingHOD = true;
	$http.post('backend/sqlprocesses.php?HOD_affirmed=yes', item_data)
		.success(function(response) {
			if(response.status === "ok"){
				$scope.button_section = true;
				$scope.saveHOD(item_data);
				$scope.staff_not_in_existence = false;
			}else if(response.status === "not ok")
			{
				message_code = {
							  status: 'error',
							  message: 'Your information was not saved successfully therefore ' + item_data.title + " "+ item_data.surname + 
							  "has not been made HOD"
						  };
				Data.toast(message_code);

			}
		})
		.error(function(errorMessage){
			});
			
}	
$scope.HOD_declined = function(item_data)
{
	$scope.staff_not_in_existence = false;
}
 	
$scope.saveHOD = function (item_data) 
{
	$scope.submittingHOD = true;
	$http.post('backend/sqlprocesses.php?save_HOD=yes', item_data)
	.success(function(response) {
	$scope.submitting = false;
	if(response.status === "ok"){
	message_code = {
					  status: 'success',
					  message: 'Your information was saved successfully and ' + item_data.title + " "+ item_data.surname + " "+ item_data.firstname + " has been made a HOD"
				  };
	Data.toast(message_code);
				
	}else if(response.status === "not ok")
	{
		message_code = {
						  status: 'error',
						  message: 'Your information was not saved successfully'
						};
			Data.toast(message_code);
			}else if(response.status === "exist")
			{
				message_code = {
							  status: 'error',
							 message: 'Your information was not saved successfully because ' + item_data.title + " "+ item_data.surname +  " "+ item_data.firstname +" is already a HOD" 
						  };
			Data.toast(message_code);
			}else if(response.status === 'not a staff')
			{
				$scope.staff_not_in_existence = true;
				
			}
		})
		.error(function(data) {

		});
		
		$scope.submittingHOD = false;
    };
	

	$scope.saveEditHOD = function(details_object)
	{
	$scope.updating_HOD = true;
		$http.post('backend/sqlprocesses.php?update_HOD=yes', details_object)
		.success(function(response) {
			if(response.status === "ok"){
				message_code = {
							  status: 'success',
							  message: 'You information was updated successfully'
						  };
			Data.toast(message_code);
				
			}else if(response.status === "not ok")
			{
				message_code = {
							  status: 'error',
							  message: 'You information was not updated successfully'
						  };
			Data.toast(message_code);
			}
		})
		.error(function(data) {

		});
	$scope.updating_HOD = false;
	}
	

	$scope.openAddSingleDv = function(){
	$scope.add_single = true;
	$scope.edit_single_HOD = false;
	$scope.add_multiple = false;
	$scope.download_HOD_template = false;
	};
	
	$scope.openAddMultipleDv = function(){
		$scope.add_single = false;
		$scope.edit_single_HOD = false;
		$scope.add_multiple = true;
		$scope.download_HOD_template = false;
	};
	
	$scope.openRemoveSingleDv = function(){
		$scope.add_single = false;
		$scope.edit_single_HOD = true;
		$scope.add_multiple = false;
		$scope.download_HOD_template = false;

	};
	
	$scope.openDownloadTemaplateDv = function(){
		$scope.add_single = false;
		$scope.edit_single_HOD = false;
		$scope.add_multiple = false;
		$scope.download_HOD_template = true;

	};


	$http.get('backend/sqlprocesses.php?get_faculties=yes')
	.success(function(response) {
		if(response.status === "ok"){
			$scope.faculties = response.data;
			$rootScope.content_loaded = true;
		}
	})
	.error(function(data) {
		$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			
		$rootScope.content_loaded = true;
	});
	
	$http.post('backend/sqlprocesses.php?get_titles=yes')
		.success(function(response) {
		$scope.loading_depts = false;
			if(response.status === "ok"){
				$scope.titles = response.data;
				$rootScope.content_loaded = true;
			}
		})
		.error(function(data) {
		 $scope.loading_depts = false;
			$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			$rootScope.content_loaded = true;
		});
		
	$scope.searchbutton = function(searchbox){
	$http.post('backend/sqlprocesses.php?get_HOD=yes',{"pf_number":searchbox})
	.success(function(response) {
		if(response.status === "ok"){
			$scope.staff = [];
			$scope.staff.push(response.data);
			$rootScope.content_loaded = true;
		}else
		{
			$scope.staff = [];
		}
	})
	.error(function(data) {
		$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			
		$rootScope.content_loaded = true;
	});
	}
	
	$scope.edit_details = function(details_object)
	{
		//$scope.edit_HOD_details = true;
		$scope.edit_HOD_information = true;
		$scope.edit_data = angular.copy(details_object);
		
	}
	$scope.cancel_details = function()
	{
		//$scope.edit_HOD_details = true;
		$scope.edit_HOD_information = false;
		
	}
	$scope.delete_HOD_title = function(details_object)
	{
		if(confirm("Are you sure to delete the HOD title from " + details_object.title + " " + details_object.surname + " " + details_object.othernames))
		 {
			$http.post('backend/sqlprocesses.php?delete_HOD_title=yes', details_object)
			.success(function(response) {
				if(response.status === "ok"){
				alert(details_object.title + " " + details_object.surname + " " + details_object.othernames + " has been removed from being HOD");
				$scope.staff = [];
				$scope.cancel_details();
				$scope.edit_data = angular.copy($scope.staff);	
				$scope.searchbox = "";
				}else if(response.status === "not ok")
				{
				alert(details_object.title + " " + details_object.surname + " " + details_object.othernames + " could not be removed from being HOD");	
				}
			})
			.error(function(data) {
	
			});
		 }else
		 {
		    ////////////////// do nothing
		 }
		
	}
///////////////////////// begining of bulk upload
	$scope.pickupthefileformassupload = function(files) {
		var fd1 = new FormData();
		fd1.append("file", files[0]);
		fd1.append("name", "massDataForHOD");
		fd1.append("savefilename", "massDataForHOD");
		$scope.fd1 = fd1;
		$scope.isSelected = true;
		  };
	$scope.unsavedData = [];
	$scope.savedData = [];
	$scope.notOk = [];
	$scope.unsavedRecord = false;
	$scope.okRecord = false;
	$scope.notOkRecord = false;
	
	
	$scope.uploadMassHOD = function()
	{
			if( $scope.fd1===undefined)
			{
			   message_code = {status: 'error', message: "Please select a file before you upload"};
			   Data.toast(message_code);

			}
			else
			{

    		$http.post("backend/sqlprocesses.php?location=uploadedfilefolder&&filename=massDataForHOD&&massDataUploadForHOD=yes", $scope.fd1, {withCredentials: true, headers: {'Content-Type': undefined },transformRequest: angular.identity })
			.success(function(data){
				if(data.exist != undefined ) 
				{
					$scope.unsavedData = data.exist;
					$scope.unsavedRecord = true;
				}
				if(data.ok != undefined ) 
				{
					$scope.savedData = data.ok;
					$scope.okRecord = true;
				}
				
				if(data.notok != undefined ) 
				{
					$scope.savedData = data.notok;
					$scope.unsavedRecord = true;
				}
				
				if(data.status == "Connection problems. Consult the administrator" ) 
				{
					 message_code = {status: 'error', message: data.status};
			   		Data.toast(message_code);
				}
				if(data.status == "Possible file attack problem. Consult the administrator" ) 
				{
					 message_code = {status: 'error', message: data.status};
			   		Data.toast(message_code);
				}
				alert(JSON.stringify($scope.savedData));

				})
			.error(function(errMes){
				
				});
			};
	}

});
myApp.controller("addLecturerCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.content_loaded = true;
	$rootScope.isMain = false;
	$scope.add_multiple = true;
});
myApp.controller("addFacultyOfficerCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.content_loaded = true;
	$rootScope.isMain = false;
	$scope.add_multiple = true;
});
myApp.controller("initialiseNewSessionCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.content_loaded = true;
	$rootScope.isMain = false;
	$scope.add_multiple = true;
});
myApp.controller("addDepartmentCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.content_loaded = false;
	$rootScope.isMain = false;
	$scope.add_single = true;
	$scope.edit_single_Department = false;
	$scope.add_multiple = false;
	$scope.edit_Department = true;
	$scope.download_Department_template = false;
	$scope.searchbox = "";
	$scope.updating_Department = false;
	$scope.submittingDepartment = false;
	$scope.staff_not_in_existence = false;
	$scope.create_staff = false;
	$scope.question_section = true;
	$scope.button_section = true;
	
	$scope.departments = [];
	$scope.item_data = {
						  faculty: '',
						  department_name: '',
						  
					  };
$scope.select_department = function(faculty){
	$http.post('backend/sqlprocesses.php?get_department=yes', {"name_of_faculty": faculty})
		.success(function(response) {
		$scope.loading_depts = false;
			if(response.status === "ok"){
				$scope.departments = response.data;
			}
		})
		.error(function(data) {
		});
	}

$scope.yes = function()
{
	$scope.create_staff = true; 
	$scope.question_section = false;
	$scope.button_section = false;	
}
$scope.no = function()
{
	$scope.staff_not_in_existence = false; 
}


$scope.Department_affirmed = function(item_data)
{
	//alert(JSON.stringify(item_data));
//$scope.submittingDepartment = true;
	$http.post('backend/sqlprocesses.php?Department_affirmed=yes', item_data)
		.success(function(response) {
			if(response.status === "ok"){
				$scope.button_section = true;
				$scope.saveDepartment(item_data);
				$scope.staff_not_in_existence = false;
			}else if(response.status === "not ok")
			{
				message_code = {
							  status: 'error',
							  message: 'Your information was not saved successfully therefore ' + item_data.title + " "+ item_data.surname + 
							  "has not been made Department"
						  };
				Data.toast(message_code);

			}
		})
		.error(function(errorMessage){
			});
			
}	
$scope.Department_declined = function(item_data)
{
	$scope.staff_not_in_existence = false;
}
 	
$scope.saveDepartment = function (item_data) 
{
	//alert(JSON.stringify(item_data));
	$scope.submittingDepartment = true;
	$http.post('backend/sqlprocesses.php?save_Department=yes', item_data)
	.success(function(response) {
	$scope.submitting = false;
	if(response.status === "ok"){
	message_code = {
					  status: 'success',
					  message: 'Your information was saved successfully and ' + item_data.department_name + " "+ " is now a department"
				  };
	Data.toast(message_code);
				
	}else if(response.status === "not ok")
	{
		message_code = {
						  status: 'error',
						  message: 'Your information was not saved successfully'
						};
			Data.toast(message_code);
	  }else if(response.status === "exist")
	  {
		  message_code = {
						status: 'error',
					   message: 'Your information was not saved successfully because ' + item_data.department_name + " "+ " is already a department" 
					};
	  Data.toast(message_code);
	  }
		})
		.error(function(data) {

		});
		
		$scope.submittingDepartment = false;
    };
	

	$scope.saveEditDepartment = function(details_object)
	{
	$scope.updating_Department = true;
		$http.post('backend/sqlprocesses.php?update_Department=yes', details_object)
		.success(function(response) {
			if(response.status === "ok"){
				message_code = {
							  status: 'success',
							  message: 'You information was updated successfully'
						  };
			Data.toast(message_code);
				
			}else if(response.status === "not ok")
			{
				message_code = {
							  status: 'error',
							  message: 'You information was not updated successfully'
						  };
			Data.toast(message_code);
			}
		})
		.error(function(data) {

		});
	$scope.updating_Department = false;
	}
	

	$scope.openAddSingleDv = function(){
	$scope.add_single = true;
	$scope.edit_single_Department = false;
	$scope.add_multiple = false;
	$scope.download_Department_template = false;
	};
	
	$scope.openAddMultipleDv = function(){
		$scope.add_single = false;
		$scope.edit_single_Department = false;
		$scope.add_multiple = true;
		$scope.download_Department_template = false;
	};
	
	$scope.openRemoveSingleDv = function(){
		$scope.add_single = false;
		$scope.edit_single_Department = true;
		$scope.add_multiple = false;
		$scope.download_Department_template = false;

	};
	
	$scope.openDownloadTemaplateDv = function(){
		$scope.add_single = false;
		$scope.edit_single_Department = false;
		$scope.add_multiple = false;
		$scope.download_Department_template = true;

	};


	$http.get('backend/sqlprocesses.php?get_faculties=yes')
	.success(function(response) {
		if(response.status === "ok"){
			$scope.faculties = response.data;
			$rootScope.content_loaded = true;
		}
	})
	.error(function(data) {
		$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			
		$rootScope.content_loaded = true;
	})
	
	///////////////////// check where the error is coming frfom
	$http.get('backend/sqlprocesses.php?get_the_faculties=yes')
	.success(function(response) {
		if(response.status === "ok"){
			$scope.faculties1 = response.data;
			$rootScope.content_loaded = true;
		}
	})
	.error(function(data) {
		$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			
		$rootScope.content_loaded = true;
	})


	$http.post('backend/sqlprocesses.php?get_titles=yes')
		.success(function(response) {
		$scope.loading_depts = false;
			if(response.status === "ok"){
				$scope.titles = response.data;
				$rootScope.content_loaded = true;
			}
		})
		.error(function(data) {
		 $scope.loading_depts = false;
			$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			$rootScope.content_loaded = true;
		});
		
	$scope.searchbutton = function(searchbox){
	$http.post('backend/sqlprocesses.php?get_edit_department=yes',{"department_id":searchbox})
	.success(function(response) {
		if(response.status === "ok"){
			$scope.searched_department = [];
			$scope.searched_department.push(response.data);
			$rootScope.content_loaded = true;
		}else
		{
			$scope.searched_department = [];
		}
	})
	.error(function(data) {
		$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			
		$rootScope.content_loaded = true;
	});
	}
	
	$scope.edit_details = function(details_object)
	{
		//$scope.edit_Department_details = true;
		$scope.edit_Department_information = true;
		$scope.edit_data = angular.copy(details_object);
		
	}
	
	$scope.cancel_details = function()
	{
		//$scope.edit_Department_details = true;
		$scope.edit_Department_information = false;
		
	}
	
	$scope.delete_Department_title = function(details_object)
	{
		if(confirm("Are you sure to delete the Department title from " + details_object.title ))
		 {
			$http.post('backend/sqlprocesses.php?delete_Department_title=yes', details_object)
			.success(function(response) {
				if(response.status === "ok"){
				alert(details_object.title  + " has been removed from being Department");
				$scope.searched_department = [];
				$scope.cancel_details();
				$scope.edit_data = angular.copy($scope.searched_department);	
				//$scope.searchbox = "";
				}else if(response.status === "not ok")
				{
				alert(details_object.title + " " + details_object.surname + " " + details_object.othernames + " could not be removed from being Department");	
				}
			})
			.error(function(data) {
	
			});
		 }else
		 {
		    ////////////////// do nothing
		 }
		
	}
///////////////////////// begining of bulk upload
	$scope.pickupthefileformassupload = function(files) {
		var fd1 = new FormData();
		fd1.append("file", files[0]);
		fd1.append("name", "massDataForDepartment");
		fd1.append("savefilename", "massDataForDepartment");
		$scope.fd1 = fd1;
		$scope.isSelected = true;
		  };
	$scope.unsavedData = [];
	$scope.savedData = [];
	$scope.notOk = [];
	$scope.unsavedRecord = false;
	$scope.okRecord = false;
	$scope.notOkRecord = false;
	
	
	$scope.uploadMassDepartment = function()
	{
			if( $scope.fd1===undefined)
			{
			   message_code = {status: 'error', message: "Please select a file before you upload"};
			   Data.toast(message_code);

			}
			else
			{

    		$http.post("backend/sqlprocesses.php?location=uploadedfilefolder&&filename=massDataForDepartment&&massDataUploadForDepartment=yes", $scope.fd1, {withCredentials: true, headers: {'Content-Type': undefined },transformRequest: angular.identity })
			.success(function(data){
				if(data.exist != undefined ) 
				{
					$scope.unsavedData = data.exist;
					$scope.unsavedRecord = true;
				}
				if(data.ok != undefined ) 
				{
					$scope.savedData = data.ok;
					$scope.okRecord = true;
				}
				
				if(data.notok != undefined ) 
				{
					$scope.savedData = data.notok;
					$scope.unsavedRecord = true;
				}
				
				if(data.status == "Connection problems. Consult the administrator" ) 
				{
					 message_code = {status: 'error', message: data.status};
			   		Data.toast(message_code);
				}
				if(data.status == "Possible file attack problem. Consult the administrator" ) 
				{
					 message_code = {status: 'error', message: data.status};
			   		Data.toast(message_code);
				}
				//alert(JSON.stringify($scope.savedData));

				})
			.error(function(errMes){
				
				});
			};
	}

});
myApp.controller("addFacultyCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.content_loaded = false;
	$rootScope.isMain = false;
	$scope.add_single = true;
	$scope.edit_single_Faculty = false;
	$scope.add_multiple = false;
	$scope.edit_Faculty = true;
	$scope.download_Faculty_template = false;
	$scope.searchbox = "";
	$scope.updating_Faculty = false;
	$scope.submittingFaculty = false;
	$scope.staff_not_in_existence = false;
	$scope.create_staff = false;
	$scope.question_section = true;
	$scope.button_section = true;
	
	$scope.Facultys = [];
	$scope.item_data = {
						  faculty: '',
						  Faculty_name: '',
						  
					  };
$scope.select_Faculty = function(faculty){
	$http.post('backend/sqlprocesses.php?get_Faculty=yes', {"name_of_faculty": faculty})
		.success(function(response) {
		$scope.loading_depts = false;
			if(response.status === "ok"){
				$scope.Facultys = response.data;
			}
		})
		.error(function(data) {
		});
	}


$scope.update_others = function()
{
	$scope.searched_Faculty = [];
	$scope.edit_Faculty_information = false;
}


$scope.yes = function()
{
	$scope.create_staff = true; 
	$scope.question_section = false;
	$scope.button_section = false;	
}
$scope.no = function()
{
	$scope.staff_not_in_existence = false; 
}


$scope.Faculty_affirmed = function(item_data)
{
	//alert(JSON.stringify(item_data));
//$scope.submittingFaculty = true;
	$http.post('backend/sqlprocesses.php?Faculty_affirmed=yes', item_data)
		.success(function(response) {
			if(response.status === "ok"){
				$scope.button_section = true;
				$scope.saveFaculty(item_data);
				$scope.staff_not_in_existence = false;
			}else if(response.status === "not ok")
			{
				message_code = {
							  status: 'error',
							  message: 'Your information was not saved successfully therefore ' + item_data.title + " "+ item_data.surname + 
							  "has not been made Faculty"
						  };
				Data.toast(message_code);

			}
		})
		.error(function(errorMessage){
			});
			
}
	
$scope.Faculty_declined = function(item_data)
{
	$scope.staff_not_in_existence = false;
}
 	
$scope.saveFaculty = function (item_data) 
{
	//alert(JSON.stringify(item_data));
	$scope.submittingFaculty = true;
	$http.post('backend/sqlprocesses.php?save_Faculty=yes', item_data)
	.success(function(response) {
	$scope.submitting = false;
	if(response.status === "ok"){
	$scope.fac.push({id:response.data, faculty: item_data.Faculty_name});
	message_code = {
					  status: 'success',
					  message: 'Your information was saved successfully and ' + item_data.Faculty_name + " "+ " is now a Faculty"
				  };
	Data.toast(message_code);
				
	}else if(response.status === "not ok")
	{
		message_code = {
						  status: 'error',
						  message: 'Your information was not saved successfully'
						};
			Data.toast(message_code);
	  }else if(response.status === "exist")
	  {
		  message_code = {
						status: 'error',
					   message: 'Your information was not saved successfully because ' + item_data.Faculty_name + " "+ " is already a Faculty" 
					};
	  Data.toast(message_code);
	  }
		})
		.error(function(data) {

		});
		
		$scope.submittingFaculty = false;
    };
	
	////////////////////////// create a function to update faculties in teh view
	function fn_update_faculties(object1, object2)
	{
		for (i=0; i<object1.length; i++)
		{
			if(object1[i].id == object2.id)
			{
				object1[i].faculty = object2.faculty;
				break;
			}
		}

	}
	//////////////////////// end of create update of faculties in teh view

	$scope.saveEditFaculty = function(details_object)
	{
		$scope.updating_Faculty = true;
		$scope.edit_Faculty_information = true;

		$http.post('backend/sqlprocesses.php?update_Faculty=yes', details_object)
		.success(function(response) {
			if(response.status === "ok"){
				fn_update_faculties ($scope.fac, details_object);
				$scope.hasClickedEdit = false;
				$scope.edit_Faculty_information = false;
				message_code = {
							  status: 'success',
							  message: 'You information was updated successfully'
						  };
			Data.toast(message_code);
				
			}else if(response.status === "not ok")
			{
				message_code = {
							  status: 'error',
							  message: 'You information was not updated successfully'
						  };
			Data.toast(message_code);
			}
		})
		.error(function(data) {

		});
	$scope.updating_Faculty = false;
	}
	

	$scope.openAddSingleDv = function(){
	$scope.add_single = true;
	$scope.edit_single_Faculty = false;
	$scope.add_multiple = false;
	$scope.download_Faculty_template = false;
	};
	
	$scope.openAddMultipleDv = function(){
		$scope.add_single = false;
		$scope.edit_single_Faculty = false;
		$scope.add_multiple = true;
		$scope.download_Faculty_template = false;
	};
	
	$scope.openRemoveSingleDv = function(){
		$scope.add_single = false;
		$scope.edit_single_Faculty = true;
		$scope.add_multiple = false;
		$scope.download_Faculty_template = false;

	};
	
	$scope.openDownloadTemaplateDv = function(){
		$scope.add_single = false;
		$scope.edit_single_Faculty = false;
		$scope.add_multiple = false;
		$scope.download_Faculty_template = true;

	};


	$http.get('backend/sqlprocesses.php?get_faculties=yes')
	.success(function(response) {
		if(response.status === "ok"){
			$scope.faculties = response.data;
			$rootScope.content_loaded = true;
		}
	})
	.error(function(data) {
		$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			
		$rootScope.content_loaded = true;
	});
	
	
	$http.get('backend/sqlprocesses.php?get_the_faculties=yes')
	.success(function(response) {
		if(response.status === "ok"){
			$scope.fac = response.data;
			$rootScope.content_loaded = true;
		}
	})
	.error(function(data) {
		$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			
		$rootScope.content_loaded = true;
	});

////////////////////// get lecturer's titles
	$http.post('backend/sqlprocesses.php?get_titles=yes')
		.success(function(response) {
		$scope.loading_depts = false;
			if(response.status === "ok"){
				$scope.titles = response.data;
				$rootScope.content_loaded = true;
			}
		})
		.error(function(data) {
		 $scope.loading_depts = false;
			$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			$rootScope.content_loaded = true;
		});
//////////////// end of get lecturers' title

////////////////////////////// function search 
$scope.searchbutton = function(searchbox)
{
	 $scope.hasClickedEdit = true;
	$http.post('backend/sqlprocesses.php?get_edit_Faculty=yes',{"faculty":searchbox})
	.success(function(response) {
		//alert(JSON.stringify(response));
		if(response.status === "ok"){
			$scope.searched_Faculty = [];
			$scope.searched_Faculty.push(response.data);
			$rootScope.content_loaded = true;
		}else
		{
			$scope.searched_Faculty = [];
		}
	})
	.error(function(data) {
		$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			
		$rootScope.content_loaded = true;
	});
} 
///////////////////////////////// end of search button



/////////////////////////// edit details of faculty	
$scope.edit_details = function(details_object)
	{
		$scope.edit_Faculty_information = true;
		$scope.edit_data = angular.copy(details_object);
		
	}
/////////////////// end of edit faculty details

	
///////////////////////////////////////// remove the deleted item from the view
function remove_deleted_item( the_id, the_object)
{
	for(i=0; i< the_object.length; i++)
	{
		if ( the_object[i].id == the_id)
		{
			the_object.splice(i, 1);
			break;
		}
		
	}
	
}
///////////////////////////////////////// end of remove the deleted item from the view


///////////////////////////////// cancel edit details operation
$scope.cancel_details = function()
	{
		//$scope.edit_Faculty_details = true;
		$scope.edit_Faculty_information = false;
		
	}
/////////////////////////////// end of cancel edit details operation


/////////////////////// delete faculty function	
$scope.delete_Faculty_title = function(details_object)
	{
		if(confirm("Are you sure to delete the faculty named -  " + details_object.faculty ))
		 {
			$http.post('backend/sqlprocesses.php?delete_Faculty_title=yes', details_object)
			.success(function(response) {
				if(response.status === "ok"){
				$scope.update_others();
				remove_deleted_item(details_object.id, $scope.fac);
				$scope.hasClickedEdit = false;
				$scope.item_data.faculty = "";
				alert(details_object.faculty  + " has been removed from being Faculty");
				$scope.searched_Faculty = [];
				$scope.cancel_details();
				$scope.edit_data = angular.copy($scope.searched_Faculty);	
				//$scope.searchbox = "";
				}else if(response.status === "not ok")
				{
				alert(details_object.faculty + " could not be removed from being Faculty");	
				}
			})
			.error(function(data) {
	
			});
		 }else
		 {
		    ////////////////// do nothing
		 }
		
	}
	
////////////////////////// end of delete faculty function








///////////////////////// begining of bulk upload

/////////////////////// declaration and initialization of some variables for the bulk upload operation
	$scope.unsavedData = [];
	$scope.savedData = [];
	$scope.notOk = [];
	$scope.unsavedRecord = false;
	$scope.okRecord = false;
	$scope.notOkRecord = false;
/////////////////////// end of declaration and initialization of some variables for the bulk upload operation
	
/////////////////// pick the file selected in the file input
	$scope.pickupthefileformassupload = function(files) 
	{
		var fd1 = new FormData();
		fd1.append("file", files[0]);
		fd1.append("name", "massDataForFaculty");
		fd1.append("savefilename", "massDataForFaculty");
		$scope.fd1 = fd1;
		$scope.isSelected = true;
	}
////////////////////////////////////////// end of pick the the first file from the file input
	
	

///////////////////////// begining of the mass upload operation	
	$scope.uploadMassFaculty = function()
	{
			if( $scope.fd1===undefined)
			{
			   message_code = {status: 'error', message: "Please select a file before you upload"};
			   Data.toast(message_code);

			}
			else
			{

    		$http.post("backend/sqlprocesses.php?location=uploadedfilefolder&&filename=massDataForFaculty&&massDataUploadForFaculty=yes", 
			  $scope.fd1, {withCredentials: true, headers: {'Content-Type': undefined },transformRequest: angular.identity })
			.success(function(data){
				if(data.exist != undefined ) 
				{
					$scope.unsavedData = data.exist;
					$scope.unsavedRecord = true;
				}
				if(data.ok != undefined ) 
				{
					$scope.savedData = data.ok;
					$scope.okRecord = true;
				}
				
				if(data.notok != undefined ) 
				{
					$scope.savedData = data.notok;
					$scope.unsavedRecord = true;
				}
				
				if(data.status == "Connection problems. Consult the administrator" ) 
				{
					 message_code = {status: 'error', message: data.status};
			   		Data.toast(message_code);
				}
				if(data.status == "Possible file attack problem. Consult the administrator" ) 
				{
					 message_code = {status: 'error', message: data.status};
			   		Data.toast(message_code);
				}

				})
			.error(function(errMes){
				
				});
			};
	}
//////////////////////////// end of the mass upload operation
});
