// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


var db = null;
var catid=0;
var jsondata = [];

var statusDom=null;
var myProgress=null;

var teller;




//return an array of objects according to key, value, or key and value matching
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}

//return an array of values that match on a certain key
function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
};

//return an array of keys that match on a certain value
function getKeys(obj, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getKeys(obj[i], val));
        } else if (obj[i] == val) {
            objects.push(i);
        }
    }
    return objects;
};




/**
* Repeat a string `n`-times (recursive)
* @param {String} s - The string you want to repeat.
* @param {Number} n - The times to repeat the string.
* @param {String} d - A delimiter between each string.
*/

var repeat = function (s, n, d) {
  return --n ? s + (d || "") + repeat(s, n, d) : "" + s;
};


starter = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova','ngSanitize'])

.run(function($ionicPlatform, $cordovaFile, $cordovaFileTransfer, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }


    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    };

    if (window.sqlitePlugin) {
           window.plugins.sqlDB.copy("mammarosa.db", function () {
             console.log("correct")
           }, function (e) {
             console.log("error: "+ e)
           });
         };



    window.plugin.notification.local.onadd = function (id, state, json) {
                var notification = {
                    id: id,
                    state: state,
                    json: json
                };
                $timeout(function() {
                    $rootScope.$broadcast("$cordovaLocalNotification:added", notification);
                });
            };


                      db = $cordovaSQLite.openDB("mammarosa.db");




                      // ******************************************

                      var query = "UPDATE video_extra_data SET 'downloading'='0' WHERE 1;";

                                                            //      alert('2 :' +query);
                                                                  $cordovaSQLite.execute(db, query)
                                                                  .then(function(res){
                                                               console.log('Reseted Downloading tag : '+res.rows.length );

                                                                  },
                                                                  function(err){
                                                                    console.log("Error SQLite: " + JSON.stringify(err));
                                                                  });

                      // ******************************************



//            db = $cordovaSQLite.openDB("my.db");
//            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");

/*
console.log('open db 2');
   db = window.sqlitePlugin.openDatabase({name: "mammarosa.db"});

   db.transaction(function(tx) {
     tx.executeSql("select count(id) as cnt from locales;", [], function(tx, res) {
       console.log("res.rows.length: " + res.rows.length + " -- should be 1");
       console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
     });
   });
*/

/*
      db.transaction(function(tx) {
      //  tx.executeSql('DROP TABLE IF EXISTS test_table');
      //  tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');

        // demonstrate PRAGMA:
        db.executeSql("pragma table_info (test_table);", [], function(res) {
          console.log("PRAGMA res: " + JSON.stringify(res));
        });

        tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
          console.log("insertId: " + res.insertId + " -- probably 1");
          console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

          db.transaction(function(tx) {
            tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
              console.log("res.rows.length: " + res.rows.length + " -- should be 1");
              console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
            });
          });

        }, function(e) {
          console.log("ERROR: " + e.message);
        });
      });

*/


  });
})

.filter("trustUrl", ['$sce', function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
    }])

.directive('clickForOptions', ['$ionicGesture', function($ionicGesture) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $ionicGesture.on('tap', function(e){

                // Grab the content
                var content = element[0].querySelector('.item-content');

                // Grab the buttons and their width
                var buttons = element[0].querySelector('.item-options');

                if (!buttons) {
                    console.log('There are no option buttons');
                    return;
                }
                var buttonsWidth = buttons.offsetWidth;

                ionic.requestAnimationFrame(function() {
                    content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

                    if (!buttons.classList.contains('invisible')) {
                        console.log('close');
                        content.style[ionic.CSS.TRANSFORM] = '';
                        setTimeout(function() {
                            buttons.classList.add('invisible');
                        }, 250);
                    } else {
                        buttons.classList.remove('invisible');
                        content.style[ionic.CSS.TRANSFORM] = 'translate3d(-' + buttonsWidth + 'px, 0, 0)';
                    }
                });

            }, element);
        }
    };
}])

.directive('hideTabs', function($rootScope) {
  return {
      restrict: 'A',
      link: function($scope, $el) {
          $rootScope.hideTabs = 'tabs-item-hide';
          $scope.$on('$destroy', function() {
              $rootScope.hideTabs = '';
          });
      }
  };
})


    .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider','$compileProvider', function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$compileProvider) {

      $ionicConfigProvider.tabs.position('bottom'); // other values: top
      // $ionicConfigProvider.backButton.text('').previousTitleText(false);

           $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
          .state('entry', {
              url : '/entry',
              templateUrl : 'templates/entry.html',
              controller : 'MainController'
          })

          .state('main', {
              url : '/main',
              templateUrl : 'templates/mainContainer.html',
              abstract : true,
              controller : 'MainController'
          })

          .state('main.home', {
              url: '/home',
              views: {
                  'main': {
                      templateUrl: 'templates/tab-maincategories.html',
                      controller : 'MainCategoryCtrl'
                  }
              }
          })


          .state('main.help', {
              url: '/help',
              views: {
                  'main': {
                      templateUrl: 'templates/tab-help.html',
                      controller : 'HelpCtrl'
                  }
              }
          })

          .state('main.account', {
              url: '/home',
              views: {
                  'main': {
                      templateUrl: 'templates/tab-account.html',
                      controller : 'AccountCtrl'
                  }
              }
          })

          .state('main.reload', {
              url: '/home',
              views: {
                  'main': {
                      templateUrl: 'templates/tab-dash.html',
                      controller : 'reloadDataCtrl'
                  }
              }
          })





          .state('main.items', {
              url: '/items/:catid',
              views: {
                'main': {
                  templateUrl: 'templates/tab-chats.html',
                  controller: 'CategoryCtrl'
                }
              }
            })



            .state('main.chat-detail', {
              url: '/chats/:catid',
              views: {
                'main': {
                  templateUrl: 'templates/chat-detail.html',
                  controller: 'ChatDetailCtrl'
                }
              }
            })


            .state('main.movie-detail', {
              url: '/clips/:videoclipid',
              views: {
                'main': {
                  templateUrl: 'templates/movie-detail.html',
                  controller: 'ClipsDetailCtrl'
                }
              }
            })


            .state('feedbackvideo', {
                url: '/feedbackvideo/:videoclipid',
                templateUrl: 'templates/feedback-video.html',
                controller: 'FeedbackVideoCtrl'
              })

          .state('main.languages', {
              url: '/languages',
              views: {
                  'main': {
                      templateUrl: 'templates/tab-languages.html',
                      controller : 'LanguagesCtrl'
                  }
              }
          })

            .state('main.gallery', {
                url: '/gallery',
                views: {
                  'main': {
                    templateUrl: 'templates/tab-gallery.html',
                    controller: 'GalleryCtrl'
                  }
                }
              })

              .state('signin', {
                url: '/sign-in',
                templateUrl: 'templates/sign-in.html',
                controller: 'SignInCtrl'
              })
              .state('forgotpassword', {
                url: '/forgot-password',
                templateUrl: 'templates/forgot-password.html'
              })

          .state('main.tabs', {
               url: '/tabs',
               views: {
                   'main': {
                       templateUrl: 'tabs.html',
                       controller : 'TabsPageController'
                   }
               }
          })

      $urlRouterProvider.otherwise('/entry');
  }])

      .controller('xMainController', function($scope, $ionicSideMenuDelegate) {
      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
    })

      .controller('HomePageController', [ '$scope', '$state', function($scope, $state) {
          $scope.navTitle = 'Home Page';

          $scope.leftButtons = [{
              type: 'button-icon icon ion-navicon',
              tap: function(e) {
                  $scope.toggleMenu();
              }
          }];
      }])

      .controller('InfoPageController', [ '$scope', '$state', function($scope, $state) {
          $scope.navTitle = 'Info Page';

          $scope.leftButtons = [{
              type: 'button-icon icon ion-navicon',
              tap: function(e) {
                  $scope.toggleMenu();
              }
          }];
      }])

      .controller('TabsPageController', [ '$scope', '$state', function($scope, $state) {
          $scope.navTitle = 'Tab Page';

          $scope.leftButtons = [{
              type: 'button-icon icon ion-navicon',
              tap: function(e) {
                  $scope.toggleMenu();
              }
          }];
      }])



