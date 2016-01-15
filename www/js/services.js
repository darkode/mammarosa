angular.module('starter.services', ['ngCordova', 'ngCordova.plugins.file'] )

.service('callServiceFunction', function($q,$http, $timeout, FileService, $ionicLoading, $cordovaFile, $cordovaFileTransfer) {

  return {


    doIt : function ($scope,$cordovaFile) {

      var my_deferred = $q.defer();
      var my_response = [];



      var promiseWrapper = $scope.promiseWrapper;
console.log( '****** do it service ******');
console.log( promiseWrapper );


        for (var i = 0; i < promiseWrapper.length; i++) {


$scope.i = i;
var video_id = promiseWrapper[i][0].scope.video_id;

            console.log("*-*-*-*-*-*- object to check " + i + " :" + promiseWrapper[i][0].scope.title);
            console.log( promiseWrapper[i][0].scope);


promiseWrapper[i][0].scope.downloaded = false;

      var dir = cordova.file.externalDataDirectory;
      var file = promiseWrapper[i][0].downloadfilename;

      var trustHosts = true;
      var options = {};

      var resultCheckFile;

        // console.log('Checking : ' + DownloadFilename + '=');

        FileService.checkFile($scope, $cordovaFile, promiseWrapper[i][0].scope, dir, file)
        .then(
                  function (result) {
                       // promise was fullfilled (regardless of outcome)
                       // checks for information will be peformed here

console.log('result FileService');
console.log(result[0].result.isFile);
console.log(result);
console.log(result[0].obj.downloaded);
console.log('promiseWrapper:');
console.log(promiseWrapper[$scope.i][0].scope);

if (result[0].result.isFile == true) {
  result[0].obj.downloaded= true;

} else {
  result[0].obj.downloaded = false;

}
//    var response = {'myresult':result, 'myscope':promiseWrapper };
console.log('*-* FileService Check ' + $scope.i + ' *-*');
my_response.push( [{'myresult':result, 'myscope':promiseWrapper }] );
console.log(my_response);




                   },
                   function (error) {
                       // handle errors here

my_response.push(error);
                       console.log('*-* FileService errors *-*');
                       console.log(error);
                       }
          );  // end then


}; // for


console.log('*** RETURN PROMMISE ****');
console.log(promiseWrapper);
    var response = [{'myresult':my_response}];


    console.log(response);
    my_deferred.resolve(promiseWrapper);

return my_deferred.promise;
   },


  };
})

