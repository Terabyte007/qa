myApp.controller("hodCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data; 

	$scope.update_record_fn = function () {
		//alert()
		$location.path("hod/update-record");
	}
});
myApp.controller("downloadassessmentsCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.content_loaded = false;
	$scope.bio_data = $localStorage.bio_data;
	$scope.course_registered = $localStorage.course_registered;
	$scope.donwload_parameters = {download_type: "", lecturer_info:""};
	$scope.dowload_is_available = false;
	
	

	//////////////////////// downlaod afairs ////////////////////////////////////////////////////////////////
	$scope.type_of_download = "individual";
	$scope.donwload_pdf = function()
	{
		//alert(JSON.stringify($scope.donwload_parameters));
	$http.post("backend/generate_qa_pdf.php?generate_pdf=yes", {pdf_info: {dept_id_fk: $scope.bio_data.dept_id_fk,donwload_parameters: $scope.donwload_parameters}})
		.success(function(response) {//alert(JSON.stringify(response));
	$rootScope.content_loaded = false;
		   if(response.status === "done"){
			   	get_download();
				$scope.available_download = response.type;
				$scope.dowload_is_available = true;
				$scope.download_file = response.filename;
				//window.open('backend/saveAs.php?file_source='+$scope.download_file, '_self', '');

				//alert(JSON.stringify($scope.lecturers));
				message_code = {status: 'success', message: 'PDF has been generated'};
			    Data.toast(message_code);

			}
			else if(response.status === "not ok"){
			message_code = {status: 'error', message: 'Unable to Generate Assessment. Please try again'};
			Data.toast(message_code);
			}
			$rootScope.content_loaded = true;
		})
		.error(function(data) {
			message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
			Data.toast(message_code);
			$rootScope.content_loaded = true;
	});
		
	}
	//////////////////////// end of download affairs ////////////////////////////////////////////////////////
	
	///////////////////////// Get academic session //////////////////////////////////////////////////////////
		$http.post("backend/sqlprocesses.php?get_session=yes")
		.success(function(response) {
			if(response.status == 'ok') $scope.session = response.session_info;
		});
	//////////////////////// end of get academic session ////////////////////////////////////////////////////
	
	///////////////////////// lecturers in the department ///////////////////////////////////////////////////
	//alert($scope.bio_data.dept_id_fk);
	$http.post("backend/sqlprocesses.php?departmental_lecturers1=yes", {dept_id_fk: $scope.bio_data.dept_id_fk})
		.success(function(response) {
	$rootScope.content_loaded = false;
		   if(response.status === "ok"){
				$scope.lecturers = response.data;
				for(i=0; i< $scope.lecturers.length; i++)
				{
					$scope.lecturers[i].name = $scope.lecturers[i].titles + " " + $scope.lecturers[i].surname + " " +$scope.lecturers[i].onames;
					
				}
				//alert(JSON.stringify($scope.lecturers));
			}
			else if(response.status === "not ok"){
			message_code = {status: 'error', message: 'No Lecturer was found. Please try again'};
			Data.toast(message_code);
			}
			$rootScope.content_loaded = true;
		})
		.error(function(data) {
			message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
			Data.toast(message_code);
			$rootScope.content_loaded = true;
	});
	/////////////////// end of lecturers in the department ///////////////////////////////////////////////////////////
	
	
	
	
	//// fetch existing downloads ///////////////////////////////////////////////
	$scope.assessments_download = [];
	$scope.individual_flag = true;
	$scope.departmental_flag = true;


	function get_download()
	{
	$http.post("backend/sqlprocesses.php?get_download=yes", {dept_id_fk: $scope.bio_data.dept_id_fk})
			.success(function(response) {
		$rootScope.content_loaded = true;
		////////////// individual downloads
			   if(response.status1 === "ok"){
					$scope.assessments_download = response.data1;
					//alert(JSON.stringify(response.data));
					for(i=0; i< $scope.assessments_download.length; i++ )
					{
						$scope.assessments_download[i].href = $scope.assessments_download[i].pf_number + "_" 
						  + $scope.assessments_download[i].course_code + ".pdf"
						
					}
				}
				else if(response.status1 === "not ok"){
				$scope.individual_flag = false;
				}
			  
			  /////// departmental downloads
			   if(response.status2 === "ok"){
					$scope.departmental_download = response.data2;
					//alert(JSON.stringify(response.data));
					for(i=0; i< $scope.departmental_download.length; i++ )
					{
						$scope.departmental_download[i].href = $scope.departmental_download[i].pf_number + ".pdf"
						
					}
				}
				else if(response.status1 === "not ok"){
				$scope.individual_flag = false;
				}
				$rootScope.content_loaded = true;
			})
			.error(function(data) {
				message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
				Data.toast(message_code);
				$rootScope.content_loaded = true;
		});
	}
	/////////////////////// end of fetch existing downloads /////////////////////////////////
	get_download();

});


