// carousal controller
myApp.controller("carouselCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	/*if($localStorage.user_details){
		$scope.user_details = $localStorage.user_details;
		alert($scope.user_details.username);
	}*/
	$rootScope.content_loaded = false;
	//$rootScope.isMain = true;
	$scope.login_dv = true;
	$scope.forgot_password = false;
	$scope.reset_pass_dv = false;
	
	var serviceBase = 'backend/';
	if($rootScope.secret_questions){
		$scope.login = {};
		$scope.signup = {};
		$scope.forgot_password = false;
		
		$rootScope.content_loaded = true;
	}
	else{
		$http.get(serviceBase+"authentication.php?action=secret_questions")
		.success(function(data) {
			if(data.status === "success"){
				secret_questions = data.questions;
				//$rootScope.secret_questions = secret_questions;
				
				//alert(secret_questions[0]['sq_id']);
				
				$rootScope.secret_questions = Array();
				for(var i = 0; i < secret_questions.length; i++) {
					$rootScope.secret_questions[i] = {
									id: secret_questions[i]['_id'],
									question: secret_questions[i]['question']
									}
				}
				
				//alert(JSON.stringify($rootScope.questions));
				
				$scope.login = {};
				$scope.signup = {};
				$scope.forgot_password = false;
			}
			
			$rootScope.content_loaded = true;
		})
		.error(function(data) {
			$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			
			$rootScope.content_loaded = true;
		});
	}
	
    $scope.activateLoginDv = function(){
		$scope.login_dv = true;
		$scope.forgot_password = false;
		$scope.reset_pass_dv = false;
	};
	
    $scope.activateResetPasswordDv = function(){
		//$rootScope.isMain = false;
		$scope.login_dv = false;
		$scope.forgot_password = true;
		$scope.reset_pass_dv = false;
	};
	
    $scope.doLogin = function (user) {
		$scope.user = user;
		
		//alert(JSON.stringify($scope.user));
		$http.post(serviceBase+"authentication.php?action=login", $scope.user)
		.success(function(data) {
			Data.toast(data);
			if(data.status === "success"){
				user_details = data.user_details;
				bio_data = data.bio_data;
				//alert(JSON.stringify(data) );
				$rootScope.user_details = user_details;
				$localStorage.user_details = user_details;
				
				
				
				$rootScope.bio_data = bio_data;
				$localStorage.bio_data = bio_data;
				
				$rootScope.authenticated = true;
				if(user_details.sq_id_fk == 0){
					$location.path("change-password/");
				}
				else{
					if(user_details.type == "admin"){
						$location.path("admin/admin-dashboard/");
					}
					else if(user_details.type == "hod"){
						$location.path("hod/hod-dashboard/");
					}
					else if(user_details.type == "student"){
						//course_registered = data.course_registered;
						$localStorage.course_registered = data.course_registered;
						$localStorage.number_of_lecturers = data.number_of_lecturers;
						$location.path("student/student-dashboard/");
					}else if(user_details.type == "qualityassurance"){
						$location.path("quality-assurance/quality-assurance-dashboard/");
					}
				}
			}
		})
		.error(function(data) {
			$scope.hasError = "A network connection problem error occured while signing in. Please try again";
		});
    };
	
 $scope.doReset = function(reset_data) {
		$scope.reset_data = reset_data;
		
		//alert(JSON.stringify(reset_data));
		
		$http.post(serviceBase+"authentication.php?action=reset_password", $scope.reset_data)
		.success(function(data) {
			if(data.status === "success"){
				//alert(data.message);
				$scope.reset_password_message = data.message;
				$scope.reset_message_p = true;
				
				$scope.forgot_password = false;
				$scope.login_dv = false;
				$scope.reset_pass_dv = true;
			}
			else{
				Data.toast(data);
			}
		})
		.error(function(data) {
			$scope.hasError = "A network connection problem error occured while signing in. Please try again";
		});/**/
    };
});
//////////////////////////////////////////////////////////////////////////////// courses
myApp.controller("download_studentsCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $timeout){
	$rootScope.content_loaded = true;
	$rootScope.isMain = false;
	//$scope.add_single = true;
	$scope.add_multiple = true;
	$scope.loading_depts = false;
	
	$scope.depts_arr = Array();
	var serviceBase = 'backend/';
	
	$scope.item_data = {
						  code: '',
						  title: '',
						  desc: '',
						  units: '',
						  lev_id: '',
						  semester: '',
						  status: ''
					  };
	
	$scope.dateOptions = {
	  formatYear: 'yyyy',
	  startingDay: 1
	};
	
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'yyyy-MM-dd' ];
	$scope.format = $scope.formats[4];
	
	$http.get(serviceBase+"admin_b.php?action=get_schools")
	.success(function(data) {
		if(data.status === "success"){
			schools = data.schools;
			
			$scope.schools_arr = Array();
			for(var i = 0; i < schools.length; i++) {
				$scope.schools_arr[i] = {
								id: schools[i]['_id'],
								school_name: schools[i]['name'].toUpperCase()
								};
			}
			
			
			$rootScope.content_loaded = true;
		}
	})
	.error(function(data) {
		$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			
		$rootScope.content_loaded = true;
	});
	
	
	$scope.school_selected = function(){
		school = $scope.item_data.school;
		$scope.depts_arr = Array();
		$scope.item_data.dept = "";
		
		if(school.id != ""){
			$scope.loading_depts = true;
			//alert(school.id);
			
			$http.get(serviceBase+"admin_b.php?action=get_school_departments&&school_id="+school.id)
			.success(function(data) {
				if(data.status === "success"){
					depts = data.depts;
					for(var i = 0; i < depts.length; i++) {
						$scope.depts_arr[i] = {
										id: depts[i]['_id'],
										dept_name: depts[i]['name'].toUpperCase()
										};
					}
				}
					
				$scope.loading_depts = false;
			})
			.error(function(data) {
				$scope.hasError = "A network connection problem error occured while signing in. Please try again";
					
				$scope.loading_depts = false;
			});
		}
	}
	
	
	$scope.openAddSingleDv = function(){
		$scope.add_single = true;
		$scope.add_multiple = false;
	};
	
	$scope.openAddMultipleDv = function(){
		$scope.add_single = false;
		$scope.add_multiple = true;
	};
	
	$scope.pickupthefile = function(files){  
		var fd1 = new FormData();
		fd1.append("file", files[0]);
		$scope.fd1 = fd1;
	}
	
	$scope.uploadfile = function(){
		if($scope.fd1===undefined){
			message_code = {status: 'error', message: 'Error. No file was chosen to be uploaded.'};
			Data.toast(message_code);
		}
		else{
			$rootScope.content_loaded = false;
			$scope.unsaved = "";
			
			$http.post("backend/upload_b.php?upload_type=bulk_course_items&&whichFolder=uploadedfilefolder&&current_admin="+$localStorage.user_details._id, $scope.fd1, {withCredentials: true, headers: {'Content-Type': undefined },transformRequest: angular.identity })
			.success(function(data){
				$rootScope.content_loaded = true;
				
				Data.toast(data);
				
				$scope.unsaved = data.unsaved;
			})
			.error(function(errorMessage){
				$rootScope.content_loaded = true;
				Data.toast(data);
			});
		}
	}
	
	
    $scope.saveItem = function (item_data) {
		$scope.item_data = item_data;
		$scope.submitting = true;
		
		if($scope.item_data.units.length < 1){
			message_code = {
							  status: 'error',
							  message: 'Course Unit must not be empty.'
						  };
			Data.toast(message_code);
			
			$scope.submitting = false;
		}
		else if($scope.item_data.title.length < 1){
			message_code = {
							  status: 'error',
							  message: 'Course Title must be not be empty.'
						  };
			Data.toast(message_code);
			$scope.submitting = false;
		}
		else if($scope.item_data.code.length < 1){
			message_code = {
							  status: 'error',
							  message: 'Course Code must be not be empty.'
						  };
			Data.toast(message_code);
			$scope.submitting = false;
		}
		else{
			//alert(JSON.stringify($scope.item_data));
			
			$http.post(serviceBase+"admin_b.php?action=add_course&&current_admin="+$localStorage.user_details._id, $scope.item_data)
			.success(function(data) {
				Data.toast(data);
				if(data.status === "success"){
					$scope.item_data = {
									  code: '',
									  title: '',
									  desc: '',
									  units: '',
									  lev_id: '',
									  semester: '',
									  status: ''
								  };
				}
				
				$scope.submitting = false;
			})
			.error(function(data) {
				message_code = {
							  status: 'error',
							  message: 'A network connection problem error occured while connecting. Please try again'
						  };
				Data.toast(message_code);
				$scope.submitting = false;
			});
		}
    };
	
});