.config(function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects.
  $sceProvider.enabled(false);
})

.controller('MainCtrl', function($scope) {
  var that = this;

  $scope.showTest = true;

  $scope.showalert = function(msg) {
    alert(msg);
  };
})


.controller('MainController', function($q, $scope, $state, $stateParams,$ionicHistory,$ionicScrollDelegate, $ionicNavBarDelegate, $http, $window,FeedbackService, FileService, appUpdateService, appDownloadService, $ionicLoading, $ionicPopup, $timeout,  $cordovaSQLite, $cordovaLocalNotification, $cordovaVibration, $cordovaDevice, $cordovaFile, $cordovaFileTransfer,$ionicSideMenuDelegate, $ionicPlatform,$rootScope) {

console.log('Loading Controller starting...');

$scope.catid = 0;

$scope.navTitle = "{{navTitle}}";

$scope.EntryPageVisible=false;

$scope.signIn = function() {
//  var navTitle = '';

// $ionicNavBarDelegate.title(navTitle);

    $state.go('main.home');
}

$scope.toggleLeft = function() {
  $ionicSideMenuDelegate.toggleLeft();
};

$scope.toggleRight = function() {
  $ionicSideMenuDelegate.toggleRight();
};


// sdb = $cordovaSQLite.openDB({ name: "mammarosa.db" });

  // for opening a background db:
//  var db = $cordovaSQLite.openDB({ name: "my.db", bgType: 1 });


// window.localStorage.setItem("config_language", '2');
$scope.contact = [
           {id: '1', name: "Dayana Oliveira"},
           {id: '2', name: "Sylvia Peters"},
           {id: '3', name: "Oliveira"},
           {id: '4', name: "Sylvia"},
           {id: '5', name: "Dayana"},
           {id: '2', name: "Peters"},
           {id: '1', name: "Dayana Oliveira"},
           {id: '2', name: "Sylvia Peters"},
           {id: '3', name: "Oliveira"},
           {id: '4', name: "Sylvia"},
           {id: '5', name: "Dayana"}
       ];


  $http.get('json/jsonFormatter.json')
          .success(function(results) {

            console.log('init JSON loaded from URL');
              var jsondata = results;



              console.log(jsondata);
              window.localStorage.setItem("profile", JSON.stringify(results));

              console.log('init localStorage set, loading main_category_items');
              $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));
              console.log( $scope.jsondata);
              $scope.main_category_items = $scope.jsondata.main_category_items;
              //  $scope.main_category_items = main_category_items;
              console.log('init loading main_category_items');
                console.log( $scope.main_category_items );
  });

  /*
Here is what I am using for my Android and IOS apps
Keep attention to a couple of things:
-	Android and IOS have other directorynames for files
-	Android devices have different root (myFSRootDirectory1 = Samsung Tab 3, msFSRootDirectory2 = Samsung SII)
-	$cordovaFile functions prefixes all pathnames with root
$cordovaFileTransfer functions needs absolute pathnames

Here I create the prefixes for File functions and FileTransfer functions for Android and IOS
*/

// The $ionicPlatform and ionic.Platorm are from Ionic framework
//




