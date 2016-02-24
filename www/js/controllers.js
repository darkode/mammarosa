

angular.module('starter.controllers', ['ngCordova', 'ngCordova.plugins.file'] )
.controller('DashCtrl', function($scope) {
})

.controller('GalleryCtrl', function($scope, $http, $ionicPlatform, $cordovaSQLite, $cordovaFile, $ionicSlideBoxDelegate,$ionicSideMenuDelegate) {

  window.addEventListener("orientationchange", orientationChange, true);

  function orientationChange(e) {
      var orientation="portrait";
  //    $('.portrait-mode').show();
//      $('#ionHideTabs').attr('ng-show',false);
//    var tabs = document.querySelectorAll('div.tabs');

<<<<<<< HEAD
//  console.log('TABS: ');
//  console.log(angular.element(tabs[0]) );
//  console.log( tabs[0] );

    //  angular.element(tabs[0]).css('display', '');

    if(window.orientation == -90 || window.orientation == 90) {
      // $('.portrait-mode').hide();
=======
})

.controller('GalleryCtrl', function($scope, $http, $ionicPlatform, $cordovaSQLite, $cordovaFile, $ionicSlideBoxDelegate,$ionicSideMenuDelegate) {

  window.addEventListener("orientationchange", orientationChange, true);

  function orientationChange(e) {
      var orientation="portrait";
  //    $('.portrait-mode').show();
//      $('#ionHideTabs').attr('ng-show',false);
//    var tabs = document.querySelectorAll('div.tabs');

//  console.log('TABS: ');
//  console.log(angular.element(tabs[0]) );
//  console.log( tabs[0] );

    //  angular.element(tabs[0]).css('display', '');




    if(window.orientation == -90 || window.orientation == 90) {
      // $('.portrait-mode').hide();

  //    document.querySelector('div.tabs').style.display = 'none';
  //    angular.element(document.querySelector('ion-content.has-tabs')).css('bottom', 0);


// ionic.Platform.fullScreen(true, false);

      orientation = "landscape";

$scope.hideNavBar = true;

    } else {

console.log('in portait again?');

$scope.hideNavBar = false;


    }

      console.log('Orientation: ' + orientation);




}



  function b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(b64Data);
      var byteArrays = [];

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);

          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }

          var byteArray = new Uint8Array(byteNumbers);

          byteArrays.push(byteArray);
      }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
  };

  // Call this functions if you need to manually control the slides
      $scope.next = function() {
        $ionicSlideBoxDelegate.next();
      };

      $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
      };

    	$scope.goToSlide = function(index) {
        $scope.modal.show();
        $ionicSlideBoxDelegate.slide(index);
      }

      // Called each time the slide changes
      $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
      };


  $scope.slideshow_images = [];


  $scope.appCacheDirectory = fileTransferDir + 'cache/';

//   console.log('localStorage set, loading category_items');
//  $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));
// $scope.slideshow_images = $scope.jsondata.slideshow_images;


$scope.itemsVisible = true;
$scope.noItemsVisible = false;
>>>>>>> origin/master

  //    document.querySelector('div.tabs').style.display = 'none';
  //    angular.element(document.querySelector('ion-content.has-tabs')).css('bottom', 0);


<<<<<<< HEAD
// ionic.Platform.fullScreen(true, false);

      orientation = "landscape";

$scope.hideNavBar = true;

    } else {

console.log('in portait again?');

$scope.hideNavBar = false;


    }

      console.log('Orientation: ' + orientation);




}



  function b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(b64Data);
      var byteArrays = [];

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);

          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }

          var byteArray = new Uint8Array(byteNumbers);

          byteArrays.push(byteArray);
      }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
  };

  // Call this functions if you need to manually control the slides
      $scope.next = function() {
        $ionicSlideBoxDelegate.next();
      };

      $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
      };

    	$scope.goToSlide = function(index) {
        $scope.modal.show();
        $ionicSlideBoxDelegate.slide(index);
      }

      // Called each time the slide changes
      $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
      };


  $scope.slideshow_images = [];


  $scope.appCacheDirectory = fileTransferDir + 'cache/';

//   console.log('localStorage set, loading category_items');
//  $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));
// $scope.slideshow_images = $scope.jsondata.slideshow_images;


$scope.itemsVisible = true;
$scope.noItemsVisible = false;





