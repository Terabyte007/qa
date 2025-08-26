myApp.controller("adminDashCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $timeout){
	$rootScope.content_loaded = false;
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	n = $rootScope.menu_contents.length;
	$rootScope.account_menu = $rootScope.menu_contents[n-1];
	$rootScope.menu_contents.splice(n-1,1);
	//alert(JSON.stringify($rootScope.account_menu.url));
	$rootScope.pf_number_img = "photo/"+$scope.bio_data.pf_number + ".jpg";
	$rootScope.portfolio = $localStorage.user_details.type;
	
});

myApp.controller("hodDashCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $timeout){
	$rootScope.content_loaded = false;
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	$scope.user_details = $localStorage.user_details;
	n = $rootScope.menu_contents.length;
	$rootScope.account_menu = $rootScope.menu_contents[n-1];
	$rootScope.menu_contents.splice(n-1,1);
	$scope.show_more = false
	$rootScope.pf_number_img = "photo/"+$scope.bio_data.pf_number + ".jpg";
	$rootScope.portfolio = $localStorage.user_details.type;
	
});

myApp.controller("deanDashCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $timeout){
	$rootScope.content_loaded = false;
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	n = $rootScope.menu_contents.length;
	$rootScope.account_menu = $rootScope.menu_contents[n-1];
	$rootScope.menu_contents.splice(n-1,1);
	$rootScope.pf_number_img = "photo/"+$scope.bio_data.pf_number + ".jpg";
	$rootScope.portfolio = $localStorage.user_details.type;
});
myApp.controller("lecturerDashCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $timeout){
	$rootScope.content_loaded = false;
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	n = $rootScope.menu_contents.length;
	$rootScope.account_menu = $rootScope.menu_contents[n-1];
	$rootScope.menu_contents.splice(n-1,1);
	$rootScope.pf_number_img = "photo/"+$scope.bio_data.pf_number + ".jpg";
	$rootScope.portfolio = $localStorage.user_details.type;
});

myApp.controller("faculty-officerDashCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $timeout){
	$rootScope.content_loaded = false;
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	n = $rootScope.menu_contents.length;
	$rootScope.account_menu = $rootScope.menu_contents[n-1];
	$rootScope.menu_contents.splice(n-1,1);
	$rootScope.pf_number_img = "photo/"+$scope.bio_data.pf_number + ".jpg";
	$rootScope.portfolio = $localStorage.user_details.type;
});

