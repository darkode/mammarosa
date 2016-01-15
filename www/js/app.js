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

var main_category_items = [{
  id: 9,
  title: 'Wat doet Mammarosa',
  asset: 'generic_mammarosa.html',
  lastText: 'You on your way?',
  face: 'img/icons/ic_launcher.png'
}, {
  id: 1154,
  title: 'Gezond blijven',
  lastText: 'Hey, it\'s me',
  face: 'img/icons/ic_launcher.png'
}, {
  id: 1155,
  title: 'Beter worden',
  lastText: 'I should buy a boat',
  face: 'img/icons/ic_launcher.png'
}, {
  id: 1156,
  title: 'Niet meer beter worden',
  lastText: 'Look at my mukluks!',
  face: 'img/icons/ic_launcher.png'
}, {
  id: 1157,
  title: 'Informatieve films derden',
  lastText: 'This is wicked good ice cream.',
  face: 'img/icons/ic_launcher.png'
}];






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
}

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
}





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



/*
   db = window.sqlitePlugin.openDatabase({name: "my.db"});

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

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$compileProvider) {

$ionicConfigProvider.tabs.position('bottom'); // other values: top


           $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'reloadDataCtrl'
      }
    }
  })

  .state('tab.maincategories', {
      url: '/maincategories',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-maincategories.html',
          controller: 'MainCategoryCtrl'
        }
      }
    })


    .state('tab.items', {
        url: '/items/:catid',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'CategoryCtrl'
          }
        }
      })

      .state('tab.chat-detail', {
        url: '/chats/:catid',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })


      .state('tab.movie-detail', {
        url: '/clips/:videoclipid',
        views: {
          'tab-chats': {
            templateUrl: 'templates/movie-detail.html',
            controller: 'ClipsDetailCtrl'
          }
        }
      })


    .state('tab.gallery', {
        url: '/gallery',
        views: {
          'tab-gallery': {
            templateUrl: 'templates/tab-gallery.html',
            controller: 'GalleryCtrl'
          }
        }
      })





    .state('tab.languages', {
      url: '/languages',
      views: {
        'tab-languages': {
          templateUrl: 'templates/tab-languages.html',
          controller: 'LanguagesCtrl'
        }
      }
    })


    .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      })



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})

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




.controller('LoadingCtrl', function($q, $scope, $state, $stateParams, $ionicScrollDelegate,  $http, $window, FileService, appUpdateService, appDownloadService, $ionicLoading, $ionicPopup, $timeout, $cordovaLocalNotification, $cordovaVibration, $cordovaDevice, $cordovaFile, $cordovaFileTransfer, $ionicPlatform,$rootScope) {






window.localStorage.setItem("config_language", '2');
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



         $scope.appCacheDirectory = 'file:///storage/emulated/0/Android/data/com.ionicframework.myapp728258/cache';






       }, false);  //end device ready


       $scope.reloadJsonData = function(){

         console.log('Deviceready cordova.file.documentsDirectory: ' + cordova.file.documentsDirectory + ' / ' + cordova.file.externalDataDirectory);


           $http.get('json/jsonFormatter.json')
                   .success(function(results) {
                     console.log('reeee reloadDataCtrl RELOAD! : JSON loaded from URL');
                       $scope.jsondata = results;
                       console.log($scope.jsondata);
                       window.localStorage.setItem("profile", JSON.stringify(results));



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

         $scope.locales = $scope.jsondata.locales;
         for (var i = 0; i <   $scope.locales.length; i++) {

         var DownloadUrl = $scope.locales[i].thumb_url;

         console.log(DownloadUrl);


         var DownloadFilename = DownloadUrl.substring(DownloadUrl.lastIndexOf('/')+1);

         console.log('download file : ' + DownloadFilename);


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
                    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
           // console.log($scope.downloadProgress);
                    });
                });

*/
         };


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
             console.log('Deviceready cordova.file.documentsDirectory: ' + cordova.file.documentsDirectory + ' / ' + cordova.file.externalDataDirectory);

          //   $scope.inspection =  res + "\n";



           var inspection = JSON.stringify(res) + "\n";

          //   var inspection = $scope.inspection;

          console.log('dataToWrite : -> ' + inspection );

             $cordovaFile.writeFile(cordova.file.externalDataDirectory, 'mamaLog.txt', res, false)
                 .then(function(success){

                  //   alert(JSON.parse(inspection));

                    // alert(inspection);


                 }, function(error){
                     alert('did not create file ' + error.code);

                     $cordovaFile.writeExistingFile(cordova.file.externalDataDirectory, 'mamaLog.txt', res)
                         .then(function(success){

                          //   alert('existing: ' + JSON.parse(inspection));
                          //    alert('existing: ' + inspection);

                         }, function(error){
                             alert('did not create existing file ' + error.code);
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


/*
    	fileTransferDir = cordova.file.externalDataDirectory;
			if (fileTransferDir.indexOf(myFsRootDirectory1) === 0) {
				fileDir = fileTransferDir.replace(myFsRootDirectory1, '');
			}
			if (fileTransferDir.indexOf(myFsRootDirectory2) === 0) {
				fileDir = fileTransferDir.replace(myFsRootDirectory2, '');
			}
console.log('Android FILETRANSFERDIR: ' + fileTransferDir);
console.log('Android FILEDIR: ' + fileDir);
*/





};

		if (ionic.Platform.isIOS()) {
// if running on IOS
console.log('cordova.file.documentsDirectory: ' + cordova.file.documentsDirectory);
// I use cordova.file.documentsDirectory because this url is for IOS (NOT backed on iCloud) devices
			fileTransferDir = cordova.file.documentsDirectory;
			fileDir = '';
console.log('IOS FILETRANSFERDIR: ' + fileTransferDir);
console.log('IOS FILEDIR: ' + fileDir);





};


if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
//
// Just functions from the list below one by one ( or chain them)
//




var jsonconfig_language = window.localStorage['config_language'];

if (jsonconfig_language == '') {
  console.log('Pre set language');
window.localStorage['config_language'] = '2';
}



// $scope.appDirectory = cordova.file.externalDataDirectory;
 $scope.reloadJsonData();
    appUpdateService.updateJSON($scope, $cordovaFile,$cordovaFileTransfer);  // end then

};




// Download file from 'http://www.yourdomain.com/test.jpg' to test/one/test.jpg on device Filesystem
// var hostPath = 'http://www.yourdomain.com/test.jpg';
// var clientPath = fileTransferDir + 'test/one/test.jpg';
// var fileTransferOptions = {};

// $cordovaFile.downloadFile(hostPath, clientPath, true, fileTransferOptions).then (function() {
//});



// CREATE
    $cordovaFile.createDir(cordova.file.externalDataDirectory, "new_dir", false)
      .then(function (success) {
        // success
        console.log('Created directory succesfuly');
      }, function (error) {
        // error
          console.log('Error ' + error + ' Creating directory');
      });


// Create empty file test.txt in test/again/
$cordovaFile.createFile(cordova.file.externalDataDirectory+'/test.txt', 'Dit is eeeeeen testttt', true)
.then(function (success) {
  // success
  console.log('File created succesfuly');
}, function (error) {
  // error
    console.log('Error ' + error + ' Creating file');
});
// List of files in test/again
//$cordovaFile.listDir(fileDir + 'test/one/').then( function(entries) {
//console.log('list dir: ', entries);
//});
// Write some text into file
$cordovaFile.writeFile(cordova.file.externalDataDirectory+'/test.txt', 'Some text te test filewrite', '').then( function(result) {
});
// Read text written in file
$cordovaFile.readAsText(cordova.file.externalDataDirectory+'/test.txt').then( function(result) {
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

  var jsonconfig_language = window.localStorage['config_language'] || '2';

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
      template: '<ion-spinner></ion-spinner> ' + $scope.loadingtext + '...<div ng-controller="reloadDataCtrl"></div>'
    });
  };


  $scope.hide = function(){
    $ionicLoading.hide();


    var alarmTime = new Date();
    alarmTime.setMinutes(alarmTime.getMinutes() );
    $cordovaLocalNotification.add({
        id: "MAMMAROSA",
        date: alarmTime,
        message: "Reloaded data.",
        title: "Mammarosa",
        autoCancel: true,
        sound:  'file://snd/beep.caf'
    }).then(function () {
        console.log("The notification has been set");
    });

  };


  $scope.clicker = function(language){
        alert('Clicked: '+language.name);
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

var directoryEntry = cordova.file.externalDataDirectory+'/new_dir/';
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



          // Triggered on a button click, or some other target
          $scope.showPopup = function(popupdata, $cordovaFile, $ionicPlatform) {

// alert('current clip id: ' + popupdata);



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
                    return $scope.data;
                //    }
                  }
                }
              ]
            });
            myPopup.then(function(res) {
              console.log('Tapped!', res);
              $scope.savelog(res);
playFullscreen();
/*
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
*/

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
                                    appDownloadService.clip(downloadclipitem,$scope,$cordovaFile,$cordovaFileTransfer)
                                  ]).then(function doDownloadCall(success) {
                                    console.log('doDownloadCall :' + success.length );
                                    console.log(success);


       // $state.go($state.current, {}, {reload: true});
  //     var current = $state.current;
  //     var params = angular.copy($stateParams);
  //     $state.transitionTo(current, params, { reload: true, inherit: true, notify: true });

}, function setDownloadError(error) {
                      console.log('setSubmitError');
                      console.log(error);
                    $scope.submitError = error;
                });


                allPromise.then(function(values) {
                  console.log('*-*-*-*-* values :');
                  console.log(values);
                  console.log('done');

                });

              // $window.location.reload(true);

             };




             $scope.toggle_visibility = function (item) {

                  console.log(item);

                  var check_downloading = window.localStorage[item.youtube_id];
                  console.log('Check ' + item.youtube_id + ' Downloading : ' + check_downloading );


            //   var myEl = angular.element( document.querySelector( '#'+item.youtube_id+'_loader' ) );
               if(check_downloading===true) {
                // alert('has class red');
              //   myEl.addClass('downloading-on');
              //   myEl.removeClass('downloading-off');
                 window.localStorage.setItem(item.youtube_id, false);

               } else {
              //   alert( item + ' has not class red');
                // myEl.addClass('downloading-off');
                // myEl.removeClass('downloading-on');

                window.localStorage.setItem(item.youtube_id, true);
                $scope.downloadclip(item);

/*
                 $timeout(function() {
                   myEl.addClass('downloading-on');
                   myEl.removeClass('downloading-off');

                  item.downloaded = true;

                   }, 3000);
*/

               }
};

             $scope.check_visibility = function (item) {

                  // console.log(item);



/*
                  var dir = cordova.file.externalDataDirectory;
                  var file = item.youtube_id + '.mp4';

                  var trustHosts = true;
                  var options = {};

                  var resultCheckFile;

                    // console.log('Checking : ' + file + '=');

                    FileService.checkFile($scope, $cordovaFile, item , dir, file)
                    .then(
                              function (result) {
                                   // promise was fullfilled (regardless of outcome)
                                   // checks for information will be peformed here

                // console.log('result FileService : '+ result[0].obj.youtube_id );
                // console.log(result[0].result.isFile);
                // console.log(result);
                // console.log(result[0].downloaded);
                //console.log('objobj:');
                //console.log(item);

                if (result[0].result.isFile == true) {
                  result[0].obj.downloaded = true;

                } else {
                  result[0].obj.downloaded = false;

                }
                //    var response = {'myresult':result, 'myscope':promiseWrapper };
              //  console.log('*-* FileService Check ' + $scope.i + ' *-*');
              //  my_response.push( [{'myresult':result, 'myscope':promiseWrapper }] );
              //  console.log(my_response);




                               },
                               function (error) {
                                   // handle errors here

                                  //  my_response.push(error);
                              //     console.log('*-* FileService errors *-*');
                              //     console.log(error);
                                   }
                      );  // end then
*/



              var check_downloading = window.localStorage[item.youtube_id] ;

            //  console.log('Check ' + item.youtube_id + ' Downloading : ' + check_downloading );

               // var myEl = angular.element( document.querySelector( '#'+item.youtube_id+'_loader' ) );
               if(check_downloading) {
                 return false;
               } else {
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
               $state.go('tab.movie-detail', {videoclipid: item.video_id} );






             };


})
.controller('reloadDataCtrl', function($q, FileService, appUpdateService, $scope, $http, $timeout, $ionicLoading, $cordovaFile,$cordovaFileTransfer, $cordovaSQLite,  $cordovaLocalNotification) {
var resultCheckFile;

// $scope.result = FileService.doReload($scope,$cordovaFile);

var alarmTime = new Date();
alarmTime.setMinutes(alarmTime.getMinutes() );
$cordovaLocalNotification.add({
    id: "MAMMAROSA",
    date: alarmTime,
    message: "Mammarosa is up-to-date",
    title: "Mammarosa",
    autoCancel: true,
    sound:  'file://snd/beep.caf'
}).then(function () {
    console.log("The notification has been set");
});

$('#ionHideTabs').attr('ng-show',true);

console.log('Deviceready cordova.file.documentsDirectory: ' + cordova.file.documentsDirectory + ' / ' + cordova.file.externalDataDirectory);

// CREATE
    $cordovaFile.createDir(cordova.file.externalDataDirectory, "cache", false)
      .then(function (success) {
        // success
        console.log('Created CACHE directory succesfuly:' + cordova.file.externalDataDirectory);
      }, function (error) {
        // error
          console.log('Error ' + error + ' Creating directory');
      });


appUpdateService.updateJSON($scope, $cordovaFile,$cordovaFileTransfer);



console.log('******************************************************');
console.log('******************************************************');
console.log('******************************************************');
// http://darkode.blogsite.org/json/jsonFormatter.json
// 'http://mammarosa.modusoft.nl/nl/api'
// http://www.mammarosa.nl/api


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
