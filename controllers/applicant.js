myApp.controller("checkcomplaintCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $modal){
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	$scope.user_details = $localStorage.user_details;

	$scope.complaints = [];
	$scope.complaint_list = true;
	$scope.complaint_details = false;
	
	  ////////////////////////// change faculty //////////////////////////////////////////////////////
	  $http.post('backend/sqlprocesses.php?get_complaints=yes', $scope.user_details)
		  .success(function(response) {

			  if(response.status === "ok"){
				  $scope.complaints = response.data;
				  for(i=0; i<$scope.complaints.length; i++)
				  {
					  $scope.complaints[i].sn = i;
					  //alert($scope.complaints)
					  //alert(JSON.stringify($scope.complaints[i]));
					  
					}
			  }else
			  {}
		  })
		  .error(function(data) {
		  });
  
  /////////////////////////// end of change faculty /////////////////////////////////////////////

	
	
	
		/////////////////////////// navigate_to_list function //////////////////////////////
	$scope.navigate_to_list = function()
	{
		$scope.complaint_list = true;
		$scope.complaint_details = false;
		
	}
	//////////////////////// end of view response function //////////////////////////

	
	/////////////////////////// view repsonse function //////////////////////////////
	$scope.view_response = function(reponse_details)
	{
		//alert(JSON.stringify(reponse_details));
		$scope.complaint_list = false;
		$scope.complaint_details = true;
		$scope.response_details = reponse_details;
			
		
	}
	//////////////////////// end of view response function //////////////////////////
	
	/////////////////////////// next function //////////////////////////////
	$scope.next = function(sn)
	{
		//alert(sn);
		if(sn < $scope.complaints.length -1)
		{ 
			for(i=sn+1; i<$scope.complaints.length; i++)
			{
				if($scope.complaints[i].description != '')
				{ 
					$scope.response_details = $scope.complaints[i];
					//alert(JSON.stringify($scope.response_details))
					break;
				}else
				{}
			}
		}else
		{}
		
	}
	//////////////////////// end of next function //////////////////////////
	
	///////////////////////////  previous function //////////////////////////////
	$scope.previous = function(sn)
	{
		if(sn > 0)
		{ 
			for(i=sn-1; i>0; i--)
			{
				if($scope.complaints[i].description != '')
				{ 
					$scope.response_details = $scope.complaints[i];
					//alert(JSON.stringify($scope.response_details))
					break;
				}else
				{}
			}
		}else
		{}
		
	}
	//////////////////////// end of previous function //////////////////////////
	


});

myApp.controller("helpCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $modal){
	$scope.steps = {
		"step1": true,
		"step2": false,
		"step3": false,
		"step4": false,
		"step5": false
		
		};
		
		
	
	$scope.goto = function(step)
	{
		
		$scope.steps = {
		"step1": false,
		"step2": false,
		"step3": false,
		"step4": false,
		"step5": false,
		};
		if(step ==1) $scope.steps.step1 = true;
		if(step ==2) $scope.steps.step2 = true;
		if(step ==3) $scope.steps.step3 = true;
		if(step ==4) $scope.steps.step4 = true;
		if(step ==5) $scope.steps.step5 = true;
	}
		
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


myApp.controller("complaintCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	$scope.user_details = $localStorage.user_details;
	$scope.gathering_courses = false;
	
	////////////////////////// change faculty //////////////////////////////////////////////////////
		$http.post('backend/sqlprocesses.php?get_department1=yes')
			.success(function(response) {
				if(response.status === "ok"){
					$scope.departments = response.data;
					//alert(JSON.stringify($scope.depts));
				}
			})
			.error(function(data) {
			});
	
	/////////////////////////// end of change faculty /////////////////////////////////////////////
	
	///////////////////////////////// added code ////////////////////////////////////////////
	student_information = {};
	///////////////////////////////// update courses //////////////////////////////////////////////
	$scope.update_courses = function(the_session)
	{ 
	$scope.courses = [];
	$scope.gathering_courses = true;
		if (the_session == '')
		{}else
		{ //alert($scope.user_details.username)
		student_information.matric_no = $scope.user_details.username;
		student_information.session = the_session;
		$http.post('backend/sqlprocesses.php?get_courses_by_session=yes', student_information)
			.success(function(response) {
				$scope.gathering_courses = false;
				if(response.status === "ok"){
					$scope.courses = response.data;
					//alert(JSON.stringify($scope.courses));
				}else if(response.status === "not ok")
				{
					$scope.courses = [];
					$scope.courses.push({"code":"No Course was registered"})
				}
				
			})
			.error(function(data) {
			});
		}
		
	}
	////////////////////////////////// end of update courses ///////////////////////////////////////
	///////////////////////////// end of added code //////////////////////////////////////////////
	


	$scope.complaints = ["Missing Result", "Incorrect Result", "Incorrect Score", "Incorrect Department","Incorrect CGPA", "Incorrect Mode of Entry", "Others"];
	
	$scope.the_years = [];
	$scope.todaysDate = new Date();
	$scope.yyyy = $scope.todaysDate.getFullYear();
	for (i= $scope.yyyy; i>$scope.yyyy - 10; i--)
	{
		$scope.the_years.push(i)
	}
	
	$scope.sessions = [];
	//alert(JSON.stringify($scope.the_years));
	for (i=1; i<=$scope.the_years.length - 2; i++)
	{
		$scope.sessions.push($scope.the_years[i+1] + "/" + $scope.the_years[i])
	}

	$scope.complaint_types = {
		"description":"",
		"course_code":"",
		"mode":"",
		"session":"",
		"excpected_cgpa":"",
		"others":"",
		"department":"",
		
		}
		
	$scope.initialise_selection = function()
	{
		$scope.courses = [];
		$scope.complaint_types.course_code = "";
		$scope.complaint_types.mode = "";
		$scope.complaint_types.session = "";
		$scope.complaint_types.excpected_cgpa = "";
		$scope.complaint_types.others = "";
		$scope.complaint_types.department = "";
		//alert();
		
	}
		
	$scope.lodge_complain = function(complaint_types)
	{ 
	$scope.compulsory_items = [];
	//// validation of selections
		if($scope.complaint_types.description == 'Missing Result' || $scope.complaint_types.description == 'Incorrect Result' 
		     || $scope.complaint_types.description == 'Incorrect Score') $scope.compulsory_items = 
			          [$scope.complaint_types.course_code, $scope.complaint_types.session, 'Course Code and Session are Compulsory' ];
		if($scope.complaint_types.description == 'Incorrect Department') $scope.compulsory_items = 
		     [$scope.complaint_types.department, 'Your new department is compulsory' ]
		if($scope.complaint_types.description == 'Incorrect CGPA') $scope.compulsory_items = 
		      [$scope.complaint_types.excpected_cgpa, $scope.complaint_types.session, 'Expected CGPA and CGPA session are compulsory' ]
		if($scope.complaint_types.description == 'Incorrect Mode of Entry') $scope.compulsory_items = 
		      [$scope.complaint_types.mode, $scope.complaint_types.session, 'Entry Mode and Session of Entry are compulsory' ]
		if($scope.complaint_types.description == 'Others') $scope.compulsory_items = 
		       [$scope.complaint_types.others, 'state the complaint in the provided text space' ]
			
			
			//alert(JSON.stringify($scope.complaint_types) )	
		//////////// response to invalid entries
		$scope.complaint_types.matric_no = $scope.user_details.username;
		if($scope.complaint_types.description == 'Others') $scope.complaint_types.description1 = $scope.complaint_types.others;
		
		if($scope.complaint_types.description == 'Missing Result' || $scope.complaint_types.description == 'Incorrect Result' 
		   || $scope.complaint_types.description == 'Incorrect Score') 
		  { 
			if(!check_nullity($scope.compulsory_items))	
				{Data.toast({"status":"error", "message": $scope.compulsory_items[$scope.compulsory_items.length-1]});
				}else
				{
					//alert(JSON.stringify($scope.complaint_types));
					send_complaint($scope.complaint_types);
					//alert(JSON.stringify(outcome));
				}
			//
		  }else
		  
		  if($scope.complaint_types.description == 'Incorrect Department')
		  { 
			if(!check_nullity($scope.compulsory_items))	
				{Data.toast({"status":"error", "message": $scope.compulsory_items[$scope.compulsory_items.length-1]});
				}else
				{
					//alert(JSON.stringify($scope.complaint_types));
					send_complaint($scope.complaint_types);
				}
			//
		  } else
		  
		  if($scope.complaint_types.description == 'Incorrect CGPA')
		  { //alert(JSON.stringify($scope.compulsory_items))
			if(!check_nullity($scope.compulsory_items))	
				{Data.toast({"status":"error", "message": $scope.compulsory_items[$scope.compulsory_items.length-1]});
				}else
				{
					//alert(JSON.stringify($scope.complaint_types));
					send_complaint($scope.complaint_types);
				}
			//
		  } else
		  
		  if($scope.complaint_types.description == 'Incorrect Mode of Entry')
		  {
			if(!check_nullity($scope.compulsory_items))	
				{Data.toast({"status":"error", "message": $scope.compulsory_items[$scope.compulsory_items.length-1]});
				}else
				{
					//alert(JSON.stringify($scope.complaint_types));
					send_complaint($scope.complaint_types);
				}
			//
		  } else
		  
		  if($scope.complaint_types.description == 'Others')
		  { 
			if(!check_nullity($scope.compulsory_items))	
				{Data.toast({"status":"error", "message": $scope.compulsory_items[$scope.compulsory_items.length-1]});
				}else
				{
					//alert(JSON.stringify($scope.complaint_types));
					send_complaint($scope.complaint_types);
				}
			//
		  }
			
		//alert(JSON.stringify(complaint_types))
	}

	function check_nullity(array_items)
	{
		test_flag = true;
		for (i=0; i<= array_items.length-2; i++)
		{
			if(array_items[i] =="")
			{ test_flag = false;
				//alert(array_items[i]);
				break;
			}
		}
		
		return test_flag;
		
	}
	
	function send_complaint(data)
	{
		send_back = {};
		$http.post("backend/sqlprocesses.php?send_complaint=yes", {"complaint_data":data})
		.success(function(response)
			{
				send_back.status = response.status;
				send_back.message = response.message;
				Data.toast({"status":response.status, "message": response.message});

			})
		.error(function(err_message)
		{
				send_back.status = "error";
				send_back.message = "There was a network problem. Please try again";
				Data.toast({"status":"error", "message": send_back.message});

			
		})
	}
	
});



