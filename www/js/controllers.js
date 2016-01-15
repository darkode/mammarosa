

angular.module('starter.controllers', ['ngCordova', 'ngCordova.plugins.file'] )
.controller('DashCtrl', function($scope) {





})


.controller('GalleryCtrl', function($scope, $http, $cordovaFile) {

  $scope.appCacheDirectory = cordova.file.externalDataDirectory + 'cache/';

  console.log('localStorage set, loading category_items');
  $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));


 $scope.slideshow_images = $scope.jsondata.slideshow_images;
  console.log( $scope.slideshow_images)

})




.controller('ChatsCtrl', function($scope) {

  console.log('localStorage set, loading category_items');
  $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));




 $scope.chats = $scope.jsondata.category_items;

  console.log( $scope.chats);

})





// SELECT * FROM `categories` AS a RIGHT JOIN `video_items` as b ON a.id=b.category_id where category_id='1'


.controller('MainCategoryCtrl', ['$scope', '$http', 'appUpdateService', '$cordovaFile', '$cordovaFileTransfer', function($scope, $http, appUpdateService, $cordovaFile, $cordovaFileTransfer) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
//  appUpdateService.updateJSON($scope, $cordovaFile,$cordovaFileTransfer);
  window.localStorage['config_language'] = '2';
  console.log('MainCategoryCtrl set');
  // $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));


              console.log('MainCategoryCtrl localStorage set, loading category_items');
              $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));
              console.log( $scope.jsondata);
              $scope.main_category_items = $scope.jsondata.main_category_items;
              //  $scope.main_category_items = main_category_items;
              console.log('loading main_category_items');
                console.log( $scope.main_category_items );
                // $ionicTabsDelegate.select(0);


// $scope.reloadJsonData();
/*
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


  for (var i = 0; i <   main_category_items.length; i++) {

  if(typeof main_category_items[i].asset !== 'undefined') {
  // alert('lees' + main_category_items[i].asset);
  }
}
*/
var main_category_items  = $scope.main_category_items;
return main_category_items;

}
])

.controller('CategoryCtrl', function($scope, $stateParams,$sce, $cordovaFile) {

 // Page 1

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
//alert('yes:' + $stateParams.catid);
//alert(cordova.file.applicationDirectory);

// page 2 subcategories
var data = getObjects($scope.main_category_items,'id',$stateParams.catid);

// alert('CategoryCtrl');


console.log('Data yes :' );
console.log(data );

$scope.htmltext = 'undefined';



// alert(data[0].asset);

if(typeof data[0].asset !== 'undefined') {
//alert('lees' + data[0].asset);


$cordovaFile.readAsText(cordova.file.applicationDirectory + 'www/assets/', data[0].asset)
.then( function(result) {
  console.log('readAsText: ', result);

$scope.htmltext = result;

//  return result;

}, function(error){
  alert("didn\'t read file: " + error.code);
});


}


var itemsubjects = [];
var categoryitems = [];

  console.log('CategoryCtrl localStorage set, loading category_items');
  $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));
  console.log( $scope.jsondata);
  $scope.categoryitems = $scope.jsondata.category_items;

  $scope.item_translations = $scope.jsondata.item_translations;
console.log('***--***');
  console.log( $scope.categoryitems);
console.log($scope.item_translations);

