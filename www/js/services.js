angular.module('starter.services', ['ngCordova', 'ngCordova.plugins.file'] )


.service('FeedbackService', function($q, $http,  $cordovaSQLite) {
  return {

    getUser: function( $scope,$timeout, userid) {
            var dfd = $q.defer()

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

                 dfd.resolve({
                   data: $scope.settings
                 })

            }, function (err) {

                console.error(err);

            });



            return dfd.promise

    },


    doPost: function(feedbackItem) {
      var dfd = $q.defer()

console.log(feedbackItem)



console.log('****** DOPOST user data: ' + feedbackItem)

var post = [];
// var list = [];
var event_list = [];
var events = [];
var post = [];
var event = [];
var rates = [];
var rating = [];

      var list = {                                                      // object An "event_list" object
          "events": [                                                     // array  Array of "event" objects
              {
                  "video_id": feedbackItem.data.data[0].video_id,         // integer The video object in NATIVE language ("video" object)
                  "locale_id": feedbackItem.account.data.locale_id,                                        // integer The language the video was watched in ("locale" object)
                  "birth_year": feedbackItem.account.data.Birthyear,                                     // integer Birthyear, user provided
                  "multiple_people": feedbackItem.kijksoort,                                   // boolean Whether this video was watched with other people or not, user provided
                  "streaming": feedbackItem.streaming,                                        // boolean Whether the streamed or downloaded version of this video was watched
                  "device_id": feedbackItem.device.device_id,    // string  Unique device identifier
                  "end_time": 1370684303,                                 // integer The time the user stopped watching this video, Unix timestamp
                  "device_type": feedbackItem.device.device_model,        // string  Device type identifier
                  "start_time": 1370684299,                               // integer The time the user started watching this video, Unix timestamp
                  "name": feedbackItem.account.data.firstname + ' ' + feedbackItem.account.data.lastname,                                     // string (optional) Users name
                  "email": feedbackItem.account.data.email               // string (optional) Users emailaddress
              }
          ],

          "rates": [
              {
                  "video_id": feedbackItem.data.data[0].video_id,                                         // integer The video object in NATIVE language ("video" object)
                  "message": feedbackItem.feedbackdata.feedback,          // string A user generated message
                  "rating": feedbackItem.feedbackdata.value               // integer Rating, not limited by the API but values between 0 and 5 are expected
              }
          ]
}

// list = JSON.parse(list);

// event_list.push( list );

// post.push(event_list);




event["locale_id"] = "2";
event["device_type"] = "iPad";
event["device_id"] = "C16F02F1-51EC-41D1-AEAA-4E9B71E1C4D8";
event["start_time"] = "1370684299";
event["video_id"] = "139";
event["streaming"] = "1";
event["birth_year"] = 1980;
event["multiple_people"] = 0;
event["end_time"] = 1370684303;
event["name"] = "Jan";
event["email"] = "Jan@example.com";

// events.push(event);
// console.log(event);



rating["video_id"] =139;
rating["message"] = 'Nice!';
rating["rating"]= 4;
// rates.push(rating);
// console.log(rating);

// event_list.push({"events" : event });
// event_list.push({"rates" : rating });


console.log( 'event_list' );
console.log( list );



myobject = list;
Object.toparams = function ObjecttoParams(obj)
{
  var p = [];
  for (var key in obj)
  {
    p.push(key + '=' + encodeURIComponent(obj[key]));
  }
  return p.join('&');
};



var req =
{
    method: 'POST',
    url: "http://mammarosa.modusoft.nl/nl/api/statistics",
    data: "event_list=" + JSON.stringify(list) ,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}

$http(req).
success(function(data, status, headers, config)
{
    //success
    console.log('*** succes post',data, status, headers, config)
}).
error(function(data, status, headers, config)
{
    //error
    console.log('*** error post',data, status, headers, config)
});

/*
              $http.post('http://mammarosa.modusoft.nl/nl/api/statistics', "event_list=" + JSON.stringify(list) ).then(function(resp) {
                          console.log('Success 2', JSON.stringify(resp));
                          alert("Result POST 2: "+JSON.stringify(resp));
                          // For JSON responses, resp.data contains the result
                      }, function(err) {
                          console.log('Error 2', JSON.stringify(err));
                          alert("Error POST 2: "+JSON.stringify(err));
                      // err.status will contain the status code
                    });

*/

    //  setTimeout(function() {
        dfd.resolve({
          event_list: list
        })
    //  }, 2000)

      return dfd.promise
    },

  }
})

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
                   // console.log($scope.i  + ' : File exists! ' + file);

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
                //   console.log(i + ' : File does not exist! ' + file);


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
          // console.log('File exists! ' + file);
        var response = [{'result':success,'dir':dir, 'file':file, 'obj':obj, 'scope_array':$scope}];
        // promise is fulfilled
        deferred.resolve(response);
        // promise is returned
      //   return deferred.promise;

        }, function (error) {
          // error
          // console.log('File does not exist! ' + file);
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

.service('goBackMany',function($ionicHistory){
  return function(depth){
    // get the right history stack based on the current view
    var historyId = $ionicHistory.currentHistoryId();
    var history = $ionicHistory.viewHistory().histories[historyId];
    // set the view 'depth' back in the stack as the back view
    var targetViewIndex = history.stack.length - 1 - depth;
    $ionicHistory.backView(history.stack[targetViewIndex]);
    // navigate to it
    $ionicHistory.goBack();
  }
})

.service('appDownloadService', function($q, $state, $stateParams, $http, $timeout, $ionicTabsDelegate, FileService,$cordovaLocalNotification, $ionicLoading,$cordovaSQLite, $cordovaFile,$cordovaFileTransfer) {


  return {

    delete_clip : function (item,$scope,$cordovaFile,$cordovaFileTransfer) {
      var deferred = $q.defer();
      var response = [];

      var unix = Math.round(+new Date()/1000);

                        var locale_id = item.locale_id;
                        if (locale_id < 1) { locale_id = 2; }

      var video_id = item.video_id;
      var query = "DELETE FROM video_extra_data WHERE video_id='"+video_id+"' AND locale_id='"+locale_id+"';";

                                           //       alert('2 :' +query);
                                                  $cordovaSQLite.execute(db, query)
                                                  .then(function(res){
                                               //         alert('toggle_visibility : '+res.rows.length );

                                               var response = [{'result':res,'item':item}];
                                               console.log(response);
                                               deferred.resolve(response);

                                                  },
                                                  function(err){
                                                    console.log("Error SQLite: " + JSON.stringify(err));
                                                  });

                                           return deferred.promise;
    },



    clip : function (item,$scope,$cordovaFile,$cordovaFileTransfer) {
      var deferred = $q.defer();
      var response = [];

  // $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));

console.log('DOWNLOAD SERVICE ***** INIT');
console.log( JSON.stringify(item));

// return;

// console.log($scope.jsondata);
$scope.downloadclipitem = item;

//  var videoclips = $scope.jsondata.videos;

//   $scope.video_translations = $scope.jsondata.video_translations;

// console.log(videoclips);

      console.log("DOWNLOAD SERVICECLIP ITEM:");
//      console.log($scope.downloadclipitem);
      // alert('Download service Item: ' + $scope.downloadclipitem.nid);

    //   var extravideoclipinfo = getObjects(videoclips,'id',$scope.downloadclipitem.nid);

       console.log('Downloadclip extravideoclipinfo : ');
  //     console.log( extravideoclipinfo );



//       var language_data = getObjects($scope.item_translations,'source_id',  $scope.downloadclipitem.nid);
       var jsonconfig_language = window.localStorage['config_language'] || '2';
//       var item_translations = getObjects(language_data,'locale_id',jsonconfig_language);


// console.log('source_id: ' + extravideoclipinfo[0].id);

//       var video_data = getObjects($scope.video_translations,'source_id',extravideoclipinfo[0].id);
//       var video_translations = getObjects(video_data,'locale_id',jsonconfig_language);

//       console.log('video_translations data:');
//       console.log(video_translations);

  // console.log('Category Items: ' + $scope.downloadclipitem.nid + ' = ' + jsonconfig_language + ' == ' + extravideoclipinfo[0].id);
 // console.log(video_translations.length);



/*
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
*/


       var obj = item.url_low_res;

       console.log('****** {>> Download url: ' + obj);
       // var DownloadFilename = DownloadUrl.substring(DownloadUrl.lastIndexOf('/')+1);
       var DownloadFilename = item.youtube_id + '.mp4';
       console.log('download file : ' + DownloadFilename);
       var url = obj;
       var targetPath = fileTransferDir + DownloadFilename;
       var trustHosts = true;
       var options = {};

       var name = targetPath.substr(targetPath.lastIndexOf('/') + 1);
       var resultCheckFile;


       console.log('targetPath : ' + targetPath);

         FileService.checkFile($scope, $cordovaFile, obj, fileTransferDir , DownloadFilename)
         .then(
                   function (result) {
                        // promise was fullfilled (regardless of outcome)
                        // checks for information will be peformed here
console.error(result);
console.log('Not Going to download?');
var youtube_id = item.youtube_id;
$scope.statusDownload[youtube_id] = 1;


var unix = Math.round(+new Date()/1000);

                  var locale_id = item.locale_id;
                  if (locale_id < 1) { locale_id = 2; }

var video_id = item.video_id;
var query = "REPLACE INTO video_extra_data (video_id, locale_id, downloaded_date, downloading) VALUES ('"+video_id+"','"+locale_id+"','"+unix+"','1' )";

                                    //        alert('already existed  :' +query);
                                            $cordovaSQLite.execute(db, query)
                                            .then(function(res){
                                                console.log('toggle_visibility : '+res.rows.length );
                                                if (res.rows.length >0){
var check_downloading =false;

var youtube_id = item.youtube_id;
$scope.statusDownload[youtube_id] = 2;



                                                } else {
var check_downloading =true;

var youtube_id = item.youtube_id;
$scope.statusDownload[youtube_id] = 1;

                                                }

                                            },
                                            function(err){
                                              console.log("Error SQLite: " + JSON.stringify(err));
                                            });

                                            console.log('check the visibility');
                                            $scope.check_visibility(item);

                                            var response = [{'result':result,'item':item}];


                                  //   $state.go($state.current, {}, {reload: true});


                    },
                    function (error) {
                        // handle errors here

console.log('Going to download?');
 console.log( error );


 var youtube_id = error[0].scope_array.downloadclipitem.youtube_id;

console.log('youtube ID : ' + youtube_id);
$scope.statusDownload[youtube_id] = 9;

                         $cordovaFileTransfer.download(error[0].obj,  error[0].dir + error[0].file, options, trustHosts)
                           .then(function(result) {
                             // Success!
                             console.log( JSON.stringify(result) );
                             console.log('----{ Downloaded clip!' + error[0].file);

                             var unix = Math.round(+new Date()/1000);

                                               var locale_id = item.locale_id;
                                               if (locale_id < 1) { locale_id = 2; }

                             var video_id = item.video_id;
                             var query = "REPLACE INTO video_extra_data (video_id, locale_id, downloaded_date, downloading) VALUES ('"+video_id+"','"+locale_id+"','"+unix+"','1' )";

                                                                  //       alert('2 :' +query);
                                                                         $cordovaSQLite.execute(db, query)
                                                                         .then(function(res){
                                                                      //         alert('toggle_visibility : '+res.rows.length );
                                                                             if (res.rows.length >0){
                             var check_downloading =false;

                             var youtube_id = item.youtube_id;
                             $scope.statusDownload[youtube_id] = 1;

                                                                             } else {
                             var check_downloading =true;

                             var youtube_id = item.youtube_id;
                             $scope.statusDownload[youtube_id] = 2;

                                                                             }

                                                                         },
                                                                         function(err){
                                                                           console.log("Error SQLite: " + JSON.stringify(err));
                                                                         });




                  //           checkit=false;


                  var alarmTime = new Date();
                  alarmTime.setMinutes(alarmTime.getMinutes() );

                  cordova.plugins.notification.local.schedule({
                      id: 1,
                      text: "Downloaded " + error[0].file + ".",
                      title: "Mammarosa",
                      sound:  'file://snd/beep.caf',
                      data: { key:'value' }
                    });



                                       $timeout(function() {
                                  //       myEl.addClass('downloading-on');
                                  //       myEl.removeClass('downloading-off');


                                        item.downloaded_date = alarmTime;
                                        item.downloading = false;
                                        console.log('***** OKAY GET READY ****');
                                        // $scope.check_visibility(item);
                                      }, 1000);

                          //  $ionicTabsDelegate.select(0);

                           }, function(error) {
                             // Error
 console.log('DOWNLOAD TRANSFER ERROR: ');
 console.log( JSON.stringify(error) );
                           }, function (progress) {
                             $timeout(function () {
                               downloadProgress = (progress.loaded / progress.total) * 100;
                               console.log(downloadProgress);


                                if ( parseInt(downloadProgress)  >= 100) {
                              //  window.localStorage.setItem(item.youtube_id, false);


                                  var youtube_id = item.youtube_id;
                                  $scope.statusDownload[youtube_id] = 2;

                                  console.log('CLIP DONE DOWNLOADING! ' + youtube_id);

                                  item.downloading = false;
                                  console.log('***** OKAY GET READY 2****');

                                  var unix = Math.round(+new Date()/1000);

                                                    var locale_id = item.locale_id;
                                                    if (locale_id < 1) { locale_id = 2; }

                                  var video_id = item.video_id;
                                  var query = "REPLACE INTO video_extra_data (video_id, locale_id, downloaded_date, downloading) VALUES ('"+video_id+"','"+locale_id+"','"+unix+"','0' )";

                                                                        //      alert('2 :' +query);
                                                                              $cordovaSQLite.execute(db, query)
                                                                              .then(function(res){
                                                                           //         alert('toggle_visibility : '+res.rows.length );
                                                                                  if (res.rows.length >0){
                                  var check_downloading =false;
                                                                                  } else {
                                  var check_downloading =true;
                                                                                  }

                                                                              },
                                                                              function(err){
                                                                                console.log("Error SQLite: " + JSON.stringify(err));
                                                                              });

                            //      $scope.check_visibility(item);

                                  var response = [{'result':progress,'item':item}];
                                  console.log(progress);

                          //  $state.go($state.current, {}, {reload: true});



                                  // check_visibility(item);

                                }


                           });
                           });
                        }
           ).then(function(result){

             console.log('what nowwwwwwwwwwwwwwwwwwww?');
             console.log(result);
             var response = [{'result':result,'item':item}];
             console.log(response);
             deferred.resolve(response);

             // deferred.resolve(response);
             return deferred.promise;

           });  // end then



     },

};


})


.service('appUpdateService', function($q,$http, $state, $window, $stateParams,$ionicHistory, $timeout, $sce, FileService, $ionicLoading, $cordovaSQLite, $cordovaFile,$cordovaFileTransfer) {



  return {


    updateDB : function ($q,$scope, $stateParams,$ionicHistory ,$cordovaFile,$cordovaFileTransfer) {


      var deferredUpdateDB = $q.defer();
      var promiseListUpdateDB = [];

      db = $cordovaSQLite.openDB("mammarosa.db");

  var RecordCounter = 0;


  var intervalIDcounter = setInterval(function(){
    $scope.downloadProgress = (RecordCounter / 1300) * 100;
    $scope.downloadProgressMax = 1300;
    $scope.downloadProgressCounter = RecordCounter;
  }, 1000);




  var intervalID = setInterval(function(){
  //  console.log('Records :' + RecordCounter);



  if (RecordCounter <= 0 ) {
    clearInterval(intervalID);



    $state.go("entry");
          $ionicHistory.clearHistory();


          setTimeout(function (){

              $scope.EntryPageVisible = true;

                 $window.location.reload(true);
          }, 2100);

    }


  }, 8000);





function writeSqlRecord(posts){

console.log( '*-*-*-* writeSqlRecord:' );
// console.log( JSON.stringify(posts) );


          var json_data = JSON.stringify(posts);
          var t = JSON.parse(json_data);

        //  console.log('****** T ******');
        //  console.log(t);

          var sqlStatement =  t[1][3][0].sqlStatement;

          if (t[1][0][0].tableName == 'slideshow_images') {
                    var sqlStatementUpdate =  t[1][4][0].sqlStatementUpdate;
          }



          var itemFieldnames = t[1][1][0].fieldNames;
          var itemFieldvalues = t[1][2][0].fieldValues;


          // console.log(sqlStatement);

          // console.log('------ NEW --{ ' + t[1][3][0].sqlStatement);

    //    console.log("return " + JSON.stringify(itemFieldvalues) );



  // alert(itemFieldname + ' - ' + itemFieldvalues[i] + ' - ' + myFileName + ' - ' + myFileName.length);

//if ( (myFileName.length > 0 ) && (sqlStatementUpdate != 'undefined') ) {
  //  downloadURL(myURL,myFileName, t[1][0][0].tableName ,  sqlStatementUpdate , itemFieldvalues);
//}


  if(t[0].rows.length == 0) {
  RecordCounter++;

  console.log('Querying ... Number { ' + RecordCounter);

  var writeSqlRecord_promises = [];

console.log(sqlStatement);

var writeSqlRecord_promise = $cordovaSQLite.execute(db, sqlStatement, itemFieldvalues).then(function(ress) {

 return $q(function(resolve, reject) {

   JSON.stringify(ress);
     if(ress.rows.length > 0) {
          console.log("Inserted "+JSON.stringify(ress)  );
    //   console.log(" select already existed in the database! " + select_query);
     RecordCounter--;

         reject(ress);
         } else {
         console.log("2 does not exist in the database!");
         console.log("Inserted "+JSON.stringify(ress)  );
          RecordCounter--;
           resolve(ress);
         }
   });

});


writeSqlRecord_promises.push(writeSqlRecord_promise);
writeSqlRecord_promises.push(posts);


return $q.all(writeSqlRecord_promises);

  };




// console.log(  JSON.stringify(posts) );

return $q.all(writeSqlRecord_promises);

// return posts;

}


function checkIfRecordExists(posts) {

      // console.log(  JSON.stringify(posts) );
      // console.log( posts );


      var fieldName = [];
      var fieldValue = [];

      var tableName = posts[0][0].tableName;
      fieldName = posts[1][0].fieldNames;
      fieldValue = posts[2][0].fieldValues;

      // console.log(fieldName);


                if (!posts || posts.length === 0)
                {
                    console.log('No posts to write to database!');
                    return false;
                }

                console.log('Writing posts ...');

                var promises = [];

                var select_query = "SELECT * FROM "+ tableName +" WHERE "+ fieldName[0] + "='"+ fieldValue[0]+"' AND " + fieldName[2] + "='"+fieldValue[2]+"'";

              //  console.log(select_query);

                     var promise = $cordovaSQLite.execute(db, select_query, []).then(function(ress) {

                      return $q(function(resolve, reject) {
                          if(ress.rows.length > 0) {
                      //     console.log(" already existed in the database! " + select_query);
                              reject(ress);
                              } else {
                              console.log(" does not exist in the database!" + select_query);
                                resolve(ress);
                              }
                        });

                     });

                     promises.push(promise);
                     promises.push(posts);

                    return $q.all(promises);
            };



















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






        function base64toBlob(base64Data, contentType) {
            contentType = contentType || '';
            var sliceSize = 1024;
            var byteCharacters = atob(base64Data);
            var bytesLength = byteCharacters.length;
            var slicesCount = Math.ceil(bytesLength / sliceSize);
            var byteArrays = new Array(slicesCount);

            for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                var begin = sliceIndex * sliceSize;
                var end = Math.min(begin + sliceSize, bytesLength);

                var bytes = new Array(end - begin);
                for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
                    bytes[i] = byteCharacters[offset].charCodeAt(0);
                }
                byteArrays[sliceIndex] = new Uint8Array(bytes);
            }
            return new Blob(byteArrays, { type: contentType });
        }



        var onSuccess = function(e){
       $scope.downloadedFoto = e.image;


console.log('SUCCESS! ');
console.log(e);

 console.log('onSuccess *******');

var tableName = e.tableName;

if (tableName == 'slideshow_images') {
console.log('Table: ' + tableName);
}


var itemFieldvalues = e.itemFieldvalues;
console.log(itemFieldvalues);

 console.log('*******  e.DownloadFilename :'+ fileDir +  e.DownloadFilename);

var base64Data =  e.data;
var image_Data = e.data.substr(e.data.lastIndexOf(',') + 1);
//   console.log( image_Data );


console.log('tableName : ' + tableName );
console.log('* b l o b *');
    //   console.log( base64Data );

var filename = e.DownloadFilename
 filename.substr(filename.lastIndexOf('/') + 1);
/*
var contentType = 'image/png';
var blob = b64toBlob(image_Data, contentType);
var blobUrl = URL.createObjectURL(blob);

         console.log('// do something with url');
*/

console.log('filename : ' + filename);


// if (e.tableName == 'slideshow_images') {
console.log('table sqlStatementUpdate !!!!!! ');
// var contentType = "image/png";
// var base64Data = base64toBlob(raw_data, contentType);

//var re = "/BLOB/g";
//new_sql = sql.replace(re, base64Data);


      //    alert(e.sql);

// };



         $cordovaFile.copyFile(blobUrl,filename, cordova.file.dataDirectory, filename)
                             .then(function(success) {
                                 console.dir(success);
                                    console.log('onSuccess Copy TO FILE On SUCCESS *******');
                                 $scope.fileName = cordova.file.dataDirectory + e.DownloadFilename;
                             }, function(error) {
                                      console.log('----{ onError copy image 3 ERROR! { ');
                                 console.dir(error);
                             });



       $cordovaFile.writeFile( 'cdvfile://localhost/files-external/' + filename,image_Data,true).then( function(result) {

       console.log('onSuccess WRITE TO FILE On SUCCESS *******');
      // console.log( JSON.stringify(result) );



       }, function(error) {
       // Error

       console.log('----{ onSuccess Downloaded image 3 ERROR! { ');
       console.log( JSON.stringify(error) );
       });

      //  alert(e.data);

        };

        var onError = function(e){
 console.log('onError WRITE TO FILE  *******');
        };




        /**
       * Converts image URLs to dataURL schema using Javascript only.
       *
       * @param {String} url Location of the image file
       * @param {Function} success Callback function that will handle successful responses. This function should take one parameter
       *                            <code>dataURL</code> which will be a type of <code>String</code>.
       * @param {Function} error Error handler.
       *
       * @example
       * var onSuccess = function(e){
       *  document.body.appendChild(e.image);
       *  alert(e.data);
       * };
       *
       * var onError = function(e){
       *  alert(e.message);
       * };
       *
       * getImageDataURL('myimage.png', onSuccess, onError);
       *
       */



function doSqlQuery(sql,itemFieldvalues){
console.log('Query!!!!! ' + sql);

var dbitems = JSON.parse( JSON.stringify(itemFieldvalues) );
console.log('new dbitems!!!! ')
console.log ( dbitems);

var sql = "SELECT * FROM slideshow_images WHERE 'image_md5'='"+ dbitems[3] +"';";

RecordCounter++;

  $cordovaSQLite.execute(db, sql, [])
  .then(function(res){


console.log('Result sql :');
console.log( JSON.stringify(res) );


if (res.rows.length > 0) {

var sql = "UPDATE 'slideshow_images' SET 'blob'='"+ dbitems[3]+"' WHERE 'image_md5'='"+ dbitems[3] +"'";
console.log('new 1 Query!!!!! ')
console.log(sql);

        $cordovaSQLite.execute(db, sql, [])
        .then(function(res){
        console.log('SQL Success!!');
        console.log( JSON.stringify(res) );
        RecordCounter--;

        },
        function(err){
        console.log("sqlStatementUpdate Error");
        console.log( JSON.stringify(err));
        RecordCounter--;

        });
} else {

  var sql = "INSERT OR REPLACE INTO slideshow_images (title, image_url, ordering, image_md5, blob) VALUES (?,?,?,?,?);";
  console.log('new Query!!!!! ')
  console.log(sql);



          $cordovaSQLite.execute(db, sql, dbitems)
          .then(function(res){
          console.log('SQL Success!!');
          console.log( JSON.stringify(res) );
          },
          function(err){
          console.log("sqlStatementUpdate Error");
          console.log( JSON.stringify(err));
          });

}

  },
  function(err){
  console.log("sqlStatementUpdate result Error");
  console.log( JSON.stringify(err));




  });


}

function getImageDataURL(url,DownloadFilename, tableName, sql, itemFieldvalues, success, error) {
console.log('getImageDataURL : '+ tableName + ' : GET IMAGE DATA **** : ' + url);
//url =  urldecode(url);
//console.log('getImageDataURL : GET IMAGE DATA **** : ' + url);


var myitemFieldvalues = itemFieldvalues;
          var raw_data,data, canvas, ctx;
          var img = new Image();
          img.onload = function(){
              // Create the canvas element.
              console.log('create canvas');
              canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              // Get '2d' context and draw the image.
              ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);

              ctx.shadowColor = "black";
              ctx.shadowOffsetX = 5;
              ctx.shadowOffsetY = 5;
              ctx.shadowBlur = 7;
              // ctx.font = "40px 'Helvetica'";
              ctx.font = "20pt Calibri";

              ctx.textBaseline = 'alphabetic';
              ctx.scale(1,1);
              ctx.fillStyle = "white";
            //  ctx.fillText("Hallo Welt", 50, 100);



              // ctx.drawImage(img, 10, 10);

              ctx.fillText(itemFieldvalues[0], 20, 40);

              // Get canvas data URL
              try{
                  data = canvas.toDataURL();


console.log('Succes promise');


raw_data  = data.substr(data.lastIndexOf(',') + 1);
// console.log(raw_data);
//console.log('// myitemFieldvalues');



itemFieldvalues.push(raw_data);
console.log(itemFieldvalues);
                 //  new_sql = new_sql + Where;
// itemFieldvalues[0] = (itemFieldvalues[0]);
                 //  alert('sqlStatementUpdate !!!!!! ' + e.sql);


             sql = sql + ', "blob"="'+ raw_data +'" WHERE "image_md5"=`' + itemFieldvalues[3] +'`;';

                 setTimeout(function() {
                     doSqlQuery(sql,itemFieldvalues);
                 }, 3000);




              success({image:img, DownloadFilename:DownloadFilename, data:data,  tableName:tableName, sql:sql, itemFieldvalues:itemFieldvalues});
              }catch(e){
                error(e);
                console.log('error promise');
              }



          }
          // Load image URL.
          try{
              img.src = url;



console.log('Image url would be: ' + url);








var targetPath = fileTransferDir + DownloadFilename;
/*
$cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
    console.log('Success download data');
    //    console.log(result)
    if (result.isFile === true) {
        alert('true');
    }

});
*/
// console.log('-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-');
          }catch(e){
              error(e);
          }




}


console.log('** INIT SaveImage function');

                 function saveImage(dir, filename, image_data) {
                //    $cordovaVibration.vibrate(1000);

/*
                var blob = new Blob(
                    [new Buffer(res, 'base64')],
                    {
                        type: 'application/octet-stream'
                    }
                );
*/



// var blob = new Blob([data], {type:'application/octet-stream'});

// console.log('Save dir : ' + dir );
  //                  console.log('Save this : ' + filename );
                  //  console.log('Devicedready cordova.file.documentsDirectory: ' + cordova.file.documentsDirectory + ' / ' + cordova.file.externalDataDirectory);

                 //   $scope.inspection =  res + "\n";



                //  var inspection = JSON.stringify(blob);

                 //   var inspection = $scope.inspection;




                // console.log('dataToWrite : { ' + toBase64Image(image_data) );
/*
                    $cordovaFile.writeFile( cordova.file.externalDataDirectory, filename, toBase64Image(image_data) , true)
                        .then(function(success){

                        //  alert(JSON.parse(toBase64Image(image_data) ));

                           // alert(inspection);


                        }, function(error){
                            alert('did not create file ' + error.code);


                        });

*/

                };



                function parseUnicode(str){
                    var r = /\\u([\d\w]{4})/gi;
                    str = str.replace(r, function (match, grp) {
                        return String.fromCharCode(parseInt(grp, 16)); } );
                    return str;
                }

function dataURItoBlob(dataURI) {
var byteString = atob(dataURI);
var mimeString = "image/jpeg";
// write the bytes of the string to an ArrayBuffer
var arrayBuffer = new ArrayBuffer(byteString.length);
var _ia = new Uint8Array(arrayBuffer);
for (var i = 0; i < byteString.length; i++) {
    _ia[i] = byteString.charCodeAt(i);
}

var dataView = new DataView(arrayBuffer);
var blob = new Blob([dataView], { type: mimeString });
return blob;
}

function urldecode(url) {
  return decodeURIComponent(url.replace(/\+/g, ' '));
}


function downloadURL(DownloadUrl,DownloadFilename,tableName, sql,itemFieldvalues) {


  if (tableName == 'slideshow_images') {
getImageDataURL(DownloadUrl, DownloadFilename, tableName, sql,itemFieldvalues, onSuccess, onError);
} else {


  console.log(DownloadUrl);
  //    var DownloadFilename = DownloadUrl.substring(DownloadUrl.lastIndexOf('/')+1);
  DownloadFilename = DownloadFilename + '.png';
         var obj = DownloadUrl;
  console.log('New download image file : ' + DownloadFilename);
  // var url = DownloadUrl;
  var targetPath = fileTransferDir  + "cache/" + DownloadFilename;
  var trustHosts = true;
  var options = {};

  var name = targetPath.substr(targetPath.lastIndexOf('/') + 1);
  var resultCheckFile;

    console.log('Checking DownloadUrl: ' + DownloadUrl + ' = ');
    console.log('Checking DownloadFilename: ' + DownloadFilename + ' = ');

    FileService.checkFile($scope, $cordovaFile, obj, fileTransferDir  + "cache/" , DownloadFilename)
    .then(
              function (result) {

               },
               function (error) {
                   // handle errors here
                  console.log('download this file:');
                  // console.log( error );


                   var trustHosts = true;
                   var options = {};

                    $cordovaFileTransfer.download(error[0].obj,  error[0].dir + error[0].file, options, trustHosts)
                      .then(function(result) {
                        // Success!
                        console.log(result);
                        console.log('----{ Downloaded image! { ' + error[0].file);
                      }, function(error) {
                        // Error

  console.log('----{ Downloaded image ERROR! { ');
                        console.log( JSON.stringify(error) );
                       var data_error = error.body;
  console.log(data_error);
                       $cordovaFile.writeFile(error.target, data_error, '').then( function(result) {

  console.log('WRITE TO FILE *******');
  console.log(result);
  }, function(error) {
  // Error

  console.log('----{ Downloaded image 2 ERROR! { ');
  console.log( JSON.stringify(error) );
                       });



                      }, function (progress) {
                        $timeout(function () {
                         // downloadProgress = (progress.loaded / progress.total) * 100;
                       //   console.log($scope.downloadProgress);
                      });
                      });
                   }
      );  // end then


} // endif tablename



}

// ********************************************

        // File for download
              var url = "http://mammarosa.modusoft.nl/nl/api/";

              // File name only
              var filename = 'jsondata.json';

              // Save location
              var targetPath = fileTransferDir + filename;

              $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
                  console.log('Success download jsn data');
                  //    console.log(result)
                  if (result.isFile === true) {
                      //  alert('true');
                  }


  var oldTableName;
  var posts = {};
  var post = [];



  var myurl = cordova.file.applicationDirectory;

  // Read text written in file
  $cordovaFile.readAsText(fileTransferDir,'jsondata.json').then( function(data) {
  //console.log('readAsText: ', data);

        console.log('Success 2');
        //console.log(data);
          //          db = window.sqlitePlugin.openDatabase({name: "mammarosa.db"});
    //              console.log('**** update this one reloadDataCtrl RELOAD! : JSON loaded from URL');
  var jsondata = JSON.parse(data);
                    console.log('***** JSON Data *****');
                  //console.log(jsondata);


                    for (var k in jsondata){


                        var tableName = '';

                        if (typeof jsondata[k] !== 'function') {
                //             alert("Key is " + k + ", value is" + jsondata[k]);

                        tableName = k;

                        if (oldTableName != tableName) {
                            oldTableName = tableName;
                         console.log('*** >>> Table : ' + tableName + ' <<< ***');
                        //    console.log('*** Updateing table : ' + tableName);
                          //  posts.push( {tableName: tableName});
                        }


                             newObject = jsondata[k];
                             for (var kk in newObject){
  /*
                               $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS '+tableName+' (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)')
                               .then(function(res){
                               alert( JSON.stringify(res) );
                               },
                               function(err){
                               alert("Error");
                               alert( JSON.stringify(err));
                               })
  */

  var fieldName = [];
  var fieldValue = [];
  var posts = {};
  var post = [];

                                 if (typeof newObject[kk] !== 'function') {
                                    //  console.log("Key is " + kk + ", value is" + newObject[kk]);

                                      fieldObject = newObject[kk];
                                      for (var kkk in fieldObject){
                                          if (typeof fieldObject[kkk] !== 'function') {
                                            //   console.log("Key is " + kkk + ", value is" + fieldObject[kkk]);

  fieldName.push(kkk);
  fieldValue.push( fieldObject[kkk]);

                                          }
                                      }
  fieldnameSet = '';
  fieldNames = '';
  for (var n in fieldName){
    fieldNames = fieldNames + '"'+fieldName[n] +'", ';

fieldnameSet = fieldnameSet + '"'+fieldName[n] +'"="?", ';

  }
  fieldNames = fieldNames.substr(0, fieldNames.length -2);

  fieldnameSet = fieldnameSet.substr(0, fieldnameSet.length -2);

  fieldValues = '';
  for (var v in fieldName){

   myvalue = fieldValue[v];
   // myvalue = escape(myvalue);
   // myvalue = myvalue.substring(1, myvalue.length-1);


    fieldValues = fieldValues + '"'+ myvalue +'",';
  }
  fieldValues = fieldValues.substr(0, fieldValues.length-1);

  var post_item = [{"tableName": tableName}];
  post.push( post_item );

  var post_item = [{"fieldNames": fieldName}];
  post.push( post_item );

  var post_item = [{"fieldValues": fieldValue}];
  post.push( post_item );

  //posts.post.push( post );
  //alert( JSON.stringify(posts) );


  var markers = repeat('?', fieldValue.length, ", ");
  // console.log(markers);



  var sqlStatementStart = 'INSERT OR IGNORE INTO `' + tableName + '` ';
  // var sqlStatement =  sqlStatementStart + '('+ fieldNames + ') VALUES (' + fieldValues +');';
  var sqlStatement =  sqlStatementStart + '('+ fieldNames + ') VALUES (' + markers +');';
  // console.log('::::::::' + sqlStatement);
  var post_item = [{"sqlStatement": sqlStatement}];
  post.push( post_item );


if (tableName == 'slideshow_images') {
  var markers = repeat('?', fieldValue.length + 1, ", ");

fieldNames = fieldNames + ', "blob"';

//fieldName.push('blob');
//fieldValue.push('BLOB');

  var sqlStatementStart2 = 'UPDATE `' + tableName + '` ';
  // var sqlStatement =  sqlStatementStart + '('+ fieldNames + ') VALUES (' + fieldValues +');';

  var sqlStatement2 =  sqlStatementStart2 + ' SET '+ fieldnameSet;

  //var sqlStatement2 =  sqlStatementStart2 + '('+ fieldNames + ') VALUES (' + markers +') ';

  // console.log('::::::::' + sqlStatement);
  var post_item = [{"sqlStatementUpdate": sqlStatement2}];
  post.push( post_item );
};



  checkIfRecordExists(post)
      .then(function(data) {
            //   console.log('return :');
          //     console.log( JSON.stringify(data));


              writeSqlRecord(data)
                    .then(function(ress) {
                        console.log('finished writeSqlRecord');


                        console.log( ress );


                                                        var tableName =ress[1][1][0][0].tableName;


var itemFieldnames = ress[1][1][1][0].fieldNames;
var itemFieldvalues = ress[1][1][2][0].fieldValues;





                          var myURL = '';
                          var myFileName = '';

                          for (var i = 0; i < itemFieldnames.length; i++) {
                            itemFieldname = itemFieldnames[i];

                            switch(itemFieldname) {
                                  case 'thumb_url':
                                      myURL = itemFieldvalues[i];

                                      break;
                                  case 'image_url':
                                      myURL = itemFieldvalues[i];
                                      break;

                                case 'thumb_md5':
                                    myFileName = itemFieldvalues[i];

                                    break;
                                case 'image_md5':
                                    myFileName = itemFieldvalues[i];
                                    break;
                                }

                          };





                                console.log('tablename: '+ tableName);
                                console.log('myFileName: '+ myFileName);
                                console.log('myURL: '+ myURL);
                                console.log(itemFieldvalues);


                                 if (tableName == 'slideshow_images') {
                                   var sqlStatementUpdate = ress[1][1][4][0].sqlStatementUpdate;
                                   var myFileName = itemFieldvalues[3];
                                   var myURL = itemFieldvalues[1];


                              // console.log(myURL,myFileName, tableName  ,  sqlStatementUpdate , fieldValuesArray);


                                   downloadURL(myURL,myFileName, tableName  ,  sqlStatementUpdate , itemFieldvalues);
                                   console.log('ja ja');
                                //    console.log(myURL,myFileName, tableName  ,  sqlStatementUpdate , fieldValues);

                                //   alert('test if record in db ' + sqlStatementUpdate);


                              } else {
console.log('just download the freaking image!');


if(myURL != 'undefined') {
                            downloadURL(myURL,myFileName, tableName  ,  sqlStatementUpdate , itemFieldvalues);
}
                              }

                                 return ress;
              });




      return data;
      })
      .then(function(data) {
        var posts = {};
        var post = [];

console.log('******** promiseListUpdateDB *******************');
console.log('');
console.log('');
console.log('');
 console.log( JSON.stringify(data) );


//        console.log(promiseListUpdateDB);
//console.log('2 Number { ' + RecordCounter);
    //  console.log('Last in then:');
        //  console.log(dbData);
  //      console.log( data );

  // console.log( data[1][0][0].tableName + ' - ' + $scope.EntryPageVisible );

  if ( ( data[1][0][0].tableName == 'slideshow_images') && ($scope.EntryPageVisible == false) ) {

  $scope.EntryPageVisible = true;

  // navigator.app.loadUrl("file:///android_asset/www/index.html?j");

  /*
  $state.go("entry");
        $ionicHistory.clearHistory();


        setTimeout(function (){

            $scope.EntryPageVisible = true;

               $window.location.reload(true);
        }, 2100);
  */
  // $state.go($state.current, {}, {reload: true});

  //     var current = $state.current;
  //     var params = angular.copy($stateParams);
  //     $state.transitionTo(current, params, { reload: true, inherit: true, notify: true });

  }

    //    console.log('-*-*-*-*-*-*-*-*-*-*-*-*-*-');
        //  return getNonExistingIds(ids, dbData);
      });


          var posts = {};
          var post = [];


}
}
}
}


            }, function (error) {
                console.log('Errorrer w');
                console.log(error);
            }, function (progress) {
                // PROGRESS HANDLING GOES HERE
            });


          }, function (error) {
              console.log('Errorrer q');
              console.log(error);
          }, function (progress) {
              // PROGRESS HANDLING GOES HERE
          });