.factory('FileService', function($q, $http, $timeout, $ionicLoading, $cordovaFile) {



  return {


    gewoon : function ($scope) {
      var datadeferred = $q.defer();
      var response = [];
      $scope.responseDownloaded = [];

      console.log('*** FileService gewoon ***');

      console.log($scope);


        var success ='';
        var dir = '';
        var file = '';

var promiseWrapper = $scope.promiseWrapper;


  for (var i = 0; i < promiseWrapper.length; i++) {

      console.log("*-*-*-*-*-*- object to check " + i + " :" + promiseWrapper[i][0].scope.title);
      console.log( promiseWrapper[i][0].scope.id );

$scope.i = i;


//  angular.forEach(scope,function(value,index){
//                 console.log(value.id);

        var dir = cordova.file.externalDataDirectory;
        var file = promiseWrapper[i][0].downloadfilename;




                  console.log('Check file : ' + file);



                 $cordovaFile.checkFile(dir, file)
                 .then(function (success) {
                   // success
                   console.log($scope.i  + ' : File exists! ' + file);

              var downloaded = true;
              $scope.responseDownloaded.push ( {'result':success,'dir':dir, 'file':file, 'downloaded':downloaded} );
promiseWrapper[$scope.i][0].scope.downloadedd = true;


                 var response = [{'result':success,'dir':dir, 'file':file, 'downloaded':downloaded, 'i' : $scope.i }];
                 // promise is fulfilled

                 console.log('** response success**');
                 console.log(response);
$scope.videos[$scope.i ].downloadedd = true;
console.log('** response success 2 **');
console.log(promiseWrapper);
                // datadeferred.resolve(response);
                 // promise is returned
               //   return deferred.promise;

                 }, function (error) {
                   // error
                   console.log(i + ' : File does not exist! ' + file);


              var downloaded = false;
              $scope.responseDownloaded.push ( {'result':error,'dir':dir, 'file':file, 'downloaded':downloaded} );

                   var response = [{'result':error,'dir':dir, 'file':file, 'downloaded':downloaded}];

                   console.log('** response error **');
                   console.log(response);
$scope.videos[$scope.i ].downloadedd = false;
                   console.log('** response error 2 **');
                   console.log($scope.videos[$scope.i ]);
                   // promise is fulfilled
                //   datadeferred.reject(response);
                   // promise is returned
                   // return deferred.promise;
                 });


console.log('responseeeee');
console.log($scope.responseDownloaded);


};
/*

                 FileService.checkFile ( $scope, $cordovaFile, DownloadUrl, targetPath, DownloadFilename)
                 .then(
                           function (result) {
                                // promise was fullfilled (regardless of outcome)
                                // checks for information will be peformed here
                                console.log('yesssss' + result[0].scope_array.checkThisvideo.videoItemNr );
                              //  console.log(result);
                              //  console.log(  result[0].scope_array);
                              //  videos.push( {downloaded: true} );
                              var myItemNr = result[0].scope_array.checkThisvideo.videoItemNr;

                        //      var videos = result[0].scope_array.videos;

          // result[0].scope_array.videos[ result[0].scope_array.checkThisvideo.videoItemNr ].downloaded = result[0].result.isFile;

          $scope.videos[ myItemNr ].downloaded  = true;

                            //  videos[myItemNr].downloaded = result[0].result.isFile;
                            console.log('NEW VIDEOS ARRAY:');
                              console.log( $scope.videos[ myItemNr ] );
                            },
                            function (error) {
                                // handle errors here
                console.log('nooooooooooo');
                console.log(error);
              //  var myItemNr = error[0].scope_array.videos.videoItemNr;
              //  error[0].scope_array.videos[ error[0].scope_array.checkThisvideo.videoItemNr ].downloaded = error[0].result.isFile;

              //  $scope.videos = error[0].scope_array.videos;

                                  //  videos[myItemNr].downloaded = result[0].result.isFile;
                //                    console.log( $scope.videos );
                                }
                   );  // end then

*/

console.log('*** RETURN PROMMISE ****');
console.log(promiseWrapper);
    var response = [{'myresult':$scope.responseDownloaded}];
    datadeferred.resolve(response);

return datadeferred.promise;
    //  return $scope;
    },


    checkFile : function ($scope, $cordovaFile, obj, dir, file) {
      var deferred = $q.defer();
      var response = [];

        $cordovaFile.checkFile(dir, file)
        .then(function (success) {
          // success
          console.log('File exists! ' + file);
        var response = [{'result':success,'dir':dir, 'file':file, 'obj':obj, 'scope_array':$scope}];
        // promise is fulfilled
        deferred.resolve(response);
        // promise is returned
      //   return deferred.promise;

        }, function (error) {
          // error
          console.log('File does not exist! ' + file);
          var response = [{'error':error,'dir':dir, 'file':file,'obj':obj, 'scope_array':$scope}];
          // promise is fulfilled
          deferred.reject(response);
          // promise is returned
          // return deferred.promise;
        });

                      return deferred.promise;
                  },

		doReload:function($scope, $cordovaFile) {

  var deferred = $q.defer();

      $cordovaFile.getFreeDiskSpace()
          .then(function (success) {
           // success in kilobytes
           $scope.freeSpace = success;

          alert('freeSpace :' + success);
  deferred.resolve(success);
          }, function (error) {
            // error
            alert('did not get free space...');
              deferred.reject(error);
          });

          return deferred.promise;
		}



  };
})