myApp.controller("assign-coursesCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.content_loaded = false;
	$scope.bio_data = $localStorage.bio_data;
	$scope.semesters = [{'_id':'1', title:'First'}, 
						{'_id':'2', title:'Second'}];
	
	///////////////////////// lecturers in the department ///////////////////////////////////////////////////
	$http.post("backend/sqlprocesses.php?departmental_lecturers=yes", { dept_id_fk: $scope.bio_data.dept_id_fk })
		.success(function(response) {
	$rootScope.content_loaded = false;
		   if(response.status === "ok"){
				$scope.lecturers = response.data;
				$scope.lecturers_copy = angular.copy($scope.lecturers);
				//alert(JSON.stringify($scope.lecturers_copy));
				$scope.lecturer_course_map = [];
				$scope.staff_photo = $scope.lecturers[$scope.record_navigation_counter].pf_number + '.jpg';
				
				/////////////////// remove nulls from titled and assign empty string
				for(i=0; i< $scope.lecturers.length; i++ )
				{
					if ($scope.lecturers[i].title == null) $scope.lecturers[i].title = "";
					if ($scope.lecturers[i].course_id_fk == null) $scope.lecturers[i].course_id_fk = "";
					if ($scope.lecturers[i].semester_id_fk == undefined) $scope.lecturers[i].semester_id_fk = "";
					$scope.lecturers[i].department_id_fk = $scope.bio_data.dept_id_fk;
					
				}
				//alert(JSON.stringify($scope.lecturers));
			}
			else if(response.status === "not ok"){
			message_code = {status: 'error', message: 'No Lecturer was found. Please upload your lecturers'};
			Data.toast(message_code);
			}
			$rootScope.content_loaded = true;
		})
		.error(function(data) {
			message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
			Data.toast(message_code);
			$rootScope.content_loaded = true;
	});
	
	$scope.edit_course_flag = false;
	$scope.chnage_edit_course_flag = function()
	{
		$scope.edit_course_flag = !$scope.edit_course_flag;
		
	}
	//////////////////////////////// photo upload

	$scope.uploadProfileImaage = false;
		// show profile picture upload
	$scope.uploadProfilePicture = function()
		{
			$scope.uploadProfileImaage = true;
		}
	//////////////////////////////////////////////
	// implementation of profile picture
		$scope.uploadProfilePicture1 = function(files) {
				var fd1 = new FormData();
				//alert($scope.theIndex);
				console.log(fd1);
					//Take the first selected file
					fd1.append("file", files[0]);
					var profilePictureFilename = $scope.lecturers[$scope.record_navigation_counter].pf_number;
					fd1.append("name", profilePictureFilename);
					$scope.fd1 = fd1;
					$scope.isSelected = true;

		
				};
		
		$scope.uploadProfilePictureExt = function() {
			if( $scope.fd1===undefined)
			{
			message_code = {status: 'error', message: 'Please Select a File Before You Upload'};
			Data.toast(message_code);
			}
			else
			{

			
    	  $http.post("backend/profilepicture.php?what=photo", $scope.fd1, {withCredentials: true, headers: 
			{'Content-Type': undefined },transformRequest: angular.identity })
			.success(function(data){
				$scope.staff_photo = $scope.staff_photo + '?' + new Date().getTime();
				$scope.uploadProfileImaage = false;
				$scope.isSavedPassport=true;
				message_code = {status: 'success', message: 'Passport has been uploaded successfully'};
				Data.toast(message_code);
				})
			.error(function(errMes){
			message_code = {status: 'error', message: 'There was Network Problem. Try Again or Consult the Administrator'};
			Data.toast(message_code);
				
				});
			
			}
		};
		
		
// end of implementation of profile picture

		$scope.cancelProfileFileUpload = function()
		{
			$scope.uploadProfileImaage = false;
		}
	
	


	//////////////////////////////////////////////


	////////////////////////////////////// end of upload photo
	
	/////////////////////////// end of the lecturers in the department //////////////////////////////////////////////
	
	///////////////////////// departmental courses /////////////////////////////////////////////////////////////////////
	$http.post("backend/sqlprocesses.php?get_departmental_courses=yes", { dept_id_fk: $scope.bio_data.dept_id_fk })
		.success(function(response) {
	$rootScope.content_loaded = false;
		   if(response.status === "ok"){
			   //alert(JSON.stringify(response.data));
				$scope.courses = response.data;
			}
			else if(response.status === "not ok"){
			message_code = {status: 'error', message: 'No Assessment For This Lecturer. Please try again'};
			Data.toast(message_code);
			}
			$rootScope.content_loaded = true;
		})
		.error(function(data) {
			message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
			Data.toast(message_code);
			$rootScope.content_loaded = true;
	});

	////////////////////////////// end of the departmental courses /////////////////////////////////////////////////////
	
	
	
	///////////////////////////////// navigations ////////////////////////////////////////////////////////////////////////
	$scope.record_navigation_counter = 0;
	$scope.next_record = function()
	{
		if($scope.record_navigation_counter < $scope.lecturers.length-1 ) $scope.record_navigation_counter++; 
		$scope.staff_photo = $scope.lecturers[$scope.record_navigation_counter].pf_number + '.jpg' + '?' + new Date().getTime();
		
	}
	$scope.previous_record = function()
	{
		//alert($scope.record_navigation_counter);
		if($scope.record_navigation_counter >= 1 ) $scope.record_navigation_counter--; 
		$scope.staff_photo = $scope.lecturers[$scope.record_navigation_counter].pf_number + '.jpg' + '?' + new Date().getTime();
	}
	////////////////////////////////////// end of navigations /////////////////////////////////////////////////////////////
	
	
	
	////////////////////////////// searching for lecturers /////////////////////////////////////////////////////////////
	$scope.filtered_lecturers = [];
	$scope.searchbox = "";
	$scope.pick_lecturer = false;
	$scope.search_mode = false;
	$scope.fetch_lecturer = function(the_position)
	{
		
		$scope.record_navigation_counter =  the_position -1;
		$scope.search_mode = false;
		$scope.pick_lecturer = false;
	}
	$scope.searchbutton = function()
	{
		my_counter = 0;
		angular.forEach($scope.lecturers, function(value, key) {
			my_counter++;
			if(value.pf_number == ($scope.searchbox.trim()))  
			{
				value.position = my_counter;
				$scope.filtered_lecturers.push(value);
				//alert("value.pf_number  " + value.pf_number + "  value.pf_number  " + $scope.searchbox)
				$scope.record_navigation_counter = my_counter;	
				$scope.search_mode = true;
				
			}		
		});
		//alert(JSON.stringify($scope.filtered_lecturers));
		$scope.pick_lecturer = true;
		$scope.staff_photo = $scope.lecturers[$scope.record_navigation_counter-1].pf_number + '?' + new Date().getTime();
	}
	
	//////////////////////////////// end of searching for lecturers /////////////////////////////////////////////////////
	/////////////////////////// funtion update_course_assignment //////////////////////////////////////////////////////////
	$scope.update_course_assignment = function()
	{
		if(	$scope.lecturers[$scope.record_navigation_counter].course_id_fk != '')	
			{
				$http.post("backend/sqlprocesses.php?update1_course_assignment=yes", { assignment_data: $scope.lecturers[$scope.record_navigation_counter]})
				.success(function(response) {
					$rootScope.content_loaded = false;
				   if(response.status === "ok"){
						message_code = {status: 'success', message: $scope.lecturers[$scope.record_navigation_counter].title + " " + $scope.lecturers[$scope.
						 record_navigation_counter].course_code + ' has been assigned to ' + $scope.lecturers[$scope.record_navigation_counter].surname
						 +" " +$scope.lecturers[$scope.record_navigation_counter].onames};
						Data.toast(message_code);
					}
					else if(response.status === "not ok"){
					message_code = {status: 'error', message: 'The course assessment was not successful. Please try again'};
					Data.toast(message_code);
					}
					$rootScope.content_loaded = true;
				})
				.error(function(data) {
					message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
					Data.toast(message_code);
					$rootScope.content_loaded = true;
				});
			}else
			{
					message_code = {status: 'error', message: 'You want to assign and empty course to '+$scope.lecturers[$scope.record_navigation_counter].surname+ '.  please pick a course and try again'};
					Data.toast(message_code);
			}
		
	}
	/////////////////////////////end of update_course_assignment ///////////////////////////////////////////////////////////
	
	
	///////////////////////////// delete_course_assignment ///////////////////////////////////////////////////////////
/*	$scope.delete_course_assignment = function()
	{

		if(confirm("Are you sure to delete " + $scope.lecturers[$scope.record_navigation_counter].course_code + "  " 
		+ "assigned to " + $scope.lecturers[$scope.record_navigation_counter].surname +" " + $scope.lecturers[$scope.record_navigation_counter].onames))
		 {
				$http.post("backend/sqlprocesses.php?delete1_course_assignment=yes", { assignment_data: $scope.lecturers[$scope.record_navigation_counter]})
				.success(function(response) {
					$rootScope.content_loaded = false;
				   if(response.status === "ok"){
						message_code = {status: 'success', message: $scope.lecturers[$scope.record_navigation_counter].course_code 
						                + ' has been unassigned to ' + $scope.lecturers[$scope.record_navigation_counter].surname +" " +
										$scope.lecturers[$scope.record_navigation_counter].onames};
						Data.toast(message_code);
						$scope.lecturers.splice($scope.record_navigation_counter);

					}
					else if(response.status === "not ok"){
					message_code = {status: 'error', message: 'The unassessment was not successful. Please try again'};
					Data.toast(message_code);
					}
					$rootScope.content_loaded = true;
				})
				.error(function(data) {
					message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
					Data.toast(message_code);
					$rootScope.content_loaded = true;
				});
 
		 }else
		 {
		 }

	}
*/
	/////////////////////////////end of delete_course_assignment ///////////////////////////////////////////////////////////
	
	
	
	/////////////////////////// funtion reset_course_assignment //////////////////////////////////////////////////////////
	$scope.reset_course_assignment = function ()
	{
			
		//alert("name_of_course = " + name_of_course + "  lecturer_pf = " + lecturer_pf + "  the_index  = " + the_index)	;
		//$scope.lecturers[the_index].course_id_fk = "";
		$scope.lecturers[$scope.record_navigation_counter].course_id_fk = "";
		$scope.lecturers[$scope.record_navigation_counter].course_code = "";
		
	}
	/////////////////////////////end of reset_course_assignment ///////////////////////////////////////////////////////////
	
	/////////////////////////// funtion update_all_course_assignment //////////////////////////////////////////////////////////
	$scope.update_all_course_assignment = function()
	{
		check_empty = '';
		for(i= 0; i < $scope.lecturers.length; i++)
		{
			if(	$scope.lecturers[i].course_id_fk == '') 
				{	
					check_flag = 'empty';
					break;
				}
		}
		//alert(JSON.stringify($scope.lecturers));
		//if( check_flag != ''){alert(check_flag);
			if(confirm("Some Courses are not assigned. Nothing will be done about them. Should I continue"))
			{
				temp_for_http = angular.copy($scope.lecturers);
				lecturers_for_http = [];
				angular.forEach(temp_for_http, function( value, key)
				{
					if(value.course_id_fk != '')
					{
						lecturers_for_http.push(value);
					}
				});
				$http.post("backend/sqlprocesses.php?update_all_course_assignment=yes", { assignment_data: lecturers_for_http})
				.success(function(response) {
					$rootScope.content_loaded = false;
				   if(response.status === "ok"){
						message_code = {status: 'success', message: "Updates have been successfully done"};
						Data.toast(message_code);
					}
					else if(response.status === "not ok"){
					message_code = {status: 'error', message: 'The course assessment was not successful. Please try again'};
					Data.toast(message_code);
					}
					$rootScope.content_loaded = true;
				})
				.error(function(data) {
					message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
					Data.toast(message_code);
					$rootScope.content_loaded = true;
				});
			} else 
			{
						message_code = {status: 'error', message: 'The Operation has been aborted'};
						Data.toast(message_code);
			} 
		
		//}
			
	}
	/////////////////////////////end of update_course_assignment ///////////////////////////////////////////////////////////
	
	
	/////////////////////////// funtion reset_all_course_assignment //////////////////////////////////////////////////////////
	$scope.reset_all_course_assignment = function ()
	{
		for (i = 0; i<	$scope.lecturers.length; i++)
		{		
		$scope.lecturers[i].course_id_fk = "";
		$scope.lecturers[i].course_code = "";
		
		}
		
	}
	/////////////////////////////end of reset_course_assignment ///////////////////////////////////////////////////////////
	$scope.selected_course1 = "";
	
	/////////////////////////// funtion update_course_code //////////////////////////////////////////////////////////
	$scope.update_course_code = function (nav_index)
	{
		//alert(JSON.stringify(nav_index));
		//alert(JSON.stringify(selected_course1));
		
		//select_record = get_course_code(course_id);
		$scope.lecturers[$scope.record_navigation_counter].course_code = select_record.code;
		$scope.lecturers[$scope.record_navigation_counter].title = select_record.title;
		
	}
	/////////////////////////////end of update_course_code ///////////////////////////////////////////////////////////
	
	function get_course_code(courseid)
	{
		returned_course_code = "";
		angular.forEach($scope.courses, function(value, key) {
			if(value._id == courseid)  returned_course_code = value;		
		//alert(JSON.stringify(value) );
		});
		return returned_course_code;
	}	

});