myApp.controller("course_registrationCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $timeout){
	$rootScope.content_loaded = false;
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	n = $rootScope.menu_contents.length;
	$rootScope.account_menu = $rootScope.menu_contents[n-1];
	$rootScope.menu_contents.splice(n-1,1);

	$rootScope.content_loaded = true;
	$rootScope.isMain = false;
	$scope.add_single = true;
	$scope.add_multiple = false;
	$scope.loading_depts = false;
	$levels = [];
	
	
	
	$scope.openAddSingleDv = function(){
		$scope.add_single = true;
		$scope.add_multiple = false;
	};
	
	$scope.openAddMultipleDv = function(){
		$scope.add_single = false;
		$scope.add_multiple = true;
	};
	
	$scope.openAddMultipleDv(); ////////////////initialization of multiple division section
	
	$scope.pickupthefileformassupload = function(files) {
		var fd1 = new FormData();
		fd1.append("file", files[0]);
		fd1.append("name", "massDataForPayment");
		fd1.append("savefilename", "massDataForPayment");
		$scope.fd1 = fd1;
		$scope.isSelected = true;
		  };
	$scope.unsavedData = []; 
	$scope.savedData = [];
	$scope.notOk = [];
	$scope.existRecord = false;
	$scope.okRecord = false;
	$scope.notOkRecord = false;
	
	
	$scope.uploadMassCourses = function()
	{
			if( $scope.fd1===undefined)
			{
			   message_code = {status: 'error', message: "Please select a file before you upload"};
			   Data.toast(message_code);

			}
			else
			{

    		$http.post("backend/sqlprocesses.php?location=uploadedfilefolder&&filename=massDataForRegisteredCourses&&massDataUploadForRegisteredCourses=yes", $scope.fd1, {withCredentials: true, headers: {'Content-Type': undefined },transformRequest: angular.identity })
			.success(function(data){
				if(data.exist != undefined ) 
				{
					$scope.existData = data.exist;
					$scope.existRecord = true;
				}
				if(data.ok != undefined ) 
				{
					$scope.savedData = data.ok;
					$scope.okRecord = true;
				}
				
				if(data.notok != undefined ) 
				{
					$scope.unsavedData = data.notok;
					$scope.notOkRecord = true;
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
	
	
    $scope.saveItem = function (item_data) {
	swapped = false;
	if(item_data.course_unit == -1)
	{
		temporary_holder = item_data.course_unit;
		item_data.course_unit = item_data.others;
		swapped = true;
	}
	$scope.submitting = true;
	$http.post('backend/sqlprocesses.php?save_course=yes', item_data)
		.success(function(response) {
			$scope.submitting = false;
			if(response.status === "ok"){
				message_code = {
							  status: 'success',
							  message: 'You information was saved successfully'
						  };
			Data.toast(message_code);
				
			}else if(response.status === "not ok")
			{
				message_code = {
							  status: 'error',
							  message: 'You information was not saved successfully'
						  };
			Data.toast(message_code);
			}else if(response.status === "exist")
			{
				message_code = {
							  status: 'error',
							  message: 'You information was not saved successfully because the course already exists'
						  };
			Data.toast(message_code);
			}
		})
		.error(function(data) {
			$scope.submitting = false;

		});
		
		if (swapped == true) item_data.course_unit = temporary_holder;

    };
	
/////////////////////// javascript scope functions
function populate_levels(peak_level)
{
	id = 1; 
	i = 100;
	levels = [];
	while (i <=peak_level)
	{
		levels.push({"id": id,"title": i});
		id++;
		i += 100;
		//alert(i)
	}
	return levels;
	
}
});


myApp.controller("course_registration_templateCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $timeout){
	$rootScope.content_loaded = false;
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	$rootScope.content_loaded = true;
	$scope.add_multiple = true;
	$scope.loading_depts = false;
	$levels = [];
	
	
	
	$scope.openAddSingleDv = function(){
		$scope.add_single = true;
		$scope.add_multiple = false;
	};
	
	$scope.openAddMultipleDv = function(){
		$scope.add_single = false;
		$scope.add_multiple = true;
	};
	
	$scope.openAddMultipleDv(); ////////////////initialization of multiple division section
	
	$scope.pickupthefileformassupload = function(files) {
		var fd1 = new FormData();
		fd1.append("file", files[0]);
		fd1.append("name", "massDataForPayment");
		fd1.append("savefilename", "massDataForPayment");
		$scope.fd1 = fd1;
		$scope.isSelected = true;
		  };
	$scope.unsavedData = [];
	$scope.savedData = [];
	$scope.notOk = [];
	$scope.unsavedRecord = false;
	$scope.okRecord = false;
	$scope.notOkRecord = false;
	
	
	$scope.uploadMassCourses = function()
	{
			if( $scope.fd1===undefined)
			{
			   message_code = {status: 'error', message: "Please select a file before you upload"};
			   Data.toast(message_code);

			}
			else
			{

    		$http.post("backend/sqlprocesses.php?location=uploadedfilefolder&&filename=massDataForCourses&&massDataUploadForCourses=yes", $scope.fd1, {withCredentials: true, headers: {'Content-Type': undefined },transformRequest: angular.identity })
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
	
	
    $scope.saveItem = function (item_data) {
	swapped = false;
	if(item_data.course_unit == -1)
	{
		temporary_holder = item_data.course_unit;
		item_data.course_unit = item_data.others;
		swapped = true;
	}
	$scope.submitting = true;
	$http.post('backend/sqlprocesses.php?save_course=yes', item_data)
		.success(function(response) {
			$scope.submitting = false;
			if(response.status === "ok"){
				message_code = {
							  status: 'success',
							  message: 'You information was saved successfully'
						  };
			Data.toast(message_code);
				
			}else if(response.status === "not ok")
			{
				message_code = {
							  status: 'error',
							  message: 'You information was not saved successfully'
						  };
			Data.toast(message_code);
			}else if(response.status === "exist")
			{
				message_code = {
							  status: 'error',
							  message: 'You information was not saved successfully because the course already exists'
						  };
			Data.toast(message_code);
			}
		})
		.error(function(data) {
			$scope.submitting = false;

		});
		
		if (swapped == true) item_data.course_unit = temporary_holder;

    };
	
/////////////////////// javascript scope functions
function populate_levels(peak_level)
{
	id = 1; 
	i = 100;
	levels = [];
	while (i <=peak_level)
	{
		levels.push({"id": id,"title": i});
		id++;
		i += 100;
		//alert(i)
	}
	return levels;
	
}
	
});



myApp.controller("new-sessionCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $timeout){
	$rootScope.content_loaded = false;
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	$scope.sessions = [];
	$scope.my_ranges = [1,2,3,4,5,4,3,2,1];
	$scope.selected_option = "";
	$scope.new_session = "Select Session";
	$http.get("backend/sqlprocesses.php?get_sessions=yes")
		.success(function(response) {
			if(response.status == "ok")
			{
				$scope.sessions = response.data;
				$scope.current_session = get_current_session($scope.sessions);
				//alert(JSON.stringify($scope.sessions));
				$scope.new_session = $scope.current_session.session;
				
			}else
			{
			
			}
			$rootScope.content_loaded = true;

		})
		.error(function(data) {
			$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			$rootScope.content_loaded = true;

		}

		);
$scope.commit_session = function()
{
	//$scope.current_session = get_current_session($scope.sessions);
	$http.post("backend/sqlprocesses.php?cummit_current_sessions=yes", {"session":$scope.selected_option, "is_current":1})
		.success(function(response) {
			if(response.status == "ok")
			{			
			message_code = {status: 'success', message: "Successful!"};
			Data.toast(message_code);

				
			}else
			{
			message_code = {status: 'success', message: "Not Successful! Try again"};
			Data.toast(message_code);

			}

		})
		.error(function(data) {
			$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			$rootScope.content_loaded = true;

		}

		); 
	
}



$scope.new_session_creation_counter = 0;
$scope.undo_create_session = function()
{
	$scope.sessions.splice($scope.sessions.length-1,1);
	first_element = $scope.sessions[0].session;
	listArray = first_element.split("/");
	last_part = parseInt(listArray[0])-1;
	new_session_string = last_part + "/" +  listArray[0];
	$scope.sessions.push({});
	k = 9;
	for (i=1; i<=$scope.sessions.length-1; i++)
	{
		$scope.sessions[k-i] = $scope.sessions[k-i-1];
	}

	$scope.sessions[0] ={"session":new_session_string,"is_current":0};
	//alert(JSON.stringify($scope.sessions));
	for (i=0; i<$scope.sessions.length-1; i++)
	{
		$scope.sessions[i].is_current = 0;
	}
	$scope.sessions[4].is_current = 1;
	$scope.new_session_creation_counter--;	
	
}
$scope.create_session = function()
{
	$scope.sessions.splice(0,1);
	last_element = $scope.sessions[$scope.sessions.length-1].session;
	//alert(last_element);
	listArray = last_element.split("/");
	last_part = parseInt(listArray[1])+1;
	new_session_string = listArray[1] + "/"+ last_part;
	$scope.sessions.push({"session":new_session_string,"is_current":0});
	for (i=0; i<$scope.sessions.length-1; i++)
	{
		$scope.sessions[i].is_current = 0;
	}
	$scope.sessions[4].is_current = 1;
	$scope.new_session_creation_counter++;

	//alert(new_session_string);
	
}
function get_current_session( the_session )
{
	current_session = "";
	n = the_session.length;
	for ( i =0; i< n; i++)
	{
		if(the_session[i].is_current == 1)
		{
				current_session = the_session[i];
		break	
		}
		
	}
	
return current_session;
}	
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

myApp.controller("adminApplicantCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$scope.entry_mode = $routeParams['type'];
	
	
	serviceBase = "backend/";
	
	if($rootScope.applicants && $rootScope.entry_mode == $scope.entry_mode){
		$scope.applicants = $rootScope.applicants;
		$scope.currentPage = 1; //current page
		$scope.entryLimit = 20; //max no of items to display in a page
		$scope.filteredItems = $scope.applicants.length; //Initially for no filter
		$scope.totalItems = $scope.applicants.length;
	}
	else{
		$rootScope.entry_mode = $scope.entry_mode;
		
		$http.get(serviceBase+"admin.php?action=get_applicants&&entry_mode="+$rootScope.entry_mode)
		.success(function(data) {
			//alert(data.message);
			if(data.status === "success"){
				$scope.applicants = data.applicants;
				$scope.currentPage = 1;
				$scope.entryLimit = 20;
				$scope.filteredItems = $scope.applicants.length;
				$scope.totalItems = $scope.applicants.length;
				
				$rootScope.applicants = data.applicants;
			}
			else{
				$scope.applicants = data.applicants;
				$scope.currentPage = 1;
				$scope.entryLimit = 20;
				$scope.filteredItems = $scope.applicants.length;
				$scope.totalItems = $scope.applicants.length;
				
				$rootScope.applicants = data.applicants;
			}
		})
		.error(function(data) {
			$scope.hasError = "A network connection problem error occured while signing in. Please try again";
		});
	}
	$scope.setPage = function(pageNo) {
		$scope.currentPage = pageNo;
	};
	
	$scope.filter = function() {
		$timeout(function() {
			//alert('filtered');
			$scope.filteredItems = $scope.filtered.length;
		}, 10);
	};
	
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	
});

myApp.controller("adminApplicantDataCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $modal){
	$scope.jambRegNo = $routeParams['jambNo'];	
	serviceBase = "backend/";
	
	if($rootScope.jambRegNo && $scope.jambRegNo == $rootScope.jambRegNo){
		$scope.applicant = $rootScope.applicantData;
		$scope.applicant_auth_data = $rootScope.applicantAuthData;
		
		if(getArrayLength($scope.applicant_auth_data) > 0){
			$rootScope.reset_password = true;
		}
		else{
			$rootScope.reset_password = false;
		}
		
		$scope.applicant_mode = $scope.applicant.applicantMode;
		$scope.payment_info = applicantPaymentInfo($scope.applicant.jambScore, $scope.applicant.paymentStatus);
		$scope.eligibility_info = applicantEligibilityInfo($scope.applicant.jambScore);
		
		if($scope.applicant.applicantMode == "utme" || $scope.applicant.applicantMode == "UTME"){
			$scope.utme_applicant = true;
		}
		else{
			$scope.utme_applicant = false;
		}
	}
	else{
		$rootScope.jambRegNo = $scope.jambRegNo;
	
		$http.get(serviceBase+"admin.php?action=get_applicant_data&&jambRegNo="+$scope.jambRegNo)
		.success(function(data) {
			if(data.status === "success"){
				$scope.applicant = data.applicant_data;
				$scope.applicant_auth_data = data.applicant_auth_data;
				$rootScope.applicantData = $scope.applicant;
				$rootScope.applicantAuthData = $scope.applicant_auth_data;
				
				if(getArrayLength($scope.applicant_auth_data) > 0){
					$rootScope.reset_password = true;
				}
				else{
					$rootScope.reset_password = false;
				}
				
				$scope.applicant_mode = $scope.applicant.applicantMode;
				$scope.payment_info = applicantPaymentInfo($scope.applicant.jambScore, $scope.applicant.paymentStatus);
				$scope.eligibility_info = applicantEligibilityInfo($scope.applicant.jambScore);
				
				if($scope.applicant.applicantMode == "utme" || $scope.applicant.applicantMode == "UTME"){
					$scope.utme_applicant = true;
				}
				else{
					$scope.utme_applicant = false;
				}
			}
		})
		.error(function(data) {
			$rootScope.confirm_error_message = "A network connection problem error occured while signing in. Please try again";
			$timeout(function(){
			  $rootScope.confirm_error_message = "";
			}, 1000);
		});
	}
	
	$scope.modalDisplay = "";
	$scope.animationsEnabled = true;
	
	$rootScope.basic_info_dv = true;
	$rootScope.biodata_dv = false;
	$rootScope.post_utme_result_dv = false;
	$rootScope.payment_info_dv = false;
	$rootScope.eligibility_info_dv = false;
	$rootScope.create_auth_dv = false;
	$rootScope.reset_pass_dv = false;
	$rootScope.update_sample_questions_dv = false;
	
    $scope.openBasicInfoDv = function(){
		//$rootScope.isMain = false;
		$rootScope.basic_info_dv = true;
		$rootScope.biodata_dv = false;
		$rootScope.post_utme_result_dv = false;
		$rootScope.payment_info_dv = false;
		$rootScope.eligibility_info_dv = false;
		$rootScope.create_auth_dv = false;
		$rootScope.reset_pass_dv = false;
		$rootScope.delete_auth_dv = false;
		$rootScope.update_sample_questions_dv = false;
	};
	
    $scope.openPostUTMEResultDv = function(){
		//$rootScope.isMain = false;
		$rootScope.basic_info_dv = false;
		$rootScope.biodata_dv = false;
		$rootScope.post_utme_result_dv = true;
		$rootScope.payment_info_dv = false;
		$rootScope.eligibility_info_dv = false;
		$rootScope.create_auth_dv = false;
		$rootScope.reset_pass_dv = false;
		$rootScope.delete_auth_dv = false;
		$rootScope.update_sample_questions_dv = false;
	};
	
    $scope.openPaymentInfoDv = function(){
		//$rootScope.isMain = false;
		$rootScope.basic_info_dv = false;
		$rootScope.biodata_dv = false;
		$rootScope.post_utme_result_dv = false;
		$rootScope.payment_info_dv = true;
		$rootScope.eligibility_info_dv = false;
		$rootScope.create_auth_dv = false;
		$rootScope.reset_pass_dv = false;
		$rootScope.delete_auth_dv = false;
		$rootScope.update_sample_questions_dv = false;
	};
	
    $scope.openEligibiltyInfoDv = function(){
		//$rootScope.isMain = false;
		$rootScope.basic_info_dv = false;
		$rootScope.biodata_dv = false;
		$rootScope.post_utme_result_dv = false;
		$rootScope.payment_info_dv = false;
		$rootScope.eligibility_info_dv = true;
		$rootScope.create_auth_dv = false;
		$rootScope.reset_pass_dv = false;
		$rootScope.delete_auth_dv = false;
		$rootScope.update_sample_questions_dv = false;
	};
	
    $scope.openCreateAuthDv = function(){
		//$rootScope.isMain = false;
		$rootScope.basic_info_dv = false;
		$rootScope.biodata_dv = false;
		$rootScope.post_utme_result_dv = false;
		$rootScope.payment_info_dv = false;
		$rootScope.eligibility_info_dv = false;
		$rootScope.create_auth_dv = true;
		$rootScope.reset_pass_dv = false;
		$rootScope.delete_auth_dv = false;
		$rootScope.update_sample_questions_dv = false;
	};
	
    $scope.openResetPassDv = function(){
		$rootScope.basic_info_dv = false;
		$rootScope.biodata_dv = false;
		$rootScope.post_utme_result_dv = false;
		$rootScope.payment_info_dv = false;
		$rootScope.eligibility_info_dv = false;
		$rootScope.create_auth_dv = false;
		$rootScope.reset_pass_dv = true;
		$rootScope.delete_auth_dv = false;
		$rootScope.update_sample_questions_dv = false;
	};
	
    $scope.openDeleteAuthDv = function(){
		$rootScope.basic_info_dv = false;
		$rootScope.biodata_dv = false;
		$rootScope.post_utme_result_dv = false;
		$rootScope.payment_info_dv = false;
		$rootScope.eligibility_info_dv = false;
		$rootScope.create_auth_dv = false;
		$rootScope.reset_pass_dv = false;
		$rootScope.delete_auth_dv = true;
		$rootScope.update_sample_questions_dv = false;
	};
	
    $scope.updateSampleQuestionsDv = function(){
		$rootScope.basic_info_dv = false;
		$rootScope.biodata_dv = false;
		$rootScope.post_utme_result_dv = false;
		$rootScope.payment_info_dv = false;
		$rootScope.eligibility_info_dv = false;
		$rootScope.create_auth_dv = false;
		$rootScope.reset_pass_dv = false;
		$rootScope.delete_auth_dv = false;
		$rootScope.update_sample_questions_dv = true;
	};
	
    $scope.applicantBioDataDv = function(){
		$rootScope.basic_info_dv = false;
		$rootScope.biodata_dv = true;
		$rootScope.post_utme_result_dv = false;
		$rootScope.payment_info_dv = false;
		$rootScope.eligibility_info_dv = false;
		$rootScope.create_auth_dv = false;
		$rootScope.reset_pass_dv = false;
		$rootScope.delete_auth_dv = false;
		$rootScope.update_sample_questions_dv = false;
	};
	
	$scope.openApplicantPaymentInfo = function (size) {
		$scope.jambScore = $scope.applicant.jambScore;
		$scope.paymentStatus = $scope.applicant.paymentStatus;
		
		if($scope.paymentStatus == "NULL" || $scope.paymentStatus == "unpaid" || $scope.paymentStatus === null){
			if($scope.jambScore < 200){
				$scope.bodyInfo = '<i class="icon-remove-sign modal_icn red"></i> <p>This applicant is not eligible for payment.</p>';
			}
			else{
				$scope.bodyInfo = '<i class="icon-remove-sign modal_icn red"></i> <p>This applicant has not paid for the Post-UTME Examination.</p>';
			}
		}
		else{
			$scope.bodyInfo = '<i class="icon-ok-sign modal_icn green"></i> <p>This applicant has paid for the Post-UTME Examination.</p>';
		}
		
		headerInfo = "Applicant Payment Information";
		bodyInfo = $scope.bodyInfo;
		
		$scope.open(headerInfo, bodyInfo, size);
	};
	
	$scope.openApplicantEligibilityInfo = function (size) {
		$scope.jambScore = $scope.applicant.jambScore;
		
		if($scope.jambScore < 200){
			$scope.bodyInfo = '<i class="icon-remove-sign modal_icn red"></i> <p>This applicant is not eligible for the Post-UTME Examination.</p>';
		}
		else{
			$scope.bodyInfo = '<i class="icon-ok-sign modal_icn green"></i> <p>This applicant is eligible for the Post-UTME Examination.</p>';
		}
		
		headerInfo = "Applicant Eligibility Information";
		bodyInfo = $scope.bodyInfo;
		
		$scope.open(headerInfo, bodyInfo, size);
	};
	
	$scope.resetPassword = function () {
		$rootScope.form_values = "";
		$scope.bodyInfo = '<p>Are you sure you want to reset this applicant\'s password? <br/> <b>Note:</b> This is not reversible.</p>';
		
		headerInfo = "Reset Password";
		bodyInfo = $scope.bodyInfo;
		
		$scope.openResetConfirmationDialog(headerInfo, bodyInfo, "");
	};
	
	$scope.createAuthentication = function () {
		$rootScope.form_values = "";
		$scope.bodyInfo = '<p>Are you sure you want to create authentication for this applicant? <br/> <b>Note:</b> Once created this appplicant will be able to log into the admission portal.</p>';
		
		headerInfo = "Create Autentication Data";
		bodyInfo = $scope.bodyInfo;
		
		$scope.openCreateConfirmationDialog(headerInfo, bodyInfo, "");
	};
	
	$scope.deleteAuthentication = function () {
		$rootScope.form_values = "";
		$scope.bodyInfo = '<p>Are you sure you want to delete this applicant\'s authentication data? <br/> <b>Note:</b> This is not reversible and appplicant would be unable to log into the admission portal subsequently.</p>';
		
		headerInfo = "Delete Autentication Data";
		bodyInfo = $scope.bodyInfo;
		
		$scope.openDeleteConfirmationDialog(headerInfo, bodyInfo, "");
	};
	
	$scope.addSampleQuestionSubjects = function (no_subjects) {
		$rootScope.form_values = no_subjects;
		$scope.bodyInfo = '<p>Are you sure you want to add this number of subjects to those that can be downloaded by this applicant? <br/> <b>Note:</b> This is not reversible.</p>';
		
		headerInfo = "Add Sample Questions Subject";
		bodyInfo = $scope.bodyInfo;
		//alert(no_subjects);
		$scope.openQuestionSubjectsConfirmationDialog(headerInfo, bodyInfo, no_subjects, no_subjects);
	};
	
	$scope.open = function (headerInfo, bodyInfo, size) {
		$rootScope.modalHeader = headerInfo;
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'myModalContent.html',
			controller: 'ModalInstanceCtrl',
			size: size,
			resolve: {
				modalDisplay: function () {
					return bodyInfo;
				}
			}
		});
	};
	
	$scope.openCreateConfirmationDialog = function (headerInfo, bodyInfo) {
		$rootScope.modalHeader = headerInfo;
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'dialogContent.html',
			controller: 'CreateDialogInstanceCtrl',
			size: 'sm',
			resolve: {
				modalDisplay: function () {
					return bodyInfo;
				}
			}
		});
	};
	
	$scope.openDeleteConfirmationDialog = function (headerInfo, bodyInfo) {
		$rootScope.modalHeader = headerInfo;
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'dialogContent.html',
			controller: 'DeleteDialogInstanceCtrl',
			size: 'sm',
			resolve: {
				modalDisplay: function () {
					return bodyInfo;
				}
			}
		});
	};
	
	$scope.openResetConfirmationDialog = function (headerInfo, bodyInfo) {
		$rootScope.modalHeader = headerInfo;
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'dialogContent.html',
			controller: 'ResetDialogInstanceCtrl',
			size: 'sm',
			resolve: {
				modalDisplay: function () {
					return bodyInfo;
				}
			}
		});
	};
	
	$scope.openQuestionSubjectsConfirmationDialog = function (headerInfo, bodyInfo) {
		$rootScope.modalHeader = headerInfo;
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'dialogContent.html',
			controller: 'AddQuestionSubjectsDialogInstanceCtrl',
			size: 'sm',
			resolve: {
				modalDisplay: function () {
					return bodyInfo;
				}
			}
		});
	};
});

myApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, modalDisplay) {
	$scope.modalDisplay = modalDisplay;
	
	$scope.ok = function () {
	  $modalInstance.close();
	};
});

myApp.controller('CreateDialogInstanceCtrl', function ($rootScope, $scope, $modalInstance, modalDisplay, $http, Data, $localStorage, $modal) {
	$scope.modalDisplay = modalDisplay;
	
	$scope.ok = function (form_values) {
		//alert('Create Authentication for applicant: '+$rootScope.jambRegNo);
		$scope.jambRegNo = $rootScope.jambRegNo;
			
		serviceBase = "backend/";
		
		$http.get(serviceBase+"admin.php?action=create_applicant_auth&&jambRegNo="+$scope.jambRegNo)
		.success(function(data){
			//alert(data.message);
			if(data.status === "success"){
				//$scope.applicant = data.applicant_data;
				//$rootScope.applicantData = $scope.applicant;
				
				$scope.applicant_auth_data = data.applicant_auth_data;
				$rootScope.applicantAuthData = $scope.applicant_auth_data;
				
				if(getArrayLength($scope.applicant_auth_data) > 0){
					$rootScope.reset_password = true;
				}
				else{
					$rootScope.reset_password = false;
				}
				
				$rootScope.basic_info_dv = true;
				$rootScope.biodata_dv = false;
				$rootScope.post_utme_result_dv = false;
				$rootScope.payment_info_dv = false;
				$rootScope.eligibility_info_dv = false;
				$rootScope.create_auth_dv = false;
				$rootScope.reset_pass_dv = false;
				$rootScope.delete_auth_dv = false;
				$rootScope.update_sample_questions_dv = false;
				/**/
				
				$rootScope.confirm_success_message = data.message;
				$timeout(function(){
				  $rootScope.confirm_success_message = "";
				}, 1000);
			}
			else{
				
			}
			
			$modalInstance.close();
		})
		.error(function(data) {
			$rootScope.confirm_error_message = "A network connection problem error occured while signing in. Please try again";
			$timeout(function(){
			  $rootScope.confirm_error_message = "";
			}, 1000);
			
			$modalInstance.close();
		});
		
		//$modalInstance.close();
	};
	
	$scope.cancel = function () {
	  $modalInstance.close();
	};
});