console.log('parseInt($stateParams.catid) : ' + parseInt($stateParams.catid))


  for (var i = 0; i <   $scope.categoryitems.length; i++) {
    if (  $scope.categoryitems[i].parent_id === parseInt($stateParams.catid)) {

      var language_data = getObjects($scope.item_translations,'source_id',$scope.categoryitems[i].id);
      var jsonconfig_language = window.localStorage['config_language'] || '2';
      var item_translations = getObjects(language_data,'locale_id',jsonconfig_language);

  console.log('Category Items: ' + i + ' = ' + jsonconfig_language + ' == ' + $scope.categoryitems[i].parent_id);
console.log(item_translations.length);



if (item_translations.length > 0) {

if(item_translations[0].hasOwnProperty('translation')){
    console.log (item_translations[0].translation);
   $scope.categoryitems[i].title = item_translations[0].translation;
}
}

//  var youtubeid= $scope.category_items[i].youtube_id;

//  $scope.videoURL = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + $scope.clips[i].youtube_id +"?autoplay=1&modestbranding=Mammarosa");

//  $scope.clips[i].youtube_id = $scope.videoURL;
  itemsubjects.push( $scope.categoryitems[i] );
    }
  }

  $scope.itemsubjects = itemsubjects;

  console.log('itemsubjects : ' + itemsubjects);

  return itemsubjects;


  //  $scope.chat = Chats.get($stateParams.chatId);
  })





.controller('LanguagesCtrl', function($scope, $http, $cordovaFile, $state, $ionicTabsDelegate) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.appCacheDirectory = cordova.file.externalDataDirectory + 'cache/';

// $scope.jsonconfig = JSON.parse(window.localStorage.getItem("config_language"));

var jsonconfig_language = window.localStorage['config_language'] || '2';

  console.log('localStorage config loading languages.');
console.log($scope.jsonconfig);


  console.log('localStorage set, loading languages.');
  $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));

  $scope.languages = $scope.jsondata.locales;
  console.log($scope.languages)

  $scope.data = {
    clientSide: '1',
    serverSide: jsonconfig_language
  };

  $scope.serverSideChange = function(language) {
    console.log("Selected Serverside, text:", language.id, "value:", language.name);
    window.localStorage['config_language'] = language.id;
    // $state.go('tab.chat-detail');
    $ionicTabsDelegate.select(0);
  };


// SaveMyData('testtttttt');

//   $scope.chats = Chats.all();
//  $scope.remove = function(chat) {
//    Chats.remove(chat);
//  };



})


.controller('HomeCtrl',
		["$sce","$scope", function ($sce, $scope) {

/*
      var controller = this;
			controller.API = null;

			controller.onPlayerReady = function(API) {
				controller.API = API;
			};
*/

var movieclip = $scope.videoURL;

 // alert( 'url : ' + $scope.youtubeID);

 $scope.stretchModes = [
     {label: "None", value: "none"},
     {label: "Fit", value: "fit"},
     {label: "Fill", value: "fill"}
 ];

			this.config = {
        preload: "none",
        autoHide: false,
        autoHideTime: 3000,
        autoPlay: true,
				sources: [
					{src: movieclip}
				],
				theme: {
					url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
				},
        plugins: {
								poster: $scope.videoPoster,
                controls: {
      						autoHide: true,
      						autoHideTime: 5000
      					}
							},
							responsive: true,

			};
// 							stretch: $scope.stretchModes[2],
console.log(this.config);

    }])


.controller('ClipsDetailCtrl',  function($q, $scope, $stateParams, $sce, FileService, $cordovaFile, $ionicPlatform) {

  window.addEventListener("orientationchange", orientationChange, true);

  function orientationChange(e) {
      var orientation="portrait";
      $('.portrait-mode').show();
      $('#ionHideTabs').attr('ng-show',false);
    var tabs = document.querySelectorAll('div.tabs');

  console.log('TABS: ');
  console.log(angular.element(tabs[0]) );
  console.log( tabs[0] );

    //  angular.element(tabs[0]).css('display', '');




    if(window.orientation == -90 || window.orientation == 90) {
      // $('.portrait-mode').hide();

  //    document.querySelector('div.tabs').style.display = 'none';
  //    angular.element(document.querySelector('ion-content.has-tabs')).css('bottom', 0);


      orientation = "landscape";


      if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      ) {
      alert('Already fullscreen');
      } else {


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



    }




    } else {


      // exit full-screen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }

    }

      console.log('Orientation: ' + orientation);




  }




  $scope.appCacheDirectory = cordova.file.externalDataDirectory + 'cache/';

    console.log('******* CLIP videoclipidID :'+$stateParams.videoclipid);

  console.log($scope.videoclips);

  var videoclips = [];

// alert('hoppa clipss :'+ $stateParams.videoclipid);

$scope.currentVideoId = $stateParams.videoclipid;

$scope.showPopup($stateParams.videoclipid);




  $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));
  $scope.clips = $scope.jsondata.videos;




  $scope.video_translations = $scope.jsondata.video_translations;