//////////////////////////////////////////////////////////////////////////////// courses
myApp.controller("download_coursetemplateCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $timeout){
	$rootScope.content_loaded = true;
	$rootScope.isMain = false;
	//$scope.add_single = true;
	$scope.add_multiple = true;
	$scope.loading_depts = false;
	
	$scope.depts_arr = Array();
	var serviceBase = 'backend/';
	
	$scope.item_data = {
						  code: '',
						  title: '',
						  desc: '',
						  units: '',
						  lev_id: '',
						  semester: '',
						  status: ''
					  };
	
	$scope.dateOptions = {
	  formatYear: 'yyyy',
	  startingDay: 1
	};
	
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'yyyy-MM-dd' ];
	$scope.format = $scope.formats[4];
	
	$http.get(serviceBase+"admin_b.php?action=get_schools")
	.success(function(data) {
		if(data.status === "success"){
			schools = data.schools;
			
			$scope.schools_arr = Array();
			for(var i = 0; i < schools.length; i++) {
				$scope.schools_arr[i] = {
								id: schools[i]['_id'],
								school_name: schools[i]['name'].toUpperCase()
								};
			}
			
			
			$rootScope.content_loaded = true;
		}
	})
	.error(function(data) {
		$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			
		$rootScope.content_loaded = true;
	});
	
	
	$scope.school_selected = function(){
		school = $scope.item_data.school;
		$scope.depts_arr = Array();
		$scope.item_data.dept = "";
		
		if(school.id != ""){
			$scope.loading_depts = true;
			//alert(school.id);
			
			$http.get(serviceBase+"admin_b.php?action=get_school_departments&&school_id="+school.id)
			.success(function(data) {
				if(data.status === "success"){
					depts = data.depts;
					for(var i = 0; i < depts.length; i++) {
						$scope.depts_arr[i] = {
										id: depts[i]['_id'],
										dept_name: depts[i]['name'].toUpperCase()
										};
					}
				}
					
				$scope.loading_depts = false;
			})
			.error(function(data) {
				$scope.hasError = "A network connection problem error occured while signing in. Please try again";
					
				$scope.loading_depts = false;
			});
		}
	}
	
	
	$scope.openAddSingleDv = function(){
		$scope.add_single = true;
		$scope.add_multiple = false;
	};
	
	$scope.openAddMultipleDv = function(){
		$scope.add_single = false;
		$scope.add_multiple = true;
	};
	
	$scope.pickupthefile = function(files){  
		var fd1 = new FormData();
		fd1.append("file", files[0]);
		$scope.fd1 = fd1;
	}
	
	$scope.uploadfile = function(){
		if($scope.fd1===undefined){
			message_code = {status: 'error', message: 'Error. No file was chosen to be uploaded.'};
			Data.toast(message_code);
		}
		else{
			$rootScope.content_loaded = false;
			$scope.unsaved = "";
			
			$http.post("backend/upload_b.php?upload_type=bulk_course_items&&whichFolder=uploadedfilefolder&&current_admin="+$localStorage.user_details._id, $scope.fd1, {withCredentials: true, headers: {'Content-Type': undefined },transformRequest: angular.identity })
			.success(function(data){
				$rootScope.content_loaded = true;
				
				Data.toast(data);
				
				$scope.unsaved = data.unsaved;
			})
			.error(function(errorMessage){
				$rootScope.content_loaded = true;
				Data.toast(data);
			});
		}
	}
	
	
    $scope.saveItem = function (item_data) {
		$scope.item_data = item_data;
		$scope.submitting = true;
		
		if($scope.item_data.units.length < 1){
			message_code = {
							  status: 'error',
							  message: 'Course Unit must not be empty.'
						  };
			Data.toast(message_code);
			
			$scope.submitting = false;
		}
		else if($scope.item_data.title.length < 1){
			message_code = {
							  status: 'error',
							  message: 'Course Title must be not be empty.'
						  };
			Data.toast(message_code);
			$scope.submitting = false;
		}
		else if($scope.item_data.code.length < 1){
			message_code = {
							  status: 'error',
							  message: 'Course Code must be not be empty.'
						  };
			Data.toast(message_code);
			$scope.submitting = false;
		}
		else{
			//alert(JSON.stringify($scope.item_data));
			
			$http.post(serviceBase+"admin_b.php?action=add_course&&current_admin="+$localStorage.user_details._id, $scope.item_data)
			.success(function(data) {
				Data.toast(data);
				if(data.status === "success"){
					$scope.item_data = {
									  code: '',
									  title: '',
									  desc: '',
									  units: '',
									  lev_id: '',
									  semester: '',
									  status: ''
								  };
				}
				
				$scope.submitting = false;
			})
			.error(function(data) {
				message_code = {
							  status: 'error',
							  message: 'A network connection problem error occured while connecting. Please try again'
						  };
				Data.toast(message_code);
				$scope.submitting = false;
			});
		}
    };
	
});