.service('appDownloadService', function($q, $state, $http, $timeout, $ionicTabsDelegate, FileService, $ionicLoading, $cordovaFile,$cordovaFileTransfer) {


  return {


    clip : function (item,$scope,$cordovaFile,$cordovaFileTransfer) {
      var deferred = $q.defer();
      var response = [];

  $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));



console.log($scope.jsondata);


  var videoclips = $scope.jsondata.videos;

   $scope.video_translations = $scope.jsondata.video_translations;

console.log(videoclips);

      console.log("DOWNLOAD SERVICECLIP ITEM:");
      console.log($scope.downloadclipitem);
      // alert('Download service Item: ' + $scope.downloadclipitem.nid);

       var extravideoclipinfo = getObjects(videoclips,'id',$scope.downloadclipitem.nid);

       console.log('Downloadclip extravideoclipinfo : ');
       console.log( extravideoclipinfo );



       var language_data = getObjects($scope.item_translations,'source_id',  $scope.downloadclipitem.nid);
       var jsonconfig_language = window.localStorage['config_language'] || '2';
       var item_translations = getObjects(language_data,'locale_id',jsonconfig_language);


 console.log('source_id: ' + extravideoclipinfo[0].id);

       var video_data = getObjects($scope.video_translations,'source_id',extravideoclipinfo[0].id);
       var video_translations = getObjects(video_data,'locale_id',jsonconfig_language);

       console.log('video_translations data:');
       console.log(video_translations);

   console.log('Category Items: ' + $scope.downloadclipitem.nid + ' = ' + jsonconfig_language + ' == ' + extravideoclipinfo[0].id);
 console.log(video_translations.length);




 if (video_translations.length > 0) {

   if (video_translations[0].hasOwnProperty('url_low_res')) {
   extravideoclipinfo[0].url_low_res = video_translations[0].url_low_res;
   }

     if(video_translations[0].hasOwnProperty('youtube_id')){

         console.log('*** video_translations has youtube_id ***');

         console.log (video_translations[0].youtube_id);
           if (video_translations[0].youtube_id != '') {
             extravideoclipinfo[0].youtube_id = video_translations[0].youtube_id;
         }
     }
 }   else {

 console.log('*** SET YOUTUBE ID FROM EXTRA');

    // $scope.videos[i].youtube_id = extra[0].youtube_id;
 }



       console.log("DOWNLOAD SERVICE EXTRA CLIP ITEM:");
       console.log(extravideoclipinfo);

       console.log("CLIP ITEM:");
       console.log(item);

       var obj = extravideoclipinfo[0].url_low_res;

       console.log('****** ->>> Download url: ' + obj);
       // var DownloadFilename = DownloadUrl.substring(DownloadUrl.lastIndexOf('/')+1);
       var DownloadFilename = extravideoclipinfo[0].youtube_id + '.mp4';
       console.log('download file : ' + DownloadFilename);
       var url = obj;
       var targetPath = cordova.file.externalDataDirectory  + DownloadFilename;
       var trustHosts = true;
       var options = {};

       var name = targetPath.substr(targetPath.lastIndexOf('/') + 1);
       var resultCheckFile;

         // console.log('Checking : ' + DownloadFilename + '=');

         FileService.checkFile($scope, $cordovaFile, obj, cordova.file.externalDataDirectory , DownloadFilename)
         .then(
                   function (result) {
                        // promise was fullfilled (regardless of outcome)
                        // checks for information will be peformed here
                    },
                    function (error) {
                        // handle errors here

                         $cordovaFileTransfer.download(error[0].obj,  error[0].dir + error[0].file, options, trustHosts)
                           .then(function(result) {
                             // Success!
                             // console.log(result);
                             console.log('-----> Downloaded clip!' + error[0].file);

                             var alarmTime = new Date();
                             alarmTime.setMinutes(alarmTime.getMinutes() );
                             $cordovaLocalNotification.add({
                                 id: error[0].file,
                                 date: alarmTime,
                                 message: "Downloaded " + error[0].file + ".",
                                 title: "Mammarosa",
                                 autoCancel: true,
                                 sound:  'file://snd/beep.caf'
                             }).then(function () {
                                 console.log("The notification has been set");
                             });


                          //  $ionicTabsDelegate.select(0);

                           }, function(error) {
                             // Error

                           }, function (progress) {
                             $timeout(function () {
                               downloadProgress = (progress.loaded / progress.total) * 100;
                               console.log(downloadProgress);


                                if ( parseInt(downloadProgress)  >= 100) {
                                window.localStorage.setItem(item.youtube_id, false);
                                  console.log('CLIP DONE DOWNLOADING!');
                                  var response = [{'result':progress,'item':item}];
                                  console.log(progress);
                                  deferred.resolve(response);

$state.go($state.current, {}, {reload: true});

                                  return deferred.promise;
                                }


                           });
                           });
                        }
           );  // end then



     },

};


})