console.log($scope.clips);
console.log('trANSLATIONS JSON');
console.log($scope.video_translations);


  for (var i = 0; i <   $scope.clips.length; i++) {
    if (  $scope.clips[i].id === parseInt($stateParams.videoclipid)) {

      var video_data = getObjects($scope.video_translations,'source_id',$scope.clips[i].id);

console.log('Video data:' + $scope.clips[i].id );
console.log(video_data);

      var jsonconfig_language = window.localStorage['config_language'] || '2';
      console.log('LANGUAGE CHOSEN: ' + jsonconfig_language);


      var video_translations = getObjects(video_data,'locale_id',jsonconfig_language);

      console.log('video_translations data:');
      console.log(video_translations);

  console.log('Category Items: ' + i + ' = ' + jsonconfig_language + ' == ' + $scope.clips[i].id);
console.log(video_translations.length);


if (video_translations.length > 0) {




if(video_translations[0].hasOwnProperty('youtube_id')){
    console.log (video_translations[0].youtube_id);
   $scope.clips[i].youtube_id = video_translations[0].youtube_id;
      $scope.clips[i].url_low_res = video_translations[0].url_low_res;






}
}



 console.log($scope.clips[i]);

$scope.youtubeid = $scope.clips[i].youtube_id;
// var youtubeid= $scope.clips[i].url_low_res;
$scope.videotitle  =  $scope.clips[i].title;

 $scope.videoURL = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + $scope.clips[i].youtube_id +"?autoplay=1&modestbranding=Mammarosa");

$scope.videoURL = $sce.trustAsResourceUrl('https://www.youtube.com/watch?v=' + $scope.clips[i].youtube_id);

$scope.youtubeID = $scope.clips[i].youtube_id;
$scope.videoPoster = $scope.clips[i].thumb_url;



var obj = $scope.clips[i];

console.log('****** ->>> Download url: ' + obj);
// var DownloadFilename = DownloadUrl.substring(DownloadUrl.lastIndexOf('/')+1);
var DownloadFilename = $scope.youtubeid + '.mp4';
console.log('download file : ');
console.log( DownloadFilename);
var url = obj;
var trustHosts = true;
var options = {};
var resultCheckFile;

$scope.videoplayerURL = '';




var allPromise = $q.all([
  FileService.checkFile($scope, $cordovaFile, i, cordova.file.externalDataDirectory , DownloadFilename)
  .then(
            function (result) {
                 // promise was fullfilled (regardless of outcome)
                 // checks for information will be peformed here
                console.log('file check result');
                 console.log(result);
                 //$scope.clips[i].videoplayerURL = result[0].dir + result[0].file;
                 var response = [{'myresult': result[0].dir + result[0].file, 'exists': result[0].result.isFile}];

                 console.log(response);
              return response;


             },
             function (error) {
                 // handle errors here
            }
          )
                      ]).then(function doDownloadCall(success) {
                        console.log('doDownloadCall :' + success.length );
                        console.log(success);

                        if (success[0][0].exists === true ) {
                            $scope.videoplayerURL = success[0][0].myresult;
                            var response = [{'videoplayerURL': success[0][0].myresult}];
                        } else {
                            var response = [{'videoplayerURL': ''}];
                        }

                         return response;


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


if ($scope.videoplayerURL === '' ) {
   $scope.videoplayerURL  = $scope.clips[i].url_low_res;
}
console.log($scope.config);
$scope.clips[i].youtube_id = $scope.videoURL;
// $scope.clips[i].youtube_id = $scope.clips[i].url_low_res;

  videoclips.push( $scope.clips[i] );
    }
  }


// alert(videoclips[0].youtube_id);

// var myVideo = document.getElementsByTagName('myvideo')[0];
// myVideo.src = videoclips.youtube_id;
// angular.element(document.getElementById('myvideo')).attr('src', videoclips[0].youtube_id);




  // console.log('Checking : ' + DownloadFilename + '=');






$scope.videoclips = videoclips;
console.log('******* videoclips *******');
console.log('scope.videoURL : ' + $scope.videoplayerURL);
console.log(videoclips);
return videoclips;

//  $scope.chat = Chats.get($stateParams.chatId);
})