$ionicPlatform.ready(function($rootScope) {

  document.addEventListener("deviceready", function () {

         var device = $cordovaDevice.getDevice();

         var cordova = $cordovaDevice.getCordova();

         var model = $cordovaDevice.getModel();

         var platform = $cordovaDevice.getPlatform();

         var uuid = $cordovaDevice.getUUID();

         $scope.deviceID = $cordovaDevice.getUUID();
         $scope.model = model;
         $scope.platform = platform;



/*
         // CREATE
             $cordovaFile.createDir(cordova.file.externalDataDirectory, "cache", false)
               .then(function (success) {
                 // success
                 console.log('Created CACHE directory succesfuly: ' + cordova.file.externalDataDirectory);
               }, function (error) {
                 // error
                   console.log('Error ' + error + ' Creating directory');
               });
*/


         $cordovaFile.getFreeDiskSpace()
             .then(function (success) {
              // success in kilobytes
              $scope.freeSpace = success;

              console.log('freeSpace :' + success);

             }, function (error) {
               // error
               $scope.freeSpace = 'did not get free space...';
             });

         var version = $cordovaDevice.getVersion();

       }, false);  //end device ready







       $scope.reloadJsonData = function(){


               var deferred = $q.defer();

var promiseList = [];

         console.log('Desviceready cordova.file.documentsDirectory: ' + cordova.file.documentsDirectory + ' / ' + cordova.file.externalDataDirectory);


           $http.get('json/jsonFormatter.json')
                   .success(function(results) {
                     console.log('reeee reloadDataCtrl RELOAD! : JSON loaded from URL');


                     var allPromise = $q.all([
                    //
 appUpdateService.updateDB($q ,$scope, $stateParams , $ionicHistory, $cordovaFile,$cordovaFileTransfer)
  //appUpdateService.updateJSON($scope, $stateParams , $cordovaFile,$cordovaFileTransfer)

                       ]).then(function (success) {
                                             console.log('do Update Call :' + success.length );
                                             console.log( JSON.stringify(success));

                                             console.log('ready....?');
                    //  alert('ready....');
                      console.log('items???');
                      console.log(success);

                      deferred.resolve(success);
                   return deferred.promise;
                // $state.go($state.current, {}, {reload: true});
           //     var current = $state.current;
           //     var params = angular.copy($stateParams);
           //     $state.transitionTo(current, params, { reload: true, inherit: true, notify: true });

         }, function(error) {
                               console.log('setSubmitError');
                               console.log(error);
                             $scope.submitError = error;
                         });


                         allPromise.then(function(values) {
                           console.log('*-*-*-*-* values :');
                           console.log(values);
                           console.log('done');

                         });


                         $q.all(promiseList).then(
                             function(results) {

                         console.log('Werkt dit?');


                                 for (var i = 0; i < results.length; i++) {


                         console.log( JSON.stringify(results[i]));

                                     if (!results[i].success) {
                                         // these are errors
                                     }
                                 }
                             });

                     /*
                       $scope.jsondata = results;
                       console.log($scope.jsondata);
                       window.localStorage.setItem("profile", JSON.stringify(results));
*/


/*
                       // CREATE
                           $cordovaFile.createDir(cordova.file.externalDataDirectory, "cache", false)
                             .then(function (success) {
                               // success
                               console.log('Created CACHE directory succesfuly');
                             }, function (error) {
                               // error
                                 console.log('Error ' + error + ' Creating directory');
                             });
*/


/*
         $scope.locales = $scope.jsondata.locales;
         for (var i = 0; i <   $scope.locales.length; i++) {

         var DownloadUrl = $scope.locales[i].thumb_url;

         console.log(DownloadUrl);


         var DownloadFilename = DownloadUrl.substring(DownloadUrl.lastIndexOf('/')+1);

         console.log('download file : ' + DownloadFilename);
*/



         /*
           var url = DownloadUrl;
              var targetPath = cordova.file.externalDataDirectory  + "cache/" + DownloadFilename;
              var trustHosts = true;
              var options = {};
           //alert(targetPath);
              $cordovaFileTransfer.download(DownloadUrl, targetPath, options, trustHosts)
                .then(function(result) {
                  // Success!
                  console.log('Downloaded image!' + DownloadFilename);
                }, function(err) {
                  // Error
                }, function (progress) {
                  $timeout(function () {
                    // $scope.downloadProgress = (progress.loaded / progress.total) * 100;
           // console.log($scope.downloadProgress);
                    });
                });


         };
*/

                       $ionicLoading.hide();


                   })
                   .error(function(results) {
                     console.log('No internet connection? Using old data.');
                     alert('No internet connection? Using old data.');

                     $ionicLoading.hide();

                   });

         };


         $scope.savelog = function(res) {
             $cordovaVibration.vibrate(1000);

             console.log('Save this : ' + JSON.stringify(res) );
             console.log('Devicedready cordova.file.documentsDirectory: ' + cordova.file.documentsDirectory + ' / ' + cordova.file.externalDataDirectory);

          //   $scope.inspection =  res + "\n";



           var inspection = JSON.stringify(res) + "\n";

          //   var inspection = $scope.inspection;

          console.log('dataToWrite : -> ' + inspection );

             $cordovaFile.writeFile(cordova.file.externalDataDirectory, 'mamaLog.txt', res, false)
                 .then(function(success){

                  //   alert(JSON.parse(inspection));

                    // alert(inspection);


                 }, function(error){
                  //   alert('did not create file ' + error.code);

                     $cordovaFile.writeExistingFile(cordova.file.externalDataDirectory, 'mamaLog.txt', res)
                         .then(function(success){

                          //   alert('existing: ' + JSON.parse(inspection));
                          //    alert('existing: ' + inspection);

                         }, function(error){
                            // alert('did not create existing file ' + error.code);
                         });

                 });
         };





         $scope.read = function(filemame) {
             $cordovaFile.checkFile(cordova.file.externalDataDirectory, filemame)
                 .then(function(success) {
                     alert('found it! ' + success);
console.log(success);

                     $cordovaFile.readAsText(cordova.file.externalDataDirectory, filemame)
                     .then( function(result) {
                     console.log('readAsText: ', result);
                   }, function(error){
                       alert('didn\'t read file: ' + error.code);
                   });

                 }, function(error){
                     alert('didn\'t find the file: ' + error.code);
                 })
         };





	if (ionic.Platform.isAndroid()) {



// If running on Android
console.log('cordova.file.externalDataDirectory: ' + cordova.file.externalDataDirectory);
//
// I use cordova.file.externalDataDirectory because this url is for Android devices
// If you remove the app from the device these url are cleared too on the device. So keep it clean.
// Remove the root from cordova.file.externalDataDirectory
//
			myFsRootDirectory1 = 'file:///storage/emulated/0/'; // path for tablet
			myFsRootDirectory2 = 'file:///storage/sdcard0/'; // path for phone



    	fileTransferDir = cordova.file.externalDataDirectory;
			if (fileTransferDir.indexOf(myFsRootDirectory1) === 0) {
				fileDir = fileTransferDir.replace(myFsRootDirectory1, '');
			}
			if (fileTransferDir.indexOf(myFsRootDirectory2) === 0) {
				fileDir = fileTransferDir.replace(myFsRootDirectory2, '');
			}
console.log('Android FILETRANSFERDIR: ' + fileTransferDir);
console.log('Android FILEDIR: ' + fileDir);

$scope.appCacheDirectory = fileTransferDir + 'cache';






};

		if (ionic.Platform.isIOS()) {
// if running on IOS
console.log('cordova.file.documentsDirectory: ' + cordova.file.documentsDirectory);
// I use cordova.file.documentsDirectory because this url is for IOS (NOT backed on iCloud) devices
			fileTransferDir = cordova.file.documentsDirectory;
    fileApplicationDirectory = cordova.file.applicationDirectory;
			fileDir = '';
console.log('IOS FILETRANSFERDIR: ' + fileTransferDir);
console.log('IOS FILEDIR: ' + fileDir);
console.log('IOS applicationDirectory: ' + fileApplicationDirectory);

$scope.appCacheDirectory = fileTransferDir + 'cache';




};


if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
//
// Just functions from the list below one by one ( or chain them)
//


/*

var select_query = "SELECT firstname, lastname, username, email,Birthyear,enableBirthyear,enableMailing,lang FROM user_data LIMIT 1;";

$cordovaSQLite.execute(db, select_query)
.then(function(res){
//  alert('alternatieve : ' + res.rows.length );
     if(res.rows.length >0) {
        //for(var i = 0; i < res.rows.length; i++){
    //    alert( JSON.stringify(res.rows.item(0)) );


$scope.settings = res.rows.item(0);

console.log('SERVICE loaded values:');
console.log($scope.settings);

//  $timeout(function() {
console.log('timeout:' + $scope.settings.enableBirthyear);
// $scope.toggleChange( $scope.settings.enableBirthyear );
console.log('timeout loaded values:');

console.log($scope.settings);

if (res.rows.item(0).enableBirthyear === 'true') {
var enableBirthyear = true;
} else {
var enableBirthyear = false;
}


if (res.rows.item(0).enableMailing === 'true') {
var enableMailing = true;
} else {
var enableMailing = false;
}


var date = new Date();
$scope.current = date.getFullYear();


if (res.rows.item(0).Birthyear == null) {
var Birthyear = $scope.current ;
} else {
var Birthyear =res.rows.item(0).Birthyear;
}


var start = 1900;  // Minus 10 years from current year
var end = $scope.current;  // Plus 10 years to current year
$scope.yearArray = [];


console.log('Seaching for :' + Birthyear);
for(var i=start;i<=end;i++)
{
if (i == Birthyear) {
var selectedBirthyear = 'selected';
console.log('selected year is : '+ i)
} else {
var selectedBirthyear = '';
}

$scope.yearArray.push({birthyear: i, selected: selectedBirthyear});
}

console.log($scope.yearArray);


$scope.settings = {
 enableBirthyear: enableBirthyear,
 enableMailing: enableMailing,
 Birthyear: Birthyear,
 firstname: res.rows.item(0).firstname,
 lastname: res.rows.item(0).lastname,
 username: res.rows.item(0).username,
 email: res.rows.item(0).email,
 locale_id: res.rows.item(0).lang,
};


window.localStorage['config_language'] = res.rows.item(0).lang;

console.log($scope.settings);

//    }, 1000);

          // Make sure to apply scope change so that ng-repeat updates
       // }

     } else {

console.log('GEEN ACCOUNT INSTELLINGEN');

           $scope.settings = {
             enableBirthyear: false,
             enableMailing: false,
           };
     }

//     dfd.resolve({
//       data: $scope.settings
//     })

}, function (err) {

    console.error(err);

});

*/
var jsonconfig_language = window.localStorage['config_language'];
console.log("jsonconfig_language : " + jsonconfig_language);

if (jsonconfig_language == '') {
  console.log('* * * * Pre set language * * * ');
window.localStorage['config_language'] = '2';
jsonconfig_language = window.localStorage['config_language'];
}



console.log ('****///**** set databaseJson');
databaseJson = JSON.parse(window.localStorage.getItem("profile"));


/*
// $scope.appDirectory = cordova.file.externalDataDirectory;
// $scope.reloadJsonData();
appUpdateService.updateJSON($scope, $cordovaFile,$cordovaFileTransfer).then(function(items) {
    console.log('ready....?');
    // alert('ready....');
  });
*/

};




// Download file from 'http://www.yourdomain.com/test.jpg' to test/one/test.jpg on device Filesystem
// var hostPath = 'http://www.yourdomain.com/test.jpg';
// var clientPath = fileTransferDir + 'test/one/test.jpg';
// var fileTransferOptions = {};

// $cordovaFile.downloadFile(hostPath, clientPath, true, fileTransferOptions).then (function() {
//});



// CREATE
    $cordovaFile.createDir(fileTransferDir, "cache", false)
      .then(function (success) {
        // success
        console.log('Created directory cache succesfuly');
      }, function (error) {
        // error
                console.log('Error ' + JSON.stringify(error) + ' Creating file');
      });

      // CREATE
          $cordovaFile.createDir(fileTransferDir, "slideshow", false)
            .then(function (success) {
              // success
              console.log('Created directory slideshow succesfuly');

              // Create empty file test.txt in test/again/
              $cordovaFile.createFile(fileTransferDir+'/slideshow/test.txt', 'Dit is eeeeeen testttt', true)
              .then(function (success) {
                // success
                alert('file slideshow test created succesfuly');
                console.log('dir created succesfuly');
              }, function (error) {
                // error
                  console.log('Error ' + JSON.stringify(error) + ' Creating file');
              });


            }, function (error) {
              // error
                                console.log('Error ' + JSON.stringify(error) + ' Creating file');
            });


            // Create empty file test.txt in test/again/
            $cordovaFile.createFile(fileTransferDir+'/test.txt', 'Dit is eeeeeen testttt', true)
            .then(function (success) {
              // success
              alert('File test created succesfuly');
              console.log('File created succesfuly');
            }, function (error) {
              // error
                console.log('Error ' + JSON.stringify(error) + ' Creating file');
            });






// List of files in test/again
//$cordovaFile.listDir(fileDir + 'test/one/').then( function(entries) {
//console.log('list dir: ', entries);
//});
// Write some text into file


$cordovaFile.writeFile(fileTransferDir+'/slideshow/test.txt', 'Some text te test filewrite', '').then(function (success) {
  // success
  alert('File slideshow test created succesfuly');
  console.log('File created succesfuly');
}, function (error) {
  // error
    console.log('Error ' + error + ' Creating file');
});


$cordovaFile.writeFile(fileTransferDir+'/test.txt', 'Some text te test filewrite', '').then( function(result) {
});
// Read text written in file
$cordovaFile.readAsText(fileTransferDir+'/test.txt').then( function(result) {
console.log('readAsText: ', result);
});


//  $scope.writer.write("some sample text");

});