myApp.controller("tellerCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
		$rootScope.content_loaded = true;
		$scope.bio_data = $localStorage.bio_data;
		//alert(JSON.stringify($scope.bio_data))
		$scope.member = {
			member_id: "",
			teller_number:"",
			amount:"",
			bank:"",
			description:"",
			others : "",
			year : ""
			}
		$scope.uploadProfilePicture1 = function(files) {
				var fd1 = new FormData();
					fd1.append("file", files[0]);
					var profilePictureFilename = 1234;
					fd1.append("name", profilePictureFilename);
					fd1.append("member_id", $scope.member.member_id);
					fd1.append("teller_number", $scope.member.teller_number);
					fd1.append("amount", $scope.member.amount);
					fd1.append("bank", $scope.member.bank);
					fd1.append("description", $scope.member.description);
					fd1.append("others", $scope.member.others);
					fd1.append("year", $scope.member.year);
					$scope.fd1 = fd1;
					
				};
		
	$scope.the_years = [];
	$scope.todaysDate = new Date();
	$scope.yyyy = $scope.todaysDate.getFullYear();
	for (i= $scope.yyyy; i>$scope.yyyy - 10; i--)
	{
		$scope.the_years.push(i)
	}
	//alert(JSON.stringify($scope.the_years));
$http.get("backend/sqlprocesses.php?get_payments=yes")
		.success(function(response) {
		   if(response.status === "ok"){
			$scope.payments = response.data;
			//alert(JSON.stringify($scope.payments))
			}
			else if(response.status === "not ok"){
			message_code = {status: 'error', message: 'No Lecturer was assigned to this course. Please try again'};
			Data.toast(message_code);
			$scope.show_next_courses_btn = false;

			
			}
			//alert();
			$scope.indicators_flags[the_index]	= false;
		})
		.error(function(data) {
			$scope.indicators_flags[the_index]	= false;
			message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
			Data.toast(message_code);
			
		});

		
$scope.uploadProfilePictureExt = function() {
			if( $scope.fd1===undefined)
			{
			   message_code = {status: 'error', message: "Please select a file before you upload"};
			   Data.toast(message_code);
			}
			else
			{

			$http.post("backend/upload_teller.php?what=payment_evidences", $scope.fd1, {withCredentials: true, headers: 
					  {'Content-Type': undefined },transformRequest: angular.identity })
			.success(function(data){
				if(data.status =='ok')
				{
				  message_code = {status: 'success', message: 'The Teller has been uploaded successfully'};
				  Data.toast(message_code);
				}
				
				if(data.status =='exist')
				{
				  message_code = {status: 'error', message: 'This transaction already exists'};
				  Data.toast(message_code);
				}
				if(data.status =='not ok')
				{
				  message_code = {status: 'error', message: 'This transaction was not successful. Please try again'};
				  Data.toast(message_code);
				}			  })
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
	
})

myApp.controller("studentDashCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	$scope.course_registered =  [];
	$scope.course_registered = $localStorage.course_registered;
	$scope.courses_assessed = [];
	$scope.number_of_lecturers = [];
	$scope.number_of_lecturers = $localStorage.number_of_lecturers;
	
	
	$scope.all_the_lecturers = [];
	$scope.indicators_flags = [];
	//alert(JSON.stringify($scope.course_registered));
	//alert(JSON.stringify($scope.number_of_lecturers));
	
	/////////////////////// initialise the indicator flags ////////////////////////////////////
	for (i=0; i < $scope.course_registered.length; i++)
	{
		$scope.indicators_flags.push(false);	
	}
	/////////////////////// end of populate indicator flags ///////////////////////////////////
	
	/////////////////////// initialise other scope variables ////////////////////////////////////
	$scope.show_next_courses_btn = false;
	////////////////////// end of initialise other scope variables //////////////////////////////
	
	//alert(JSON.stringify($scope.course_registered))
	$scope.lecturer_info = {};

	
	$scope.comparison_items = [	{id:1, label:"Poor"},
							{id:2, label:"Below Average"},
							{id:3, label:"Average"},
							{id:4, label:"Above Average"},
							{id:5, label:"Outstanding"}]
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
	$scope.comparisonIR = $scope.assessment_data.comparisonIR;

	//////////////////////////// navigator array ////////////////////////////////////////////////////////////////
	$scope.the_index = 0;
	$scope.navigators = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
	$scope.navigators[$scope.the_index] = true;
	//////////////////////////// end of navigator ///////////////////////////////////////////////////////////////
	
	//////////////////////////////// scores array //////////////////////////////////////////////////////////////
	$scope.individual_score = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	/////////////////////////////// end of score array /////////////////////////////////////////////////////////


	//////////////////////////////// individual_flags //////////////////////////////////////////////////////////////
	$scope.individual_flags = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
	/////////////////////////////// end of individual_flags /////////////////////////////////////////////////////////
	
	
	///////////////////////////// comparison change /////////////////////////////////////////////////////////////
	$scope.comparisonIR_change = function(the_value)
	{
		
		//alert(the_value)
		//alert(JSON.stringify($scope.individual_flags));
		if(the_value != '')	$scope.individual_flags[10] = true;
		if(the_value == '')	$scope.individual_flags[10] = false;

		
	}
	///////////////////////////// end of comparison change //////////////////////////////////////////////////////

	//////////////// function calculate scores //////////////////////////////////////////////////////////////////
	$scope.calculate_scores = function (assessment_data, length, position)
	{
		counter = 0;
		score = 0;
		maximum_score = 5;
		$scope.individual_flags[position] = false;
		$scope.individual_score[position] = 0;
		angular.forEach(assessment_data, function(value, key) {
					if(value != "")
						{
							score = score + parseInt(value);
							counter++;
						}
		});
		if(counter == length) $scope.individual_flags[position] = true;
		$scope.individual_score[position] = counter == 0 ? 0 : ((score/(counter * maximum_score))*100).toFixed(2);
		
		individual_score_sum = 0;
		////////////////////////////////////// count assessed options ///////////////////////////////
		total_assessed_options = 0;
		for (i = 0; i < $scope.individual_score.length; i++)
		{
			if($scope.individual_score[i] > 0) total_assessed_options++;
		}
		///////////////////////////////////// end of count assessed options /////////////////////////
		
		//////////////////////////////// calculate total performance ////////////////////////////////
		for (i = 0; i < $scope.individual_score.length; i++)
		{
			individual_score_sum = parseInt(individual_score_sum) +  parseInt($scope.individual_score[i]);
			//alert(individual_score_sum);
		}
		//alert(total_assessed_options);
		$scope.performance = total_assessed_options == 0 ? 0 :((individual_score_sum.toFixed(2))/total_assessed_options).toFixed(2);
		///////////////////////////////// end of calculate total performance ///////////////////////
		
		//alert(JSON.stringify($scope.assessment_data.lecturer_assessment.enthusiasm._2) );
		
	}
	//////////////// end of function calculate scores ///////////////////////////////////////////////////////////
	
	$scope.state_of_checkbox = false;
	$scope.lecturer_selected = false; 
	
	/////////////////////////////// fetch the lectuerer for assessment ///////////////////////////////////////////
	$scope.assess_the_lecturer = function(course_id, pfnumber)
	{
	
	////////////////// initialization of the assessment data /////////////////////////////////////////////////////////////////////////////////
	//alert("another assessment");
	$scope.individual_score = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	$scope.navigators = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
	$scope.individual_flags = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
	$scope.navigators[$scope.the_index] = true;
	$scope.performance = 0;
	$scope.assessment_data = 
							{	
							comparisonIR:"",
							lecturer_assessment :
										{ 	enthusiasm:
											{_1:"",
											 _2:""
												
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
				////////////////// end of initialization /////////////////////////////////////////////////////////////////////////////////
				$scope.lecturer_info = get_the_lecturer_from_all_the_lecturer(course_id, pfnumber);
		
				//$scope.course_being_assessed = course_title;
				$scope.show_scoreboard =true;
				$scope.show_next_courses_btn = true;
				//////////////////// navigate to the bext slide ////////////////////////////////////
				for ( i=0; i< $scope.navigators.length; i++)
				{
					$scope.navigators[i] = false;
					
				}
					$scope.lecturer_selected = true; 
					if(!$scope.the_index < $scope.navigators.length - 1) $scope.the_index++;
					$scope.navigators[$scope.the_index] = true;
				////////////////////////// end of navigate to the next slide ////////////////////////

		
	
	}
	//////////////////////////////// end of fetch the lecturer for assessment ////////////////////////////////////
	
	
	
	/////////////////////////////// get_the_lecturer_course_student_info //////////////////////////////////////////
	function get_the_lecturer_course_student_info()
	{
		$http.post("backend/sqlprocesses.php?get_lecturer_course_student_info=yes", {"course_id": course_id, "student_id_fk": $scope.bio_data.student_id_fk})
		.success(function(response) {
		   if(response.status === "ok"){
				$scope.get_lecturer_course_student_info = response.data
				//////////// todo update the lecturer_info
			}
			else if(response.status === "not ok"){
			message_code = {status: 'error', message: 'No Lecturer was assigned to this course. Please try again'};
			Data.toast(message_code);

			
			}
			//alert();
			$scope.indicators_flags[the_index]	= false;
		})
		.error(function(data) {
			message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
			Data.toast(message_code);
			
		});
	}
	////////////////////////////// get_the_lecturer_course_student_info  //////////////////////////////////////////
	
	
	function get_the_lecturer_from_all_the_lecturer(course_id, pfnumber)
	{
		the_object = {};
		angular.forEach($scope.all_the_lecturers, function(value, key) {
					if(value.course_id_fk == course_id && value.pfnumber == pfnumber)
						{
							the_object = value;
						}
		});
		return the_object;
	}
	
	
	/////////////////////////////// initialization of the assessment_data //////////////////////////////////////////////////
	
	/////////////////////////////// end of initialization of the assessment_data ///////////////////////////////////////////
	
	
	$scope.student_course_assessment = [];

	/////////////////////////////// fetch the get_all_the_lecturers for assessment ///////////////////////////////////////////
	$scope.get_all_the_lecturers = function(course_id, course_title, the_index)
	{
		$scope.assessment_data = 
							{	student_matric_no : "",
								lecturer_id : "",
								course_code : "",
								lecturer_assessment :
										{ 	enthusiasm:"",
											warmth : "",
											credibility : "",
											expectation_for_success :"",
											encouraging_and_patient : "",
											professional : "",
											adaptability : "",
											knowledgeable :"",
											pedagogy : "",
											assessment_of_student : "",
											any_other_comment : ""										
										},
								total_score :$scope.performance
							}
		$scope.indicators_flags[the_index]	= true;
		$scope.performance = 0 ;
		//////////////// fetch the lecturers that took the course from the backend /////////////////////////////////
		$http.post("backend/sqlprocesses.php?get_lecturer=yes", {"course_id": course_id, "student_id_fk": $scope.bio_data.student_id_fk})
		.success(function(response) {
		   if(response.status === "ok"){
				$scope.all_the_lecturers = response.data
				for ( i=0; i< $scope.navigators.length; i++)
				{
					$scope.navigators[i] = false;
					
				}
					if(!$scope.the_index < $scope.navigators.length - 1) $scope.the_index++;
					$scope.navigators[$scope.the_index] = true;
					$scope.lecturer_selected = false; 
				////////////////////////// end of navigate to the next slide ////////////////////////


			}
			else if(response.status === "not ok"){
			message_code = {status: 'error', message: 'No Lecturer was assigned to this course. Please try again'};
			Data.toast(message_code);
			$scope.show_next_courses_btn = false;

			
			}
			//alert();
			//////////////////////////////////////////////////// get student course assessment //////////////////////////////////////
			$scope.all_assessed_courses = [];
			$http.post("backend/sqlprocesses.php?get_lecturer_course_student_info=yes", 
			    {"course_id": course_id, "student_id_fk": $scope.bio_data.student_id_fk})
			.success(function(res) {
				/////////////// intailise all the assessment property
					for (j=0; j< $scope.all_the_lecturers.length; j++)
					{
						$scope.all_the_lecturers[j].assessed = false;
						
					}
				/////////////// end of initialise all the assessment property //////////////
				
			   if(res.status === "ok"){
				   	$scope.all_assessed_courses = res.data;
					//$scope.get_lecturer_course_student_info = response.data
					//////////// todo update the lecturer_info
					for(i=0; i< $scope.all_the_lecturers.length; i++)
					{
						angular.forEach($scope.all_assessed_courses, function(value, key) {
							//alert(value.course_id_fk + "," + $scope.all_the_lecturers[i].course_id_fk + " | " +  value.pf_number + "," +  $scope.all_the_lecturers[i].pfnumber )
							if( (value.course_id_fk == $scope.all_the_lecturers[i].course_id_fk) && (value.pf_number == $scope.all_the_lecturers[i].pfnumber ) )
								{
									$scope.all_the_lecturers[i].assessed = true;
								}
						});
				
					}
					//alert(JSON.stringify($scope.all_the_lecturers))

				}
				else if(res.status === "not ok"){
				message_code = {status: 'error', message: 'No assessment. contact the admin'};
				//Data.toast(message_code);
	
				
				}
				//alert();
				$scope.indicators_flags[the_index]	= false;
			})
			.error(function(data) {
				message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
				Data.toast(message_code);
				
			});
			//////////////////////////////////////////////////// end of get student course assessment ///////////////////////////////
			$scope.student_course_assessment = 
			$scope.indicators_flags[the_index]	= false;
		})
		.error(function(data) {
			$scope.indicators_flags[the_index]	= false;
			message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
			Data.toast(message_code);
			
		});
		////////////////// end of fetch the lecturer from the back end ////////////////////////////////////////////////
		$scope.show_scoreboard =false;
	}
	//////////////////////////////// end of get_all_the_lecturers for assessment ////////////////////////////////////
	
	
	
	
	
	/////////////////////////////// searching for courses ///////////////////////////////////////////////////////
	
	$scope.courses = $scope.course_registered;
	//alert(JSON.stringify($scope.courses));
	$scope.currentPage = 1; //current page
	$scope.entryLimit = 20; //max no of items to display in a page
	$scope.filteredItems = $scope.courses.length; //Initially for no filter  
	$scope.totalItems = $scope.courses.length;
	//$scope.numPages =5;
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
	
	
	
	
	
	
	////////////////////////////////// searching for lecturers /////////////////////////////////////////////////
	
	
	////////////////////////////////// end of searching for lectrurers /////////////////////////////////////////
	
	////////////////////////////////// initialization of the widgets for a new assessment //////////////////////
	$scope.initialize = function()
	{
	$scope.start_assessment_btn(1);	
		
		
	}
	////////////////////////////////// end of initialization of the widgets for a new assessments //////////////
	
	//////////////////////////////////////// start Assessment //////////////////////////////////////////////////
	$scope.start_assessment_btn = function(the_index)
	{
	for ( i=0; i< $scope.navigators.length; i++)
	{
		$scope.navigators[i] = false;
		
	}
		$scope.navigators[the_index] = true;
		$scope.the_index = the_index;

	}
	//////////////////////////////////////// End Assessment  ///////////////////////////////////////////////////
	
	//////////////////////////////////////// previous_rating_btn //////////////////////////////////////////////////
	$scope.previous_rating_btn = function()
	{
	for ( i=0; i< $scope.navigators.length; i++)
	{
		$scope.navigators[i] = false;
		
	}
		if($scope.the_index > 0) $scope.the_index--;
		$scope.navigators[$scope.the_index] = true;
	}
	//////////////////////////////////////// End of previous_rating_btn ////////////////////////////////////////////
	
	////////////////////////////////////////  next_rating_btn //////////////////////////////////////////////////
	$scope.next_rating_btn = function()
	{
		for ( i=0; i< $scope.navigators.length; i++)
		{
			$scope.navigators[i] = false;
			
		}
			if(!$scope.the_index < $scope.navigators.length - 1) $scope.the_index++;
			$scope.navigators[$scope.the_index] = true;
		}
	//////////////////////////////////////// End of next_rating_btn ////////////////////////////////////////////
	
	
	//////////////////////////////////////// previous_course_btn //////////////////////////////////////////////////
	$scope.previous_courses_btn = function()
	{
	for ( i=0; i< $scope.navigators.length; i++)
	{
		$scope.navigators[i] = false;
		
	}
		if($scope.the_index > 0) $scope.the_index--;
		$scope.navigators[$scope.the_index] = true;
	}
	//////////////////////////////////////// End of previous_course_btn ////////////////////////////////////////////
	
	////////////////////////////////////////  next_course_btn //////////////////////////////////////////////////
	$scope.next_courses_btn = function(the_index)
	{
		$scope.show_scoreboard =true;

		for ( i=0; i< $scope.navigators.length; i++)
		{
			$scope.navigators[i] = false;
			
		}
			if(!$scope.the_index < $scope.navigators.length - 1) $scope.the_index++;
			$scope.navigators[$scope.the_index] = true;
		}
	//////////////////////////////////////// End of next_course_btn ////////////////////////////////////////////
	
	
	//////////////////////////////////////// previous_any_other_comment_btn //////////////////////////////////////////////////
	$scope.previous_any_other_comment_btn = function()
	{
	$scope.show_scoreboard =true;
	for ( i=0; i< $scope.navigators.length; i++)
	{
		$scope.navigators[i] = false;
		
	}
		if($scope.the_index > 0) $scope.the_index--;
		$scope.navigators[$scope.the_index] = true;
	}
	//////////////////////////////////////// End of previous_any_other_comment_btn ////////////////////////////////////////////
	
	////////////////////////////////////////  next_any_other_comment_btn //////////////////////////////////////////////////
	$scope.next_any_other_comment_btn = function(the_index)
	{
	$scope.show_scoreboard =false;
		for ( i=0; i< $scope.navigators.length; i++)
		{
			$scope.navigators[i] = false;
			
		}
			if(!$scope.the_index < $scope.navigators.length - 1) $scope.the_index++;
			$scope.navigators[$scope.the_index] = true;
		}
	//////////////////////////////////////// End of next_any_other_comment_btn ////////////////////////////////////////////
	
	//////////////////////////////////////// previous_lecturers_btn //////////////////////////////////////////////////
	$scope.previous_lecturers_btn = function()
	{
	$scope.show_scoreboard =true;
	for ( i=0; i< $scope.navigators.length; i++)
	{
		$scope.navigators[i] = false;
		
	}
		if($scope.the_index > 0) $scope.the_index--;
		$scope.navigators[$scope.the_index] = true;
	}
	//////////////////////////////////////// End of previous_lecturers_btn ////////////////////////////////////////////
	
	////////////////////////////////////////  next_lecturers_btn //////////////////////////////////////////////////
	$scope.next_lecturers_btn = function(the_index)
	{
	$scope.show_scoreboard =false;
		for ( i=0; i< $scope.navigators.length; i++)
		{
			$scope.navigators[i] = false;
			
		}
			if(!$scope.the_index < $scope.navigators.length - 1) $scope.the_index++;
			$scope.navigators[$scope.the_index] = true;
		}
	//////////////////////////////////////// End of next_lecturers_btn ////////////////////////////////////////////
	
	//////////////////////////////////////// previous_enthusiasm_btn //////////////////////////////////////////////////
	$scope.previous_enthusiasm_btn = function()
	{
	for ( i=0; i< $scope.navigators.length; i++)
	{
		$scope.navigators[i] = false;
		
	}
		if($scope.the_index > 0) $scope.the_index--;
		$scope.navigators[$scope.the_index] = true;
	}
	//////////////////////////////////////// End of previous_enthusiasm_btn ////////////////////////////////////////////
	
	////////////////////////////////////////  next_enthusiasm_btn //////////////////////////////////////////////////
	$scope.next_enthusiasm_btn = function(the_index)
	{
		for ( i=0; i< $scope.navigators.length; i++)
		{
			$scope.navigators[i] = false;
			
		}
			if(!$scope.the_index < $scope.navigators.length - 1) $scope.the_index++;
			$scope.navigators[$scope.the_index] = true;
		}
	//////////////////////////////////////// End of next_enthusiasm_btn ////////////////////////////////////////////
	


	//////////////////////////////////////// previous_warmth_btn //////////////////////////////////////////////////
	$scope.previous_warmth_btn = function()
	{
	for ( i=0; i< $scope.navigators.length; i++)
	{
		$scope.navigators[i] = false;
		
	}
		if($scope.the_index > 0) $scope.the_index--;
		$scope.navigators[$scope.the_index] = true;
	}
	//////////////////////////////////////// End of previous_warmth_btn ////////////////////////////////////////////
	
	////////////////////////////////////////  next_warmth_btn //////////////////////////////////////////////////
	$scope.next_warmth_btn = function(the_index)
	{
		for ( i=0; i< $scope.navigators.length; i++)
		{
			$scope.navigators[i] = false;
			
		}
			if(!$scope.the_index < $scope.navigators.length - 1) $scope.the_index++;
			$scope.navigators[$scope.the_index] = true;
		}
	//////////////////////////////////////// End of next_warmth_btn ////////////////////////////////////////////
	
	
	
	//////////////////////////////////////// previous_credibility_btn //////////////////////////////////////////////////
	$scope.previous_crdeibilty_btn = function()
	{
	for ( i=0; i< $scope.navigators.length; i++)
	{
		$scope.navigators[i] = false;
		
	}
		if($scope.the_index > 0) $scope.the_index--;
		$scope.navigators[$scope.the_index] = true;
	}
	//////////////////////////////////////// End of previous_credibility_btn ////////////////////////////////////////////
	
	////////////////////////////////////////  next_crdibility_btn //////////////////////////////////////////////////
	$scope.next_crdeibilty_btn = function(the_index)
	{
		for ( i=0; i< $scope.navigators.length; i++)
		{
			$scope.navigators[i] = false;
			
		}
			if(!$scope.the_index < $scope.navigators.length - 1) $scope.the_index++;
			$scope.navigators[$scope.the_index] = true;
		}
	//////////////////////////////////////// End of next_credibility_btn ////////////////////////////////////////////


	//////////////////////////////////////// previous_expectationFS_btn //////////////////////////////////////////////////
	$scope.previous_expectationFS_btn = function()
	{
	for ( i=0; i< $scope.navigators.length; i++)
	{
		$scope.navigators[i] = false;
		
	}
		if($scope.the_index > 0) $scope.the_index--;
		$scope.navigators[$scope.the_index] = true;
	}
	//////////////////////////////////////// End of previous_expectationFS_btn ////////////////////////////////////////////
	
	////////////////////////////////////////  next_expectationFS_btn //////////////////////////////////////////////////
	$scope.next_expectationFS_btn = function(the_index)
	{
		for ( i=0; i< $scope.navigators.length; i++)
		{
			$scope.navigators[i] = false;
			
		}
			if(!$scope.the_index < $scope.navigators.length - 1) $scope.the_index++;
			$scope.navigators[$scope.the_index] = true;
		}
	//////////////////////////////////////// End of next_expectationFS_btn ////////////////////////////////////////////

	//////////////////////////////////////// previous_encouragingP_btn //////////////////////////////////////////////////
	$scope.previous_encouragingP_btn = function()
	{
	for ( i=0; i< $scope.navigators.length; i++)
	{
		$scope.navigators[i] = false;
		
	}
		if($scope.the_index > 0) $scope.the_index--;
		$scope.navigators[$scope.the_index] = true;
	}
	//////////////////////////////////////// End of previous_encouragingP_btn ////////////////////////////////////////////
	
	////////////////////////////////////////  next_encouragingP_btn //////////////////////////////////////////////////
	$scope.next_encouragingP_btn = function(the_index)
	{
		for ( i=0; i< $scope.navigators.length; i++)
		{
			$scope.navigators[i] = false;
			
		}
			if(!$scope.the_index < $scope.navigators.length - 1) $scope.the_index++;
			$scope.navigators[$scope.the_index] = true;
		}
	//////////////////////////////////////// End of next_encouragingP_btn ////////////////////////////////////////////


	//////////////////////////////////////// previous_professional_btn //////////////////////////////////////////////////
	$scope.previous_professional_btn = function()
	{
	for ( i=0; i< $scope.navigators.length; i++)
	{
		$scope.navigators[i] = false;
		
	}
		if($scope.the_index > 0) $scope.the_index--;
		$scope.navigators[$scope.the_index] = true;
	}
	//////////////////////////////////////// End of previous_professional_btn ////////////////////////////////////////////
	
	////////////////////////////////////////  next_professional_btn //////////////////////////////////////////////////
	$scope.next_professional_btn = function(the_index)
	{
		for ( i=0; i< $scope.navigators.length; i++)
		{
			$scope.navigators[i] = false;
			
		}
			if(!$scope.the_index < $scope.navigators.length - 1) $scope.the_index++;
			$scope.navigators[$scope.the_index] = true;
		}
	//////////////////////////////////////// End of next_professional_btn ////////////////////////////////////////////



	//////////////////////////////////////// previous_adaptability_btn //////////////////////////////////////////////////
	$scope.previous_adaptability_btn = function()
	{
	for ( i=0; i< $scope.navigators.length; i++)
	{
		$scope.navigators[i] = false;
		
	}
		if($scope.the_index > 0) $scope.the_index--;
		$scope.navigators[$scope.the_index] = true;
	}
	//////////////////////////////////////// End of previous_adaptability_btn ////////////////////////////////////////////
	
	////////////////////////////////////////  next_adaptability_btn //////////////////////////////////////////////////
	$scope.next_adaptability_btn = function(the_index)
	{
		for ( i=0; i< $scope.navigators.length; i++)
		{
			$scope.navigators[i] = false;
			
		}
			if(!$scope.the_index < $scope.navigators.length - 1) $scope.the_index++;
			$scope.navigators[$scope.the_index] = true;
		}
	//////////////////////////////////////// End of next_adaptability_btn ////////////////////////////////////////////
	
	
	
	
	//////////////////////////////////////// previous_knowledgeable_btn //////////////////////////////////////////////////
	$scope.previous_knowledgeable_btn = function()
	{
	for ( i=0; i< $scope.navigators.length; i++)
	{
		$scope.navigators[i] = false;
		
	}
		if($scope.the_index > 0) $scope.the_index--;
		$scope.navigators[$scope.the_index] = true;
	}
	//////////////////////////////////////// End of previous_knowledgeable_btn ////////////////////////////////////////////
	
	////////////////////////////////////////  next_knowledgeable_btn //////////////////////////////////////////////////
	$scope.next_knowledgeable_btn = function(the_index)
	{
		for ( i=0; i< $scope.navigators.length; i++)
		{
			$scope.navigators[i] = false;
			
		}
			if(!$scope.the_index < $scope.navigators.length - 1) $scope.the_index++;
			$scope.navigators[$scope.the_index] = true;
		}
	//////////////////////////////////////// End of next_knowledgeable_btn ////////////////////////////////////////////



	//////////////////////////////////////// previous_pedagogy_btn //////////////////////////////////////////////////
	$scope.previous_pedagogy_btn = function()
	{
	for ( i=0; i< $scope.navigators.length; i++)
	{
		$scope.navigators[i] = false;
		
	}
		if($scope.the_index > 0) $scope.the_index--;
		$scope.navigators[$scope.the_index] = true;
	}
	//////////////////////////////////////// End of previous_pedagogy_btn ////////////////////////////////////////////
	
	////////////////////////////////////////  next_pedagogy_btn //////////////////////////////////////////////////
	$scope.next_pedagogy_btn = function(the_index)
	{
		for ( i=0; i< $scope.navigators.length; i++)
		{
			$scope.navigators[i] = false;
			
		}
			if(!$scope.the_index < $scope.navigators.length - 1) $scope.the_index++;
			$scope.navigators[$scope.the_index] = true;
		}
	//////////////////////////////////////// End of next_pedagogy_btn ////////////////////////////////////////////

	///////////////////////////////////////// previous_comparison_btn //////////////////////////////////////////
	$scope.previous_comparison_btn = function()
	{
	for ( i=0; i< $scope.navigators.length; i++)
	{
		$scope.navigators[i] = false;
		
	}
		if($scope.the_index > 0) $scope.the_index--;
		$scope.navigators[$scope.the_index] = true;
	}
	//////////////////////////////////////// End of previous_comparison_btn ///////////////////////////////////
	
	
	////////////////////////////////////////  next_comparison_btn //////////////////////////////////////////////////
	$scope.next_comparison_btn = function(the_index)
	{
		for ( i=0; i< $scope.navigators.length; i++)
		{
			$scope.navigators[i] = false;
			
		}
			if(!$scope.the_index < $scope.navigators.length - 1) $scope.the_index++;
			$scope.navigators[$scope.the_index] = true;
			
	}
	//////////////////////////////////////// End of next_comparison_btn ////////////////////////////////////////////


	//////////////////////////////////////// previous_assessmentOS_btn //////////////////////////////////////////////////
	$scope.previous_assessmentOS_btn = function()
	{
	for ( i=0; i< $scope.navigators.length; i++)
	{
		$scope.navigators[i] = false;
		
	}
		if($scope.the_index > 0) $scope.the_index--;
		$scope.navigators[$scope.the_index] = true;
	}
	//////////////////////////////////////// End of previous_assessmentOS_btn ////////////////////////////////////////////
	
	////////////////////////////////////////  next_assessmentOS_btn //////////////////////////////////////////////////
	$scope.next_assessmentOS_btn = function(the_index)
	{
		for ( i=0; i< $scope.navigators.length; i++)
		{
			$scope.navigators[i] = false;
			
		}
			if(!$scope.the_index < $scope.navigators.length - 1) $scope.the_index++;
			$scope.navigators[$scope.the_index] = true;
		}
	//////////////////////////////////////// End of next_assessmentOS_btn ////////////////////////////////////////////



	//////////////////////////////////////// previous_assessmentP_btn //////////////////////////////////////////////////
	$scope.previous_assessmentP_btn = function()
	{
	for ( i=0; i< $scope.navigators.length; i++)
	{
		$scope.navigators[i] = false;
		
	}
		if($scope.the_index > 0) $scope.the_index--;
		$scope.navigators[$scope.the_index] = true;
	}
	//////////////////////////////////////// End of previous_assessmentP_btn ////////////////////////////////////////////
	
	////////////////////////////////////////  next_assessmentPSubmit_btn //////////////////////////////////////////////////
	$scope.next_assessmentPSubmit_btn = function()
	{
		//alert(JSON.stringify($scope.assessment_data)); //=$scope.assessment_data.comparisonIR.id;
		$scope.full_data = {
					lecturer_data:$scope.assessment_data,
					course_data:$scope.lecturer_info,
					performance_rating: $scope.performance,
					student_info: $scope.bio_data
			}
	//alert(JSON.stringify($scope.full_data));	
		$http.post("backend/sqlprocesses.php?submit_assessment=yes", {"the_data": $scope.full_data})
		.success(function(response) {
		   if(response.status === "submitted"){
			   recieved_course = response.course;
			   $scope.pfnumber = response.pfnumber;
					angular.forEach($scope.courses, function(value, key) {
						if( value._id == recieved_course )
							{
								$scope.courses[key].assessed = true;
							}
					});
					//$scope.initialize();
					alert("Your Assessment has been submitted")
	 				location.reload();
			
			}
			else if(response.status === "not ok"){
			message_code = {status: 'error', message: 'Assessment Submission was not successful'};
			Data.toast(message_code);
			$scope.show_next_courses_btn = false;

			
			}
		})
		.error(function(data) {
			$scope.indicators_flags[the_index]	= false;
			message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
			Data.toast(message_code);
			
		});
	///////////////////////////////////// submit the data ////////////////////////////////////////////////////////////////////////////	


	}
	//////////////////////////////////////// End of next_assessmentPSubmit_btn ////////////////////////////////////////////

		$scope.start_assessment_flag = true;
	////////////////////////////////////// course assesed ////////////////////////////////////////////////////////////////
	if($scope.bio_data == null)
	{
		alert("No registration information for you. Contact the site administrator");
		$scope.start_assessment_flag = false;
	}else
	{
	    //alert(JSON.stringify($scope.number_of_lecturers));
	$http.post("backend/sqlprocesses.php?courses_assessed=yes", {"my_data": $scope.bio_data})
		.success(function(response) {
				for(i=0; i < $scope.courses.length; i++)
				{
						$scope.courses[i].assessed = false;
						$scope.courses[i].no_lecturers = 0;
						angular.forEach($scope.number_of_lecturers, function(value, key) {
							if( value.course_code == $scope.courses[i].code)
								{
									//alert(JSON.stringify(value));
									$scope.courses[i].no_lecturers = parseInt($scope.number_of_lecturers[key].number_of_lecturers);
								}
						});
				}
		   if(response.status === "ok"){
				$scope.courses_assessed = response.data;
				for(i=0; i < $scope.courses_assessed.length; i++)
				{
					/*					angular.forEach($scope.course_registered, function(value, key) {
											if( value._id == $scope.courses_assessed[i].course_id_fk)
												{
													$scope.courses[key].assessed = true;
												}
										});
					*/				
				}
				
				for(i=0; i < $scope.courses.length; i++)
				{
					$scope.courses[i].no_lecturers = 0;
					angular.forEach($scope.number_of_lecturers, function(value, key) {
						if( value.course_code == $scope.courses[i].code)
							{
								//alert(JSON.stringify(value));
								$scope.courses[i].no_lecturers = parseInt($scope.number_of_lecturers[key].number_of_lecturers);
							}
					});
				}
				for(i=0; i < $scope.courses.length; i++)
				{
					$scope.courses[i].total_assessed = 0;
					angular.forEach($scope.courses_assessed, function(value, key) {
						if( value.course_id_fk == $scope.courses[i]._id)
							{
								//alert(JSON.stringify(value));
								$scope.courses[i].total_assessed = parseInt($scope.courses_assessed[key].total);
							}
					});
				}
				
				//alert(JSON.stringify($scope.courses)); $scope.courses[i].no_lecturers = 0;

				
			}
			else if(response.status === "not ok"){
			$scope.show_next_courses_btn = false;
				for(i=0; i < $scope.courses.length; i++)
				{
					$scope.courses[i].total_assessed = 0;
				}
								

//alert(JSON.stringify($scope.courses));

			}
			$rootScope.content_loaded = true;
		})
		.error(function(data) {
			$scope.indicators_flags[the_index]	= false;
			message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
			Data.toast(message_code);
			$rootScope.content_loaded = true;
		});
	}
	/////////////////////////////////////// end of course assessed .//////////////////////////////////////////////////////////////////

});


/*	$http.post("backend/sqlprocesses.php?student_courses_assessed_count=yes", {"my_data": $scope.bio_data})
		.success(function(response) {
			
			alert(JSON.strijngify(response));
			});
*/		



myApp.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});




myApp.controller("assessmentCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	$scope.subjectCombinationStatus = $localStorage.subjectCombinationStatus;
	//////////////////////////////////////// start Assessment //////////////////////////////////////////////////


	//////////////////////////////////////// End Assessment  ///////////////////////////////////////////////////
});




