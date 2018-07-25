angular.module("iot", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","iot.controllers", "iot.services","mobiscroll-range", "mobiscroll-form"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){
        $rootScope.shouldHide = function () {
            switch ($state.current.name) {
                case 'iot.dashboard':
                    return true;
                default:
                    return false;
            }
        };
		$rootScope.appName = "IoT" ;
		$rootScope.appLogo = "data/images/IOT-LOGO-final_transparent-03.png" ;
		$rootScope.appVersion = "1.0" ;
		$rootScope.headerShrink = false ;
		$rootScope.user = null ;
        $rootScope.serverURL='http://mokh.me/api_get.php';

        $rootScope.checkUserData = function(title,message) {
        	if(!angular.isDefined($rootScope.user)||$rootScope.user==null){
                return false
			}else {
			return true
            }
        }
        $rootScope.showAlert = function(title,message) {

            var alertPopup = $ionicPopup.alert({
                title: title,
                template: message
            });

            alertPopup.then(function(res) {
                // Custom functionality....
            });
        };

		$ionicPlatform.ready(function() {


			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "iot",
				storeName : "iot",
				description : "The offline datastore for IoT app"
			});

			if(window.cordova){
				$rootScope.exist_cordova = true ;
			}else{
				$rootScope.exist_cordova = false ;
			}
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}


		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
                navigator.app.exitApp()
			}else{
                navigator.app.exitApp()
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("phpTime", function(){
		return function (input) {
			var timeStamp = parseInt(input) * 1000;
			return timeStamp ;
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("stripTags", ["$sce", function($sce){
		return function(text) {
			return text.replace(/(<([^>]+)>)/ig,"");
		};
	}])

	.filter("chartData", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if ((indeks !== 0) && (indeks !== 1)){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})

	.filter("chartLabels", function(){
		return function (obj){
			var new_item = [];
			angular.forEach(obj, function(child) {
			var indeks = 0;
			new_item = [];
			angular.forEach(child, function(v,l) {
				if ((indeks !== 0) && (indeks !== 1)) {
					new_item.push(l);
				}
				indeks++;
			});
			});
			return new_item;
		}
	})
	.filter("chartSeries", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks === 1){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})



.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("en");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
	$translateProvider.useSanitizeValueStrategy("escapeParameters");
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("en");
})



.config(function($stateProvider,$urlRouterProvider,$sceDelegateProvider,$ionicConfigProvider,$httpProvider){
	/** tabs position **/
	$ionicConfigProvider.tabs.position("bottom");
	try{
	// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?hackathon/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?facebook/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("iot",{
		url: "/iot",
		abstract: true,
		templateUrl: "templates/iot-tabs.html",
	})

	.state("iot.about_us", {
		url: "/about_us",
		views: {
			"iot-about_us" : {
						templateUrl:"templates/iot-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("iot.activity", {
		url: "/activity",
		views: {
			"iot-activity" : {
						templateUrl:"templates/iot-activity.html",
						controller: "activityCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("iot.dashboard", {
		url: "/dashboard",
		views: {
			"iot-dashboard" : {
						templateUrl:"templates/iot-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("iot.devise", {
		url: "/devise",
		views: {
			"iot-devise" : {
						templateUrl:"templates/iot-devise.html",
						controller: "deviseCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	}).state("iot.inviteUsers", {
		url: "/inviteUsers",
		views: {
			"iot-devise" : {
						templateUrl:"templates/iot-inviteUsers.html",
						controller: "inviteUsersCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("iot.settings", {
		url: "/settings",
		views: {
			"iot-settings" : {
						templateUrl:"templates/iot-settings.html",
						controller: "settingsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("iot.slide_tab_menu", {
		url: "/slide_tab_menu",
		views: {
			"iot-slide_tab_menu" : {
						templateUrl:"templates/iot-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/iot/dashboard");
});
