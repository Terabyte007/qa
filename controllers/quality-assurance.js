myApp.controller("qualityDashCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	
	$scope.number_of_assessment = Array();
	$scope.number_of_department = Array();
	$scope.highest_assessment = Array();
	$scope.lowest_assessment = Array();

	//$scope.statistics = get_statistics();
	//alert(JSON.stringify($scope.statistics));
	
	$scope.statistics = [];
		$http.get("backend/sqlprocesses.php?get_statistics=yes")
		.success(function(response) {
		   if(response.status === "ok"){
				$scope.statistics = response.data;
				$scope.statistics[0].best = parseFloat($scope.statistics[0].best).toFixed(2) + "%";
				//alert(JSON.stringify(best));
			}
			else if(response.status === "not ok"){
			}
		})
		.error(function(data) {

		});

});



myApp.controller("downloads_generationCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){

$rootScope.content_loaded = true;
$scope.bio_data = $localStorage.bio_data;

///////////////////////// Get academic session //////////////////////////////////////////////////////////
	$http.post("backend/sqlprocesses.php?get_session=yes")
	.success(function(response) {
		if(response.status == 'ok') $scope.session = response.session_info;
	});
//////////////////////// end of get academic session ////////////////////////////////////////////////////

$scope.excel_type_of_download = "";
$scope.generate_departmental_assessment_flag = false;
$scope.generate_the_universty_assessment_flag = false;


$scope.generate_departmental_assessment = function()
{
if(
	confirm("Are you sure you want to generate department assessments?" ))
		 {
			$scope.generate_departmental_assessment_flag = true;
			
				// $http.post("backend/sqlprocesses.php?generate_departmental_assessment=yes")
				// .success(function(response) {
				// 	if(response == true)
				// 	{
				// 	$scope.generate_departmental_assessment_flag = false;
				// 	//alert('Assessment generation is done');
				// 	message_code = {status: 'success', message: 'Assessment generation is done'};
				// 	Data.toast(message_code);
				// 	}else
				// 	{
				// 		alert('Check to make sure the file University_wide.xlsx is not opened in MS Excel. Please try again');
				// 	message_code = {status: 'error', message: 'Check to make sure this file is not opened in MS Excel. Please try again'};
				// 	Data.toast(message_code);
				// 	}
				// });
				// -----------------------------------------------------------------------------------------------------------------------------------
				//New modifications by Afeez to make spinner stop rolling and complete the generation instead of the continuous rolling of the spinner

				// $http.post("backend/sqlprocesses.php?generate_departmental_assessment=yes")
				// .success(function(response) {
				// 	$scope.generate_departmental_assessment_flag = false;

				// 	if(response.status === "success") {
				// 		Data.toast({status: 'success', message: 'Assessment generation is done'});
				// 	} else {
				// 		Data.toast({status: 'error', message: 'Check to make sure the file is not opened in MS Excel. Please try again'});
				// 	}
				// })
				// .error(function() {
				// 	$scope.generate_departmental_assessment_flag = false;
				// 	Data.toast({status: 'error', message: 'Network error. Please try again'});
				// });
				// ------------------------------------------------------------------------------------------------------------------------------------
				
				//To show an alert to notify it has completed
				$http.post("backend/sqlprocesses.php?generate_departmental_assessment=yes")
				.success(function(response) {
					$scope.generate_departmental_assessment_flag = false;

					if (response.status === "complete") {
						const failed = response.results.filter(r => r.status !== "success");

						if (failed.length === 0) {
							alert('Assessment generation is done for all departments');
						} else {
							alert(`Some departments failed: ${failed.map(f => f.department).join(', ')}`);
						}
					} else {
						alert(response.message || 'Unexpected error occurred');
					}
				})
				.error(function() {
					$scope.generate_departmental_assessment_flag = false;
					alert('Network error. Please try again');
				});



		 }else
		 {

		}
	
}

$scope.generate_the_university_assessment = function()
{
if(
	confirm("Are you sure you want to generate the university assessments?" ))
		 {
			$scope.generate_the_universty_assessment_flag = true;
			
				$http.post("backend/sqlprocesses.php?generate_the_university_assessment=yes")
				.success(function(response) {
					if(response == true)
					{
					$scope.generate_the_universty_assessment_flag = false;
					alert('Assessment generation is done');
					message_code = {status: 'success', message: 'Assessment generation is done'};
					Data.toast(message_code);
					}else
					{
						alert('Check to make sure the file University_wide.xlsx is not opened in MS Excel. Please try again');
					message_code = {status: 'error', message: 'Check to make sure this file is not opened in MS Excel. Please try again'};
					Data.toast(message_code);
					}
				});

		 }else
		 {

		}
}



});