$scope.getScrollPosition = function() {
      $timeout(function () {
       $scope.data = $ionicScrollDelegate.getScrollPosition().top;

    });
   console.log($scope.data);
  };






  $scope.show = function(msg) {

  var jsonconfig_language = window.localStorage['config_language'];

  switch (jsonconfig_language) {
      case '0':
          $scope.loadingtext = "Loading";
          break;
      case '1':
          $scope.loadingtext = "Loading"; // Engels
          break;
      case '2':
          $scope.loadingtext = "Aan het laden"; // Nederlands
          break;
      case '3':
          $scope.loadingtext = "تحميل"; // Morokaans
          break;
      case '4':
          $scope.loadingtext = "Laden"; // Duits
          break;
      case '5':
          $scope.loadingtext = "Cargando"; // Spaans
          break;
      case '6':
          $scope.loadingtext = "Chargement"; // Frans
          break;
      case '7':
          $scope.loadingtext = "Carregando"; // Portugees
          break;
      case '8':
          $scope.loadingtext = "تحميل"; // Berbers
          break;
      case '9':
          $scope.loadingtext = "Yükleniyor"; // Truks
          break;
      case '10':
          $scope.loadingtext = "載入中"; // Chinees
          break;
      case '11':
          $scope.loadingtext = "Fabor warda"; // Papiaments
          break;
      case '12':
          $scope.loadingtext = "Tangitangi wakti"; // Surinaams
          break;


  }


console.log("Loading text " + $scope.loadingtext);

    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner><br />' + $scope.loadingtext + '...<div ng-controller="reloadDataCtrl"></div>'
    });
  };


  $scope.hide = function(){
    $ionicLoading.hide();


    var alarmTime = new Date();
    alarmTime.setMinutes(alarmTime.getMinutes() );

    cordova.plugins.notification.local.schedule({
        id: 1,
        text: 'My first notification',
        sound:  'file://snd/beep.caf',
        data: { key:'value' }
    })


  };

// $scope.jsonconfig_language = 2;

  $scope.clicker = function(language){
      //  alert('Clicked: '+language.name);
    };

        $scope.setLanguage = function(item) {

              alert('Info required'+item.name);
              return;
          }









// wwrite file here
$scope.writeFile = function(mydata, $cordovaFile, $ionicPlatform) {

  console.log('Write mydata : ' + mydata);


//  var targetPath = cordova.file.externalRootDirectory + filename;
  var trustHosts = true
  var options = {};

  var mydata = 'Dit is een testttt....';

var directoryEntry = fileTransferDir+'/new_dir/';
console.log('directoryEntry : ' + directoryEntry);
//lets create a file named readme.txt. getFile method actually creates a file and returns a pointer(FileEntry) if it doesn't exist otherwise just returns a pointer to it. It returns the file pointer as callback parameter.
        directoryEntry.getFile("darkoreadme.txt", {create: true, exclusive: false}, function(fileEntry){
            //lets write something into the file
            fileEntry.createWriter(function(writer){
                writer.write("This is the text inside readme file");
            }, function(error){
                console.log("Error occurred while writing to file. Error code is: " + error.code);
            });
        }, function(error){
            console.log("Error occurred while getting a pointer to file. Error code is: " + error.code);
        });

//cordova.file.externalDataDirectory+'/new_dir/test.txt'
};