/*
      $q.all([





      $http.get('json/jsonFormatter.json')
              .success(function(results) {

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
*/


/*

*/
        },


    updateJSON : function ($scope, $stateParams,$cordovaFile,$cordovaFileTransfer) {

      var deferred = $q.defer();
      var promiseList = [];
      //  $('#ionHideTabs').attr('ng-show',true);
      db = $cordovaSQLite.openDB("mammarosa.db");


/*
  if (window.sqlitePlugin) {
         window.plugins.sqlDB.copy("mammarosa.db", function () {
           console.log("correct")
         }, function (e) {
           console.log("error: "+ e)
         });
       };

*/
    /*
                  window.plugins.sqlDB.copy("mammarosa.db", function() {
                      db = $cordovaSQLite.openDB("mammarosa.db");

      console.log('***  **** ');
      console.log('*  * *   * ');
      console.log('*  * **** ');
      console.log('*  * *   * ');
      console.log('***  **** ');



                  }, function(error) {
                      console.error("There was an error copying the database: " + error);
                      db = $cordovaSQLite.openDB("mammarosa.db");
                  });
    */



    // db = window.sqlitePlugin.openDatabase({name: "mammarosa.db", createFromLocation: 1, createFromResource: "1"});

     // db = window.sqlitePlugin.openDatabase({name: "mammarosa.db", createFromLocation: 1});

/*
    $cordovaSQLite.execute(db, 'CREATE TABLE  IF NOT EXISTS `locales` (`1`, `iso`, `2`, `thumb_url`, `thumb_md5`,	`name`,`source_name`);')
    .then(function(res){
    alert( JSON.stringify(res) );
    },
    function(err){
    alert("Error");
    alert( JSON.stringify(err));
    })
*/

/*
    $cordovaSQLite.execute(db, 'SELECT * FROM locales')
    .then(function(res){
  //  alert( JSON.stringify(res) );
    },
    function(err){
    alert("Error");
    alert( JSON.stringify(err));
    })


    $cordovaSQLite.execute(db, "SELECT * FROM locales")
    .then(function(res){
    for(var i = 0; i < res.rows.length; i++){
    //alert( JSON.stringify(res.rows.item(i)) );
    }
    },
    function(err){
    console.log("Error" + JSON.stringify(err));
    })

*/

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


function cdownloadURL(DownloadUrl,DownloadFilename) {


var questionmark = DownloadUrl.indexOf('?');

//if (questionmark>0) {
//DownloadUrl = DownloadUrl.substring(0,questionmark );
//}

             console.log(DownloadUrl);
             //    var DownloadFilename = DownloadUrl.substring(DownloadUrl.lastIndexOf('/')+1);
             DownloadFilename = DownloadFilename + '.png';
                    var obj = DownloadUrl;
             console.log('New download file : ' + DownloadFilename);
             // var url = DownloadUrl;
             var targetPath = fileTransferDir  + "cache/" + DownloadFilename;
             var trustHosts = true;
             var options = {};

             var name = targetPath.substr(targetPath.lastIndexOf('/') + 1);
             var resultCheckFile;

               console.log('Checking DownloadUrl: ' + DownloadUrl + ' = ');
               console.log('Checking DownloadFilename: ' + DownloadFilename + ' = ');

               FileService.checkFile($scope, $cordovaFile, obj, fileTransferDir  + "cache/" , DownloadFilename)
               .then(
                         function (result) {
                              // promise was fullfilled (regardless of outcome)
                              // checks for information will be peformed here
// console.log('promise was fullfilled (regardless of outcome');
// console.log( JSON.stringify(result) );

                          },
                          function (error) {
                              // handle errors here
console.log('download this file:');
// console.log( error );


                              var trustHosts = true;
                              var options = {};

                               $cordovaFileTransfer.download(error[0].obj,  error[0].dir + error[0].file, options, trustHosts)
                                 .then(function(result) {
                                   // Success!
                                   console.log(result);
                                   console.log('----{ Downloaded image! { ' + error[0].file);
                                 }, function(error) {
                                   // Error

console.log('----{ Downloaded image ERROR! { ');
                                   console.log( JSON.stringify(error) );
                                  var data_error = error.body;
console.log(data_error);
                                  $cordovaFile.writeFile(error.target, data_error, '').then( function(result) {

console.log('WRITE TO FILE *******');
console.log(result);
}, function(error) {
  // Error

  console.log('----{ Downloaded image 2 ERROR! { ');
     console.log( JSON.stringify(error) );
                                  });



                                 }, function (progress) {
                                   $timeout(function () {
                                    // downloadProgress = (progress.loaded / progress.total) * 100;
                                  //   console.log($scope.downloadProgress);
                                 });
                                 });
                              }
                 );  // end then
}



// CHECK IF RECORD EXISTS


      // File for download
            var url = "http://mammarosa.modusoft.nl/nl/api/";

            // File name only
            var filename = 'jsondata.json';

            // Save location
            var targetPath = fileTransferDir + filename;

            $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
                console.log('Success download jsn data');
          //    console.log(result)
if (result.isFile === true) {
//  alert('true');
}


var oldTableName;
var posts = {};
var post = [];


var myurl = cordova.file.applicationDirectory;

// Read text written in file
$cordovaFile.readAsText(fileTransferDir,'jsondata.json').then( function(data) {
//console.log('readAsText: ', data);

      console.log('Success 2');
      //console.log(data);
        //          db = window.sqlitePlugin.openDatabase({name: "mammarosa.db"});
                console.log('**** update this one reloadDataCtrl RELOAD! : JSON loaded from URL');
var jsondata = JSON.parse(data);
                  console.log('***** JSON Data *****');
                //console.log(jsondata);
        //          window.localStorage.setItem("profile", JSON.stringify(jsondata));
/*
                  Object.keys(jsondata).forEach(function (key) {
                     // do something with obj[key]
                     console.log(key + ' - ' + jsondata[key]);


                     Object.keys(key).forEach(function (keychild) {
                        // do something with obj[key]
                    console.log(keychild + ' - ' + key[keychild]);
                     });

                  });
*/
                  for (var k in jsondata){

var tableName = '';

                      if (typeof jsondata[k] !== 'function') {
              //             alert("Key is " + k + ", value is" + jsondata[k]);

tableName = k;

if (oldTableName != tableName) {
    oldTableName = tableName;
 console.log('*** >>> Table : ' + tableName + ' <<< ***');
//    console.log('*** Updateing table : ' + tableName);
  //  posts.push( {tableName: tableName});
}


                           newObject = jsondata[k];
                           for (var kk in newObject){
/*
                             $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS '+tableName+' (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)')
                             .then(function(res){
                             alert( JSON.stringify(res) );
                             },
                             function(err){
                             alert("Error");
                             alert( JSON.stringify(err));
                             })
*/

var fieldName = [];
var fieldValue = [];
var posts = {};
var post = [];

                               if (typeof newObject[kk] !== 'function') {
                                  //  console.log("Key is " + kk + ", value is" + newObject[kk]);

                                    fieldObject = newObject[kk];
                                    for (var kkk in fieldObject){
                                        if (typeof fieldObject[kkk] !== 'function') {
                                          //   console.log("Key is " + kkk + ", value is" + fieldObject[kkk]);

fieldName.push(kkk);
fieldValue.push( fieldObject[kkk]);

                                        }
                                    }

fieldNames = '';
for (var n in fieldName){
  fieldNames = fieldNames + '`'+fieldName[n] +'`, ';
}
fieldNames = fieldNames.substr(0, fieldNames.length -2);

fieldValues = '';
for (var v in fieldName){

 myvalue = fieldValue[v];
 // myvalue = JSON.stringify(String(myvalue));
 // myvalue = myvalue.substring(1, myvalue.length-1);


  fieldValues = fieldValues + '"'+ myvalue +'",';
}
fieldValues = fieldValues.substr(0, fieldValues.length-1);

var post_item = [{"tableName": tableName}];
post.push( post_item );

var post_item = [{"fieldNames": fieldName}];
post.push( post_item );

var post_item = [{"fieldValues": fieldValue}];
post.push( post_item );

//posts.post.push( post );
//alert( JSON.stringify(posts) );


var markers = repeat('?', fieldValue.length, ", ");
// console.log(markers);


var sqlStatementStart = 'INSERT OR IGNORE INTO `' + tableName + '` ';
// var sqlStatement =  sqlStatementStart + '('+ fieldNames + ') VALUES (' + fieldValues +');';

var sqlStatement =  sqlStatementStart + '('+ fieldNames + ') VALUES (' + markers +');';
// console.log('::::::::' + sqlStatement);

var post_item = [{"sqlStatement": sqlStatement}];
post.push( post_item );

/*
db.transaction(function(tx) {
        tx.executeSql(sqlStatement, []);
    });
*/
 // console.log('****** End field *****');


// var sqlStatement =  sqlStatementStart + '('+ fieldNames + ') VALUES (' + fieldValues +');';

//if (tableName === 'item_translations') {

// console.log( JSON.stringify(post) );
checkIfRecordExists(post)
    .then(function(data) {
   console.log('return :');
   console.log( JSON.stringify(data));


var json_data = JSON.stringify(data);
var t = JSON.parse(json_data);

//console.log('****** T ******');
//console.log(t);





        var sqlStatement =  t[1][3][0].sqlStatement;
        var itemFieldnames = t[1][1][0].fieldNames;
        var itemFieldvalues = t[1][2][0].fieldValues;


        // console.log(sqlStatement);

        // console.log('------ NEW --{ ' + t[1][3][0].sqlStatement);

  //    console.log("return " + JSON.stringify(itemFieldvalues) );

              var myURL = '';
              var myFileName = '';

              for (var i = 0; i < itemFieldnames.length; i++) {
                itemFieldname = itemFieldnames[i];

                switch(itemFieldname) {
                      case 'thumb_url':
                          myURL = itemFieldvalues[i];

                          break;
                      case 'image_url':
                          myURL = itemFieldvalues[i];
                          break;

                    case 'thumb_md5':
                        myFileName = itemFieldvalues[i];

                        break;
                    case 'image_md5':
                        myFileName = itemFieldvalues[i];
                        break;
                    }

              };


// alert(itemFieldname + ' - ' + itemFieldvalues[i] + ' - ' + myFileName + ' - ' + myFileName.length);

                       if (myFileName.length > 0 ) {


                         console.log('myURL: '+ myURL);
                          downloadURL(myURL,myFileName,data[1][0][0].tableName);
                        }


if(t[0].rows.length == 0) {

      promiseList[kk] = $cordovaSQLite.execute(db, sqlStatement, itemFieldvalues)
         .then(function(res){
         console.log("Inserted " + JSON.stringify(res) );
         },
         function(err){
           console.log("Error Insert" + JSON.stringify(err) + ' || ' + sqlStatement );
         });
};


        return data;
    })
    .then(function(data) {
      var posts = {};
      var post = [];



  //  console.log('Last in then:');
      //  console.log(dbData);
//      console.log( data );

console.log( data[1][0][0].tableName + ' - ' + $scope.EntryPageVisible );

if ( ( data[1][0][0].tableName == 'slideshow_images') && ($scope.EntryPageVisible == false) ) {

$scope.EntryPageVisible = true;

// navigator.app.loadUrl("file:///android_asset/www/index.html?j");

/*
$state.go("entry");
      $ionicHistory.clearHistory();


      setTimeout(function (){

          $scope.EntryPageVisible = true;

             $window.location.reload(true);
      }, 2100);
*/
// $state.go($state.current, {}, {reload: true});

//     var current = $state.current;
//     var params = angular.copy($stateParams);
//     $state.transitionTo(current, params, { reload: true, inherit: true, notify: true });

}

  //    console.log('-*-*-*-*-*-*-*-*-*-*-*-*-*-');
      //  return getNonExistingIds(ids, dbData);
    });

    var posts = {};
    var post = [];
/*
var select_query = "SELECT * FROM "+ tableName +" WHERE "+ fieldName[0] + "='"+fieldValue[0]+"' AND " + fieldName[2] + "='"+fieldValue[2]+"'";

// console.log(select_query);

   $cordovaSQLite.execute(db, select_query, []).then(function(ress) {

      return $q(function(resolve, reject) {
          if(ress.rows.length > 0) {
              console.log(" already existed in the database!");
              reject(ress);
              } else {
                  console.log(" does not exist in the database!");
                resolve(ress);
              }
        });

     })
     .then(function(ress) {



     });
*/
//}


                               }
                           }



                      }
                  }







/*
                  var locales = jsondata.locales;
                  for (var i = 0; i < locales.length; i++) {

                          var DownloadUrl = locales[i].thumb_url;

                        //  console.log(DownloadUrl);
                      //    var DownloadFilename = DownloadUrl.substring(DownloadUrl.lastIndexOf('/')+1);
                          var DownloadFilename = locales[i].thumb_md5 + '.png';
                        //  console.log('download DownloadUrl : ' + DownloadUrl);
                        //  console.log('download file : ' + DownloadFilename);
                          var url = DownloadUrl;
                          var targetPath = fileTransferDir + "cache/" + DownloadFilename;
                          var trustHosts = true;
                          var options = {};

                          var name = targetPath.substr(targetPath.lastIndexOf('/') + 1);
                          var resultCheckFile;

                            // console.log('Checking : ' + DownloadFilename + '=');

                            FileService.checkFile($scope, $cordovaFile, DownloadUrl, fileTransferDir  + "cache/" , DownloadFilename)
                            .then(
                                      function (result) {
                                           // promise was fullfilled (regardless of outcome)
                                           // checks for information will be peformed here
                                           console.log(result);
                                       },
                                       function (error) {
                                           // handle errors here
                                           console.log('***********error locales');
                console.log(error);
                                            $cordovaFileTransfer.download(error[0].obj,  error[0].dir + error[0].file, options, trustHosts)
                                              .then(function(result) {
                                                // Success!
                                                // console.log(result);
                                                console.log('----{ Downloaded image!' + error[0].file);
                                              }, function(error) {
                                                // Error
                                                  console.log(error);
                                              }, function (progress) {
                                                $timeout(function () {
                                                  downloadProgress = (progress.loaded / progress.total) * 100;
                                                   console.log($scope.downloadProgress);
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
                            var targetPath = fileTransferDir  + "cache/" + DownloadFilename;
                            var trustHosts = true;
                            var options = {};

                            var name = targetPath.substr(targetPath.lastIndexOf('/') + 1);
                            var resultCheckFile;

                              // console.log('Checking : ' + DownloadFilename + '=');

                              FileService.checkFile($scope, $cordovaFile, DownloadUrl, fileTransferDir  + "cache/" , DownloadFilename)
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
                                                  console.log('----{ Downloaded slideshow image!' + error[0].file);
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
                              var targetPath = fileTransferDir  + "cache/" + DownloadFilename;
                              var trustHosts = true;
                              var options = {};

                              var name = targetPath.substr(targetPath.lastIndexOf('/') + 1);
                              var resultCheckFile;

                                // console.log('Checking : ' + DownloadFilename + '=');

                                FileService.checkFile($scope, $cordovaFile, DownloadUrl, fileTransferDir + "cache/" , DownloadFilename)
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
                                                    console.log('----{ Downloaded video image!' + error[0].file);
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
*/

                  //      deferred.resolve(data);



                });




            }, function (error) {
                console.log('Errorrer');
                console.log(error);
            }, function (progress) {
                // PROGRESS HANDLING GOES HERE
            });





/*
      $q.all([





      $http.get('json/jsonFormatter.json')
              .success(function(results) {

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
*/




              var resolve = [{"result":true}];
              alert('resolving?');
              $ionicLoading.hide();
              deferred.resolve(resolve);
           return deferred.promise;

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