//////////////////////////////////////////////////////////////////////////////// courses
myApp.controller("addStudentCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $timeout){

	$rootScope.content_loaded = true;
	$rootScope.isMain = false;
	$scope.add_single = true;
	$scope.add_multiple = false;
	$scope.loading_depts = false;
	$levels = [];
	
	$scope.depts_arr = Array();
	var serviceBase = 'backend/';
	
	$scope.item_data = {
						  matriculation_number: '',
						  surname: '',
						  firstname: '',
						  middlename: '',
						  level: '',
						  gender:'',
						  semester: '',
						  department: '',
						  faculty: '',
						  
					  };
	
	$scope.dateOptions = {
	  formatYear: 'yyyy',
	  startingDay: 1
	};
	
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'yyyy-MM-dd' ];
	$scope.format = $scope.formats[4];
	
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
	
	
	//////////////////// for any change of department
	$scope.change_of_department = function(department)
	{
		//alert(department);
		if(department == 40 || department == 46)
		{
			faculty_ceiling = 500;
		}
		$scope.levels = populate_levels(faculty_ceiling)
	}
	//////////////////// for any change of faculty
	$scope.select_department = function(faculty){
	$scope.loading_depts = true;
	if(faculty == 'Clinical Sciences' || faculty == 'Veterinary Medicine' )
	{
		faculty_ceiling = 600;
	}else if(faculty == 'Technology' || faculty == 'Pharmacy' || faculty == 'Dentistry' || faculty == 'Agriculture' || faculty == 'Renewable Natural Resources')
	{
		faculty_ceiling = 500
	}else
	{
		faculty_ceiling = 400
	}
	$scope.levels = populate_levels(faculty_ceiling)

	$http.post('backend/sqlprocesses.php?get_department=yes', {"name_of_faculty": faculty})
		.success(function(response) {
		$scope.loading_depts = false;
			if(response.status === "ok"){
				$scope.departments = response.data;
				$rootScope.content_loaded = true;
			}
		})
		.error(function(data) {
		 $scope.loading_depts = false;
			$scope.hasError = "A network connection problem error occured while signing in. Please try again";
				
			$rootScope.content_loaded = true;
		});
	}
	
	
	$scope.openAddSingleDv = function(){
		$scope.add_single = true;
		$scope.add_multiple = false;
	};
	
	$scope.openAddMultipleDv = function(){
		$scope.add_single = false;
		$scope.add_multiple = true;
	};
	
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
	
	
	$scope.uploadMassStudents = function()
	{
			if( $scope.fd1===undefined)
			{
			   message_code = {status: 'error', message: "Please select a file before you upload"};
			   Data.toast(message_code);

			}
			else
			{

    		$http.post("backend/sqlprocesses.php?location=uploadedfilefolder&&filename=massDataForRepeaters&&massDataUploadForStudents=yes", $scope.fd1, {withCredentials: true, headers: {'Content-Type': undefined },transformRequest: angular.identity })
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
	$scope.submitting = true;
	$http.post('backend/sqlprocesses.php?save_student=yes', item_data)
		.success(function(response) {
			$scope.submitting = false;
			if(response.status === "ok" || response.status1 === "ok"){
				message_code = {
							  status: 'success',
							  message: 'You information was saved successfully'
						  };
			Data.toast(message_code);
				
			}else
			{
				message_code = {
							  status: 'error',
							  message: 'You information was not saved successfully'
						  };
			Data.toast(message_code);
			}
		})
		.error(function(data) {
			$scope.submitting = false;

		});
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




//////////////////////////////////////////////////////////////////////////////// courses
myApp.controller("editCourseCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $timeout)
{
	$rootScope.content_loaded = true;
	$rootScope.isMain = false;
	$scope.edit_single = true;
	$scope.part_one = true;
	$scope.part_two = false;
	$scope.edit_data = {};
	$scope.updating = true;
	
	$scope.openEditSingleDv = function(){
		$scope.edit_single = true;
	};
	
	$scope.openEditSingleDetailsDv = function(){
		$scope.part_one = false;
		$scope.part_two = true;
	};
	
	$scope.cancel_edit = function(){
		$scope.part_one = true;
		$scope.part_two = false;
	};

	$scope.edit_details = function(details_object)
	{
	$scope.openEditSingleDetailsDv();
	$scope.edit_data = details_object;
		
	}
	
	$scope.delete_course = function(details_object)
	{
		if(confirm("Are you sure to delete the course " + details_object.course_code + " - " + details_object.course_title))
		 {
			$http.post('backend/sqlprocesses.php?delete_course=yes', details_object)
			.success(function(response) {
				if(response.status === "ok"){
				alert(details_object.course_code + " - " + details_object.course_title + " has been deleted");
				$scope.courses = [];	
				$scope.searchbox = "";
				}else if(response.status === "not ok")
				{
				alert(details_object.course_code + " - " + details_object.course_title + " was not deleted successfully");	
				}
			})
			.error(function(data) {
	
			});
		 }else
		 {
		    ////////////////// do nothing
		 }
		
	}
	
	$scope.saveEdit = function(details_object)
	{
		
		$http.post('backend/sqlprocesses.php?update_course=yes', details_object)
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
	 $scope.updating = false;
	}
	
	
	
	$scope.searchbutton = function(searchbox){
	$http.post('backend/sqlprocesses.php?get_courses=yes',{"course_code":searchbox})
	.success(function(response) {
		if(response.status === "ok"){
				$scope.courses = [];

			$scope.courses.push(response.data);
			$rootScope.content_loaded = true;
		}
	})
	.error(function(data) {
		$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			
		$rootScope.content_loaded = true;
	});
	}


});
//////////////////////////////////////////////////////////////////////////////// courses
myApp.controller("addCourseCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $timeout){

	$rootScope.content_loaded = true;
	$rootScope.isMain = false;
	$scope.add_single = true;
	$scope.add_multiple = false;
	$scope.loading_depts = false;
	$levels = [];
	
	$scope.depts_arr = Array();
	var serviceBase = 'backend/';
	
	$scope.item_data = {
						  course_title: '',
						  course_unit:'',
						  course_code:'',
						  others: '',
						  department: '',
						  faculty: '',
						  
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
	
	
	//////////////////// for any change of department
	$scope.change_of_department = function(department)
	{
		//alert(department);
		/*if(department == 40 || department == 46)
		{
			faculty_ceiling = 500;
		}
		$scope.levels = populate_levels(faculty_ceiling) */
	}
	//////////////////// for any change of faculty
	$scope.select_department = function(faculty){
	$scope.loading_depts = true;
	/*if(faculty == 'Clinical Sciences' || faculty == 'Veterinary Medicine' )
	{
		faculty_ceiling = 600;
	}else if(faculty == 'Technology' || faculty == 'Pharmacy' || faculty == 'Dentistry' || faculty == 'Agriculture' || faculty == 'Renewable Natural Resources')
	{
		faculty_ceiling = 500
	}else
	{
		faculty_ceiling = 400
	}
	$scope.levels = populate_levels(faculty_ceiling) */

	$http.post('backend/sqlprocesses.php?get_department=yes', {"name_of_faculty": faculty})
		.success(function(response) {
		$scope.loading_depts = false;
			if(response.status === "ok"){
				$scope.departments = response.data;
				$rootScope.content_loaded = true;
			}
		})
		.error(function(data) {
		 $scope.loading_depts = false;
			$scope.hasError = "A network connection problem error occured while signing in. Please try again";
				
			$rootScope.content_loaded = true;
		});
	}
	
	
	$scope.openAddSingleDv = function(){
		$scope.add_single = true;
		$scope.add_multiple = false;
	};
	
	$scope.openAddMultipleDv = function(){
		$scope.add_single = false;
		$scope.add_multiple = true;
	};
	
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



//////////////////////////////////////////////////////////////////////////////// end of courses
myApp.controller("changePasswordCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.page = "change_password"; 
	
	var serviceBase = 'backend/';
	$rootScope.content_loaded = false;
	
	if($rootScope.secret_questions){
		$scope.login = {};
			
		$rootScope.content_loaded = true;
	}
	else{
		$http.get(serviceBase+"authentication.php?action=secret_questions")
		.success(function(data) {
			if(data.status === "success"){
				secret_questions = data.questions;
				
				$rootScope.secret_questions = Array();
				for(var i = 0; i < secret_questions.length; i++) {
					$rootScope.secret_questions[i] = {
									id: secret_questions[i]['_id'],
									question: secret_questions[i]['question']
									}
				}
				
				$scope.login = {};
				$scope.signup = {};
				$scope.forgot_password = false;
				
				$rootScope.content_loaded = true;
			}
		})
		.error(function(data) {
			$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			
			$rootScope.content_loaded = true;
		});
	}
	
	
    $scope.doChangePassword = function (change_data) {
		//Data.toast('yep');
		user_data = $localStorage.user_details;
		$scope.change = change_data;
		
		/*alert(JSON.stringify(user_data));*/
		//alert(JSON.stringify($scope.change.new_password));
		
		change_password_data = {
									user_data: user_data,
									password_data: $scope.change
								};
								
		//alert(JSON.stringify(change_password_data));
		
		if($scope.change.new_password.length < 6){
			message_code = {
							  status: 'error',
							  message: 'Password must be at least 6 characters or more'
						  };
			Data.toast(message_code);
		}
		else if($scope.change.new_password !== $scope.change.confirm_password){
			message_code = {
							  status: 'error',
							  message: 'Values entered for New Password and to Confirm Password do not match'
						  };
			Data.toast(message_code);
		}
		else{
			$http.post(serviceBase+"authentication.php?action=change_password", change_password_data )
			.success(function(data) 
			{
				Data.toast(data);
				if(data.status === "success"){
					user_details = data.user_details;
				bio_data = data.bio_data;
				
				$rootScope.user_details = user_details;
				$localStorage.user_details = user_details;
				$rootScope.bio_data = bio_data;
				$localStorage.bio_data = bio_data;
				
				$rootScope.authenticated = true;
			
				if(user_details.type == "admin"){
					$location.path("admin/admin-dashboard/");
				}
				else if(user_details.type == "hod"){
					$location.path("hod/hod-dashboard/");
				}
				else if(user_details.type == "student"){
					//course_registered = data.course_registered;
					$localStorage.course_registered = data.course_registered;
					$localStorage.number_of_lecturers = data.number_of_lecturers;

					$location.path("student/student-dashboard/");
				}else if(user_details.type == "qualityassurance"){
					$location.path("quality-assurance/quality-assurance-dashboard/");
				}
			  }
			})
			.error(function(data) {
				$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			});/**/
		}
    };
});

myApp.controller("contactCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $modal){
	$scope.admissions = true;
	$scope.technical_support = false;
	
    $scope.openAdmissionsContactDv = function(){
		$scope.closeAllDivs();
		$scope.admissions = true;
	};
	
    $scope.openTechnicalSupportContactDv = function(){
		$scope.closeAllDivs();
		$scope.technical_support = true;
	};
	
	$scope.closeAllDivs = function(){
		$scope.admissions = false;
		$scope.technical_support = false;
	}
});

myApp.controller("guidelinesCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $modal){
	$scope.login_info = true;
	$scope.biodata_info = false;
	$scope.sample_questions_info = false;
	
    $scope.openLoginInfoDv = function(){
		$scope.closeAllDivs();
		$scope.login_info = true;
	};
	
    $scope.openBioDataInfoDv = function(){
		$scope.closeAllDivs();
		$scope.biodata_info = true;
	};
	
    $scope.openSampleQuestionsInfoDv = function(){
		$scope.closeAllDivs();
		$scope.sample_questions_info = true;
	};
	
	$scope.closeAllDivs = function(){
		$scope.login_info = false;
		$scope.biodata_info = false;
		$scope.sample_questions_info = false;
	}
});
