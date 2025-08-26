myApp = angular.module('myApp', ['ngRoute', 'ngMessages', 'ngAnimate', 'ui.bootstrap', 'toaster', 'ngStorage', 'ngSanitize', 'angular-spinkit']);

/*myApp.run(function($location, $rootScope, $http){
});*/


myApp.config(function($routeProvider){
	$routeProvider.
	when('/', {templateUrl: 'partials/carousel.html', controller: "carouselCtrl"}).
	when('/contact-details', {templateUrl: 'partials/contact.html', controller: "contactCtrl"}).
	when('/guidelines', {templateUrl: 'partials/guidelines.html', controller: "guidelinesCtrl"}).
	when('/change-password', {templateUrl: 'partials/change-password.html', controller: "changePasswordCtrl"}).
	when('/quality-assurance/quality-assurance-dashboard', {templateUrl: 'partials/quality-assurance-dashboard.html', controller: "qualityDashCtrl"}).
	when('/quality-assurance/preview-assessment', {templateUrl: 'partials/class-assessment.html', controller: "classAssessmentCtrl"}).
	when('/quality-assurance/lecturer-assessment', {templateUrl: 'partials/class-assessment.html', controller: "lecturerAssessmentCtrl"}).
	when('/quality-assurance/individual-assessment', {templateUrl: 'partials/individual-assessment.html', controller: "individualAssessmentCtrl"}).
	when('/quality-assurance/student-investigate', {templateUrl: 'partials/student-investigate.html', controller: "studentInvestigateCtrl"}).
	when('/quality-assurance/awards', {templateUrl: 'partials/class-awards.html', controller: "classAwardsCtrl"}).
	when('/quality-assurance/assessment-downloads', {templateUrl: 'partials/downloads.html', controller: "downloadsCtrl"}).
	when('/quality-assurance/assessment-generation', {templateUrl: 'partials/download_generation.html', controller: "downloads_generationCtrl"}).
	when('/quality-assurance/comments/:comment_id/:course_id', {templateUrl: 'partials/comments.html', controller: "commentsCtrl"}).
	
	
	when('/hod/assign-lecturers-photo', {templateUrl: 'partials/assign-courses.html', controller: "assign-coursesCtrl"}).
	when('/hod/view-assign', {templateUrl: 'partials/view-courses.html', controller: "view-coursesCtrl"}).
	when('/hod/assign-courses-individually', {templateUrl: 'partials/assign-individual.html', controller: "assign-individualCtrl"}).
	when('/hod/download-assessments', {templateUrl: 'partials/download-assessments.html', controller: "downloadassessmentsCtrl"}).
	when('/hod/add-lecturers', {templateUrl: 'partials/add-lecturers.html', controller: "download_lecturersCtrl"}).
	when('/hod/add-courses', {templateUrl: 'partials/add-course.html', controller: "course1Ctrl"}).
	when('/hod/update-record', {templateUrl: 'partials/update-record.html', controller: "updateRecordCtrl"}).
	//when('/hod/download-assessments', {templateUrl: 'partials/download-assessments.html', controller: "downloadassessmentsCtrl"}).
	
	
	when('/admin/admin-dashboard', {templateUrl: 'partials/admin-dashboard.html', controller: "adminDashCtrl"}).
	when('/hod/hod-dashboard', {templateUrl: 'partials/hod-dashboard.html', controller: "hodCtrl"}).
	when('/visitor/visitor-dashboard', {templateUrl: 'partials/student-dashboard.html', controller: "adminDashCtrl"}).
	when('/student/teller_upload', {templateUrl: 'partials/teller_upload.html', controller: "tellerCtrl"}).
	when('/student/complaint', {templateUrl: 'partials/complaint.html', controller: "complaintCtrl"}).
	when('/student/check-complaint', {templateUrl: 'partials/check_complaint.html', controller: "checkcomplaintCtrl"}).
	when('/student/guidelines', {templateUrl: 'partials/help.html', controller: "helpCtrl"}).
	when('/student/student-dashboard', {templateUrl: 'partials/student-dashboard.html', controller: "studentDashCtrl"}).
	when('/student/assessment', {templateUrl: 'partials/assessment.html', controller: "assessmentCtrl"}).
	when('/student/assessment-printout', {templateUrl: 'partials/assessment-printout.html', controller: "assessmentprintoutCtrl"}).
	otherwise({redirectTo: '/error-page', templateUrl: 'partials/error-page.html'})
	
	
	})
	.run(function($location, $rootScope, Data, $localStorage){
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
			var nextUrl = next.$$route.originalPath;
			$rootScope.menu_contents = Array();
			
			if(nextUrl == '/signup' || nextUrl == '/login'){
				$location.path("/");
			}
			else if(nextUrl == '/' || nextUrl == '/contact-details' || nextUrl == '/guidelines'){
				//alert('here');
				//$location.path("/");
				if(nextUrl == '/'){
					$rootScope.isMain = true;
				}
				else{
					$rootScope.isMain = false;
				}
				if($rootScope.authenticated || $rootScope.non_authenticated_pages || $localStorage.user_details){
					$rootScope.authenticated = true;
					user_details = $localStorage.user_details;
					if(user_details.sq_id_fk == 0){
						$location.path("change-password/");
					}
					else{
					//alert(nextUrl);
					//alert("userType");
						if(user_details.userType == 1){
						$location.path("student/student-dashboard/");
						}else if(user_details.userType == 2){
						$location.path("quality-assurance/quality-assurance-dashboard/");
						}else if(user_details.userType == 4){
						$location.path("hod/hod-dashboard/");
						}else if(user_details.userType == 3){
						$location.path("admin/admin-dashboard/");
						}
					}
				}
				$rootScope.menu_contents = getMenuContent("general");
				$rootScope.menu_contents = setActiveMenu($rootScope.menu_contents, nextUrl);
			}
			else{
				// check the url
				//alert("checking for the user that logs in");
				if(nextUrl.indexOf('admin/') !== -1){
					$rootScope.menu_contents = getMenuContent("admin");
					$rootScope.menu_contents = setActiveMenu($rootScope.menu_contents, nextUrl);
				}else if(nextUrl.indexOf('hod/') !== -1){
					$rootScope.menu_contents = getMenuContent("hod");
					$rootScope.menu_contents = setActiveMenu($rootScope.menu_contents, nextUrl);
				}else if(nextUrl.indexOf('student/') !== -1){
					$rootScope.menu_contents = getMenuContent("student");
					$rootScope.menu_contents = setActiveMenu($rootScope.menu_contents, nextUrl);
				}else if(nextUrl.indexOf('quality-assurance/') !== -1){
					$rootScope.menu_contents = getMenuContent("qualityassurance");
					$rootScope.menu_contents = setActiveMenu($rootScope.menu_contents, nextUrl);
				}
				else{ 
					//$rootScope.menu_contents = setActiveMenu($rootScope.menu_contents, nextUrl);
				}
				
				if($rootScope.authenticated || $rootScope.non_authenticated_pages)
					{
						user_details = $localStorage.user_details;
						bio_data = $localStorage.bio_data;
						$rootScope.authenticated = true;
						$rootScope.isMain = false;
						if(user_details.userType == "admin"){
							$location.path("admin/admin-dashboard/");
						}
				}
				else if($localStorage.user_details){//alert("user_details");
					user_details = $localStorage.user_details;
					bio_data = $localStorage.bio_data;
					number_of_lecturers = $localStorage.number_of_lecturers;
					
					//alert(JSON.stringify(bio_data));
					$rootScope.authenticated = true;
					$rootScope.isMain = false;
					if(user_details.userType == "student"){
						$location.path("student/student-dashboard/");
					}else if(user_details.userType == "qualityassurance"){
						$location.path("quality-assurance/quality-assurance-dashboard/");
					}else if(user_details.userType == "hod"){
						$location.path("hod/hod-dashboard/");
					}else if(user_details.userType == "admin"){
						$location.path("admin/admin-dashboard/");
					}
				}
				else{
					//alert("none of the operations");
					$rootScope.user_details = "";
					$rootScope.authenticated = false;
					$localStorage.$reset();
					//$rootScope.isMain = true;
					$location.path("/");				}
			};
        });
    	
		
    });