myApp.controller("sampQuestionsCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$scope.samp_q_downloads = $localStorage.samp_q_downloads;
	$scope.bio_data = $localStorage.bio_data;
	
	$scope.jambRegNo = $scope.bio_data.jambRegNo;
	//alert(JSON.stringify($scope.samp_q_downloads));
	
	$scope.download_subjects = 4 + $localStorage.additional_download_subjects;
	//alert($localStorage.additional_download_subjects);
	
	if($scope.jambScore < 200){
		$scope.eligiblity = false;
	}
	else{
		//alert($scope.jambScore);
		$scope.eligiblity = true;
		if($scope.paymentStatus == "NULL" || $scope.paymentStatus == "unpaid" || $scope.paymentStatus === null){
			//alert('unpaid');
			$scope.paid = false;
			$scope.bio_data_completion = false;
		}
		else if($scope.applicant.biodataCompletionLevel < 8){
			$scope.paid = true;
			$scope.bio_data_completion = false;
			$location.path("applicant/applicant-bio-data/"+$scope.jambRegNo);
		}
		else{
			$scope.paid = true;
			$scope.bio_data_completion = true;
		}
	}
	
	$scope.serviceBase = 'backend/';
	
	$http.get($scope.serviceBase+"authentication.php?action=getSampleSubjects")
	.success(function(data) {
		if(data.status === "success"){
			samp_subjects = data.sample_subjects;
			$scope.samp_subjects = Array();
			
			for(var i = 0; i < samp_subjects.length; i++) {
				locked = checkSubjectLock($scope.samp_q_downloads, samp_subjects[i]['samp_qid']);
				
				$scope.samp_subjects[i] = {
								samp_qid: samp_subjects[i]['samp_qid'],
								subject: samp_subjects[i]['subject'],
								filename: samp_subjects[i]['filename'],
								display_download: true,
								locked: locked
							}
				
				if($scope.samp_q_downloads.length > ($scope.download_subjects - 1)){
					//alert($scope.samp_q_downloads.length);
					if(!$scope.samp_subjects[i]['locked']){
						$scope.samp_subjects[i]['display_download'] = false;
					}
				}
			}
			//alert(JSON.stringify($scope.samp_subjects));
		}
	})
	.error(function(data) {
		$scope.hasError = "A network connection problem error occured while signing in. Please try again";
	});
	
    $scope.downloadQuestions = function (subject) {
		var samp_qid = subject['samp_qid'];
		var jambRegNo = $scope.jambRegNo;
		$scope.download_subjects = 4 + $localStorage.additional_download_subjects;
		//alert($scope.download_subjects);
		//alert(subject['samp_qid']);
		
		if($scope.samp_q_downloads.length < $scope.download_subjects){
			//alert($scope.serviceBase);
			$http.get($scope.serviceBase+"authentication.php?action=save_question_download&&jambRegNo="+jambRegNo+"&&samp_qid="+samp_qid)
			.success(function(data) {
				//alert(JSON.stringify(data));
				if(data.status === "success"){
					subject_exists = false;
					
					for(var k = 0; k < $scope.samp_q_downloads.length; k++) {
						if($scope.samp_q_downloads[k]['samp_qid'] === subject['samp_qid']){
							if(data.status === "success"){
								no_of_downloads = $scope.samp_q_downloads[k]['no_of_downloads'];
								$scope.samp_q_downloads[k]['no_of_downloads'] = no_of_downloads + 1;
							}
							
							subject_exists = true;
							break;
						}
					}
					
					if(!subject_exists){
						i = $scope.samp_q_downloads.length;
				
						$scope.samp_q_downloads[i] = {
											samp_qid: subject['samp_qid'],
											no_of_downloads: 1
										}
						
						for(var j = 0; j < $scope.samp_subjects.length; j++) {
							if($scope.samp_subjects[j]['samp_qid'] === subject['samp_qid']){
								$scope.samp_subjects[j]['locked'] = true;
								//break;
							}
							
							//if($scope.samp_q_downloads.length > 3){
							if($scope.samp_q_downloads.length > ($scope.download_subjects - 1)){
								//alert($scope.samp_q_downloads.length);
								if(!$scope.samp_subjects[j]['locked']){
									$scope.samp_subjects[j]['display_download'] = false;
								}
							}
						}
					}
				}
				
				window.open('backend/saveAs.php?file_source=m.pdf', '_self', '');
			})
			.error(function(data) {
				$scope.hasError = "A network connection problem error occured while signing in. Please try again";
			});
			
		}
		else{
			for(var k = 0; k < $scope.samp_q_downloads.length; k++) {
				if($scope.samp_q_downloads[k]['samp_qid'] === subject['samp_qid']){
					$http.get($scope.serviceBase+"authentication.php?action=save_question_download&&jambRegNo="+jambRegNo+"&& samp_qid="+samp_qid)
					.success(function(data) {
						if(data.status === "success"){
							no_of_downloads = $scope.samp_q_downloads[k]['no_of_downloads'];
							$scope.samp_q_downloads[k]['no_of_downloads'] = no_of_downloads + 1;
							
							//alert($scope.samp_q_downloads[k]['no_of_downloads']);
							window.open('backend/saveAs.php?file_source=m.pdf', '_self', '');
						}
					})
					.error(function(data) {
						$scope.hasError = "A network connection problem error occured while signing in. Please try again";
					});
					
					break;
				}
			}
		}
		//alert(JSON.stringify($scope.samp_q_downloads));
		//var serviceBase = 'backend/';
		
		/**/
	};
	/**/
});

function checkSubjectLock(samp_q_downloads, samp_qid){
	locked = false;
	
	for(var i = 0; i < samp_q_downloads.length; i++) {
		if(samp_q_downloads[i]['samp_qid'] === samp_qid){
			locked = true;
			break;
		}
	}
	
	return locked
}

myApp.controller("paymentSuccessCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $modal){
	$rootScope.content_loaded = false;
	
	$scope.orderId = $routeParams['orderId'];	
	serviceBase = "backend/";
	
	//$rootScope.jambRegNo = $scope.jambRegNo;

	$http.get(serviceBase+"admin.php?action=get_order_applicant_data&&orderId="+$scope.orderId)
	.success(function(data) {
		if(data.status === "success"){
			bio_data = data.applicant_data;
			orderInfo = data.order_info;
			
			$rootScope.bio_data = bio_data;
			$localStorage.bio_data = bio_data;
			
			$scope.orderInfo = orderInfo;
			
			if($rootScope.bio_data.paymentStatus === "paid"){
				$scope.payment_success = true;
			}
			else{
				$location.path("applicant/applicant-dashboard/");
			}
		}
		
		$rootScope.content_loaded = true;
	})
	.error(function(data) {
		message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
		
		$rootScope.content_loaded = true;
		//Data.toast(message_code);
	});
	
});


myApp.controller("paymentSuccessAcceptanceCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $modal){
	$rootScope.content_loaded = false;
	
	$scope.orderId = $routeParams['orderId'];	
	serviceBase = "backend/";
	
	//$rootScope.jambRegNo = $scope.jambRegNo;

	$http.get(serviceBase+"admin.php?action=get_order_applicant_data&&orderId="+$scope.orderId)
	.success(function(data) {
		if(data.status === "success"){
			bio_data = data.applicant_data;
			orderInfo = data.order_info;
			
			$rootScope.bio_data = bio_data;
			$localStorage.bio_data = bio_data;
			
			$scope.orderInfo = orderInfo;
			
			if($rootScope.bio_data.acceptancefee === "paid"){
				$scope.payment_success = true;
			}
			else{
				$location.path("applicant/applicant-dashboard/");
			}
		}
		
		$rootScope.content_loaded = true;
	})
	.error(function(data) {
		message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
		
		$rootScope.content_loaded = true;
		//Data.toast(message_code);
	});
	
});