$scope.playFullscreen = function() {

  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {
  alert('Already fullscreen');
  } else {

    var i = document.getElementById("myvideo");

    // go full-screen
    if (i.requestFullscreen) {
      i.requestFullscreen();
    } else if (i.webkitRequestFullscreen) {
      i.webkitRequestFullscreen();
    } else if (i.mozRequestFullScreen) {
      i.mozRequestFullScreen();
    } else if (i.msRequestFullscreen) {
      i.msRequestFullscreen();
    }

  }

};


// ****************************************

$scope.statusDownload = [];

// Triggered on a button click, or some other target
$scope.showPopupDownloads = function(popupdata) {

// alert('current clip id: ' + popupdata);

// alert('language: ' + jsonconfig_language);

console.log( $scope.settings);

  // An elaborate, custom popup
  var myPopupDownload = $ionicPopup.show({
    template: '',
    title: 'Status',
    subTitle: 'zet status:',
    scope: $scope,
    buttons: [
      { text: '1',
      type: 'button-positive',
      onTap: function(e) {

$scope.statusDownload["ev4Rqe2NqNg"] = 1;

        return;
      }


      },
      {
        text: '<b>finished</b>',
        type: 'button-positive',
        onTap: function(e) {

$scope.statusDownload["ev4Rqe2NqNg"] = 2;

          return;
        }
      },

      {
        text: 'spin',
        type: 'button-positive',
        onTap: function(e) {

$scope.statusDownload["ev4Rqe2NqNg"] = 9;

          return;
        }
      },

    ]
  });
  myPopupDownload.then(function(res) {
    console.log('Tapped!', res);
  });
  $timeout(function() {
     myPopupDownload.close(); //close the popup after 3 seconds for some reason
  }, 6000);
 };



// ****************************************