myApp.controller('ResetDialogInstanceCtrl', function ($rootScope, $scope, $modalInstance, modalDisplay, $http, Data, $localStorage, $modal, $timeout) {
	$scope.modalDisplay = modalDisplay;
	
	$scope.ok = function (form_values) {
		$scope.jambRegNo = $rootScope.jambRegNo;
			
		serviceBase = "backend/";
		
		$http.get(serviceBase+"admin.php?action=reset_applicant_auth&&jambRegNo="+$scope.jambRegNo)
		.success(function(data){
			//alert(data.message);
			if(data.status === "success"){
				$scope.applicant_auth_data = data.applicant_auth_data;
				$rootScope.applicantAuthData = $scope.applicant_auth_data;
				
				$rootScope.confirm_success_message = data.message;
				$timeout(function(){
				  $rootScope.confirm_success_message = "";
				}, 1000);
			}
			else{
				$rootScope.confirm_error_message = data.message;
				$timeout(function(){
				  $rootScope.confirm_error_message = "";
				}, 1000);
			}
			
			$modalInstance.close();
		})
		.error(function(data) {
			$rootScope.confirm_error_message = "A network connection problem error occured while signing in. Please try again";
			$timeout(function(){
			  $rootScope.confirm_error_message = "";
			}, 1000);
			
			$modalInstance.close();
		});
	};
	
	$scope.cancel = function () {
	  $modalInstance.close();
	};
});