myApp.controller("paymentErrorCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $modal){
	$rootScope.content_loaded = false;
	
	$scope.errorCde = $routeParams['errorCde'];	
	serviceBase = "backend/";
	
	$scope.networkErr = false;
	$scope.updateApplErr = false;
	$scope.updateOrdrErr = false;
	$scope.paymentErr = false;
	
	if($scope.errorCde === "network-connection"){
		$scope.networkErr = true;
	}
	else if($scope.errorCde === "update-applicant-error"){
		$scope.updateApplErr = true;
	}
	else if($scope.errorCde === "update-order-error"){
		$scope.updateOrdrErr = true;
	}
	else{
		$scope.orderId = $scope.errorCde;
		$scope.paymentErr = true;
		
		$http.get(serviceBase+"admin.php?action=get_order_applicant_data&&orderId="+$scope.orderId)
		.success(function(data) {
			if(data.status === "success"){
				bio_data = data.applicant_data;
				orderInfo = data.order_info;
				
				$rootScope.bio_data = bio_data;
				$localStorage.bio_data = bio_data;
				
				$scope.orderInfo = orderInfo;
				if($scope.orderInfo.pan === ""){
					$scope.orderInfo.pan = "--Nil--";
				}
				//alert(json.stringify($scope.orderInfo));
				
				if($rootScope.bio_data.paymentStatus === "paid"){
					//$scope.payment_success = true;
				}
				else{
					//$location.path("applicant/applicant-dashboard/");
				}
			}
			
			$rootScope.content_loaded = true;	})
		.error(function(data) {
			message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
			
			$rootScope.content_loaded = true;
			//Data.toast(message_code);
		});
	}
	
	//$rootScope.content_loaded = true;
		
});
// reprint receipt stuff
myApp.controller("reprintReceiptCtrl1", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $modal){
	$rootScope.content_loaded = false;
	
	$scope.bio_data = $localStorage.bio_data;	
	$scope.jambRegNo = $scope.bio_data.jambRegNo;	

	$http.post("backend/admin.php?action=get_reprint_order_applicant_data&&jambRegNo="+$scope.jambRegNo)
	.success(function(response) {
	   if(response.status === "success"){
			bio_data = response.applicant_data;
			orderInfo = response.order_info;
			
			$scope.bio_data = bio_data;
			//$localStorage.bio_data = bio_data;
			
			$scope.orderInfo = orderInfo;
			
			//alert(bio_data.acceptanceFee);
			//if(bio_data.paymentStatus === "paid"){
			
			if(bio_data.acceptancefee === "paid"){
				$scope.payment_success = true;
			}
			else{
				$location.path("applicant/applicant-dashboard/");
			}
		}
		else{
			alert("The receipt was not found");
		}
		
		$rootScope.content_loaded = true;
	})
	.error(function(data) {
		message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
		
		$rootScope.content_loaded = true;
	});
	
});

myApp.controller("reprintScreeningReceiptCtrl1", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $modal){
	$rootScope.content_loaded = false;
	
	$scope.bio_data = $localStorage.bio_data;	
	$scope.jambRegNo = $scope.bio_data.jambRegNo;	

	$http.post("backend/admin.php?action=get_reprint_order_screening_applicant_data&&jambRegNo="+$scope.jambRegNo)
	.success(function(response) {
	   if(response.status === "success"){
			bio_data = response.applicant_data;
			orderInfo = response.order_info;
			
			$scope.bio_data = bio_data;
			//$localStorage.bio_data = bio_data;
			
			$scope.orderInfo = orderInfo;
			
			//alert(bio_data.acceptanceFee);
			if(bio_data.paymentStatus === "paid"){
				$scope.payment_success = true;
			}
			else{
				$location.path("applicant/applicant-dashboard/");
			}
		}
		else{
			alert("The receipt was not found");
		}
		
		$rootScope.content_loaded = true;
	})
	.error(function(data) {
		message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
		
		$rootScope.content_loaded = true;
	});
	
});

// clearance documents
myApp.controller("clearanceCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $modal){
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	$scope.subjectCombinationStatus = $localStorage.subjectCombinationStatus;
	$scope.jambRegNo = $scope.bio_data.jambRegNo;
	
	$scope.accept = false;
	

	
	
});


// clearance documents
myApp.controller("acceptanceCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage, $modal){
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	$scope.subjectCombinationStatus = $localStorage.subjectCombinationStatus;
	$scope.jambRegNo = $scope.bio_data.jambRegNo;
	$scope.filename = "signature/"+$scope.jambRegNo +".jpg";
	
	
	

	
	
});




myApp.controller("printMedicalCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.content_loaded = true;
	$scope.bio_data = $localStorage.bio_data;
	$scope.subjectCombinationStatus = $localStorage.subjectCombinationStatus;
	$scope.jambRegNo = $scope.bio_data.jambRegNo;
	$scope.applicantJambNo = {"jambNumber": $scope.jambRegNo}; 
	
	
	$scope.greetings = "Dear";

//$scope.dateArray = new Date();
$scope.showPrint =true;
$scope.admissionOfficer = "Mrs Afolabi ...";
$scope.today ="2016-11-25";
$http.post("backend/sqlprocessesmed.php?getApplicantMedical=yes", $scope.applicantJambNo)
		.success(function(response){
			//alert(JSON.stringify(response));
			if(response.status == "ok")
			{
				$scope.applicant = response.data;
				$scope.medical = response.data1;
				$scope.photo = $scope.applicant.jambRegNo + ".jpg";
				$scope.photo2 = $scope.applicant.jambRegNo + ".JPG";
				$scope.applicant.surname= $scope.applicant.surname.toUpperCase();
				$scope.applicant.middlename=  $scope.applicant.middlename.charAt(0).toUpperCase() + $scope.applicant.middlename.substr(1).toLowerCase()
				$scope.applicant.firstname =  $scope.applicant.firstname.charAt(0).toUpperCase() + $scope.applicant.firstname.substr(1).toLowerCase()
			}
			else if(response.status == "not ok")	
			{
				$scope.message = "Unable to retrieve applicant";
				var modalInstance = $modal.open(
					{
					 templateUrl: 'partials/alerts.html',
					  controller: 'alertCtrl',
					  keyboard : false,
					  size:"sm",
					  resolve: {
								items: function () {
								  return items;
								}
					  }
					  
					});
					
					$rootScope.content_loaded = true;
			}
			else
			{
			
			}
		})
		.error(function(errorMessage){

	$rootScope.content_loaded = true;
		});	
	
$scope.printDiv = function(divName)
{
	$scope.showPrint = false;
	printIt(divName);
	
}


function printIt(divName) {

    printContents = document.getElementById(divName).innerHTML;
	//alert(printContents);
     var originalContents = document.body.innerHTML;
     document.body.innerHTML = printContents;

     window.print();
     document.body.innerHTML = originalContents;
}
	
	
});