var query = "SELECT * FROM slideshow_images";
// alert('2 :' +query);
$cordovaSQLite.execute(db, query)
.then(function(res){
    //  alert('2e : '+res.rows.length );
          if(res.rows.length >0){
        //      console.log( res );
              for(var i = 0; i < res.rows.length; i++){

var row = res.rows.item(i);


                //  console.log( row );
                //console.log( res.rows.item(i)  );
var image_md5 = res.rows.item(i).image_md5;
              //    res.rows.item(i).image_md5 = '31b47c34f9ad2fc527b638d8ef67fd86';

var data = res.rows.item(i).blob;
// console.log(data);


              var contentType = 'image/png';
              var blob = b64toBlob(data, contentType);
              var blobUrl = URL.createObjectURL(blob);


=======


var query = "SELECT * FROM slideshow_images";
// alert('2 :' +query);
$cordovaSQLite.execute(db, query)
.then(function(res){
    //  alert('2e : '+res.rows.length );
          if(res.rows.length >0){
        //      console.log( res );
              for(var i = 0; i < res.rows.length; i++){

var row = res.rows.item(i);


                //  console.log( row );
                //console.log( res.rows.item(i)  );
var image_md5 = res.rows.item(i).image_md5;
              //    res.rows.item(i).image_md5 = '31b47c34f9ad2fc527b638d8ef67fd86';

var data = res.rows.item(i).blob;
// console.log(data);


              var contentType = 'image/png';
              var blob = b64toBlob(data, contentType);
              var blobUrl = URL.createObjectURL(blob);


>>>>>>> origin/master
            //  $("#image"+image_md5).src = imageUrl;

row.blob = blobUrl;


            var       myRow = res.rows.item(i);
//  console.log( myRow );
  //                myRow[4] = imageUrl;

// console.log('My Row : ' );
  //                console.log( myRow );

                //  if (myRow.title != null) {
                //      console.log('Title : '+ myRow.title);




                      $scope.slideshow_images.push( row );
                      // Make sure to apply scope change so that ng-repeat updates
                //  }

              }
              $scope.itemsVisible = true;

            } else {
              $scope.itemsVisible = false;
              $scope.noItemsVisible = true;
            }

},
function(err){
  console.log("Error 2 " + JSON.stringify(err));
});


console.log( $scope.slideshow_images)
return $scope.slideshow_images;
})


.controller('CheckDatabasaeInit', function($scope,$timeout,$cordovaSQLite,$ionicSideMenuDelegate,$ionicPlatform,$rootScope) {
        $scope.EntryPageVisible = false;

                $ionicPlatform.ready(function($rootScope) {

                              var query = "SELECT * FROM category_items";
                              // alert('2 :' +query);
                              $cordovaSQLite.execute(db, query)
                              .then(function(res){
                              //    alert('2e : '+res.rows.length );
                                        if(res.rows.length >0){
// alert('test > 0');
                              $scope.EntryPageVisible = true;

                                          } else {
                              // nothing
                              $scope.EntryPageVisible = false;

// alert('test == 0');
/*
$timeout(function () {
$scope.EntryPageVisible = true;
            }, 3000);
*/

                                          };

                              },
                              function(err){
                                console.log("Error 2 " + JSON.stringify(err));
                              });

  return $scope.EntryPageVisible;
                });
})
<<<<<<< HEAD
=======


.controller('ChatsCtrl', function($scope,$cordovaSQLite,$ionicSideMenuDelegate) {
>>>>>>> origin/master

//  console.log('localStorage set, loading category_items');
//  $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));

.controller('ChatsCtrl', function($scope,$cordovaSQLite,$ionicSideMenuDelegate) {

<<<<<<< HEAD
//  console.log('localStorage set, loading category_items');
//  $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));


=======
>>>>>>> origin/master
alert('ChatsCtrl');

 $scope.chats = $scope.jsondata.category_items;

 var res =[];
 $scope.category_items = [];

 $cordovaSQLite.execute(db, "SELECT * FROM category_items")
 .then(function(res){

 if(res.rows.length >0){

 for(var i = 0; i < res.rows.length; i++){
 // alert( JSON.stringify(res.rows.item(i)) );
 $scope.category_items.push( res.rows.item(i) );
   }

 }
 else{
 console.log("####console######## NO results found #######"+"Table record #: ");
 }

 },
 function(err){
 console.log("Error" + JSON.stringify(err));
 })

 // var main_category_items  = $scope.main_category_items;
 // return $scope.main_category_items;





  console.log( $scope.chats);

})





// SELECT * FROM `categories` AS a RIGHT JOIN `video_items` as b ON a.id=b.category_id where category_id='1'


.controller('MainCategoryCtrl', ['$scope', '$http', '$ionicPlatform', 'appUpdateService', '$cordovaSQLite', '$cordovaFile', '$cordovaFileTransfer', '$ionicSideMenuDelegate', 'FeedbackService', function($scope, $http,   $ionicPlatform, appUpdateService, $cordovaSQLite, $cordovaFile, $cordovaFileTransfer,$ionicSideMenuDelegate,FeedbackService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
//  appUpdateService.updateJSON($scope, $cordovaFile,$cordovaFileTransfer);
//  window.localStorage['config_language'] = '2';
  console.log('MainCategoryCtrl set');
  // $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));

$scope.jsonconfig_language = 2;

  $scope.navTitle = 'Categoriën';

  $scope.leftButtons = [{
      type: 'button-icon icon ion-navicon',
      tap: function(e) {
          $scope.toggleMenu();
      }
  }];

<<<<<<< HEAD

  $ionicPlatform.ready(function() {



  $scope.insert = function(firstname, lastname) {
          var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
          $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
              console.log("INSERT ID -> " + res.insertId);
          }, function (err) {
              console.error(err);
          });
      }

      $scope.select = function(lastname) {
          var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
          $cordovaSQLite.execute(db, query, [lastname]).then(function(res) {
              if(res.rows.length > 0) {
                  console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
              } else {
                  console.log("No results found");
              }
          }, function (err) {
              console.error(err);
          });
      }


=======

  $ionicPlatform.ready(function() {



  $scope.insert = function(firstname, lastname) {
          var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
          $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
              console.log("INSERT ID -> " + res.insertId);
          }, function (err) {
              console.error(err);
          });
      }

      $scope.select = function(lastname) {
          var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
          $cordovaSQLite.execute(db, query, [lastname]).then(function(res) {
              if(res.rows.length > 0) {
                  console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
              } else {
                  console.log("No results found");
              }
          }, function (err) {
              console.error(err);
          });
      }


>>>>>>> origin/master

          //    console.log('MainCategoryCtrl localStorage set, loading category_items');
        //      $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));
          //    console.log( $scope.jsondata);
            //  $scope.main_category_items = $scope.jsondata.main_category_items;
              //  $scope.main_category_items = main_category_items;
          //    console.log('loading main_category_items');
              //  console.log( $scope.main_category_items );
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

db = $cordovaSQLite.openDB("mammarosa.db");

var res =[];
$scope.main_category_items = [];

$cordovaSQLite.execute(db, "SELECT * FROM main_category_items")
.then(function(res){

if(res.rows.length >0){

for(var i = 0; i < res.rows.length; i++){
// alert( JSON.stringify(res.rows.item(i)) );
$scope.main_category_items.push( res.rows.item(i) );
  }

}
else{
console.log("####console######## NO results found #######"+"Table record #: ");
}

},
function(err){
console.log("Error" + JSON.stringify(err));
})

// var main_category_items  = $scope.main_category_items;
// return $scope.main_category_items;
});

}
])

.controller('CategoryCtrl', function($scope,$stateParams,$cordovaSQLite, $cordovaFile, $ionicSideMenuDelegate, $ionicNavBarDelegate) {

$scope.htmltext = 'undefined';
$scope.jsonconfig_language = 2;



  var mainquery = "SELECT * FROM main_category_items WHERE id='"+ $stateParams.catid  +"';";

  $cordovaSQLite.execute(db, mainquery)
  .then(function(res){
  // alert(res.rows.length );
  if(res.rows.length >0) {
    $scope.navTitle = res.rows.item(0).title;
console.log( JSON.stringify(res) );
$ionicNavBarDelegate.title($scope.navTitle);
  }


});



  $scope.leftButtons = [{
      type: 'button-icon icon ion-navicon',
      tap: function(e) {
          $scope.toggleMenu();
      }
  }];

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
// var data = getObjects($scope.main_category_items,'id',$stateParams.catid);

var data = [];
var res =[];
$scope.category_items = [];
<<<<<<< HEAD

var jsonconfig_language = window.localStorage['config_language'] || '2';

/*

var query = "SELECT * FROM category_items AS C LEFT OUTER JOIN item_translations AS T ON C.id = T.source_id WHERE C.parent_id='"+ $stateParams.catid +"'";
*/

/*
var query = "SELECT * FROM item_translations AS T INNER JOIN category_items AS C ON C.id = T.source_id WHERE C.parent_id='"+ $stateParams.catid  +"'";
*/

$scope.noItemsVisible = false;
$scope.itemsVisible = false;

// alert(query);
$scope.category_items = [];
=======

var jsonconfig_language = window.localStorage['config_language'] || '2';

/*

var query = "SELECT * FROM category_items AS C LEFT OUTER JOIN item_translations AS T ON C.id = T.source_id WHERE C.parent_id='"+ $stateParams.catid +"'";
*/

/*
var query = "SELECT * FROM item_translations AS T INNER JOIN category_items AS C ON C.id = T.source_id WHERE C.parent_id='"+ $stateParams.catid  +"'";
*/

$scope.noItemsVisible = false;
$scope.itemsVisible = false;
>>>>>>> origin/master

// alert(query);
$scope.category_items = [];


<<<<<<< HEAD
var query = "SELECT * FROM category_items AS C  LEFT OUTER JOIN item_translations AS T ON C.id = T.source_id WHERE C.parent_id='"+ $stateParams.catid  +"' AND T.locale_id='"+ jsonconfig_language+"'";

$cordovaSQLite.execute(db, query)
.then(function(res){
// alert(res.rows.length );
if(res.rows.length >0) {

        for(var i = 0; i < res.rows.length; i++){
          // alert( JSON.stringify(res.rows.item(i)) );
          $scope.category_items.push( res.rows.item(i) );
          // Make sure to apply scope change so that ng-repeat updates
        }
        $scope.itemsVisible = true;
} else {

//alert('jsonconfig_language : '+ jsonconfig_language );
if (jsonconfig_language == 2) {
          var query = "SELECT * FROM category_items WHERE parent_id='"+ $stateParams.catid + "'";
//          alert('2 :' +query);
          $cordovaSQLite.execute(db, query)
          .then(function(res){
  //              alert('2e : '+res.rows.length );
                    if(res.rows.length >0){

                        for(var i = 0; i < res.rows.length; i++){
                        // alert( JSON.stringify(res.rows.item(i)) );
                        $scope.category_items.push( res.rows.item(i) );
                        // Make sure to apply scope change so that ng-repeat updates
                                }
                        $scope.itemsVisible = true;
                } else {


                //  alert('Niks gevonden')

  $scope.itemsVisible = true;
                  var query = "SELECT * FROM main_category_items WHERE id='"+ $stateParams.catid + "'";
                  //          alert('2 :' +query);
                  $cordovaSQLite.execute(db, query)
                  .then(function(res){
                  //              alert('2e : '+res.rows.length );
                            if(res.rows.length >0){

                              for(var i = 0; i < res.rows.length; i++){
                          // alert( JSON.stringify(res.rows.item(i)) );
                             $scope.category_items.push( res.rows.item(i) );
                                // Make sure to apply scope change so that ng-repeat updates
                                        }
                        //        $scope.itemsVisible = true;




=======

var query = "SELECT * FROM category_items AS C  LEFT OUTER JOIN item_translations AS T ON C.id = T.source_id WHERE C.parent_id='"+ $stateParams.catid  +"' AND T.locale_id='"+ jsonconfig_language+"'";

$cordovaSQLite.execute(db, query)
.then(function(res){
// alert(res.rows.length );
if(res.rows.length >0) {

        for(var i = 0; i < res.rows.length; i++){
          // alert( JSON.stringify(res.rows.item(i)) );
          $scope.category_items.push( res.rows.item(i) );
          // Make sure to apply scope change so that ng-repeat updates
        }
        $scope.itemsVisible = true;
} else {

//alert('jsonconfig_language : '+ jsonconfig_language );
if (jsonconfig_language == 2) {
          var query = "SELECT * FROM category_items WHERE parent_id='"+ $stateParams.catid + "'";
//          alert('2 :' +query);
          $cordovaSQLite.execute(db, query)
          .then(function(res){
  //              alert('2e : '+res.rows.length );
                    if(res.rows.length >0){

                        for(var i = 0; i < res.rows.length; i++){
                        // alert( JSON.stringify(res.rows.item(i)) );
                        $scope.category_items.push( res.rows.item(i) );
                        // Make sure to apply scope change so that ng-repeat updates
                                }
                        $scope.itemsVisible = true;
                } else {


                //  alert('Niks gevonden')

  $scope.itemsVisible = true;
                  var query = "SELECT * FROM main_category_items WHERE id='"+ $stateParams.catid + "'";
                  //          alert('2 :' +query);
                  $cordovaSQLite.execute(db, query)
                  .then(function(res){
                  //              alert('2e : '+res.rows.length );
                            if(res.rows.length >0){

                              for(var i = 0; i < res.rows.length; i++){
                          // alert( JSON.stringify(res.rows.item(i)) );
                             $scope.category_items.push( res.rows.item(i) );
                                // Make sure to apply scope change so that ng-repeat updates
                                        }
                        //        $scope.itemsVisible = true;




>>>>>>> origin/master
                        console.log('Data yes :' );
                        console.log($scope.category_items );
                        // alert($scope.category_items[0].asset);

                        if($scope.category_items[0].asset != '') {
                        // alert('lees' + $scope.category_items[0].asset);

                        // $scope.navTitle = $scope.category_items[0].title;

                        $cordovaFile.readAsText(cordova.file.applicationDirectory + 'www/assets/', $scope.category_items[0].asset)
                        .then( function(result) {
                          console.log('readAsText: ', result);

                        $scope.htmltext = result;
                        $scope.navTitle = $scope.category_items[0].title;
 $ionicNavBarDelegate.title($scope.navTitle);
                        //  return result;

                        }, function(error){
                          alert("didn\'t read file: " + error.code);
                        });


                        }


                      } else {
                          $scope.noItemsVisible = true;
                      }
                  },
                  function(err){
                    console.log("Error 2 " + JSON.stringify(err));
                  });









                }

          },
          function(err){
            console.log("Error 2 " + JSON.stringify(err));
          });
} else{
                  $scope.noItemsVisible = true;
<<<<<<< HEAD
=======
}
          // alert( JSON.stringify(res) );
          console.log("####console######## NO results found #######"+"Table record #: ");

>>>>>>> origin/master
}
          // alert( JSON.stringify(res) );
          console.log("####console######## NO results found #######"+"Table record #: ");

}

},
function(err){
console.log("Error 1 " + JSON.stringify(err));
})




// alert('CategoryCtrl');




<<<<<<< HEAD
// $scope.htmltext = 'undefined';

=======
},
function(err){
console.log("Error 1 " + JSON.stringify(err));
})




// alert('CategoryCtrl');




// $scope.htmltext = 'undefined';

>>>>>>> origin/master

/*
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
*/
/*

// console.log('parseInt($stateParams.catid) : ' + parseInt($stateParams.catid))


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
*/

  //  $scope.chat = Chats.get($stateParams.chatId);
  })





.controller('LanguagesCtrl', function($scope, $http, FeedbackService,$cordovaFile, $cordovaSQLite, $timeout, $state, $stateParams, $ionicHistory, $ionicPlatform, $ionicTabsDelegate, $ionicNavBarDelegate, $ionicSideMenuDelegate) {

  $scope.navTitle = 'Language Page';

  $scope.toggleRight = function() {
    $ionicSideMenuDelegate.toggleRight();
  };


  $scope.leftButtons = [{
      type: 'button-icon icon ion-navicon',
      tap: function(e) {
          $scope.toggleMenu();
      }
  }];


  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

 // db = $cordovaSQLite.openDB({ name: "mammarosa.db" });

  // for opening a background db:
  //var db = $cordovaSQLite.openDB({ name: "my.db", bgType: 1 });

/*
  $scope.execute = function() {
    var query = "INSERT INTO test_table (data, data_num) VALUES (?,?)";
    $cordovaSQLite.execute(db, query, ["test", 100]).then(function(res) {
      console.log("insertId: " + res.insertId);
    }, function (err) {
      console.error(err);
    });
  };
*/


// console.log( JSON.stringify(databaseJson) );

  $scope.appCacheDirectorya = fileTransferDir + 'cache/';

// alert($scope.appCacheDirectorya);

// $scope.jsonconfig = JSON.parse(window.localStorage.getItem("config_language"));

var jsonconfig_language = window.localStorage['config_language'];

  //console.log('localStorage config loading languages.');
  //console.log($scope.jsonconfig);
  //console.log('localStorage set, loading languages.');
  //$scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));

  $scope.languages=[];
// db = $cordovaSQLite.openDB("mammarosa.db");
  $cordovaSQLite.execute(db, "SELECT * FROM locales")
  .then(function(res){

if(res.rows.length >0){



  for(var i = 0; i < res.rows.length; i++){
console.log( JSON.stringify(res.rows.item(i)) );

if (res.rows.item(i).id == jsonconfig_language) {
res.rows.item(i).selected = 'selected';
console.log("SELECTED! : " + res.rows.item(i).id );
} else {
  res.rows.item(i).selected = '';

}

   $scope.languages.push( res.rows.item(i) );


    }
console.log('scoep languages : ' , $scope.languages);
  }
 else{
 console.log("####console######## NO results found #######"+"Table record #: ");
 }

  },
  function(err){
  console.log("Error" + JSON.stringify(err));
  })

  console.log($scope.languages)

  $scope.data = {
    clientSide: '1',
    serverSide: jsonconfig_language
  };

  $scope.serverSideChange = function(language) {
    console.log("Selected Serverside, text:", language.id, "value:", language.name);
    window.localStorage['config_language'] = language.id;
    // $state.go('tab.chat-detail');

    $cordovaSQLite.execute(db, "UPDATE user_data SET lang='"+language.id+"' WHERE id='1';")
    .then(function(res){

      var select_query = "SELECT firstname, lastname, username, email,Birthyear,enableBirthyear,enableMailing,lang FROM user_data LIMIT 1;";

      $cordovaSQLite.execute(db, select_query)
      .then(function(res){
      //  alert('alternatieve : ' + res.rows.length );
           if(res.rows.length >0) {
              //for(var i = 0; i < res.rows.length; i++){
          //    alert( JSON.stringify(res.rows.item(0)) );


      $scope.settings = res.rows.item(0);

<<<<<<< HEAD
      console.log('********** SERVICE loaded values:');
=======
      console.log('SERVICE loaded values:');
>>>>>>> origin/master
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

<<<<<<< HEAD
=======

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




    });





    //  $state.go($state.current, {}, {reload: true});
      // $ionicTabsDelegate.select(0);



$ionicHistory.clearCache();
// $ionicHistory.clearHistory();
      var current = $state.current;

      /*
             var params = angular.copy($stateParams);
             $state.transitionTo(current, params, { reload: true, inherit: true, notify: true });
      */
$state.go(current, {}, { reload: true });
$scope.$on('$ionicView.enter', function(e) {
    $ionicNavBarDelegate.showBar(true);
});

      $timeout(function() {
$scope.toggleRight();

     }, 1000);




  };
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
>>>>>>> origin/master

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


      // console.log('Seaching for :' + Birthyear);
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

console.log('*** *** *** *** Settings :')
      console.log( JSON.stringify($scope.settings ) );

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




    });





    //  $state.go($state.current, {}, {reload: true});
      // $ionicTabsDelegate.select(0);



$ionicHistory.clearCache();
// $ionicHistory.clearHistory();
      var current = $state.current;

      /*
             var params = angular.copy($stateParams);
             $state.transitionTo(current, params, { reload: true, inherit: true, notify: true });
      */
$state.go(current, {}, { reload: true });
$scope.$on('$ionicView.enter', function(e) {
    $ionicNavBarDelegate.showBar(true);
});

      $timeout(function() {
$scope.toggleRight();

     }, 1000);




  };
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


.controller('ClipsDetailCtrl',  function($q, $scope, $state,  $stateParams, $sce, $timeout,  $ionicPopover, FileService,$cordovaFile, $ionicPlatform, $rootScope, $ionicSideMenuDelegate, $ionicNavBarDelegate) {
// display movie

// $scope.navTitle = 'Clip';

$scope.catid= $stateParams.catid;

// console.log('*** ClipsDetailCtrl CAT ID *** : ' + $scope.catid);



$scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
        $scope.toggleMenu();
    }
}];


window.localStorage['start_time'] = Math.round(+new Date()/1000);


//$state.go('feedbackvideo',{videoclipid:$stateParams.videoclipid,catid:$scope.catid});

$timeout(function() {
  console.log('feed '+ $stateParams.videoclipid);
//   $state.go('feedbackvideo',{videoclipid:$stateParams.videoclipid});
  }, 3000);


$timeout(function() {

  console.log('Document is ready?');
  var vid = document.getElementById("myvideo");
  vid.onended = function() {
    //  alert("The video has ended");
// $state.go('feedbackvideo',{videoclipid:$stateParams.videoclipid,catid:$scope.catid});
/*
var params = {videoclipid:$stateParams.videoclipid};
$state.transitionTo('feedbackvideo', params, { reload: true, inherit: true, notify: true });
*/

  };

//   myVideoPlayer.addEventListener('loadedmetadata', function() {
      console.log(vid.duration);
//  });


checkVideoPosition();
}, 3000);


checkVideoPosition = function() {
  var vid = document.getElementById("myvideo");
  var currentTime = Math.round(vid.currentTime);
  var totalTime = Math.round(vid.duration);

  var percentageOfPlayTimeNeeded = Math.round(totalTime / 100 * 33);

if (currentTime >= percentageOfPlayTimeNeeded) {
  $scope.showFeedBack = true;
} else {
  $scope.showFeedBack = false;
}


  console.log('currentTime :'+currentTime + ' / ' + percentageOfPlayTimeNeeded);

 setTimeout(checkVideoPosition, 1000);

  };

  $scope.$on('$ionicView.beforeLeave', function(){

        if ($scope.showFeedBack === true ) {
        $state.go('feedbackvideo',{videoclipid:$stateParams.videoclipid});
        }

  //  alert("Before Leaving "+ $scope.showFeedBack);
  });






function videoEndedPlaying(e) {
  // What you want to do after the event
  alert('video ended??');
}


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


  $scope.appCacheDirectory = fileTransferDir + 'cache/';

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

// alert(fileTransferDir);


var allPromise = $q.all([
  FileService.checkFile($scope, $cordovaFile, i, fileTransferDir , DownloadFilename)
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
var videoplayerURL = $scope.videoplayerURL;
videoplayerURL = $scope.videoplayerURL.substr(0,4);


if ( videoplayerURL === 'http' ) {
  window.localStorage['streaming'] = '1';
} else {
  window.localStorage['streaming'] = '0';
}



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



.controller('ChatDetailCtrl', function($q, $scope, $state, $timeout,callServiceFunction, FeedbackService, FileService, $cordovaSQLite, $cordovaFile, $stateParams, $ionicSideMenuDelegate, $ionicNavBarDelegate, $ionicScrollDelegate) {

console.log('ChatDetailCtrl :' + $stateParams.catid);

// $scope.navTitle = 'Clips Page';

$scope.catid= $stateParams.catid;

FeedbackService.getUser($scope,$timeout,'1').then(function(users){

$scope.settings = users.data;
<<<<<<< HEAD
console.log('USERS : ', JSON.stringify($scope.settings) );

console.log('*** CAT ID *** : ' + $scope.catid);


$scope.statusDownloads = function (item) {

  return 1;
}
=======
console.log('USERS : ', $scope.settings);


console.log('*** CAT ID *** : ' + $scope.catid);


$scope.statusDownloads = function (item) {
>>>>>>> origin/master

  return 1;
}

<<<<<<< HEAD
$scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
        $scope.toggleMenu();
    }
}];


$cordovaSQLite.execute(db, "SELECT * FROM category_items WHERE category_items.id='"+ $stateParams.catid+"'")
.then(function(res){

var result = [];
=======

$scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
        $scope.toggleMenu();
    }
}];


$cordovaSQLite.execute(db, "SELECT * FROM category_items WHERE category_items.id='"+ $stateParams.catid+"'")
.then(function(res){
>>>>>>> origin/master

var result = [];

<<<<<<< HEAD
$scope.catid = $stateParams.catid;
// alert('Page 2 : '+ $scope.catid );

  console.log($stateParams.catid);

// alert(res.rows.length);
if(res.rows.length >0){

for(var i = 0; i < res.rows.length; i++){
 console.log( JSON.stringify(res.rows.item(i)) );
result.push( res.rows.item(i) );
}

$scope.navTitle = result[0].title;
var title = result[0].title;
$ionicNavBarDelegate.title(title);

var introtext = result[0].full_text
$scope.introtext = introtext;
=======

$scope.catid = $stateParams.catid;
// alert('Page 2 : '+ $scope.catid );

  console.log($stateParams.catid);

// alert(res.rows.length);
if(res.rows.length >0){

for(var i = 0; i < res.rows.length; i++){
 console.log( JSON.stringify(res.rows.item(i)) );
result.push( res.rows.item(i) );
}

$scope.navTitle = result[0].title;
var title = result[0].title;
$ionicNavBarDelegate.title(title);
>>>>>>> origin/master

var introtext = result[0].full_text
$scope.introtext = introtext;


<<<<<<< HEAD
console.log('lengte intro text : ' +  introtext.length );
if ( introtext.length >= 10) {
  $scope.textToShow = true;
} else {
  $scope.textToShow = false;
}


console.log(title);

var toggleGroup = [];
/*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
=======

console.log('lengte intro text : ' +  introtext.length );
if ( introtext.length >= 10) {
  $scope.textToShow = true;
} else {
  $scope.textToShow = false;
}


console.log(title);
>>>>>>> origin/master

var toggleGroup = [];
/*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {

<<<<<<< HEAD
    if (toggleGroup[group] == false) {
      toggleGroup[group] = true;
    } else {
      toggleGroup[group] = false;
    }

    console.log('toggle : ' + group + '  $scope.shownGroup(group) :' + toggleGroup[group] );

if (toggleGroup[group] == false) {

$ionicScrollDelegate.scrollTop();

}

  };
  $scope.isGroupShown = function(group) {

    return toggleGroup[group];
  };


var introtext = $scope.introtext ;
var re='/href/g';
var replace_text = 'onClick="javascript:return openExternal(this)" href';
$scope.introtext = introtext.replace(/href/g, replace_text);
=======

    if (toggleGroup[group] == false) {
      toggleGroup[group] = true;
    } else {
      toggleGroup[group] = false;
    }

    console.log('toggle : ' + group + '  $scope.shownGroup(group) :' + toggleGroup[group] );

if (toggleGroup[group] == false) {

$ionicScrollDelegate.scrollTop();

}

  };
  $scope.isGroupShown = function(group) {

    return toggleGroup[group];
  };

>>>>>>> origin/master

var introtext = $scope.introtext ;
var re='/href/g';
var replace_text = 'onClick="javascript:return openExternal(this)" href';
$scope.introtext = introtext.replace(/href/g, replace_text);




console.log($scope.navTitle);

<<<<<<< HEAD
console.log('NEW intero text');
console.log( $scope.introtext );

var htmlfulltext = false;

=======
console.log($scope.navTitle);

console.log('NEW intero text');
console.log( $scope.introtext );

var htmlfulltext = false;
>>>>>>> origin/master

}
else{
console.log("####console######## NO results found #######"+"Table record #: ");

<<<<<<< HEAD
console.error('ZOEK NAAR FULL TEXT');

var htmlfulltext = true;
=======
}
else{
console.log("####console######## NO results found #######"+"Table record #: ");

console.error('ZOEK NAAR FULL TEXT');
>>>>>>> origin/master

var htmlfulltext = true;

}

<<<<<<< HEAD
},
function(err){
console.log("Error" + JSON.stringify(err));
})


var data = [];
var res =[];
$scope.videos = [];

var jsonconfig_language = users.data.locale_id;

$scope.jsonconfig_language = jsonconfig_language;

/*

var query = "SELECT * FROM category_items AS C LEFT OUTER JOIN item_translations AS T ON C.id = T.source_id WHERE C.parent_id='"+ $stateParams.catid +"'";
*/

/*
var query = "SELECT * FROM item_translations AS T INNER JOIN category_items AS C ON C.id = T.source_id WHERE C.parent_id='"+ $stateParams.catid  +"'";
*/

$scope.noItemsVisible = false;
$scope.itemsVisible = false;

// alert(query);
videos = [];

// var query = "SELECT * FROM video_items AS C  LEFT OUTER JOIN item_translations AS T ON C.id = T.source_id WHERE C.video_id='"+ $stateParams.catid  +"' AND T.locale_id='"+ jsonconfig_language+"'";

// var query = "SELECT * FROM video_items AS C  LEFT JOIN item_translations AS T ON C.id = T.source_id  AND T.locale_id='"+ jsonconfig_language+"' LEFT JOIN video_translations AS V ON C.video_id=V.source_id WHERE C.video_id='"+ $stateParams.catid  +"'  AND V.locale_id='"+ jsonconfig_language+"'";

var query= "SELECT video_items.id,video_items.category_id, video_items.nid,video_items.ordering,video_items.title,item_translations.translation, video_translations.locale_id VT_locale_id, video_items.video_id,video_translations.locale_id,video_translations.last_upload_date,video_translations.url as VT_url,video_translations.url_low_res as VT_url_low_res,video_translations.youtube_id as VT_youtube_id,video_extra_data.downloaded_date,video_extra_data.downloading,videos.thumb_md5,videos.thumb_url, videos.url,videos.url_low_res,videos.youtube_id FROM video_items LEFT JOIN videos ON video_items.video_id=videos.id LEFT JOIN video_translations ON video_items.video_id = video_translations.source_id  AND video_translations.locale_id='"+ jsonconfig_language+"' LEFT JOIN item_translations ON item_translations.source_id=video_items.id AND item_translations.locale_id='"+ jsonconfig_language+"'  LEFT JOIN video_extra_data ON video_extra_data.video_id=video_items.video_id AND video_extra_data.locale_id='"+ jsonconfig_language+"' WHERE category_id='"+ $stateParams.catid  +"';";

console.log('*/*/*/* QUERY:', query);


$cordovaSQLite.execute(db, query)
.then(function(res){

videos.length = 0;

 // alert('1e : ' + res.rows.length );
if(res.rows.length >0) {
=======
}

},
function(err){
console.log("Error" + JSON.stringify(err));
})


var data = [];
var res =[];
$scope.videos = [];

var jsonconfig_language = users.data.locale_id;

$scope.jsonconfig_language = jsonconfig_language;

/*

var query = "SELECT * FROM category_items AS C LEFT OUTER JOIN item_translations AS T ON C.id = T.source_id WHERE C.parent_id='"+ $stateParams.catid +"'";
*/

/*
var query = "SELECT * FROM item_translations AS T INNER JOIN category_items AS C ON C.id = T.source_id WHERE C.parent_id='"+ $stateParams.catid  +"'";
*/

$scope.noItemsVisible = false;
$scope.itemsVisible = false;

// alert(query);
$scope.videos = [];



var query = "SELECT * FROM video_items AS C  LEFT OUTER JOIN item_translations AS T ON C.id = T.source_id WHERE C.video_id='"+ $stateParams.catid  +"' AND T.locale_id='"+ jsonconfig_language+"'";

// var query = "SELECT * FROM video_items AS C  LEFT JOIN item_translations AS T ON C.id = T.source_id  AND T.locale_id='"+ jsonconfig_language+"' LEFT JOIN video_translations AS V ON C.video_id=V.source_id WHERE C.video_id='"+ $stateParams.catid  +"'  AND V.locale_id='"+ jsonconfig_language+"'";

var query= "SELECT video_items.id,video_items.category_id, video_items.nid,video_items.ordering,video_items.title,item_translations.translation, video_translations.locale_id, video_items.video_id,video_translations.locale_id,video_translations.last_upload_date,video_translations.url as VT_url,video_translations.url_low_res as VT_url_low_res,video_translations.youtube_id as VT_youtube_id,video_extra_data.downloaded_date,video_extra_data.downloading,videos.thumb_md5,videos.thumb_url, videos.url,videos.url_low_res,videos.youtube_id FROM video_items LEFT JOIN videos ON video_items.video_id=videos.id LEFT JOIN video_translations ON video_items.video_id = video_translations.source_id  AND video_translations.locale_id='"+ jsonconfig_language+"' LEFT JOIN item_translations ON item_translations.source_id=video_items.id AND item_translations.locale_id='"+ jsonconfig_language+"'  LEFT JOIN video_extra_data ON video_extra_data.video_id=video_items.video_id AND video_extra_data.locale_id='"+ jsonconfig_language+"' WHERE category_id='"+ $stateParams.catid  +"';";

$cordovaSQLite.execute(db, query)
.then(function(res){
 // alert('1e : ' + res.rows.length );
if(res.rows.length >0) {

>>>>>>> origin/master

  $scope.itemsVisible = true;

<<<<<<< HEAD
  $scope.itemsVisible = true;

  if (res.rows.item(0).locale_id == null) {

  $scope.showTranslationItems = false;

  } else {

  $scope.showTranslationItems = true;

  }

console.log('!!!!');
console.log('!!!!');
console.log('!!!!!!!!!!!!!!!! RECORDS : '+ res.rows.length);
console.log('!!!!');
console.log('!!!!');

        for(var i = 0; i < res.rows.length; i++){
console.log('?====> ' + JSON.stringify(res.rows.item(i)) );


if (res.rows.item(i).VT_url != null) {
var url = res.rows.item(i).VT_url;
var url_low_res = res.rows.item(i).VT_url_low_res;
var youtube_id = res.rows.item(i).VT_youtube_id;
var locale_id = res.rows.item(i).VT_locale_id;
} else {
var url = res.rows.item(i).url;
var url_low_res = res.rows.item(i).url_low_res;
var youtube_id =  res.rows.item(i).youtube_id;
var locale_id = 2;
}

if (res.rows.item(i).downloaded_date) {
    $scope.statusDownload[youtube_id] = 2;
  } else {
    $scope.statusDownload[youtube_id] = 1;
}

if (res.rows.item(i).downloading == 1) {
    $scope.statusDownload[youtube_id] = 9;
  }

console.log('LANGUAGE: ' + $scope.settings.locale_id);
console.log('1====>youtube: ' + youtube_id + ' -=-> Locale: ' + locale_id + ' ==> status: ' + $scope.statusDownload[youtube_id] + ' ==> ');
console.log( JSON.stringify($scope.settings) );

console.log('Status download : ' , $scope.statusDownload);


if (locale_id == $scope.settings.locale_id) {
videos.push( {
    id: res.rows.item(i).id,
    title: res.rows.item(i).title,
    translation: res.rows.item(i).translation,
    locale_id: locale_id,
    video_id : res.rows.item(i).video_id,
    thumb_url: res.rows.item(i).thumb_url,
    thumb_md5: res.rows.item(i).thumb_md5,
    url: url,
    url_low_res: url_low_res,
    youtube_id: youtube_id,
    downloaded_date: res.rows.item(i).downloaded_date,
    downloading: res.rows.item(i).downloading,
});
}

//  $scope.videos.push( res.rows.item(i) );


          // Make sure to apply scope change so that ng-repeat updates
        }

  //       alert( JSON.stringify($scope.category_items) );
        // loop through the results to find video info
//        angular.forEach($scope.category_items,function(value,index){
  //                     alert(value);
  //                 });

// alert(  $scope.itemsVisible);

} else {

  //            alert('jsonconfig_language : '+ jsonconfig_language );
if (jsonconfig_language == 2) {
          var query = "SELECT * FROM video_items WHERE category_id='"+ $stateParams.catid + "'";


var query = "SELECT * FROM video_items  INNER JOIN videos  ON video_items.video_id=videos.id WHERE category_id='"+ $stateParams.catid + "'";


    //    alert('2 :' +query);
          $cordovaSQLite.execute(db, query)
          .then(function(res){
          console.log('2e : '+res.rows.length );
                    if(res.rows.length >0){
                        $scope.itemsVisible = true;

                        if (res.rows.item(0).locale_id == null) {

                        $scope.showTranslationItems = false;

                        } else {

                        $scope.showTranslationItems = true;

                        }

                        for(var i = 0; i < res.rows.length; i++){
                      //  alert( JSON.stringify(res.rows.item(i)) );

                        res.rows.item(i).catid = $scope.catid;

                        $scope.videos.push( res.rows.item(i) );
                        // Make sure to apply scope change so that ng-repeat updates
                                }




                } else {

                  $scope.noItemsVisible = true;


                }

          },
          function(err){
            console.log("Error 2 " + JSON.stringify(err));
          });
} else{
                  $scope.noItemsVisible = true;
}
          // alert( JSON.stringify(res) );
          console.log("####console######## NO results found #######"+"Table record #: ");

}


console.log('videos available : ' , videos);


$scope.videos = videos;
return res;
},
function(err){
console.log("Error 1 " + JSON.stringify(err));
})
.then(function(res){
$scope.ItemsVisible = true;
console.log('?**** res ', JSON.stringify(res) );

});


var query = "SELECT * FROM video_items AS C  LEFT OUTER JOIN item_translations AS T ON C.id = T.source_id WHERE C.video_id='"+ $stateParams.catid  +"' AND T.locale_id='"+ jsonconfig_language+"'";
$cordovaSQLite.execute(db, query)
.then(function(res){
//  alert('alternatieve : ' + res.rows.length );
if(res.rows.length >0) {
        for(var i = 0; i < res.rows.length; i++){
      //  alert( JSON.stringify(res.rows.item(i)) );
          $scope.category_items.push( res.rows.item(i) );
          // Make sure to apply scope change so that ng-repeat updates
        }
        $scope.itemsVisible = true;
}


},
function(err){
console.log("Error 2 " + JSON.stringify(err));
})

});

})
.controller('aChatDetailCtrl', function($q, $scope, $state, $timeout,callServiceFunction, FileService, $cordovaFile, $stateParams, $ionicSideMenuDelegate) {

  // $scope.appCacheDirectory = cordova.file.externalApplicationStorageDirectory + 'cache/';
$scope.appCacheDirectory = fileTransferDir + 'cache/';


// Video afspelen !!!!
var   promiseWrapper = [];

  var videos = [];
  var categoryitems = [];
//  alert('Page 2 : '+ $stateParams.catid);

$scope.catid = $stateParams.catid;
// alert('Page 2 : '+ $scope.catid );

  console.log($stateParams.catid);

//  $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));
//  $scope.chats = $scope.jsondata.video_items;
//  $scope.videoclips = $scope.jsondata.videos;
//  $scope.categoryitems = $scope.jsondata.category_items;
//  $scope.item_translations = $scope.jsondata.item_translations;
//  $scope.video_translations = $scope.jsondata.video_translations;
//  console.log( $scope.categoryitems);

//   for (var i = 0; i <   $scope.categoryitems.length; i++) {
//     if (  $scope.categoryitems[i].parent_id === parseInt($stateParams.catid)) {
//  console.log(  $scope.videoclips );


//  var json = '{"glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","ID":"44","str":"SGML","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}}';

var catid = parseInt($stateParams.catid);

// var subcategory_data = getObjects($scope.categoryitems,'id',catid);

$scope.videotitle = subcategory_data[0].title;
console.log(subcategory_data);


//  var js =   $scope.categoryitems;
//  var category_data = getObjects(js,'id',parseInt($stateParams.catid));

  //example of grabbing objects that match some key and value in JSON
//  console.log('getObjects category_data! : ' + JSON.stringify(category_data)  );
  //returns 1 object where a key names ID has the value SGML
//  console.log('getObjects chats! : ' + JSON.stringify( //getObjects($scope.chats,'category_id',parseInt($stateParams.catid)) )  );

  // $scope.videos = getObjects($scope.chats,'category_id',parseInt($stateParams.catid) );
//   $scope.video_translations = $scope.jsondata.video_translations;




 console.log('------>>> trANSLATIONS JSON');
 console.log($scope.video_translations);
console.log('Video trans data:');
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
=======
  if (res.rows.item(0).locale_id == null) {

  $scope.showTranslationItems = false;

  } else {

  $scope.showTranslationItems = true;

  }


>>>>>>> origin/master


        for(var i = 0; i < res.rows.length; i++){
console.log('?====> ' + JSON.stringify(res.rows.item(i)) );


if (res.rows.item(i).VT_url != null) {
var url = res.rows.item(i).VT_url;
var url_low_res = res.rows.item(i).VT_url_low_res;
var youtube_id = res.rows.item(i).VT_youtube_id;
} else {
var url = res.rows.item(i).url;
var url_low_res = res.rows.item(i).url_low_res;
var youtube_id =  res.rows.item(i).youtube_id;

}

if (res.rows.item(i).downloaded_date) {
    $scope.statusDownload[youtube_id] = 2;
  } else {
    $scope.statusDownload[youtube_id] = 1;
}

if (res.rows.item(i).downloading == 1) {
    $scope.statusDownload[youtube_id] = 9;
  }

console.log('1====> ' + youtube_id + ' ==> ' + $scope.statusDownload[youtube_id] + ' ==> ');
console.log($scope.settings);

console.log($scope.statusDownload);

$scope.videos.push( {
    id: res.rows.item(i).id,
    title: res.rows.item(i).title,
    translation: res.rows.item(i).translation,
    locale_id: res.rows.item(i).locale_id,
    video_id : res.rows.item(i).video_id,
    thumb_url: res.rows.item(i).thumb_url,
    thumb_md5: res.rows.item(i).thumb_md5,
    url: url,
    url_low_res: url_low_res,
    youtube_id: youtube_id,
    downloaded_date: res.rows.item(i).downloaded_date,
    downloading: res.rows.item(i).downloading,
});

//  $scope.videos.push( res.rows.item(i) );


          // Make sure to apply scope change so that ng-repeat updates
        }



  //       alert( JSON.stringify($scope.category_items) );
        // loop through the results to find video info
//        angular.forEach($scope.category_items,function(value,index){
  //                     alert(value);
  //                 });

// alert(  $scope.itemsVisible);

} else {

  //            alert('jsonconfig_language : '+ jsonconfig_language );
if (jsonconfig_language == 2) {
          var query = "SELECT * FROM video_items WHERE category_id='"+ $stateParams.catid + "'";


var query = "SELECT * FROM video_items  INNER JOIN videos  ON video_items.video_id=videos.id WHERE category_id='"+ $stateParams.catid + "'";


    //    alert('2 :' +query);
          $cordovaSQLite.execute(db, query)
          .then(function(res){
          //      alert('2e : '+res.rows.length );
                    if(res.rows.length >0){
                        $scope.itemsVisible = true;

                        if (res.rows.item(0).locale_id == null) {

                        $scope.showTranslationItems = false;

                        } else {

                        $scope.showTranslationItems = true;

                        }

                        for(var i = 0; i < res.rows.length; i++){
                      //  alert( JSON.stringify(res.rows.item(i)) );

                        res.rows.item(i).catid = $scope.catid;

                        $scope.videos.push( res.rows.item(i) );
                        // Make sure to apply scope change so that ng-repeat updates
                                }




                } else {

                  $scope.noItemsVisible = true;


                }

          },
          function(err){
            console.log("Error 2 " + JSON.stringify(err));
          });
} else{
                  $scope.noItemsVisible = true;
}
          // alert( JSON.stringify(res) );
          console.log("####console######## NO results found #######"+"Table record #: ");

}


return res;
},
function(err){
console.log("Error 1 " + JSON.stringify(err));
})
.then(function(res){
$scope.ItemsVisible = true;
console.log( JSON.stringify(res) );

});


var query = "SELECT * FROM video_items AS C  LEFT OUTER JOIN item_translations AS T ON C.id = T.source_id WHERE C.video_id='"+ $stateParams.catid  +"' AND T.locale_id='"+ jsonconfig_language+"'";
$cordovaSQLite.execute(db, query)
.then(function(res){
//  alert('alternatieve : ' + res.rows.length );
if(res.rows.length >0) {
        for(var i = 0; i < res.rows.length; i++){
      //  alert( JSON.stringify(res.rows.item(i)) );
          $scope.category_items.push( res.rows.item(i) );
          // Make sure to apply scope change so that ng-repeat updates
        }
        $scope.itemsVisible = true;
}


},
function(err){
console.log("Error 2 " + JSON.stringify(err));
})

});

})
.controller('aChatDetailCtrl', function($q, $scope, $state, $timeout,callServiceFunction, FileService, $cordovaFile, $stateParams, $ionicSideMenuDelegate) {

  // $scope.appCacheDirectory = cordova.file.externalApplicationStorageDirectory + 'cache/';
$scope.appCacheDirectory = fileTransferDir + 'cache/';


// Video afspelen !!!!
var   promiseWrapper = [];

  var videos = [];
  var categoryitems = [];
//  alert('Page 2 : '+ $stateParams.catid);

$scope.catid = $stateParams.catid;
// alert('Page 2 : '+ $scope.catid );

  console.log($stateParams.catid);

//  $scope.jsondata = JSON.parse(window.localStorage.getItem("profile"));
//  $scope.chats = $scope.jsondata.video_items;
//  $scope.videoclips = $scope.jsondata.videos;
//  $scope.categoryitems = $scope.jsondata.category_items;
//  $scope.item_translations = $scope.jsondata.item_translations;
//  $scope.video_translations = $scope.jsondata.video_translations;
//  console.log( $scope.categoryitems);

//   for (var i = 0; i <   $scope.categoryitems.length; i++) {
//     if (  $scope.categoryitems[i].parent_id === parseInt($stateParams.catid)) {
//  console.log(  $scope.videoclips );


//  var json = '{"glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","ID":"44","str":"SGML","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}}';

var catid = parseInt($stateParams.catid);

// var subcategory_data = getObjects($scope.categoryitems,'id',catid);

$scope.videotitle = subcategory_data[0].title;
console.log(subcategory_data);


//  var js =   $scope.categoryitems;
//  var category_data = getObjects(js,'id',parseInt($stateParams.catid));

  //example of grabbing objects that match some key and value in JSON
//  console.log('getObjects category_data! : ' + JSON.stringify(category_data)  );
  //returns 1 object where a key names ID has the value SGML
//  console.log('getObjects chats! : ' + JSON.stringify( //getObjects($scope.chats,'category_id',parseInt($stateParams.catid)) )  );

  // $scope.videos = getObjects($scope.chats,'category_id',parseInt($stateParams.catid) );
//   $scope.video_translations = $scope.jsondata.video_translations;




 console.log('------>>> trANSLATIONS JSON');
 console.log($scope.video_translations);
console.log('Video trans data:');
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


$scope.current_video_title = $scope.videos.title;

     return  $scope.videos;


    console.log('done');
});

//$timeout(function(){

  //   }, 2000);



//  $scope.chat = Chats.get($stateParams.chatId);
})
.controller('FeedbackVideoCtrl', function($scope, $q, $state, $http, $cordovaDevice, $stateParams, $timeout, FeedbackService, $cordovaSQLite, $ionicPlatform, $ionicSideMenuDelegate) {

  $scope.navTitle = 'Geef je mening';

ionic.Platform.fullScreen();

var user = [];

$scope.user = {
  value: 0,
};


// alert('Page 2 : '+ $scope.catid );

  console.log($stateParams.catid);




var videoclipid = $stateParams.videoclipid;

$scope.getVideoInfo = function(videoclipid) {

var videoclip_data = [];
  var promise = $q.defer();

  var jsonconfig_language = window.localStorage['config_language'] || '2';


$scope.jsonconfig_language = jsonconfig_language;


//alert($scope.jsonconfig_language);

if ($scope.jsonconfig_language == '2') {

    var query = "SELECT * from video_items as V WHERE V.video_id='"+ $stateParams.videoclipid +"';";
  //  alert('1 :' +query);

    $cordovaSQLite.execute(db, query).then(function(res) {


        if(res.rows.length > 0) {

          for(var i = 0; i < res.rows.length; i++){
      //    alert( JSON.stringify(res.rows.item(i)) );
         videoclip_data.push( res.rows.item(i) );
            }

             console.log("videodata "+JSON.stringify(res)  );
       //   console.log(" select already existed in the database! " + select_query);
      //  RecordCounter--;

      //      reject(ress);
      promise.resolve({data: videoclip_data});
      // return promise;

            } else {
            console.log("2 does not exist in the database!");
            console.log("videodata  "+JSON.stringify(videoclip_data)  );
            // RecordCounter--;
        //      resolve(ress);
        promise.reject({data: res});
            }
    //  });

    }); // promise

} else {

  var query = "SELECT * from video_items as V LEFT JOIN item_translations AS T ON V.id=T.source_id where V.video_id='"+ $stateParams.videoclipid +"' and T.locale_id='"+ $scope.jsonconfig_language +"';";
  //alert('2 :' +query);

  $cordovaSQLite.execute(db, query).then(function(res) {

          //return $q(function(resolve, reject) {

      //    alert(  JSON.stringify(ress) );
              if(res.rows.length > 0) {

                for(var i = 0; i < res.rows.length; i++){
          //      alert( JSON.stringify(res.rows.item(i)) );
                videoclip_data.push( res.rows.item(i) );
                  }

                   console.log("vifeo data "+JSON.stringify(videoclip_data)  );
             //   console.log(" select already existed in the database! " + select_query);
            //  RecordCounter--;

          //        reject(ress);

              promise.resolve({data: videoclip_data});

                  } else {
                  console.log("2 does not exist in the database!");
                  console.log("Inserted "+JSON.stringify(res)  );
                  // RecordCounter--;
            //        resolve(ress);
promise.reject({data: res});
                  }
      //      });

    }); // promise

} // else

  console.log('returning: ');
  console.log(promise);
  return promise.promise;

}



  $scope.getVideoInfo(videoclipid)
  .then(function(video_data){
  //  alert($scope.videoclip_data);
  console.log('Feedback video data: ' , video_data);
  // alert('Feedback video data: ' + video_data.data[0].title);

$scope.feedback_data = video_data;

  if( !video_data.data[0].translation) {
  $scope.videoclip_title = video_data.data[0].title;
  } else {
    $scope.videoclip_title = video_data.data[0].translation;
  }


  });




$scope.skipOpinion = function() {
  // alert($stateParams.videoclipid);
   $state.go('main.home');
     //var current = $state.current;
     //var params = angular.copy($stateParams);
     //$state.transitionTo(current, params, { reload: true, inherit: true, notify: true });

};

$scope.sendOpinion = function(videoclipid) {
console.log('get user : videoclipid' + videoclipid);


$scope.videoclipid =videoclipid;

FeedbackService.getUser($scope,$timeout,'1').then(function(users){
  //users is an array of user objects

  console.log('USERDATA : ' + users);


var kijksoort = window.localStorage['kijksoort'] || '0';

var device = $cordovaDevice.getDevice();

var cordova = $cordovaDevice.getCordova();

var model = $cordovaDevice.getModel();

var platform = $cordovaDevice.getPlatform();

var uuid = $cordovaDevice.getUUID();

$scope.deviceID = uuid;
$scope.model = model;
$scope.platform = platform;


$scope.device = {

 device_id: $scope.deviceID,
 device_model: $scope.model,
 device_platform: $scope.platform,

}


var streaming = window.localStorage['streaming'] || '1';

var start_time = window.localStorage['start_time'];
var end_time = window.localStorage['end_time'];


  $scope.feedbackItem = {
  videoclipid: $scope.videoclipid,
  feedbackdata: $scope.user,
  score: $scope.user.value,
  account: users,
  data: $scope.feedback_data,
  kijksoort: kijksoort,
  streaming: streaming,
  device: $scope.device,
  start_time: start_time,
  end_time: end_time,
  }

  console.log('USERDATA : ' + $scope.feedbackItem);

  FeedbackService.doPost($scope.feedbackItem).then(function(response){
console.log('DATA POSTED!');
console.log( response);
});


});




//console.log($stateParams.videoclipid);
//console.log($scope.getVideoInfo);
//console.log($scope.Opinion);
//console.log('Feedback video datasssssss: ' ,$scope.feedback_data.data[0].category_id);
$state.go('main.chat-detail',{catid:$scope.feedback_data.data[0].category_id});

//   $state.go('main.home');
//var current = $state.current;
//var params = angular.copy($stateParams);
//$state.transitionTo(current, params, { reload: true, inherit: true, notify: true });
};




/*
  $scope.leftButtons = [{
      type: 'button-icon icon ion-navicon',
      tap: function(e) {
          $scope.toggleMenu();
      }
  }];
*/


var post = [];
var list = [];
var event_list = [];
// list = JSON.parse(list);

//event_list.push( list );

// post.push(event_list);


var event_list = [[]];
var events = [];
var post = [];

var event = [];

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
console.log(event);


var rates = [];
var rating = [];

rating.push({"video_id" :139});
rating.push({"message" : 'Nice!'});
rating.push({"rating" : 4});
// rates.push(rating);
console.log(rating);

event_list.push(event);
event_list.push(rating);


var json_event_list = JSON.stringify(event_list);

post['event_list'] = json_event_list;


console.log('JSON EVENT 1');
console.log( post );
console.log('JSON EVENT 2');
console.log( JSON.stringify(post) );




})

.controller('HelpCtrl', function($scope, $state, $timeout, $cordovaFile, $cordovaSQLite, $ionicSideMenuDelegate) {

  $scope.navTitle = 'Help';

  $scope.leftButtons = [{
      type: 'button-icon icon ion-navicon',
      tap: function(e) {
          $scope.toggleMenu();
      }
  }];

// $scope.category_items[0].asset

  $cordovaFile.readAsText(cordova.file.applicationDirectory + 'www/assets/', 'generic_this_app.html')
  .then( function(result) {
    console.log('readAsText: ', result);

  $scope.htmltext = result;
  $scope.navTitle = 'Help, Over deze APP';
  $ionicNavBarDelegate.title($scope.navTitle);
  //  return result;

  }, function(error){
    alert("didn\'t read file: " + error.code);
$scope.noItemsVisible = true;


  });

})


.controller('AccountCtrl', function($scope, $state, $timeout, $cordovaSQLite, $ionicSideMenuDelegate) {

  $scope.navTitle = 'Instellingen';

  $scope.leftButtons = [{
      type: 'button-icon icon ion-navicon',
      tap: function(e) {
          $scope.toggleMenu();
      }
  }];

  $scope.setToggleBirthyear = function(value) {

    if (value == false) {
        $scope.settings.enableBirthyear = false;
    } else {
          $scope.settings.enableBirthyear = true;
    }

  }


  $scope.settings = {
    enableBirthyear: false,
    enableMailing: false,
  };

var enableBirthyear = false;

       var select_query = "SELECT firstname, lastname, username, email,Birthyear,enableBirthyear,enableMailing FROM user_data LIMIT 1;";

       $cordovaSQLite.execute(db, select_query)
       .then(function(res){
       //  alert('alternatieve : ' + res.rows.length );
            if(res.rows.length >0) {
               //for(var i = 0; i < res.rows.length; i++){
            //   alert( JSON.stringify(res.rows.item(0)) );


 $scope.settings = res.rows.item(0);

console.log('loaded values:');
 console.log($scope.settings);

 $timeout(function() {
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

      };




       console.log($scope.settings);

}, 1000);

                 // Make sure to apply scope change so that ng-repeat updates
              // }

            } else {

console.log('GEEN ACCOUNT INSTELLINGEN');

                  $scope.settings = {
                    enableBirthyear: false,
                    enableMailing: false,
                  };
            }


       }, function (err) {

           console.error(err);

      });







     console.log($scope.settings);


$scope.valueBirthyearChanged = function() {

// alert($scope.settings.Birthyear);

}

      $scope.saveAccount = function(settings) {

        console.log( JSON.stringify(settings) );

var my_update_query = '';

        angular.forEach(settings ,function(value,index){
                             // alert(value);
                             my_update_query = my_update_query + "'" +index + "'='"+value+"',";
      });

      my_update_query = my_update_query.substr(0, my_update_query.length -1);
      console.log(my_update_query );


      var query = "UPDATE user_data SET " + my_update_query + " WHERE id='1'";

      // # 1 // if I use this line of code, DB empty and the message (firstname, lastname) undefined

      $cordovaSQLite.execute(db, query, []).then(function(res) {
        // alert(res);
        console.log(res);

//      console.log("INSERT ID -> " + res.insertId);


      }, function (err) {

          console.error(err);

         });

        };




        $scope.toggleChange = function(value) {
    //      console.log('Toggle EnableBirthyear : ' + value);


console.log('toggle is : ' + $scope.settings.enableBirthyear);
/*
          if ($scope.settings.enableBirthyear === undefined) {
            console.error('Toggle was undefined');
             $scope.settings.enableBirthyear = true;

          }else {
*/
                        if ($scope.settings.enableBirthyear == false) {
                            $scope.settings.enableBirthyear = true;
                        } else {
                              $scope.settings.enableBirthyear = false;
                        }

  //        }

console.log('testToggle changed to ' + $scope.settings.enableBirthyear);
// $state.go($state.current, {}, {reload: true});
          };



  //    $scope.$watch('settings.enableBirthyear', function(newVal, oldVal) {
          //  console.log('$watch(settings.enableBirthyear) >>> ', newVal);

    //        $scope.settings = {enableBirthyear :newVal};

//if  ( newVal != oldVal) {
//  console.log('testToggle changed to ' + newVal);
//  $scope.toggleChange( newVal );
//  $state.go($state.current, {}, {reload: true});

//}






          //  $state.go($state.current, {}, {reload: true});

//    });


});