.controller('ChatDetailCtrl', function($q, $scope, $state, $timeout,callServiceFunction, FileService, $cordovaFile, $stateParams) {

  // $scope.appCacheDirectory = cordova.file.externalApplicationStorageDirectory + 'cache/';
$scope.appCacheDirectory = cordova.file.externalDataDirectory + 'cache/';

// Video afspelen !!!!
var   promiseWrapper = [];

  var videos = [];
  var categoryitems = [];
//  alert('Page 2 : '+ $stateParams.catid);

  console.log($stateParams.catid);

  $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));
  $scope.chats = $scope.jsondata.video_items;
  $scope.videoclips = $scope.jsondata.videos;


  $scope.categoryitems = $scope.jsondata.category_items;
  $scope.item_translations = $scope.jsondata.item_translations;

  $scope.video_translations = $scope.jsondata.video_translations;

  console.log( $scope.categoryitems);

//   for (var i = 0; i <   $scope.categoryitems.length; i++) {
//     if (  $scope.categoryitems[i].parent_id === parseInt($stateParams.catid)) {
  console.log(  $scope.videoclips );


//  var json = '{"glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","ID":"44","str":"SGML","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}}';

var catid = parseInt($stateParams.catid);

var subcategory_data = getObjects($scope.categoryitems,'id',catid);

$scope.videotitle = subcategory_data[0].title;
console.log(subcategory_data);


  var js =   $scope.categoryitems;
  var category_data = getObjects(js,'id',parseInt($stateParams.catid));

  //example of grabbing objects that match some key and value in JSON
  console.log('getObjects category_data! : ' + JSON.stringify(category_data)  );
  //returns 1 object where a key names ID has the value SGML
  console.log('getObjects chats! : ' + JSON.stringify( getObjects($scope.chats,'category_id',parseInt($stateParams.catid)) )  );

   $scope.videos = getObjects($scope.chats,'category_id',parseInt($stateParams.catid) );

   $scope.video_translations = $scope.jsondata.video_translations;




 console.log('------>>> trANSLATIONS JSON');
 console.log($scope.video_translations);