myApp.controller("assign-individualCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	$scope.all_the_lecturer = true;
	$scope.individual_lecturer = false;
	
	//////////////////////////  share_course with lecturer /////////////////////////////////////////////
	$scope.add_lecturers1 = function()
	{
		$location.path("hod/add-lecturers/");
		
	}
	
	$scope.add_course1 = function()
	{
		$location.path("hod/add-courses/");
		
	}

	
		///////////////////////// departmental courses /////////////////////////////////////////////////////////////////////
	$scope.assign_course_to = [];
	$http.post("backend/sqlprocesses.php?get_departmental_courses=yes", { dept_id_fk: $scope.bio_data.dept_id_fk })
		.success(function(response) {
	$rootScope.content_loaded = false;
		   if(response.status === "ok"){
			   //alert(JSON.stringify(response.data));
				$scope.courses = response.data;
				for(i=0; i< $scope.courses.length; i++)
				{
					if ($scope.courses[i].lecturer == null) $scope.courses[i].lecturer = "";

					$scope.assign_indicator[i] = false;
					$scope.assign_course_to[i] = "";
					$scope.courses[i].my_index = i;
				
				
					$scope.courses[i].department_id_fk = $scope.bio_data.dept_id_fk;
					$scope.share_indicator[i] = false;
					$scope.share_indicator_icon_index[i] = false;
					$scope.sharing_lecturer[i] = "";
				}
				//alert(JSON.stringify($scope.courses));
				$scope.currentPage = 1; //current page
				$scope.entryLimit = 20; //max no of items to display in a page
				$scope.filteredItems = $scope.courses.length; //Initially for no filter
				//alert(JSON.stringify($scope.filteredItems));
  
				$scope.totalItems = $scope.courses.length;

			}
			else if(response.status === "not ok"){
			message_code = {status: 'error', message: 'No Assessment For This Lecturer. Please try again'};
			Data.toast(message_code);
			}
			$rootScope.content_loaded = true;
		})
		.error(function(data) {
			message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
			Data.toast(message_code);
			$rootScope.content_loaded = true;
	});

	////////////////////////////// end of the departmental courses /////////////////////////////////////////////////////
	
	
	/////////////////////////////end of update_course_code ///////////////////////////////////////////////////////////
	
	function get_lecturer_object(pf_number)
	{
		returned_lecturer = "";
		angular.forEach($scope.lecturers, function(value, key) {
			if(value.pf_number == pf_number)  returned_lecturer = value;		
		//alert(JSON.stringify(value) );
		});
		return returned_lecturer;
	}	

	function get_course_object(course_id)
	{
		returned_lecturer = "";
		angular.forEach($scope.lecturers, function(value, key) {
			if(value.pf_number == course_id)  returned_lecturer = value;		
		//alert(JSON.stringify(value) );
		});
		return returned_lecturer;
	}	
	
	
	////////////////////// test previous assignment //////////////////////////////////////
	function test_previous_assignment(the_course)
	{
		return_flag = false;
		angular.forEach($scope.courses, function(value, key) {
			if(value.pf_number == the_course.pf_number && value.code == the_course.code)  return_flag = true;		
		//alert(JSON.stringify(value) );
		});
		///alert(return_flag);
		return return_flag;
		
	}
	////////////////////// end of test previous assignment ///////////////////////////////
	
	
	
	/////////////////////////// funtion update_course_code //////////////////////////////////////////////////////////
	$scope.update_sharing = function (the_course, the_position)
	{
		//alert(JSON.stringify(the_course));
		lecturer_object = angular.copy(get_lecturer_object($scope.sharing_lecturer[the_position]))
		
		the_course = angular.copy(the_course);
		//the_course.course_code = the_course.code;
		//the_course.course_id_fk = the_course._id;
		//the_course.department_id_fk = the_course.dept_id_fk;
		//the_course.lecturer_title = lecturer_object.titles;
		//the_course.surname = lecturer_object.surname;
		//the_course.onames = lecturer_object.onames;
		the_course.lecturer = lecturer_object.titles + " " + lecturer_object.surname + " " + lecturer_object.onames;
		the_course.pf_number = lecturer_object.pf_number;
		the_course.my_index = parseInt($scope.courses.length);
		$scope.keep_the_course = angular.copy(the_course);
		$scope.keep_the_course.lecturer = lecturer_object.titles + " " + lecturer_object.surname + " " + lecturer_object.onames;

		if( !test_previous_assignment(the_course))
		{//alert(JSON.stringify(the_course));
		if(confirm("Are you sure you want to share " + the_course.title + " - (" +  the_course.course_code + ")  " 
		+ " with " + the_course.lecturer +" ?" ))
		 {
				$http.post("backend/sqlprocesses.php?update1_course_assignment=yes", { assignment_data: the_course})
				.success(function(response) {
					$rootScope.content_loaded = false;
				   if(response.status === "ok"){
						$scope.courses.push($scope.keep_the_course); 
						//alert(JSON.stringify($scope.courses));
						//$scope.share_indicator.push(true);
						$scope.share_indicator_icon_index[the_position] = true; 
						$scope.share_indicator_icon_index.push(true); 
						$scope.share_indicator[the_position] = false;
						message_code = {status: 'success', message: the_course.title + " - " + the_course.course_code + ' has been shared with ' + 
						the_course.surname +" " +the_course.onames};
						Data.toast(message_code);
					}
					else if(response.status === "not ok"){
					message_code = {status: 'error', message: 'The course assessment was not successful. Please try again'};
					Data.toast(message_code);
					}
					$rootScope.content_loaded = true;
				})
				.error(function(data) {
					message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
					Data.toast(message_code);
					$rootScope.content_loaded = true;
				});
 
		 }else
		 {
					message_code = {status: 'error', message: 'Action Aborted'};
					Data.toast(message_code);
		 }
		} else //// if test_previous_assignment
		{
					message_code = {status: 'error', message: 'This course assignment exist'};
					Data.toast(message_code);
			
		}
}
	/////////////////////////////end of update sharing ///////////////////////////////////////////////////////////

	
	
	
	
	
/////////////////////////// funtion update_course_code //////////////////////////////////////////////////////////
	$scope.update_course_assignment = function (the_course, the_position)
	{
	   // alert(the_position)
	//	alert(JSON.stringify($scope.assign_course_to[the_position]));
		lecturer_object = get_course_object($scope.assign_course_to[the_position])
		the_course.lecturer = lecturer_object.titles + ' ' + lecturer_object.surname + ' ' + lecturer_object.onames ;
		the_course.pf_number = lecturer_object.pf_number;
		the_course.course_code = the_course.code;
		
		
		//alert(JSON.stringify(the_course));
		if(confirm("Are you sure you want to assign " + the_course.title + " - (" +  the_course.code + ")  " 
		+ " to " + the_course.lecturer +" ?" ))
		 {
				$http.post("backend/sqlprocesses.php?update1_course_assignment=yes", { assignment_data: the_course})
				.success(function(response) {
					//$rootScope.content_loaded = false;
				   if(response.status === "ok"){
						$scope.courses[the_position].lecturer = the_course.lecturer;
						$scope.assign_indicator[the_position] = false;
						message_code = {status: 'success', message: the_course.title + " " + the_course.code + ' has been assigned to ' + 
						the_course.surname +" " +the_course.onames};
						Data.toast(message_code);
					}
					else if(response.status === "not ok"){
					message_code = {status: 'error', message: 'The course assessment was not successful. Please try again'};
					Data.toast(message_code);
					}
					$rootScope.content_loaded = true;
				})
				.error(function(data) {
					message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
					Data.toast(message_code);
					$rootScope.content_loaded = true;
				});
 
		 }else
		 {
					message_code = {status: 'error', message: 'Action Aborted'};
					Data.toast(message_code);
		 }
	
}
/////////////////////////////end of update_course_assignment ///////////////////////////////////////////////////////////


	$scope.share_indicator = [];
	$scope.assign_indicator = []
	$scope.share_course_step1 = function(the_position)
	{
		$scope.assign_indicator[the_position] = false;
		$scope.share_indicator[the_position] = !$scope.share_indicator[the_position];
	}
	
	
	$scope.assign_course_to_lecturer = function(course, the_position)
	{
		$scope.share_indicator[the_position] = false;
		$scope.assign_indicator[the_position] = !$scope.assign_indicator[the_position];
		
	}
	$scope.share_course_step2 = function(lecturer, the_position)
	{
				$http.post("backend/sqlprocesses.php?update1_course_assignment=yes", {assignment_data: lecturer})
				.success(function(response) {
					$rootScope.content_loaded = false;
				   if(response.status === "ok"){
						message_code = {status: 'success', message: lecturer.title + " " +
						  lecturer.course_code + ' has been assigned to ' + lecturer.surname
						 +" " +lecturer.onames};
						Data.toast(message_code);
					}
					else if(response.status === "not ok"){
					message_code = {status: 'error', message: 'The course assessment was not successful. Please try again'};
					Data.toast(message_code);
					}
					$rootScope.content_loaded = true;
				})
				.error(function(data) {
					message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
					Data.toast(message_code);
					$rootScope.content_loaded = true;
				});
	}
	///////////////////////////// end of share course /////////////////////////////////////////////
	//////////////////////////  delete_lecturer_course /////////////////////////////////////////////
	
	$scope.delete_lecturer_course = function(course, the_position)
	{
		
		if(confirm("Are you sure to delete " + course.course_code + "  " 
		+ "assigned to " + course.surname +" " + course.onames))
		 {
				$http.post("backend/sqlprocesses.php?delete1_course_assignment=yes", { assignment_data: course})
				.success(function(response) {
					$rootScope.content_loaded = false;
				   if(response.status === "ok"){
					   //alert(the_position);
					   //alert(JSON.stringify($scope.lecturers[the_position]));
						$scope.share_indicator_icon_index[the_position] = false; 
						$scope.courses[the_position].lecturer = "";
						$scope.courses[the_position].course_code = "";
						message_code = {status: 'success', message: course.code 
						                + ' has been unassigned to ' + course.surname +" " +
										course.onames};
						Data.toast(message_code);

					}
					else if(response.status === "not ok"){
					message_code = {status: 'error', message: 'The unassessment was not successful. Please try again'};
					Data.toast(message_code);
					}
					$rootScope.content_loaded = true;
				})
				.error(function(data) {
					message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
					Data.toast(message_code);
					$rootScope.content_loaded = true;
				});
 
		 }else
		 {
					message_code = {status: 'error', message: 'Action Aborted'};
					Data.toast(message_code);
		 }

	}
	
	///////////////////////// end of delete assignment /////////////////////////////////
	
	
	
	
	
	////////////////////////// view lectuer /////////////////////////////////////////////
	
	$scope.view_lecturer = function(lecturer, the_position)
	{
		
		$scope.all_the_lecturer = false;
		$scope.individual_lecturer = true;
		$scope.lecturer_view = lecturer;
	
		
		
	}
	$scope.go_back_to_all_lecturers = function()
	{
		
		$scope.all_the_lecturer = true;
		$scope.individual_lecturer = false;
	}
	
	/////////////////////////// end of view lectuerer ///////////////////////////////////
		///////////////////////// lecturers in the department ///////////////////////////////////////////////////
		$scope.sharing_lecturer = [];
		$scope.share_indicator_icon_index = [];
	$http.post("backend/sqlprocesses.php?departmental_lecturers=yes", { dept_id_fk: $scope.bio_data.dept_id_fk })
		.success(function(response) {
	$rootScope.content_loaded = false;
		   if(response.status === "ok"){
				$scope.lecturers = response.data;
				$scope.lecturers_copy = angular.copy($scope.lecturers);
				/////////////////// remove nulls from titled and assign empty string
				for(i=0; i< $scope.lecturers.length; i++ )
				{
					if ($scope.lecturers[i].title == null) $scope.lecturers[i].title = "";
					if ($scope.lecturers[i].course_id_fk == null) $scope.lecturers[i].course_id_fk = "";
					if ($scope.lecturers[i].semester_id_fk == undefined) $scope.lecturers[i].semester_id_fk = "";
					$scope.lecturers[i].department_id_fk = $scope.bio_data.dept_id_fk;
					$scope.share_indicator[i] = false;
					$scope.share_indicator_icon_index[i] = false;
					$scope.sharing_lecturer[i] = "";
					$scope.lecturers[i].my_index = i;
				}
			}
			else if(response.status === "not ok"){
			message_code = {status: 'error', message: 'No Lecturer uploaded. Please upload your lecturers'};
			Data.toast(message_code);
			}
			$rootScope.content_loaded = true;
		})
		.error(function(data) {
			message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
			Data.toast(message_code);
			$rootScope.content_loaded = true;
	});
	/////////////////////////////// end of lecturers in the department //////////////////////
	
	
	/////////////////////////////// searching for courses ///////////////////////////////////////////////////////
	
	$scope.maxSize = 7;
					
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
		
	
	
/////////////////////////////// end of searching for courses ////////////////////////////////////////////////


});
 
 //////////////////////////////////////////////////////////////////////////////// download student controller /////////////////////////////