myApp.controller("downloadsCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	//alert();
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	//$scope.course_registered = $localStorage.course_registered;
	//$scope.all_the_lecturers = [];
	//$scope.indicators_flags = [];
	//alert("qualityDashboard");
	
	$scope.selected_faculty = "";
	$scope.selected_department = "";
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


///////////////////// show pdf section function ////////////////////////////////////////////////

$scope.pdf_section_flag = true;	
$scope.showPDFsection = function()
{
	$scope.excel_section_flag = false;	
	$scope.pdf_section_flag = true ;	
}

////////////////////// end of show pdf section /////////////////////////////////////////////////





////////////////////////// excel downloads /////////////////////////////////////////////////////
$scope.excel_type_of_download ="";
$scope.excel_departmental_assessment = true;
$scope.excel_faculty_assessment = false;
$scope.excel_university_wide_assessment = false;
///////////////////////// end of excel downloads ///////////////////////////////////////////////

//////////////////// show excel section function ///////////////////////////////////////////////

$scope.excel_section_flag = false;	

$scope.showEXCELsection = function()
{
	$scope.excel_type_of_download = "departmental";
	$scope.pdf_section_flag = false ;	
	$scope.excel_section_flag = true;	
}

/////////////////// end of show excel section function /////////////////////////////////////////

////////////////////////// change faculty //////////////////////////////////////////////////////
$scope.select_department = function(faculty){
	$scope.selected_faculty = faculty;

	$http.post('backend/sqlprocesses.php?get_department=yes', {"name_of_faculty": faculty})
		.success(function(response) { 
		$scope.loading_depts = false;
			if(response.status === "ok"){
				$scope.departments = response.data;
				//alert(JSON.stringify($scope.departments));

			}
		})
		.error(function(data) {
		});
	}

/////////////////////////// end of change faculty /////////////////////////////////////////////

///////////////////////// Get academic session //////////////////////////////////////////////////////////
	$http.post("backend/sqlprocesses.php?get_session=yes")
	.success(function(response) {
		if(response.status == 'ok') $scope.session = response.session_info;
	});
//////////////////////// end of get academic session ////////////////////////////////////////////////////


///////////////////////// Get departmenatal excel data //////////////////////////////////////////////////////////
$scope.departmental_excel_data = [];
	$http.post("backend/sqlprocesses.php?download_departmental_excel=yes")
	.success(function(response) {
		if(response.status == 'ok') 
		{
			$scope.departmental_excel_data = response.data;
			for(i=0; i< $scope.departmental_excel_data.length; i++ )
			{
				$scope.departmental_excel_data[i].href = $scope.departmental_excel_data[i].course_code + ".xlsx"
			}
			$scope.currentPage = 1; //current page
			$scope.entryLimit = 20; //max no of items to display in a page
			$scope.filteredItems = $scope.departmental_excel_data.length; //Initially for no filter  
			$scope.totalItems = $scope.departmental_excel_data.length;
		}
	});
//////////////////////// end of get academic session ////////////////////////////////////////////////////




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
///////////////////////////////// end of searching for departmental download
	
/////////////////////////////// searching for courses ///////////////////////////////////////////////////////
	
	$scope.maxSize1 = 7;
					
	 $scope.setPage1 = function(pageNo1) {
        $scope.currentPage1 = pageNo1;
    	};
    
	$scope.filter1 = function() {
        $timeout(function() { 
            $scope.filteredItems1 = $scope.filtered1.length;
        }, 10);
    };
    $scope.sort_by1 = function(predicate1) {
        $scope.predicate1 = predicate1;
        $scope.reverse1 = !$scope.reverse1;
    };
///////////////////////////////// end of searching for departmental download
/////////////////////////////// searching for courses ///////////////////////////////////////////////////////
	
	$scope.maxSize2 = 7;
					
	 $scope.setPage2 = function(pageNo2) {
        $scope.currentPage2 = pageNo2;
    	};
    
	$scope.filter2 = function() {
        $timeout(function() { 
            $scope.filteredItems2 = $scope.filtered2.length;
        }, 10);
    };
    $scope.sort_by2 = function(predicate2) {
        $scope.predicate2 = predicate2;
        $scope.reverse2 = !$scope.reverse2;
    };
///////////////////////////////// end of searching for departmental download



///////////////////////// Get departmenatal excel data //////////////////////////////////////////////////////////
$scope.university_wide_excel_data = [];
	$http.post("backend/sqlprocesses.php?download_university_wide_excel=yes")
	.success(function(response) {
		if(response.status == 'ok') $scope.university_wide_excel_data = response.data;
			for(i=0; i< $scope.university_wide_excel_data.length; i++ )
			{
				$scope.university_wide_excel_data[i].href = $scope.university_wide_excel_data[i].type_of_download + ".xlsx"
			}
	});
//////////////////////// end of get academic session ////////////////////////////////////////////////////

$scope.get_another_department = false;
$scope.type_of_download = "individual";



$scope.show_departments = function()
{
	$scope.get_another_department = false;
	$scope.faculty_and_depatments = true;
	$scope.show_department = false;
	$scope.assessments_download = [];
	$scope.departmental_download = [];
}


/////////////////////////////////////////// update_university_wide_download fn ///////////////////////////////////
$scope.update_university_wide_download = function(dept)
{
	alert(JSON.stringify(dept));	
}
////////////////////////////////////// end of update_university_wide_download fn /////////////////////////////////
function get_download()
	{//alert(JSON.stringify(selected_department));
		$http.post("backend/sqlprocesses.php?get_download=yes")
				.success(function(response) {
			$rootScope.content_loaded = true;
			////////////// individual downloads
				   if(response.status1 === "ok"){
						$scope.assessments_download = response.data1;
						//alert(JSON.stringify($scope.assessments_download));
						for(i=0; i< $scope.assessments_download.length; i++ )
						{
							$scope.assessments_download[i].href = $scope.assessments_download[i].pf_number + "_" 
							  + $scope.assessments_download[i].course_code + ".pdf"
							
						}
						$scope.currentPage1 = 1; //current page
						$scope.entryLimit1 = 20; //max no of items to display in a page
						$scope.filteredItems1 = $scope.assessments_download.length; //Initially for no filter  
						$scope.totalItems1 = $scope.assessments_download.length;
					$scope.individual_flag = true;
					}
					else if(response.status1 === "not ok"){
					$scope.individual_flag = false;
					}
				  
				  /////// departmental downloads
				   if(response.status2 === "ok"){
						$scope.departmental_download = response.data2;
						//alert(JSON.stringify(response.data2));
						for(i=0; i< $scope.departmental_download.length; i++ )
						{
							$scope.departmental_download[i].href = $scope.departmental_download[i].pf_number + ".pdf"
							
						}
						$scope.currentPage2 = 1; //current page
						$scope.entryLimit2 = 20; //max no of items to display in a page
						$scope.filteredItems2 = $scope.departmental_download.length; //Initially for no filter  
						$scope.totalItems2 = $scope.departmental_download.length;
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
			}
			);
	}
	/////////////////////// end of fetch existing downloads /////////////////////////////////



$scope.show_department = false;	
$scope.faculty_and_depatments = true;	

$scope.get_department_name = function(selected_department)
{
	$scope.department_name = get_name_of_departament(selected_department);
}


get_download();

/*$scope.show_the_department = function(selected_department)
{
	get_download(selected_department);
	$scope.get_another_department = true;
	$scope.faculty_and_depatments = false;	
	$scope.department_name = get_name_of_departament(selected_department);
$scope.show_department = true;	
	
}
*/

function get_name_of_departament(department_id)
{
	returned_department_name = "";
	angular.forEach($scope.departments, function(value, key) {
		if(value.id == department_id)  returned_department_name = value.title;		
	//alert(JSON.stringify(value) );
	});
	return returned_department_name;
}	

	
});

