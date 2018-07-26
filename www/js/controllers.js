angular.module("iot.controllers", [])



// TODO: indexCtrl --|-- 
    .controller("indexCtrl", function ($ionicConfig, $scope, $rootScope, $state, $location, $ionicScrollDelegate, $ionicListDelegate, $http, $httpParamSerializer, $stateParams, $timeout, $interval, $ionicLoading, $ionicPopup, $ionicPopover, $ionicActionSheet, $ionicSlideBoxDelegate, $ionicHistory, ionicMaterialInk, ionicMaterialMotion, $window, $ionicModal, base64, md5, $document, $sce, $ionicGesture, $translate, tmhDynamicLocale) {

        $rootScope.headerExists = true;

        // TODO: indexCtrl --|-- $rootScope.exitApp
        $rootScope.exitApp = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: "Confirm Exit",
                template: "Are you sure you want to exit?"
            });
            confirmPopup.then(function (close) {
                if (close) {
                    ionic.Platform.exitApp();
                }
                $rootScope.closeMenuPopover();
            });
        };

        // TODO: indexCtrl --|-- $rootScope.changeLanguage
        $rootScope.changeLanguage = function (langKey) {
            if (typeof langKey !== null) {
                $translate.use(langKey);
                tmhDynamicLocale.set(langKey);
                try {
                    $rootScope.language_option = langKey;
                    localforage.setItem("language_option", langKey);
                } catch (e) {
                    localforage.setItem("language_option", "en");
                }
            }
        };

        // TODO: indexCtrl --|-- $rootScope.showLanguageDialog
        var modal_language = "";
        modal_language += "<ion-modal-view>";
        modal_language += "<ion-header-bar class=\"bar bar-header bar-calm-900\">";
        modal_language += "<h1 class=\"title\">{{ 'Language' | translate }}</h1>";
        modal_language += "</ion-header-bar>";
        modal_language += "<ion-content class=\"padding\">";
        modal_language += "<div class=\"list\">";
        modal_language += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"language_option\" ng-value=\"'ar'\" ng-click=\"tryChangeLanguage('ar')\">Arabic</ion-radio>";
        modal_language += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"language_option\" ng-value=\"'en-us'\" ng-click=\"tryChangeLanguage('en-us')\">English - US</ion-radio>";
        modal_language += "<button class=\"button button-full button-calm-900\" ng-click=\"closeLanguageDialog()\">{{ 'Close' | translate }}</button>";
        modal_language += "</div>";
        modal_language += "</ion-content>";
        modal_language += "</ion-modal-view>";

        $rootScope.languageDialog = $ionicModal.fromTemplate(modal_language, {
            scope: $scope,
            animation: "slide-in-up"
        });

        $rootScope.showLanguageDialog = function () {
            $rootScope.languageDialog.show();
            localforage.getItem("language_option", function (err, value) {
                $rootScope.language_option = value;
            }).then(function (value) {
                $rootScope.language_option = value;
            }).catch(function (err) {
                $rootScope.language_option = "en";
            })
        };
        $rootScope.signOutUser = function () {
            //$state.go('iot.dashboard');
            var hideSheet = $ionicActionSheet.show({
                destructiveText: 'Logout',
                titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
                cancelText: 'Cancel',
                cancel: function () {
                },
                buttonClicked: function (index) {
                    return true;
                },
                destructiveButtonClicked: function () {
                    $ionicLoading.show({
                        template: 'Logging out...'
                    });

                    // Facebook logout
                    facebookConnectPlugin.logout(function () {
                            $ionicLoading.hide();
                            localStorage.removeItem('user')
                            $state.go('iot.dashboard');
                        },
                        function (fail) {
                            $ionicLoading.hide();
                        });
                }
            });
        };

        $rootScope.closeLanguageDialog = function () {
            $rootScope.languageDialog.hide();
            $rootScope.closeMenuPopover();
        };

        $rootScope.tryChangeLanguage = function (langKey) {
            $rootScope.changeLanguage(langKey);
        };

        localforage.getItem("language_option", function (err, value) {
            if (value === null) {
                localforage.setItem("language_option", "en");
            } else {
                $rootScope.changeLanguage(value);
            }
        }).then(function (value) {
            if (value === null) {
                localforage.setItem("language_option", "en");
            } else {
                $rootScope.changeLanguage(value);
            }
        }).catch(function (err) {
            localforage.setItem("language_option", "en");
        })
        // TODO: indexCtrl --|-- $rootScope.changeFontSize
        $rootScope.changeFontSize = function (fontSize) {
            if (typeof fontSize !== null) {
                try {
                    $rootScope.fontsize_option = $rootScope.fontsize = fontSize;
                    localforage.setItem("fontsize_option", fontSize);
                } catch (e) {
                    localforage.setItem("fontsize_option", "normal");
                }
            }
        };

        // TODO: indexCtrl --|-- $rootScope.showFontSizeDialog
        var modal_fontsize = "";
        modal_fontsize += "<ion-modal-view>";
        modal_fontsize += "<ion-header-bar class=\"bar bar-header bar-calm-900\">";
        modal_fontsize += "<h1 class=\"title\">{{ 'Font Size' | translate }}</h1>";
        modal_fontsize += "</ion-header-bar>";
        modal_fontsize += "<ion-content class=\"padding\">";
        modal_fontsize += "<div class=\"list\">";
        modal_fontsize += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"fontsize_option\" ng-value=\"'small'\" ng-click=\"tryChangeFontSize('small');\">{{ 'Small' | translate }}</ion-radio>";
        modal_fontsize += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"fontsize_option\" ng-value=\"'normal'\" ng-click=\"tryChangeFontSize('normal');\">{{ 'Normal' | translate }}</ion-radio>";
        modal_fontsize += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"fontsize_option\" ng-value=\"'large'\" ng-click=\"tryChangeFontSize('large');\">{{ 'Large' | translate }}</ion-radio>";
        modal_fontsize += "<button class=\"button button-full button-calm-900\" ng-click=\"closeFontSizeDialog()\">{{ 'Close' | translate }}</button>";
        modal_fontsize += "</div>";
        modal_fontsize += "</ion-content>";
        modal_fontsize += "</ion-modal-view>";

        $rootScope.fontSizeDialog = $ionicModal.fromTemplate(modal_fontsize, {
            scope: $scope,
            animation: "slide-in-up"
        });

        $rootScope.showFontSizeDialog = function () {
            $rootScope.fontSizeDialog.show();
            localforage.getItem("fontsize_option", function (err, value) {
                $rootScope.fontsize_option = $rootScope.fontsize = value;
            }).then(function (value) {
                $rootScope.fontsize_option = $rootScope.fontsize = value;
            }).catch(function (err) {
                $rootScope.fontsize_option = $rootScope.fontsize = "normal";
            })
        };

        $rootScope.closeFontSizeDialog = function () {
            $rootScope.fontSizeDialog.hide();
            $rootScope.closeMenuPopover();
        };

        localforage.getItem("fontsize_option", function (err, value) {
            if (value === null) {
                localforage.setItem("fontsize_option", "normal");
            } else {
                $rootScope.changeFontSize(value);
            }
        }).then(function (value) {
            if (value === null) {
                localforage.setItem("fontsize_option", "normal");
            } else {
                $rootScope.changeFontSize(value);
            }
        }).catch(function (err) {
            console.log(err);
            localforage.setItem("fontsize_option", "normal");
        })


        $rootScope.tryChangeFontSize = function (val) {
            $rootScope.changeFontSize(val);
        };

        // TODO: indexCtrl --|-- $rootScope.clearCacheApp
        $rootScope.clearCacheApp = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: "Confirm",
                template: "Are you sure you want to clear cache?"
            });
            confirmPopup.then(function (close) {
                if (close) {
                    localforage.keys().then(function (keys) {
                        for (var e = 0; e < keys.length; e++) {
                            localforage.setItem(keys[e], []);
                        }
                        $state.go("iot.dashboard");
                    }).catch(function (err) {
                        $state.go("iot.dashboard");
                    });
                }
                $rootScope.closeMenuPopover();
            });
        };
        $rootScope.last_edit = "-";
        $scope.$on("$ionicView.afterEnter", function () {
            var page_id = $state.current.name;
            $rootScope.page_id = page_id.replace(".", "-");
        });
        if ($rootScope.headerShrink == true) {
            $scope.$on("$ionicView.enter", function () {
                $scope.scrollTop();
            });
        }
        ;
        // TODO: indexCtrl --|-- $scope.scrollTop
        $rootScope.scrollTop = function () {
            $timeout(function () {
                $ionicScrollDelegate.$getByHandle("top").scrollTop();
            }, 100);
        };
        // TODO: indexCtrl --|-- $scope.openURL
        // open external browser
        $rootScope.openURL = function ($url) {
            window.open($url, "_system", "location=yes");
        };
        // TODO: indexCtrl --|-- $scope.openAppBrowser
        // open AppBrowser
        $rootScope.openAppBrowser = function ($url) {
            var appBrowser = window.open($url, "_blank", "hardwareback=Done,hardwareback=Done,toolbarposition=top,location=yes");

            appBrowser.addEventListener("loadstart", function () {
                navigator.notification.activityStart("Please Wait", "Its loading....");
            });


            appBrowser.addEventListener("loadstop", function () {
                navigator.notification.activityStop();
            });


            appBrowser.addEventListener("loaderror", function () {
                navigator.notification.activityStop();
                window.location = "retry.html";
            });


            appBrowser.addEventListener("exit", function () {
                navigator.notification.activityStop();
            });

        };


        // TODO: indexCtrl --|-- $scope.openWebView
        // open WebView
        $rootScope.openWebView = function ($url) {
            var appWebview = window.open($url, "_blank", "location=no,toolbar=no");

            appWebview.addEventListener("loadstart", function () {
                navigator.notification.activityStart("Please Wait", "Its loading....");
            });


            appWebview.addEventListener("loadstop", function () {
                navigator.notification.activityStop();
            });


            appWebview.addEventListener("loaderror", function () {
                navigator.notification.activityStop();
                window.location = "retry.html";
            });


            appWebview.addEventListener("exit", function () {
                navigator.notification.activityStop();
            });

        };


        // TODO: indexCtrl --|-- $scope.toggleGroup
        $scope.toggleGroup = function (group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };

        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };

        // TODO: indexCtrl --|-- $scope.redirect
        // redirect
        $scope.redirect = function ($url) {
            $window.location.href = $url;
        };

        // Set Motion
        $timeout(function () {
            ionicMaterialMotion.slideUp({
                selector: ".slide-up"
            });
        }, 300);
        // code

        var popover_template = "";
        popover_template += "<ion-popover-view class=\"fit\">";
        popover_template += "	<ion-content>";
        popover_template += "		<ion-list>";
        popover_template += "			<a  class=\"item dark-ink\" ng-href=\"#/iot/about_us\" ng-click=\"popover.hide()\">";
        popover_template += "			{{ 'About Us' | translate }}";
        popover_template += "			</a>";
        popover_template += "			<a  class=\"item dark-ink\" ng-click=\"showLanguageDialog()\" >";
        popover_template += "			{{ 'Language' | translate }}";
        popover_template += "			</a>";
        popover_template += "			<a  class=\"item dark-ink\" ng-click=\"signOutUser();popover.hide()\" >";
        popover_template += "			{{ 'Log-out' | translate }}";
        popover_template += "			</a>";
        popover_template += "		</ion-list>";
        popover_template += "	</ion-content>";
        popover_template += "</ion-popover-view>";


        $scope.popover = $ionicPopover.fromTemplate(popover_template, {
            scope: $scope
        });

        $scope.closePopover = function () {
            $scope.popover.hide();
        };

        $rootScope.closeMenuPopover = function () {
            $scope.popover.hide();
        };

        $scope.$on("$destroy", function () {
            $scope.popover.remove();
        });

        // TODO: indexCtrl --|-- controller_by_user
        // controller by user
        function controller_by_user() {
            try {


            } catch (e) {
            }
        }

        $scope.rating = {};
        $scope.rating.max = 5;

        // animation ink (ionic-material)
        ionicMaterialInk.displayEffect();
        controller_by_user();
    })

    // TODO: about_usCtrl --|--
    .controller("about_usCtrl", function ($ionicConfig, $scope, $rootScope, $state, $location, $ionicScrollDelegate, $ionicListDelegate, $http, $httpParamSerializer, $stateParams, $timeout, $interval, $ionicLoading, $ionicPopup, $ionicPopover, $ionicActionSheet, $ionicSlideBoxDelegate, $ionicHistory, ionicMaterialInk, ionicMaterialMotion, $window, $ionicModal, base64, md5, $document, $sce, $ionicGesture, $translate, tmhDynamicLocale) {

        $rootScope.headerExists = true;
        $rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
        $rootScope.grid64 = parseInt($rootScope.ionWidth / 64);
        $rootScope.grid80 = parseInt($rootScope.ionWidth / 80);
        $rootScope.grid128 = parseInt($rootScope.ionWidth / 128);
        $rootScope.grid256 = parseInt($rootScope.ionWidth / 256);
        $rootScope.last_edit = "menu";
        $scope.$on("$ionicView.afterEnter", function () {
            var page_id = $state.current.name;
            $rootScope.page_id = page_id.replace(".", "-");
        });
        if ($rootScope.headerShrink == true) {
            $scope.$on("$ionicView.enter", function () {
                $scope.scrollTop();
            });
        }
        ;
        // TODO: about_usCtrl --|-- $scope.scrollTop
        $rootScope.scrollTop = function () {
            $timeout(function () {
                $ionicScrollDelegate.$getByHandle("top").scrollTop();
            }, 100);
        };
        // TODO: about_usCtrl --|-- $scope.toggleGroup
        $scope.toggleGroup = function (group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };

        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };

        // TODO: about_usCtrl --|-- $scope.redirect
        // redirect
        $scope.redirect = function ($url) {
            $window.location.href = $url;
        };

        // Set Motion
        $timeout(function () {
            ionicMaterialMotion.slideUp({
                selector: ".slide-up"
            });
        }, 300);
        // code

        // TODO: about_usCtrl --|-- controller_by_user
        // controller by user
        function controller_by_user() {
            try {

                $ionicConfig.backButton.text("");
            } catch (e) {
            }
        }

        $scope.rating = {};
        $scope.rating.max = 5;

        // animation ink (ionic-material)
        ionicMaterialInk.displayEffect();
        controller_by_user();
    })

    // TODO: activityCtrl --|--
    .controller("activityCtrl", function ($ionicConfig, $scope, $rootScope, $state, $location, $ionicScrollDelegate, $ionicListDelegate, $http, $httpParamSerializer, $stateParams, $timeout, $interval, $ionicLoading, $ionicPopup, $ionicPopover, $ionicActionSheet, $ionicSlideBoxDelegate, $ionicHistory, ionicMaterialInk, ionicMaterialMotion, $window, $ionicModal, base64, md5, $document, $sce, $ionicGesture, $translate, tmhDynamicLocale) {

        $rootScope.headerExists = true;
        $rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
        $rootScope.grid64 = parseInt($rootScope.ionWidth / 64);
        $rootScope.grid80 = parseInt($rootScope.ionWidth / 80);
        $rootScope.grid128 = parseInt($rootScope.ionWidth / 128);
        $rootScope.grid256 = parseInt($rootScope.ionWidth / 256);
        $rootScope.last_edit = "menu";
        $scope.$on("$ionicView.afterEnter", function () {
            var page_id = $state.current.name;
            $rootScope.page_id = page_id.replace(".", "-");
        });
        if ($rootScope.headerShrink == true) {
            $scope.$on("$ionicView.enter", function () {
                $scope.scrollTop();
            });
        }
        ;
        // TODO: activityCtrl --|-- $scope.scrollTop
        $rootScope.scrollTop = function () {
            $timeout(function () {
                $ionicScrollDelegate.$getByHandle("top").scrollTop();
            }, 100);
        };
        // TODO: activityCtrl --|-- $scope.toggleGroup
        $scope.toggleGroup = function (group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };

        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };

        // TODO: activityCtrl --|-- $scope.redirect
        // redirect
        $scope.redirect = function ($url) {
            $window.location.href = $url;
        };

        // Set Motion
        $timeout(function () {
            ionicMaterialMotion.slideUp({
                selector: ".slide-up"
            });
        }, 300);
        // code

        // TODO: activityCtrl --|-- controller_by_user
        // controller by user
        function controller_by_user() {
            try {

                $ionicConfig.backButton.text("");
            } catch (e) {
            }
        }

        $scope.rating = {};
        $scope.rating.max = 5;

        // animation ink (ionic-material)
        ionicMaterialInk.displayEffect();
        controller_by_user();
    })

    // TODO: dashboardCtrl --|--
    .controller("dashboardCtrl", function ($ionicConfig, $scope, $rootScope, $state, $location, $q, UserFBService, $ionicScrollDelegate, $ionicListDelegate, $http, $httpParamSerializer, $stateParams, $timeout, $interval, $ionicLoading, $ionicPopup, $ionicPopover, $ionicActionSheet, $ionicSlideBoxDelegate, $ionicHistory, ionicMaterialInk, ionicMaterialMotion, $window, $ionicModal, base64, md5, $document, $sce, $ionicGesture, $translate, tmhDynamicLocale) {

        $rootScope.headerExists = true;
        $rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
        $rootScope.grid64 = parseInt($rootScope.ionWidth / 64);
        $rootScope.grid80 = parseInt($rootScope.ionWidth / 80);
        $rootScope.grid128 = parseInt($rootScope.ionWidth / 128);
        $rootScope.grid256 = parseInt($rootScope.ionWidth / 256);
        $rootScope.last_edit = "menu";
        $rootScope.checkUserData();
        $scope.$on("$ionicView.afterEnter", function () {
            var page_id = $state.current.name;
            $rootScope.page_id = page_id.replace(".", "-");
            if (angular.isDefined(localStorage.getItem('user')) && localStorage.getItem('user') != '' && localStorage.getItem('user') != null) {
                $state.go('iot.devise');
            }
        });


        $scope.LogIn = function () {
            $scope.facebookSignIn();
            //$state.go('iot.devise');
        };


        //================================================================================================================
        //This is the success callback from the login method
        var fbLoginSuccess = function (response) {
            if (!response.authResponse) {
                fbLoginError("Cannot find the authResponse");
                return;
            }

            var authResponse = response.authResponse;

            getFacebookProfileInfo(authResponse)
                .then(function (profileInfo) {
                    //for the purpose of this example I will store user data on local storage
                    UserFBService.setUser({
                        authResponse: authResponse,
                        userID: profileInfo.id,
                        name: profileInfo.name,
                        email: profileInfo.email,
                        picture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
                    });

                    $ionicLoading.hide();
                    $rootScope.user = UserFBService.getUser();

                    // Put the object into storage
                    localStorage.setItem('user', JSON.stringify($rootScope.user));
                    $state.go('iot.devise');

                }, function (fail) {
                    //fail get profile info
                    console.log('profile info fail', fail);
                });
        };


        //This is the fail callback from the login method
        var fbLoginError = function (error) {
            console.log('fbLoginError', error);
            $ionicLoading.hide();
        };

        //this method is to get the user profile info from the facebook api
        var getFacebookProfileInfo = function (authResponse) {
            var info = $q.defer();

            facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
                function (response) {
                    console.log(response);
                    info.resolve(response);
                },
                function (response) {
                    console.log(response);
                    info.reject(response);
                }
            );
            return info.promise;
        };

        //This method is executed when the user press the "Login with facebook" button
        $scope.facebookSignIn = function () {

            facebookConnectPlugin.getLoginStatus(function (success) {
                if (success.status === 'connected') {
                    // the user is logged in and has authenticated your app, and response.authResponse supplies
                    // the user's ID, a valid access token, a signed request, and the time the access token
                    // and signed request each expire
                    console.log('getLoginStatus', success.status);

                    //check if we have our user saved
                    var user = UserFBService.getUser('facebook');
                    if (!user.userID) {
                        getFacebookProfileInfo(success.authResponse)
                            .then(function (profileInfo) {

                                //for the purpose of this example I will store user data on local storage
                                UserFBService.setUser({
                                    authResponse: success.authResponse,
                                    userID: profileInfo.id,
                                    name: profileInfo.name,
                                    email: profileInfo.email,
                                    picture: "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
                                });

                                $rootScope.user = UserFBService.getUser();

                                // Put the object into storage
                                localStorage.setItem('user', JSON.stringify($rootScope.user));
                                $state.go('iot.devise');

                            }, function (fail) {
                                //fail get profile info
                                console.log('profile info fail', fail);
                            });
                    } else {
                        $rootScope.user = UserFBService.getUser();
                        localStorage.setItem('user', JSON.stringify($rootScope.user));

                        $state.go('iot.devise');
                    }

                } else {
                    //if (success.status === 'not_authorized') the user is logged in to Facebook, but has not authenticated your app
                    //else The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
                    console.log('getLoginStatus', success.status);

                    $ionicLoading.show({
                        template: 'Logging in...'
                    });

                    //ask the permissions you need. You can learn more about FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
                    facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
                }
            });
        };
        //=============================================================================================================

    })

    // TODO: dashboardCtrl --|--
    .controller("inviteUsersCtrl", function ($ionicConfig, $scope, $rootScope, $state, $location, $q, UserFBService, $ionicScrollDelegate, $ionicListDelegate, $http, $httpParamSerializer, $stateParams, $timeout, $interval, $ionicLoading, $ionicPopup, $ionicPopover, $ionicActionSheet, $ionicSlideBoxDelegate, $ionicHistory, ionicMaterialInk, ionicMaterialMotion, $window, $ionicModal, base64, md5, $document, $sce, $ionicGesture, $translate, tmhDynamicLocale) {

        $rootScope.headerExists = true;
        $rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
        $rootScope.grid64 = parseInt($rootScope.ionWidth / 64);
        $rootScope.grid80 = parseInt($rootScope.ionWidth / 80);
        $rootScope.grid128 = parseInt($rootScope.ionWidth / 128);
        $rootScope.grid256 = parseInt($rootScope.ionWidth / 256);
        $rootScope.last_edit = "menu";
        $scope.$on("$ionicView.afterEnter", function () {
            var page_id = $state.current.name;
            $rootScope.page_id = page_id.replace(".", "-");
        });
        // $scope.deviceInfoValueD.type=1;
        $scope.saveInviteUsers = function () {
            //$scope.facebookSignIn();
            $state.go('iot.devise');
        };
        //=====================================================
        $scope.initDataRAnge = function () {
            var now = new Date(),
                week = [now, new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6, 23, 59)];

            $scope.val = null;
            $scope.val = week;
            $scope.demo = null;
            $scope.demo = {
                controls: ['calendar', 'time'],  // More info about controls: https://docs.mobiscroll.com/4-2-4/angularjs/range#opt-controls
                startInput: '#startDate',        // More info about startInput: https://docs.mobiscroll.com/4-2-4/angularjs/range#opt-startInput
                endInput: '#endDate'             // More info about endInput: https://docs.mobiscroll.com/4-2-4/angularjs/range#opt-endInput
            };

        };

        /*  $scope.range = {
              startInput: '#startRange',       // More info about startInput: https://docs.mobiscroll.com/4-2-4/angularjs/range#opt-startInput
              endInput: '#endRange',           // More info about endInput: https://docs.mobiscroll.com/4-2-4/angularjs/range#opt-endInput
              controls: ['date', 'time'],      // More info about controls: https://docs.mobiscroll.com/4-2-4/angularjs/range#opt-controls
              dateWheels: '|D M d|',           // More info about dateWheels: https://docs.mobiscroll.com/4-2-4/angularjs/range#localization-dateWheels
              cssClass: 'scroller-range'       // More info about cssClass: https://docs.mobiscroll.com/4-2-4/angularjs/range#opt-cssClass
          };*/
        //=====================================================


    })

    // TODO: deviseCtrl --|--
    .controller("deviseCtrl", function ($ionicConfig, $scope, $rootScope, $state, $location, $ionicScrollDelegate, $ionicListDelegate, $http, $httpParamSerializer, $stateParams, $timeout, $interval, $ionicLoading, $ionicPopup, $ionicPopover, $ionicActionSheet, $ionicSlideBoxDelegate, $ionicHistory, ionicMaterialInk, ionicMaterialMotion, $window, $ionicModal, base64, md5, $document, $sce, $ionicGesture, $translate, tmhDynamicLocale) {

        $rootScope.headerExists = true;
        $rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
        $rootScope.grid64 = parseInt($rootScope.ionWidth / 64);
        $rootScope.grid80 = parseInt($rootScope.ionWidth / 80);
        $rootScope.grid128 = parseInt($rootScope.ionWidth / 128);
        $rootScope.grid256 = parseInt($rootScope.ionWidth / 256);
        $rootScope.last_edit = "menu";
        $scope.$on("$ionicView.afterEnter", function () {
            var page_id = $state.current.name;
            $rootScope.page_id = page_id.replace(".", "-");
        });
        if ($rootScope.headerShrink == true) {
            $scope.$on("$ionicView.enter", function () {
                $scope.scrollTop();
            });
        }
        ;
        if (!$rootScope.checkUserData()) {
            $state.go('iot.dashboard');
        }

        $scope.items = [
            {id: 0},
            {id: 1},
            {id: 2},
            {id: 3},
            {id: 4},
            {id: 5},
            {id: 6},
            {id: 7},
            {id: 8},
            {id: 9},
            {id: 10},
            {id: 11},
            {id: 12},
            {id: 13},
            {id: 14},
            {id: 15}
        ];

        $scope.getInviteUsersData = function (device_id) {
            $scope.inviteUsers = [];
            $ionicLoading.show({
                template: 'Logging out...'
            });
            $http.get($rootScope.serverURL + '?json=invite_users&device_id=' + device_id)
                .then(function (response) {
                    $scope.inviteUsers = response['data'];
                    $ionicLoading.hide();
                }, function (error) {
                    alert("ERROR");
                    $ionicLoading.hide();
                });

        };

        $scope.onInviteDelete = function (item) {
            $scope.inviteUsers.splice($scope.inviteUsers.indexOf(item), 1);
        };


        $scope.showInviteUsersDialog = function () {

            $scope.deviceInfoValueD.type = 1;

            $state.go('iot.inviteUsers');
            $scope.closeDeviceInfoDialog();
        };

        $scope.showDeviceInfo = function (deviceInfo) {

            $scope.deviceInfoValueD = deviceInfo;

            $ionicModal.fromTemplateUrl('templates/iot-info.html', {
                scope: $scope,
                controller: 'deviseCtrl'
            }).then(function (modal) {
                $scope.deviceInfoValueDialog = modal;
            });


            setTimeout(function () {
                $scope.getInviteUsersData($scope.deviceInfoValueD.id);
                $scope.deviceInfoValueDialog.show();

            }, 200);
        };
        $scope.closeDeviceInfoDialog = function () {
            $scope.deviceInfoValueDialog.hide();
            $scope.closeMenuPopover();
        };
        $scope.placeSelected = null;

        /*  $scope.placeSelected = {
              "id": 1,
              "name": "Home in Beirut",
              "details": "details Info",
              "type": 1,
              "deviseCount": 22,
        };
        /*  $scope.placeList = [
              {
                  "id": 1,
                  "name": "Home in Lebanon",
                  "details": "details Info",
                  "type": 1,
                  "deviseCount": 11,
              }, {
                  "id": 2,
                  "name": "office in Beirut",
                  "details": "details Info",
                  "type": 2,
                  "deviseCount": 3,
              }, {
                  "id": 3,
                  "name": "Build in Beirut",
                  "details": "details Info",
                  "type": 3,
                  "deviseCount": 18,
              },
          ];*/

        $scope.getPlaceData = function () {
            $scope.deviceList = [];
            $ionicLoading.show({
                template: 'Logging out...'
            });
            $http.get($rootScope.serverURL + '?json=place_data')
                .then(function (response) {
                    $scope.placeList = response['data'];
                    $scope.placeSelected = $scope.placeList[0];
                    $scope.getDeviceData($scope.placeSelected.id);
                    $ionicLoading.hide();
                }, function (error) {
                    alert("ERROR");
                    $ionicLoading.hide();
                });

        };
        $scope.getPlaceData();
        $scope.showPlaceListDialog = function (isEdit) {
            $scope.place = null;
            if (isEdit)
                $scope.place = $scope.placeSelected;


            $ionicModal.fromTemplateUrl('templates/iot-placeList.html', {
                scope: $scope,
                controller: 'deviseCtrl'
            }).then(function (modal) {
                $scope.palceListDialog = modal;
            });

            setTimeout(function () {
                $scope.palceListDialog.show();
            }, 100);
        };
        $scope.closePlaceListDialog = function () {
            $scope.palceListDialog.hide();
            $scope.closeMenuPopover();
        };

        $scope.showEditDeviceDialog = function (deviceData) {
            $scope.deviceData = {};
            $scope.deviceData.image = "tap.svg";

            if (angular.isDefined(deviceData))
                $scope.deviceData = deviceData;


            $ionicModal.fromTemplateUrl('templates/iot-editDevice.html', {
                scope: $scope,
                controller: 'deviseCtrl'
            }).then(function (modal) {
                $scope.editDeviceDialog = modal;
            });

            setTimeout(function () {
                $scope.editDeviceDialog.show();
            }, 100);
        };
        $scope.closeEditDeviceDialog = function () {
            $scope.editDeviceDialog.hide();
            $scope.closeMenuPopover();
        };


        $scope.saveDevice = function () {
            /*
            $http.post( $rootScope.serverURL + '?json=edit_device',{
                "name": $scope.deviceData.name,
                "image": $scope.deviceData.image,
                "detail": $scope.deviceData.detail,
                "fk_place_id": $scope.deviceData.fk_place_id,

            }).then(function(response) {
                    if (response['status']) {
                        $scope.editDeviceDialog.hide();
                        $scope.closeMenuPopover();
                    } else {
                        alert('error')
                    }
                    $ionicLoading.hide();
                    console.log(response);
                })
                */

            $ionicLoading.show({
                template: 'Logging out...'
            });
            $http.get($rootScope.serverURL + '?json=edit_device&name=' + $scope.deviceData.name + '&image=' + $scope.deviceData.image + '&detail=' + $scope.deviceData.detail + '&fk_place_id=' + $scope.deviceData.fk_place_id + '&device_code=' + $scope.deviceData.device_code)
                .then(function (response) {
                    if (response['data']['status'] == true) {
                        $scope.closeEditDeviceDialog();
                    } else {
                        alert('error')
                    }
                    $ionicLoading.hide();
                    console.log(response);
                }, function (error) {
                    alert("ERROR");
                    $ionicLoading.hide();
                });

        };


        $scope.getFiles = ['007-sewing-machine.svg',
            '008-stove.svg',
            '009-food-steamer.svg',
            '010-armchair.svg',
            '011-shaver.svg',
            '013-fridge.svg',
            '014-radio-1.svg',
            '015-printer.svg',
            '016-router.svg',
            '017-mixing.svg',
            '018-mixer.svg',
            '020-livingroom.svg',
            '021-desk.svg',
            '022-iron.svg',
            '023-radio.svg',
            '024-headphones.svg',
            '025-fan.svg',
            '026-hair-dryer.svg',
            '027-driller.svg',
            '028-computer.svg',
            '029-coffee-machine.svg',
            '030-photo-camera.svg',
            '031-tea-pot.svg',
            '032-boiler.svg',
            '033-blender.svg',
            '034-bathroom.svg',
            '035-bathtub.svg',
            '1.svg',
            '2.svg',
            '3.svg',
            '4.svg',
            '5.svg',
            '6.svg',
            '7.svg',
            '8.svg',
            '9.svg',];
        $scope.showChooseImageDialog = function (imageName) {


            $ionicModal.fromTemplateUrl('templates/iot-imageList.html', {
                scope: $scope,
                controller: 'deviseCtrl'
            }).then(function (modal) {
                $scope.ChooseImageDialog = modal;
            });

            setTimeout(function () {
                $scope.ChooseImageDialog.show();
            }, 100);
        };
        $scope.closeChooseImageDialog = function () {
            $scope.ChooseImageDialog.hide();
            $scope.closeMenuPopover();
        };

        /*    $scope.deviceList = [
                {
                    "id": 1,
                    "name": "Microwave oven",
                    "icon": "7.svg",
                    "status": false,
                    "details": "details Info",
                }, {
                    "id": 2,
                    "name": "Rice Cooker",
                    "icon": "8.svg",
                    "status": false,
                    "details": "details Info",
                }, {
                    "id": 3,
                    "name": "Air Conditioner",
                    "icon": "9.svg",
                    "status": true,
                    "details": "details Info",
                }, {
                    "id": 4,
                    "name": "Washing Machine",
                    "icon": "2.svg",
                    "status":false,
                    "details": "details Info",
                }, {
                    "id": 5,
                    "name": "Water Heater",
                    "icon": "1.svg",
                    "status":true,
                    "details": "Water Heater",
                },
            ];*/
        $scope.deviceList = [];
        $scope.getDeviceData = function (place_id) {
            $scope.deviceList = [];
            $ionicLoading.show({
                template: 'Logging out...'
            });
            $http.get($rootScope.serverURL + '?json=device_data&place_id=' + place_id)
                .then(function (response) {
                    $scope.deviceList = response['data'];
                    $ionicLoading.hide();
                }, function (error) {
                    alert("ERROR");
                    $ionicLoading.hide();
                });

        };

        $scope.selectPlace = function (placeInfo) {
            //TODO call api device list
            $scope.getDeviceData(placeInfo.id);
            $scope.placeSelected = placeInfo;
            $scope.closePlaceListDialog();
        };
        $scope.showEditPlaceDialog = function (isEdit) {
            $scope.isEdit = isEdit;
            if (isEdit)
                $scope.place = $scope.placeSelected;

            $ionicModal.fromTemplateUrl('templates/iot-editPlace.html', {
                scope: $scope,
                controller: 'deviseCtrl'
            }).then(function (modal) {
                $scope.editPalceDialog = modal;
            });


            setTimeout(function () {
                $scope.editPalceDialog.show();

            }, 100);
        };
        $scope.closeEditPlaceDialog = function () {
            $scope.editPalceDialog.hide();
            $scope.closeMenuPopover();
        };

        $scope.savePlace = function (place) {
            /*
            $http.post( $rootScope.serverURL + '?json=edit_device',{
                "name": $scope.deviceData.name,
                "image": $scope.deviceData.image,
                "detail": $scope.deviceData.detail,
                "fk_place_id": $scope.deviceData.fk_place_id,

            }).then(function(response) {
                    if (response['status']) {
                        $scope.editDeviceDialog.hide();
                        $scope.closeMenuPopover();
                    } else {
                        alert('error')
                    }
                    $ionicLoading.hide();
                    console.log(response);
                })
                */

            $ionicLoading.show({
                template: 'Logging out...'
            });
            $http.get($rootScope.serverURL + '?json=save_place&name=' + place.name + '&details=' + place.details + '&user_id=1&type=' + place.type)
                .then(function (response) {
                    if (response['data']['status'] == true) {
                        $scope.getPlaceData();
                        $scope.closeEditPlaceDialog();
                    } else {
                        alert('error')
                    }
                    $ionicLoading.hide();
                    console.log(response);
                }, function (error) {
                    alert("ERROR");
                    $ionicLoading.hide();
                });

        };
        $scope.changeStatus = function (id, status) {
            $ionicLoading.show({
                template: 'Logging out...'
            });
            $http.get($rootScope.serverURL + '?json=status_device&id=' + id + '&status=' + status)
                .then(function (response) {
                    if (response['data']['status'] == true) {
                        $rootScope.showAlert('Change Status', 'Change status is successful')

                    } else {
                        alert('error')
                    }
                    $ionicLoading.hide();
                    console.log(response);
                }, function (error) {
                    alert("ERROR");
                    $ionicLoading.hide();
                });

        };


        // TODO: deviseCtrl --|-- $scope.scrollTop
        $rootScope.scrollTop = function () {
            $timeout(function () {
                $ionicScrollDelegate.$getByHandle("top").scrollTop();
            }, 100);
        };
        // TODO: deviseCtrl --|-- $scope.toggleGroup
        $scope.toggleGroup = function (group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };

        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };

        // TODO: deviseCtrl --|-- $scope.redirect
        // redirect
        $scope.redirect = function ($url) {
            $window.location.href = $url;
        };

        // Set Motion
        $timeout(function () {
            ionicMaterialMotion.slideUp({
                selector: ".slide-up"
            });
        }, 300);
        // code

        // TODO: deviseCtrl --|-- controller_by_user
        // controller by user
        function controller_by_user() {
            try {

                $ionicConfig.backButton.text("");
            } catch (e) {
            }
        }

        $scope.rating = {};
        $scope.rating.max = 5;

        // animation ink (ionic-material)
        ionicMaterialInk.displayEffect();
        controller_by_user();
    })

    // TODO: settingsCtrl --|--
    .controller("settingsCtrl", function ($ionicConfig, $scope, $rootScope, $state, $location, UserFBService, $ionicScrollDelegate, $ionicListDelegate, $http, $httpParamSerializer, $stateParams, $timeout, $interval, $ionicLoading, $ionicPopup, $ionicPopover, $ionicActionSheet, $ionicSlideBoxDelegate, $ionicHistory, ionicMaterialInk, ionicMaterialMotion, $window, $ionicModal, base64, md5, $document, $sce, $ionicGesture, $translate, tmhDynamicLocale) {

        $rootScope.headerExists = true;
        $rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
        $rootScope.grid64 = parseInt($rootScope.ionWidth / 64);
        $rootScope.grid80 = parseInt($rootScope.ionWidth / 80);
        $rootScope.grid128 = parseInt($rootScope.ionWidth / 128);
        $rootScope.grid256 = parseInt($rootScope.ionWidth / 256);
        $rootScope.last_edit = "menu";
        $scope.$on("$ionicView.afterEnter", function () {
            var page_id = $state.current.name;
            $rootScope.page_id = page_id.replace(".", "-");
        });
        if ($rootScope.headerShrink == true) {
            $scope.$on("$ionicView.enter", function () {
                $scope.scrollTop();
            });
        }
        ;
        $scope.user = $rootScope.user;

        // TODO: settingsCtrl --|-- $scope.scrollTop
        $rootScope.scrollTop = function () {
            $timeout(function () {
                $ionicScrollDelegate.$getByHandle("top").scrollTop();
            }, 100);
        };
        // TODO: settingsCtrl --|-- $scope.toggleGroup
        $scope.toggleGroup = function (group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };

        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };

        // TODO: settingsCtrl --|-- $scope.redirect
        // redirect
        $scope.redirect = function ($url) {
            $window.location.href = $url;
        };

        // Set Motion
        $timeout(function () {
            ionicMaterialMotion.slideUp({
                selector: ".slide-up"
            });
        }, 300);
        // code

        // TODO: settingsCtrl --|-- controller_by_user
        // controller by user
        function controller_by_user() {
            try {

                $ionicConfig.backButton.text("");
            } catch (e) {
            }
        }

        $scope.rating = {};
        $scope.rating.max = 5;

        // animation ink (ionic-material)
        ionicMaterialInk.displayEffect();
        controller_by_user();
    })

    // TODO: slide_tab_menuCtrl --|--
    .controller("slide_tab_menuCtrl", function ($ionicConfig, $scope, $rootScope, $state, $location, $ionicScrollDelegate, $ionicListDelegate, $http, $httpParamSerializer, $stateParams, $timeout, $interval, $ionicLoading, $ionicPopup, $ionicPopover, $ionicActionSheet, $ionicSlideBoxDelegate, $ionicHistory, ionicMaterialInk, ionicMaterialMotion, $window, $ionicModal, base64, md5, $document, $sce, $ionicGesture, $translate, tmhDynamicLocale) {

        $rootScope.headerExists = true;
        $rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
        $rootScope.grid64 = parseInt($rootScope.ionWidth / 64);
        $rootScope.grid80 = parseInt($rootScope.ionWidth / 80);
        $rootScope.grid128 = parseInt($rootScope.ionWidth / 128);
        $rootScope.grid256 = parseInt($rootScope.ionWidth / 256);
        $rootScope.last_edit = "menu";
        $scope.$on("$ionicView.afterEnter", function () {
            var page_id = $state.current.name;
            $rootScope.page_id = page_id.replace(".", "-");
        });
        if ($rootScope.headerShrink == true) {
            $scope.$on("$ionicView.enter", function () {
                $scope.scrollTop();
            });
        }
        ;
        // TODO: slide_tab_menuCtrl --|-- $scope.scrollTop
        $rootScope.scrollTop = function () {
            $timeout(function () {
                $ionicScrollDelegate.$getByHandle("top").scrollTop();
            }, 100);
        };
        // TODO: slide_tab_menuCtrl --|-- $scope.toggleGroup
        $scope.toggleGroup = function (group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };

        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };

        // TODO: slide_tab_menuCtrl --|-- $scope.redirect
        // redirect
        $scope.redirect = function ($url) {
            $window.location.href = $url;
        };

        // Set Motion
        $timeout(function () {
            ionicMaterialMotion.slideUp({
                selector: ".slide-up"
            });
        }, 300);
        // code

        // TODO: slide_tab_menuCtrl --|-- controller_by_user
        // controller by user
        function controller_by_user() {
            try {

                $ionicConfig.backButton.text("");
            } catch (e) {
            }
        }

        $scope.rating = {};
        $scope.rating.max = 5;

        // animation ink (ionic-material)
        ionicMaterialInk.displayEffect();
        controller_by_user();
    })