// Triggered on a button click, or some other target
$scope.showPopupArchive = function(popupdata) {
  $scope.data = {}

// alert('current clip id: ' + popupdata);

FeedbackService.getUser($scope,$timeout,'1').then(function(users){

$scope.settings = users.data;
console.log('USERS : ', JSON.stringify($scope.settings) );

jsonconfig_language = $scope.settings.locale_id;

// alert('language: ' + jsonconfig_language);

});


jsonconfig_language = $scope.settings.locale_id;
// alert('language used : ' + jsonconfig_language);

  // An elaborate, custom popup
  var myPopupArchive = $ionicPopup.show({
    template: '',
    title: 'Archive',
    subTitle: 'Wilt u alles in deze categorie: ' + jsonconfig_language,
    scope: $scope,
    buttons: [
      { text: 'Verwijderen',
      type: 'button-positive',
      onTap: function(e) {


        FeedbackService.getUser($scope,$timeout,'1').then(function(users){

        $scope.settings = users.data;
        console.log('USERS : ', JSON.stringify($scope.settings) );

        jsonconfig_language = $scope.settings.locale_id;


//        var query= "SELECT video_items.id,video_items.category_id, video_items.nid,video_items.ordering,video_items.title,item_translations.translation, video_translations.locale_id, video_items.video_id,video_translations.locale_id as VT_locale_id,video_translations.last_upload_date,video_translations.url as VT_url,video_translations.url_low_res as VT_url_low_res,video_translations.youtube_id as VT_youtube_id,video_extra_data.downloaded_date,video_extra_data.downloading,videos.thumb_md5,videos.thumb_url, videos.url,videos.url_low_res,videos.youtube_id FROM video_items LEFT JOIN videos ON video_items.video_id=videos.id LEFT JOIN video_translations ON video_items.video_id = video_translations.source_id  AND video_translations.locale_id='"+ $scope.settings.locale_id +"' LEFT JOIN item_translations ON item_translations.source_id=video_items.id AND item_translations.locale_id='"+ $scope.settings.locale_id +"'  LEFT JOIN video_extra_data ON video_extra_data.video_id=video_items.video_id AND video_extra_data.locale_id='"+ $scope.settings.locale_id +"' WHERE category_id='"+ popupdata  +"';";

        var query= "SELECT video_items.id,video_items.category_id, video_items.nid,video_items.ordering,video_items.title,item_translations.translation, video_translations.locale_id VT_locale_id, video_items.video_id,video_translations.locale_id,video_translations.last_upload_date,video_translations.url as VT_url,video_translations.url_low_res as VT_url_low_res,video_translations.youtube_id as VT_youtube_id,video_extra_data.downloaded_date,video_extra_data.downloading,videos.thumb_md5,videos.thumb_url, videos.url,videos.url_low_res,videos.youtube_id FROM video_items LEFT JOIN videos ON video_items.video_id=videos.id LEFT JOIN video_translations ON video_items.video_id = video_translations.source_id  AND video_translations.locale_id='"+ jsonconfig_language+"' LEFT JOIN item_translations ON item_translations.source_id=video_items.id AND item_translations.locale_id='"+ jsonconfig_language+"'  LEFT JOIN video_extra_data ON video_extra_data.video_id=video_items.video_id AND video_extra_data.locale_id='"+ jsonconfig_language+"' WHERE category_id='"+ popupdata  +"';";
    //    console.log('*/*/*/* QUERY:', query);


        console.log('***** QUERY Erasing');
console.error(query);



        // var select_query = "SELECT *,video_translations.url as VT_url,video_translations.url_low_res as VT_url_low_res FROM video_items  LEFT JOIN videos  ON video_items.video_id=videos.id LEFT JOIN video_translations ON video_items.video_id = video_translations.source_id  AND video_translations.locale_id='"+$scope.settings.locale_id+"' LEFT JOIN item_translations ON item_translations.source_id=video_items.id AND item_translations.locale_id='"+$scope.settings.locale_id+"' WHERE category_id='"+popupdata+"';";

        $cordovaSQLite.execute(db, query)
        .then(function(res){
        //  alert('alternatieve : ' + res.rows.length );

      var collectionIDS = [];

             if(res.rows.length >0) {

               for(var i = 0; i < res.rows.length; i++){
          //        alert( JSON.stringify(res.rows.item(i)) );

      if (res.rows.item(i).VT_url != null) {
      var url = res.rows.item(i).VT_url;
      var url_low_res = res.rows.item(i).VT_url_low_res;
      var youtube_id = res.rows.item(i).VT_youtube_id;
      var locale_id = res.rows.item(i).VT_locale_id;
      } else {
      var url = res.rows.item(i).url;
      var url_low_res = res.rows.item(i).url_low_res;
      var youtube_id = res.rows.item(i).youtube_id;
      var locale_id = res.rows.item(i).locale_id;
      }



      collectionIDS.push( {
      id: res.rows.item(i).id,
      locale_id: locale_id,
      video_id : res.rows.item(i).video_id,
      thumb_md5:
      res.rows.item(i).thumb_md5,
      url: url,
      url_low_res: url_low_res,
      youtube_id: youtube_id,
      downloading : false,
      downloaded_date : '',
      });

                }

                console.log( collectionIDS );

      for(var i = 0; i < collectionIDS.length; i++){

            appDownloadService.delete_clip(collectionIDS[i])
            .then( function(item){

              console.log('Erasing:' + fileTransferDir + item[0].item.youtube_id+'.mp4' );

              $cordovaFile.removeFile(fileTransferDir, item[0].item.youtube_id+'.mp4')
                    .then(function (result) {
                      console.log('Success: deleting file' + JSON.stringify(result));
                    }, function (err) {
                      console.log('Error: deleting file' + JSON.stringify(err));
                    });


                    for(var i = 0; i < collectionIDS.length; i++){
                      console.log('cleaning icons');
                        var youtube_id = collectionIDS[i].youtube_id;
                        $scope.statusDownload[youtube_id] = 1;

                    }

              //      $timeout(function() {
              //        var current = $state.current;
                      /*
                             var params = angular.copy($stateParams);
                             $state.transitionTo(current, params, { reload: true, inherit: true, notify: true });
                      */
              //        $state.go(current, {}, { reload: true });
              //    }, 2000);


            });

      }







             } else {
               console.log('GEEN DATA');
             }


        }, function (err) {

            console.error(err);

        });

});

        return;
      }

      },
      {
        text: '<b>Download</b>',
        type: 'button-positive',
        onTap: function(e) {

    //      var query= "SELECT video_items.id,video_items.category_id, video_items.nid,video_items.ordering,video_items.title,item_translations.translation, video_translations.locale_id, video_items.video_id,video_translations.locale_id as VT_locale_id,video_translations.last_upload_date,video_translations.url as VT_url,video_translations.url_low_res as VT_url_low_res,video_translations.youtube_id as VT_youtube_id,video_extra_data.downloaded_date,video_extra_data.downloading,videos.thumb_md5,videos.thumb_url, videos.url,videos.url_low_res,videos.youtube_id FROM video_items LEFT JOIN videos ON video_items.video_id=videos.id LEFT JOIN video_translations ON video_items.video_id = video_translations.source_id  AND video_translations.locale_id='"+ $scope.settings.locale_id +"' LEFT JOIN item_translations ON item_translations.source_id=video_items.id AND item_translations.locale_id='"+ $scope.settings.locale_id +"'  LEFT JOIN video_extra_data ON video_extra_data.video_id=video_items.video_id AND video_extra_data.locale_id='"+ $scope.settings.locale_id +"' WHERE category_id='"+ popupdata  +"';";
          // var select_query = "SELECT *,video_translations.url as VT_url,video_translations.url_low_res as VT_url_low_res FROM video_items  LEFT JOIN videos  ON video_items.video_id=videos.id LEFT JOIN video_translations ON video_items.video_id = video_translations.source_id  AND video_translations.locale_id='"+$scope.settings.locale_id+"' LEFT JOIN item_translations ON item_translations.source_id=video_items.id AND item_translations.locale_id='"+$scope.settings.locale_id+"' WHERE category_id='"+popupdata+"';";

          FeedbackService.getUser($scope,$timeout,'1').then(function(users){

          $scope.settings = users.data;
          console.log('USERS : ', JSON.stringify($scope.settings) );

          jsonconfig_language = $scope.settings.locale_id;


          var query= "SELECT video_items.id,video_items.category_id, video_items.nid,video_items.ordering,video_items.title,item_translations.translation, video_translations.locale_id VT_locale_id, video_items.video_id,video_translations.locale_id,video_translations.last_upload_date,video_translations.url as VT_url,video_translations.url_low_res as VT_url_low_res,video_translations.youtube_id as VT_youtube_id,video_extra_data.downloaded_date,video_extra_data.downloading,videos.thumb_md5,videos.thumb_url, videos.url,videos.url_low_res,videos.youtube_id FROM video_items LEFT JOIN videos ON video_items.video_id=videos.id LEFT JOIN video_translations ON video_items.video_id = video_translations.source_id  AND video_translations.locale_id='"+ jsonconfig_language+"' LEFT JOIN item_translations ON item_translations.source_id=video_items.id AND item_translations.locale_id='"+ jsonconfig_language+"'  LEFT JOIN video_extra_data ON video_extra_data.video_id=video_items.video_id AND video_extra_data.locale_id='"+ jsonconfig_language+"' WHERE category_id='"+ popupdata +"';";


          $cordovaSQLite.execute(db, query)
          .then(function(res){
          //  alert('alternatieve : ' + res.rows.length );

var collectionIDS = [];

               if(res.rows.length >0) {

         for(var i = 0; i < res.rows.length; i++){
          console.log('==> download ==> ' + JSON.stringify(res.rows.item(i)) );

          if (res.rows.item(i).VT_url != null) {
          var url = res.rows.item(i).VT_url;
          var url_low_res = res.rows.item(i).VT_url_low_res;
          var youtube_id = res.rows.item(i).VT_youtube_id;
          var locale_id = res.rows.item(i).VT_locale_id;
          } else {
          var url = res.rows.item(i).url;
          var url_low_res = res.rows.item(i).url_low_res;
          var youtube_id = res.rows.item(i).youtube_id;
          var locale_id = res.rows.item(i).locale_id;
          }


                  if (res.rows.item(i).downloaded_date == null) {
                      collectionIDS.push( {
                          id: res.rows.item(i).id,
                          locale_id: locale_id,
                          video_id : res.rows.item(i).video_id,
                          thumb_md5: res.rows.item(i).thumb_md5,
                          url: url,
                          url_low_res: url_low_res,
                          youtube_id: youtube_id,
                      });
                    }

                  }

                  console.log('COLLECTION : ', JSON.stringify(collectionIDS) );

for(var i = 0; i < collectionIDS.length; i++){
$scope.toggle_visibility(collectionIDS[i]);

var youtube_id = collectionIDS[i].youtube_id;
$scope.statusDownload[youtube_id] = 9;


}

$timeout(function() {
  for(var i = 0; i < collectionIDS.length; i++){
    console.log('cleaning icons');
      $scope.check_visibility(collectionIDS[i]);
  }
}, 3000);





               } else {
                 console.log('GEEN DATA');
               }


          }, function (err) {

              console.error(err);

          });


});

          return;
        }



      },
    ]
  });
  myPopupArchive.then(function(res) {
    console.log('Tapped!', res);
  });
  $timeout(function() {
     myPopupArchive.close(); //close the popup after 3 seconds for some reason
  }, 6000);
 };