myApp.controller('DeleteDialogInstanceCtrl', function ($rootScope, $scope, $modalInstance, modalDisplay, $http, Data, $localStorage, $modal) {
	$scope.modalDisplay = modalDisplay;
	
	$scope.ok = function (form_values) {
		$scope.jambRegNo = $rootScope.jambRegNo;
			
		serviceBase = "backend/";
		
		$http.get(serviceBase+"admin.php?action=delete_applicant_auth&&jambRegNo="+$scope.jambRegNo)
		.success(function(data){
			//alert(data.message);
			if(data.status === "success"){
				//$scope.applicant = data.applicant_data;
				//$rootScope.applicantData = $scope.applicant;
				
				$scope.applicant_auth_data = data.applicant_auth_data;
				$rootScope.applicantAuthData = $scope.applicant_auth_data;
				
				if(getArrayLength($scope.applicant_auth_data) > 0){
					$rootScope.reset_password = true;
				}
				else{
					$rootScope.reset_password = false;
				}/**/
				
				$rootScope.basic_info_dv = true;
				$rootScope.biodata_dv = false;
				$rootScope.post_utme_result_dv = false;
				$rootScope.payment_info_dv = false;
				$rootScope.eligibility_info_dv = false;
				$rootScope.create_auth_dv = false;
				$rootScope.reset_pass_dv = false;
				$rootScope.delete_auth_dv = false;
				$rootScope.update_sample_questions_dv = false;
				/**/
				
				$rootScope.confirm_success_message = data.message;
				$timeout(function(){
				  $rootScope.confirm_success_message = "";
				}, 1000);
			}
			else{
				
			}
			
			$modalInstance.close();
		})
		.error(function(data) {
			$rootScope.confirm_error_message = "A network connection problem error occured while signing in. Please try again";
			$timeout(function(){
			  $rootScope.confirm_error_message = "";
			}, 1000);
			
			$modalInstance.close();
		});
	};
	
	$scope.cancel = function () {
	  $modalInstance.close();
	};
});

myApp.controller('AddQuestionSubjectsDialogInstanceCtrl', function ($rootScope, $scope, $modalInstance, modalDisplay, $http, Data, $localStorage, $modal) {
	$scope.modalDisplay = modalDisplay;
	
	$scope.ok = function (no_subjects) {
		//$rootScope.jambRegNo
		$scope.no_subjects = no_subjects;
		$scope.jambRegNo = $rootScope.jambRegNo;
			
		serviceBase = "backend/";
		
		$http.get(serviceBase+"admin.php?action=add_additional_applicant_question_subjects&&jambRegNo="+$scope.jambRegNo+"&&no_of_subjects="+$scope.no_subjects)
		.success(function(data){
			//alert(data.message);
			if(data.status === "success"){
				$modalInstance.close();
				
				$rootScope.confirm_success_message = data.message;
				$timeout(function(){
				  $rootScope.confirm_success_message = "";
				}, 1000);
			}
			else{
				
			}
			
			$modalInstance.close();
		})
		.error(function(data) {
			$rootScope.confirm_error_message = "A network connection problem error occured while signing in. Please try again";
			$timeout(function(){
			  $rootScope.confirm_error_message = "";
			}, 1000);
			
			$modalInstance.close();
		});
	};
	
	$scope.cancel = function () {
	  $modalInstance.close();
	};
});

function getArrayLength(arr) {
    if(arr.length !== undefined){
		arr_length = arr.length;
	}
	else{
		arr_length = Object.keys(arr).length;
	}
	
    return arr_length;
};

function applicantPaymentInfo(jambScore, paymentStatus) {
	if(paymentStatus == "NULL" || paymentStatus == "unpaid" || paymentStatus === null){
		if(jambScore < 200){
			bodyInfo = '<i class="icon-remove-sign modal_icn red"></i> <p>This applicant is not eligible for payment.</p>';
		}
		else{
			bodyInfo = '<i class="icon-remove-sign modal_icn red"></i> <p>This applicant has not paid for the Post-UTME Examination.</p>';
		}
	}
	else{
		bodyInfo = '<i class="icon-ok-sign modal_icn green"></i> <p>This applicant has paid for the Post-UTME Examination.</p>';
	}
	
	return bodyInfo;
};

function applicantEligibilityInfo(jambScore) {
	if(jambScore < 200){
		bodyInfo = '<i class="icon-remove-sign modal_icn red"></i> <p>This applicant is not eligible for the Post-UTME Examination.</p>';
	}
	else{
		bodyInfo = '<i class="icon-ok-sign modal_icn green"></i> <p>This applicant is eligible for the Post-UTME Examination.</p>';
	}
	
	return bodyInfo;
};