console.log('Video data:');
console.log(video_data);

  var extra = '';

  for (var i = 0; i <    $scope.videos.length; i++) {
    var extra = getObjects($scope.videoclips,'id',parseInt( $scope.videos[i].video_id));
      console.log('ChatDetailCtrl extra : ');
      console.log( extra );

       $scope.videos[i].downloaded = false;

      var language_data = getObjects($scope.item_translations,'source_id',  $scope.videos[i].id);
      var jsonconfig_language = window.localStorage['config_language'] || '2';
      var item_translations = getObjects(language_data,'locale_id',jsonconfig_language);


console.log('source_id: ' + extra[0].id);

      var video_data = getObjects($scope.video_translations,'source_id',extra[0].id);
      var video_translations = getObjects(video_data,'locale_id',jsonconfig_language);

      console.log('video_translations data:');
      console.log(video_translations);

  console.log('Category Items: ' + i + ' = ' + jsonconfig_language + ' == ' + $scope.videoclips[i].id);
console.log(video_translations.length);
if (video_translations.length > 0) {

    if(video_translations[0].hasOwnProperty('youtube_id')){

        console.log('*** video_translations has youtube_id ***');

        console.log (video_translations[0].youtube_id);
          if (video_translations[0].youtube_id != '') {
            $scope.videos[i].youtube_id = video_translations[0].youtube_id;
        }
    }
}   else {

console.log('*** SET YOUTUBE ID FROM EXTRA');
$scope.videos[i].downloading = false;
    $scope.videos[i].youtube_id = extra[0].youtube_id;
}

window.localStorage.removeItem($scope.videos[i].youtube_id);


    console.log('Category Items: ' + i + ' = ' + jsonconfig_language + ' == ' +  $scope.videos[i].parent_id);
    console.log(item_translations.length);
    if (item_translations.length > 0) {

    if(item_translations[0].hasOwnProperty('translation')){
    console.log (item_translations[0].translation);
     $scope.videos[i].title = item_translations[0].translation;
    }
    }

    var DownloadUrl = extra[0].url_low_res;
    console.log('checkFile url: ' + DownloadUrl);
    // var DownloadFilename = DownloadUrl.substring(DownloadUrl.lastIndexOf('/')+1);
  //  var DownloadFilename = extra[0].youtube_id + '.mp4';
var DownloadFilename = $scope.videos[i].youtube_id + '.mp4';


    console.log('checkFile file : ' + DownloadFilename);
    var url = DownloadUrl;
    var targetPath = cordova.file.externalDataDirectory;


     $scope.videos[i].videoItemNr = i;
    $scope.checkThisvideo = [{'scope': $scope.videos[i] , 'arraynr':i , 'downloadurl': DownloadUrl, 'targetpath':targetPath, 'downloadfilename': DownloadFilename}];


promiseWrapper.push( $scope.checkThisvideo );





       $scope.videos[i].thumb_md5 = extra[0].thumb_md5;
      console.log('ChatDetailCtrl: ' +  JSON.stringify(videos[i]) );
      //  videos.push( $scope.chats[i] );
  } // for

/*
  for (var i = 0; i <   $scope.chats.length; i++) {
    if (  $scope.chats[i].category_id === parseInt($stateParams.catid)) {

      for (var ii = 0; ii <   $scope.videoclips.length; ii++) {

console.log('ChatDetailCtrl video: ' + ii + ' - ' + $scope.videoclips[ii]);

        if (  $scope.chats[i].video_id === $scope.videoclips[ii].id) {
              // here add to array

              $scope.chats[i].thumb_url = $scope.videoclips[ii].thumb_url;
        } // if

      } // for

      console.log('ChatDetailCtrl: ' + $scope.chats[i]);

    videos.push( $scope.chats[i] );


    } // if
  } // for

*/
  $scope.introtext = category_data[0].intro_text;


// deferred


$scope.promiseWrapper = promiseWrapper;

$scope.downloaded = [];


var allPromise = $q.all([
                        callServiceFunction.doIt($scope,$cordovaFile)
                      ]).then(function doRegistrationCall(success) {
                        console.log('doRegistrationCall :' + success[0].length );
                        console.log(success);


      for (var i = 0; i < success[0].length; i++) {

console.log( i + " - " + success[0][i][0].downloadfilename );


var dir = cordova.file.externalDataDirectory;
var file = success[0][i][0].downloadfilename;

var trustHosts = true;
var options = {};

var resultCheckFile;

  // console.log('Checking : ' + file + '=');

  FileService.checkFile($scope, $cordovaFile, success , dir, file)
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
window.localStorage.setItem(result[0].obj.youtube_id, false);

} else {
result[0].obj.downloaded = false;
window.localStorage.setItem(result[0].obj.youtube_id, false);
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
                 console.log(error);
                 }
    );  // end then


      };



    }, function setSubmitError(error) {
          console.log('setSubmitError');
          console.log(error);
        $scope.submitError = error;
    });


allPromise.then(function(values) {
  console.log('*-*-*-*-* values :');
    console.log(values);

    videos = $scope.videos;
      console.log(videos);
      // $scope.videos = videos;

     return  $scope.videos;


    console.log('done');
});

//$timeout(function(){

  //   }, 2000);



//  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