// *************************************

          // Triggered on a button click, or some other target
          $scope.showPopup = function(popupdata, $cordovaFile, $ionicPlatform) {

// alert('current clip id: ' + popupdata);



/*******
********/
            $scope.data = {}

$scope.data.videoclipid = popupdata;


            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
              template: '',
              title: 'Hoe kijkt u deze clip?',
              subTitle: 'Kijkt u alleen of met meerdere?',
              scope: $scope,
              buttons: [
                {
                  text: 'Alleen',
                onTap: function(e,$cordovaFile) {
                //  if (!$scope.data.wifi) {
                    //don't allow the user to close unless he enters wifi password
                //    e.preventDefault();
                //  } else {
                    $scope.data.kijksoort ='0';
                    window.localStorage['kijksoort'] = '0';
                    return $scope.data;
                }
              },
                {
                  text: '<b>Meerdere</b>',
                  type: 'button-positive',
                  onTap: function(e,$cordovaFile) {
                  //  if (!$scope.data.wifi) {
                      //don't allow the user to close unless he enters wifi password
                  //    e.preventDefault();
                  //  } else {
                    $scope.data.kijksoort ='1';
                    window.localStorage['kijksoort'] = '1';
                    return $scope.data;
                //    }
                  }
                }
              ]
            });
            myPopup.then(function(res) {
              console.log('Tapped!', res);
              $scope.savelog(res);
            //  playFullscreen();

              var elem = document.getElementById("myvideo");
              if (elem.requestFullscreen) {
                elem.requestFullscreen();
              } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
              } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
              } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
              }


            });
            $timeout(function() {
               myPopup.close(); //close the popup after 16 seconds for some reason
            }, 16000);
           };

           // A confirm dialog
           $scope.showConfirm = function() {
             var confirmPopup = $ionicPopup.confirm({
               title: 'Consume Ice Cream',
               template: 'Are you sure you want to eat this ice cream?'
             });
             confirmPopup.then(function(res) {
               if(res) {
                 console.log('You are sure');
               } else {
                 console.log('You are not sure');
               }
             });
           };


//



           // An alert dialog
           $scope.showAlert = function() {
             var alertPopup = $ionicPopup.alert({
               title: 'Don\'t eat that!',
               template: 'It might taste good'
             });
             alertPopup.then(function(res) {
               console.log('Thank you for not eating my delicious ice cream cone');
             });
           };


           $scope.shouldShowDelete = false;
           $scope.shouldShowReorder = false;
           $scope.listCanSwipe = false;





           $scope.downloadclip = function(downloadclipitem) {
             $scope.downloadclipitem = downloadclipitem;
      //   alert('Download Item: ' + $scope.downloadclipitem.id + ' - '  + $scope.downloadclipitem.youtube_id);



/*
             appDownloadService.clip($scope,$cordovaFile,$cordovaFileTransfer)
             .then(
               function (result) {
                  // promise was fullfilled (regardless of outcome)
                  // checks for information will be peformed here
                  $state.go($state.current, {}, {reload: true});
              },
              function (error) {
                  // handle errors


              });
            //
*/

            var allPromise = $q.all([
                                    appDownloadService.clip($scope.downloadclipitem,$scope,$cordovaFile,$cordovaFileTransfer)
                                  ]).then(function (success) {
                                    console.log('doDownloadCall :' + success.length );
                                    console.log( JSON.stringify(success));

return success;
       // $state.go($state.current, {}, {reload: true});
  //     var current = $state.current;
  //     var params = angular.copy($stateParams);
  //     $state.transitionTo(current, params, { reload: true, inherit: true, notify: true });

}, function(error) {
                      console.log('setSubmitError');
                      console.log(error);
                    $scope.submitError = error;
                });


                allPromise.then(function(values) {
                  console.log('*-*-*-*-* values :');
                  console.log(values);
                  console.log('done');

                });

            //  $window.location.reload(true);

};




$scope.toggle_visibility = function (item) {

                  console.log('*** TOGGLE VISIBILITY ***')
                  console.log( JSON.stringify(item));


                    var youtube_id = item.youtube_id;
                    $scope.statusDownload[youtube_id] = 9;

              //    var check_downloading = window.localStorage[item.youtube_id];
                console.log('Check ' + item.youtube_id );


          //     var myElSpinner = angular.element( document.querySelector( '#'+item.youtube_id+'_loader' ) );
//               var myEl = angular.element( document.querySelector( '#'+item.youtube_id+'_default' ) );
/*
            //   if(check_downloading===true) {
              if (myElSpinner.hasClass('downloading-on')) {
              //   alert('has class red');
                 myElSpinner.addClass('downloading-off');
                 myElSpinner.removeClass('downloading-on');

  //               myEl.addClass('downloading-on');
    //             myEl.removeClass('downloading-off');


            //     window.localStorage.setItem(item.youtube_id, false);

                } else {
          //       alert( item + ' has not class red');
                 myElSpinner.addClass('downloading-on');
                 myElSpinner.removeClass('downloading-off');

      //           myEl.addClass('downloading-off');
        //         myEl.removeClass('downloading-on');
               }
          //      window.localStorage.setItem(item.youtube_id, true);

*/

// start download.





                 $timeout(function() {
            //       myEl.addClass('downloading-on');
            //       myEl.removeClass('downloading-off');

                  item.downloading = true;
                  $scope.check_visibility(item);
                  $scope.downloadclip(item);
                }, 1000);




            //   }
};

var checkit = false;