myApp.controller("medicalCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.content_loaded = false;
	$scope.bio_data = $localStorage.bio_data;
	$scope.subjectCombinationStatus = $localStorage.subjectCombinationStatus;
	$scope.jambRegNo = $scope.bio_data.jambRegNo;
	
	
	$scope.dataIsNotReady = true;
	$scope.applicantJambNo = {"jambNumber": $scope.jambRegNo}; 
	
	$scope.applicant= {'completionStatus':'incompleted'};
	$scope.buttonParts = [false,false,false,false,false,false,false,false,false,false];
	
	//get applicant information
	//alert($scope.applicantJambNo.jambNumber);
	$http.post("backend/sqlprocessesmed.php?getApplicantMedical=yes", $scope.applicantJambNo)
		.success(function(response){
			$rootScope.content_loaded = true;
			if(response.status == "ok")
			{
				$scope.applicant = response.data;
				if(response.status1 == "ok")
				{
					$scope.medical1 = response.data1;
					$scope.showpart = $scope.medical1.completionStatus
					for(i=0; i<$scope.showpart; i++)
					{
						$scope.buttonParts[i]= true;
					}


					if($scope.showpart==1)
					{
						$scope.medical = {
										'inpatient':"[ Select An Option ]",
										'surgery':"[ Select An Option ]",
										'anyMedication':"[ Select An Option ]",
										'knowGenotype':"[ Select An Option ]",
										'tuberculosis':"[ Select An Option ]",
										'asthma':"[ Select An Option ]",
										'pepticUlcer':"[ Select An Option ]",
										'sickleCell':"[ Select An Option ]",
										'allergies':"[ Select An Option ]",
										'diabetes':"[ Select An Option ]",
										'hypertension':"[ Select An Option ]",
										'siezure':"[ Select An Option ]",
										'mentalIllness':"[ Select An Option ]",
										'familyTB':"[ Select An Option ]",
										'familyHypertension':"[ Select An Option ]",
										'familySeizure':"[ Select An Option ]",
										'familyDiabetes':"[ Select An Option ]",
										'familyMentalSickness':"[ Select An Option ]",
										'drugReaction':"[ Select An Option ]",
										'immunizedHepatitisB':"[ Select An Option ]",
										'immunizedYellowFever':"[ Select An Option ]",
										'immunizedTetanus':"[ Select An Option ]",
										'immunizedCSM':"[ Select An Option ]",
										'smokeOrSnuff':"[ Select An Option ]",
										'neighbourSmoker':"[ Select An Option ]",
										'drinkAlcoholAtPresent':"[ Select An Option ]",
										'alcoholFrequency':"[ Select An Option ]",
										'drinkAlcoholInAnyForm':"[ Select An Option ]",
										'exercise':"[ Select An Option ]",
										'howOftenExercise':"[ Select An Option ]",
										'eatFruit':"[ Select An Option ]",
										'otherailment':"[ Select An Option ]",
										'eatUncookedVegetable':"[ Select An Option ]",
										'eatCookedVegetable':"[ Select An Option ]",
										'eatPastries':"[ Select An Option ]",
										'eatFried':"[ Select An Option ]",
										'softDrink':"[ Select An Option ]",
										'eatRedMeat':"[ Select An Option ]",
										'knowBloodGroup':"[ Select An Option ]",
										'inpatientReason':"Reason for admission",
										'surgeryReason':"",
										'drugAndDose':"",
										'genotype':"",
										'bloodGroup':"",
										'detailsOfMedNotcovered':"Details of medical information not covered",
										'reactingDrug':"",
										'otherImmunization':"",
										'smokingQuantity':"",
										'durationOfSmoking':"",
										'alcoholQuantity':"",
										'nameOfexercise':"",
										'exerciseDuration':"",
										'otherSicknesses':"",
										'eatFruitQuantity':"",
										'eatUncookedVegetableQuantity':"",
										'eatCookedVegetableQuantity':"",
										'eatPastriesQuantity':"",
										'eatFriedQuantity':"",
										'softDrinkQuantity':"",
										'eatRedMeatQuantity':"",
										'detailOfOtherSicknesses':"Details of the sickness(es) you have suffered",
										'immunizedHepatitisBDate':"",
										'immunizedYellowFeverDate':"",
										'immunizedCSMDate':"",
										'immunizedTetanusDate':"",
										'startingYearOfSmoking':""
										};
		
							$scope.dataIsNotReady = false;
							}
					else if($scope.showpart==2)
					{
						/*assign the returned data to medical2 and pass the attributes of the object that have been filled to medical and the remaining attributes are still initialised to the case in showpart=1 */
							$scope.medical2 = response.data1;
							
							$scope.medical = {
								'inpatient':$scope.medical2.inpatient,
								'surgery':$scope.medical2.surgery,
								'anyMedication':$scope.medical2.anyMedication,
								'knowGenotype':"[ Select An Option ]",
								'tuberculosis':"[ Select An Option ]",
								'asthma':"[ Select An Option ]",
								'pepticUlcer':"[ Select An Option ]",
								'sickleCell':"[ Select An Option ]",
								'allergies':"[ Select An Option ]",
								'diabetes':"[ Select An Option ]",
								'hypertension':"[ Select An Option ]",
								'siezure':"[ Select An Option ]",
								'mentalIllness':"[ Select An Option ]",
								'familyTB':"[ Select An Option ]",
								'familyHypertension':"[ Select An Option ]",
								'familySeizure':"[ Select An Option ]",
								'familyDiabetes':"[ Select An Option ]",
								'familyMentalSickness':"[ Select An Option ]",
								'drugReaction':"[ Select An Option ]",
								'immunizedHepatitisB':"[ Select An Option ]",
								'immunizedYellowFever':"[ Select An Option ]",
								'immunizedTetanus':"[ Select An Option ]",
								'immunizedCSM':"[ Select An Option ]",
								'smokeOrSnuff':"[ Select An Option ]",
								'neighbourSmoker':"[ Select An Option ]",
								'drinkAlcoholAtPresent':"[ Select An Option ]",
								'alcoholFrequency':"[ Select An Option ]",
								'drinkAlcoholInAnyForm':"[ Select An Option ]",
								'exercise':"[ Select An Option ]",
								'howOftenExercise':"[ Select An Option ]",
								'eatFruit':"[ Select An Option ]",
								'otherailment':"[ Select An Option ]",
								'eatUncookedVegetable':"[ Select An Option ]",
								'eatCookedVegetable':"[ Select An Option ]",
								'eatPastries':"[ Select An Option ]",
								'eatFried':"[ Select An Option ]",
								'softDrink':"[ Select An Option ]",
								'eatRedMeat':"[ Select An Option ]",
								'knowBloodGroup':"[ Select An Option ]",
								'inpatientReason':$scope.medical2.inpatientReason,
								'surgeryReason':$scope.medical2.surgeryReason,
								'drugAndDose':$scope.medical2.drugAndDose,
								'genotype':"",
								'bloodGroup':"",
								'detailsOfMedNotcovered':"Details of medical information not covered",
								'reactingDrug':"",
								'otherImmunization':"",
								'smokingQuantity':"",
								'durationOfSmoking':"",
								'alcoholQuantity':"",
								'nameOfexercise':"",
								'exerciseDuration':"",
								'otherSicknesses':"",
								'eatFruitQuantity':"",
								'eatUncookedVegetableQuantity':"",
								'eatCookedVegetableQuantity':"",
								'eatPastriesQuantity':"",
								'eatFriedQuantity':"",
								'softDrinkQuantity':"",
								'eatRedMeatQuantity':"",
								'detailOfOtherSicknesses':"Details of the sickness(es) you have suffered",
								'immunizedHepatitisBDate':"",
								'immunizedYellowFeverDate':"",
								'immunizedCSMDate':"",
								'immunizedTetanusDate':"",
								'startingYearOfSmoking':""
								};
								$scope.dataIsNotReady = false;
							
					}
					else if($scope.showpart==3)
					{
						/*assign the returned data to medical2 and pass the attributes of the object medical2 that have been filled to medical and the remaining attributes are still initialised to the case in showpart=1 */
							$scope.medical2 = response.data1;
							$scope.medical = {
								'inpatient':$scope.medical2.inpatient,
								'surgery':$scope.medical2.surgery,
								'anyMedication':$scope.medical2.anyMedication,
								'knowGenotype':"[ Select An Option ]",
								'tuberculosis':$scope.medical2.tuberculosis,
								'asthma':$scope.medical2.asthma,
								'pepticUlcer':$scope.medical2.pepticUlcer,
								'sickleCell':$scope.medical2.sickleCell,
								'allergies':$scope.medical2.allergies,
								'diabetes':$scope.medical2.diabetes,
								'hypertension':$scope.medical2.hypertension,
								'siezure':"[ Select An Option ]",
								'mentalIllness':"[ Select An Option ]",
								'familyTB':"[ Select An Option ]",
								'familyHypertension':"[ Select An Option ]",
								'familySeizure':"[ Select An Option ]",
								'familyDiabetes':"[ Select An Option ]",
								'familyMentalSickness':"[ Select An Option ]",
								'drugReaction':"[ Select An Option ]",
								'immunizedHepatitisB':"[ Select An Option ]",
								'immunizedYellowFever':"[ Select An Option ]",
								'immunizedTetanus':"[ Select An Option ]",
								'immunizedCSM':"[ Select An Option ]",
								'smokeOrSnuff':"[ Select An Option ]",
								'neighbourSmoker':"[ Select An Option ]",
								'drinkAlcoholAtPresent':"[ Select An Option ]",
								'alcoholFrequency':"[ Select An Option ]",
								'drinkAlcoholInAnyForm':"[ Select An Option ]",
								'exercise':"[ Select An Option ]",
								'howOftenExercise':"[ Select An Option ]",
								'eatFruit':"[ Select An Option ]",
								'otherailment':"[ Select An Option ]",
								'eatUncookedVegetable':"[ Select An Option ]",
								'eatCookedVegetable':"[ Select An Option ]",
								'eatPastries':"[ Select An Option ]",
								'eatFried':"[ Select An Option ]",
								'softDrink':"[ Select An Option ]",
								'eatRedMeat':"[ Select An Option ]",
								'knowBloodGroup':"[ Select An Option ]",
								'inpatientReason':$scope.medical2.inpatientReason,
								'surgeryReason':$scope.medical2.surgeryReason,
								'drugAndDose':$scope.medical2.drugAndDose,
								'genotype':"",
								'bloodGroup':"",
								'detailsOfMedNotcovered':"Details of medical information not covered",
								'reactingDrug':"",
								'otherImmunization':"",
								'smokingQuantity':"",
								'durationOfSmoking':"",
								'alcoholQuantity':"",
								'nameOfexercise':"",
								'exerciseDuration':"",
								'otherSicknesses':"",
								'eatFruitQuantity':"",
								'eatUncookedVegetableQuantity':"",
								'eatCookedVegetableQuantity':"",
								'eatPastriesQuantity':"",
								'eatFriedQuantity':"",
								'softDrinkQuantity':"",
								'eatRedMeatQuantity':"",
								'detailOfOtherSicknesses':"Details of the sickness(es) you have suffered",
								'immunizedHepatitisBDate':"",
								'immunizedYellowFeverDate':"",
								'immunizedCSMDate':"",
								'immunizedTetanusDate':"",
								'startingYearOfSmoking':""
								};
							$scope.dataIsNotReady = false;
							
					}
					else if($scope.showpart==4)
					{
							$scope.medical2 = response.data1;
							$scope.medical = {
								'inpatient':$scope.medical2.inpatient,
								'surgery':$scope.medical2.surgery,
								'anyMedication':$scope.medical2.anyMedication,
								'knowGenotype':"[ Select An Option ]",
								'tuberculosis':$scope.medical2.tuberculosis,
								'asthma':$scope.medical2.asthma,
								'pepticUlcer':$scope.medical2.pepticUlcer,
								'sickleCell':$scope.medical2.sickleCell,
								'allergies':$scope.medical2.allergies,
								'diabetes':$scope.medical2.diabetes,
								'hypertension':$scope.medical2.hypertension,
								'siezure':$scope.medical2.siezure,
								'mentalIllness':$scope.medical2.mentalIllness,
								'familyTB':$scope.medical2.familyTB,
								'familyHypertension':$scope.medical2.familyHypertension,
								'familySeizure':$scope.medical2.familySeizure,
								'familyDiabetes':"[ Select An Option ]",
								'familyMentalSickness':"[ Select An Option ]",
								'drugReaction':"[ Select An Option ]",
								'immunizedHepatitisB':"[ Select An Option ]",
								'immunizedYellowFever':"[ Select An Option ]",
								'immunizedTetanus':"[ Select An Option ]",
								'immunizedCSM':"[ Select An Option ]",
								'smokeOrSnuff':"[ Select An Option ]",
								'neighbourSmoker':"[ Select An Option ]",
								'drinkAlcoholAtPresent':"[ Select An Option ]",
								'alcoholFrequency':"[ Select An Option ]",
								'drinkAlcoholInAnyForm':"[ Select An Option ]",
								'exercise':"[ Select An Option ]",
								'howOftenExercise':"[ Select An Option ]",
								'eatFruit':"[ Select An Option ]",
								'otherailment':$scope.medical2.otherailment,
								'eatUncookedVegetable':"[ Select An Option ]",
								'eatCookedVegetable':"[ Select An Option ]",
								'eatPastries':"[ Select An Option ]",
								'eatFried':"[ Select An Option ]",
								'softDrink':"[ Select An Option ]",
								'eatRedMeat':"[ Select An Option ]",
								'knowBloodGroup':"[ Select An Option ]",
								'inpatientReason':$scope.medical2.inpatientReason,
								'surgeryReason':$scope.medical2.surgeryReason,
								'drugAndDose':$scope.medical2.drugAndDose,
								'genotype':"",
								'bloodGroup':"",
								'detailsOfMedNotcovered':"Details of medical information not covered",
								'reactingDrug':"",
								'otherImmunization':"",
								'smokingQuantity':"",
								'durationOfSmoking':"",
								'alcoholQuantity':"",
								'nameOfexercise':"",
								'exerciseDuration':"",
								'otherSicknesses':$scope.medical2.otherSicknesses,
								'eatFruitQuantity':"",
								'eatUncookedVegetableQuantity':"",
								'eatCookedVegetableQuantity':"",
								'eatPastriesQuantity':"",
								'eatFriedQuantity':"",
								'softDrinkQuantity':"",
								'eatRedMeatQuantity':"",
								'detailOfOtherSicknesses':$scope.medical2.detailOfOtherSicknesses,
								'immunizedHepatitisBDate':"",
								'immunizedYellowFeverDate':"",
								'immunizedCSMDate':"",
								'immunizedTetanusDate':"",
								'startingYearOfSmoking':""
								};

							$scope.dataIsNotReady = false;
							
					}
					else if($scope.showpart==5)
					{
							$scope.medical2 = response.data1;
							$scope.medical = {
								'inpatient':$scope.medical2.inpatient,
								'surgery':$scope.medical2.surgery,
								'anyMedication':$scope.medical2.anyMedication,
								'knowGenotype':"[ Select An Option ]",
								'tuberculosis':$scope.medical2.tuberculosis,
								'asthma':$scope.medical2.asthma,
								'pepticUlcer':$scope.medical2.pepticUlcer,
								'sickleCell':$scope.medical2.sickleCell,
								'allergies':$scope.medical2.allergies,
								'diabetes':$scope.medical2.diabetes,
								'hypertension':$scope.medical2.hypertension,
								'siezure':$scope.medical2.siezure,
								'mentalIllness':$scope.medical2.mentalIllness,
								'familyTB':$scope.medical2.familyTB,
								'familyHypertension':$scope.medical2.familyHypertension,
								'familySeizure':$scope.medical2.familySeizure,
								'familyDiabetes':$scope.medical2.familyDiabetes,
								'familyMentalSickness':$scope.medical2.familyMentalSickness,
								'drugReaction':$scope.medical2.drugReaction,
								'immunizedHepatitisB':$scope.medical2.immunizedHepatitisB,
								'immunizedYellowFever':$scope.medical2.immunizedYellowFever,
								'immunizedTetanus':"[ Select An Option ]",
								'immunizedCSM':"[ Select An Option ]",
								'smokeOrSnuff':"[ Select An Option ]",
								'neighbourSmoker':"[ Select An Option ]",
								'drinkAlcoholAtPresent':"[ Select An Option ]",
								'alcoholFrequency':"[ Select An Option ]",
								'drinkAlcoholInAnyForm':"[ Select An Option ]",
								'exercise':"[ Select An Option ]",
								'howOftenExercise':"[ Select An Option ]",
								'eatFruit':"[ Select An Option ]",
								'otherailment':$scope.medical2.otherailment,
								'eatUncookedVegetable':"[ Select An Option ]",
								'eatCookedVegetable':"[ Select An Option ]",
								'eatPastries':"[ Select An Option ]",
								'eatFried':"[ Select An Option ]",
								'softDrink':"[ Select An Option ]",
								'eatRedMeat':"[ Select An Option ]",
								'knowBloodGroup':"[ Select An Option ]",
								'inpatientReason':$scope.medical2.inpatientReason,
								'surgeryReason':$scope.medical2.surgeryReason,
								'drugAndDose':$scope.medical2.drugAndDose,
								'genotype':"",
								'bloodGroup':"",
								'detailsOfMedNotcovered':"Details of medical information not covered",
								'reactingDrug':$scope.medical2.reactingDrug,
								'otherImmunization':"",
								'smokingQuantity':"",
								'durationOfSmoking':"",
								'alcoholQuantity':"",
								'nameOfexercise':"",
								'exerciseDuration':"",
								'otherSicknesses':$scope.medical2.otherSicknesses,
								'eatFruitQuantity':"",
								'eatUncookedVegetableQuantity':"",
								'eatCookedVegetableQuantity':"",
								'eatPastriesQuantity':"",
								'eatFriedQuantity':"",
								'softDrinkQuantity':"",
								'eatRedMeatQuantity':"",
								'detailOfOtherSicknesses':$scope.medical2.detailOfOtherSicknesses,
								'immunizedHepatitisBDate':$scope.medical2.immunizedHepatitisBDate,
								'immunizedYellowFeverDate':$scope.medical2.immunizedYellowFeverDate,
								'immunizedCSMDate':"",
								'immunizedTetanusDate':"",
								'startingYearOfSmoking':""
								};

							$scope.dataIsNotReady = false;
							
					}
					else if($scope.showpart==6)
					{
							$scope.medical2 = response.data1;
							$scope.medical = {
								'inpatient':$scope.medical2.inpatient,
								'surgery':$scope.medical2.surgery,
								'anyMedication':$scope.medical2.anyMedication,
								'knowGenotype':"[ Select An Option ]",
								'tuberculosis':$scope.medical2.tuberculosis,
								'asthma':$scope.medical2.asthma,
								'pepticUlcer':$scope.medical2.pepticUlcer,
								'sickleCell':$scope.medical2.sickleCell,
								'allergies':$scope.medical2.allergies,
								'diabetes':$scope.medical2.diabetes,
								'hypertension':$scope.medical2.hypertension,
								'siezure':$scope.medical2.siezure,
								'mentalIllness':$scope.medical2.mentalIllness,
								'familyTB':$scope.medical2.familyTB,
								'familyHypertension':$scope.medical2.familyHypertension,
								'familySeizure':$scope.medical2.familySeizure,
								'familyDiabetes':$scope.medical2.familyDiabetes,
								'familyMentalSickness':$scope.medical2.familyMentalSickness,
								'drugReaction':$scope.medical2.drugReaction,
								'immunizedHepatitisB':$scope.medical2.immunizedHepatitisB,
								'immunizedYellowFever':$scope.medical2.immunizedYellowFever,
								'immunizedTetanus':$scope.medical2.immunizedTetanus,
								'immunizedCSM':$scope.medical2.immunizedCSM,
								'smokeOrSnuff':$scope.medical2.smokeOrSnuff,
								'neighbourSmoker':$scope.medical2.neighbourSmoker,
								'drinkAlcoholAtPresent':"[ Select An Option ]",
								'alcoholFrequency':"[ Select An Option ]",
								'drinkAlcoholInAnyForm':"[ Select An Option ]",
								'exercise':"[ Select An Option ]",
								'howOftenExercise':"[ Select An Option ]",
								'eatFruit':"[ Select An Option ]",
								'otherailment':$scope.medical2.otherailment,
								'eatUncookedVegetable':"[ Select An Option ]",
								'eatCookedVegetable':"[ Select An Option ]",
								'eatPastries':"[ Select An Option ]",
								'eatFried':"[ Select An Option ]",
								'softDrink':"[ Select An Option ]",
								'eatRedMeat':"[ Select An Option ]",
								'knowBloodGroup':"[ Select An Option ]",
								'inpatientReason':$scope.medical2.inpatientReason,
								'surgeryReason':$scope.medical2.surgeryReason,
								'drugAndDose':$scope.medical2.drugAndDose,
								'genotype':"",
								'bloodGroup':"",
								'detailsOfMedNotcovered':"Details of medical information not covered",
								'reactingDrug':$scope.medical2.reactingDrug,
								'otherImmunization':$scope.medical2.otherImmunization,
								'smokingQuantity':$scope.medical2.smokingQuantity,
								'durationOfSmoking':$scope.medical2.durationOfSmoking,
								'alcoholQuantity':"",
								'nameOfexercise':"",
								'exerciseDuration':"",
								'otherSicknesses':$scope.medical2.otherSicknesses,
								'eatFruitQuantity':"",
								'eatUncookedVegetableQuantity':"",
								'eatCookedVegetableQuantity':"",
								'eatPastriesQuantity':"",
								'eatFriedQuantity':"",
								'softDrinkQuantity':"",
								'eatRedMeatQuantity':"",
								'detailOfOtherSicknesses':$scope.medical2.detailOfOtherSicknesses,
								'immunizedHepatitisBDate':$scope.medical2.immunizedHepatitisBDate,
								'immunizedYellowFeverDate':$scope.medical2.immunizedYellowFeverDate,
								'immunizedCSMDate':$scope.medical2.immunizedCSMDate,
								'immunizedTetanusDate':$scope.medical2.immunizedTetanusDate,
								'startingYearOfSmoking':$scope.medical2.startingYearOfSmoking
								};
							$scope.dataIsNotReady = false;
							
					}
					else if($scope.showpart==7)
					{ 
							$scope.medical2 = response.data1;
							$scope.medical = {
								'inpatient':$scope.medical2.inpatient,
								'surgery':$scope.medical2.surgery,
								'anyMedication':$scope.medical2.anyMedication,
								'knowGenotype':"[ Select An Option ]",
								'tuberculosis':$scope.medical2.tuberculosis,
								'asthma':$scope.medical2.asthma,
								'pepticUlcer':$scope.medical2.pepticUlcer,
								'sickleCell':$scope.medical2.sickleCell,
								'allergies':$scope.medical2.allergies,
								'diabetes':$scope.medical2.diabetes,
								'hypertension':$scope.medical2.hypertension,
								'siezure':$scope.medical2.siezure,
								'mentalIllness':$scope.medical2.mentalIllness,
								'familyTB':$scope.medical2.familyTB,
								'familyHypertension':$scope.medical2.familyHypertension,
								'familySeizure':$scope.medical2.familySeizure,
								'familyDiabetes':$scope.medical2.familyDiabetes,
								'familyMentalSickness':$scope.medical2.familyMentalSickness,
								'drugReaction':$scope.medical2.drugReaction,
								'immunizedHepatitisB':$scope.medical2.immunizedHepatitisB,
								'immunizedYellowFever':$scope.medical2.immunizedYellowFever,
								'immunizedTetanus':$scope.medical2.immunizedTetanus,
								'immunizedCSM':$scope.medical2.immunizedCSM,
								'smokeOrSnuff':$scope.medical2.smokeOrSnuff,
								'neighbourSmoker':$scope.medical2.neighbourSmoker,
								'drinkAlcoholAtPresent':$scope.medical2.drinkAlcoholAtPresent,
								'alcoholFrequency':$scope.medical2.alcoholFrequency,
								'drinkAlcoholInAnyForm':$scope.medical2.drinkAlcoholInAnyForm,
								'exercise':$scope.medical2.exercise,
								'howOftenExercise':$scope.medical2.howOftenExercise,
								'eatFruit':"[ Select An Option ]",
								'otherailment':$scope.medical2.otherailment,
								'eatUncookedVegetable':"[ Select An Option ]",
								'eatCookedVegetable':"[ Select An Option ]",
								'eatPastries':"[ Select An Option ]",
								'eatFried':"[ Select An Option ]",
								'softDrink':"[ Select An Option ]",
								'eatRedMeat':"[ Select An Option ]",
								'knowBloodGroup':"[ Select An Option ]",
								'inpatientReason':$scope.medical2.inpatientReason,
								'surgeryReason':$scope.medical2.surgeryReason,
								'drugAndDose':$scope.medical2.drugAndDose,
								'genotype':"",
								'bloodGroup':"",
								'detailsOfMedNotcovered':"Details of medical information not covered",
								'reactingDrug':$scope.medical2.reactingDrug,
								'otherImmunization':$scope.medical2.otherImmunization,
								'smokingQuantity':$scope.medical2.smokingQuantity,
								'durationOfSmoking':$scope.medical2.durationOfSmoking,
								'alcoholQuantity':$scope.medical2.alcoholQuantity,
								'alcoholStartingAge':$scope.medical2.alcoholStartingAge,
								'nameOfexercise':$scope.medical2.nameOfexercise,
								'exerciseDuration':$scope.medical2.exerciseDuration,
								'otherSicknesses':$scope.medical2.otherSicknesses,
								'eatFruitQuantity':"",
								'eatUncookedVegetableQuantity':"",
								'eatCookedVegetableQuantity':"",
								'eatPastriesQuantity':"",
								'eatFriedQuantity':"",
								'softDrinkQuantity':"",
								'eatRedMeatQuantity':"",
								'detailOfOtherSicknesses':$scope.medical2.detailOfOtherSicknesses,
								'immunizedHepatitisBDate':$scope.medical2.immunizedHepatitisBDate,
								'immunizedYellowFeverDate':$scope.medical2.immunizedYellowFeverDate,
								'immunizedCSMDate':$scope.medical2.immunizedCSMDate,
								'immunizedTetanusDate':$scope.medical2.immunizedTetanusDate,
								'startingYearOfSmoking':$scope.medical2.startingYearOfSmoking
								};
							$scope.dataIsNotReady = false;
							
					}
					else if($scope.showpart==8)
					{
							$scope.medical2 = response.data1;
																$scope.medical = {
								'inpatient':$scope.medical2.inpatient,
								'surgery':$scope.medical2.surgery,
								'anyMedication':$scope.medical2.anyMedication,
								'knowGenotype':"[ Select An Option ]",
								'tuberculosis':$scope.medical2.tuberculosis,
								'asthma':$scope.medical2.asthma,
								'pepticUlcer':$scope.medical2.pepticUlcer,
								'sickleCell':$scope.medical2.sickleCell,
								'allergies':$scope.medical2.allergies,
								'diabetes':$scope.medical2.diabetes,
								'hypertension':$scope.medical2.hypertension,
								'siezure':$scope.medical2.siezure,
								'mentalIllness':$scope.medical2.mentalIllness,
								'familyTB':$scope.medical2.familyTB,
								'familyHypertension':$scope.medical2.familyHypertension,
								'familySeizure':$scope.medical2.familySeizure,
								'familyDiabetes':$scope.medical2.familyDiabetes,
								'familyMentalSickness':$scope.medical2.familyMentalSickness,
								'drugReaction':$scope.medical2.drugReaction,
								'immunizedHepatitisB':$scope.medical2.immunizedHepatitisB,
								'immunizedYellowFever':$scope.medical2.immunizedYellowFever,
								'immunizedTetanus':$scope.medical2.immunizedTetanus,
								'immunizedCSM':$scope.medical2.immunizedCSM,
								'smokeOrSnuff':$scope.medical2.smokeOrSnuff,
								'neighbourSmoker':$scope.medical2.neighbourSmoker,
								'drinkAlcoholAtPresent':$scope.medical2.drinkAlcoholAtPresent,
								'alcoholFrequency':$scope.medical2.alcoholFrequency,
								'drinkAlcoholInAnyForm':$scope.medical2.drinkAlcoholInAnyForm,
								'exercise':$scope.medical2.exercise,
								'howOftenExercise':$scope.medical2.howOftenExercise,
								
								'eatFruit':$scope.medical2.eatFruit,
								'otherailment':$scope.medical2.otherailment,
								'eatUncookedVegetable':$scope.medical2.eatUncookedVegetable,
								'eatCookedVegetable':$scope.medical2.eatCookedVegetable,
								'eatPastries':$scope.medical2.eatPastries,
								'eatFried':$scope.medical2.eatFried,
								'softDrink':$scope.medical2.softDrink,
								'eatRedMeat':$scope.medical2.eatRedMeat,
								'knowBloodGroup':"[ Select An Option ]",
								'inpatientReason':$scope.medical2.inpatientReason,
								'surgeryReason':$scope.medical2.surgeryReason,
								'drugAndDose':$scope.medical2.drugAndDose,
								'genotype':"",
								'bloodGroup':"",
								'detailsOfMedNotcovered':"Details of medical information not covered",
								'reactingDrug':$scope.medical2.reactingDrug,
								'otherImmunization':$scope.medical2.otherImmunization,
								'smokingQuantity':$scope.medical2.smokingQuantity,
								'durationOfSmoking':$scope.medical2.durationOfSmoking,
								'alcoholQuantity':$scope.medical2.alcoholQuantity,
								'alcoholStartingAge':$scope.medical2.alcoholStartingAge,
								'nameOfexercise':$scope.medical2.nameOfexercise,
								'exerciseDuration':$scope.medical2.exerciseDuration,
								'otherSicknesses':$scope.medical2.otherSicknesses,
								'eatFruitQuantity':$scope.medical2.eatFruitQuantity,
								'eatUncookedVegetableQuantity':$scope.medical2.eatUncookedVegetableQuantity,
								'eatCookedVegetableQuantity':$scope.medical2.eatCookedVegetableQuantity,
								'eatPastriesQuantity':$scope.medical2.eatPastriesQuantity,
								'eatFriedQuantity':$scope.medical2.eatFriedQuantity,
								'softDrinkQuantity':$scope.medical2.softDrinkQuantity,
								'eatRedMeatQuantity':$scope.medical2.eatRedMeatQuantity,
								'detailOfOtherSicknesses':$scope.medical2.detailOfOtherSicknesses,
								'immunizedHepatitisBDate':$scope.medical2.immunizedHepatitisBDate,
								'immunizedYellowFeverDate':$scope.medical2.immunizedYellowFeverDate,
								'immunizedCSMDate':$scope.medical2.immunizedCSMDate,
								'immunizedTetanusDate':$scope.medical2.immunizedTetanusDate,
								'startingYearOfSmoking':$scope.medical2.startingYearOfSmoking
								};

							$scope.dataIsNotReady = false;
							
					}
					else if($scope.showpart==9)
					{
						$scope.medical2 = response.data1;
						
						$scope.medical = {
							'inpatient':$scope.medical2.inpatient,
							'surgery':$scope.medical2.surgery,
							'anyMedication':$scope.medical2.anyMedication,
							'knowGenotype':"[ Select An Option ]",
							'tuberculosis':$scope.medical2.tuberculosis,
							'asthma':$scope.medical2.asthma,
							'pepticUlcer':$scope.medical2.pepticUlcer,
							'sickleCell':$scope.medical2.sickleCell,
							'allergies':$scope.medical2.allergies,
							'diabetes':$scope.medical2.diabetes,
							'hypertension':$scope.medical2.hypertension,
							'siezure':$scope.medical2.siezure,
							'mentalIllness':$scope.medical2.mentalIllness,
							'familyTB':$scope.medical2.familyTB,
							'familyHypertension':$scope.medical2.familyHypertension,
							'familySeizure':$scope.medical2.familySeizure,
							'familyDiabetes':$scope.medical2.familyDiabetes,
							'familyMentalSickness':$scope.medical2.familyMentalSickness,
							'drugReaction':$scope.medical2.drugReaction,
							'immunizedHepatitisB':$scope.medical2.immunizedHepatitisB,
							'immunizedYellowFever':$scope.medical2.immunizedYellowFever,
							'immunizedTetanus':$scope.medical2.immunizedTetanus,
							'immunizedCSM':$scope.medical2.immunizedCSM,
							'smokeOrSnuff':$scope.medical2.smokeOrSnuff,
							'neighbourSmoker':$scope.medical2.neighbourSmoker,
							'drinkAlcoholAtPresent':$scope.medical2.drinkAlcoholAtPresent,
							'alcoholFrequency':$scope.medical2.alcoholFrequency,
							'drinkAlcoholInAnyForm':$scope.medical2.drinkAlcoholInAnyForm,
							'exercise':$scope.medical2.exercise,
							'howOftenExercise':$scope.medical2.howOftenExercise,
							
							'eatFruit':$scope.medical2.eatFruit,
							'otherailment':$scope.medical2.otherailment,
							'eatUncookedVegetable':$scope.medical2.eatUncookedVegetable,
							'eatCookedVegetable':$scope.medical2.eatCookedVegetable,
							'eatPastries':$scope.medical2.eatPastries,
							'eatFried':$scope.medical2.eatFried,
							'softDrink':$scope.medical2.softDrink,
							'eatRedMeat':$scope.medical2.eatRedMeat,
							'knowBloodGroup':"[ Select An Option ]",
							'inpatientReason':$scope.medical2.inpatientReason,
							'surgeryReason':$scope.medical2.surgeryReason,
							'drugAndDose':$scope.medical2.drugAndDose,
							'genotype':"",
							'bloodGroup':"",
							'detailsOfMedNotcovered':"Details of medical information not covered",
							'reactingDrug':$scope.medical2.reactingDrug,
							'otherImmunization':$scope.medical2.otherImmunization,
							'smokingQuantity':$scope.medical2.smokingQuantity,
							'durationOfSmoking':$scope.medical2.durationOfSmoking,
							'alcoholQuantity':$scope.medical2.alcoholQuantity,
							'alcoholStartingAge':$scope.medical2.alcoholStartingAge,
							'nameOfexercise':$scope.medical2.nameOfexercise,
							'exerciseDuration':$scope.medical2.exerciseDuration,
							'otherSicknesses':$scope.medical2.otherSicknesses,
							'eatFruitQuantity':$scope.medical2.eatFruitQuantity,
							'eatUncookedVegetableQuantity':$scope.medical2.eatUncookedVegetableQuantity,
							'eatCookedVegetableQuantity':$scope.medical2.eatCookedVegetableQuantity,
							'eatPastriesQuantity':$scope.medical2.eatPastriesQuantity,
							'eatFriedQuantity':$scope.medical2.eatFriedQuantity,
							'softDrinkQuantity':$scope.medical2.softDrinkQuantity,
							'eatRedMeatQuantity':$scope.medical2.eatRedMeatQuantity,
							'detailOfOtherSicknesses':$scope.medical2.detailOfOtherSicknesses,
							'immunizedHepatitisBDate':$scope.medical2.immunizedHepatitisBDate,
							'immunizedYellowFeverDate':$scope.medical2.immunizedYellowFeverDate,
							'immunizedCSMDate':$scope.medical2.immunizedCSMDate,
							'immunizedTetanusDate':$scope.medical2.immunizedTetanusDate,
							'startingYearOfSmoking':$scope.medical2.startingYearOfSmoking,
							
							'religion':$scope.medical2.religion,
							'denomination':$scope.medical2.denomination,
							'hall':$scope.medical2.hall,
							'family_status':$scope.medical2.family_status,
							'nok_relationship':$scope.medical2.nok_relationship,
							'sponsor_name':$scope.medical2.sponsor_name,
							'sponsor_occupation':$scope.medical2.sponsor_occupation,
							'hobbies':$scope.medical2.hobbies,
							'happiest_day':$scope.medical2.happiest_day,
							'happiest_day_reaction':$scope.medical2.happiest_day_reaction,
							'saddest_day':$scope.medical2.saddest_day,
							'saddest_day_reaction':$scope.medical2.saddest_day_reaction,
							'no_of_children':$scope.medical2.no_of_children,
							'position':$scope.medical2.position,
							
							'physical_assault':$scope.medical2.physical_assault,
							'sexual_assault':$scope.medical2.sexual_assault,
							'financial_support':$scope.medical2.financial_support,
							'relationship_to_others':$scope.medical2.relationship_to_others,
							'physical_challenge':$scope.medical2.physical_challenge,
							'emotional_challenge':$scope.medical2.emotional_challenge,
							'social_challenge':$scope.medical2.social_challenge,
							'academic_confidence':$scope.medical2.academic_confidence,
							'purchase_convenience':$scope.medical2.purchase_convenience
							};

							$scope.dataIsNotReady = false;							
					}
					else if($scope.showpart==10)
					{
						$scope.medical2 = response.data1;
						
						$scope.medical = {
							'inpatient':$scope.medical2.inpatient,
							'surgery':$scope.medical2.surgery,
							'anyMedication':$scope.medical2.anyMedication,
							'knowGenotype':"[ Select An Option ]",
							'tuberculosis':$scope.medical2.tuberculosis,
							'asthma':$scope.medical2.asthma,
							'pepticUlcer':$scope.medical2.pepticUlcer,
							'sickleCell':$scope.medical2.sickleCell,
							'allergies':$scope.medical2.allergies,
							'diabetes':$scope.medical2.diabetes,
							'hypertension':$scope.medical2.hypertension,
							'siezure':$scope.medical2.siezure,
							'mentalIllness':$scope.medical2.mentalIllness,
							'familyTB':$scope.medical2.familyTB,
							'familyHypertension':$scope.medical2.familyHypertension,
							'familySeizure':$scope.medical2.familySeizure,
							'familyDiabetes':$scope.medical2.familyDiabetes,
							'familyMentalSickness':$scope.medical2.familyMentalSickness,
							'drugReaction':$scope.medical2.drugReaction,
							'immunizedHepatitisB':$scope.medical2.immunizedHepatitisB,
							'immunizedYellowFever':$scope.medical2.immunizedYellowFever,
							'immunizedTetanus':$scope.medical2.immunizedTetanus,
							'immunizedCSM':$scope.medical2.immunizedCSM,
							'smokeOrSnuff':$scope.medical2.smokeOrSnuff,
							'neighbourSmoker':$scope.medical2.neighbourSmoker,
							'drinkAlcoholAtPresent':$scope.medical2.drinkAlcoholAtPresent,
							'alcoholFrequency':$scope.medical2.alcoholFrequency,
							'drinkAlcoholInAnyForm':$scope.medical2.drinkAlcoholInAnyForm,
							'exercise':$scope.medical2.exercise,
							'howOftenExercise':$scope.medical2.howOftenExercise,
							
							'eatFruit':$scope.medical2.eatFruit,
							'otherailment':$scope.medical2.otherailment,
							'eatUncookedVegetable':$scope.medical2.eatUncookedVegetable,
							'eatCookedVegetable':$scope.medical2.eatCookedVegetable,
							'eatPastries':$scope.medical2.eatPastries,
							'eatFried':$scope.medical2.eatFried,
							'softDrink':$scope.medical2.softDrink,
							'eatRedMeat':$scope.medical2.eatRedMeat,
							'knowBloodGroup':"[ Select An Option ]",
							'inpatientReason':$scope.medical2.inpatientReason,
							'surgeryReason':$scope.medical2.surgeryReason,
							'drugAndDose':$scope.medical2.drugAndDose,
							'genotype':"",
							'bloodGroup':"",
							'detailsOfMedNotcovered':"Details of medical information not covered",
							'reactingDrug':$scope.medical2.reactingDrug,
							'otherImmunization':$scope.medical2.otherImmunization,
							'smokingQuantity':$scope.medical2.smokingQuantity,
							'durationOfSmoking':$scope.medical2.durationOfSmoking,
							'alcoholQuantity':$scope.medical2.alcoholQuantity,
							'alcoholStartingAge':$scope.medical2.alcoholStartingAge,
							'nameOfexercise':$scope.medical2.nameOfexercise,
							'exerciseDuration':$scope.medical2.exerciseDuration,
							'otherSicknesses':$scope.medical2.otherSicknesses,
							'eatFruitQuantity':$scope.medical2.eatFruitQuantity,
							'eatUncookedVegetableQuantity':$scope.medical2.eatUncookedVegetableQuantity,
							'eatCookedVegetableQuantity':$scope.medical2.eatCookedVegetableQuantity,
							'eatPastriesQuantity':$scope.medical2.eatPastriesQuantity,
							'eatFriedQuantity':$scope.medical2.eatFriedQuantity,
							'softDrinkQuantity':$scope.medical2.softDrinkQuantity,
							'eatRedMeatQuantity':$scope.medical2.eatRedMeatQuantity,
							'detailOfOtherSicknesses':$scope.medical2.detailOfOtherSicknesses,
							'immunizedHepatitisBDate':$scope.medical2.immunizedHepatitisBDate,
							'immunizedYellowFeverDate':$scope.medical2.immunizedYellowFeverDate,
							'immunizedCSMDate':$scope.medical2.immunizedCSMDate,
							'immunizedTetanusDate':$scope.medical2.immunizedTetanusDate,
							'startingYearOfSmoking':$scope.medical2.startingYearOfSmoking,
							
							'religion':$scope.medical2.religion,
							'denomination':$scope.medical2.denomination,
							'hall':$scope.medical2.hall,
							'family_status':$scope.medical2.family_status,
							'nok_relationship':$scope.medical2.nok_relationship,
							'sponsor_name':$scope.medical2.sponsor_name,
							'sponsor_occupation':$scope.medical2.sponsor_occupation,
							'hobbies':$scope.medical2.hobbies,
							'happiest_day':$scope.medical2.happiest_day,
							'happiest_day_reaction':$scope.medical2.happiest_day_reaction,
							'saddest_day':$scope.medical2.saddest_day,
							'saddest_day_reaction':$scope.medical2.saddest_day_reaction,
							'no_of_children':$scope.medical2.no_of_children,
							'position':$scope.medical2.position,
							
							'physical_assault':$scope.medical2.physical_assault,
							'sexual_assault':$scope.medical2.sexual_assault,
							'financial_support':$scope.medical2.financial_support,
							'relationship_to_others':$scope.medical2.relationship_to_others,
							'physical_challenge':$scope.medical2.physical_challenge,
							'emotional_challenge':$scope.medical2.emotional_challenge,
							'social_challenge':$scope.medical2.social_challenge,
							'academic_confidence':$scope.medical2.academic_confidence,
							'purchase_convenience':$scope.medical2.purchase_convenience
							};

							$scope.dataIsNotReady = false;
					}
					else if($scope.showpart==11)
					{
							$scope.medical = response.data1;
							$scope.dataIsNotReady = false;
							
					}
				}
			}
			else if(response.status == "not ok")	
			{
				items = "Unable to retrieve applicant";
				modalMessage(items);
				
			}
			else 
			{
			
			}
			
			/*$rootScope.content_loaded = true;*/
		})
		.error(function(errorMessage){
			/*$rootScope.content_loaded = true;*/
		});
	
	
	
	//get applicant
	
	
	// end of get applicant
	
	
	// disabl all the navigation buttons
	/*$scope.partone = false;
	$scope.parttwo = false;
	$scope.partthree = false;
	$scope.partfour = false;
	$scope.partfive = false;
	$scope.partsix = false;
	$scope.partseven = false;
	$scope.parteight = false;
	*/
	
	// showing and hiding of the various panels
	/*$scope.showpartone = true;
	$scope.showparttwo = false;
	$scope.showpartthree = false;
	$scope.partfour = false;
	$scope.showpartfive = false;
	$scope.showpartsix = false;
	$scope.showpartseven = false;
	$scope.showparteight = false;
	*/
	
	$scope.part1 = function()
	{
		$scope.showpart = 1;
	}
	
	$scope.part2 = function()
	{
	
		$scope.showpart = 2;
	}	
	
	$scope.part3 = function()
	{
		$scope.showpart = 3;
	}	
	
	$scope.part4 = function()
	{
		$scope.showpart = 4;
	}	
	
	$scope.part5 = function()
	{
		$scope.showpart = 5;
	}	
	
	$scope.part6 = function()
	{
		$scope.showpart = 6;
	}	
	
	$scope.part7 = function()
	{
		$scope.showpart = 7;
	}	
	
	$scope.part8 = function()
	{
		$scope.showpart = 8;
	}	
	
	$scope.part9 = function()
	{
		$scope.showpart = 9;
	}
	
	$scope.part10 = function()
	{
		$scope.showpart = 10;
	}	
	
	$scope.part11 = function()
	{
		$scope.showpart = 11;
	}	
	
		
	// the options array
	$scope.options = ['[ Select An Option ]','Yes', 'No'];
	
	
	
	
	// medical object
	
	
$scope.immunizationStuff = "[ Select An Option ]";


// on change funtions for all the conditional initialization of the textareas
		
$scope.changeInpatient = function()
{
	$scope.medical.inpatient =='Yes'? $scope.medical.inpatientReason = "Reason for admission": $scope.medical.inpatientReason = "";

}

$scope.changeOtherailment = function()
{
	$scope.medical.otherailment =='Yes'? $scope.medical.otherSicknesses = "Name of ailment(s)": $scope.medical.otherSicknesses = "";

}

$scope.changeDrinkAlcoholAtPresent = function()
{
	$scope.medical.drinkAlcoholAtPresent =='No'? $scope.medical.alcoholFrequency = "": $scope.medical.alcoholFrequency = "[ Select An Option ]";
	$scope.medical.drinkAlcoholAtPresent =='Yes'? $scope.medical.drinkAlcoholInAnyForm = "": $scope.medical.drinkAlcoholInAnyForm = "[ Select An Option ]";

}



$scope.didSurgery = function()
{
	$scope.medical.surgery =='Yes'? $scope.medical.surgeryReason = "State where it was done and the year": $scope.medical.surgeryReason = "";
}

$scope.didMedication = function()
{
	$scope.medical.anyMedication =='Yes'? $scope.medical.drugAndDose = "State the drug and the dose": $scope.medical.drugAndDose = "";
	$scope.medical.anyMedication =='Yes'||$scope.medical.anyMedication =='No'? $scope.isReady = true : $scope.isReady = false ;
}

$scope.anyDrugReaction = function()
{
	$scope.medical.drugReaction =='Yes'? $scope.medical.reactingDrug = "State name(s) of drug": $scope.medical.reactingDrug = "";
}

$scope.changeAnyOtherImmunization = function()
{
	$scope.immunizationStuff =='Yes'? $scope.medical.otherImmunization = "State the immunizations(s) and the date(s)": $scope.medical.otherImmunization = "";
}


$scope.changeSmokeOrSnuff = function()
{
	$scope.medical.smokeOrSnuff =='Yes'? $scope.medical.smokingQuantity = "Specify the quantity": $scope.medical.smokingQuantity = "";
	$scope.medical.smokeOrSnuff =='Yes'? $scope.medical.durationOfSmoking = "Specify in years": $scope.medical.durationOfSmoking = "";
	$scope.medical.smokeOrSnuff =='Yes'? $scope.medical.startingYearOfSmoking = "Specify in years": $scope.medical.startingYearOfSmoking = "";
}

$scope.changeDrinkAlcoholAtPresent = function()
{
	$scope.medical.drinkAlcoholAtPresent =='Yes'? $scope.medical.alcoholQuantity = "Specify the quantity": $scope.medical.alcoholQuantity = "";
	$scope.medical.drinkAlcoholAtPresent =='Yes'? $scope.medical.alcoholStartingAge = "Specify the age": $scope.medical.alcoholStartingAge = "";
}


$scope.changeExercise = function()
{
	$scope.medical.exercise =='Yes'? $scope.medical.nameOfexercise = "Specify the exercise": $scope.medical.nameOfexercise = "";
	$scope.medical.exercise =='Yes'? $scope.medical.exerciseDuration = "Duration": $scope.medical.exerciseDuration = "";
	$scope.medical.exercise =='No'? $scope.medical.howOftenExercise = "": $scope.medical.howOftenExercise = $scope.medical.howOftenExercise;
}


$scope.changeEatFruit = function()
{
	$scope.medical.eatFruit =='Yes'? $scope.medical.eatFruitQuantity = "Quantity consumed": $scope.medical.nameOfexercise = "";
}

$scope.changeEatUncookedVegetable = function()
{
	$scope.medical.eatUncookedVegetable =='Yes'? $scope.medical.eatUncookedVegetableQuantity = "Quantity consumed": $scope.medical.eatUncookedVegetableQuantity = "";
}

$scope.changeEatCookedVegetable = function()
{
	$scope.medical.eatCookedVegetable =='Yes'? $scope.medical.eatCookedVegetableQuantity = "Quantity consumed": $scope.medical.eatCookedVegetableQuantity = "";
}
$scope.changeEatPastries = function()
{
	$scope.medical.eatPastries =='Yes'? $scope.medical.eatPastriesQuantity = "Quantity consumed": $scope.medical.eatPastriesQuantity = "";
}

$scope.changeEatFried = function()
{
	$scope.medical.eatFried =='Yes'? $scope.medical.eatFriedQuantity = "Quantity consumed": $scope.medical.eatFriedQuantity = "";
}


$scope.changeSoftDrink = function()
{
	$scope.medical.softDrink =='Yes'? $scope.medical.softDrinkQuantity = "Quantity consumed": $scope.medical.softDrinkQuantity = "";
}

$scope.changeEatRedMeat = function()
{
	$scope.medical.eatRedMeat =='Yes'? $scope.medical.eatRedMeatQuantity = "Quantity consumed": $scope.medical.eatRedMeatQuantity = "";
}

$scope.changeKnowGenotype = function()
{
	$scope.medical.knowGenotype =='Yes'? $scope.medical.genotype = "Genotype": $scope.medical.genotype = "";
}
$scope.changeKnowBloodGroup = function()
{
	$scope.medical.knowBloodGroup =='Yes'? $scope.medical.bloodGroup = "Blood group": $scope.medical.bloodGroup = "";
}

$scope.isReady = false;


			/* 
	<!--(`jambRegNo`, `inpatient`, `inpatientReason`, `surgery`, `surgeryReason`, `anyMedication`, `drugAndDose`, `knowGenotype`, `genotype`, `knowBloodGroup`, `bloodGroup`, `detailsOfMedNotcovered`, `tuberculosis`, `asthma`, `pepticUlcer`, `sickleCell`, `allergies`, `diabetes`, `hypertension`, `siezure`, `mentalIllness`, `otherSicknesses`, `detailOfOtherSicknesses`, `familyTB`, `familyHypertension`, `familySeizure`, `familyDiabetes`, `familyMentalSickness`, `drugReaction`, `reactingDrug`, `immunizedHepatitisB`, `immunizedHepatitisBDate`, `immunizedYellowFever`, `immunizedYellowFeverDate`, `immunizedTetanus`, `immunizedTetanusDate`, `immunizedCSM`, `immunizedCSMDate`, `otherImmunization`, `smokeOrSnuff`, `smokingQuantity`, `durationOfSmoking`, `startingYearOfSmoking`, `neighbourSmoker`, `drinkAlcoholAtPresent`, `alcoholFrequency`, `alcoholQuantity`, `drinkAlcoholInAnyForm`, `alcoholStartingAge`, `exercise`, `nameOfexercise`, `exerciseDuration`, `howOftenExercise`, `eatFruit`, `eatFruitQuantity`, `eatUncookedVegetable`, `eatUncookedVegetableQuantity`, `eatCookedVegetable`, `eatCookedVegetableQuantity`, `eatPastries`, `eatPastriesQuantity`, `eatFried`, `eatFriedQuantity`, `softDrink`, `softDrinkQuantity`, `eatRedMeat`, `eatRedMeatQuantity`)-->

	*/
	
	
	
/* beginning of date stuff */
  $scope.clear = function () {
    $scope.applicanat1.dateOfBirth = null;
  };


  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    //$scope.opened1 = true;
  };

  $scope.dateOptions = {
    formatYear: 'yyyy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'yyyy-MM-dd' ];
  $scope.format1 = $scope.formats[4];


/*
end of date stuff
*/



$scope.savePartOne = function()
{
	if($scope.medical.inpatient == "[ Select An Option ]" || ($scope.medical.inpatient == "Yes" &&($scope.medical.inpatientReason==''|| $scope.medical.inpatientReason=='Reason for admission')) || $scope.medical.surgery=="[ Select An Option ]" || ($scope.medical.surgery == "Yes" &&($scope.medical.surgeryReason==''|| $scope.medical.surgeryReason=='State where it was done and the year')) || $scope.medical.anyMedication=="[ Select An Option ]" || ($scope.medical.anyMedication == "Yes" &&($scope.medical.drugAndDose==''|| $scope.medical.drugAndDose=='State the drug and the dose')))
{
		modalMessage("Go through your questions again to see those you have not answered properly")

	
}
else
{
	sentItems = {"inpatient":$scope.medical.inpatient,
				 "inpatientReason":$scope.medical.inpatientReason,
				 "surgery":$scope.medical.surgery,
				 "surgeryReason":$scope.medical.surgeryReason,
				 "anyMedication":$scope.medical.anyMedication,
				 "drugAndDose":$scope.medical.drugAndDose,
				 "jambNumber":$scope.applicantJambNo.jambNumber,
				 "stage":2

				 
		};
		
		$http.post("backend/sqlprocessesmed.php?saveMedicalPartOne=yes", sentItems)
		.success(function(response1)
		{
			if(response1.status == "ok")
			{
				//alert(response1.message)
				   items = "Your information was saved successfully";
				   alert(items)
				   Data.toast({"status":"success", "message":items})
				/// work on this part
				$scope.buttonParts[0] = true;
				$scope.showpart = 2;

	
			}
			else if(response1.status == "not ok")	
			{
				//alert(response1.message)
				items = "Your information was not saved successfully";
				   Data.toast({"status":"error", "message":items})
			}
			else
			{
				//alert(response1.message)
				items = "System Error, Please check your entries";
				   Data.toast({"status":"error", "message":items})
			}
		}) //end of success' call back
		.error(function(errorMessage){
			//alert(errorMessage)
			//flashMessage();
			items = "System Error, Please check your entries";
				   Data.toast({"status":"error", "message":items});
		}) // end of error call back


}

	
}


$scope.savePartTwo = function()
{
	if($scope.medical.tuberculosis == "[ Select An Option ]" || $scope.medical.asthma=="[ Select An Option ]" ||  $scope.medical.pepticUlcer=="[ Select An Option ]" ||  $scope.medical.sickleCell=="[ Select An Option ]" ||  $scope.medical.allergies=="[ Select An Option ]" ||  $scope.medical.diabetes=="[ Select An Option ]" ||  $scope.medical.hypertension=="[ Select An Option ]"  )
{
	modalMessage("Go through your questions again to see those you have not answered properly")
	/*items = "All the fields stared are compulsory, fill them and save";
	modalMessage(items);*/
	
}
else
{
	sentItems = {"tuberculosis":$scope.medical.tuberculosis,
				 "asthma":$scope.medical.asthma,
				 "pepticUlcer":$scope.medical.pepticUlcer,
				 "sickleCell":$scope.medical.sickleCell,
				 "allergies":$scope.medical.allergies,
				 "diabetes":$scope.medical.diabetes,
				 "hypertension":$scope.medical.hypertension,
				 "jambNumber":$scope.applicantJambNo.jambNumber,
				 "stage":3

				 
		};
		
		$http.post("backend/sqlprocessesmed.php?saveMedicalPartTwo=yes", sentItems)
		.success(function(response1)
		{
			if(response1.status == "ok")
			{
				//alert(response1.message)
				   items = "Your information was saved successfully";
				   Data.toast({"status":"success", "message":items})
				/// work on this part
				$scope.buttonParts[1] = true;
				$scope.showpart = 3

	
			}
			else if(response1.status == "not ok")	
			{
				///alert(response1.message)
				items = "Your information was not saved successfully";
				   Data.toast({"status":"error", "message":items})
			}
			else
			{
				//alert(response1.message)
				items = "System Error, Please check your entries";
				   Data.toast({"status":"error", "message":items})
			}
		}) //end of success' call back
		.error(function(errorMessage){
			//alert(errorMessage)
			items = "System Error, Please check your entries";
			Data.toast({"status":"error", "message":items})
		}) // end of error call back


}

	
}


$scope.savePartThree = function()
{
	if($scope.medical.siezure == "[ Select An Option ]" || $scope.medical.mentalIllness=="[ Select An Option ]" ||  $scope.medical.otherailment=="[ Select An Option ]" ||  $scope.medical.familyTB=="[ Select An Option ]" ||  $scope.medical.familyHypertension=="[ Select An Option ]" ||  $scope.medical.familySeizure=="[ Select An Option ]" ||($scope.medical.otherailment == "Yes" &&($scope.medical.otherSicknesses==''|| $scope.medical.otherSicknesses=='Name of ailment(s)')) )
{
	modalMessage("Go through your questions again to see those you have not answered properly")
	/*|| ($scope.medical.otherailment=='Yes'|| $scope.medical.mentalIllness=='Yes' || $scope.medical.siezure=='Yes' ||  $scope.medical.allergies=='Yes' || $scope.medical.diabetes=='Yes'|| $scope.medical.hypertension=='Yes' || $scope.medical.sickleCell=='Yes' || $scope.medical.pepticUlcer=='Yes' || $scope.medical.asthma=='Yes' || $scope.medical.tuberculosis=='Yes' &&($scope.medical.detailOfOtherSicknesses==''|| $scope.medical.detailOfOtherSicknesses=='Details of the sickness(es) you have suffered')) work on this latter*/
	 
	
}
else
{
	sentItems = {"siezure":$scope.medical.siezure,
				 "mentalIllness":$scope.medical.mentalIllness,
				 "otherailment":$scope.medical.otherailment,
				 "familyTB":$scope.medical.familyTB,
				 "familyHypertension":$scope.medical.familyHypertension,
				 "familySeizure":$scope.medical.familySeizure,
				 "otherSicknesses":$scope.medical.otherSicknesses,
				 "detailOfOtherSicknesses":$scope.medical.detailOfOtherSicknesses,
				 "jambNumber":$scope.applicantJambNo.jambNumber,
				 "stage":4

				 
		};
		
		$http.post("backend/sqlprocessesmed.php?saveMedicalPartThree=yes", sentItems)
		.success(function(response1)
		{
			if(response1.status == "ok")
			{
				//alert(response1.message)
				   items = "Your information was saved successfully";
				   Data.toast({"status":"success", "message":items})
				/// work on this part
				$scope.buttonParts[2] = true;
				$scope.showpart = 4

	
			}
			else if(response1.status == "not ok")	
			{
				//alert(response1.message)
				items = "Your information was not saved successfully";
				   Data.toast({"status":"error", "message":items})
			}
			else
			{
				//alert(response1.message)
				items = "System Error, Please check your entries";
				   Data.toast({"status":"error", "message":items})
			}
		}) //end of success' call back
		.error(function(errorMessage){
			//alert(errorMessage)
			flashMessage();
			items = "System Error, Please check your entries";
				   Data.toast({"status":"error", "message":items})
		}) // end of error call back


}

	
}
	

$scope.savePartFour = function()
{
	if($scope.medical.familyDiabetes == "[ Select An Option ]" || $scope.medical.familyMentalSickness=="[ Select An Option ]" ||  $scope.medical.drugReaction=="[ Select An Option ]" ||  $scope.medical.immunizedHepatitisB=="[ Select An Option ]" ||  $scope.medical.immunizedYellowFever=="[ Select An Option ]" ||($scope.medical.drugReaction == "Yes" &&($scope.medical.reactingDrug==''|| $scope.medical.reactingDrug=='State name(s) of drug')) ||($scope.medical.immunizedHepatitisB == "Yes" && $scope.medical.immunizedHepatitisBDate=='') ||($scope.medical.immunizedYellowFever == "Yes" && $scope.medical.immunizedYellowFeverDate=='') )
{
	modalMessage("Go through your questions again to see those you have not answered properly")
	/*|| ($scope.medical.otherailment=='Yes'|| $scope.medical.mentalIllness=='Yes' || $scope.medical.siezure=='Yes' ||  $scope.medical.allergies=='Yes' || $scope.medical.diabetes=='Yes'|| $scope.medical.hypertension=='Yes' || $scope.medical.sickleCell=='Yes' || $scope.medical.pepticUlcer=='Yes' || $scope.medical.asthma=='Yes' || $scope.medical.tuberculosis=='Yes' &&($scope.medical.detailOfOtherSicknesses==''|| $scope.medical.detailOfOtherSicknesses=='Details of the sickness(es) you have suffered')) work on this latter*/
	 
	
}
else
{
	sentItems = {"familyDiabetes":$scope.medical.familyDiabetes,
				 "familyMentalSickness":$scope.medical.familyMentalSickness,
				 "drugReaction":$scope.medical.drugReaction,
				 "immunizedHepatitisB":$scope.medical.immunizedHepatitisB,
				 "immunizedYellowFever":$scope.medical.immunizedYellowFever,
				 "reactingDrug":$scope.medical.reactingDrug,
				 "immunizedHepatitisBDate":$scope.medical.immunizedHepatitisBDate,
				 "immunizedYellowFeverDate":$scope.medical.immunizedYellowFeverDate,
				 "jambNumber":$scope.applicantJambNo.jambNumber,
				 "stage":5

				 
		};
		
		$http.post("backend/sqlprocessesmed.php?saveMedicalPartFour=yes", sentItems)
		.success(function(response1)
		{
			if(response1.status == "ok")
			{
				//alert(response1.message)
				   items = "Your information was saved successfully";
				   Data.toast({"status":"success", "message":items})
				/// work on this part
				$scope.buttonParts[3] = true;
				$scope.showpart = 5
			}
			else if(response1.status == "not ok")	
			{
				//alert(response1.message)
				items = "Your information was not saved successfully";
				   Data.toast({"status":"error", "message":items})
			}
			else
			{
				items = "System Error, Please check your entries";
				   Data.toast({"status":"error", "message":items})
			}
		}) //end of success' call back
		.error(function(errorMessage){
			//alert(errorMessage)
			
			items = "System Error, Please check your entries";
				   Data.toast({"status":"error", "message":items})
		}) // end of error call back


}

	
}

$scope.savePartFive = function()
{
	if($scope.medical.immunizedTetanus == "[ Select An Option ]" || $scope.immunizationStuff == "[ Select An Option ]" || $scope.medical.immunizedCSM=="[ Select An Option ]" ||  $scope.medical.smokeOrSnuff=="[ Select An Option ]" ||  $scope.medical.neighbourSmoker=="[ Select An Option ]"  ||($scope.medical.immunizedTetanus == "Yes" && $scope.medical.immunizedTetanusDate=='') ||($scope.medical.immunizedCSM == "Yes" && $scope.medical.immunizedCSMDate=='')||($scope.immunizationStuff == "Yes" &&($scope.medical.otherImmunization==''|| $scope.medical.otherImmunization=='State the immunizations(s) and the date(s)')) ||($scope.medical.smokeOrSnuff == "Yes" &&($scope.medical.durationOfSmoking==''|| $scope.medical.durationOfSmoking=='Specify in years')) ||($scope.medical.smokeOrSnuff == "Yes" &&($scope.medical.startingYearOfSmoking==''|| $scope.medical.startingYearOfSmoking=='Specify in years')) || ($scope.medical.smokeOrSnuff == "Yes" &&($scope.medical.smokingQuantity==''|| $scope.medical.smokingQuantity=='Specify the quantity')))
{
	modalMessage("Go through your questions again to see those you have not answered properly")
	/*|| ($scope.medical.otherailment=='Yes'|| $scope.medical.mentalIllness=='Yes' || $scope.medical.siezure=='Yes' ||  $scope.medical.allergies=='Yes' || $scope.medical.diabetes=='Yes'|| $scope.medical.hypertension=='Yes' || $scope.medical.sickleCell=='Yes' || $scope.medical.pepticUlcer=='Yes' || $scope.medical.asthma=='Yes' || $scope.medical.tuberculosis=='Yes' &&($scope.medical.detailOfOtherSicknesses==''|| $scope.medical.detailOfOtherSicknesses=='Details of the sickness(es) you have suffered')) work on this latter*/
	 
	
}
else
{
	sentItems = {"immunizedTetanus":$scope.medical.immunizedTetanus,
				 "immunizedTetanusDate":$scope.medical.immunizedTetanusDate,
				 "immunizedCSM":$scope.medical.immunizedCSM,
				 "immunizedCSMDate":$scope.medical.immunizedCSMDate,
				 "otherImmunization":$scope.medical.otherImmunization,
				 "smokeOrSnuff":$scope.medical.smokeOrSnuff,
				 "durationOfSmoking":$scope.medical.durationOfSmoking,
				 "startingYearOfSmoking":$scope.medical.startingYearOfSmoking,
				 "neighbourSmoker":$scope.medical.neighbourSmoker,
				 "smokingQuantity":$scope.medical.smokingQuantity,
				 "jambNumber":$scope.applicantJambNo.jambNumber,
				 "stage":6

				 
		};
		
		$http.post("backend/sqlprocessesmed.php?saveMedicalPartFive=yes", sentItems)
		.success(function(response1)
		{
			if(response1.status == "ok")
			{
				//alert(response1.message)
				   items = "Your information was saved successfully";
				   Data.toast({"status":"success", "message":items})
				/// work on this part
				$scope.buttonParts[4] = true;
				$scope.showpart = 6
			}
			else if(response1.status == "not ok")	
			{
				//alert(response1.message)
				items = "Your information was not saved successfully";
				   Data.toast({"status":"error", "message":items})
			}
			else
			{
				//alert(response1.message)
				items = "System Error, Please check your entries";
				   Data.toast({"status":"error", "message":items})
			}
		}) //end of success' call back
		.error(function(errorMessage){
			//alert(errorMessage)
			
			items = "System Error, Please check your entries";
				   Data.toast({"status":"error", "message":items})
		}) // end of error call back


}

	
}


$scope.savePartSix = function()
{
	if($scope.medical.drinkAlcoholAtPresent == "[ Select An Option ]" || $scope.medical.exercise=="[ Select An Option ]"||($scope.medical.drinkAlcoholAtPresent == "Yes" &&($scope.medical.alcoholQuantity==''|| $scope.medical.alcoholQuantity=='Specify the quantity'))||($scope.medical.drinkAlcoholAtPresent == "Yes" &&($scope.medical.alcoholStartingAge==''|| $scope.medical.alcoholStartingAge=='Specify the age'))||($scope.medical.exercise == "Yes" &&($scope.medical.nameOfexercise==''|| $scope.medical.nameOfexercise=='Specify the exercise'))||($scope.medical.exercise == "Yes" &&($scope.medical.exerciseDuration==''|| $scope.medical.exerciseDuration=='Duration')) )
{
	modalMessage("Go through your questions again to see those you have not answered properly")
	/* remedy this model validation || $scope.medical.drinkAlcoholInAnyForm == "[ Select An Option ]"*/
	 
	
}
else
{
	sentItems = {"drinkAlcoholAtPresent":$scope.medical.drinkAlcoholAtPresent,
				 "drinkAlcoholInAnyForm":$scope.medical.drinkAlcoholInAnyForm,
				 "exercise":$scope.medical.exercise,
				 "alcoholQuantity":$scope.medical.alcoholQuantity,
				 "alcoholStartingAge":$scope.medical.alcoholStartingAge,
				 "nameOfexercise":$scope.medical.nameOfexercise,
				 "exerciseDuration":$scope.medical.exerciseDuration,
				 
				 "howOftenExercise":$scope.medical.howOftenExercise,
				 "alcoholFrequency":$scope.medical.alcoholFrequency,
				 "jambNumber":$scope.applicantJambNo.jambNumber,
				 "stage":7

				 
		};
		
		$http.post("backend/sqlprocessesmed.php?saveMedicalPartSix=yes", sentItems)
		.success(function(response1)
		{
			if(response1.status == "ok")
			{
				//alert(response1.message)
				   items = "Your information was saved successfully";
				   Data.toast({"status":"success", "message":items})
				/// work on this part
				$scope.buttonParts[5] = true;
				$scope.showpart = 7

	
			}
			else if(response1.status == "not ok")	
			{
				//alert(response1.message)
				items = "Your information was not saved successfully";
				   Data.toast({"status":"error", "message":items})
			}
			else
			{
				//alert(response1.message)
				items = "System Error, Please check your entries";
				   Data.toast({"status":"error", "message":items})
			}
		}) //end of success' call back
		.error(function(errorMessage){
			//alert(errorMessage)
			
			items = "System Error, Please check your entries";
				   Data.toast({"status":"error", "message":items})
		}) // end of error call back


}

	
}


$scope.savePartSeven = function()
{
	if($scope.medical.eatFruit == "[ Select An Option ]" 
	|| $scope.medical.eatUncookedVegetable=="[ Select An Option ]"
	|| $scope.medical.eatCookedVegetable=="[ Select An Option ]"
	|| $scope.medical.eatPastries=="[ Select An Option ]" 
	|| $scope.medical.eatFried=="[ Select An Option ]" 
	|| $scope.medical.softDrink=="[ Select An Option ]" 
	|| $scope.medical.eatRedMeat=="[ Select An Option ]" 

	||($scope.medical.eatFruit == "Yes" &&($scope.medical.eatFruitQuantity==''|| $scope.medical.eatFruitQuantity=='Quantity consumed'))
	||($scope.medical.eatUncookedVegetable == "Yes" &&($scope.medical.eatUncookedVegetableQuantity==''|| $scope.medical.eatUncookedVegetableQuantity=='Quantity consumed'))
	||($scope.medical.eatCookedVegetable == "Yes" &&($scope.medical.eatCookedVegetableQuantity==''|| $scope.medical.eatCookedVegetableQuantity=='Quantity consumed'))
	||($scope.medical.eatPastries == "Yes" &&($scope.medical.eatPastriesQuantity==''|| $scope.medical.eatPastriesQuantity=='Quantity consumed'))
	||($scope.medical.eatFried == "Yes" &&($scope.medical.eatFriedQuantity==''|| $scope.medical.eatFriedQuantity=='Quantity consumed'))
	||($scope.medical.softDrink == "Yes" &&($scope.medical.softDrinkQuantity==''|| $scope.medical.softDrinkQuantity=='Quantity consumed'))
	||($scope.medical.eatRedMeat == "Yes" &&($scope.medical.eatRedMeatQuantity==''|| $scope.medical.eatRedMeatQuantity=='Quantity consumed'))
	
	)
{
	modalMessage("Go through your questions again to see those you have not answered properly")
	/* remedy this model validation || $scope.medical.drinkAlcoholInAnyForm == "[ Select An Option ]"*/
	 
	
}
else
{
	sentItems = {"eatFruit":$scope.medical.eatFruit,
				 "eatUncookedVegetable":$scope.medical.eatUncookedVegetable,
				 "eatCookedVegetable":$scope.medical.eatCookedVegetable,
				 "eatPastries":$scope.medical.eatPastries,
				 "eatFried":$scope.medical.eatFried,
				 "softDrink":$scope.medical.softDrink,
				 "eatRedMeat":$scope.medical.eatRedMeat,
				 
				 "eatFruitQuantity":$scope.medical.eatFruitQuantity,
				 "eatUncookedVegetableQuantity":$scope.medical.eatUncookedVegetableQuantity,
				 "eatCookedVegetableQuantity":$scope.medical.eatCookedVegetableQuantity,
				 "eatPastriesQuantity":$scope.medical.eatPastriesQuantity,
				 "eatFriedQuantity":$scope.medical.eatFriedQuantity,
				 "softDrinkQuantity":$scope.medical.softDrinkQuantity,
				 "eatRedMeatQuantity":$scope.medical.eatRedMeatQuantity,
				 "jambNumber":$scope.applicantJambNo.jambNumber,
				 "stage":8

				 
		};
		
		$http.post("backend/sqlprocessesmed.php?saveMedicalPartSeven=yes", sentItems)
		.success(function(response1)
		{
			if(response1.status == "ok")
			{
				//alert(response1.message)
				   items = "Your information was saved successfully";
				   Data.toast({"status":"success", "message":items})
				/// work on this part
				$scope.buttonParts[6] = true;
				$scope.showpart = 8;
			}
			else if(response1.status == "not ok")	
			{
				//alert(response1.message)
				items = "Your information was not saved successfully";
				   Data.toast({"status":"error", "message":items})
			}
			else
			{
				//alert(response1.message)
				items = "System Error, Please check your entries";
				   Data.toast({"status":"error", "message":items})
			}
		}) //end of success' call back
		.error(function(errorMessage){
			//alert(errorMessage)
			
			items = "System Error, Please check your entries";
				   Data.toast({"status":"error", "message":items})
		}) // end of error call back


}

	
}


$scope.savePartEight = function()
{
	if($scope.medical.knowGenotype == "[ Select An Option ]" 
	|| $scope.medical.knowBloodGroup =="[ Select An Option ]"

	||($scope.medical.knowGenotype == "Yes" &&($scope.medical.genotype==''|| $scope.medical.genotype=='Genotype'))
	||($scope.medical.knowBloodGroup == "Yes" &&($scope.medical.bloodGroup==''|| $scope.medical.bloodGroup=='Blood group'))
	||($scope.medical.detailsOfMedNotcovered==''|| $scope.medical.detailsOfMedNotcovered=='Details of medical information not covered')
	
	)
{
	modalMessage("Go through your questions again to see those you have not answered properly")
	/* remedy this model validation || $scope.medical.drinkAlcoholInAnyForm == "[ Select An Option ]"*/
	 
	
}
else
{
	sentItems = {"knowGenotype":$scope.medical.knowGenotype,
				 "knowBloodGroup":$scope.medical.knowBloodGroup,
				 "genotype":$scope.medical.genotype,
				 "bloodGroup":$scope.medical.bloodGroup,
				 "detailsOfMedNotcovered":$scope.medical.detailsOfMedNotcovered,
				 "jambNumber":$scope.applicantJambNo.jambNumber,
				 "stage":9

				 
		};
		
		$http.post("backend/sqlprocessesmed.php?saveMedicalPartEight=yes", sentItems)
		.success(function(response1)
		{
			if(response1.status == "ok")
			{
				//alert(response1.message)
				   items = "Your information was saved successfully";
				   Data.toast({"status":"success", "message":items})
				/// work on this part
				$scope.buttonParts[7] = true;
				$scope.showpart=9;
				if(response1.status1 == "ok")	
				{
				$scope.medical = response1.data1
				/*items = "Your information was not saved successfully";
				modalMessage(items);*/
				}
				else if(response1.status == "not ok")	
				{
				//alert(response1.message)
				items = "Your information was not saved successfully";
				   Data.toast({"status":"success", "message":items})
				}
	
			}
			
			else
			{
				//alert(response1.message)
				/*items = "System Error, Please check your entries";
				modalMessage(items)*/
			}
		}) //end of success' call back
		.error(function(errorMessage){
			//alert(errorMessage)
			
			items = "System Error, Please check your entries";
				   Data.toast({"status":"success", "message":items})
		}) // end of error call back


}

	
}

$scope.savePartNine = function()
{
	
	/*'religion':$scope.medical2.religion,
							'denomination':$scope.medical2.denomination,
							'hall':$scope.medical2.hall,
							'family_status':$scope.medical2.family_status,
							'nok_relationship':$scope.medical2.nok_relationship,
							'sponsor_name':$scope.medical2.sponsor_name,
							'sponsor_occupation':$scope.medical2.sponsor_occupation,
							'hobbies':$scope.medical2.hobbies,
							'happiest_day':$scope.medical2.happiest_day,
							'happiest_day_reaction':$scope.medical2.happiest_day_reaction,
							'saddest_day':$scope.medical2.saddest_day,
							'saddest_day_reaction':$scope.medical2.saddest_day_reaction,
							'no_of_children':$scope.medical2.no_of_children,
							'position':$scope.medical2.position,
							
							'physical_assault':$scope.medical2.physical_assault,
							'sexual_assault':$scope.medical2.sexual_assault,
							'financial_support':$scope.medical2.financial_support,
							'relationship_to_others':$scope.medical2.relationship_to_others,
							'physical_challenge':$scope.medical2.physical_challenge,
							'emotional_challenge':$scope.medical2.emotional_challenge,
							'social_challenge':$scope.medical2.social_challenge,
							'academic_confidence':$scope.medical2.academic_confidence,
							'purchase_convenience':$scope.medical2.purchase_convenience*/
							
	sentItems = {'religion':$scope.medical.religion,
				  'denomination':$scope.medical.denomination,
				  'hall':$scope.medical.hall,
				  'family_status':$scope.medical.family_status,
				  'nok_relationship':$scope.medical.nok_relationship,
				  'sponsor_name':$scope.medical.sponsor_name,
				  'sponsor_occupation':$scope.medical.sponsor_occupation,
				  'hobbies':$scope.medical.hobbies,
				  'happiest_day':$scope.medical.happiest_day,
				  'happiest_day_reaction':$scope.medical.happiest_day_reaction,
				  'saddest_day':$scope.medical.saddest_day,
				  'saddest_day_reaction':$scope.medical.saddest_day_reaction,
				  'no_of_children':$scope.medical.no_of_children,
				  'position':$scope.medical.position,
				  "jambNumber":$scope.applicantJambNo.jambNumber,
				  'stage':10
		};
		
		$http.post("backend/sqlprocessesmed.php?saveMedicalPartNine=yes", sentItems)
		.success(function(response1)
		{
			if(response1.status == "ok")
			{
				items = "Your information was saved successfully";
				Data.toast({"status":"success", "message":items});
				
				$scope.buttonParts[9] = true;
				$scope.showpart=10;
				
				if(response1.status1 == "ok"){
					$scope.medical = response1.data1;
				}
				else if(response1.status == "not ok"){
					items = "Your information was not saved successfully";
				   Data.toast({"status":"success", "message":items});
				}
			}
			
			else
			{
				//alert(response1.message)
				/*items = "System Error, Please check your entries";
				modalMessage(items)*/
			}
		})
		.error(function(errorMessage){
			items = "System Error, Please check your entries";
			Data.toast({"status":"success", "message":items});
		})
}

$scope.savePartTen = function()
{
	
	/*'physical_assault':$scope.medical.physical_assault,
							'sexual_assault':$scope.medical.sexual_assault,
							'financial_support':$scope.medical.financial_support,
							'relationship_to_others':$scope.medical.relationship_to_others,
							'physical_challenge':$scope.medical.physical_challenge,
							'emotional_challenge':$scope.medical.emotional_challenge,
							'social_challenge':$scope.medical.social_challenge,
							'academic_confidence':$scope.medical.academic_confidence,
							'purchase_convenience':$scope.medical.purchase_convenience*/
							
	sentItems = {'physical_assault':$scope.medical.physical_assault,
				  'sexual_assault':$scope.medical.sexual_assault,
				  'financial_support':$scope.medical.financial_support,
				  'relationship_to_others':$scope.medical.relationship_to_others,
				  'physical_challenge':$scope.medical.physical_challenge,
				  'emotional_challenge':$scope.medical.emotional_challenge,
				  'social_challenge':$scope.medical.social_challenge,
				  'academic_confidence':$scope.medical.academic_confidence,
				  'purchase_convenience':$scope.medical.purchase_convenience,
				  'jambNumber':$scope.applicantJambNo.jambNumber,
				  'stage':11
		};
		
		$http.post("backend/sqlprocessesmed.php?saveMedicalPartTen=yes", sentItems)
		.success(function(response1)
		{
			if(response1.status == "ok")
			{
				items = "Your information was saved successfully";
				Data.toast({"status":"success", "message":items});
				
				$scope.buttonParts[10] = true;
				$scope.showpart=11;
				
				if(response1.status1 == "ok"){
					$scope.medical = response1.data1;
				}
				else if(response1.status == "not ok"){
					items = "Your information was not saved successfully";
				   Data.toast({"status":"success", "message":items});
				}
			}
			
			else
			{
				//alert(response1.message)
				/*items = "System Error, Please check your entries";
				modalMessage(items)*/
			}
		})
		.error(function(errorMessage){
			items = "System Error, Please check your entries";
			Data.toast({"status":"success", "message":items});
		})
}


function modalMessage(items)
{
	
		  var modalInstance = $modal.open(
		  {
			templateUrl: 'partials/alerts.html',
			controller: 'alertCtrl',
			keyboard : false,
			size:"sm",
			resolve: {
					  items: function () {
						return items;
					  }
			}
			
		  });
	
	}	
	

function modalMessageOk(items)
{
	
		  var modalInstance = $modal.open(
		  {
			templateUrl: 'partials/alertok.html',
			controller: 'alertCtrl',
			keyboard : false,
			size:"sm",
			resolve: {
					  items: function () {
						return items;
					  }
			}
			
		  });
	
	}

});