.service('appUpdateService', function($q,$http, $timeout, FileService, $ionicLoading, $cordovaFile,$cordovaFileTransfer) {

  return {


    updateJSON : function ($scope,$cordovaFile,$cordovaFileTransfer) {
  var deferred = $q.defer();
    //  $('#ionHideTabs').attr('ng-show',true);

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


    $ionicLoading.show({
        template: $scope.loadingtext
      });


      $q.all([


      $http.get('json/jsonFormatter.json')
              .success(function(results) {

                console.log('update this one reloadDataCtrl RELOAD! : JSON loaded from URL');
                  var jsondata = results;
                  console.log(jsondata);
                  window.localStorage.setItem("profile", JSON.stringify(results));


                  // File for download
                        var url = "http://www.gajotres.net/wp-content/uploads/2015/04/logo_radni.png";

                        // File name only
                        var filename = url.split("/").pop();

                        // Save location
                        var targetPath = cordova.file.externalRootDirectory + filename;

                        $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
                            console.log('Success');
                        }, function (error) {
                            console.log('Error');
                        }, function (progress) {
                            // PROGRESS HANDLING GOES HERE
                        });


                  var locales = jsondata.locales;
                  for (var i = 0; i < locales.length; i++) {

                          var DownloadUrl = locales[i].thumb_url;

                          console.log(DownloadUrl);
                      //    var DownloadFilename = DownloadUrl.substring(DownloadUrl.lastIndexOf('/')+1);
                          var DownloadFilename = locales[i].thumb_md5 + '.png';
                          console.log('download DownloadUrl : ' + DownloadUrl);
                          console.log('download file : ' + DownloadFilename);
                          var url = DownloadUrl;
                          var targetPath = cordova.file.externalDataDirectory  + "cache/" + DownloadFilename;
                          var trustHosts = true;
                          var options = {};

                          var name = targetPath.substr(targetPath.lastIndexOf('/') + 1);
                          var resultCheckFile;

                            // console.log('Checking : ' + DownloadFilename + '=');

                            FileService.checkFile($scope, $cordovaFile, DownloadUrl, cordova.file.externalDataDirectory  + "cache/" , DownloadFilename)
                            .then(
                                      function (result) {
                                           // promise was fullfilled (regardless of outcome)
                                           // checks for information will be peformed here
                                           console.log(result);
                                       },
                                       function (error) {
                                           // handle errors here
                                           console.log('***********error');
console.log(error);
                                            $cordovaFileTransfer.download(error[0].obj,  error[0].dir + error[0].file, options, trustHosts)
                                              .then(function(result) {
                                                // Success!
                                                // console.log(result);
                                                console.log('-----> Downloaded image!' + error[0].file);
                                              }, function(error) {
                                                // Error

                                              }, function (progress) {
                                                $timeout(function () {
                                                  downloadProgress = (progress.loaded / progress.total) * 100;
                                                  // console.log($scope.downloadProgress);
                                              });
                                              });
                                           }
                              );  // end then


                    };  // end for


                    // ************************************** slideshow_images

                    var slideshow_images = jsondata.slideshow_images;
                    for (var i = 0; i <   slideshow_images.length; i++) {

                            var DownloadUrl = slideshow_images[i].image_url;

                            console.log(DownloadUrl);
                        //    var DownloadFilename = DownloadUrl.substring(DownloadUrl.lastIndexOf('/')+1);
                            var DownloadFilename = slideshow_images[i].image_md5 + '.png';
                            console.log('download file : ' + DownloadFilename);
                            var url = DownloadUrl;
                            var targetPath = cordova.file.externalDataDirectory  + "cache/" + DownloadFilename;
                            var trustHosts = true;
                            var options = {};

                            var name = targetPath.substr(targetPath.lastIndexOf('/') + 1);
                            var resultCheckFile;

                              // console.log('Checking : ' + DownloadFilename + '=');

                              FileService.checkFile($scope, $cordovaFile, DownloadUrl, cordova.file.externalDataDirectory  + "cache/" , DownloadFilename)
                              .then(
                                        function (result) {
                                             // promise was fullfilled (regardless of outcome)
                                             // checks for information will be peformed here
                                         },
                                         function (error) {
                                             // handle errors here

                                              $cordovaFileTransfer.download(error[0].obj,  error[0].dir + error[0].file, options, trustHosts)
                                                .then(function(result) {
                                                  // Success!
                                                  // console.log(result);
                                                  console.log('-----> Downloaded image!' + error[0].file);
                                                }, function(error) {
                                                  // Error

                                                }, function (progress) {
                                                  $timeout(function () {
                                                    downloadProgress = (progress.loaded / progress.total) * 100;
                                                    // console.log($scope.downloadProgress);
                                                });
                                                });
                                             }
                                );  // end then


                      };  // end for


                      // ***********************************

                      var videos = jsondata.videos;
                      for (var i = 0; i < videos.length; i++) {

                              var DownloadUrl = videos[i].thumb_url;

                              console.log(DownloadUrl);
                          //    var DownloadFilename = DownloadUrl.substring(DownloadUrl.lastIndexOf('/')+1);
                              var DownloadFilename = videos[i].thumb_md5 + '.png';
                              console.log('download file : ' + DownloadFilename);
                              var url = DownloadUrl;
                              var targetPath = cordova.file.externalDataDirectory  + "cache/" + DownloadFilename;
                              var trustHosts = true;
                              var options = {};

                              var name = targetPath.substr(targetPath.lastIndexOf('/') + 1);
                              var resultCheckFile;

                                // console.log('Checking : ' + DownloadFilename + '=');

                                FileService.checkFile($scope, $cordovaFile, DownloadUrl, cordova.file.externalDataDirectory  + "cache/" , DownloadFilename)
                                .then(
                                          function (result) {
                                               // promise was fullfilled (regardless of outcome)
                                               // checks for information will be peformed here
                                           },
                                           function (error) {
                                               // handle errors here

                                                $cordovaFileTransfer.download(error[0].obj,  error[0].dir + error[0].file, options, trustHosts)
                                                  .then(function(result) {
                                                    // Success!
                                                    // console.log(result);
                                                    console.log('-----> Downloaded image!' + error[0].file);
                                                  }, function(error) {
                                                    // Error

                                                  }, function (progress) {
                                                    $timeout(function () {
                                                      downloadProgress = (progress.loaded / progress.total) * 100;
                                                      // console.log($scope.downloadProgress);
                                                  });
                                                  });
                                               }
                                  );  // end then


                        };  // end for


                    deferred.resolve(results);
                      //  $ionicLoading.hide();
                  })
                  .error(function(results) {
                    console.log('No internet connection? Using old data.');
                    alert('No internet connection? Using old data.');
                    deferred.reject(results);
                //    $ionicLoading.hide();

                  })

                            ]).then(function(responses){
                                // handling responses here

                                 $ionicLoading.hide();
                            });


              return;

    },


  };
})