myApp.controller("studentInvestigateCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	//$scope.course_registered = $localStorage.course_registered;
	//$scope.all_the_lecturers = [];
	//$scope.indicators_flags = [];
	//alert("qualityDashboard");
});

myApp.controller("individualAssessmentCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	//$scope.course_registered = $localStorage.course_registered;
	//$scope.all_the_lecturers = [];
	//$scope.indicators_flags = [];
	//alert("qualityDashboard");
});


myApp.controller("classAssessmentCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $anchorScroll){
	//alert();
	
	///////////////////////// Get academic session //////////////////////////////////////////////////////////
		$http.post("backend/sqlprocesses.php?get_session=yes")
		.success(function(response) {
			if(response.status == 'ok') $scope.session = response.session_info;
		});
	//////////////////////// end of get academic session ////////////////////////////////////////////////////
	
	
	
	$rootScope.content_loaded = false;
	$scope.all_the_lecturer = true;
	$scope.single_lecturer = false;
	$scope.bio_data = $localStorage.bio_data;
	$scope.all_the_lecturers = [];
	$http.post("backend/sqlprocesses.php?get_lecturer_for_class_assessment=yes")
		.success(function(response) {
	$rootScope.content_loaded = false;
		   if(response.status === "ok"){
			   
				$scope.lecturers = response.data;
				$scope.currentPage = 1; //current page
				$scope.entryLimit = 20; //max no of items to display in a page
				$scope.filteredItems = $scope.lecturers.length; //Initially for no filter  
				$scope.totalItems = $scope.lecturers.length;
				//alert(JSON.stringify($scope.lecturers));
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


 $scope.class_assessment = function(the_lecturer, item_index)
{
	//alert();
	//alert(JSON.stringify(the_lecturer));	
	
	$scope.the_lecturer_info = the_lecturer;
	//alert(JSON.stringify($scope.the_lecturer_info));
	$rootScope.content_loaded = false;
	$scope.assessment_data = 
							{	
							comparisonIR:"",
							lecturer_assessment :
										{ 	enthusiasm:
											{_1:"0",
											 _2:"0"
												
											},
											warmth : 
											{_1:"",
											 _2:"",
											 _3:""
												
												},
											credibility :
											{_1:"",
											 _2:"",
											 _3:""
												
												} ,
											expectation_for_success :
											{_1:"",
											 _2:"",
											 _3:"",
											 _4:""
												
												},
											encouraging_and_patient : 
											{_1:"",
											 _2:"",
											 },
											professional : 
											{_1:"",
											 _2:"",
											 _3:"",
											 _4:""
												
												},
											adaptability :
											{_1:"",
											 },
											knowledgeable :
											{_1:"",
											 _2:"",
											 },
											pedagogy :
											{_1:"",
											 _2:"",
											 _3:""
												
												},
											assessment_of_student :
											{_1:"",
											 _2:"",
											 _3:""
												},
											any_other_comment : ""										
										}
							}
	
	
	$http.post("backend/sqlprocesses.php?get_lecturer_assessment=yes",{the_data: the_lecturer}).success(function(response) {
	$rootScope.content_loaded = false;
		   if(response.status === "ok"){
				$scope.single_lecturers = response.data;
				//alert(JSON.stringify(response.data));
				$scope.students_statistics = response.statistics;
				process_the_sent_data($scope.single_lecturers);
				$scope.all_the_lecturer = false;
				$scope.single_lecturer = true;
			}
			else if(response.status === "not ok"){
			message_code = {status: 'error', message: 'No Assessment. Please try again'};
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



///////////////////////////// comment section ///////////////////////////////////////


$scope.see_comment_flag = false;
$scope.see_comment = function()
{
$scope.see_comment_flag = !$scope.see_comment_flag ;
	
}

$scope.student_info1 = {};

$scope.get_student_comment = function(stud_id)
{
	$http.post("backend/sqlprocesses.php?get_single_student=yes",{stud_id: stud_id}).success(function(response) {
	$rootScope.content_loaded = false;
		   if(response.status === "ok"){
				$scope.student_info1 = response.data;
				//alert(JSON.stringify($scope.student_info1));
				$scope.all_the_lecturer = false;
				$scope.single_lecturer = false;
				$scope.student_div = true;
			}
			else if(response.status === "not ok"){
			message_code = {status: 'error', message: 'No Such Student. Please try again'};
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
//////////////////////////// end of see comment section ///////////////////////////////


//////////////////////////// navigate left ////////////////////////////////////////////
$scope.navigate_left = function(thesection)
{
	$scope.single_lecturer = false;
	$scope.all_the_lecturer = false;	
	$scope.student_div = false;
	if(thesection == "single lectuer") $scope.single_lecturer = true;
	if(thesection == "all the lectuers") $scope.all_the_lecturer = true;
	
}
////////////////////////// end of navigate left ////////////////////////////////////////



/////////////////////// go to location function ///////////////////////////////////////
$scope.go_to_location = function()
{
	
      var newHash = 'down';
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash('down');
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }	
	
}

/*$scope.go_to_location1 = function()
{
	
      var newHash = 'up';
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash('up');
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }	
	
}
*/
//////////////////// end of go to location funtction ///////////////////////////////////
$scope.student_div = false;
////////////////////////// get another lecturer fucntion ///////////////////////////////

$scope.get_another_lecturer = function()
{
	$scope.all_the_lecturer = true;
	$scope.single_lecturer = false;
	$scope.student_div = false;
	
	
}
////////////////////////// end of get another lecturer function ////////////////////////
function process_the_sent_data(the_lecturer)
{
	result = [];
	for (i=0; i< 30; i++)
	{
		result[i] = 0;	
		
	}
	number_of_items = the_lecturer.length;
	angular.forEach(the_lecturer, function(value, key) {
					/*if(value != "")
						{
							score = score + parseInt(value);
							counter++;
						}*/
					
			result[0] =  parseInt(result[0]) + parseInt(value.enthusiasm_1);
			result[1] =  parseInt(result[1]) + parseInt(value.enthusiasm_2);
			
			result[2] =  parseInt(result[2]) + parseInt(value.warmth_1);
			result[3] =  parseInt(result[3]) + parseInt(value.warmth_2);
			result[4] =  parseInt(result[4]) + parseInt(value.warmth_3);
			
			result[5] =  parseInt(result[5]) + parseInt(value.credibility_1);
			result[6] =  parseInt(result[6]) + parseInt(value.credibility_2);
			result[7] =  parseInt(result[7]) + parseInt(value.credibility_3);
			
			result[8] =  parseInt(result[8]) + parseInt(value.expectation_for_success_1);
			result[9] =  parseInt(result[9]) + parseInt(value.expectation_for_success_2);
			result[10] =  parseInt(result[10]) + parseInt(value.expectation_for_success_3);
			result[11] =  parseInt(result[11]) + parseInt(value.expectation_for_success_4);
			
			result[12] =  parseInt(result[12]) + parseInt(value.enco_and_patient_1);
			result[13] =  parseInt(result[13]) + parseInt(value.enco_and_patient_2);
			
			result[14] =  parseInt(result[14]) + parseInt(value.professional_1);
			result[15] =  parseInt(result[15]) + parseInt(value.professional_2);
			result[16] =  parseInt(result[16]) + parseInt(value.professional_3);
			result[17] =  parseInt(result[17]) + parseInt(value.professional_4);

			result[18] =  parseInt(result[18]) + parseInt(value.adaptability_1);
			result[19] =  parseInt(result[19]) + parseInt(value.knowledgeability_1);
			result[20] =  parseInt(result[20]) + parseInt(value.knowledgeability_2);
			
			result[21] =  parseInt(result[21]) + parseInt(value.pedagody_1);
			result[22] =  parseInt(result[22]) + parseInt(value.pedagody_2);
			result[23] =  parseInt(result[23]) + parseInt(value.pedagody_3);

			result[24] =  parseInt(result[24]) + parseInt(value.assess_of_students_1);
			result[25] =  parseInt(result[25]) + parseInt(value.assess_of_students_2);
			result[26] =  parseInt(result[26]) + parseInt(value.assess_of_students_3);
			
			
			result[27] =  parseInt(result[27]) + parseInt(value.total_score); // total score 
			result[28] =  parseInt(result[28]) + parseInt(value.comparative_analysis); // total score 
			

		});	
	for (i=0; i< result.length; i++)
	{
		result[i] = result[i]/number_of_items;	
		$scope.lecturer_outcome = result;
		
	}
	
	$scope.lecturer_outcome[27] = $scope.lecturer_outcome[27].toFixed(2);
	//alert(JSON.stringify($scope.lecturer_outcome));
}


});