$scope.check_visibility = function (item) {

                console.log('**** check visibility ****');
                console.log( JSON.stringify(item) );


        //        var myElSpinner = angular.element( document.querySelector( '#'+item.youtube_id+'_loader' ) );
 //               var myEl = angular.element( document.querySelector( '#'+item.youtube_id+'_default' ) );

             //   if(check_downloading===true) {
               if (item.downloading == false) {
                  console.log('CHECK has class red');
                //  myElSpinner.addClass('downloading-off');
                //  myElSpinner.removeClass('downloading-on');

   //               myEl.addClass('downloading-on');
     //             myEl.removeClass('downloading-off');


             //     window.localStorage.setItem(item.youtube_id, false);
return false;
                 } else {
                  console.log( 'CHECK  has not class red');
                //  myElSpinner.addClass('downloading-on');
                //  myElSpinner.removeClass('downloading-off');

       //           myEl.addClass('downloading-off');
         //         myEl.removeClass('downloading-on');

                  return true;

                }
           //      window.localStorage.setItem(item.youtube_id, true);



  console.log( '*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* kom ik hier ook?');


                                  var locale_id = item.locale_id;
                                  if (locale_id < 1) { locale_id = 2; }

                var video_id = item.video_id;
                var query = "SELECT * FROM video_extra_data WHERE video_id='"+video_id+"' AND locale_id='"+locale_id+"' LIMIT 1";

                                                            alert('2 :' +query);
                                                            $cordovaSQLite.execute(db, query)
                                                            .then(function(res){
                                                                  alert('toggle_visibility : '+res.rows.length );
                                                                  log(res.rows);

                                                                if (res.rows.length >0){
                var check_downloading =true;
                var youtube_id = item.youtube_id;
                $scope.statusDownload[youtube_id] = 9;



                                                                } else {
                var check_downloading =false;
                var youtube_id = item.youtube_id;
                $scope.statusDownload[youtube_id] = 1;
                                                                }

                                                            },
                                                            function(err){
                                                              console.log("Error SQLite: " + JSON.stringify(err));
                                                            });



if (checkit === false) {

                  var dir = fileTransferDir;
                  var file = item.youtube_id + '.mp4';

                  var trustHosts = true;
                  var options = {};

                  var resultCheckFile;

                  console.log('Checking : ' + file + '=');

                    FileService.checkFile($scope, $cordovaFile, item , dir, file)
                    .then(
                              function (result) {
                                   // promise was fullfilled (regardless of outcome)
                                   // checks for information will be peformed here

                 console.log('result FileService : '+ result[0].obj.youtube_id );
                 console.log(result[0].result.isFile);
                 console.log(result);
                // console.log(result[0].downloaded);
                //console.log('objobj:');
                //console.log(item);

                if (result[0].result.isFile == true) {
                  result[0].obj.downloaded = true;
                  var youtube_id = result[0].obj.youtube_id;
                  $scope.statusDownload[youtube_id] = 2;
//                  checkit=true;
return true;
                } else {
                  result[0].obj.downloaded = false;

                  var youtube_id = result[0].obj.youtube_id;
                  $scope.statusDownload[youtube_id] = 1;

                  return false;
  //                checkit=false;
                }
                //    var response = {'myresult':result, 'myscope':promiseWrapper };
              //  console.log('*-* FileService Check ' + $scope.i + ' *-*');
              //  my_response.push( [{'myresult':result, 'myscope':promiseWrapper }] );
              //  console.log(my_response);




                               },
                               function (error) {
                                   // handle errors here

                                  //  my_response.push(error);
                                   console.log('*-* FileService errors *-*');
                                   // console.log( JSON.stringify(error) );
                                   return false;
                                   }
                      );  // end then


};

              var check_downloading = window.localStorage[item.youtube_id] ;

            //  console.log('Check ' + item.youtube_id + ' Downloading : ' + check_downloading );

               // var myEl = angular.element( document.querySelector( '#'+item.youtube_id+'_loader' ) );
               if(check_downloading) {
                // item.downloaded = false;
                 // console.log(item);
                 return false;
               } else {
                 // item.downloaded = true;
                 // console.log(item);
                 return true;
               }

/*
               console.log(item);
               item.downloading = !item.downloading;
               console.log("Toggle visibility...." + item.downloading );
               console.log(item);
*/
                   //   var e = document.getElementById(id);
                   //   var es = document.getElementById(ids);

                 };


             $scope.downloadedclip = function(downloadclipitem) {
               $scope.downloadclipitem = downloadclipitem;
               alert('Item: ' + $scope.downloadclipitem.id + " already downloaded.");


               };

             $scope.viewclip = function(item) {
              // alert('view Item: ' + item.video_id);
               $state.go('main.movie-detail', {videoclipid: item.video_id} );






             };


})



.controller('EntryController', function($q, $state, FileService, appUpdateService, $scope, $http, $timeout, $ionicLoading,$cordovaSQLite, $cordovaLocalNotification, $cordovaVibration, $cordovaDevice, $cordovaFile, $cordovaFileTransfer,$ionicSideMenuDelegate, $ionicPlatform,$rootScope) {
        $scope.EntryPageVisible = false;
 //$scope.navTitle = 'Mammarosa';

        $ionicPlatform.ready(function($rootScope) {
      //    var navTitle = 'Mammarosa';
      //    $ionicNavBarDelegate.title(navTitle);
        });


      })

.controller('reloadDataCtrl', function($q,   $ionicPlatform, FileService, appUpdateService, $scope, $http, $timeout, $ionicLoading, $cordovaFile,$cordovaFileTransfer, $cordovaSQLite,  $cordovaLocalNotification) {
var resultCheckFile;


$scope.EntryPageVisible = false;

                $ionicPlatform.ready(function($rootScope) {


// $scope.result = FileService.doReload($scope,$cordovaFile);
/*
var alarmTime = new Date();
alarmTime.setMinutes(alarmTime.getMinutes() );
cordova.plugins.notification.local.schedule({
    id: 1,
    text: 'Mammarosa is up-to-date',
    sound:  'file://snd/beep.caf',
    data: { key:'value' }
})
*/
// $('#ionHideTabs').attr('ng-show',true);

// console.log('Devicedready cordova.file.documentsDirectory: ' + cordova.file.documentsDirectory + ' / ' + cordova.file.externalDataDirectory);

// CREATE
    $cordovaFile.createDir(fileTransferDir, "cache", false)
      .then(function (success) {
        // success
        console.log('Created CACHE directory succesfuly:' + fileTransferDir);
      }, function (error) {
        // error
          console.log('Error ' + error + ' Creating directory');
      });


// appUpdateService.updateJSON($scope, $cordovaFile,$cordovaFileTransfer);



console.log('******************************************************');
console.log('******************************************************');
console.log('******************************************************');
// http://darkode.blogsite.org/json/jsonFormatter.json
// 'http://mammarosa.modusoft.nl/nl/api'
// http://www.mammarosa.nl/api


appUpdateService.updateJSON($scope, $cordovaFile,$cordovaFileTransfer).then(function(items) {
    console.log('reaload ready....?');
    // alert('ready....');
  });





/*
            db.transaction(function(tx) {
              tx.executeSql('DROP TABLE IF EXISTS test_table');
              tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');

              // demonstrate PRAGMA:
              db.executeSql("pragma table_info (test_table);", [], function(res) {
                console.log("PRAGMA res: " + JSON.stringify(res));
              });

              tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
                console.log("insertId: " + res.insertId + " -- probably 1");
                console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

                db.transaction(function(tx) {
                  tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
                    console.log("res.rows.length: " + res.rows.length + " -- should be 1");
                    console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
                  });
                });

              }, function(e) {
                console.log("ERROR: " + e.message);
              });
            });

*/


/*
            if(window.localStorage.getItem("profile") == undefined) {
                console.log('localStorage not set, loading')

                    $http.get('http://mammarosa.modusoft.nl/nl/api')
                            .success(function(results) {
                              console.log('JSON loaded from URL')
                                $scope.jsondata = results;
                                console.log($scope.jsondata)
                                window.localStorage.setItem("profile", JSON.stringify(results));
                            })
                            .error(function(results) {
                              console.log('No internet connection?')
                                if(window.localStorage.getItem("profile") !== undefined) {
                                  console.log('JSON loaded from localStorage')
                                    $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));
                                  console.log($scope.jsondata)
                                }
                            });
            }

*/

});

})
.controller('CarouselController', function($scope) {
    $scope.swiper = {};
    var that = this;

     $scope.showTest = true;

     $scope.alert = function(msg) {
       alert(msg);
     };


    $scope.onReadySwiper = function (swiper) {

        swiper.on('slideChangeStart', function () {
            console.log('slide start');
        });

        swiper.on('onSlideChangeEnd', function () {
            console.log('slide end');
        });
    };
});