.factory('$localstorage', ['$window', function($window) {
    	return {
    		set: function(key, value) {
    			$window.localStorage[key] = value;
    		},
    		get: function(key, defaultValue) {
    			return $window.localStorage[key] || false;
    		},
    		setObject: function(key, value) {
    			$window.localStorage[key] = JSON.stringify(value);
    		},
    		getObject: function(key) {
    			if($window.localStorage[key] != undefined)
    				return JSON.parse($window.localStorage[key] || false );

    			return false;
    		},
    		remove: function(key){
    			$window.localStorage.removeItem(key);
    		},
    		clear: function(){
    			$window.localStorage.clear();
    		}
    	}
    }])

//Filesystem (checkDir, createDir, checkFile, creatFile, removeFile, writeFile, readeFile)
.factory('myFileService', function($q) {

    return {
        checkDir: function (dir) {
            var deferred = $q.defer();

            getFilesystem().then(
                function(filesystem) {
                    filesystem.root.getDirectory(dir, {create: false},
                        function() {
                            //Dir exist
                            deferred.resolve();
                        },
                        function() {
                            //Dir dont exist
                            deferred.reject();
                        }
                    );
                }
            );

            return deferred.promise;
        },

        createDir: function (dir) {
            getFilesystem().then(
                function(filesystem) {
                    filesystem.root.getDirectory(dir, {create: true});
                }
            );
        },

        checkFile: function (dir, file) {
            var deferred = $q.defer();

            getFilesystem().then(
                function(filesystem) {
                    filesystem.root.getFile('/'+ dir +'/'+ file, {create: false},
                        function() {
                            //File exist
                            deferred.resolve();
                        },
                        function() {
                            //File dont exist
                            deferred.reject();
                        }
                    );
                }
            );

            return deferred.promise;
        },

        createFile: function (dir, file) {
            getFilesystem().then(
                function(filesystem) {
                    filesystem.root.getFile('/'+ dir +'/'+ file, {create: true});
                }
            );
        },

        removeFile: function (dir, file) {
            var deferred = $q.defer();

            getFilesystem().then(
                function(filesystem) {
                    filesystem.root.getFile('/'+ dir +'/'+ file, {create: false}, function(fileEntry){
                        fileEntry.remove(function() {
                            deferred.resolve();
                        });
                    });
                }
            );

            return deferred.promise;
        },

        writeFile: function (dir, file) {
            var deferred = $q.defer();

            getFilesystem().then(
                function(filesystem) {
                    filesystem.root.getFile('/'+ dir +'/'+ file, {create: false},
                        function(fileEntry) {
                            fileEntry.createWriter(function(fileWriter) {
                                deferred.resolve(fileWriter);
                            });
                        }
                    );
                }
            );

            return deferred.promise;
        },

        readeFile: function (dir, file) {
            var deferred = $q.defer();

            getFilesystem().then(
                function(filesystem) {
                    filesystem.root.getFile('/'+ dir +'/'+ file, {create: false},
                        function(fileEntry) {

                            fileEntry.file(function(file) {
                                var reader = new FileReader();

                                reader.onloadend = function() {
                                    deferred.resolve(this.result);
                                };

                                reader.readAsText(file);

                            });
                        }
                    );
                }
            );

            return deferred.promise;
        }

    };

    function getFilesystem() {
        var deferred = $q.defer();

        window.requestFileSystem(window.PERSISTENT, 1024*1024, function(filesystem) {
            deferred.resolve(filesystem);
        });

        return deferred.promise;
    }
})