myApp.controller("assessmentprintoutCtrl", function($rootScope, $scope, $routeParams, $location, $http, Data, $localStorage){
	$rootScope.content_loaded = false;
	$scope.bio_data = $localStorage.bio_data;
	$scope.course_registered = $localStorage.course_registered;
	$scope.number_of_lecturers = $localStorage.number_of_lecturers;
	//alert(JSON.stringify($scope.course_registered));
	
		$http.post("backend/sqlprocesses.php?courses_assessed=yes", {"my_data": $scope.bio_data})
		.success(function(response) {
		   if(response.status === "ok"){
				$scope.courses_assessed = response.data;
				//alert(JSON.stringify($scope.courses_assessed));
				$scope.courses_assessed_counter = 0;
				for(i=0; i < $scope.course_registered.length; i++)
				{
				    if($scope.course_registered[i].total_assessed > 0 && ($scope.course_registered[i].no_lecturers == $scope.course_registered[i].total_assessed)) $scope.courses_assessed_counter++;
				}
				for(i=0; i < $scope.courses_assessed.length; i++)
				{
				    
					angular.forEach($scope.course_registered, function(value, key) {
						$scope.course_registered[key].assessed = false;

						if( value._id == $scope.courses_assessed[i].course_id_fk)
							{
								//alert(value._id + " " + $scope.courses_assessed[i].course_id_fk);
								$scope.course_registered[key].assessed = true;
								//alert($scope.course_registered[key].assessed);
								
							}
					});
				}//alert(JSON.stringify($scope.course_registered));
				//alert("registered for printing" + JSON.stringify($scope.course_registered));
			}
			else if(response.status === "not ok"){
			message_code = {status: 'error', message: 'No Lecturer was assigned to this course. Please try again'};
			Data.toast(message_code);
			$scope.show_next_courses_btn = false;

			
			}
			$rootScope.content_loaded = true;
		})
		.error(function(data) {
			$scope.indicators_flags[the_index]	= false;
			message_code = {status: 'error', message: 'A network connection problem error occured while connecting. Please try again'};
			Data.toast(message_code);
			$rootScope.content_loaded = true;
		});
	

$scope.printDiv = function(divName)
{
	//$scope.showPrint = false;
	printIt(divName);
	
}


function printIt(divName) {

    printContents = document.getElementById(divName).innerHTML;
	//alert(printContents);
     var originalContents = document.body.innerHTML;
     document.body.innerHTML = printContents;

     window.print();
     document.body.innerHTML = originalContents;
	 location.reload();
}

});


myApp.controller("alertCtrl", function($scope, items, $modalInstance){
	$scope.message = items;

	$scope.takeAway = function () {
			$modalInstance.dismiss('cancel');
        };
	
	});