function getMenuContent(menu_type){
	if(menu_type == "admin"){
		menu_contents = [
						{
							name: 'Home',
							url: '#/admin/admin-dashboard',
							short: 'dashboard',
							classes: '',
							logo: 'icon-home',
							isBigger: true,
							isHome: true,
							isActive: false,
							visibilityLevel: 0,
							hasSubMenu: false,
							subMenus: []
						},
						{}
					];
	}else if(menu_type == "student"){
		
		menu_contents = [ 
						{
							name: 'Home',
							url: '#/student/student-dashboard',
							short: 'dashboard',
							classes: '',
							logo: 'icon-home',
							isBigger: true,
							isHome: true,
							isActive: false,
							visibilityLevel: 0,
							hasSubMenu: false,
							subMenus: []
						},
						{name: 'Print Assessment',
							url: '#/student/assessment-printout',
							short: 'printout',
							classes: '',
							logo: '',
							isBigger: false,
							isHome: false,
							isActive: false,
							hasSubMenu: false,
							subMenus: []}
						,
						/*{name: 'Teller Upload',
							url: '#/student/teller_upload',
							short: 'teller',
							classes: '',
							logo: '',
							isBigger: false,
							isHome: false,
							isActive: false,
							hasSubMenu: false,/student/check-complaint
							subMenus: []}, 
						{name: 'Complaint',
							url: '#/student/complaint',
							short: 'complaint',
							classes: '',
							logo: '',
							isBigger: false,
							isHome: false,
							isActive: false,
							hasSubMenu: true,
							subMenus: [{
										  name:'Lodge Complaints',
										  url:'student/complaint'  
										},
										{
										  name:'Check Complaint Response',
										  url:'student/check-complaint'  
										}
										]
						},
						{name: 'Guidelines',
							url: '#/student/guidelines',
							short: 'guidelines',
							classes: '',
							logo: '',
							isBigger: false,
							isHome: false,
							isActive: false,
							hasSubMenu: false,
							subMenus: []}*/
					];
	}
	else if(menu_type == "hod"){
		menu_contents = [
						{
							name: 'Home',
							url: '#/hod/hod-dashboard',
							short: 'dashboard',
							classes: '',
							logo: 'icon-home',
							isBigger: true,
							isHome: true,
							isActive: false,
							visibilityLevel: 0,
							hasSubMenu: false,
							subMenus: []
						},
						{
							name: 'Courses',
							url: '#/hod/assign-courses',
							short: 'course',
							classes: '',
							logo: '',
							isBigger: false,
							isHome: false,
							isActive: false,
							hasSubMenu: true,
							subMenus: [{
										  name:'Assign Course(s)',
										  url:'hod/assign-courses-individually'  
										},
										{
										  name:'Add Course(s)',
										  url:'hod/add-courses'  
										}/*,
										{
										  name:'View Assigned Courses',
										  url:'hod/view-assign'  
										}*/
								]
						},
						{
							name: 'My Lecturers',
							url: '#/hod/My-lecturers',
							short: 'lecturers',
							classes: '',
							logo: '',
							isBigger: false,
							isHome: false,
							isActive: false,
							hasSubMenu: true,
							subMenus: [{
										  name:'Upload Photos',
										  url:'hod/assign-lecturers-photo'  
										},{
										  name:'Add Lecturers',
										  url:'hod/add-lecturers'  
										}/*,
										{
										  name:'Remove Lecturers',
										  url:'hod/remove-lecturers'  
										}*/
								]
						},
						{
							name: 'Download Assessments',
							url: '#/hod/download-assessments',
							short: 'download',
							classes: '',
							logo: '',
							isBigger: false,
							isHome: false,
							isActive: false,
							hasSubMenu: false,
							subMenus: []
						}
					];
	}
	else if(menu_type == "qualityassurance"){
		menu_contents = [
						{
							name: 'Home',
							url: '#/quality-assurance/quality-assurance-dashboard',
							short: 'dashboard',
							classes: '',
							logo: 'icon-home',
							isBigger: true,
							isHome: true,
							isActive: false,
							visibilityLevel: 0,
							hasSubMenu: false,
							subMenus: []
						},
/*						{
							name: 'Class Assessment',
							url: '#/quality-assurance/class-assessment',
							short: 'class',
							classes: '',
							logo: '',
							isBigger: false,
							isHome: false,
							isActive: false,
							hasSubMenu: false,
							subMenus: []
						},
*/						
						{
							name: 'Assessment',
							url: '#/quality-assurance/downloads',
							short: 'assessment',
							classes: '',
							logo: '',
							isBigger: false,
							isHome: false,
							isActive: false,
							hasSubMenu: true,
							subMenus: [
							{
							  name:'Generate Assessment',
							  url:'quality-assurance/assessment-generation'  
							}
							,
							{
							  name:'Download Assessment',
							  url:'quality-assurance/assessment-downloads'  
							},
							{
							  name:'Preview Assessment',
							  url:'quality-assurance/preview-assessment'  
							}

							
							]
						}/*,
{
							name: 'Comments ',
							url: '#/quality-assurance/class-visualisations',
							short: 'visualisations',
							classes: '',
							logo: '',
							isBigger: false,
							isHome: false,
							isActive: false,
							hasSubMenu: false,
							subMenus: [
							
							]
						},
{
							name: 'Awards',
							url: '#/quality-assurance/awards',
							short: 'awards',
							classes: '',
							logo: '',
							isBigger: false,
							isHome: false,
							isActive: false,
							hasSubMenu: false,
							subMenus: []
						}*/									];
	}else 
	{menu_contents = [
						{
							name: 'Home',
							url: '#/',
							short: 'home',
							classes: '',
							logo: 'icon-home',
							isBigger: true,
							isHome: true,
							isActive: false,
							hasSubMenu: false,
							subMenus: []
						},
						{
							name: 'Guidelines',
							url: '#/guidelines',
							short: 'guide',
							classes: '',
							logo: 'icon-file',
							isBigger: false,
							isHome: false,
							isActive: false,
							hasSubMenu: false,
							subMenus: []
						},
						
						{
							name: 'Contact Us',
							url: '#/contact-details',
							short: 'contact',
							classes: '',
							logo: 'icon-envelope',
							isBigger: false,
							isHome: false,
							isActive: false,
							hasSubMenu: false,
							subMenus: []
						}
					];
	}
	
	return menu_contents;
}

function setActiveMenu(menu_contents, url){
	for(var i = 0; i < menu_contents.length; i++) {		
		if(url.indexOf(menu_contents[i]['short']) !== -1){
			menu_contents[i]['isActive'] = true;
		}
		else if(menu_contents[i]['short'] == "home"  && url == "/"){
			menu_contents[i]['isActive'] = true;
		}
		else{
			menu_contents[i]['isActive'] = false;
		}
	}
	
	return menu_contents;
}