.factory('Chats', function($http,$rootScope) {
  // Might use a resource here that returns a JSON array

var datachats = [];
var chats = [];
var results = [];


  // Some fake testing data
/*
var chats = [{
  id: 0,
  name: 'Ben Sparrow',
  lastText: 'You on your way?',
  face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
}, {
  id: 1,
  name: 'Max Lynx',
  lastText: 'Hey, it\'s me',
  face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
}, {
  id: 2,
  name: 'Adam Bradleyson',
  lastText: 'I should buy a boat',
  face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
}, {
  id: 3,
  name: 'Perry Governor',
  lastText: 'Look at my mukluks!',
  face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
}, {
  id: 4,
  name: 'Mike Harrington',
  lastText: 'This is wicked good ice cream.',
  face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
}];
*/

  return {
    all: function() {
// , { params: { "api_key": "some_key_here" } }
/*
      $http.get('http://mammarosa.modusoft.nl/nl/api')
              .success(function(results) {
                  $scope.profile = results;
                  window.localStorage.setItem("profile", JSON.stringify(results));
              })
              .error(function(data) {
                  if(window.localStorage.getItem("profile") !== undefined) {
                      $scope.profile = JSON.parse(window.localStorage.getItem("profile"));
                  }
              });
*/



      $http.get('http://mammarosa.modusoft.nl/nl/api').success(function (results) {
      //    $rootScope.id = results.id;
      //    $rootScope.name = results.name;
      //    $rootScope.lastText = results.lastText;
      //    $rootScope.face = results.face;

     console.log(results);

    datachats = results.locales;
    console.log(datachats);



      for (var i = 0; i < datachats.length; i++) {
        chats[i] = datachats[i];
        console.log ('Name :' + chats[i].name );
        console.log ('SourceName :' + chats[i].source_name );
        console.log ('Thumbnail :' + chats[i].thumb_url );
      };



            });

      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      alert('yes: '+ chatId);

      $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));
      $scope.chats = $scope.jsondata.video_items;


      for (var i = 0; i < chats.length; i++) {
        if (chats[i].category_id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