myApp.controller("download_lecturersCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $timeout){
	$scope.bio_data = $localStorage.bio_data;
	$rootScope.content_loaded = true;
	$rootScope.isMain = false;
	//$scope.add_single = true;
	$scope.add_multiple = true;
	$scope.loading_depts = false;
	$scope.lecturers = [];
	
	$scope.titles = [
					{id:"Prof.", name : "Professor"},
					{id:"Dr", name : "Doctor"},
					{id:"Mr", name : "Mister"},
					{id:"Miss", name : "Miss"}
					]

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
	
		//////////////////////////  delete_lecturer_course /////////////////////////////////////////////
//	$scope.lecturers = [];
	$scope.delete_lecturer_info = function(lecturer, my_index)
	{
		//alert(JSON.stringify(lecturer));
		if(confirm("Are you sure to delete " + lecturer.title + "  " + lecturer.surname + "  " + lecturer.onames ))
		 {
				$http.post("backend/sqlprocesses.php?delete1_lecturer=yes", { deletion_data: lecturer})
				.success(function(response) {
					$rootScope.content_loaded = false;
				   if(response.status === "ok"){
					   //alert(the_position);
					   //alert(JSON.stringify($scope.lecturers[the_position]));
					   
						message_code = {status: 'success', message: lecturer.title + "  " 
						+ lecturer.surname + "  " + lecturer.onames + " has been deleted successfully " };
						Data.toast(message_code);
						$scope.lecturers.splice(my_index);

					}
					else if(response.status === "not ok"){
					message_code = {status: 'error', message: 'The deletion was not successful. Please try again'};
					Data.toast(message_code);
					}
					$rootScope.content_loaded = true;
				})
				.error(function(data) {
					message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
					Data.toast(message_code);
					$rootScope.content_loaded = true;
				});
 
		 }else
		 {
					message_code = {status: 'error', message: 'Action Aborted'};
					Data.toast(message_code);
		 }

	}
	
	///////////////////////// end of delete assignment /////////////////////////////////

	$scope.openAddSingleDv = function(){
		$scope.add_single = true;
		$scope.add_multiple = false;
		$scope.delete_lecturer = false;
	};
	
	$scope.openAddMultipleDv = function(){
		$scope.add_single = false;
		$scope.add_multiple = true;
		$scope.delete_lecturer = false;

	};
	
	$scope.openDeleteLecturerDv = function(){
	    $http.post("backend/sqlprocesses.php?departmental_lecturers=yes", { dept_id_fk: $scope.bio_data.dept_id_fk })
		.success(function(response) {
	$rootScope.content_loaded = false;
		   if(response.status === "ok"){
		       
				$scope.lecturers = response.data;
				$scope.add_single = false;
        		$scope.add_multiple = false;
        		$scope.delete_lecturer = true;
				$scope.lecturers_copy = angular.copy($scope.lecturers);
				/////////////////// remove nulls from titled and assign empty string
				for(i=0; i< $scope.lecturers.length; i++ )
				{
					$scope.lecturers[i].my_index = i;
				}
				$scope.currentPage = 1; //current page
				$scope.entryLimit = 20; //max no of items to display in a page
				$scope.filteredItems = $scope.lecturers.length; //Initially for no filter  
				$scope.totalItems = $scope.lecturers.length;

			}
			else if(response.status === "not ok"){
			message_code = {status: 'error', message: 'No lecturer has been uploaded. Please upload your lecturers'};
			Data.toast(message_code);
			}
			$rootScope.content_loaded = true;
		})
		.error(function(data) {
			message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
			Data.toast(message_code);
			$rootScope.content_loaded = true;
	});
		

	};
	
	$scope.pickupthefileformassupload = function(files){  
		var fd1 = new FormData();
		fd1.append("file", files[0]);
		$scope.fd1 = fd1;
	}
	
	$scope.uploadMassStudents = function()
	{
			if( $scope.fd1==undefined)
			{
			   message_code = {status: 'error', message: "Please select a file before you upload"};
			   Data.toast(message_code);

			}
			else
			{

    		$http.post("backend/sqlprocesses.php?location=uploadedfilefolder&&filename=massDataForLecturers&&massDataUploadForStudents=yes&&dept_id_fk=" + $scope.bio_data.dept_id_fk, $scope.fd1, {withCredentials: true, headers: {'Content-Type': undefined },transformRequest: angular.identity })
			.success(function(data){
				if(data.exist != undefined ) 
				{
					$scope.unsavedData = data.exist;
					$scope.unsavedRecord = true;
				}
				if(data.ok != undefined ) 
				{ //alert(JSON.stringify(data.ok));
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
	
	
	
    $scope.saveItem = function (lecturer) {
		lecturer.dept_id_fk = $scope.bio_data.dept_id_fk;
				//alert(JSON.stringify(lecturer));

		//$scope.item_data = item_data;
		//$scope.submitting = true;
		
		/*if($scope.item_data.units.length < 1){
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
		else{*/
			//alert(JSON.stringify($scope.item_data));
			
			$http.post("backend/sqlprocesses.php?save_lecturer1=yes", {my_data : lecturer})
			.success(function(data) {
				if(data.status == "ok")
				{
				message_code = {
							  status: 'success',
							  message: 'Lectuer saved successfully'
						  };
				Data.toast(message_code);
				}else if(data.status == "ok")
				{
				message_code = {
							  status: 'error',
							  message: 'Lectuer was not saved successfully. Retry again'
						  };
				Data.toast(message_code);
					
					
				}else if(data.status == "exist")
				{
				message_code = {
							  status: 'error',
							  message: 'The Lectuer exists'
						  };
				Data.toast(message_code);
					
					
				}
			})
			.error(function(data) {
				message_code = {
							  status: 'error',
							  message: 'A network connection problem error occured while connecting. Please try again'
						  };
				Data.toast(message_code);
				$scope.submitting = false;
			});
		
//}
    };
	
	
	
	
	$http.post("backend/sqlprocesses.php?departmental_lecturers=yes", { dept_id_fk: $scope.bio_data.dept_id_fk })
		.success(function(response) {
	$rootScope.content_loaded = false;
		   if(response.status === "ok"){
				$scope.lecturers = response.data;
				$scope.lecturers_copy = angular.copy($scope.lecturers);
				/////////////////// remove nulls from titled and assign empty string
				for(i=0; i< $scope.lecturers.length; i++ )
				{
					$scope.lecturers[i].my_index = i;
				}
				$scope.currentPage = 1; //current page
				$scope.entryLimit = 20; //max no of items to display in a page
				$scope.filteredItems = $scope.lecturers.length; //Initially for no filter  
				$scope.totalItems = $scope.lecturers.length;

			}
			else if(response.status === "not ok"){
			message_code = {status: 'error', message: 'No lecturer has been uploaded. Please upload your lecturers'};
			Data.toast(message_code);
			}
			$rootScope.content_loaded = true;
		})
		.error(function(data) {
			message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
			Data.toast(message_code);
			$rootScope.content_loaded = true;
	});
	/////////////////////////////// end of lecturers in the department //////////////////////
	
	
	/////////////////////////////// searching for courses ///////////////////////////////////////////////////////
	
	$scope.maxSize = 7;
					
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




/////////////////////////////////////////////update record controller ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////// download student controller /////////////////////////////
myApp.controller("updateRecordCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $timeout){
	$scope.bio_data = $localStorage.bio_data;
	$rootScope.content_loaded = true;
	$rootScope.isMain = false;
	//$scope.add_single = true;
	$scope.add_multiple = true;
	$scope.loading_depts = false;
	
	
	$scope.titles = [
					{id:"Prof.", name : "Professor"},
					{id:"Dr", name : "Doctor"},
					{id:"Mr", name : "Mister"},
					{id:"Miss", name : "Miss"}
					]

	$scope.depts_arr = Array();
	var serviceBase = 'backend/';
	$scope.lecturer = {
		surname: "",
		othernames: "",
		title: "",
		pf_number: $scope.bio_data.pf_number
	}
	
	
	
    $scope.saveItem = function (lecturer) {
		//alert(JSON.stringify(lecturer))
				
			
			//$http.post("backend/sqlprocesses.php?save_lecturer1=yes", {my_data : lecturer})
			$http.post("backend/sqlprocesses.php?update_hod_record=yes", lecturer)
			.success(function(data) {
				if(data.status == "ok")
				{
				$timeout(function(){
					$localStorage.bio_data = data.data;
					$location.path("hod/hod-dashboard");
					
				},5000)
					
				
				message_code = {
							  status: 'success',
							  message: 'Lectuer saved successfully. Redirecting to your dashboard ...'
						  };
				Data.toast(message_code);
				}else if(data.status == "ok")
				{
				message_code = {
							  status: 'error',
							  message: 'Lectuer was not saved successfully. Retry again'
						  };
				Data.toast(message_code);
					
					
				}else if(data.status == "exist")
				{
				message_code = {
							  status: 'error',
							  message: 'The Lectuer exists'
						  };
				Data.toast(message_code);
					
					
				}
			})
			.error(function(data) {
				message_code = {
							  status: 'error',
							  message: 'A network connection problem error occured while connecting. Please try again'
						  };
				Data.toast(message_code);
				$scope.submitting = false;
			});
		
//}
    };
	
	
	
});

//////////////////////////////////////// end of update refcord controller ////////////////////////////////////

 //////////////////////////////////////////////////////////////////////////////// download student controller /////////////////////////////
myApp.controller("course1Ctrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $timeout){
	$scope.bio_data = $localStorage.bio_data;
	$rootScope.content_loaded = true;
	$rootScope.isMain = false;
	//$scope.add_single = true;
	$scope.add_single = true;
	$scope.loading_depts = false;
	
	
	$scope.depts_arr = Array();
	var serviceBase = 'backend/';
	
	$scope.course = {
						  course_code: '',
						  course_title: '',
						  course_units: '',
						  course_semester: '',
						  course_status: '',
						  course_dept_id_fk:''
					  };
	
	
	$scope.delete_course_info = function(course, my_index)
	{
		//alert(JSON.stringify(lecturer));
		if(confirm("Are you sure to delete " + course.title + "  " + course.code ))
		 {
				$http.post("backend/sqlprocesses.php?delete1_course=yes", { deletion_data: course})
				.success(function(response) {
					$rootScope.content_loaded = false;
				   if(response.status === "ok"){
						message_code = {status: 'success', message: course.title +   " has been deleted successfully " };
						Data.toast(message_code);
						$scope.courses.splice(my_index);

					}
					else if(response.status === "not ok"){
					message_code = {status: 'error', message: 'The deletion was not successful. Please try again'};
					Data.toast(message_code);
					}
					$rootScope.content_loaded = true;
				})
				.error(function(data) {
					message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
					Data.toast(message_code);
					$rootScope.content_loaded = true;
				});
 
		 }else
		 {
					message_code = {status: 'error', message: 'Action Aborted'};
					Data.toast(message_code);
		 }

	}
	
	///////////////////////// end of delete assignment /////////////////////////////////

	$scope.openAddSingleDv = function(){
		$scope.add_single = true;
		$scope.add_multiple = false;
		$scope.delete_course = false;
	};
	
	$scope.openAddMultipleDv = function(){
		$scope.add_single = false;
		$scope.add_multiple = true;
		$scope.delete_course = false;

	};
	
	$scope.openDeleteCourseDv = function(){
		$scope.add_single = false;
		$scope.add_multiple = false;
		$scope.delete_course = true;

	};
	
	$scope.pickupthefileformassupload = function(files){  
		var fd1 = new FormData();
		fd1.append("file", files[0]);
		$scope.fd1 = fd1;
	}
	
	$scope.uploadMassCourse = function()
	{
			if( $scope.fd1==undefined)
			{
			   message_code = {status: 'error', message: "Please select a file before you upload"};
			   Data.toast(message_code);

			}
			else
			{

    		$http.post("backend/sqlprocesses.php?location=uploadedfilefolder&&filename=massDataForCourses&&massDataUploadForCourses1=yes&&dept_id_fk=" + $scope.bio_data.dept_id_fk, $scope.fd1, {withCredentials: true, headers: {'Content-Type': undefined },transformRequest: angular.identity })
			.success(function(data){
				if(data.exist != undefined ) 
				{
					$scope.unsavedData = data.exist;
					$scope.unsavedRecord = true;
				}
				if(data.ok != undefined ) 
				{ //alert(JSON.stringify(data.ok));
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
	
	
	
    $scope.save_course = function (course) {
		course.course_dept_id_fk = $scope.bio_data.dept_id_fk;
			$http.post("backend/sqlprocesses.php?save_course1=yes", {my_data : course})
			.success(function(data) {
				if(data.status == "ok")
				{
					$scope.course.course_code =  '';
					$scope.course.course_title =  '';
					$scope.course.course_units =  '';
					$scope.course.course_semester =  '';
					$scope.course.course_status =  '';
					$scope.course.course_code =  '';
					
					message_code = {
							  status: 'success',
							  message: 'The course was saved successfully'
						  };
				Data.toast(message_code);
				}else
				{
				message_code = {
							  status: 'error',
							  message: 'The course was not saved successfully. Retry again'
						  };
				Data.toast(message_code);
					
					
				}
			})
			.error(function(data) {
				message_code = {
							  status: 'error',
							  message: 'A network connection problem error occured while connecting. Please try again'
						  };
				Data.toast(message_code);
				$scope.submitting = false;
			});
		
//}
    };
	
	
	
	
	$http.post("backend/sqlprocesses.php?get_departmental_courses=yes", { dept_id_fk: $scope.bio_data.dept_id_fk })
		.success(function(response) {
	$rootScope.content_loaded = false;
		   if(response.status === "ok"){
				$scope.courses = response.data;
				//alert(JSON.stringify($scope.courses));
				$scope.courses_copy = angular.copy($scope.courses);
				/////////////////// remove nulls from titled and assign empty string
				for(i=0; i< $scope.courses.length; i++ )
				{
					$scope.courses[i].my_index = i;
				}
				$scope.currentPage = 1; //current page
				$scope.entryLimit = 20; //max no of items to display in a page
				$scope.filteredItems = $scope.courses.length; //Initially for no filter  
				$scope.totalItems = $scope.courses.length;

			}
			else if(response.status === "not ok"){
			message_code = {status: 'error', message: 'No course retrieved. Please try again'};
			Data.toast(message_code);
			}
			$rootScope.content_loaded = true;
		})
		.error(function(data) {
			message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
			Data.toast(message_code);
			$rootScope.content_loaded = true;
	});
	/////////////////////////////// end of lecturers in the department //////////////////////
	
	
	/////////////////////////////// searching for courses ///////////////////////////////////////////////////////
	
	$scope.maxSize = 7;
					
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