myApp.controller("AccountManagementCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $modal){
	$rootScope.content_loaded = true;
	$scope.admins = [];
	$http.post('backend/sqlprocesses.php?load_admin=yes')
		.success(function(response) {
			if(response.status == 'ok')	$scope.admins = response.data;
		})
		.error(function(data) {

		});
	$scope.bio_data = $localStorage.bio_data;
	$scope.user_details = $localStorage.user_details;
	//alert(JSON.stringify($scope.user_details));
	$scope.username = $scope.user_details.username;
	$scope.user_type = $scope.user_details.type;
	if($scope.user_type == "admin")
	{
		$scope.isMajor = true;
		$scope.isMedium = true;
		$scope.user_type = $scope.user_type;		
		//$scope.add_admin = true;
		$scope.view_admins = true;
		$scope.my_details = false;
		$scope.change_password = false;
		$scope.search_user = false;
		$scope.user_type_flag = false;

		$scope.closeAllDivs = function(){
			$scope.my_details = false;
			$scope.change_password = false;
		}
	}else if($scope.user_type == "superadmin")
	{
		$scope.isMajor = true;
		$scope.isMedium = true;
		$scope.user_type = $scope.user_type;		
		//$scope.add_admin = true;
		$scope.view_admins = true;
		$scope.my_details = false;
		$scope.change_password = false;
		$scope.search_user = false;
		$scope.closeAllDivs = function(){
			$scope.my_details = false;
			$scope.change_password = false;
		}
	}
	else if($scope.user_type == "dean")
	{
		$scope.isMajor = true;
		$scope.isMedium = false;
		$scope.user_type = $scope.user_type;
		//$scope.add_admin = true;
		$scope.view_admins = false;
		$scope.my_details = true;
		$scope.change_password = false;
		$scope.search_user = false;
		$scope.closeAllDivs = function(){
			$scope.my_details = false;
			$scope.change_password = false;
		}
	}else if($scope.user_type == "hod")
	{
		$scope.isMajor = true;
		$scope.isMedium = false;
		$scope.user_type = $scope.user_type;
		//$scope.add_admin = true;
		$scope.view_admins = false;
		$scope.my_details = true;
		$scope.change_password = false;
		$scope.search_user = false;
		$scope.closeAllDivs = function(){
			$scope.my_details = false;
			$scope.change_password = false;
		}
	}
	else if($scope.user_type == "course_adviser" || $scope.user_type == "lecturer" )
	{
		$scope.isMajor = false;
		$scope.isMedium = false;
		//$scope.type = $scope.user_type;
		//$scope.add_admin = false;
		$scope.view_admins = false;
		$scope.my_details = true;
		$scope.change_password = false;
		$scope.search_user = false;
		//$scope.admins = [];
		
		$scope.closeAllDivs = function(){
			//$scope.add_admin = false;
			$scope.view_admins = false;
			$scope.my_details = false;
			$scope.change_password = false;
			$scope.search_user = false;
		}
	}
	//$scope.admins = $scope.load_admins();
	$scope.closeAllDivs = function(){
			//$scope.add_admin = false;
			$scope.view_admins = false;
			$scope.my_details = false;
			$scope.change_password = false;
			$scope.search_user = false;
		}
		
    $scope.openAddAdminDv = function(){
		$scope.closeAllDivs();
		$scope.add_admin = true;
	};
	
    $scope.openViewAdminsDv = function(){
		$scope.closeAllDivs();
		$scope.view_admins = true;
	};
	
    $scope.openViewDetailsDv = function(){
		$scope.closeAllDivs();
		$scope.my_details = true;
	};
	
    $scope.openChangePasswordDv = function(){
		$scope.closeAllDivs();
		$scope.change_password = true;
	};
	
	
	$scope.openSearchUserDv = function(){
		$scope.closeAllDivs();
		$scope.search_user = true;
	};
	$scope.other_users = [];
	$scope.currentPage = 1;
	$scope.entryLimit = 20;
	$scope.filteredItems = $scope.other_users.length;
	$scope.totalItems = $scope.other_users.length;
	$scope.flag = [false,false,false,false]; 
	
	$scope.get_users = function(user_type_sent, flag_number)
	{
		$scope.user_type_sent = user_type_sent;
		$scope.user_type_flag = true;
		for(i=0; i<4; i++)
		{
			$scope.flag[i] = false;
		}
		$scope.flag[flag_number] = true;
		$http.post('backend/sqlprocesses.php?load_other_users=yes', {the_user_type : user_type_sent, department: $scope.bio_data.dept_id, faculty: $scope.bio_data.fac_id, sender: $scope.user_details.type })
		.success(function(response) {
		if(response.status == 'ok')	
		{
				$scope.other_users = response.data;
				$scope.currentPage = 1;
				$scope.entryLimit = 20;
				$scope.filteredItems = $scope.other_users.length;
				$scope.totalItems = $scope.other_users.length; 
		}else
		{
				$scope.other_users = [];
				$scope.currentPage = 1;
				$scope.entryLimit = 20;
				$scope.filteredItems = $scope.other_users.length;
				$scope.totalItems = $scope.other_users.length;
			
		}
		$scope.flag[flag_number] = false;
		})
		.error(function(data) {

		});

		
		
	}
	$scope.change_pass = {"new_password":"", "confirm_password":"" };
	$scope.changePassword = function()
	{
		if($scope.change_pass.new_password == $scope.change_pass.confirm_password )
		{
		$http.post('backend/sqlprocesses.php?changePassword=yes', {"pf_number":$scope.bio_data.pf_number, "new_password": $scope.change_pass.new_password})
		.success(function(response) {
		if(response.status == 'ok')	
		{
			message_code = {
							  status: 'success',
							  message: 'Your password has been changed successfully'
						  };
			Data.toast(message_code);
		}else
		{
			message_code = {
							  status: 'error',
							  message: 'Your password has notg been changed. Try again'
						  };
			Data.toast(message_code);
			
		}
		})
		.error(function(data) {

		});	
		}else
		{
			
			message_code = {
							  status: 'error',
							  message: 'Your new password does not watch the confirmation. Try again'
						  };
			Data.toast(message_code);		
		}
		
	}

	/*$scope.load_admins = function()
	{

		the_admins = [];
		$http.post('backend/sqlprocesses.php?load_admin=yes')
		.success(function(response) {
			if(response.status == 'ok')	the_admin = response.data;

		})
		.error(function(data) {

		});

		return the_admin;
	}*/
	
	
	
	
	////////////////////// update filtered array after deletion
	$scope.update_filter = function(username  )
	{
		n = $scope.other_users.length;
		for (i=0; i< n; i++)
		{
			if($scope.other_users[i].username  == username)
			{
				$scope.other_users.splice(i,1);
				break;
			}
		}
	}
	///////////////////// end of update fviltereed array deletion
	
	//////////////////////////////////////// reset of user account
	$scope.reset_user = function(details_object)
	{
		if(confirm("Are you sure to reset the user " + details_object.surname + "  " 
		+ details_object.othernames + " - " + details_object.username +" account"))
		 {
			$http.post('backend/sqlprocesses.php?reset_user=yes', details_object)
			.success(function(response) {
				if(response.status === "ok"){
				alert(details_object.surname + "  " +  details_object.othernames + " - " + details_object.username + "'s account has been reset");
				//$scope.update_filter (details_object.username);
				}else if(response.status === "not ok")
				{
				alert(details_object.surname + "  " +  details_object.othernames + " - " + details_object.username + "'s account has not been reset. Try again");	
				}
			})
			.error(function(data) {
	
			});
		 }else
		 {
		    ////////////////// do nothing
		 }
		
	}
	
	
	
	/////////////////////////////////////// end of resett of user account
	
	
	
	/////////////////////// deletion of user
	$scope.delete_user = function(details_object)
	{
		if(confirm("Are you sure to delete the user " + details_object.surname + "  " +
		   details_object.othernames + " - " + details_object.username))
		 {
			$http.post('backend/sqlprocesses.php?delete_user=yes', details_object)
			.success(function(response) {
				if(response.status === "ok"){
				alert(details_object.surname + "  " +  details_object.othernames + " - " + details_object.username + " has been deleted");
				$scope.update_filter (details_object.username);
				}else if(response.status === "not ok")
				{
				alert(details_object.surname + "  " +  details_object.othernames + " - " + details_object.username + " was not deleted successfully");	
				}
			})
			.error(function(data) {
	
			});
		 }else
		 {
		    ////////////////// do nothing
		 }
		
	}
	////////////////////////// end of deletion of user
});
	
	
myApp.controller("AssignCourseCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $timeout){
	$rootScope.content_loaded = false;
	$scope.bio_data = $localStorage.bio_data;
	$scope.user_details = $localStorage.user_details;

	////////////////////////// initialisation of the divs
	$scope.the_divs = [true, false, false, false, false];
	$scope.department = "";
	$scope.faculty = "";
	$scope.loading_depts = false;
	$scope.loading_lecturers = false;
	$scope.loading_courses = false;


/////////////////////////////////////////////////// data for course assignment
$scope.item_data1 = {
	"faculty":"",
	"department":"",
	"lecturer":"",
	"course":"",
	
}

////////////////////////////////////////// end of the elimination stress



//////////////////////////////////////////////get the faculties
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
////////////////// end of get faculties

////////////////////////// change faculty //////////////////////////////////////////////////////
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

/////////////////////////// end of change faculty /////////////////////////////////////////////

//////////////////////////////// get departments
	$scope.loading_depts = true;
	$http.post('backend/sqlprocesses.php?get_department1=yes')
		.success(function(response) {
		$scope.loading_depts = false;
		  if(response.status === "ok"){
			  $scope.depts = response.data;
			  $rootScope.content_loaded = true;
		  }
		})
		.error(function(data) {
		 $scope.loading_depts = false;
			$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			$rootScope.content_loaded = true;
		});
	
/////////////////////////////// end of get departments

///////////////////////////////////////// remove the deleted item from the view
function remove_deleted_item( course_code, assigned_courses)
{
	for(i=0; i< assigned_courses.length; i++)
	{
		if ( assigned_courses[i]. course_code == course_code)
		{
			assigned_courses.splice(i, 1);
			break;
		}
		
	}
	
	
}
///////////////////////////////////////// end of remove the deleted item from the view


///////////////////// funtion get the new lecturer who is assigned a new course
function get_the_new_lecturer(lecturers, object2, assigned_courses, course_to_reassign)
{
	//lecturer_id = object1._id; //////////////// lecturer identifier in the list of lecturers;
	lecturer_id2 = object2.lecturer; //////////////// lecturer identifier in the reassignment list;
	surname = "";
	othernames = "";
	for(i=0; i< lecturers.length; i++)
	{
		if ( lecturers[i]._id == lecturer_id2)
		{
			surname = lecturers[i].surname;
			othernames = lecturers[i].othernames;
			break;
		}
		
	}
			//alert(JSON.stringify(assigned_courses))

	for(j=0; j< assigned_courses.length; j++)
	{
		if ( assigned_courses[j].course_code == course_to_reassign)
		{
			assigned_courses[j].surname = surname;
			assigned_courses[j].othernames = othernames;
			break;
		}
		
	}
	
	
	
}
////////////////////// end of the function
/////////////////////////// save assigned course .///////////////////////////////////////////
$scope.saveAssignedCourse = function(the_items)
{
	//the_items.course = the_items.course.course_code;
	 if($scope.reassign_flag) 
	 {
			if($scope.course_to_reassign !=	 the_items.course.course_code)	
			{
				Data.toast({status:"error", message: "Remember that you are reassigning  " + $scope.course_to_reassign });
			} 
	 }
	 //alert(JSON.stringify(the_items));
	$http.post('backend/sqlprocesses.php?save_course_assignment=yes', the_items )
		.success(function(response) {
		$scope.loading_depts = false;
		  if(response.status === "ok"){
			 
			 Data.toast({status:'success', message: response.message});
		  }else if(response.status === "not ok")
		  {
			   Data.toast({status:"error", message: response.message});
		  }else if (response.status == 'Reassigned')
		  {
			 /////////////////// this is for reassignment
			 if($scope.reassign_flag) 
			 {
				 $scope.reassign_flag = !$scope.reassign_flag;
				 get_the_new_lecturer($scope.lecturers, the_items,$scope.assigned_courses, $scope.course_to_reassign );
				 //alert(the_new_lecturer);
				 edidting_number = 1; /////////////////////////// go back to editing div
				 $scope.openDv(edidting_number);			 
				 
				}
			//////////////// end of this is for reassignment  
			   Data.toast({status:"success", message: response.message});
			  
		  }else if (response.status == 'Reassigned')
		  {
			  
			   Data.toast({status:"error", message: response.message});
			  
		  }
		})
		.error(function(data) {
			   Data.toast({status: "error", message: "There was a connection error"});
		}); 
		
	
	
}
/////////////////////////// end of saved assigned course ////////////////////////////////////

$scope.assigned_courses = [];
$scope.currentPage = 1;
$scope.entryLimit = 20;
$scope.filteredItems = $scope.assigned_courses.length;
$scope.totalItems = $scope.assigned_courses.length;
$scope.department1 = "";
$scope.depts = [];
$scope.records_fetched = false;
$scope.reassign_flag = false;
$scope.course_reassignment_lecturer_buffer = {};



///////////////////////////////////////////////// reassign a particular course
$scope.resassign_course = function( the_object )
{
	
	$scope.course_reassignment_lecturer_buffer = the_object;
	//alert(JSON.stringify($scope.course_reassignment_lecturer_buffer));
	individual_assignment = 0;
	$scope.reassign_flag = true;
	$scope.course_to_reassign = the_object.course_code; ////////// the course to reassign
	$scope.openDv(individual_assignment);
	
}
///////////////////////////////////////////////// end of reassign a particular course


///////////////////////////////////////////////// delete a particular course assignment
$scope.delete_assignment = function(the_object)
{
	//alert(JSON.stringify(the_object));
	if(confirm("Should I go ahead to DELETE  " + the_object.course_code + " assigned to " + the_object.surname + " " + the_object.othernames + " ?"))
		 { 
		  $http.post('backend/sqlprocesses.php?delete_course_assignment1=yes', the_object )
		  .success(function(response) {
		  $scope.loading_depts = false;
			if(response.status === "ok"){
			   Data.toast({status:'success', message: the_object.course_code + 
			      " assigned to " + the_object.surname + " " + the_object.othernames + " has been deleted successfully"});
				  //////////////// update the view
				  remove_deleted_item(the_object.course_code, $scope.assigned_courses);
			}else if(response.status === "not ok")
			{
				 Data.toast({status:"error", message:  the_object.course_code + 
				    " assigned to " + the_object.surname + " " + the_object.othernames + " was not deleted successfully. Try again"});
			}
			})
			.error(function(data) {
				   Data.toast({status: "error", message: "There was a connection error"});
			}); 
			
		 }else
		 {
			 			
		 }
	
}
///////////////////////////////////////////////// end of delete a particular course assignment
$scope.cod = function(dept)
{
$scope.records_fetched = true;
$http.post('backend/sqlprocesses.php?assigned_courses=yes', {"dept_id": dept })
.success(function(response) {
if(response.status == 'ok')	
{
  $scope.assigned_courses = response.data;
  $scope.currentPage = 1;
  $scope.entryLimit = 20;
  $scope.filteredItems = $scope.assigned_courses.length;
  $scope.totalItems = $scope.assigned_courses.length; 
  //alert(filtered.length);
}else
{
  $scope.assigned_courses = [];
  $scope.currentPage = 1;
  $scope.entryLimit = 20;
  $scope.filteredItems = $scope.assigned_courses.length;
  $scope.totalItems = $scope.assigned_courses.length;
}
})
.error(function(data) 
{

});

}
	
///////////////////////////// end of copied statements


/////////////////////////////// change of department
$scope.change_of_department = function(department)
	{
		//alert(department);
		//////////////////////////////// get lecturers
	$scope.loading_lecturers = true;
	$scope.loading_courses = true;
	$http.post('backend/sqlprocesses.php?get_lecturers=yes', {"department_id": department})
		.success(function(response) {
		$scope.loading_lecturers = false;
			if(response.status === "ok"){
				$scope.lecturers = response.data;
				//alert(JSON.stringify($scope.lecturers) );
				$rootScope.content_loaded = true;
			}
		})
		.error(function(data) {
		 $scope.loading_lecturers = false;
			$scope.hasError = "A network connection problem error occured while signing in. Please try again";
				
			$rootScope.content_loaded = true;
		});
	
/////////////////////////////// end of get lecturers


//////////////////////////////// get courses
	
	$http.post('backend/sqlprocesses.php?get_department_courses=yes', {"department_id": department})
		.success(function(response) {
		$scope.loading_courses = false;
			if(response.status === "ok"){
				$scope.courses = response.data;
				//alert(JSON.stringify($scope.courses));
				$rootScope.content_loaded = true;
			}
		})
		.error(function(data) {
		 $scope.loading_corses = false;
			$scope.hasError = "A network connection problem error occured while signing in. Please try again";
				
			$rootScope.content_loaded = true;
		});
	
/////////////////////////////// end of get courses
		
}

/////////////////////////////// end of change of department




/////////////////////////////// open the div
	$scope.openDv = function(div_number)
	{
		for(i=0; i< $scope.the_divs.length; i++)
		{
			$scope.the_divs[i] = false;
		}
		$scope.the_divs[div_number] = true;
	};


	$scope.loading_depts = false;
	$levels = [];
	
	$scope.pickupthefileformassupload = function(files) {
		var fd1 = new FormData();
		fd1.append("file", files[0]);
		fd1.append("name", "massDataForPayment");
		fd1.append("savefilename", "massDataForPayment");
		$scope.fd1 = fd1;
		$scope.isSelected = true;
	};
	
	$scope.unsavedData = [];
	$scope.savedData = [];
	$scope.notOk = [];
	$scope.unsavedRecord = false;
	$scope.okRecord = false;
	$scope.notOkRecord = false;
	
	
	$scope.uploadMassCourseAssignment = function()
	{
		//alert(JSON.stringify($scope.fd1));
			if( $scope.fd1===undefined)
			{
			   message_code = {status: 'error', message: "Please select a file before you upload"};
			   Data.toast(message_code);

			}
			else
			{
			 if ($scope.user_details.userType == 6)
				{
					identity = $scope.bio_data.dept_id;
					
				}else
				{
					
					identity = 'aA11Aa';
				}
    		$http.post("backend/sqlprocesses.php?location=uploadedfilefolder&&filename=massDataForCourseAssignment&&massDataUploadForCourseAssignment=yes&&the_identity="+identity, $scope.fd1, {withCredentials: true, headers: {'Content-Type': undefined },transformRequest: angular.identity })
			.success(function(data){
				if(data.Reassigned != undefined ) 
				{
					$scope.unsavedData = data.Reassigned;
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
				if(data.status == "false_identity" ) 
				{
					 message_code = {status: 'error', message: "You can only upload for your department"};
			   		Data.toast(message_code);
				}

				})
			.error(function(errMes){
				
				});
			};
				
	}
	
	
    $scope.saveItem = function (item_data) {
	swapped = false;
	if(item_data.course_unit == -1)
	{
		temporary_holder = item_data.course_unit;
		item_data.course_unit = item_data.others;
		swapped = true;
	}
	
	
	
	$scope.submitting = true;
	$http.post('backend/sqlprocesses.php?save_course=yes', item_data)
		.success(function(response) {
			$scope.submitting = false;
			if(response.status === "ok"){
				message_code = {
							  status: 'success',
							  message: 'You information was saved successfully'
						  };
			Data.toast(message_code);
				
			}else if(response.status === "not ok")
			{
				message_code = {
							  status: 'error',
							  message: 'You information was not saved successfully'
						  };
			Data.toast(message_code);
			}else if(response.status === "exist")
			{
				message_code = {
							  status: 'error',
							  message: 'You information was not saved successfully because the course already exists'
						  };
			Data.toast(message_code);
			}
		})
		.error(function(data) {
			$scope.submitting = false;

		});
		
		if (swapped == true) item_data.course_unit = temporary_holder;

    };
$scope.the_department = "";
$scope.cleared_status = false;
function cleared(the_department)
{
	$http.post('backend/sqlprocesses.php?delete_all_course_assignment=yes', {"dept_id": the_department} )
			.success(function(response) {
				if(response.status == "ok")
				{
					$scope.cleared_status = true;
				}else
				{
					$scope.cleared_status = false;
				}
			})
			.error(function(data) {
					$scope.cleared_status = false;
	
			});
}
////////////////////////////////////////// clear course assiegnmenet for new courses
$scope.clear_for_new = function(the_department)
{
		if(confirm("Should I go ahead to de-assign all courses previously assigned to the lecturers?"))
		 {
			$http.post('backend/sqlprocesses.php?delete_all_course_assignment=yes', {"dept_id": the_department} )
			.success(function(response) {
				if(response.status == "ok")
				{
					Data.toast({status:"success", message: "Course assignments have been cleared"});	
				}else
				{
					Data.toast({status:"error", message:"Unable to clear the table, please try again"});	
				}
			})
			.error(function(data) {
					$scope.cleared_status = false;
	
			});
			
			  /*if(cleared(the_department))
			  {
				  Data.toast({status:"success", message: "Course assignments have been cleared"});	
			  }
			  else
			  {
			  Data.toast({status:"error", message:"Unable to clear the table, please try again"});	
			  } */
		 }else
		 {
		    ////////////////// do nothing
		 }

	
	
	
}

$scope.filter = function() {
		$timeout(function() {
			//alert('filtered');
			$scope.filteredItems = $scope.filtered.length;
		}, 10);
	};
	
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    }; 
/////////////////////////////////////////////// end of clear course assignment for new ones	




//////////////////////////////// download of course asssignment template

$scope.downloadDone = false ;
$scope.item_for_download = {faculty: "",
							department:""};

$scope.generateExcelReport = function()
	{
	//alert($scope.item_for_download.department)
	$scope.downloadDone = true ;
	$http.post("backend/sqlprocesses.php?generateCourseAssignmentTemplate=yes", {"dept_id":$scope.item_for_download.department})
	.success(function(data) {
		$scope.downloadDone = false ;
		data = String(data);
		data = data.toString();
		data = data.trim();
		if(data == "true")
		{
		//name_of_department = get_name_of_department($scope.item_for_download.department);
		$scope.excel_filename = "course_assignment_template.xlsx"
		window.open('backend/saveFile.php?file_source='+$scope.excel_filename, '_self', '');
		}
		else
		{
			Data.toast({status:'error', message: "It is either course_assignment_template.xlsx is opened, thereby denying access or there was no record found!"});
		}
		
	})
	.error(function(errorMesage){
	
	});
	}
	



/////////////////////////////// end of course assignment template



////////////////////////////////////////////// eliminate the stress of choosing a faculty and department by HOD
if ($scope.user_details.userType == 6)
{
	$scope.item_data1.faculty = $scope.user_details.faculty;
	$scope.item_data1.department = $scope.bio_data.dept_id;
	
	//alert($scope.item_data1.department);
	$scope.change_of_department($scope.item_data1.department);
	$scope.cod($scope.item_data1.department);
	$scope.item_for_download.department = $scope.bio_data.dept_id;
	$scope.faculty  = $scope.user_details.faculty;
	$scope.the_department  = $scope.bio_data.dept_id;
	
}
/////////////////////////////////////////// eliminate the stress of choosing a faculty and department by HOD




});


