'use strict';
import ApiBotService from '../postgres_api_bot';
import GateKeepersForAdmin from '../apiservices/helpers/whoisAdmin';
import getOnlineUrlConnection from '../apiservices/helpers/getOnlineUrlConnection';
import $ from 'jquery';
//import carsInfo from "./helpers/cars_info";
import Validator from "./helpers/validator";
import AuditTrail from './helpers/Logger';
import AdminBash from './AdminBash';

import {
  addInspection,
  viewInspectionUpdate,
  RolesUpdateAction,
  RolesAddAction,
  RolesUpdate,
  viewPreviledges,

  addClickStartNew,
  setCarDetailsOnearning,
  setCarDetail,
  setEarningsDetail,
  autofill,
  update_value_checked_previledges,
  updateInspectionAction,
} from './globals.fn'

import getApiUrl from '../apiservices/helpers/getOnlineUrlConnection'
let baseUrl =  getApiUrl();

let datapromise;



let usersFoundId;


window.updateDriveTest = function(o){





let view_id = o.dataset.id
let linkOfApi = "http://localhost:12000/api/v1" + o.dataset.url + '/' + o.dataset.id


const  status_x = document.getElementById("status"+view_id)





const prePostData = {

  status: status_x.options[status_x.selectedIndex].text,

};







const user =JSON.parse(localStorage.getItem("userToken"));


fetch(linkOfApi, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': user.token,
    },
    body: JSON.stringify(prePostData),
    mode:"cors",
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.status == 200 || data.status == 201 || data.status == "ok") {

         AuditTrail.sendLogInfo(user, prePostData.email, 'Drive Test Module', 'Success', '201', 'PUT', "user drive test updated .")

        var notification = alertify.notify('Successfully updated drive test ', 'success', 5, function(){  console.log('dismissed'); });



        setTimeout(()=>{
          window.location.reload();
        },3000)





            }else{
            AuditTrail.sendLogInfo(user,"", 'Drive test update failed', 'Failed', '200', 'PUT', 'Drive test update failed')


        var notification = alertify.notify('Could not perform update operation.', 'error', 5, function(){  console.log('dismissed'); });

      }
    }).catch(e=> console.log(e));

}


window.viewDriveTest = function(el){







  let view_id = el.dataset.id;
  let modal_view_id = document.getElementById("con-close-modal-"+ view_id);
  modal_view_id.style.display="block";


  //document.getElementById("gtd").classList.add("overlay")

  let showme ="#con-close-modal-"+ view_id


   // $('.mebox').not($(showme).closest('.mebox')).addClass('noOpacity');

   $('.mebox').not(showme).hide();

  document.getElementById("create").style.visibility="hidden";
  document.getElementById("update").style.visibility="visible";
  document.getElementById("delete").style.visibility="visible";
  document.getElementById("cancle").style.visibility="visible";




    // document.getElementById("model"+view_id).value=el.dataset.model;


    let ida= "#status"+view_id
    $( ida + " option").each(function () {
        if ($(this).html() == el.dataset.status) {
            $(this).attr("selected", "selected");
            return;
        }
    });


  document.getElementById("date"+view_id).value=el.dataset.date || '';
  document.getElementById("username"+view_id).value=el.dataset.username || "";
  document.getElementById("phone_number"+view_id).value= el.dataset.phone_number;
  document.getElementById("email"+view_id).value= el.dataset.email || '';

  document.getElementById("description"+view_id).value= el.dataset.description  ;
  // document.getElementById("status"+view_id).value= el.dataset.inspection_detail || '';


     document.getElementById("first-view").style.display="none";
    document.getElementById("second-view").style.display="block";

}


const NOW = new Date()
const times = [["second", 1], ["minute", 60], ["hour", 3600], ["day", 86400], ["week", 604800], ["month", 2592000], ["year", 31536000]]

function timeAgo(date) {
    var diff = Math.round((NOW - date) / 1000)
    for (var t = 0; t < times.length; t++) {
        if (diff < times[t][1]) {
            if (t == 0) {
                return "Just now"
            } else {
                diff = Math.round(diff / times[t - 1][1])
                return diff + " " + times[t - 1][0] + (diff == 1?" ago":"s ago")
            }
        }
    }
}


var sortBy = (function () {
  var toString = Object.prototype.toString,
      // default parser function
      parse = function (x) { return x; },
      // gets the item to be sorted
      getItem = function (x) {
        var isObject = x != null && typeof x === "object";
        var isProp = isObject && this.prop in x;
        return this.parser(isProp ? x[this.prop] : x);
      };

  /**
   * Sorts an array of elements.
   *
   * @param  {Array} array: the collection to sort
   * @param  {Object} cfg: the configuration options
   * @property {String}   cfg.prop: property name (if it is an Array of objects)
   * @property {Boolean}  cfg.desc: determines whether the sort is descending
   * @property {Function} cfg.parser: function to parse the items to expected type
   * @return {Array}
   */
  return function sortby (array, cfg) {
    if (!(array instanceof Array && array.length)) return [];
    if (toString.call(cfg) !== "[object Object]") cfg = {};
    if (typeof cfg.parser !== "function") cfg.parser = parse;
    cfg.desc = !!cfg.desc ? -1 : 1;
    return array.sort(function (a, b) {
      a = getItem.call(cfg, a);
      b = getItem.call(cfg, b);
      return cfg.desc * (a < b ? -1 : +(a > b));
    });
  };

}());



window.updateNotificationStatus = (el) =>{


  const user = JSON.parse(localStorage.getItem("userToken"));
  let url = baseUrl+"/notification/"+ el.dataset.id

  let dataStatus = {
    status:"old",
  }
  return fetch(url, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': user.token,
            },
            body: JSON.stringify(dataStatus)
          }).then(response => response.json())
        .then(data => {
        if (data.status === 200) {
          var element = el;
          element.remove();
          let counter = document.getElementById("notifyCount").innerHTML;
          let count = parseInt(counter,10);
          if(count > 0){
            document.getElementById("notifyCount").innerHTML = count -1
          }else{
             document.getElementById("notifyCount").innerHTML = 0;
          }

          setTimeout(()=>{window.location.href="./notification"},2000)

          // document.getElementById('selectStatus').options[select.selectedIndex].value = newStatus;
        } else {
          console.log('error updating status')
          var notification = alertify.notify('Notification update failed', 'error', 5, function(){  console.log('dismissed'); });

        }
      });





}


const searchCars = () =>{
$("#search").on('keyup', function(){
  var matcher = new RegExp($(this).val(), 'gi');
  $('.product-list-box').show().not(function(){
      return matcher.test($(this).find('.text-dark, .text-muted').text())
  }).hide();
  });
}

function pageTransitionEffect(){
  $(document).ready(function(event){
  var isAnimating = false,
    newLocation = '';

    var firstLoad = false;

  //trigger smooth transition from the actual page to the new one
  $('main').on('click', '[data-type="page-transition"]', function(event){
    event.preventDefault();
    //detect which page has been selected
    var newPage = $(this).attr('href') || '#';
    //if the page is not already being animated - trigger animation
    if( !isAnimating ) changePage(newPage, true);
    firstLoad = true;
  });

  //detect the 'popstate' event - e.g. user clicking the back button
  // $(window).on('popstate', function() {
    if( firstLoad ) {
      /*
      Safari emits a popstate event on page load - check if firstLoad is true before animating
      if it's false - the page has just been loaded
      */
      var newPageArray = location.pathname.split('/'),
        //this is the url of the page to be loaded
        newPage = newPageArray[newPageArray.length - 1];

      if( !isAnimating  &&  newLocation != newPage ) changePage(newPage, false);
    }
    firstLoad = true;
  // });

  function changePage(url, bool) {
    isAnimating = true;
    // trigger page animation
    $('body').addClass('page-is-changing');
    $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
      loadNewContent(url, bool);
      newLocation = url;
      $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    });
    //if browser doesn't support CSS transitions
    if( !transitionsSupported() ) {
      loadNewContent(url, bool);
      newLocation = url;
    }
  }

  function loadNewContent(url, bool) {
    url = ('' == url) ? 'index.html' : url;
    var newSection = 'cd-'+url.replace('.html', '');
    var section = $('<div class="cd-main-content '+newSection+'"></div>');

    // section.load(url+' .cd-main-content > *', function(event){
      // load new content and replace <main> content with the new one
      // $('main').html(section);
      //if browser doesn't support CSS transitions - dont wait for the end of transitions
      var delay = ( transitionsSupported() ) ? 1200 : 0;
      setTimeout(function(){
        //wait for the end of the transition on the loading bar before revealing the new content
        ( section.hasClass('cd-about') ) ? $('body').addClass('cd-about') : $('body').removeClass('cd-about');
        $('body').removeClass('page-is-changing');
        $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
          isAnimating = false;
          $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        });

        if( !transitionsSupported() ) isAnimating = false;
      }, delay);

      if(url!=window.location && bool){
        if(url!='#'){
          //add the new page to the window.history
        //if the new page was triggered by a 'popstate' event, don't add it
        // window.history.pushState({path: url},'',url);
        setTimeout(()=>{
                window.location.href=url;
        },3000)

        }else{
          window.history.pushState({path: url},'',url);
        }

      }
    // });
  }

  function transitionsSupported() {
    return $('html').hasClass('csstransitions');
  }
});
}








function pageTransitionEffectClose(){
  $(document).ready(function(event){
  var isAnimating = false,
    newLocation = '';

    var firstLoad = false;

  //trigger smooth transition from the actual page to the new one
  $('main').on('click', 'a', function(event){
    event.preventDefault();
    //detect which page has been selected
    var newPage = $(this).attr('href') || '#';
    //if the page is not already being animated - trigger animation
    if( !isAnimating ) changePage(newPage, true);
    firstLoad = true;
  });

  //detect the 'popstate' event - e.g. user clicking the back button
  // $(window).on('popstate', function() {
    if( firstLoad ) {
      /*
      Safari emits a popstate event on page load - check if firstLoad is true before animating
      if it's false - the page has just been loaded
      */
      var newPageArray = location.pathname.split('/'),
        //this is the url of the page to be loaded
        newPage = newPageArray[newPageArray.length - 1];

      if( !isAnimating  &&  newLocation != newPage ) changePage(newPage, false);
    }
    firstLoad = true;
  // });

  function changePage(url, bool) {
    isAnimating = true;
    // trigger page animation
    $('body').addClass('page-is-changing');
    $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
      loadNewContent(url, bool);
      newLocation = url;
      $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    });
    //if browser doesn't support CSS transitions
    if( !transitionsSupported() ) {
      loadNewContent(url, bool);
      newLocation = url;
    }
  }

  function loadNewContent(url, bool) {
    url = ('' == url) ? 'index.html' : url;
    var newSection = 'cd-'+url.replace('.html', '');
    var section = $('<div class="cd-main-content '+newSection+'"></div>');

    // section.load(url+' .cd-main-content > *', function(event){
      // load new content and replace <main> content with the new one
      // $('main').html(section);
      //if browser doesn't support CSS transitions - dont wait for the end of transitions
      var delay = ( transitionsSupported() ) ? 1200 : 0;
      setTimeout(function(){
        //wait for the end of the transition on the loading bar before revealing the new content
        ( section.hasClass('cd-about') ) ? $('body').addClass('cd-about') : $('body').removeClass('cd-about');
        $('body').removeClass('page-is-changing');
        $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
          isAnimating = false;
          $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        });

        if( !transitionsSupported() ) isAnimating = false;
      }, delay);

      if(url!=window.location && bool){
        // document.getElementById('app').style.display="none"
        if(url!='#'){
          //add the new page to the window.history
        //if the new page was triggered by a 'popstate' event, don't add it
        // window.history.pushState({path: url},'',url);
        setTimeout(()=>{
          // document.getElementById('app').style.display="block"
                window.location.href=url;
        },3000)

        }else{
          window.history.pushState({path: url},'',url);
        }

      }
    // });
  }

  function transitionsSupported() {
    return $('html').hasClass('csstransitions');
  }
});
}


function showTravelRoute(map, directionsService, directionsDisplay, source , destination){


      directionsDisplay.setMap(map);

      calculateAndDisplayRoute(directionsService, directionsDisplay, source, destination)
}

 function calculateAndDisplayRoute(directionsService, directionsDisplay, source, destination) {
  directionsService.route({
    origin: source,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}


function getAlldriversOntheMap(map){

}

function driversNearBy(MAP, startLocationCordinates){ //lat , long
   const user = JSON.parse(localStorage.getItem('userToken'));

   //let cords = startLocationCordinates.split(',')

   // console.log(startLocationCordinates)

   // startLocationCordinatesLat =parseFloat(cords[0]);
   // startLocationCordinatesLng = parseFloat(cords[1]);

  //let nearDriver = activeUrl + `/driverLocation/`+ startLocationCordinatesLat + '/'+ startLocationCordinatesLng;
  let drivers = activeUrl + `/drivers`


  fetch(drivers, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': user.token,
          },
           mode: 'cors',
        }).then(response => response.json())
      .then(result =>{
        results.map((item,i)=>{
               console.log(item.location)
        })

      }).catch(e=>{
        console.log(e)
      })
}

function showUserDrift(startlocAdress, destinationAddress, geocoder, resultsMap){


  var address1 =  startlocAdress;                //document.getElementById('address').value;
  var address2 =  destinationAddress;
  geocoder.geocode({'address': address1}, function(results, status) {
          if (status === 'OK') {
            console.log(results[0].geometry.location + "is your location")
            //resultsMap.setCenter(results[0].geometry.location);
            //alert(results[0].geometry.location)
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location,
              animation: google.maps.Animation.DROP,
            });


            var contentString = '<div id="content"><h1>Pickup Location.' +
                    `</h1><p>${address1}</p></div>`;





          const infowindow = new google.maps.InfoWindow({
                            content: contentString,
                            maxWidth: 200
          });

          marker.addListener('click', function () {

                            infowindow.open(marker.get('map'), marker);
                            InforObj[0] = infowindow;
          });

           marker.addListener('mouseover', function () {

                            infowindow.open(marker.get('map'), marker);
                            InforObj[0] = infowindow;
          });
















          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
  });


  geocoder.geocode({'address': address2}, function(results, status) {
          if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                  map: resultsMap,
                  position: results[0].geometry.location,
                  animation: google.maps.Animation.DROP,
                });


                var contentString = '<div id="content"><h1>Destination.' +
                        `</h1><p>${address2}</p></div>`;





                const infowindow = new google.maps.InfoWindow({
                                  content: contentString,
                                  maxWidth: 200
                });

                marker.addListener('click', function () {

                                  infowindow.open(marker.get('map'), marker);
                                  InforObj[0] = infowindow;
                });

                 marker.addListener('mouseover', function () {

                                  infowindow.open(marker.get('map'), marker);
                                  InforObj[0] = infowindow;
                });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
  });

}



const mapRoutes = (start, dest) => {

    //Add the event listener after Google Mpas and window is loaded
    // $('#start').click(function (e) {



        //
        if(document.getElementById('mapout')){
          $("#mapout").show();
          document.getElementById('mapout').style.opacity=1
        }



     // e.preventDefault()
         var mapOptions = {
      center: { lat: 6.5244, lng: 3.3792},// 6.5244, 3.3792
      zoom: 8
  };
  var map = new google.maps.Map(document.getElementById('gmaps-types'), mapOptions);


  var geocoder = new google.maps.Geocoder();
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  showUserDrift(start, dest, geocoder, map);
  showTravelRoute(map, directionsService, directionsDisplay,   start , dest)

  // driversNearBy(map,nearMyCordinates )


    // });
}


window.viewCarDetail = (el) =>{


  $('input.example').on('change', function() {
    $('input.example').not(this).prop('checked', false);
});

  $('#create').show()

  document.getElementById("carset").style.display="block"

    //data-plate_no="${item.plateNo || item.plate_number}"
    //data-desc="${item.description || item.carDescription}"
    //data-image="${item.images || item.imagePath}"
    //data-name="${item.car.car_name}" data-carid="${item._id}"
    document.getElementById("name").innerHTML = el.dataset.name
    // document.getElementById("id").innerHTML = el.dataset.id
    document.getElementById("desc").innerHTML = el.dataset.desc
    document.getElementById("plate_no").innerHTML = el.dataset.plate_no
    document.getElementById("imgcar").src = el.dataset.image
    document.getElementById("car_id").innerHTML  = el.dataset.carid

    localStorage.setItem('chosenCar',JSON.stringify({
      name: el.dataset.name,
      plate_no: el.dataset.plate_no,
      car_id: el.dataset.carid
    }))



}

var LoadMore = function(userOptions) {
  this.options = {
    "pageSize": 10,
    "dataUrl": "",
    "container": "#loadbase",
    "triggerText": "Show More",
    "triggerLoadingText": "...loading",
    "trigger": "#showMoreTrigger",
    "callback": null
  };
  $.extend(this.options, userOptions);
  this._index = 0;
  this._itemsCurrentlyDisplayed = 0;
};

LoadMore.prototype.scrollToElement = function(selector, time, verticalOffset) {
  time = typeof(time) != 'undefined' ? time : 1000;
  verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
  var element = $(selector);
  var offset = element.offset();
  var offsetTop = offset.top + verticalOffset;
  //if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {
  //setTimeout(function () {
  //        window.scrollTo(0, offsetTop);
  //    }, 100
  //);
  //} else {
  /*$('html,body').scrollTo(selector, {
    duration: 1500
  });*/

  $('html,body').animate({
      scrollTop: offsetTop
  }, 800, function(){
      $('html,body').clearQueue();
  });
  //}
};

LoadMore.prototype.loadData = function(gottenData) {
  var self = this;
  self.triggerFeedback(true);
  $.getJSON(self.options.dataUrl,
    function(data) {
      self.triggerFeedback(false);
      var totalResults =  gottenData.length  //data.results.length;
      var items = [];
      var className ='';
      var dataArr = gottenData.splice(self._index, self.options.pageSize); // data.results.splice(self._index, self.options.pageSize);
      if (dataArr.length > 0) {
        $.each(dataArr, function(key, item) {
          if(item.message_type=='Success'){
            className ='label-success'
          }else{
            className="label-danger"
          }
          items.push(`<li  className="row  loadmore  card">
          <!--<div className="profile col-xs-2 pull-right">
            <img src="${item.avatar}"  style="height:100px;width:100px"/>
          </div>-->
          <div class="activity-content col-xs-10  ">
            <div class="inner">
              <span class="date">Date : ${item.date} </span>
              <p>Status: <span class="label ${className}">${item.message_type}</span></p>
              <div class="name">${item.admin}</div>
              <div class="content">
                <p>
                   ${item.logMessage}
                </p>
                 <p>
                  Module: ${item.module_name} || status: ${item.status}
                </p>
              </div>
            </div>
          </div>
          <hr/>
        </li>`);
        });
        $(items.join("")).appendTo(self.options.container);
        var scrollToEl = $(".result").get(self._index);
        self._index += self.options.pageSize;
        if (scrollToEl) {
          // occurs only when not the initial
          // load of data
          self.scrollToElement(scrollToEl);
        }
        self._itemsCurrentlyDisplayed += dataArr.length;
        if (self._itemsCurrentlyDisplayed >= totalResults) {
          self._trigger.hide();
        }
        if (self.options.callback != null) {
          self.options.callback();
        }
      }
    });
};

LoadMore.prototype.triggerFeedback = function(isLoading) {
  if (isLoading) {
    this._trigger.text(this.options.triggerLoadingText);
  } else {
    this._trigger.text(this.options.triggerText);
  }
};

LoadMore.prototype.init = function(dataFromFetch) {
  var self = this;
  $(document).ready(
    function() {
      self._trigger = $(self.options.trigger);
      self.loadData(dataFromFetch);
      self._trigger.on("click", function() {
        self.loadData(dataFromFetch);
      });
    });
};



function createUserDriveTestDetail(url, data){
  const user = JSON.parse(localStorage.getItem('userToken'));
  fetch(url, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': user.token,
              },
              body: JSON.stringify(data),
              mode:"cors",
            })
              .then(response => response.json())
              .then(data => {
                console.log(data)
                if (data.status == 201) {

                  AuditTrail.sendLogInfo(user, data.username, 'Drive Test Module', 'Success', '201', 'POST','Drive Test Created')


                  var notification = alertify.notify('Successfully created drive test ', 'success', 5, function(){  console.log('dismissed'); });

                  // setTimeout(()=>{
                  //   window.location.reload();
                  // },2000)


                 // ApiDeleteOneStatusRecord.redirect(recordOfType);
                } else {

                   AuditTrail.sendLogInfo(user, data.username, 'Drive Test Module', 'Failed', '400', 'POST','Drive test failed to create resource')


                  var notification = alertify.notify('Could not perform update operation.', 'error', 5, function(){  console.log('dismissed'); });

                }
              }).catch(e=> console.log(e));

}



function noReadWrite(PREVILEDGES,perms){




    $( document ).ready(function() {

      let perm = PREVILEDGES[0];
      perm = perm[perms]

     // alert(perm)

       if(perm=='no'){
      $("a.btn").hide()
      $("a.table-action-btn i.md-close").hide()
       $(":input[type='file']").hide()

       $('#close-id').attr('disabled',false)

      var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
        }
        var selects = document.getElementsByTagName("select");
        for (var i = 0; i < selects.length; i++) {
            selects[i].disabled = true;
        }
        var textareas = document.getElementsByTagName("textarea");
        for (var i = 0; i < textareas.length; i++) {
            textareas[i].disabled = true;
        }
        var buttons = document.getElementsByTagName("button");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }

        }
    })





}



function setUserdetail(email,o,wallet=false){
  let linkOfApi = baseUrl+ ''+ '/fetchuserinfo/'+ email;

  if(document.getElementById('admin')){
  if(localStorage.getItem('userToken')){

   const user = JSON.parse(localStorage.getItem('userToken'))
  fetch(linkOfApi, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      mode: 'cors',

    })
      .then(response => response.json())
      .then(data => {

        if (data) {
          let userRecord = data.data[0].userInfo[0];


          //document.getElementById('email').value = userRecord.email;
          document.getElementById('phone_number'+o.dataset.id).value = userRecord.phone_number;

          if(o.dataset.quotation_id=='Not Set'){
            document.getElementById('plan_id'+o.dataset.id).value = userRecord.old_balance;
             document.getElementById('quotation_id'+o.dataset.id).value = userRecord.balance;
          }

         AuditTrail.sendLogInfo(user, userRecord.firstname, 'Profile Module', 'Success', '200', 'GET', "Users detailed was fetched successfully for "+ userRecord.firstname)


        } else {
          var notification = alertify.notify('Could not perform Update location operation', 'error', 5, function(){  console.log('dismissed'); });
          AuditTrail.sendLogInfo(user, userRecord.firstname, 'Profile Module', 'Failed', '200', 'GET')

        }
      }).catch(e => {
        // var notification = alertify.notify(e, 'error', 5, function(){  console.log('dismissed'); });

        // return MessageBoard.displayMsg(e);
      })

     }

   }
}





function getUserdetail(email){

  if(document.getElementById('admin')){
  let linkOfApi = baseUrl+ '/'+ 'fetchuserinfo/'+ email;
   if(localStorage.getItem('userToken')){
  const user = JSON.parse(localStorage.getItem('userToken'))
  return fetch(linkOfApi, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      mode: 'cors',

    })
      .then(response => response.json())
      .then(data => {

        if (data) {
          let userRecord = data.data[0].userInfo[0];
          console.log(userRecord)

          if(userRecord.id){
             localStorage.setItem('user_to_book',userRecord.id)
          }




        AuditTrail.sendLogInfo(user, userRecord.firstname, 'Profile Module', 'Success', '200', 'GET','User profile resource successful for '+ userRecord.username )


         return userRecord;
           }else{
            AuditTrail.sendLogInfo(user, userRecord.firstname, 'Profile Module', 'Failed', '200', 'GET','User profile resource failed for'+ userRecord.username)


          var notification = alertify.notify('Could not perform Update location operation', 'error', 5, function(){  console.log('dismissed'); });

        }
      }).catch(e => {
        // var notification = alertify.notify(e, 'error', 5, function(){  console.log('dismissed'); });

        // return MessageBoard.displayMsg(e);
      })

       }

     }
}





function updateUsersTestCenter(url, prePostData){

  let {test_center,test_center_address} = prePostData;

  if(!test_center.length){
    var notification = alertify.notify('test center field required.', 'error', 5, function(){  console.log('dismissed'); });

    return false
  }

  if(!test_center_address.length){
    var notification = alertify.notify('Address required.', 'error', 5, function(){  console.log('dismissed'); });

    return false
  }


   const user =JSON.parse(localStorage.getItem("userToken"));


          fetch(url, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': user.token,
              },
              body: JSON.stringify(prePostData),
              mode:"cors",
            })
              .then(response => response.json())
              .then(data => {
                console.log(data)
                if (data.status == 200) {

                  var notification = alertify.notify('Successfully update of users test location', 'success', 5, function(){  console.log('dismissed'); });

                  setTimeout(()=>{
                    window.location.reload();
                  },4000)


                 // ApiDeleteOneStatusRecord.redirect(recordOfType);
                AuditTrail.sendLogInfo(user, "", 'Drive Test', 'Success', '201', 'POST','User test center location updated')
           }else{
            AuditTrail.sendLogInfo(user, "", 'Drive Test', 'Failed', '200', 'GET','Test center location update for user failed')


                  var notification = alertify.notify('Could not perform update operation for users test location.', 'error', 5, function(){  console.log('dismissed'); });

                }
              }).catch(e=> console.log(e));


}



// window.addEventListener('load', (event) => {
//     //   const loader = document.getElementById("loader");
//     // loader.style.display = 'block';
//     // loader.style.zIndex="9999999";

//       if(document.getElementById('admin')){

//       if(localStorage.getItem('userToken')){
//         datapromise =getUserRights()

//         if(datapromise){
//           //loader.style.display = 'none';

//        datapromise.then(data=> {
//           localStorage.setItem('previledges', JSON.stringify(data))

//         })
//       }else{
//             // localStorage.clear()
//         if(localStorage.getItem('previledges')=='undefined'){
//           var notification = alertify.notify('Login has Expiried or probably a slow network Connectivity issue.', 'error', 5, function(){  console.log('dismissed'); });



//           setTimeout(()=>{
//              window.location.reload()
//          },2000)
//         }
//         // localStorage.clearItem()
//          //loader.style.display = 'none';



//       }

//       }

//     }
// })

function guidGenerator() {
          var S4 = function() {
             return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
          };
          return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}


window.genCert = (o) =>{

  document.getElementById('certificate'+ o.dataset.id).value='CMT-DRIV-CERT-' + guidGenerator().substring(0,20);
}

function getUserRights(){


//window.onload = function(){
  if(localStorage.getItem('userToken')){

    const user = JSON.parse(localStorage.getItem('userToken'));
     let linkOfApi = baseUrl+ '/profile-admin-rights/update/'+ user.user._id+ '/permission/'+ user.user.roles;

 return fetch(linkOfApi, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      mode: 'cors',

    })
      .then(response => response.json())
      .then(data => {

        if (data) {
          console.log(JSON.stringify(data.data[0].userInfo[0]))
          let userRecord = data.data[0].userInfo[0];
          console.log(userRecord)
          //userRights.push(userRecord)

           localStorage.setItem('previledges', JSON.stringify(userRecord))



         //AuditTrail.sendLogInfo(user, '', 'Previledges', 'Success', '201', 'POST')
           return  userRecord;
           }else{
           // AuditTrail.sendLogInfo(user, userRecord.username, 'Drive Test', 'Failed', '200', 'GET')

          var notification = alertify.notify('Could not perform Update location operation', 'error', 5, function(){  console.log('dismissed'); });


        }
      }).catch(e => {

          if(localStorage.getItem('previledges') =='undefined'){
              var notification = alertify.notify('Slow network....please reload the webpage or restart the service.', 'error', 5, function(){  console.log('dismissed'); });

          }

         // localStorage.clear()
         // window.location.href='/'
        // return MessageBoard.displayMsg(e);
      })

    }
//}

}






function WarLockAdmin(previledges,roleName,permName){

// window.addEventListener('load',()=>{
  document.getElementById('gtd').style.display='none';

  if(localStorage.getItem('userToken')){



      if(true){

      let previledgesA =previledges;



      if(previledgesA[0][roleName]!='yes'){

        window.location.href="/previledges-denied"
        document.getElementById('gtd').style.display='block'
       // return "no"
      }else{
        document.getElementById('gtd').style.display='block'
        //return "yes"
      }


      if(previledgesA[0][permName]!='yes'){

         $("a.btn").hide()



      }

      if(previledgesA[0].status!='Active'){
        window.location.href="/previledges-denied"
        document.getElementById('gtd').style.display='block';

        setTimeout(()=>{
           localStorage.clear();
        },2000)



       }

    }

    // })

  }

}








function sanitize(strings, ...values) {
    const dirty = strings.reduce((prev, next, i) => `${prev}${next}${values[i]} || ''}`, '');
    return DomPurify.sanitize(dirty);
}

function createBookingSet(postUrl, userPlanItineries){
  let user = JSON.parse(localStorage.getItem('userToken'))


  fetch(postUrl, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Headers': 'x-access-token',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      mode: 'cors',
      body: JSON.stringify(userPlanItineries),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 201) {
          //MessageBoard.displayMsg('Form submitted succesfully');
          var notification = alertify.notify('succesfully created itinerary.', 'success', 5, function(){  console.log('dismissed'); });


            AuditTrail.sendLogInfo(user,userPlanItineries.username, 'BOOKINGS Module', 'Success', '201', 'POST','User Bookings created for ' + userPlanItineries.username)







        } else if (data.status === 401 || data.status === 403) {
           AuditTrail.sendLogInfo(user, userPlanItineries.username, 'BOOKINGS Module', 'Failed', '403', 'POST','Failed to create booking for ' + userPlanItineries.username)

          window.location.href = './';
        } else {
          //MessageBoard.displayMsg(data.error);
           AuditTrail.sendLogInfo(user, userPlanItineries.username, 'BOOKINGS Module', 'Failed', '400', 'POST','Failed to create booking')

          var notification = alertify.notify('Error in posting data.', 'error', 5, function(){  console.log('dismissed'); });

        }
      })
      .catch(error => {
        throw error;
      });
}



function createQuotations(postUrl, userqUOTA){
  let user = JSON.parse(localStorage.getItem('userToken'))


  fetch(postUrl, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Headers': 'x-access-token',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      mode: 'cors',
      body: JSON.stringify(userqUOTA),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 201) {
          //MessageBoard.displayMsg('Form submitted succesfully');
          var notification = alertify.notify('succesfully created quotation.', 'success', 5, function(){  console.log('dismissed'); });
          AuditTrail.sendLogInfo(user,userqUOTA.username, 'BOOKINGS > QUOTATIONS', 'Success', '201', 'POST','Quotation created for ' + userqUOTA.username)




        } else if (data.status === 401 || data.status === 403) {
          AuditTrail.sendLogInfo(user,userqUOTA.username, 'BOOKINGS > QUOTATIONS', 'Failed', '201', 'POST', 'Failed to create Quotation for '+ userqUOTA.username)



          window.location.href = './';
        } else {
          AuditTrail.sendLogInfo(user,userqUOTA.username, 'BOOKINGS > QUOTATIONS', 'Failed', '201', 'POST', 'Failed to create quotation '+ userqUOTA.username)



          //MessageBoard.displayMsg(data.error);
          var notification = alertify.notify('Error in posting quotation.', 'error', 5, function(){  console.log('dismissed'); });

        }
      })
      .catch(error => {
        throw error;
      });
}


function BookingValidationFails(planItineries){
  let validationFails = false;

    const {

              plan_category,
              plan_name,
              status,
               certificate_id,
               start_location,
               destination ,
               no_hours,
               start_time,
               end_time ,
               drive_option,
               user_id,
               travel_option,
              carsSelected,
               drivingschool,
               username,
               email,
               phone_number
            } = planItineries;

      if(start_location.length<= 0){
         validationFails = true;
         console.log("location err")
         var notification = alertify.notify('location is required', 'error', 5, function(){  console.log('dismissed'); });

      }

      if(username.length<= 0){
         validationFails = true;
         console.log("location err")
         var notification = alertify.notify('username is required', 'error', 5, function(){  console.log('dismissed'); });

      }

      if(email.length<= 0){
         validationFails = true;
         console.log("location err")
         var notification = alertify.notify('email is required', 'error', 5, function(){  console.log('dismissed'); });

      }

      if(phone_number.length<= 0){
         validationFails = true;
         console.log("location err")
         var notification = alertify.notify('phone is required', 'error', 5, function(){  console.log('dismissed'); });

      }

      if(destination.length<=0){
        validationFails = true;
        console.log("dest err")
         var notification = alertify.notify('destination is required', 'error', 5, function(){  console.log('dismissed'); });

      }

      if(start_time.length<=0){
        validationFails = true;
       // document.getElementById("msg").innerHTML="start date required"
        console.log("startdate err")
        var notification = alertify.notify('start date required', 'error', 5, function(){  console.log('dismissed'); });

      }

      if(end_time.length<=0){
        validationFails = true;
        console.log("enddate err")
        //document.getElementById("msg").innerHTML="end date is required"
        var notification = alertify.notify('end date is required', 'error', 5, function(){  console.log('dismissed'); });

      }

      if(drive_option.length<=0){
        validationFails = true;
        console.log("optD err")

         var notification = alertify.notify('drive option is required', 'error', 5, function(){  console.log('dismissed'); });

      }

      if(no_hours.length<=0){
         validationFails = true;
           var notification = alertify.notify('Duration required', 'error', 5, function(){  console.log('dismissed'); });

       }



      if(travel_option.length<=0){
        validationFails = true;
        console.log("optT err")
         var notification = alertify.notify('travel option required', 'error', 5, function(){  console.log('dismissed'); });

      }

      if(travel_option=="Select City Option"){
        validationFails =true;
        var notification = alertify.notify('Select a travel option plan', 'error', 5, function(){  console.log('dismissed'); });

      }

      if(plan_name.length<=0){
        validationFails = true
        console.log("planname err")
       var notification = alertify.notify('Select a travel option plan', 'error', 5, function(){  console.log('dismissed'); });

      }

      // if( price.length<=0){
      //   validationFails = true
      //   console.log("price err")
      //  var notification = alertify.notify('Select a travel option plan', 'error', 5, function(){  console.log('dismissed'); });

      // }

      // if(carsSelected.length<=0){
      //   validationFails =true;
      //    var notification = alertify.notify('You did not choose atleast one  of the 3 cars requested for you to create this plan.', 'error', 5, function(){  console.log('dismissed'); });

      // }
      return validationFails;



}





function postNotification(postUrl,prePostData){
	let user = JSON.parse(localStorage.getItem('userToken'))
    fetch(postUrl, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Headers': 'x-access-token',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      mode: 'cors',
      body: JSON.stringify(prePostData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 201 || data.status === 200) {
        	console.log(data)
          //MessageBoard.displayMsg('Form submitted succesfully');
          var notification = alertify.notify('Successful transaction.', 'success', 5, function(){  console.log('dismissed'); });


           AuditTrail.sendLogInfo(user,prePostData.email, 'Notification', 'Success', '201', 'POST', 'Created post notification for '+ prePostData.email)


          localStorage.setItem('urlType', postUrl);
        } else if (data.status === 401 || data.status === 403) {
           AuditTrail.sendLogInfo(user,prePostData.email, 'Notification', 'Success', '400', 'POST', 'Post Notification failed for '+ prePostData.email)

          window.location.href = './';
        } else {
           AuditTrail.sendLogInfo(user,prePostData.email, 'Notification', 'Success', '400', 'POST', 'Failed  to create Notification for '+ prePostData.email)
          //MessageBoard.displayMsg(data.error);
          var notification = alertify.notify('Failed to send notfication to user', 'error', 5, function(){  console.log('dismissed'); });

        }
      })
      .catch(error => {
        console.log(error)
        throw error;
      });
}

function updateStatus(linkOfApi, statusData){
   let user = JSON.parse(localStorage.getItem('userToken'))

	fetch(linkOfApi, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      mode: 'cors',
      body: JSON.stringify(statusData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200  || data.status==201 ) {
         var notification = alertify.notify('Successful transaction.', 'success', 5, function(){  console.log('dismissed'); });

          AuditTrail.sendLogInfo(user,'', 'Payments', 'Success', '200', 'PUT', 'status updated')
          console.log(data);
          //document.getElementById('selectStatus').options[select.selectedIndex].value = newStatus;
        } else {
          AuditTrail.sendLogInfo(user,'', 'Payments', 'Success', '200', 'PUT', 'failed to update status')

          //  //MessageBoard.displayMsg(data.error);
          var notification = alertify.notify('Failed to update payment status', 'error', 5, function(){  console.log('dismissed'); });

        }
      }).catch(e =>{
        console.log(e)
      })
}





var divState = {};
function showhide(id) {
    if (document.getElementById) {
        var divid = document.getElementById(id);
        divState[id] = (divState[id]) ? false : true;
        //close others
        for (var div in divState){
            if (divState[div] && div != id){
                document.getElementById(div).style.display = 'none';
                divState[div] = false;
            }
        }
        divid.style.display = (divid.style.display == 'block' ? 'none' : 'block');
    }
}


let activeUrl = getOnlineUrlConnection();

alertify.set('notifier','position', 'bottom-right');

window.addMethodTrigger = false;

window.getBookingId= (o) =>{
	localStorage.setItem('bookingId', o.dataset.id);
	window.location.href="./admin-booking-detail"
}


window.changeView = (pageView, data) =>{
	localStorage.setItem('data', data);

	window.location.href= "/"+ pageView;

}

console.log(new Date() + "our new date of transaction")
function getExtension(filename) {
  var parts = filename.split('.');
  return parts[parts.length - 1];
}

function isImage(filename) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'jpg':
    case 'gif':
    case 'bmp':
    case 'png':
      //etc
      return true;
  }
  return false;
}

function isVideo(filename) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'm4v':
    case 'avi':
    case 'mpg':
    case 'mp4':
      // etc
      return true;
  }
  return false;
}

window.showModalVideo = function(el){
	//modal video on click effect
			// Gets the video src from the data-src on each button
       	  	var $videoSrc;
			// $('.video-btn').click(function() {
			// 	console.log(el.dataset.src+"is the video")
			//     $videoSrc =  el.dataset.src; //$(this).data( "src" );

			//     document.getElementById("video").src =$videoSrc;


			// });

			document.getElementById(el.dataset.id).addEventListener('click', function() {
                 document.getElementById("modvideo").innerHTML =`<video class="embed-responsive-item" id="demoVideo"    controls>
                                                                         <source src="${el.dataset.src}" type="video/webm" id="video" ></source>
                                                                            Your browser does not support the video tag.
                                                                  </video>`


            });

			  $('#myModal').on('shown.bs.modal', function (e) {

			   })





			// when the modal is opened autoplay it


			// stop playing the youtube video when I close the modal
			$('#myModal').on('hide.bs.modal', function (e) {
			    // a poor man's stop video
			    // $("#video").attr('src',);
			    document.getElementById("demoVideo").pause()

			})





}

function getLast3Months() {

  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  var today = new Date();
  var last3Months = []

  for (i = 0; i < 3; i++) {
    last3Months.push(monthNames[(today.getMonth() - i)] + ' - ' +today.getFullYear()  );
  }
  return last3Months;
}




function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " "  //+ strTime;
}

window.addCloseEffect= (el)=>{
  // pageTransitionEffectClose()

  let view_id = el.dataset.id;
	let modal_view_id = document.getElementById("con-close-modal-"+ view_id);
	modal_view_id.style.display="none";
	//document.getElementById("gtd").classList.remove("overlay")

    let shown_id = "con-close-modal-"+ view_id




	const loader = document.getElementById("loader");
    loader.style.display = 'block';
    loader.style.zIndex="9999999";


    setTimeout(()=>{
      loader.style.display = 'none';
       document.getElementById("first-view").style.display="block";
    },2000)


     $('.mebox').hide();


    document.getElementById("second-view").style.display="none";



}


window.addCloseEffect2= (el)=>{
  let view_id = el.dataset.id;
  let modal_view_id = document.getElementById("con-close-modal-"+ view_id);
  modal_view_id.style.display="none";
  //document.getElementById("gtd").classList.remove("overlay")

    let shown_id = "con-close-modala-"+ view_id




  const loader = document.getElementById("loader");
    loader.style.display = 'block';
    loader.style.zIndex="9999999";


    setTimeout(()=>{
      loader.style.display = 'none';
       document.getElementById("first-view").style.display="block";
    },2000)


     $('.mebox').hide();


    document.getElementById("third-view").style.display="none";



}

const addClick = () =>{


    // $('.hello').hide()

	 addMethodTrigger = true;

   if(document.getElementById('car')){

     $('.review-car').hide()
     document.getElementById('car').src='https://Goom Logistics-bucket.s3.amazonaws.com/unnamed.jpg';
   }






   if(document.getElementById("user-id")){
      document.getElementById("user-id").innerHTML="";

       //if(document.getElementById("user-id")){
     document.getElementById("user-id").innerHTML='';
   }




   //}
	document.getElementById("add-new").addEventListener("click",(e)=>{
	 $('.mebox').hide();


  //  pageTransitionEffect()








       document.getElementById("create").style.visibility="visible";
       document.getElementById("create").style.display="block";

       // if(document.getElementById('car')){
       //    document.getElementById("create").style.disabled=true
       //     document.getElementById("create").disabled=true
       // }
	   document.getElementById("update").style.visibility="hidden";
	   //document.getElementById("delete").style.visibility="hidden";
	   document.getElementById("cancle").style.visibility="hidden";

	   let modal_view_id = document.getElementsByClassName("mebox");
	   modal_view_id[0].style.display="block";

     if(modal_view_id[0].querySelector('img')){ //car image on add should not show
      let img = modal_view_id[0].querySelector('img')
       if(img.getAttribute('title') && img.dataset.carinfo){
         img.style.display='none';
         document.getElementById('oldcar').style.display="none"
       }
     }
	   //document.getElementById("gtd").classList.add("overlay")

	   var elements = document.getElementsByTagName("input");
		for (var ii=0; ii < elements.length; ii++) {
		  if (elements[ii].type == "text") {
		    elements[ii].value = "";
		  }
		}


    if(document.getElementById("carsme")){
       $('.hello').hide()
        $('#create').hide()

   }

	   document.getElementById("first-view").style.display="none";
       document.getElementById("second-view").style.display="block";


	})






}


window.update_value_checked = (chk_bx) =>{
	chk_bx.value ="false";

        if(chk_bx.checked)
        {
           chk_bx.value="true";
        }
        else{
           chk_bx.value="false";
        }

        const user =JSON.parse(localStorage.getItem("userToken"));
        let linkOfApi = activeUrl + chk_bx.dataset.url +"/"+ chk_bx.dataset.id  ;

       let prePostData = {
       	 isVerified: chk_bx.value
       }

        fetch(linkOfApi, {
	      method: 'PUT',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	        'x-access-token': user.token,
	      },
	      body: JSON.stringify(prePostData),
	      mode:"cors",
	    })
	      .then(response => response.json())
	      .then(data => {
	      	console.log(data)
	        if (data.success === "ok") {
	         // let modal_view_id = document.getElementsByClassName("mebox");
	         // modal_view_id[0].style.display="none";
	          //document.getElementById("gtd").classList.remove("overlay")

	          var notification = alertify.notify('Successful updated of user verification ', 'success', 5, function(){  console.log('dismissed'); });

	         // ApiDeleteOneStatusRecord.redirect(recordOfType);
	        } else {

	          var notification = alertify.notify('Could not perform update operation', 'error', 5, function(){  console.log('dismissed'); });

	        }
	      }).catch(e=> console.log(e));


}


 //


window.showRetiveDetail =(el) =>{

    let view_id = el.dataset.id;


  //console.log(view_id+ "dsjdjjs")
  let modal_view_id = document.getElementById("con-close-modal-"+ view_id);
  modal_view_id.style.display="block";

  let showme ="#con-close-modal-"+ view_id

   // $('.mebox').not($(showme).closest('.mebox')).addClass('noOpacity');

   $('.mebox').not(showme).hide();



    document.getElementById("date"+view_id).value=el.dataset.date;

    document.getElementById("partner_id"+view_id).value=el.dataset.partnerid;
  document.getElementById("email"+view_id).value=el.dataset.email;
  document.getElementById("vin"+view_id).value=el.dataset.vin || 'Car has no VIN';
  document.getElementById("carname"+view_id).value=el.dataset.car;
  document.getElementById("plate_number"+view_id).value= el.dataset.plate;
  document.getElementById("carid"+view_id).value= el.dataset.carid;
  document.getElementById("description"+view_id).value= el.dataset.description;






    let id= "#status"+ view_id;
    $( id + " option").each(function () {
        if ($(this).html() == el.dataset.status) {
            $(this).attr("selected", "selected");
            return;
        }
    });








   // $('.mebox').not($(showme).closest('.mebox')).addClass('noOpacity');

   // $('.mebox').not(showme).hide();

  document.getElementById("create").style.visibility="hidden";
  document.getElementById("update").style.visibility="visible";


     document.getElementById("first-view").style.display="none";
    document.getElementById("second-view").style.display="block";



}

window.addEventEarnings = (o) =>{
  let linkOfApi = activeUrl + o.dataset.url ;
  const user =JSON.parse(localStorage.getItem("userToken"));


   let carItem = JSON.parse(localStorage.getItem('chosenCar')) || {
    name: '',
      plate_no: '',
      car_id: ''
   };

   let vehiclePlateNo = carItem.plate_no,
      vehicleId_x =carItem.car_id,
      vehicleName= carItem.name,


      paymentReference=document.getElementById("paymentReference"+ o.dataset.id).value,
      PaymentAmount= document.getElementById("PaymentAmount"+ o.dataset.id).value;
      const paymentDate = document.getElementById("paymentDate"+ o.dataset.id).value;
      const partnerBankAccount = document.getElementById("partnerBankAccount"+ o.dataset.id).value;
      //passwordConfirm =document.getElementById("confirmpassword"+ o.dataset.id).value,


    let partnerEmail='';
    const partnerId = document.getElementById("partnerId"+ o.dataset.id).value;
    const partnerEmail_x = document.getElementById("idpat-"+ o.dataset.id);

    const status_x = document.getElementById("PaymentStatus"+ o.dataset.id);

    const bnk = document.getElementById("partnerBankAccount"+ o.dataset.id);


    // document.getElementById("PaymentAmount"+ o.dataset.id).onkeyup = document.getElementById("PaymentAmount"+ o.dataset.id).onchange = enforceFloat;
    // document.getElementById("partnerBankAccount"+ o.dataset.id).onkeyup = document.getElementById("partnerBankAccount"+ o.dataset.id).onchange = enforceFloat;
    // document.getElementById('bankAccountNumber' + o.dataset.id).onkeyup = document.getElementById('bankAccountNumber' + o.dataset.id).onchange = enforceFloat;

    //     //enforce that only a float can be inputed
    // function enforceFloat() {
    //   var valid = /^\-?\d+\.\d*$|^\-?[\d]*$/;
    //   var number = /\-\d+\.\d*|\-[\d]*|[\d]+\.[\d]*|[\d]+/;
    //   if (!valid.test(this.value)) {
    //     var n = this.value.match(number);
    //     this.value = n ? n[0] : '';
    //   }
    // }

    // let vehicle = vehicleId_x.options[vehicleId_x.selectedIndex].text;
    // vehicle = vehicle.split('-');
    // vehicle = vehicle[1];



    const status = status_x.options[status_x.selectedIndex].text;
    let amt = parseInt(PaymentAmount,10);
    let prePostData =null;
     prePostData ={

              paymentDate,
              PaymentStatus:status,
              PaymentAmount: amt,
              paymentReference,
              partnerId,
              partnerEmail:partnerEmail_x.options[partnerEmail_x.selectedIndex].text,
              partnerBankAccount:{

                 bankAccount:bnk.value,
                 bankAccountNumber:document.getElementById('bankAccountNumber'+ o.dataset.id).value,
                 bankAccountName:document.getElementById('bankAccountName'+ o.dataset.id).value

              },
              vehicleId: vehicleId_x,
              vehicleName,
              vehiclePlateNo,
              email:partnerEmail,

      };


      if(partnerEmail_x.options[partnerEmail_x.selectedIndex].text=='--select--'){
        var notification = alertify.notify('Select a valid email.', 'error', 5, function(){  console.log('dismissed'); });

        return false;
      }

      // if(vehicleId_x.options[vehicleId_x.selectedIndex].text=='--select--'){
      //   var notification = alertify.notify('Select a valid email.', 'error', 5, function(){  console.log('dismissed'); });

      //   return false
      // }


      if(isNaN(amt)){

        var notification = alertify.notify('Enter a valid amount.', 'error', 5, function(){  console.log('dismissed'); });

        return false

      }

      console.log(prePostData)



  fetch(linkOfApi, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': user.token,
        },
        body: JSON.stringify(prePostData),
        mode:"cors",
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 201) {
            // modal_view_id.style.display="none";
            var notification = alertify.notify('Successfully created  partners earnings. Please wait...', 'success', 5, function(){  console.log('dismissed'); });


            AuditTrail.sendLogInfo(user,prePostData.username, 'MODULE (Partner)', 'Success', '201', 'POST', 'Partner earnings created for '+ prePostData.username)

            setTimeout(()=>{
              // window.location.reload()
            },3000)


          } else {



             AuditTrail.sendLogInfo(user,prePostData.username, 'USER ENTITY MODULE', 'Failed', '400', 'POST', 'Failed to create partner earnings for '+ prePostData.username)


            var notification = alertify.notify('Could not perform add operation.', 'error', 5, function(){  console.log('dismissed'); });

          }
        });
}

window.addEvent = (o) =>{
	let linkOfApi = activeUrl + o.dataset.url ;
	const user =JSON.parse(localStorage.getItem("userToken"));
    let firstname = document.getElementById("firstname"+ o.dataset.id).value,
    lastname =document.getElementById("lastname"+ o.dataset.id).value,
    username=document.getElementById("username"+ o.dataset.id).value,
    password=document.getElementById("password"+ o.dataset.id).value,
      //passwordConfirm =document.getElementById("confirmpassword"+ o.dataset.id).value,
    phoneNumber= document.getElementById("phone"+ o.dataset.id).value;
    let avatar = document.getElementById('file-input'+ o.dataset.id).value ;
    console.log("avatar:" + avatar)

    //
     var fullPath = avatar;
     var filename = fullPath.replace(/^.*[\\\/]/, '');
     avatar = filename;

     console.log("this pic:" + avatar)




     if(avatar){

       user.user.profile = avatar;
       document.getElementById("user-profile").src=  user.user.profile;
     }
     var oldProfile = document.getElementById("user-profile").src;
     if(!avatar){
       fullPath = oldProfile;
       filename = fullPath.replace(/^.*[\\\/]/, '');
       avatar = filename;
       user.user.profile =  avatar;  //'https://Goom Logistics-bucket.s3.amazonaws.com/'+ avatar;
       // avatar = oldProfile;
     }

     localStorage.setItem('userToken', JSON.stringify(user));

    let is_verified = false;
    let isVerified = document.getElementById("is_verified"+o.dataset.id).value;
    is_verified = isVerified;
    console.log(is_verified+ "ddsds")
    let totalCars = 1;



    const certificate = document.getElementById("certificate"+ o.dataset.id).value;
    var user_typeSelect = document.getElementById('type'+ o.dataset.id);
    const user_type = user_typeSelect.options[user_typeSelect.selectedIndex].text;
    const email = document.getElementById("email"+ o.dataset.id).value;
    const status_x = document.getElementById("status"+ o.dataset.id);
    const status = status_x.options[status_x.selectedIndex].text;
    let address='';
    let prePostData =null;
    if(document.getElementById("address"+ o.dataset.id)){
      address = document.getElementById("address"+ o.dataset.id).value;

      let bankAccount_x = document.getElementById('bankAccount'+ o.dataset.id) ;
    let bankAccountName = document.getElementById('bankAccountName'+ o.dataset.id).value ;
     let bankAccountNumber = document.getElementById('bankAccountNumber'+ o.dataset.id).value ;


      prePostData ={
          firstname,
        lastname,
        username,
        email,
        password,
        phoneNumber,
        avatar,
        certificate,
        user_type,
        status,
        address,
        is_verified,
        totalCars: 1,
        bankAccountNumber,
        bankAccountName,
        bankAccount: bankAccount_x.options[bankAccount_x.selectedIndex].text,
      };


    }else{
     prePostData ={
      	  firstname,
	      lastname,
	      username,
	      email,
	      password,
	      phoneNumber,
	      avatar,
	      certificate,
	      user_type,
	      status,
	      is_verified
      };

    }


	let view_id = o.dataset.id;
	let modal_view_id = document.getElementById("con-close-modal-"+ view_id);

    const validResult = Validator.validateSignup({...prePostData});

    if(validResult){
		fetch(linkOfApi, {
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	        'x-access-token': user.token,
	      },
	      body: JSON.stringify(prePostData),
	      mode:"cors",
	    })
	      .then(response => response.json())
	      .then(data => {
	        if (data.status === 201) {
	          modal_view_id.style.display="none";
	          var notification = alertify.notify('Successfully created  resource. Please wait...', 'success', 9, function(){  console.log('dismissed'); });


       AuditTrail.sendLogInfo(user,prePostData.username, 'USER ENTITY  MODULE(USER/DRIVER/ADMIN)', 'Success', '201', 'POST', 'User MODULE(USER/DRIVER/ADMIN) created for '+ prePostData.username)
            setTimeout(()=>{
              window.location.reload()
            },3000)


	        } else {



          AuditTrail.sendLogInfo(user,prePostData.username, 'USER ENTITY MODULE', 'Failed', '400', 'POST', 'USER ENTITY  MODULE(USER/DRIVER/ADMIN) Failed')


	          var notification = alertify.notify('Could not perform add operation. probably a duplicate field error in the field phone number', 'error', 5, function(){  console.log('dismissed'); });

	        }
	      });
	}else{
		var notification = alertify.notify('unsuccessful add operation.', 'error', 5, function(){  console.log('dismissed'); });

	}

}


window.viewRecordItinsDetail = (el) =>{

	let view_id = el.dataset.id;
	//console.log(view_id+ "dsjdjjs")
	let modal_view_id = document.getElementById("con-close-modal-"+ view_id);
	modal_view_id.style.display="block";

  let showme ="#con-close-modal-"+ view_id


  if( el.dataset.drive_option == "I would like to drive myself"){
    // alert("true")
    // $("#drive_option"+ view_id).hide()
    $("#p"+ view_id).hide()
  }

	 // $('.mebox').not($(showme).closest('.mebox')).addClass('noOpacity');

	 $('.mebox').not(showme).hide();


	  document.getElementById("first-view").style.display="none";
    document.getElementById("second-view").style.display="block";


    document.getElementById("username"+view_id).value=el.dataset.username;
	document.getElementById("drive_option"+view_id).value=el.dataset.drive_option;
	document.getElementById("email"+view_id).value=el.dataset.email;
	document.getElementById("phone_number"+view_id).value=el.dataset.phone_number;
	document.getElementById("travel_option"+view_id).value= el.dataset.travel_option;
	document.getElementById("no_hours"+view_id).value= el.dataset.no_hours;
	document.getElementById("start_location"+view_id).value= el.dataset.start_location;
	document.getElementById("destination"+view_id).value= el.dataset.destination;
	document.getElementById("start_time"+view_id).value= el.dataset.start_time;
	document.getElementById("end_time"+view_id).value= el.dataset.end_time;

  //let chosenDriver =








    let id= "#status"+ view_id;
    $( id + " option").each(function () {
        if ($(this).html() == el.dataset.status) {
            $(this).attr("selected", "selected");
            return;
        }
    });






    let idz='#assigned_driver'+ view_id;
    $( idz + " option").each(function () {

       // alert('hello')
        let checkmate = el.dataset.checkmate
        // console.log(checkmate)
       //alert(checkmate)
       //alert($(this).html())
        if ($(this).html() == checkmate ) {
          // alert('yes check mate'+ $(this).html() )
            $(this).attr("selected", "selected");
            return;
        }
    });

     mapRoutes(el.dataset.start_location,el.dataset.destination)






}

window.updateRecordItins = (o) =>{

		let linkOfApi = activeUrl + o.dataset.url  +"/"+ o.dataset.id;
    const view_id = o.dataset.id;


    let id= "#status"+ view_id;
    $( id + " option").each(function () {
        if ($(this).html() == o.dataset.status) {
            $(this).attr("selected", "selected");
            return;
        }
    });


   let idz= "#assigned_driver"+ view_id;
    $( idz + " option").each(function () {


        let checkmate = $(this).data("username") + '- '+ $(this).data("email")
        // console.log(checkmate)
        // alert(checkmate)
        if ($(this).html() == checkmate) {
            $(this).attr("selected", "selected");
            return;
        }
    });





	const status_x = document.getElementById("status"+ view_id);
    const status = status_x.options[status_x.selectedIndex].text;
     let drivers = "Nil";
     let driv ='NIL'
     if(document.getElementById('assigned_driver'+ view_id)){
       drivers = document.getElementById('assigned_driver'+ view_id);
      driv = drivers.options[drivers.selectedIndex].text.split('-')
     }


    let  prePostData;



    if(document.getElementById("drive_option"+view_id).value=="I would like to drive myself"){
      prePostData = {

        status,

        assigned_driver_id: "Self Driven"+ Math.random(1,943332),
       assigned_driver_name: "Self Driven",
        assigned_driver_email: "Self Driven",
        assigned_driver_phone: "Self Driven",
      };
    }else{



      // if(document.getElementById("drive_option"+view_id)){
      if(drivers.options[drivers.selectedIndex].text=='--Please select a driver--'){
        var notification = alertify.notify('Select a driver', 'error', 5, function(){  console.log('dismissed'); });

       return false;
      // }

     }




      prePostData = {

        status,

        assigned_driver_id: drivers.options[drivers.selectedIndex].getAttribute('id') || "NIL",
       assigned_driver_name: driv[0] ||   "NIL",
        assigned_driver_email: driv[1]  || "NIL",
        assigned_driver_phone: drivers.options[drivers.selectedIndex].value  || "NIL",
      };


    }















    const user =JSON.parse(localStorage.getItem("userToken"));





		fetch(linkOfApi, {
	      method: 'PUT',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	        'x-access-token': user.token,
	      },
	      body: JSON.stringify(prePostData),
	      mode:"cors",
	    })
	      .then(response => response.json())
	      .then(data => {
	      	console.log(data)
	        if (data.status) {
	          let modal_view_id = document.getElementsByClassName("mebox");
	          modal_view_id[0].style.display="none";
	          //document.getElementById("gtd").classList.remove("overlay")

	          var notification = alertify.notify('Itinerary update successful. ', 'success', 5, function(){  console.log('dismissed'); });
	              window.location.reload();




          AuditTrail.sendLogInfo(user,prePostData.assigned_driver_name, 'ITINERARY MODULE (DRIVER ASSIIGNMENT)', 'Success', '201', 'POST', 'Itinerary Assignment created')

	        } else {
	           AuditTrail.sendLogInfo(user,prePostData.assigned_driver_name, 'ITINERARY MODULE (DRIVER ASSIIGNMENT)', 'Success', '400', 'POST','Itinerary failed to assign driver')



	          var notification = alertify.notify('Could not perform update operation', 'error', 5, function(){  console.log('dismissed'); });

	        }
	      }).catch(e=> console.log(e));


}

window.viewRecordWalletTransactions = (el)=>{

	console.log("was clicked")


  //fetch the user profile by email

  //set the old balance
  setUserdetail(el.dataset.email,el,true);
	let view_id = el.dataset.id;
	let modal_view_id = document.getElementById("con-close-modal-"+ view_id);
	modal_view_id.style.display="block";

	let showme ="#con-close-modal-"+ view_id

	 // $('.mebox').not($(showme).closest('.mebox')).addClass('noOpacity');

	 $('.mebox').not(showme).hide();


	  document.getElementById("first-view").style.display="none";
    document.getElementById("second-view").style.display="block";


	document.getElementById("username"+view_id).value=el.dataset.username;
	document.getElementById("reference"+view_id).value=el.dataset.reference;
	document.getElementById("email"+view_id).value=el.dataset.email;
	// document.getElementById("phone_number"+view_id).value=el.dataset.phone_number;
	document.getElementById("quotation_id"+view_id).value= el.dataset.quotation_id;

	document.getElementById("plan_id"+view_id).value= el.dataset.plan_id;
	if(document.getElementById("date"+view_id)){
		document.getElementById("date"+view_id).value= el.dataset.date;
	}


	if(document.getElementById("username"+view_id)){
		document.getElementById("username"+view_id).value= el.dataset.username;
	}


	if(document.getElementById("amount"+view_id)){
		document.getElementById("amount"+view_id).value= el.dataset.amount;
	}


	if(true){//wallet

	}


	let id= "#status"+ el.dataset.id;
    $( id + " option").each(function () {
        if ($(this).html() == el.dataset.status) {
            $(this).attr("selected", "selected");
            return;
        }
    });


}


window.updateRecordView = (el)=>{

  window.addMethodTrigger = false;

  localStorage.setItem('prologId',el.dataset.id)

	let view_id = el.dataset.id;
	let modal_view_id = document.getElementById("con-close-modal-"+ view_id);
	modal_view_id.style.display="block";
	//document.getElementById("gtd").classList.add("overlay")
	let showme ="#con-close-modal-"+ view_id

	 // $('.mebox').not($(showme).closest('.mebox')).addClass('noOpacity');

	 $('.mebox').not(showme).hide();

	   document.getElementById("create").style.visibility="hidden";
	document.getElementById("update").style.visibility="visible";
	//document.getElementById("delete").style.visibility="visible";
	document.getElementById("cancle").style.visibility="visible";

	document.getElementById("firstname"+view_id).value=el.dataset.firstname;
	document.getElementById("lastname"+view_id).value=el.dataset.lastname;
	document.getElementById("email"+view_id).value=el.dataset.email;
	document.getElementById("phone"+view_id).value=el.dataset.phone;
	document.getElementById("certificate"+view_id).value= el.dataset.certificate;
  document.getElementById("certificate"+view_id).style.disabled=true

	document.getElementById("username"+view_id).value= el.dataset.username;


	document.getElementById("preview"+view_id).src = el.dataset.avatar;

	let is_verified = false;
    let isVerified = document.getElementById("is_verified"+el.dataset.id).value;
    is_verified = isVerified;
    //console.log(el.dataset.isverified)

    let me = JSON.parse(localStorage.getItem('userToken'))
       if(me.user.roles=='Super Admin'){

        document.getElementById("is_verified"+el.dataset.id).disabled=false
      }else{
        document.getElementById("is_verified"+el.dataset.id).disabled=true
      }

    if(el.dataset.isverified=="true"){
    	console.log(el.dataset.isverified)
        var element = document.getElementById("is_verified"+el.dataset.id);
        element.checked = 1;

    }

    let id= "#status"+ el.dataset.id;
    $( id + " option").each(function () {
        if ($(this).html() == el.dataset.status) {
            $(this).attr("selected", "selected");
            return;
        }
    });


    if(document.getElementById("type"+ el.dataset.id)){




        let idz= "#type"+ el.dataset.id;
        $( idz + " option").each(function () {
            if ($(this).html() == el.dataset.roles) {
                $(this).attr("selected", "selected");
                return;
            }
        });

         if(me.user.roles=='Super Admin'){

        document.getElementById("type"+ el.dataset.id).disabled=false
      }else{
        document.getElementById("type"+ el.dataset.id).disabled=true
      }

  }


    let totalCars=0;
	if(document.getElementById("address"+view_id)){
      let usern = el.dataset.firstname;
      if(usern.indexOf(' ')){
        usern = usern.split(' ');
        document.getElementById("firstname"+view_id).value = usern[0];
        document.getElementById("lastname"+view_id).value = usern[1] || usern[0];

      }


      let idza= "#bankAccount"+ el.dataset.id;
    $( idza + " option").each(function () {
        if ($(this).html() == el.dataset.bankaccount) {
            $(this).attr("selected", "selected");
            return;
        }
    });


      // document.getElementById('bankAccount'+ view_id).value = el.dataset.bankAccount;
    document.getElementById('bankAccountName'+ view_id).value = el.dataset.bankaccountname;
document.getElementById('bankAccountNumber'+ view_id).value = el.dataset.bankaccountnumber;





     if(el.dataset.address=='undefined'){
      document.getElementById("address"+ view_id).value=  'Enter your address';
     }

     document.getElementById("address"+ view_id).value= el.dataset.address ||  'Enter your address';


    }

    if( document.getElementById("totalCars"+ view_id)){
      document.getElementById("totalCars"+ view_id).value = el.dataset.totalcars;
    }

    document.getElementById("first-view").style.display="none";
    document.getElementById("second-view").style.display="block";

    if(addMethodTrigger==false){
       document.getElementById("user-id").innerHTML="CMT-USER-"+ view_id.substring(-12,view_id.length);

    }else{
    	document.getElementById("user-id").innerHTML="";

    }


}



window.updateRecordViewEarnings = (el)=>{

   //alert('heap')





  window.addMethodTrigger = false;

  let view_id = el.dataset.id;
  let modal_view_id = document.getElementById("con-close-modal-"+ view_id);
  modal_view_id.style.display="block";
  //document.getElementById("gtd").classList.add("overlay")
  let showme ="#con-close-modal-"+ view_id

   // $('.mebox').not($(showme).closest('.mebox')).addClass('noOpacity');

   $('.mebox').not(showme).hide();


   $('.hello').show()

   $('#carset').hide()








     document.getElementById("create").style.visibility="hidden";
  document.getElementById("update").style.visibility="visible";
  //document.getElementById("delete").style.visibility="visible";
  document.getElementById("cancle").style.visibility="visible";

  // document.getElementById("PartnerEmail"+view_id).value=el.dataset.partneremail;
  document.getElementById("paymentDate"+view_id).value=el.dataset.paymentdate;
  document.getElementById("vehiclePlateNo"+view_id).value=el.dataset.vehicleplateno;
  document.getElementById("vehicleId"+view_id).value=el.dataset.vehicleid;
  document.getElementById("partnerId"+view_id).value=el.dataset.partnerid;
  document.getElementById("partnerBankAccount"+view_id).value= el.dataset.partnerbankaccount;
  // document.getElementById("PaymentAmount"+view_id).style.disabled=true
  document.getElementById("PaymentAmount"+view_id).value= el.dataset.paymentamount;

 document.getElementById("paymentReference"+view_id).value=el.dataset.paymentreference;
  document.getElementById("vehicleName"+view_id).value=el.dataset.vehiclename;

  document.getElementById("bankAccountNumber"+view_id).value=el.dataset.bankaccountnumber;
document.getElementById("bankAccountName"+view_id).value=el.dataset.bankaccountname;

    //console.log(el.dataset.isverified)

    let me = JSON.parse(localStorage.getItem('userToken'))


    let id= "#PaymentStatus"+ el.dataset.id;
    $( id + " option").each(function () {
        if ($(this).html() == el.dataset.status) {
            $(this).attr("selected", "selected");
            return;
        }
    });


    let id3= "#PaymentStatus"+ el.dataset.id;
    $( id3 + " option").each(function () {
        if ($(this).html() == el.dataset.partneremail) {
            $(this).attr("selected", "selected");
            return;
        }
    });


    let idxz= "#idpat-"+view_id;
    $( idxz + " option").each(function () {
        if ($(this).html() == el.dataset.partneremail) {
            $(this).attr("selected", "selected");
            return;
        }
    });





  document.getElementById("first-view").style.display="none";
       document.getElementById("second-view").style.display="block";




$('h1.spacing').on('mouseenter', function(){
  $(this).toggleClass('spaced');
});






}


window.viewPlan = (el)=>{
	let view_id = el.dataset.id;
	let modal_view_id = document.getElementById("con-close-modal-"+ view_id);
	modal_view_id.style.display="block";
	//document.getElementById("gtd").classList.add("overlay")

	let showme ="#con-close-modal-"+ view_id

	 // $('.mebox').not($(showme).closest('.mebox')).addClass('noOpacity');

	 $('.mebox').not(showme).hide();

	document.getElementById("create").style.visibility="hidden";
	document.getElementById("update").style.visibility="visible";
	document.getElementById("delete").style.visibility="visible";
	document.getElementById("cancle").style.visibility="visible";

	// const plan =document.getElementById("plan"+view_id);
	// plan.value =el.dataset.plan;

	const plan_select =document.getElementById("plan"+view_id);

    const plan =plan_select.options[plan_select.selectedIndex].text;
	const category =document.getElementById("category"+view_id)
	category.value=el.dataset.category;
	const price =document.getElementById("price"+view_id);
	price.value=el.dataset.price;
	const description =document.getElementById("description"+view_id)
	description.value=el.dataset.description;
	const max_cars =document.getElementById("max_car"+view_id)
	max_cars.value= el.dataset.max_car;
	//const status_x = document.getElementById("status"+ view_id);
    //const status = status_x.options[status_x.selectedIndex].text;


    let id= "#status"+ view_id;
    $( id + " option").each(function () {
        if ($(this).html() == el.dataset.status) {
            $(this).attr("selected", "selected");
            return;
        }
    });


    let idz= "#plan"+ view_id;
    $( idz + " option").each(function () {
        if ($(this).html() == el.dataset.plan) {
            $(this).attr("selected", "selected");
            return;
        }
    });




    // $("#plan"+view_id).on('change', function(e) {
		  //     let selector = $(this).val();
		  //     $("#changelings > option").hide();
		  //     $("#changelings > option").filter(function(){return $(this).data('pub') == selector}).show();
    //   });



    document.getElementById("user-id").innerHTML="CMT-PLAN-"+ view_id.substring(-5,view_id.length);




     document.getElementById("first-view").style.display="none";
    document.getElementById("second-view").style.display="block";







}

window.updatePlanData = (o) =>{
	let linkOfApi = activeUrl + o.dataset.url  +"/"+ o.dataset.id;
    const view_id = o.dataset.id;


    const plan_select =document.getElementById("plan"+view_id);

	const plan =plan_select.options[plan_select.selectedIndex].text;


	const category =document.getElementById("category"+view_id).value

	const price =document.getElementById("price"+view_id).value;

	const description =document.getElementById("description"+view_id).value

	const max_cars =document.getElementById("max_car"+view_id).value

	const status_x = document.getElementById("status"+ view_id);
    const status = status_x.options[status_x.selectedIndex].text;


    const prePostData = {
    	plan_name: plan,
    	plan_categories: category,
    	price: price,
    	description: description,
    	max_car: max_cars,
    	status
    };







    const user =JSON.parse(localStorage.getItem("userToken"));

    const validResult = Validator.validatePlanPost({...prePostData});

    console.log(validResult+ "update error")

        if(validResult){
		fetch(linkOfApi, {
	      method: 'PUT',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	        'x-access-token': user.token,
	      },
	      body: JSON.stringify(prePostData),
	      mode:"cors",
	    })
	      .then(response => response.json())
	      .then(data => {
	      	console.log(data)
	        if (data.success === "ok") {
	          let modal_view_id = document.getElementsByClassName("mebox");
	          modal_view_id[0].style.display="none";
	          //document.getElementById("gtd").classList.remove("overlay")

	          var notification = alertify.notify('Successfully updated plan ', 'success', 5, function(){  console.log('dismissed'); });


             AuditTrail.sendLogInfo(user,prePostData.plan_name, 'PLAN CATEGORY ', 'Success', '201', 'POST', 'Plan category created for '+ prePostData.plan_name)




                window.location.reload();

	         // ApiDeleteOneStatusRecord.redirect(recordOfType);
	        } else {

             AuditTrail.sendLogInfo(user,prePostData.plan_name, 'PLAN CATEGORY', 'FAILED', '400', 'POST', 'Failed to create plan category')


	          var notification = alertify.notify('Could not perform update operation. Ensure the plan selected is correct.', 'error', 5, function(){  console.log('dismissed'); });

	        }
	      }).catch(e=> console.log(e));
	 }else{
	 	var notification = alertify.notify('unsuccessful update operation', 'error', 5, function(){  console.log('dismissed'); });

	 }
}


window.viewRecordSettings = (el)=>{
	let view_id = el.dataset.id;
	let modal_view_id = document.getElementById("con-close-modal-"+ view_id);
	modal_view_id.style.display="block";
	//document.getElementById("gtd").classList.add("overlay")


	let showme ="#con-close-modal-"+ view_id

	 // $('.mebox').not($(showme).closest('.mebox')).addClass('noOpacity');

	 $('.mebox').not(showme).hide();

	document.getElementById("create").style.visibility="hidden";
	document.getElementById("update").style.visibility="visible";
	document.getElementById("delete").style.visibility="visible";
	document.getElementById("cancle").style.visibility="visible";
	// const plan =document.getElementById("plan"+view_id);
    //    const plan =plan_select.options[plan_select.selectedIndex].text;


    document.getElementById("api_mode"+view_id).value=el.dataset.app_mode;
	document.getElementById("test_secret_key"+view_id).value=el.dataset.test_secret_key;
	document.getElementById("test_public_key"+view_id).value=el.dataset.test_public_key;
	document.getElementById("live_secret_key"+view_id).value= el.dataset.live_secret_key;
	document.getElementById("live_public_key"+view_id).value= el.dataset.live_public_key;


    document.getElementById("user-id").innerHTML="CMT-API-"+ view_id.substring(-5,view_id.length);

     document.getElementById("first-view").style.display="none";
    document.getElementById("second-view").style.display="block";
}

window.updateRecordSettings = (o) =>{

	let linkOfApi = activeUrl + o.dataset.url  +"/"+ o.dataset.id  ;
    const view_id = o.dataset.id;
    const type = o.dataset.type;
    let prePostData = null;

	const status_x = document.getElementById("api_mode"+ view_id);
    const api_mode = status_x.options[status_x.selectedIndex].text;


    const test_secret_key = document.getElementById("test_secret_key"+view_id).value;
	const test_public_key = document.getElementById("test_public_key"+view_id).value;
	const live_secret_key = document.getElementById("live_secret_key"+view_id).value;
	const live_public_key = document.getElementById("live_public_key"+view_id).value;


    const user =JSON.parse(localStorage.getItem("userToken"));

    prePostData = {
    	test_secret_key,
    	test_public_key,
    	live_public_key,
    	live_secret_key,
    	api_mode,
    	type

    }



		fetch(linkOfApi, {
	      method: 'PUT',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	        'x-access-token': user.token,
	      },
	      body: JSON.stringify(prePostData),
	      mode:"cors",
	    })
	      .then(response => response.json())
	      .then(data => {
	      	console.log(data)
	        if (data.success === "ok") {
	          let modal_view_id = document.getElementsByClassName("mebox");
	          modal_view_id[0].style.display="none";
	          //document.getElementById("gtd").classList.remove("overlay")

	          var notification = alertify.notify('Successful updated ', 'success', 5, function(){  console.log('dismissed'); });
	              window.location.reload();
	         // ApiDeleteOneStatusRecord.redirect(recordOfType);

           AuditTrail.sendLogInfo(user,'', 'API SETTINGS', 'Success', '200', 'POST', 'Settings update')

	        } else {

	          var notification = alertify.notify('Could not perform update operation', 'error', 5, function(){  console.log('dismissed'); });
            AuditTrail.sendLogInfo(user,'', 'API SETTINGS', 'FAILED', '400', 'POST', 'Update failed for settings')

	        }
	      }).catch(e=> console.log(e));


}



window.viewCarRecordTemplate = (el)=>{
	let view_id = el.dataset.id;
	let modal_view_id = document.getElementById("con-close-modal-"+ view_id);
	modal_view_id.style.display="block";

  localStorage.setItem('carId',el.dataset.id)
	//document.getElementById("gtd").classList.add("overlay")

	let showme ="#con-close-modal-"+ view_id


	 // $('.mebox').not($(showme).closest('.mebox')).addClass('noOpacity');

	 $('.mebox').not(showme).hide();

	document.getElementById("create").style.visibility="hidden";
	document.getElementById("update").style.visibility="visible";
	document.getElementById("delete").style.visibility="visible";
	document.getElementById("cancle").style.visibility="visible";




    // document.getElementById("model"+view_id).value=el.dataset.model;


	document.getElementById("plate_number"+view_id).value=el.dataset.plate_number || '';
	document.getElementById("car_year"+view_id).value=el.dataset.car_year || "";
	// document.getElementById("car_type"+view_id).value= el.dataset.car_type;
	document.getElementById("color"+view_id).value= el.dataset.color || '';

	document.getElementById("description"+view_id).value= el.dataset.description || '';
	document.getElementById("inspection_detail"+view_id).value= el.dataset.inspection_detail || '';
    document.getElementById("partner_id"+view_id).value= el.dataset.partner_id || '';

 document.getElementById("car_model_trim"+view_id).value= el.dataset.trim || '';
document.getElementById("car_model_name"+view_id).value= el.dataset.model || '';
  document.getElementById("car_model_id"+view_id).value= el.dataset.model_make_id || '';


 document.getElementById("inputLicense"+view_id).value= el.dataset.license || '';
document.getElementById("inspection_date"+ view_id).value=el.dataset.inspection_date || '';
document.getElementById("inspection_time"+ view_id).value= el.dataset.inspection_time || '';


document.getElementById("tin"+ view_id).value= el.dataset.tin || '';


document.getElementById('car').src=el.dataset.old_car
    let id= "#status"+ el.dataset.id;
    $( id + " option").each(function () {
        if ($(this).html() == el.dataset.status) {
            $(this).attr("selected", "selected");
            return;
        }
    });


     let ida= "#health_status"+ el.dataset.id;
    $( ida + " option").each(function () {
        if ($(this).html() == el.dataset.health_status) {
            $(this).attr("selected", "selected");
            return;
        }
    });


    let ida3= "#car_status"+ el.dataset.id;
    $( ida3 + " option").each(function () {
        if ($(this).html() == el.dataset.car_status) {
            $(this).attr("selected", "selected");
            return;
        }
    });



     let id2= "#partner_id"+ view_id;
    $( id2 + " option").each(function () {
        if ($(this).attr('id') == el.dataset.partner_id) {
            $(this).attr("selected", "selected");
            return;
        }else{
           // $(this).html('owned by company')
        }
    });

    //  let id4= "#car_model_make"+ view_id;
    // $( id4 + " option").each(function () {
    //     if ($(this).html() == el.dataset.model_make_id) {
    //         $(this).attr("selected", "selected");
    //         return;
    //     }
    // });

    //  let id3= "#car_type"+ view_id;
    // $( id3 + " option").each(function () {
    //     if ($(this).html() == el.dataset.car_type) {
    //         $(this).attr("selected", "selected");
    //         return;
    //     }
    // });

    let idz='#drivers'+ view_id;
    $( idz + " option").each(function () {


        let checkmate = el.dataset.checkmate
        // console.log(checkmate)
       //alert(checkmate)
       //alert($(this).html())
        if ($(this).html() == checkmate ) {
           // alert('yes check mate'+ $(this).html() )
            $(this).attr("selected", "selected");
            return;
        }
    });

     document.getElementById("first-view").style.display="none";
    document.getElementById("second-view").style.display="block";
}

window.updateCarRecordTemplate = (o) =>{

	let linkOfApi = activeUrl + o.dataset.url  +"/"+ o.dataset.id  ;
  const view_id = o.dataset.id;
  const type = o.dataset.type;

  const oldcar = o.dataset.old_car

  console.log(oldcar+ 'heello')

  // alert(oldcar)




	const user =JSON.parse(localStorage.getItem("userToken"));




         const status_x = document.getElementById("status"+ o.dataset.id);
  const health_x = document.getElementById("health_status"+ o.dataset.id);
  const car_status_x = document.getElementById("car_status"+ o.dataset.id);








    const model_make = document.getElementById("car_model_make" + o.dataset.id);

    const model_make_id = document.getElementById("car_model_id" + o.dataset.id);

    const car_model = document.getElementById("car_model_name" + o.dataset.id);

    const car_model_trim = document.getElementById("car_model_trim" + o.dataset.id)

    const car_year = document.getElementById("car_year" + o.dataset.id)

    const color = document.getElementById("color" + o.dataset.id)

    const plate_number = document.getElementById("plate_number" + o.dataset.id)



    const drivers = document.getElementById("drivers" + o.dataset.id)

    const description = document.getElementById("description" + o.dataset.id)

    const license = document.getElementById("inputLicense" + o.dataset.id)

    const partner_id_x = document.getElementById("partner_id" + o.dataset.id);
    let partid = partner_id_x.options[partner_id_x.selectedIndex]
    const inspection_detail = document.getElementById("inspection_detail" + o.dataset.id)
    let driv = drivers.options[drivers.selectedIndex].text.split('-')


    const inspectionDate = document.getElementById("inspection_date" + o.dataset.id).value

    const inspectionTime = document.getElementById("inspection_time" + o.dataset.id).value
    let vehicleIdentificationNumber =  document.getElementById("tin"+ o.dataset.id).value;



    let avatar = document.getElementById('image-file'+ o.dataset.id).value ;


    var fullPath = avatar;
    var filename = fullPath.replace(/^.*[\\\/]/, '');





     let images =''
     if(filename.length>0){
       avatar ='https://Goom Logistics-bucket.s3.amazonaws.com/'+ filename;

       images = avatar;

     }

     if(avatar.length<=0){
       images = oldcar;
        //var notification = alertify.notify('Upload an image for the car', 'error', 5, function(){  console.log('dismissed'); });

      // return false;
     }

     if( status_x.options[status_x.selectedIndex].text =='--Select Status--'){
       var notification = alertify.notify('Status required', 'error', 5, function(){  console.log('dismissed'); });

      return false;
     }

     if( status_x.options[status_x.selectedIndex].text =='--Select Status--'){
       var notification = alertify.notify('Status required', 'error', 5, function(){  console.log('dismissed'); });

      return false;
     }

     if( status_x.options[status_x.selectedIndex].text =='--Select Status--'){
       var notification = alertify.notify('Status required', 'error', 5, function(){  console.log('dismissed'); });

      return false;
     }

          if( status_x.options[status_x.selectedIndex].text =='--Select Status--'){
       var notification = alertify.notify('Status required', 'error', 5, function(){  console.log('dismissed'); });

      return false;
     }

     if( health_x.options[health_x.selectedIndex].text =='--Select Status--'){
       var notification = alertify.notify('Status required', 'error', 5, function(){  console.log('dismissed'); });

      return false;
     }

     if( car_status_x.options[car_status_x.selectedIndex].text =='--Select Status--'){
       var notification = alertify.notify('Status required', 'error', 5, function(){  console.log('dismissed'); });

      return false;
     }


      let partEmail = partid.text.split('-');
      partEmail = partEmail[1];


    const prePostData = {
      color: color.value,
      model: car_model.value,
      status: status_x.options[status_x.selectedIndex].text,
      health_status: health_x.options[health_x.selectedIndex].text,
      car_status: car_status_x.options[car_status_x.selectedIndex].text,

      car_type: model_make_id.value,
      car_model: car_model.value,
      description: description.value,
      car_year: car_year.value,
      assigned_driver_name: driv[0],
      assigned_driver_email: driv[1],
      assigned_driver_phone: drivers.options[drivers.selectedIndex].value,
      partner_id: partid.getAttribute('id'),
      inspection_detail: inspection_detail.value,
      plate_number: plate_number.value,
      license: license.value,
      assigned_driver_id: drivers.options[drivers.selectedIndex].getAttribute('id'),
      images:images,
      inspectionDate,
      inspectionTime,
      vehicleIdentificationNumber,



      car: {

  car_name:model_make.options[model_make.selectedIndex].text,

model_id:  model_make_id.value ,

model_make_id:model_make_id.value,

model_name:car_model.value,

model_trim:car_model_trim.value,

model_year:car_year.value,

manufacturer:'',



},


carModel:car_model.value,

carYear:car_year.value,

vehicleColor:color.value,

plateNo:plate_number.value,

// inspectionDate: new Date(),

// inspectionTime: new Date(),

carDescription:description.value,

imagePath: images,

creator:partid.getAttribute('id'),

date_created:new Date(),
partnerEmail:  partEmail,


    };





    console.log(prePostData)






		fetch(linkOfApi, {
	      method: 'PUT',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	        'x-access-token': user.token,
	      },
	      body: JSON.stringify(prePostData),
	      mode:"cors",
	    })
	      .then(response => response.json())
	      .then(data => {
	      	console.log(data)
	        if (data.status==200) {
	          let modal_view_id = document.getElementsByClassName("mebox");
	          modal_view_id[0].style.display="none";
	          //document.getElementById("gtd").classList.remove("overlay")

	          var notification = alertify.notify('Successful updated ', 'success', 5, function(){  console.log('dismissed'); });
	              setTimeout(()=>{
                    window.location.reload();
                },4000)

                 AuditTrail.sendLogInfo(user,'', 'CARS MANAGEMENT', 'Success', '200', 'PUT', 'Car record  successfully updated for '+ prePostData.car_name)

	         // ApiDeleteOneStatusRecord.redirect(recordOfType);
	        } else {

             AuditTrail.sendLogInfo(user,'', 'CARS MANAGEMENT', 'Failed', '400', 'PUT','Failed to create car')

	          var notification = alertify.notify('Could not perform update operation', 'error', 5, function(){  console.log('dismissed'); });

	        }
	      }).catch(e=> console.log(e));


}



window.viewRecordTemplate = (el)=>{
	window.addMethodTrigger = false;
	let view_id = el.dataset.id;
	let modal_view_id = document.getElementById("con-close-modal-"+ view_id);
	modal_view_id.style.display="block";
	//document.getElementById("gtd").classList.add("overlay")

	let showme ="#con-close-modal-"+ view_id

	 // $('.mebox').not($(showme).closest('.mebox')).addClass('noOpacity');

	 $('.mebox').not(showme).hide();



	document.getElementById("create").style.visibility="hidden";
	document.getElementById("update").style.visibility="visible";
	document.getElementById("delete").style.visibility="visible";
	document.getElementById("cancle").style.visibility="visible";
	// const plan =document.getElementById("plan"+view_id);
    //    const plan =plan_select.options[plan_select.selectedIndex].text;

    if(document.getElementById("subject"+view_id)){ //tickets

    document.getElementById("date"+view_id).value=el.dataset.date;


	document.getElementById("user_id"+view_id).value=el.dataset.username;
	document.getElementById("ticket_id"+view_id).value='CMT-RECORD-'+view_id.substring(-12,view_id.length);
	document.getElementById("subject"+view_id).value=el.dataset.subject;
	document.getElementById("comment"+view_id).value= el.dataset.comment;
	document.getElementById("username"+view_id).value=el.dataset.username;
	//document.getElementById("email"+view_id).value=el.dataset.email;

  let idz2= "#email"+ view_id;
   $(idz2).empty()
  $(idz2).append(`<option>${el.dataset.email}</option>`)
  document.getElementById("email"+view_id).disabled=true



        let id= "#status"+ view_id;
        $( id + " option").each(function () {
            if ($(this).html() == el.dataset.status) {
                $(this).attr("selected", "selected");
                return;
            }
        });


   let idz= "#assigned_to"+ view_id;
        $( idz + " option").each(function () {
            if ($(this).html() == el.dataset.assigned_to) {
                $(this).attr("selected", "selected");
                return;
            }
        });


	document.getElementById("phone_number"+view_id).value=el.dataset.phone_number;
	document.getElementById("response"+view_id).value= el.dataset.response;
    }else if(document.getElementById("plate_number"+view_id)){ //sos
    	 document.getElementById("date"+view_id).value=el.dataset.date;
    	 document.getElementById("user_id"+view_id).value= 'CMT-USER-'+el.dataset.user_id;
         document.getElementById("plate_number"+view_id).value=el.dataset.plate_number;
         document.getElementById("media"+view_id).value=el.dataset.media;
         document.getElementById("location"+view_id).value=el.dataset.location;

         document.getElementById("username"+view_id).value=el.dataset.username;
	      document.getElementById("email"+view_id).value=el.dataset.email;
	      document.getElementById("phone_number"+view_id).value=el.dataset.phone_number;

        //alert(el.dataset.media)

	       const right_side_modal_video =`<video style="height:400px; width:100%" id="video-${view_id}" controls><source src="${el.dataset.media}" type="video/webm"></video>`;
	       document.getElementById("video1").innerHTML = right_side_modal_video;

    //      var elements = document.getElementsByTagName("input");
    // for (var ii=0; ii < elements.length; ii++) {
    //   if (elements[ii].type == "text") {
    //     elements[ii].value = "";
    //   }
    // }

	      let id= "#status"+ view_id;
		    $( id + " option").each(function () {
		        if ($(this).html() == el.dataset.status) {
		            $(this).attr("selected", "selected");
		            return;
		        }
		    });

		 let idz= "#assigned_to"+ view_id;
		    $( idz + " option").each(function () {
		        if ($(this).html() == el.dataset.assigned_to) {
		            $(this).attr("selected", "selected");
		            return;
		        }
		    });

  }else if( document.getElementById("admin-repairs-status" +el.dataset.id)){ // mechanic request


    let id= "#admin-repairs-status"+ view_id;
        $( id + " option").each(function () {
            if ($(this).html() == el.dataset.status) {
                $(this).attr("selected", "selected");
                return;
            }
        });

        document.getElementById('location'+ view_id ).value = el.dataset.location;
        document.getElementById('carbrand'+ view_id ).value = el.dataset.carbrand;



  }else { //faq
       document.getElementById("question"+el.dataset.id).value= el.dataset.question;
       document.getElementById("answers"+el.dataset.id).value= el.dataset.answer;

       let id= "#status"+ view_id;
        $( id + " option").each(function () {
            if ($(this).html() == el.dataset.status) {
                $(this).attr("selected", "selected");
                return;
            }
        });

    }

    document.getElementById("user-id").innerHTML="CMT-RECORD-"+ view_id.substring(-5,view_id.length);

     document.getElementById("first-view").style.display="none";
    document.getElementById("second-view").style.display="block";
}


window.addRecordEvent = (o) =>{

  let linkOfApi = activeUrl + o.dataset.url
   //alert(o.dataset.url)
    const view_id = o.dataset.id;
    let prePostData = null;
    let tickets = false;
    let user_email ='';

    let status =null;
    let status_x = null;
    let response;

  const user =JSON.parse(localStorage.getItem("userToken"));

   if( document.getElementById("category"+ view_id)){ //tickets


      //create tickets by admin and sen notification







      tickets =true;
      status_x = document.getElementById("status"+ view_id);
      status = status_x.options[status_x.selectedIndex].text;

      const category_x = document.getElementById("category"+ view_id);
      const category = category_x.options[category_x.selectedIndex].text;


      const assigned_to_x = document.getElementById("assigned_to"+ view_id);
      const assigned_to = assigned_to_x.options[assigned_to_x.selectedIndex].text;

       let em = document.getElementById('email'+view_id)

      user_email =  em.options[em.selectedIndex].text

      if(user_email=='--Select an email user--'){
       var notification = alertify.notify('Select an email', 'error', 5, function(){  console.log('dismissed'); });
       return false
   }
   response =document.getElementById("response"+view_id).value;                        //document.getElementById("email"+ view_id).value;
      prePostData = {
        subject: document.getElementById('subject'+view_id).value,

      username: document.getElementById("username"+ view_id).value,
      phone_number: document.getElementById("phone_number"+ view_id).value,
      email: em.options[em.selectedIndex].text ,
      status,
      category,
      assigned_to,
      comment: document.getElementById("comment"+ view_id).value,
      createdDate: document.getElementById("date"+ view_id).value,
      response:response,
      };



    }else if(document.getElementById("plate_number"+view_id)){ //sos
      status_x = document.getElementById("status"+ view_id);
      status = status_x.options[status_x.selectedIndex].text;

      prePostData = {
        username: document.getElementById("username"+ view_id).value,
      phone_number: document.getElementById("phone_number"+ view_id).value,
      email: document.getElementById("email"+ view_id).value,

      status
      };

    }else{ //faq

    const question =document.getElementById("question"+view_id).value;
       const answer =document.getElementById("answers"+view_id).value
       let status_xx = document.getElementById("status"+ view_id);
      status = status_xx.options[status_xx.selectedIndex].text;
      prePostData = {

      question,
      answer,
      status

      };

    }




    fetch(linkOfApi, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': user.token,
        },
        body: JSON.stringify(prePostData),
        mode:"cors",
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.status === 201) {
            // let modal_view_id = document.getElementsByClassName("mebox");
            // modal_view_id[0].style.display="none";
            //document.getElementById("gtd").classList.remove("overlay")

            var notification = alertify.notify('Successful created.', 'success', 5, function(){  console.log('dismissed'); });

              if(!prePostData.username){
                 prePostData.username ='';
              }

              AuditTrail.sendLogInfo(user,prePostData.username, 'SUPPORT MANAGEMENT(TICKETS/SOS/FAQS)', 'Success', '201', 'POST', 'Support ticket response successful')


             if(document.getElementById("category"+ view_id)){



                  let data_msg ="Dear " + user.user.username + " ";
                 data_msg+=" A Ticket has been created  for you. Your TICKET ID:"+ document.getElementById("ticket_id"+ view_id).value  + "on our platform  and is currently being reviewed by our support team. The status of this ticket is of now" +status;



                //console.log("clicked me..." +user_name[0])



                  let notification_url =baseUrl+ "/notification";

                  let dataNotification = {
                    user_id: user_email,
                    type: 'ticket',
                    description: data_msg,


                  };



                 //craete notification and update status to ongoing
                 postNotification(notification_url,dataNotification);
                     var snd = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
                        snd.play();

                 if(response){

                   let data_msg ="Dear " + user.user.username + " ";
                 data_msg+=" Following with the reviews of the ticket created initially for the TICKET ID:"+ document.getElementById("ticket_id"+ view_id).value  + "on our platform  and is currently being reviewed by our support team. The status of this ticket is of now" +status;



                  let notification_url =baseUrl+ "/notification";

                  let dataNotification = {
                    user_id: user_email,
                    type: 'information',
                    description: data_msg,


                  };



                 //craete notification and update status to ongoing
                 postNotification(notification_url,dataNotification);
                     var snd = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
                        snd.play();

                 }



                 setTimeout(()=>{
                              // window.location.reload();
                         },4000)









             }




          } else {
            AuditTrail.sendLogInfo(user,'', 'SUPPORT MANAGEMENT(TICKETS/SOS/FAQS)', 'fAILED', '400', 'PUT', 'Failed to create Ticket')

            var notification = alertify.notify('Could not perform update operation', 'error', 5, function(){  console.log('dismissed'); });

          }
        }).catch(e=> console.log(e));



}

window.updateRecordTemplate = (o) =>{
	let linkOfApi = activeUrl + o.dataset.url  +"/"+ o.dataset.id;
    const view_id = o.dataset.id;
    let prePostData = null;
    let tickets = false;

    let status =null;
    let status_x = null;



      //document.getElementById("username").innerHTML= selectOptions_users



     // Map your choices to your option value



	const user =JSON.parse(localStorage.getItem("userToken"));

   if( document.getElementById("category"+ view_id)){ //tickets
   	  tickets =true;



      status_x = document.getElementById("status"+ view_id);
      status = status_x.options[status_x.selectedIndex].text;


    //   let id= "#email"+ view_id;
    // $( id + " option").each(function () {
    //     if ($(this).html() == el.dataset.email) {
    //         $(this).attr("selected", "selected");
    //         return;
    //     }
    // });

      const category_x = document.getElementById("category"+ view_id);
      const category = category_x.options[category_x.selectedIndex].text;


      const assigned_to_x = document.getElementById("assigned_to"+ view_id);
      const assigned_to = assigned_to_x.options[assigned_to_x.selectedIndex].text;
      let em = document.getElementById('email'+view_id)

      let user_email =  em.options[em.selectedIndex].text

      if(user_email=='--Select an email user--'){
       var notification = alertify.notify('Select an email', 'error', 5, function(){  console.log('dismissed'); });
       return false
   }                             //document.getElementById("email"+ view_id).value;
      let response =document.getElementById("response"+view_id).value;                        //document.getElementById("email"+ view_id).value;
      prePostData = {
        subject: document.getElementById('subject'+view_id).value,

      username: document.getElementById("username"+ view_id).value,
      phone_number: document.getElementById("phone_number"+ view_id).value,
      email: em.options[em.selectedIndex].text ,
      status,
      category,
      assigned_to,
      comment: document.getElementById("comment"+ view_id).value,
      createdDate: document.getElementById("date"+ view_id).value,
      response:response,
      };
    }else if(document.getElementById("plate_number"+view_id)){ //sos
    	status_x = document.getElementById("status"+ view_id);
      status = status_x.options[status_x.selectedIndex].text;

      prePostData = {
      	username: document.getElementById("username"+ view_id).value,
    	phone_number: document.getElementById("phone_number"+ view_id).value,
    	email: document.getElementById("email"+ view_id).value,

    	status
      };

    }else if(document.getElementById("admin-repairs-status"+ view_id)){
       status_x = document.getElementById("admin-repairs-status"+ view_id);
      status = status_x.options[status_x.selectedIndex].text;
      prePostData = {


      status
      };



    }else{ //faq

    const question =document.getElementById("question"+view_id).value;
       const answer =document.getElementById("answers"+view_id).value

       status_x = document.getElementById("status"+ view_id);
      status = status_x.options[status_x.selectedIndex].text;

    	prePostData = {

    	question,
    	answer,
      status

      };

    }




		fetch(linkOfApi, {
	      method: 'PUT',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	        'x-access-token': user.token,
	      },
	      body: JSON.stringify(prePostData),
	      mode:"cors",
	    })
	      .then(response => response.json())
	      .then(data => {
	      	console.log(data)
	        if (data.status === 201 || data.status==200) {
	          // let modal_view_id = document.getElementsByClassName("mebox");
	          // modal_view_id[0].style.display="none";
	          //document.getElementById("gtd").classList.remove("overlay")

	          var notification = alertify.notify('Successfully updated record', 'success', 5, function(){  console.log('dismissed'); });




          if(document.getElementById("response"+view_id)){
            let notification_url2 =baseUrl+ "/notification";

            let dataNotification2 = {
                    user_id: user_email,
                    type: 'Response',
                    description: "A response message was sent to you",


            };



                 //craete notification and update status to ongoing
            postNotification(notification_url2,dataNotification2);

          }

            if(!prePostData.username){
                 prePostData.username ='';
              }

              AuditTrail.sendLogInfo(user,prePostData.username, 'SUPPORT MANAGEMENT(TICKETS/SOS/FAQS)', 'Success', '201', 'PUT', "Ticket response was successful")



             if(tickets==true){




		              let notification_template = `<div class="media-body">
		                                                    <h5 class="media-heading">Dear ${user.username}, your  ticket with the given id  CMT-RECORD-${view_id.substring(-12,view_id.length)} has been placed.</h5>
		                                                    <p class="m-0">
		                                                        <small>${document.getElementById("response"+view_id).value}</small>
		                                                    </p>
		                                                 </div>` ;
		              let notification_counter = document.getElementById("notifyCount");
		              let notice_board = document.getElementById("notice_board");

		              $("#parent-div").prepend(notification_template);

		              // notification_counter.innerHTML = Number(user.user.notification_count) + 2;


		              //update user notification
		              let linkOfApi2 =  activeUrl + '/notification-update/'+ document.getElementById("email"+ view_id).value;
		              fetch(linkOfApi2, {
					      method: 'PUT',
					      headers: {
					        'Accept': 'application/json',
					        'Content-Type': 'application/json',
					        'x-access-token': user.token,
					      },
					      body: JSON.stringify(prePostData),
					      mode:"cors",
					  }).then(response => response.json())
					    .then(data => {

					    	var snd = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
		                    snd.play();

		                    var notification = alertify.notify('Successful notification update', 'success', 5, function(){  console.log('dismissed'); });


		                     setTimeout(()=>{
		                          window.location.reload();
		                     },3000)




					    }).catch(e =>{
		                    var notification = alertify.notify('Could not perform update operation', 'error', 5, function(){  console.log('dismissed'); });

					    })





             }


setTimeout(()=>{
                              window.location.reload();
                         },3000)




	          // var notification = alertify.notify('Could not perform update operation', 'error', 5, function(){  console.log('dismissed'); });
            if(!prePostData.username){
                 prePostData.username ='';
              }

              AuditTrail.sendLogInfo(user,prePostData.username, 'SUPPORT MANAGEMENT(TICKETS/SOS/FAQS)', 'Failed', '201', 'PUT', 'Failed response ticket')

	        }
	      }).catch(e=> console.log(e));

}




window.addCarRecordEvent = (o) =>{
    let linkOfApi = activeUrl + o.dataset.url ;
    const user =JSON.parse(localStorage.getItem("userToken"));



         const status_x = document.getElementById("status"+ o.dataset.id);
  const health_x = document.getElementById("health_status"+ o.dataset.id);
  const car_status_x = document.getElementById("car_status"+ o.dataset.id);








    const model_make = document.getElementById("car_model_make" + o.dataset.id);

    const model_make_id = document.getElementById("car_model_id" + o.dataset.id);

    const car_model = document.getElementById("car_model_name" + o.dataset.id);

    const car_model_trim = document.getElementById("car_model_trim" + o.dataset.id)

    const car_year = document.getElementById("car_year" + o.dataset.id)

    const color = document.getElementById("color" + o.dataset.id)

    const plate_number = document.getElementById("plate_number" + o.dataset.id)



    const drivers = document.getElementById("drivers" + o.dataset.id)

    const description = document.getElementById("description" + o.dataset.id)

    const license = document.getElementById("inputLicense" + o.dataset.id)

    const partner_id_x = document.getElementById("partner_id" + o.dataset.id);
    let partid = partner_id_x.options[partner_id_x.selectedIndex]
    const inspection_detail = document.getElementById("inspection_detail" + o.dataset.id)
    let driv = drivers.options[drivers.selectedIndex].text.split('-')

    let vehicleIdentificationNumber =  document.getElementById("tin"+ o.dataset.id).value;


    let avatar = document.getElementById('image-file'+ o.dataset.id).value ;


    var fullPath = avatar;
    var filename = fullPath.replace(/^.*[\\\/]/, '');





     let images =''
     if(filename.length>0){
       avatar ='https://Goom Logistics-bucket.s3.amazonaws.com/'+ filename;

       images = avatar;

     }

     if(avatar.length<=0){
       images = 'https://Goom Logistics-bucket.s3.amazonaws.com/car1.jpg';
        var notification = alertify.notify('Upload an image for the car', 'error', 5, function(){  console.log('dismissed'); });

      return false;
     }

     if( status_x.options[status_x.selectedIndex].text =='--Select Status--'){
       var notification = alertify.notify('Status required', 'error', 5, function(){  console.log('dismissed'); });

      return false;
     }

     if( status_x.options[status_x.selectedIndex].text =='--Select Status--'){
       var notification = alertify.notify('Status required', 'error', 5, function(){  console.log('dismissed'); });

      return false;
     }

     if( status_x.options[status_x.selectedIndex].text =='--Select Status--'){
       var notification = alertify.notify('Status required', 'error', 5, function(){  console.log('dismissed'); });

      return false;
     }

          if( status_x.options[status_x.selectedIndex].text =='--Select Status--'){
       var notification = alertify.notify('Status required', 'error', 5, function(){  console.log('dismissed'); });

      return false;
     }

     if( health_x.options[health_x.selectedIndex].text =='--Select Status--'){
       var notification = alertify.notify('Status required', 'error', 5, function(){  console.log('dismissed'); });

      return false;
     }

     if( car_status_x.options[car_status_x.selectedIndex].text =='--Select Status--'){
       var notification = alertify.notify('Status required', 'error', 5, function(){  console.log('dismissed'); });

      return false;
     }


      let partEmail = partid.text;
      // partEmail = partEmail[1];


          const inspectionDate = document.getElementById("inspection_date" + o.dataset.id).value;

    const inspectionTime = document.getElementById("inspection_time" + o.dataset.id).value



    const prePostData = {
      color: color.value,
      model: car_model.value,
      status: status_x.options[status_x.selectedIndex].text,
      health_status: health_x.options[health_x.selectedIndex].text,
      car_status: car_status_x.options[car_status_x.selectedIndex].text,

      car_type: model_make_id.value,
      car_model: car_model.value,
      description: description.value,
      car_year: car_year.value,
      assigned_driver_name: driv[0],
      assigned_driver_email: driv[1],
      assigned_driver_phone: drivers.options[drivers.selectedIndex].value,
      partner_id: partid.getAttribute('id'),
      inspection_detail: inspection_detail.value,
      plate_number: plate_number.value,
      license: license.value,
      assigned_driver_id: drivers.options[drivers.selectedIndex].getAttribute('id'),
      images:images,
      inspectionDate,
      inspectionTime,
      vehicleIdentificationNumber,



      car: {

  car_name:model_make.options[model_make.selectedIndex].text,

model_id:  model_make_id.value ,

model_make_id:model_make_id.value,

model_name:car_model.value,

model_trim:car_model_trim.value,

model_year:car_year.value,

manufacturer:'',



},


carModel:car_model.value,

carYear:car_year.value,

vehicleColor:color.value,

plateNo:plate_number.value,


carDescription:description.value,

imagePath: images,

creator:partid.getAttribute('id'),

date_created:new Date(),
partnerEmail:  partEmail,


    };



    console.log(prePostData)


        fetch(linkOfApi, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': user.token,
            },
            body: JSON.stringify(prePostData),
            mode:"cors",
          })
            .then(response => response.json())
            .then(data => {
              if (data.status === 201) {
                let modal_view_id = document.getElementsByClassName("mebox");
                modal_view_id[0].style.display="none";
                //document.getElementById("gtd").classList.remove("overlay")
                var notification = alertify.notify('Successfully created  car.', 'success', 5, function(){  console.log('dismissed'); });

                AuditTrail.sendLogInfo(user,'', 'CAR MGT', 'Success', '201', 'POST', 'Successfully created car '+ prePostData.car_name)

                     window.location.reload();
               // ApiDeleteOneStatusRecord.redirect(recordOfType);
              } else {

                AuditTrail.sendLogInfo(user,'', 'CAR MGT', 'Failed', '400', 'POST', 'Failed to create car')


                var notification = alertify.notify('Could not perform add operation.', 'error', 5, function(){  console.log('dismissed'); });

              }
            });

}



window.addPlanEvent = (o) => {
	let linkOfApi = activeUrl + o.dataset.url ;
	const user =JSON.parse(localStorage.getItem("userToken"));
	const plan =document.getElementById("plan"+o.dataset.id);
	const category =document.getElementById("category"+o.dataset.id)
	const price =document.getElementById("price"+o.dataset.id);
	const description =document.getElementById("description"+o.dataset.id)
	const max_cars =document.getElementById("max_car"+o.dataset.id)
	const status_x = document.getElementById("status"+ o.dataset.id);


    const prePostData = {
    	plan_name: plan.options[plan.selectedIndex].text,
    	plan_categories: category.value,
    	price: price.value,
    	description: description.value,
    	max_car: max_cars.value,
    	status: status_x.options[status_x.selectedIndex].text
    };

	const validResult = Validator.validatePlanPost({...prePostData});

    if(validResult){
		fetch(linkOfApi, {
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	        'x-access-token': user.token,
	      },
	      body: JSON.stringify(prePostData),
	      mode:"cors",
	    })
	      .then(response => response.json())
	      .then(data => {
	        if (data.status === 201) {
	          let modal_view_id = document.getElementsByClassName("mebox");
	          modal_view_id[0].style.display="none";
	          //document.getElementById("gtd").classList.remove("overlay")
	          var notification = alertify.notify('Successfully created  Plan.', 'success', 5, function(){  console.log('dismissed'); });

             AuditTrail.sendLogInfo(user,'', 'PLAN MODULE', 'Success', '201', 'PUT', 'Plan created successfully for '+ prePostData.plan_name)

                window.location.reload();
	         // ApiDeleteOneStatusRecord.redirect(recordOfType);
	        } else {

            AuditTrail.sendLogInfo(user,'', 'PLAN MODULE', 'Failed', '201', 'PUT','Failed to create plan')

	          var notification = alertify.notify('Could not perform add operation.', 'error', 5, function(){  console.log('dismissed'); });

	        }
	      });
	}else{
		var notification = alertify.notify('unsuccessful add operation.', 'error', 5, function(){  console.log('dismissed'); });

	}

}

window.addPlan = () =>{

	document.getElementById("add-new").addEventListener("click",(e)=>{

       document.getElementById("create").style.display="block";
	   document.getElementById("update").style.visibility="hidden";
	   document.getElementById("delete").style.visibility="hidden";
	   document.getElementById("cancle").style.visibility="hidden";

	   $('.mebox').hide();

	   let modal_view_id = document.getElementsByClassName("mebox");
	   modal_view_id[0].style.display="block";
	   //document.getElementById("gtd").classList.add("overlay")

	   var elements = document.getElementsByTagName("input");
		for (var ii=0; ii < elements.length; ii++) {
		  if (elements[ii].type == "text") {
		    elements[ii].value = "";
		  }
		}

	   document.getElementById("first-view").style.display="none";
    document.getElementById("second-view").style.display="block";
	})



}



window.updateDataEarnings = (o) =>{
    let linkOfApi = activeUrl + o.dataset.url +"/"+ o.dataset.id;
    const user =JSON.parse(localStorage.getItem("userToken"));


   let carItem = JSON.parse(localStorage.getItem('chosenCar')) || {
    name: '',
      plate_no: '',
      car_id: ''
   };

   let vehiclePlateNo = carItem.plate_no,
      vehicleId_x =carItem.car_id,
      vehicleName= carItem.name,


   // let vehiclePlateNo = document.getElementById("vehiclePlateNo"+ o.dataset.id).value,
      vehicleId = vehicleId_x, //document.getElementById("vehicleId"+ o.dataset.id).value,
      // vehicleName=document.getElementById("vehicleName"+ o.dataset.id).value,
      paymentReference=document.getElementById("paymentReference"+ o.dataset.id).value,
      PaymentAmount= document.getElementById("PaymentAmount"+ o.dataset.id).value;
      const paymentDate = document.getElementById("paymentDate"+ o.dataset.id).value;
      const partnerBankAccount = document.getElementById("partnerBankAccount"+ o.dataset.id).value;
      //passwordConfirm =document.getElementById("confirmpassword"+ o.dataset.id).value,



    const partnerId = document.getElementById("partnerId"+ o.dataset.id).value;
    const partnerEmail = document.getElementById("idpat-"+ o.dataset.id).value;

    const status_x = document.getElementById("PaymentStatus"+ o.dataset.id);





//      document.getElementById("PaymentAmount"+ o.dataset.id).onkeyup = document.getElementById("PaymentAmount"+ o.dataset.id).onchange = enforceFloat;
//     document.getElementById("partnerBankAccount"+ o.dataset.id).onkeyup = document.getElementById("partnerBankAccount"+ o.dataset.id).onchange = enforceFloat;
//     document.getElementById('bankAccountNumber' + o.dataset.id).onkeyup = document.getElementById('bankAccountNumber' + o.dataset.id).onchange = enforceFloat;

//         //enforce that only a float can be inputed
// function enforceFloat() {
//   var valid = /^\-?\d+\.\d*$|^\-?[\d]*$/;
//   var number = /\-\d+\.\d*|\-[\d]*|[\d]+\.[\d]*|[\d]+/;
//   if (!valid.test(this.value)) {
//     var n = this.value.match(number);
//     this.value = n ? n[0] : '';
//   }
// }


   const bnk = document.getElementById("partnerBankAccount"+ o.dataset.id);





    const status = status_x.options[status_x.selectedIndex].text;
    let prePostData =null;
     prePostData ={

              paymentDate,
              PaymentStatus:status,
              PaymentAmount,
              paymentReference,
              partnerId,
              partnerEmail,
              partnerBankAccount:{
                 bankAccount:bnk.value,
                 bankAccountNumber:partnerBankAccount,
                 bankAccountName:document.getElementById('bankAccountName'+ o.dataset.id).value

              },
              vehicleId,
              vehicleName,
              vehiclePlateNo,

      };



  let view_id = o.dataset.id;
  let modal_view_id = document.getElementById("con-close-modal-"+ view_id);


    // const validResult = Validator.validateSignup({...prePostData});

    // if(validResult){
    fetch(linkOfApi, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': user.token,
        },
        body: JSON.stringify(prePostData),
        mode:"cors",
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.success === "ok") {
            modal_view_id.style.display="none";
            var notification = alertify.notify('Successfully updated partners earnings', 'success', 5, function(){  console.log('dismissed'); });
               AuditTrail.sendLogInfo(user,prePostData.username, 'USER MODULE (ADMIN/USER/DRIVER)', 'Success', '201', 'PUT', 'Partner earnings updated for '+ prePostData.partnerEmail)

                // window.location.reload();
           // ApiDeleteOneStatusRecord.redirect(recordOfType);
          } else {
             AuditTrail.sendLogInfo(user,prePostData.username, 'USER MODULE (ADMIN/USER/DRIVER)', 'Failed', '201', 'PUT','Partner earnings update failed')


            var notification = alertify.notify('Could not perform update operation', 'error', 5, function(){  console.log('dismissed'); });

          }
        });
   // }else{
   //  var notification = alertify.notify('unsuccessful update operation', 'error', 5, function(){  console.log('dismissed'); });

   // }


}


window.updateData = (o) =>{
    let linkOfApi = activeUrl + o.dataset.url +"/"+ o.dataset.id;
    const user =JSON.parse(localStorage.getItem("userToken"));


   let firstname = document.getElementById("firstname"+ o.dataset.id).value,
      lastname =document.getElementById("lastname"+ o.dataset.id).value,
      username=document.getElementById("username"+ o.dataset.id).value,
      password=document.getElementById("password"+ o.dataset.id).value,
      //passwordConfirm =document.getElementById("confirmpassword"+ o.dataset.id).value,
      phoneNumber= document.getElementById("phone"+ o.dataset.id).value;

    const certificate = document.getElementById("certificate"+ o.dataset.id).value;
    var user_typeSelect = document.getElementById('type'+ o.dataset.id);

    //let usergroups_old =  user_typeSelect.dataset.usergroup
    const user_type = user_typeSelect.options[user_typeSelect.selectedIndex].text;
    const email = document.getElementById("email"+ o.dataset.id).value;
    const status_x = document.getElementById("status"+ o.dataset.id);

    let is_verified = false;

    let avatar = document.getElementById('file-input'+ o.dataset.id).value ;
    console.log("avatar:" + avatar)

    //
     var fullPath = avatar;
     var filename = fullPath.replace(/^.*[\\\/]/, '');
     avatar = filename;

     console.log("this pic:" + avatar)




     if(avatar){

       user.user.profile = avatar;
       document.getElementById("user-profile").src=  user.user.profile;
     }
     var oldProfile = document.getElementById("user-profile").src;
     if(!avatar){
       fullPath = oldProfile;
       filename = fullPath.replace(/^.*[\\\/]/, '');
       avatar = filename;
       user.user.profile =  avatar;  //'https://Goom Logistics-bucket.s3.amazonaws.com/'+ avatar;
       // avatar = oldProfile;
     }


    let isVerified = document.getElementById("is_verified"+o.dataset.id).value;
    is_verified = isVerified;

    const status = status_x.options[status_x.selectedIndex].text;
    let address='';
    let prePostData =null;
    if(document.getElementById("address"+ o.dataset.id)){ //partners
      address = document.getElementById("address"+ o.dataset.id).value;
      let totalCars = document.getElementById("totalCars"+ o.dataset.id).value;

     let bankAccount_x = document.getElementById('bankAccount'+ o.dataset.id) ;
    let bankAccountName = document.getElementById('bankAccountName'+ o.dataset.id).value ;
     let bankAccountNumber = document.getElementById('bankAccountNumber'+ o.dataset.id).value ;


      prePostData ={
      	  firstname,
	      lastname,
	      username,
	      email,
	      password,
	      phoneNumber,
	      avatar,
	      certificate,
	      user_type,
	      status,
	      address,
	      is_verified,
	      totalCars,
        bankAccountNumber,
        bankAccountName,
        bankAccount: bankAccount_x.options[bankAccount_x.selectedIndex].text,
      };
    }else{
     prePostData ={
      	  firstname,
	      lastname,
	      username,
	      email,
	      password,
	      phoneNumber,
	      avatar,
	      certificate,
	      user_type,
	      status,
	      is_verified
      };

    }

	let view_id = o.dataset.id;
	let modal_view_id = document.getElementById("con-close-modal-"+ view_id);


    const validResult = Validator.validateSignup({...prePostData});

    if(validResult){
		fetch(linkOfApi, {
	      method: 'PUT',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	        'x-access-token': user.token,
	      },
	      body: JSON.stringify(prePostData),
	      mode:"cors",
	    })
	      .then(response => response.json())
	      .then(data => {
	      	console.log(data)
	        if (data.success === "ok") {
	          modal_view_id.style.display="none";
	          var notification = alertify.notify('Successfully updated user ', 'success', 5, function(){  console.log('dismissed'); });
	             AuditTrail.sendLogInfo(user,prePostData.username, 'USER MODULE (ADMIN/USER/DRIVER)', 'Success', '201', 'PUT', 'Successfully updated'+ prePostData.username + "record")

                window.location.reload();
	         // ApiDeleteOneStatusRecord.redirect(recordOfType);
	        } else {
             AuditTrail.sendLogInfo(user,prePostData.username, 'USER MODULE (ADMIN/USER/DRIVER)', 'Failed', '201', 'PUT', 'Updated user profile')


	          var notification = alertify.notify('Could not perform update operation', 'error', 5, function(){  console.log('dismissed'); });

	        }
	      });
	 }else{
	 	var notification = alertify.notify('unsuccessful update operation', 'error', 5, function(){  console.log('dismissed'); });

	 }


}



//for delete show confirm box first

const ui = {
  confirm: async (message) => createConfirm(message)
}

const createConfirm = (message) => {
  return new Promise((complete, failed)=>{
    $('#confirmMessage').text(message)

    $('#confirmYes').off('click');
    $('#confirmNo').off('click');

    $('#confirmYes').on('click', ()=> { $('.confirm').hide(); complete(true); });
    $('#confirmNo').on('click', ()=> { $('.confirm').hide(); complete(false); });

    $('.confirm').show();
  });
}

const deleteOperation = async (o) => {
  const confirm = await ui.confirm('Are you sure you want to do this?');

  if(confirm){
    deleteData(o)
  } else{
    var notification = alertify.notify('Delete Operation was canceled', 'warning', 5, function(){  console.log('dismissed'); });
    setTimeout(()=>{
    	window.location.reload()
    },1000)

  }
}


window.deleteData = (o)=>{


    $('.confirm').hide();
    let linkOfApi;
	if(o.dataset.delete_type){
		linkOfApi = activeUrl + o.dataset.url +"/"+ o.dataset.id+ "/delete" + "/"+ o.dataset.delete_type;
	}else{
		linkOfApi = activeUrl + o.dataset.url +"/"+ o.dataset.id+ "/delete";
	}

    const user =JSON.parse(localStorage.getItem("userToken"));
    let view_id = o.dataset.id;
	let modal_view_id = document.getElementById("con-close-modal-"+ view_id);


    fetch(linkOfApi, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      mode:"cors",
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 202) {
          modal_view_id.style.display="none";
          //document.getElementById("gtd").classList.remove("overlay")
          var notification = alertify.notify('Successful delete operation', 'success', 5, function(){  console.log('dismissed'); });


           AuditTrail.sendLogInfo(user,'', 'DELETE MODE', 'Success', '201', 'PUT', 'Deleted resource')

              window.location.reload();
        } else {

           AuditTrail.sendLogInfo(user,'', 'DELETE MODE', 'Failed', '201', 'PUT','Failed to perform delete operation')
          var notification = alertify.notify('Could not perform delete operation', 'error', 5, function(){  console.log('dismissed'); });
        }
      });



}

window.deleteRecord = (o) =>{
    var p=o.parentNode.parentNode;
    p.parentNode.removeChild(p);
    //deleteData(o);
    deleteOperation(o)

}


const profileUpdate = (o)=>{
	const {prePostData, url, id} = o.dataset;
   let linkOfApi = activeUrl + url +"/"+ id;
    const user =JSON.parse(localStorage.getItem("userToken"));

    const validResult = Validator.validateSignup({...prePostData});

    if(validResult){
		fetch(linkOfApi, {
	      method: 'PUT',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	        'x-access-token': user.token,
	      },
	      body: JSON.stringify(prePostData),
	      mode:"cors",
	    })
	      .then(response => response.json())
	      .then(data => {
	      	console.log(data)
	        if (data.success === "ok") {

	          var notification = alertify.notify('Successfully updated user profile ', 'success', 5, function(){  console.log('dismissed'); });

	         // ApiDeleteOneStatusRecord.redirect(recordOfType);


     AuditTrail.sendLogInfo(user,'', 'DELETE MODE', 'Success', '201', 'PUT', 'Profile update success for '+ prePostData.email)

              window.location.reload();
        } else {

           AuditTrail.sendLogInfo(user,'', 'DELETE MODE', 'Failed', '201', 'PUT')

	          var notification = alertify.notify('Could not perform update profile operation', 'error', 5, function(){  console.log('dismissed'); });

	        }
	      });
	 }else{
	 	var notification = alertify.notify('unsuccessful update operation', 'error', 5, function(){  console.log('dismissed'); });

	 }
}

function searchTable(trId=0) {


  // $(document).ready(function(){

  // Search all columns
  $('#search').keyup(function(){
    // Search Text
    var search = $(this).val();

    // Hide all table tbody rows
    $('table tbody tr').hide();

    // Count total search result
    var len = $('table tbody tr:not(.notfound) td:contains("'+search+'")').length;

    if(len > 0){
      // Searching text in columns and show match row
      $('table tbody tr:not(.notfound) td:contains("'+search+'")').each(function(){
        $(this).closest('tr').show();
      });
    }else{
      //$('.notfound').show();
    }

  });


// // });

// // Case-insensitive searching (Note - remove the below script for Case sensitive search )
// $.expr[":"].contains = $.expr.createPseudo(function(arg) {
//    return function( elem ) {
//      return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
//    };
// });
}



class ApiAdminBotService  {

  static goBackFor(){

  	let documentDom = document;
  	 $('.mebox').hide();
    documentDom.addEventListener(
      'click',
      e => {
        if (e.target.classList.contains("gobackFor")) {
          window.history.back()

    	  //hide all other modal
        }
      },
      false,
    );

  }
  static goBack(){
  	let documentDom = document;
  	 $('.mebox').hide();
    documentDom.addEventListener(
      'click',
      e => {
        if (e.target.classList.contains("goback")) {
          console.log('we are here')
          document.getElementById("first-view").style.display="block";
    	  document.getElementById("second-view").style.display="none";

    	  //hide all other modal
        }
      },
      false,
    );
  }
  static changeView(){
    document.getElementById("close-id").addEventListener("click", (e)=>{
    	document.getElementById("first-view").style.display="block";
    	document.getElementById("second-view").style.display="none";
    });

  }
  constructor() {


  }

  static getBothRecord() {}



  static runDashboard(users,partners,drivers,cars,tickets, itineraries, todaySales,yesterdaysSales,weeklySales,lastMonth,notice=[]){

    // WarLockAdmin('view_dashboard')
    GateKeepersForAdmin();

    console.log(todaySales)
//    alert(todaySales)




    document.getElementById("total-sales").innerHTML='₦'+ todaySales;
    document.getElementById("yesterday").innerHTML='₦'+ yesterdaysSales;
    document.getElementById("last-week").innerHTML='view payments'
    document.getElementById("last-mth").innerHTML='view wallet transactions'




  	const totalUsers = [...new Set(users)].length;
  	document.getElementById("user-total").innerHTML = totalUsers;
  	const totalPartners = [...new Set(partners)].length;
  	document.getElementById("partners-total").innerHTML = totalPartners;
  	let totalDrivers = [...new Set(drivers)].length;
  	document.getElementById("drivers-total").innerHTML = totalDrivers;
  	let totalCars = [...new Set(cars)].length;
  	document.getElementById("cars-total").innerHTML = totalCars;
  	let ticketList = [...new Set(tickets)];
  	let totalItineraries = [...new Set(itineraries)];


  	console.log(JSON.stringify(todaySales)+ "sales of today");




  	const tablebody1 = document.getElementById('tablebody1');
  	const tablebody2 = document.getElementById('tablebody2');
  	let viewModals ='';
  	let eachRecord ='';
  	// const tablebody3 = document.getElementById('total');

  	let template1 ='', template2 ='', template3 ='';




    if(totalItineraries.length<=0){



           tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;


    }


    totalItineraries = sortBy(totalItineraries, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })


  	totalItineraries.map((item, i) => {


        let className='';

        if(item.status=="Ongoing" ){

                className=`label-danger`;
         }else if(item.status=="Completed" || item.status=="Paid" || item.status=="Successful"){

                className= `label-success`;
        }else {

              className=`label-warning`;
         }
        eachRecord = `
                          <tr id="${i}">
                                <td>${formatDate(new Date(item.created_at))} </td>

                                  <td>${item.email}</td>
                          <td>${item.plan_category}</td>
                          <td>${item.start_location} </td>
                          <td>${item.destination}</td>

                            <td><span class="label label-table ${className}" >${item.status}</span></td>

                         </tr>`;
        tablebody1.insertAdjacentHTML('beforeend', eachRecord);
   });

    //const modalbody1 = document.getElementById("modalbody1");


  if(ticketList.length<=0){



            tablebody2.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;


    }




    ticketList = sortBy(ticketList, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })

  	ticketList.map((item, i) => {
  		let className = "label-success"
  	    if(item.status=="Completed"){
           className = "label-success"
  	    }else if(item.status=="Ongoing"){
           className = "label-danger"
  	    } else{
          className = "label-warning"
        }
        template2 =`<tr>
                         <td><a onclick="viewPlan(this)" href="#" id="plancat${item._id}" data-id="${item._id}" data-url="/admin-ticket-detail" class=""><b>${formatDate(new Date(item.created_at))} </b></a> </td>

                          <td>CMT-USER- ${item.user_id}</td>
                           <td>${item.category}</td>

                           <td class="">${item.subject}</td>
                           <td class="">CMT-RECORD-${item._id.substring(-12,item._id.length)}</td>
                           <td><span class="label ${className}">${item.status}</span></td>

                   </tr>`;



        tablebody2.insertAdjacentHTML('beforeend', template2);
    });

    //modalbody1.innerHTML=viewModals;






    $(function(){
      var arrow = $('.chat-head img');
      var textarea = $('.chat-text textarea');

      arrow.on('click', function(){
        var src = arrow.attr('src');

        $('.chat-body').slideToggle('fast');
        if(src == 'https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png'){
          arrow.attr('src', 'https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_up-16.png');
        }
        else{
          arrow.attr('src', 'https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png');
        }
      });

      textarea.keypress(function(event) {
        var $this = $(this);

        if(event.keyCode == 13){
          var msg = $this.val();
          $this.val('');
          $('.msg-insert').prepend("<div class='msg-send'>"+msg+"</div>");
          }
      });

    });


    notice = sortBy(notice, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })


    if(notice.length>0){
        document.getElementById("notifyCount").innerHTML=notice.length
         let counter = 0;



            notice.map((item,i)=>{
                    if(item.type=="payment" && item.status=="new"){
                      counter+=1;
                      let markup =`   <div class="pull-left p-r-10" style="" id="${i}">

                                                       </div>
                                                       <div onclick="updateNotificationStatus(this)" data-id="${item._id}" class="media-body">
                                                          <h5 class="media-heading" style="margin-left:4px; ">Quotation Notification<span class="label label-default pull-right" style="margin-right:12px">New </span></h5>
                                                          <hr/>
                                                          <p class="m-0" >
                                                              <small style="">${ item.description.substring(0,150)}...<a id="plan-current-5e8904789ee841375ce073f3" onclick="" data-id="5e8904789ee841375ce073f3" href="./admin-bookings" class="table-action-btn btn-custom btn-purple"><i class="md md-chevron-right"></i></a></small>
                                                          </p>
                                                       </div><hr/>`;

                       $( "#notice_board" ).append( $( markup ) )

                        $( "#notice_board2" ).append( $( markup ) )

                      }
                  })


        document.getElementById("notifyCount").innerHTML=counter
    }

    AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','Dashboard viewed')

  }

  static runAdminUsers(datas,previledges){
    // //
    WarLockAdmin(previledges, 'view_users','manage_users')
    noReadWrite(previledges,'manage_users')
    GateKeepersForAdmin();
    addClick()


    document.getElementById("search").addEventListener("keyup",(e)=>{
   	 searchTable()
   })

    	console.log("loading users page")

    let template2 ='';
    let viewModals = '';

  	const tablebody1 = document.getElementById('tablebody1');
  	const modalbody1 = document.getElementById("modalbody1");

  	if(datas.length<=0){
        let item ={_id: 'jdskj83829309-02032' };
        let AviewModals ='';
        AviewModals += `

        <div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar" >
                                            <div class="">
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                    <h4 class="modal-title">User Detail</h4>
                                                </div>
                                                <div class="">
                                                    <div class="row">


                                                    <div class="form-group" style="">
                                        <label for="profileImage" class="col-sm-4 control-label"></label>
                                        <div class="col-sm-7">
                                        <input type="hidden" id="avatar-url${item._id}" name="avatar-url" defaultValue="./public/assets/images/avatar.png"  />
                                        <img  id="preview${item._id}" style="border:1px solid gray;width:100px" src="./public/assets/images/avatar.png" alt="Avatar" class="avatar" />
                                       <p id="status">Please select a file</p>




                                                  <div class="upload-btn-wrapper">

                                                      <input onchange="initUpload(this)" data-id="${item._id}" type="file" name="myfile" id="file-input${item._id}"  />
                                                       <label htmlFor="myfile"><img src="/public/assets/images/camera.png"  style="width:50px;height:50px" id="clickme" />
                                                       </label>

                                                    </div>

                                            <ul  id="displayImages"></ul>

                                        </div>
                                    </div>  </div>
                                    <br/>








                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">

                                                            <div class="form-group ">
                                          <label for="position">Status</label>
                                          <select id="status${item._id}" class="form-control" data-style="btn-white">
                                              <option>Active</option>
                                              <option>Disabled</option>
                                              <option>Suspended</option>
                                              <option>Dormant</option>
                                          </select>
                                          </div>


                                          <div class="form-group">
                                                                <label for="field-1" class="control-label">First Name</label>
                                                                <input type="text" class="form-control" id="firstname${item._id}" placeholder="Doe">
                                                            </div>

                                          <div class="form-group">
                                                                <label for="field-2" class="control-label">Last Name</label>
                                                                <input type="text" class="form-control" id="lastname${item._id}" placeholder="Doe">
                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Email</label>
                                                                <input type="text" class="form-control" id="email${item._id}" placeholder="Address">
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Username</label>
                                                                <input type="text" class="form-control" id="username${item._id}" placeholder="Address">
                                                            </div>








                                                            <div class="form-group ">
                                          <label for="position">User Type</label>
                                          <select id="type${item._id}" class="form-control" data-style="btn-white">
                                              <option>Individual</option>
                                              <option>Corporate</option>

                                          </select>
                                          </div>



                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">User certificate</label>
                                                                <input type="text" class="form-control" id="certificate${item._id}" placeholder="Boston">
                                                                  <div><a href="#" onclick="genCert(this)" data-id="${item._id}"  >Generate Test Certificate</a></div>
                                                            </div>



                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Phone</label>
                                                                <input type="text" class="form-control" id="phone${item._id}" placeholder="United States">
                                                            </div>



                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Password</label>
                                                                <input value="unchanged" type="password" class="form-control" id="password${item._id}" placeholder="United States">
                                                            </div>




                                                             <div style="display:none" class="checkbox checkbox-primary">

                                                                <input data-id="${item._id}" onchange="update_value_checked(this)" data-url="/admin-users-detail-verification" type="checkbox" class="" id="is_verified${item._id}" value="false">
                                                                <label for="field-3" class="control-label">User Verification  </label>
                                                            </div>



                                                        </div>
                                                    </div>
                                                    <div class="row">



                                                    </div>
                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button onclick="addEvent(this)" data-id="${item._id}" data-url="/admin-add-user" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="updateData(this)" data-id="${item._id}" data-url="/admin-users-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





          `;

       modalbody1.innerHTML=AviewModals;

       AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','User page viewed')

      return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;


    }

    datas = sortBy(datas, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })

      datas = datas.filter((item)=>item.roles!="Individual Driver");


  	datas.map((item, i) => {
  	    let className = "label-success"
  	    if(item.status=="Active"){
           className = "label-success"
  	    }else if(item.status=="Disabled"){
           className = "label-warning"
  	    } else if(item.status=="Suspended"){
  	    	className = "label-danger"
  	    } else{
  	    	className="label-pink"
  	    }
        template2 +=`<tr>
                    <td class="">${item.firstname}</td>
                    <td class="">${item.lastname}</td>
                    <td class="">${item.email}</td>
                    <td class="">${item.phone_number}</td>
                    <td class="">${item.test_certificate}</td>
                    <td class=""><span class="label ${className}">${item.status}</span></td>
                     <td class="">${item.id}</td>

                    <td class=""><a href="#" data-roles="${item.roles}" onclick="updateRecordView(this);" data-isVerified="${item.isVerified}" data-avatar="https://Goom Logistics-bucket.s3.amazonaws.com/${item.avatar}"  data-id="${item._id}" data-firstname="${item.firstname}" data-username="${item.username}" data-lastname="${item.lastname}" data-email="${item.email}" data-phone="${item.phone_number}" data-status="${item.status}" data-certificate="${item.test_certificate}"  class="table-action-btn"><i class="md md-edit"></i></a>
                    <a href="#" onclick="deleteRecord(this)" data-id="${item._id}" data-url="/users"  class="table-action-btn "><i class="md md-close"></i></a></td>
                </tr>`;


         viewModals += `

        <div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar" >
                                            <div class="">
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                    <h4 class="modal-title">User Detail</h4>
                                                </div>
                                                <div class="">
                                                    <div class="row">


                                                    <div class="form-group" style="">
                                        <label for="profileImage" class="col-sm-4 control-label"></label>
                                        <div class="col-sm-7">
                                        <input type="hidden" id="avatar-url${item._id}" name="avatar-url" defaultValue="./public/assets/images/avatar.png"  />
                                        <img  id="preview${item._id}" style="border:1px solid gray;width:100px" src="./public/assets/images/avatar.png" alt="Avatar" class="avatar" />
                                         <p id="status">Please select a file</p>




                                                  <div class="upload-btn-wrapper">

                                                      <input onchange="initUpload(this)" data-id="${item._id}" type="file" name="myfile" id="file-input${item._id}"  />
                                                       <label htmlFor="myfile"><img src="/public/assets/images/camera.png"  style="width:50px;height:50px" id="clickme" />
                                                       </label>

                                                    </div>

                                            <ul  id="displayImages"></ul>

                                        </div>
                                    </div>  </div>
                                    <br/>








                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">

                                                            <div class="form-group ">
									                        <label for="position">Status</label>
									                        <select id="status${item._id}" class="form-control" data-style="btn-white">
									                            <option>Active</option>
									                            <option>Disabled</option>
									                            <option>Suspended</option>
									                            <option>Dormant</option>
									                        </select>
									                        </div>


									                        <div class="form-group">
                                                                <label for="field-1" class="control-label">First Name</label>
                                                                <input type="text" class="form-control" id="firstname${item._id}" placeholder="Doe">
                                                            </div>

									                        <div class="form-group">
                                                                <label for="field-2" class="control-label">Last Name</label>
                                                                <input type="text" class="form-control" id="lastname${item._id}" placeholder="Doe">
                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Email</label>
                                                                <input type="text" class="form-control" id="email${item._id}" placeholder="Address">
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Username</label>
                                                                <input type="text" class="form-control" id="username${item._id}" placeholder="Address">
                                                            </div>








                                                            <div class="form-group ">
									                        <label for="position">User Type</label>
									                        <select id="type${item._id}" class="form-control" data-style="btn-white">
									                            <option>Individual</option>
									                            <option>Corporate</option>

									                        </select>
									                        </div>



                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">User certificate</label>
                                                                <input type="text" class="form-control" id="certificate${item._id}" placeholder="Boston">
                                                                  <div><a href="#" onclick="genCert(this)" data-id="${item._id}"  >Generate Test Certificate</a></div>
                                                            </div>



                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Phone</label>
                                                                <input type="text" class="form-control" id="phone${item._id}" placeholder="United States">
                                                            </div>



                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Password</label>
                                                                <input value="unchanged" type="password" class="form-control" id="password${item._id}" placeholder="United States">
                                                            </div>




                                                             <div class="checkbox checkbox-primary">

                                                                <input data-id="${item._id}" onchange="update_value_checked(this)" data-url="/admin-users-detail-verification" type="checkbox" class="" id="is_verified${item._id}" value="false">
                                                                <label for="field-3" class="control-label">User Verification  </label>
                                                            </div>



                                                        </div>
                                                    </div>
                                                    <div class="row">



                                                    </div>
                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button onclick="addEvent(this)" data-id="${item._id}" data-url="/admin-add-user" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="updateData(this)" data-id="${item._id}" data-url="/admin-users-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





		      `;
    });

    modalbody1.innerHTML=viewModals;
    tablebody1.insertAdjacentHTML('beforeend', template2);



  }

  static runAdminAdmins(datas,previledges){

  WarLockAdmin(previledges,'view_admins','manage_admins')
      noReadWrite(previledges,'manage_admins')
   GateKeepersForAdmin();
   addClick()
   document.getElementById("search").addEventListener("keyup",(e)=>{
   	 searchTable()
   })

   let new_rolesSet = datas[0].usergroup_set;

   let roles_option = ``;

   new_rolesSet.map((item)=>{
     roles_option+=`<option>${item}</item>`
   })

    	console.log("loading users page")

    let template2 ='';
    let viewModals = '';

  	const tablebody1 = document.getElementById('tablebody1');
    const modalbody1 = document.getElementById("modalbody1");

    datas = sortBy(datas, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })

  	if(datas.length<=0){
        let item ={_id: 'jdskj83829309-02032' };
        let AviewModals ='';
        AviewModals += `

        <div style="display:none"  id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class=" slimScrollBar" >
                                            <div class="">
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                    <h4 class="modal-title">Admin User Detail</h4>
                                                </div>
                                               <div class="">
                                                    <div class="row">


                                                    <div class="form-group" style="">
                                        <label for="profileImage" class="col-sm-4 control-label"></label>
                                        <div class="col-sm-7">
                                        <input type="hidden" id="avatar-url${item._id}" name="avatar-url" defaultValue="./public/assets/images/avatar.png"  />
                                        <img  id="preview${item._id}" style="border:1px solid gray;width:100px" src="./public/assets/images/avatar.png" alt="Avatar" class="avatar" />
                                        <p id="status">Please select a file</p>




                                                  <div class="upload-btn-wrapper">

                                                      <input onchange="initUpload(this)" data-id="${item._id}" type="file" name="myfile" id="file-input${item._id}"  />
                                                       <label htmlFor="myfile"><img src="/public/assets/images/camera.png"  style="width:50px;height:50px" id="clickme" />
                                                       </label>

                                                    </div>

                                            <ul  id="displayImages"></ul>

                                        </div>
                                    </div>  </div>
                                    <br/>




                                                            <div class="form-group">
                                                                <label for="field-1" class="control-label">Name</label>
                                                                <input type="text" class="form-control" id="firstname${item._id}" placeholder="Doe">
                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-2" class="control-label">Surname</label>
                                                                <input type="text" class="form-control" id="lastname${item._id}" placeholder="Doe">
                                                            </div>

                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Email</label>
                                                                <input type="text" class="form-control" id="email${item._id}" placeholder="Address">
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Username</label>
                                                                <input type="text" class="form-control" id="username${item._id}" placeholder="Address">
                                                            </div>



                                                           <div class="form-group ">
                                          <label for="position">Status</label>
                                          <select id="status${item._id}" class="form-control" data-style="btn-white">
                                              <option>Active</option>
                                              <option>Disabled</option>
                                              <option>Suspended</option>
                                               <option>Dormant</option>
                                          </select>
                                          </div>


                                                             <div class="form-group ">
                                          <label for="position">User Role</label>
                                          <select id="type${item._id}" class="form-control" data-style="btn-white" data-usergroups="${new_rolesSet}">
                                              ${roles_option}
                                          </select>
                                          </div>

                                                        </div>
                                                    </div>
                                                    <div class="row">



                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Phone</label>
                                                                <input type="text" class="form-control" id="phone${item._id}" placeholder="United States">
                                                            </div>



                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Password</label>
                                                                <input value="unchanged" type="password" class="form-control" id="password${item._id}" placeholder="United States">
                                                            </div>




                                                               <div style="display:none" class="checkbox checkbox-primary">

                                                                <input data-id="${item._id}" onchange="update_value_checked(this)" data-url="/admin-admins-detail-verification" type="checkbox" class="" id="is_verified${item._id}" value="false">
                                                                <label for="field-3" class="control-label">User Verification  </label>
                                                            </div>






                                                            <div class="form-group">

                                                                <input type="hidden" class="form-control" id="certificate${item._id}" placeholder="Boston">
                                                            </div>







                                                    </div>
                                                    <div class="row">


                                                    </div>
                                                </div>

                                                <div class="modal-footer">
                                                <button id="create" onclick="addEvent(this)" data-id="${item._id}" data-url="/add-admin" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="updateData(this)" data-id="${item._id}" data-url="/admin-admins-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





          `;

       modalbody1.innerHTML=AviewModals;
      return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;


    }




  	datas.map((item, i) => {
  		let className = "Active";
  	if(item.status=="Active"){
           className = "label-success"
  	    }else if(item.status=="Disabled"){
           className = "label-warning"
  	    } else if(item.status=="Suspended"){
  	    	className = "label-danger"
  	    } else{
  	    	className="label-pink"
  	    }
        template2 +=`<tr class="notification">
                    <td class="">${item.firstname}</td>
                    <td class="">${item.lastname}</td>
                    <td class="">${item.email}</td>
                    <td class="">${item.phone_number}</td>

                    <td class=""><span class="label ${className}">${item.status}</span></td>

                    <td class=""><a onclick="updateRecordView(this)" data-roles="${item.roles}" data-toggle="modal" data-isVerified="${item.isVerified}" data-avatar="https://Goom Logistics-bucket.s3.amazonaws.com/${item.avatar}"  data-id="${item._id}" data-username="${item.username}" data-firstname="${item.firstname}" data-lastname="${item.lastname}" data-username="${item.username}" data-email="${item.email}" data-phone="${item.phone_number}" data-status="${item.status}" data-certificate="${item.test_certificate}"  class="table-action-btn"><i class="md md-edit"></i></a>
                    <a onclick="deleteRecord(this)" data-id="${item._id}" data-url="/admins"  class="table-action-btn "><i class="md md-close"></i></a></td>
                </tr>`;


         viewModals += `

        <div style="display:none"  id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class=" slimScrollBar" >
                                            <div class="">
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                    <h4 class="modal-title">Admin User Detail</h4>
                                                </div>
                                               <div class="">
                                                    <div class="row">


                                                    <div class="form-group" style="">
                                        <label for="profileImage" class="col-sm-4 control-label"></label>
                                        <div class="col-sm-7">
                                        <input type="hidden" id="avatar-url${item._id}" name="avatar-url" defaultValue="./public/assets/images/avatar.png"  />
                                        <img  id="preview${item._id}" style="border:1px solid gray;width:100px" src="./public/assets/images/avatar.png" alt="Avatar" class="avatar" />
                                        <p id="status">Please select a file</p>




                                                  <div class="upload-btn-wrapper">

                                                      <input onchange="initUpload(this)" data-id="${item._id}" type="file" name="myfile" id="file-input${item._id}"  />
                                                       <label htmlFor="myfile"><img src="/public/assets/images/camera.png"  style="width:50px;height:50px" id="clickme" />
                                                       </label>

                                                    </div>

                                            <ul  id="displayImages"></ul>

                                        </div>
                                    </div>  </div>
                                    <br/>




                                                            <div class="form-group">
                                                                <label for="field-1" class="control-label">Name</label>
                                                                <input type="text" class="form-control" id="firstname${item._id}" placeholder="Doe">
                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-2" class="control-label">Surname</label>
                                                                <input type="text" class="form-control" id="lastname${item._id}" placeholder="Doe">
                                                            </div>

                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Email</label>
                                                                <input type="text" class="form-control" id="email${item._id}" placeholder="Address">
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Username</label>
                                                                <input type="text" class="form-control" id="username${item._id}" placeholder="Address">
                                                            </div>



                                                           <div class="form-group ">
									                        <label for="position">Status</label>
									                        <select id="status${item._id}" class="form-control" data-style="btn-white">
									                            <option>Active</option>
									                            <option>Disabled</option>
									                            <option>Suspended</option>
									                             <option>Dormant</option>
									                        </select>
									                        </div>


                                                             <div class="form-group ">
									                        <label for="position">User Role</label>
									                        <select id="type${item._id}" class="form-control" data-style="btn-white" data-usergroups="${new_rolesSet}">
									                            ${roles_option}
									                        </select>
									                        </div>

                                                        </div>
                                                    </div>
                                                    <div class="row">



                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Phone</label>
                                                                <input type="text" class="form-control" id="phone${item._id}" placeholder="United States">
                                                            </div>



                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Password</label>
                                                                <input value="unchanged" type="password" class="form-control" id="password${item._id}" placeholder="United States">
                                                            </div>




                                                               <div class="checkbox checkbox-primary">

                                                                <input data-id="${item._id}" onchange="update_value_checked(this)" data-url="/admin-admins-detail-verification" type="checkbox" class="" id="is_verified${item._id}" value="false">
                                                                <label for="field-3" class="control-label">User Verification  </label>
                                                            </div>






                                                            <div class="form-group">

                                                                <input type="hidden" class="form-control" id="certificate${item._id}" placeholder="Boston">
                                                            </div>







                                                    </div>
                                                    <div class="row">


                                                    </div>
                                                </div>

                                                <div class="modal-footer">
                                                <button id="create" onclick="addEvent(this)" data-id="${item._id}" data-url="/add-admin" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="updateData(this)" data-id="${item._id}" data-url="/admin-admins-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





		      `;
    });

    modalbody1.innerHTML=viewModals;
    tablebody1.insertAdjacentHTML('beforeend', template2);

    AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','Admin page viewed')


  }



  static runAdminDrivers(datas,carsAvailable,previledges){
   GateKeepersForAdmin();
   WarLockAdmin(previledges,'view_drivers','manage_drivers')
       noReadWrite(previledges,'manage_drivers')
   addClick()
   document.getElementById("search").addEventListener("keyup",(e)=>{
   	 searchTable()
   })

   datas = sortBy(datas, {
    prop: "created_at",
    desc: true,
    parser: (d) => new Date(d)
    })

    datas = datas.filter((item)=>item.roles=="Individual Driver");

    	console.log("loading users page")

    let template2 ='';
    let viewModals = '';

  	const tablebody1 = document.getElementById('tablebody1');
  	const modalbody1 = document.getElementById("modalbody1");

  	if(datas.length<=0){
        let item ={_id: 'jdskj83829309-02032' };
        let AviewModals ='';
        AviewModals += `

        <div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar">
                                            <div class="">
                                                <div class="modal-header">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                    <h4 class="modal-title">Driver User Detail</h4>
                                                </div>
                                                <div class="">
                                                    <div class="row">

                                                     <br/><br/>
                                                    <div class="form-group" style="">
                                        <label for="profileImage" class="col-sm-4 control-label"></label>
                                        <div class="col-sm-7">
                                        <input type="hidden" id="avatar-url${item._id}" name="avatar-url" defaultValue="./public/assets/images/avatar.png"  />
                                        <img  id="preview${item._id}" style="border:1px solid gray;width:100px" src="./public/assets/images/avatar.png" alt="Avatar" class="avatar" />
                                        <p id="status">Please select a file</p>




                                                  <div class="upload-btn-wrapper">

                                                      <input onchange="initUpload(this)" data-id="${item._id}"   type="file" name="myfile" id="file-input${item._id}"  />
                                                       <label htmlFor="myfile"><img src="/public/assets/images/camera.png"  style="width:50px;height:50px" id="clickme" />
                                                       </label>

                                                    </div>

                                            <ul  id="displayImages"></ul>

                                        </div>
                                    </div>  </div>
                                    <br/>

                                                            <div class="form-group">
                                                                <label for="field-1" class="control-label">Name</label>
                                                                <input type="text" class="form-control" id="firstname${item._id}" placeholder="Doe">
                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-2" class="control-label">Last Name</label>
                                                                <input type="text" class="form-control" id="lastname${item._id}" placeholder="Doe">

                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Email</label>
                                                                <input type="text" class="form-control" id="email${item._id}" placeholder="Address">
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Username</label>
                                                                <input type="text" class="form-control" id="username${item._id}" placeholder="Address">
                                                            </div>



                                                           <div class="form-group ">
                                          <label for="position">Status</label>
                                          <select id="status${item._id}" class="form-control" data-style="btn-white">
                                              <option>Active</option>
                                              <option>Disabled</option>
                                              <option>Suspended</option>
                                              <option>Dormant</option>
                                          </select>
                                          </div>


                                                            <div class="form-group ">
                                          <label for="position">User Type</label>
                                          <select id="type${item._id}" class="form-control" data-style="btn-white">
                                              <option>Goom Logistics Driver</option>
                                              <option>Individual Driver</option>
                                              <option>Other Organization Driver</option>
                                          </select>
                                          </div>


                                               <div class="form-group" style="display:none">
                                                                <label for="field-4" class="control-label">Assigned Cars/Plate No</label>
                                                                <input type="text" value="Not Assigned" class="form-control" id="certificate${item._id}" placeholder="Boston">
                                                            </div>



                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Phone</label>
                                                                <input type="text" class="form-control" id="phone${item._id}" placeholder="United States">
                                                            </div>



                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Password</label>
                                                                <input value="unchanged" type="password" class="form-control" id="password${item._id}" placeholder="United States">
                                                            </div>



                                                             <div style="display:none" class="checkbox checkbox-primary">

                                                                <input data-id="${item._id}" data-url="/admin-drivers-detail-verification" onchange="update_value_checked(this)" type="checkbox" class="" id="is_verified${item._id}" value="false">
                                                                <label for="field-3" class="control-label">User Verification  </label>
                                                            </div>




                                                        </div>
                                                    </div>
                                                    <div class="row">





                                                    </div>
                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button id="create" onclick="addEvent(this)" data-id="${item._id}" data-url="/add-driver" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="updateData(this)" data-id="${item._id}" data-url="/admin-drivers-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>






          `;

       modalbody1.innerHTML=AviewModals;
      return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;


    }



    let className = null;
  	datas.map((item, i) => {
  	   if(item.status=="Active"){
           className = "label-success"
  	    }else if(item.status=="Disabled"){
           className = "label-warning"
  	    } else if(item.status=="Suspended"){
  	    	className = "label-danger"
  	    } else{
  	    	className="label-pink"
  	    }
        template2 +=`<tr class="notification">
                    <td class="">${item.firstname}</td>
                    <td class="">${item.lastname}</td>
                    <td class="">${item.email}</td>
                    <td class="">${item.phone_number}</td>
                    <td class="">${item.test_certificate}</td>
                    <td class=""><span class="label ${className}">${item.status}</span></td>

                    <td class=""><a data-roles="${item.roles}" onclick="updateRecordView(this)" data-toggle="modal" data-isVerified="${item.isVerified}" data-avatar="https://Goom Logistics-bucket.s3.amazonaws.com/${item.avatar}"  data-id="${item._id}"  data-username="${item.username}" data-firstname="${item.firstname}" data-lastname="${item.lastname}" data-email="${item.email}" data-phone="${item.phone_number}" data-status="${item.status}" data-certificate="${item.test_certificate}"  class="table-action-btn"><i class="md md-edit"></i></a>
                    <a onclick="deleteRecord(this)" data-id="${item._id}" data-url="/drivers"  class="table-action-btn "><i class="md md-close"></i></a></td>
                </tr>`;


         viewModals += `

        <div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar">
                                            <div class="">
                                                <div class="modal-header">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                    <h4 class="modal-title">Driver User Detail</h4>
                                                </div>
                                                <div class="">
                                                    <div class="row">

                                                     <br/><br/>
                                                    <div class="form-group" style="">
                                        <label for="profileImage" class="col-sm-4 control-label"></label>
                                        <div class="col-sm-7">
                                        <input type="hidden" id="avatar-url${item._id}" name="avatar-url" defaultValue="./public/assets/images/avatar.png"  />
                                        <img  id="preview${item._id}" style="border:1px solid gray;width:100px" src="./public/assets/images/avatar.png" alt="Avatar" class="avatar" />
                                         <p id="status">Please select a file</p>




                                                  <div class="upload-btn-wrapper">

                                                      <input onchange="initUpload(this)" data-id="${item._id}" type="file" name="myfile" id="file-input${item._id}"  />
                                                       <label htmlFor="myfile"><img src="/public/assets/images/camera.png"  style="width:50px;height:50px" id="clickme" />
                                                       </label>

                                                    </div>

                                            <ul  id="displayImages"></ul>

                                        </div>
                                    </div>  </div>
                                    <br/>

                                                            <div class="form-group">
                                                                <label for="field-1" class="control-label">Name</label>
                                                                <input type="text" class="form-control" id="firstname${item._id}" placeholder="Doe">
                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-2" class="control-label">Last Name</label>
                                                                <input type="text" class="form-control" id="lastname${item._id}" placeholder="Doe">

                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Email</label>
                                                                <input type="text" class="form-control" id="email${item._id}" placeholder="Address">
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Username</label>
                                                                <input type="text" class="form-control" id="username${item._id}" placeholder="Address">
                                                            </div>



                                                           <div class="form-group ">
									                        <label for="position">Status</label>
									                        <select id="status${item._id}" class="form-control" data-style="btn-white">
									                            <option>Active</option>
									                            <option>Disabled</option>
									                            <option>Suspended</option>
									                            <option>Dormant</option>
									                        </select>
									                        </div>


                                                            <div class="form-group ">
									                        <label for="position">User Type</label>
									                        <select id="type${item._id}" class="form-control" data-style="btn-white">
									                            <option>Goom Logistics Driver</option>
									                            <option>Individual Driver</option>
									                            <option>Other Organization Driver</option>
									                        </select>
									                        </div>


									                             <div class="form-group" style="display:none">
                                                                <label for="field-4" class="control-label">Assigned Cars/Plate No</label>
                                                                <input type="text" value="Not Assigned" class="form-control" id="certificate${item._id}" placeholder="Boston">
                                                            </div>



                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Phone</label>
                                                                <input type="text" class="form-control" id="phone${item._id}" placeholder="United States">
                                                            </div>



                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Password</label>
                                                                <input value="unchanged" type="password" class="form-control" id="password${item._id}" placeholder="United States">
                                                            </div>



                                                             <div class="checkbox checkbox-primary">

                                                                <input data-id="${item._id}" data-url="/admin-drivers-detail-verification" onchange="update_value_checked(this)" type="checkbox" class="" id="is_verified${item._id}" value="false">
                                                                <label for="field-3" class="control-label">User Verification  </label>
                                                            </div>




                                                        </div>
                                                    </div>
                                                    <div class="row">





                                                    </div>
                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button id="create" onclick="addEvent(this)" data-id="${item._id}" data-url="/add-driver" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="updateData(this)" data-id="${item._id}" data-url="/admin-drivers-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





		      `;
    });

    modalbody1.innerHTML=viewModals;
    tablebody1.insertAdjacentHTML('beforeend', template2);

    AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','Drivers page viewed')



  }

  static runAdminPartnersEarnings(datas,partners,cars,previledges){

    datas = sortBy(datas, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })

WarLockAdmin(previledges,'view_partners','manage_partners')
    noReadWrite(previledges,'manage_partners')


    document.getElementById("close-id").addEventListener("click", (e)=>{
       // alert('chosen')
      document.getElementById("carset").style.display="none"
    })

    document.getElementById("taken").addEventListener("click", (e)=>{
       // alert('chosen')
      document.getElementById("carset").style.display="none"
    })

    GateKeepersForAdmin();
    addClick()
   document.getElementById("search").addEventListener("keyup",(e)=>{
   	 searchTable()
   })

   document.getElementById('carset').style.display="none"




   let selectOptions_users = ``;

   console.log(cars)

   let carsR ='';

   let selectedCars ='';
   [...new Set(cars)].map((item, i) => {
          selectedCars+=`<option data-id="${item.creator}" data-vehicleplateno="${item.plate_number || item.plateNumber }" id="${item._id}"  data-vehiclename="${item.model || item.Model}">${item.car.car_name || item.Model}-${item._id}</option>`;


          carsR+=`
              <li onclick="viewCarDetail(this)"  data-id="${item.creator}" data-plate_no="${item.plateNo || item.plate_number}" data-desc="${item.description || item.carDescription}" data-image="${item.images || item.imagePath}" data-name="${item.car.car_name}" data-carid="${item._id}" id="${item._id}"   class="classless"><input class="example" type="checkbox" id="cb${i+1}" data-id="${item.creator}" />
                <label class="classless" for="cb${i+1}"><img    style="height:80px; width:70px" src="${item.images}" /></label>
              </li>`;

      });
   document.getElementById("carsme").innerHTML = carsR;

   let passedCars = {cars: cars};




      [...new Set(partners)].map((item, i) => {
          selectOptions_users+=`<option data-id="${item._id}" data-partnerid="${item._id}" data-bankaccount="${item.bankAccount}" data-bankaccountname="${item.bankAccountName}" data-bankaccountnumber="${item.bankAccountNumber}" id="${item._id}"  value="${item._id}">${item.email}</option>`;


      });

      // $('#email').append(selectOptions_users);


    	console.log("loading users page")

    let template2 ='';
    let viewModals = '';

  	const tablebody1 = document.getElementById('tablebody1');
  	const modalbody1 = document.getElementById("modalbody1");


    if(datas.length<=0){
        let item ={_id: 'jdskj83829309-02032' };
        let AviewModals ='';
        AviewModals += `

        <div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class=" slimScrollBar" >
                                            <div class="">
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                    <h4 class="modal-title">Partners Earnings Detail</h4>
                                                </div>
                                                <div class="">
                                                    <div class="row">


                                                    <div class="form-group" style="">
                                                                            </div>  </div>
                                    <br/>
                                                     <div class="col-md-12">
                                                           <div class="form-group ">
                                          <label for="position">Status</label>
                                          <select id="PaymentStatus${item._id}" class="form-control" data-style="btn-white">
                                              <option>On Hold</option>
                                              <option>Success</option>
                                              <option>Failed</option>

                                          </select>
                                          </div>




                                                            <div class="form-group">
                                                                <label for="field-1" class="control-label">Partner Email</label>
                                                                <select id="idpat-${item._id}" data-id="${item._id}" onchange="setEarningsDetail(this)"   class="selectpicker form-control" data-style="btn-white" id="PartnerEmail${item._id}" >
                                                                   <option>--select--</option>
                                                                   ${selectOptions_users}
                                                                </select>
                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-2" class="control-label">Payment Date</label>
                                                                <input type="date" class="form-control" id="paymentDate${item._id}" placeholder="24/21/2222">
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">Partner Id</label>
                                                                <input disabled type="text" class="form-control" id="partnerId${item._id}" placeholder="Boston">
                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Payment Ref</label>
                                                                <input disabled type="text" class="form-control" id="paymentReference${item._id}" placeholder="">
                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">BankAccount</label>


                                                                <input disabled type="text" class="form-control" id="partnerBankAccount${item._id}" placeholder="">

                                                            </div>



                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Bank Account Number</label>
                                                                <input disabled type="text" class="form-control" id="bankAccountNumber${item._id}" placeholder="">
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Bank Account Name</label>
                                                                <input disabled type="text" class="form-control" id="bankAccountName${item._id}" placeholder="">
                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Payment Amount</label>
                                                                <input value="" type="text" class="form-control" id="PaymentAmount${item._id}" placeholder="100">
                                                            </div>



                                                             <div class="form-group">
                                                                <label for="field-3" class="control-label">Vehicle/Car Id</label>


                                                            <select data-id="${item._id}" onchange="setCarDetailsOnearning(this)" type="text" class="form-control " id="vehicleId${item._id}"  >
                                                                 <option>--select--</option>
                                                                 ${selectedCars}
                                                            </select>

                                                            </div>

                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Vehicle Name</label>


                                                            <input disabled type="text" class="form-control " id="vehicleName${item._id}" >

                                                            </div>




                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">PlateNo</label>
                                                                <input disabled type="text" class="form-control" id="vehiclePlateNo${item._id}" placeholder="0">
                                                            </div>



                                                           <!-- <div class="form-group " style="display:none">
                                          <label for="position">User Role</label>
                                          <select id="type${item._id}" class="form-control" data-style="btn-white">
                                              <option> Individual Partner</option>
                                              <option>Organizational Partner</option>

                                          </select>
                                          </div>-->



                                                          </div>
                                                    </div>




                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button onclick="addEventEarnings(this)" data-id="${item._id}" data-url="/add-partner-earnings" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                      <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="updateDataEarnings(this)" data-id="${item._id}" data-url="/partners-earnings-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





          `;

       modalbody1.innerHTML=AviewModals;
      return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;


    }








    let className = null;

    console.log(datas)
  	datas.map((item, i) => {



  	    if(item.paymentStatus=="Completed" || item.paymentStatus=="Success"){
           className = "label-success"
  	    }else if(item.paymentStatus=="On Hold"){
           className = "label-warning"
  	    } else if(item.paymentStatus=="Failed"){
  	    	className = "label-danger"
  	    } else{
  	    	className="label-pink"
  	    }
        template2 +=`<tr class="notification">
                    <td class="">${item.paymentDate   || '' }</td>

                    <td class="">${item.partnerEmail || ''}</td>
                    <td class="">${item.partnerBankAccount.bankAccount || ''}</td>
                    <td>${item.paymentAmount || ''}</td>
                    <td class="">${item.vehicleId || '' }</td>
                    <td>${item.vehiclePlateNo || ''}</td>

                    <td class=""><span class="label ${className}">${item.paymentStatus || ''}</span></td>

                    <td class=""><a onclick="updateRecordViewEarnings(this)" data-toggle="modal" data-bankaccountname="${item.partnerBankAccount.bankAccountName || ''}" data-bankaccountnumber="${item.partnerBankAccount.bankAccountNumber || ''}" data-vehicleId="${item.vehicleId || ''}"  data-vehicleplateno="${item.vehiclePlateNo || ''}"   data-id="${item._id}" data-paymentamount="${item.paymentAmount || ''}" data-partneremail="${item.partnerEmail || ''}" data-partnerBankAccount="${item.partnerBankAccount.bankAccount || ''}" data-PartnerEmail="${item.PartnerEmail || ''}" data-paymentReference="${item.paymentReference || ''}"  data-paymentdate="${formatDate(new Date(item.paymentDate)) || ''}" data-paymentid="${item.paymentId || ''}" data-partnerid="${item.partnerId || ''}" data-vehiclename="${item.vehicleName || ''}"  class="table-action-btn"><i class="md md-edit"></i></a>
                    <a onclick="deleteRecord(this)" data-id="${item._id}" data-url="/partners-earnings"  class="table-action-btn "><i class="md md-close"></i></a></td>
                </tr>`;

         viewModals = `

        <div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class=" slimScrollBar" >
                                            <div class="">
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                    <h4 class="modal-title">Partners Earnings Detail</h4>
                                                </div>
                                                <div class="">
                                                    <div class="row">


                                                    <div class="form-group" style="">
                                                                            </div>  </div>
                                    <br/>
                                                     <div class="col-md-12">
                                                           <div class="form-group ">
									                        <label for="position">Status</label>
									                        <select id="PaymentStatus${item._id}" class="form-control" data-style="btn-white">
									                            <option>On Hold</option>
                                              <option>Success</option>
                                              <option>Failed</option>

									                        </select>
									                        </div>


                                                            <div class="form-group">
                                                                <label for="field-1" class="control-label">Partner Email</label>
                                                                <select id="idpat-${item._id}" data-id="${item._id}" onchange="setEarningsDetail(this)"   class="selectpicker form-control" data-style="btn-white" id="PartnerEmail${item._id}" >
                                                                   <option>--select--</option>
                                                                   ${selectOptions_users}
                                                                </select>
                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-2" class="control-label">Payment Date</label>
                                                                <input type="date" class="form-control" id="paymentDate${item._id}" placeholder="Doe">
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">Partner Id</label>
                                                                <input type="text" class="form-control" id="partnerId${item._id}" placeholder="Boston">
                                                            </div>



                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Payment Amount</label>
                                                                <input value="" type="text" class="form-control" id="PaymentAmount${item._id}" placeholder="United States">
                                                            </div>







                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Payment Ref</label>
                                                                <input type="text" class="form-control" id="paymentReference${item._id}" placeholder="email">
                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">BankAccount</label>

                                                                <input type="text" class="form-control" id="partnerBankAccount${item._id}" placeholder="email">

                                                            </div>



                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Bank Account Number</label>
                                                                <input type="text" class="form-control" id="bankAccountNumber${item._id}" placeholder="email">
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Bank Account Name</label>
                                                                <input type="text" class="form-control" id="bankAccountName${item._id}" placeholder="email">
                                                            </div>



                                                            <div class="form-group hello" >
                                                                <label for="field-3" class="control-label">Vehicle Name</label>

                                                            <input type="text" class="form-control " id="vehicleName${item._id}" />

                                                            </div>



                                                             <div class="form-group hello">
                                                                <label for="field-3" class="control-label">Vehicle/Car Id</label>


                                                            <input type="text" class="form-control " id="vehicleId${item._id}"  />

                                                            </div>


                                                            <div class="form-group hello">
                                                                <label for="field-3" class="control-label">PlateNo</label>
                                                                <input type="text" class="form-control" id="vehiclePlateNo${item._id}" placeholder="0">
                                                            </div>



                                                           <!-- <div class="form-group " style="display:none">
									                        <label for="position">User Role</label>
									                        <select id="type${item._id}" class="form-control" data-style="btn-white">
									                            <option> Individual Partner</option>
									                            <option>Organizational Partner</option>

									                        </select>
									                        </div>-->



                                                          </div>
                                                    </div>




                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button onclick="addEventEarnings(this)" data-id="${item._id}" data-url="/add-partner-earnings" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                      <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="updateDataEarnings(this)" data-id="${item._id}" data-url="/partners-earnings-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
		      `;

         modalbody1.innerHTML+=viewModals;

         //

          $("#idpat" + item._id).on('change', function() {
            // let selectedPartner = document.getElementById("#idpat" + item._id);
            // selectedPartner = selected.options[selected.selectedIndex];
            // let partners_cars = cars.filter(item =>{
            //     item.creator = selectedPartner.getAttribute('id')
            // })


            // alert("testing..." )

        });






         //  document.getElementById("partnerId"+ item._id).style.disabled=true
         // document.getElementById("vehicleId"+ item._id).style.disabled=true


    });









    tablebody1.insertAdjacentHTML('beforeend', template2);




    AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','Earnings page viewed')


  }





  static runAdminPartners(datas,previledges){

    datas = sortBy(datas, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })

    WarLockAdmin(previledges,'view_partners','manage_partners')
    noReadWrite(previledges,'manage_partners')

    GateKeepersForAdmin();
    addClick()
   document.getElementById("search").addEventListener("keyup",(e)=>{
     searchTable()
   })


      console.log("loading users page")

    let template2 ='';
    let viewModals = '';

    const tablebody1 = document.getElementById('tablebody1');
    const modalbody1 = document.getElementById("modalbody1");

    if(datas.length<=0){
        let item ={_id: 'jdskj83829309-02032' };
        let AviewModals ='';
        AviewModals += `

        <div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class=" slimScrollBar" >
                                            <div class="">
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                    <h4 class="modal-title">Partners Detail</h4>
                                                </div>
                                                <div class="">
                                                    <div class="row">


                                                    <div class="form-group" style="">
                                        <label for="profileImage" class="col-sm-4 control-label"></label>
                                        <div class="col-sm-7">
                                           <input type="hidden" id="avatar-url${item._id}" name="avatar-url" defaultValue="./public/assets/images/avatar.png"  />
                                            <img  id="preview${item._id}" style="border:1px solid gray;width:100px" src="./public/assets/images/avatar.png" alt="Avatar" class="avatar" />
                                             <p id="status">Please select a file</p>




                                                  <div class="upload-btn-wrapper">

                                                      <input onchange="initUpload(this)" data-id="${item._id}" type="file" name="myfile" id="file-input${item._id}"  />
                                                       <label htmlFor="myfile"><img src="/public/assets/images/camera.png"  style="width:50px;height:50px" id="clickme" />
                                                       </label>

                                                    </div>

                                            <ul  id="displayImages"></ul>

                                        </div>
                                    </div>  </div>
                                    <br/>
                                                     <div class="col-md-12">
                                                           <div class="form-group ">
                                          <label for="position">Status</label>
                                          <select id="status${item._id}" class="form-control" data-style="btn-white">
                                              <option>Active</option>
                                              <option>Disabled</option>
                                              <option>Suspended</option>
                                               <option>Dormant</option>
                                          </select>
                                          </div>


                                                            <div class="form-group">
                                                                <label for="field-1" class="control-label">First Name</label>
                                                                <input type="text" class="form-control" id="firstname${item._id}" placeholder="Doe">
                                                            </div>


                                                            <div class="form-group" >
                                                                <label for="field-2" class="control-label">Last Name</label>
                                                                <input type="text" class="form-control" id="lastname${item._id}" placeholder="Doe">
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">Business Name</label>
                                                                <input type="text" class="form-control" id="certificate${item._id}" placeholder="Boston">
                                                            </div>



                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">BankAccount</label>
                                                                <select data-style="btn-white" class="form-control" id="bankAccount${item._id}">
                                                                  <option>Access Bank</option>
                                                                  <option>Citibank</option>
                                                                  <option>Diamond Bank</option>
                                                                  <option>Dynamic Standard Bank</option>
                                                                  <option>Ecobank Nigeria</option>
                                                                  <option>Fidelity Bank Nigeria</option>
                                                                  <option>First Bank of Nigeria</option>
                                                                  <option>First City Monument Bank</option>
                                                                  <option>Guaranty Trust Bank</option>
                                                                  <option>Heritage Bank Plc</option>
                                                                  <option>Jaiz Bank</option>
                                                                  <option>Keystone Bank Limited</option>
                                                                  <option>Providus Bank Plc</option>
                                                                  <option>Stanbic IBTC Bank Nigeria Limited</option>
                                                                  <option>Standard Chartered Bank</option>
                                                                  <option>Sterling Bank</option>
                                                                  <option>Suntrust Bank Nigeria Limited</option>
                                                                  <option>Union Bank of Nigeria</option>
                                                                  <option>United Bank for Africa</option>
                                                                  <option>Unity Bank Plc</option>
                                                                  <option>Wema Bank</option>
                                                                  <option>Zenith Bank</option>

                                                                </select>
                                                            </div>


                                                            <div class="form-group" >
                                                                <label for="field-2" class="control-label">Account Name</label>
                                                                <input type="text" class="form-control" id="bankAccountName${item._id}" placeholder="Doe">
                                                            </div>

                                                            <div class="form-group" >
                                                                <label for="field-2" class="control-label">Account Number</label>
                                                                <input type="text" class="form-control" id="bankAccountNumber${item._id}" placeholder="Doe">
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Phone</label>
                                                                <input type="text" class="form-control" id="phone${item._id}" placeholder="United States">
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Password</label>
                                                                <input value="unchanged" type="password" class="form-control" id="password${item._id}" placeholder="United States">
                                                            </div>

                                                             <div class="checkbox checkbox-primary" style="display:none">

                                                                <input data-id="${item._id}" data-url="/admin-partners-detail-verification"  onchange="update_value_checked(this)" type="checkbox" class="" id="is_verified${item._id}" value="false">
                                                                <label for="field-3" class="control-label">User Verification  </label>
                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Email</label>
                                                                <input type="text" class="form-control" id="email${item._id}" placeholder="email">
                                                            </div>

                                                            <div class="form-group" >

                                                                <input  type="hidden"  class="form-control" id="username${item._id}" value="saladinjake">
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Address</label>


                                                            <textarea class="form-control autogrow" id="address${item._id}" placeholder="Give an office address" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>

                                                            </div>


                                                            <div class="form-group" style="display:none">
                                                                <label for="field-3" class="control-label">Minimum No of Cars</label>
                                                                <input type="number" class="form-control" id="totalCars${item._id}" value="1" placeholder="0">
                                                            </div>



                                                            <div class="form-group " style="display:none">
                                          <label for="position">User Role</label>
                                          <select id="type${item._id}" class="form-control" data-style="btn-white">
                                              <option> Individual Partner</option>
                                              <option>Organizational Partner</option>

                                          </select>
                                          </div>



                                                          </div>
                                                    </div>




                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button onclick="addEvent(this)" data-id="${item._id}" data-url="/add-partner" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                      <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="updateData(this)" data-id="${item._id}" data-url="/admin-partners-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>






          `;

       modalbody1.innerHTML=AviewModals;
      return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;


    }

    let className = null;
    let avt ='';
    datas.map((item, i) => {
        if(item.status=="Active"){
           className = "label-success"
        }else if(item.status=="Disabled"){
           className = "label-warning"
        } else if(item.status=="Suspended"){
          className = "label-danger"
        } else{
          className="label-pink"
        }

        if(item.avatar.length>0){
           avt = item.avatar.startsWith("https://") ? item.avatar : "https://Goom Logistics-bucket.s3.amazonaws.com/" + item.avatar
        }else{
          avt = 'https://Goom Logistics-bucket.s3.amazonaws.com/'+ 'saladinjake.jpg';
        }


        template2 +=`<tr class="notification">
                    <td class="">${item.firstName || item.name}</td>

                    <td class="">${item.email}</td>
                    <td class="">${item.businessName || '' }</td>
                    <td class="">${item.phoneNumber || item.phone}</td>

                    <td class=""><span class="label ${className}">${item.status}</span></td>

                    <td class=""><a onclick="updateRecordView(this)"  data-bankaccount="${item.bankAccount || '' }"  data-bankaccountname="${item.bankAccountName || '' }"  data-bankaccountnumber="${item.bankAccountNumber|| ''}" data-toggle="modal" data-isVerified="${item.isVerified|| 'No'}" data-totalCars="${item.totalCars}"  data-avatar="${avt|| item.avatar}"   data-id="${item._id}" data-totalCars="${item.totalCars}" data-firstname="${item.firstName || item.name }" data-lastname="${item.lastName || item.name }" data-email="${item.email}" data-phone="${item.phoneNumber || item.phone}" data-username="${item.userName || item.name }" data-address="${item.address || 'Enter your address'}" data-status="${item.status}" data-certificate="${item.businessName || ''}"  class="table-action-btn"><i class="md md-edit"></i></a>
                    <a onclick="deleteRecord(this)" data-id="${item._id}" data-url="/partners"  class="table-action-btn "><i class="md md-close"></i></a></td>
                </tr>`;


         viewModals += `

        <div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class=" slimScrollBar" >
                                            <div class="">
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                    <h4 class="modal-title">Partners Detail</h4>
                                                </div>
                                                <div class="">
                                                    <div class="row">


                                                    <div class="form-group" style="">
                                        <label for="profileImage" class="col-sm-4 control-label"></label>
                                        <div class="col-sm-7">
                                           <input type="hidden" id="avatar-url${item._id}" name="avatar-url" defaultValue="./public/assets/images/avatar.png"  />
                                            <img  id="preview${item._id}" style="border:1px solid gray;width:100px" src="./public/assets/images/avatar.png" alt="Avatar" class="avatar" />
                                             <p id="status">Please select a file</p>




                                                  <div class="upload-btn-wrapper">

                                                      <input onchange="initUpload(this)" data-id="${item._id}" type="file" name="myfile" id="file-input${item._id}"  />
                                                       <label htmlFor="myfile"><img src="/public/assets/images/camera.png"  style="width:50px;height:50px" id="clickme" />
                                                       </label>

                                                    </div>

                                            <ul  id="displayImages"></ul>

                                        </div>
                                    </div>  </div>
                                    <br/>
                                                     <div class="col-md-12">
                                                           <div class="form-group ">
                                          <label for="position">Status</label>
                                          <select id="status${item._id}" class="form-control" data-style="btn-white">
                                              <option>Active</option>
                                              <option>Disabled</option>
                                              <option>Suspended</option>
                                               <option>Dormant</option>
                                          </select>
                                          </div>


                                                            <div class="form-group">
                                                                <label for="field-1" class="control-label">Name</label>
                                                                <input type="text" class="form-control" id="firstname${item._id}" placeholder="Doe">
                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-2" class="control-label">Surname</label>
                                                                <input type="text" class="form-control" id="lastname${item._id}" placeholder="Doe">
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">Business Name</label>
                                                                <input type="text" class="form-control" id="certificate${item._id}" placeholder="Boston">
                                                            </div>



                                                                      <div class="form-group">
                                                                <label for="field-5" class="control-label">Bank Account</label>
                                                                <select data-style="btn-white" class="form-control" id="bankAccount${item._id}">
                                                                  <option>Access Bank</option>
                                                                  <option>Citibank</option>
                                                                  <option>Diamond Bank</option>
                                                                  <option>Dynamic Standard Bank</option>
                                                                  <option>Ecobank Nigeria</option>
                                                                  <option>Fidelity Bank Nigeria</option>
                                                                  <option>First Bank of Nigeria</option>
                                                                  <option>First City Monument Bank</option>
                                                                  <option>Guaranty Trust Bank</option>
                                                                  <option>Heritage Bank Plc</option>
                                                                  <option>Jaiz Bank</option>
                                                                  <option>Keystone Bank Limited</option>
                                                                  <option>Providus Bank Plc</option>
                                                                  <option>Stanbic IBTC Bank Nigeria Limited</option>
                                                                  <option>Standard Chartered Bank</option>
                                                                  <option>Sterling Bank</option>
                                                                  <option>Suntrust Bank Nigeria Limited</option>
                                                                  <option>Union Bank of Nigeria</option>
                                                                  <option>United Bank for Africa</option>
                                                                  <option>Unity Bank Plc</option>
                                                                  <option>Wema Bank</option>
                                                                  <option>Zenith Bank</option>

                                                                </select>
                                                            </div>


                                                            <div class="form-group" >
                                                                <label for="field-2" class="control-label">Account Name</label>
                                                                <input type="text" class="form-control" id="bankAccountName${item._id}" placeholder="Doe">
                                                            </div>

                                                            <div class="form-group" >
                                                                <label for="field-2" class="control-label">Account Number</label>
                                                                <input type="text" class="form-control" id="bankAccountNumber${item._id}" placeholder="Doe">
                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Phone</label>
                                                                <input type="text" class="form-control" id="phone${item._id}" placeholder="United States">
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Password</label>
                                                                <input value="unchanged" type="password" class="form-control" id="password${item._id}" placeholder="United States">
                                                            </div>

                                                             <div class="checkbox checkbox-primary">

                                                                <input data-id="${item._id}" data-url="/admin-partners-detail-verification"  onchange="update_value_checked(this)" type="checkbox" class="" id="is_verified${item._id}" value="false">
                                                                <label for="field-3" class="control-label">User Verification  </label>
                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Email</label>
                                                                <input type="text" class="form-control" id="email${item._id}" placeholder="email">
                                                            </div>

                                                            <div class="form-group" >
                                                                <label for="field-3" class="control-label">Username</label>
                                                                <input type="hidden"  class="form-control" id="username${item._id}"  value="saladinjake">
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Address</label>


                                                            <textarea class="form-control autogrow" id="address${item._id}" placeholder="Give an office address" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>

                                                            </div>


                                                            <div class="form-group" style="display:none">
                                                                <label for="field-3" class="control-label">Minimum No of Cars</label>
                                                                <input type="number" class="form-control" id="totalCars${item._id}" value="1" placeholder="0">
                                                            </div>



                                                            <div class="form-group " style="display:none">
                                          <label for="position">User Role</label>
                                          <select id="type${item._id}" class="form-control" data-style="btn-white">
                                              <option> Individual Partner</option>
                                              <option>Organizational Partner</option>

                                          </select>
                                          </div>



                                                          </div>
                                                    </div>




                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button onclick="addEvent(this)" data-id="${item._id}" data-url="/add-partner" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                      <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="updateData(this)" data-id="${item._id}" data-url="/admin-partners-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





          `;
    });

    modalbody1.innerHTML=viewModals;
    tablebody1.insertAdjacentHTML('beforeend', template2);

    AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','Partners page viewed')



  }


  static runAdminProfile(datas){
  	GateKeepersForAdmin();
    let viewModals ="";

    datas = sortBy(datas, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })
  	const user = JSON.parse(localStorage.getItem("userToken"))
    const modalbody1 = document.getElementById("modalbody1");
  	console.log(datas[0]);

    datas.map((item,i) =>{


  	         viewModals += `

        <div  id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class=" slimScrollBar" >
                                            <div class="">
                                                <div class="">

                                                    <h4 class="modal-title">Admin Profile Detail</h4>
                                                </div>
                                               <div class="">
                                                    <div class="row">

                                                    <div class="form-group" style="">
                                        <label for="profileImage" class="col-sm-4 control-label"></label>
                                        <div class="col-sm-7">
                                           <input type="hidden" id="avatar-url${item._id}" name="avatar-url" defaultValue="./public/assets/images/avatar.png"  />
                                            <img  id="preview${item._id}" style="border:1px solid gray;width:100px" src="./public/assets/images/avatar.png" alt="Avatar" class="avatar" />
                                             <p id="status">Please select a file</p>




                                                  <div class="upload-btn-wrapper">

                                                      <input onchange="initUpload(this)" type="file" name="myfile" id="file-input${item._id}" data-id="${item._id}"  />
                                                       <label htmlFor="myfile"><img src="/public/assets/images/camera.png"  style="width:50px;height:50px" id="clickme" />
                                                       </label>

                                                    </div>

                                            <ul  id="displayImages"></ul>

                                        </div>
                                    </div>  </div>
                                    <br/>
                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-1" class="control-label">Name</label>
                                                                <input type="text" class="form-control" id="firstname" placeholder="Doe">
                                                            </div>
                                                        </div>
                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-2" class="control-label">Surname</label>
                                                                <input type="text" class="form-control" id="lastname" placeholder="Doe">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Email</label>
                                                                <input type="text" class="form-control" id="email" placeholder="Address">
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Username</label>
                                                                <input type="text" class="form-control" id="username" placeholder="Address">
                                                            </div>





                                                             <div class="form-group ">
									                        <label for="position">User Role</label>
									                        <select id="type" class="form-control" data-style="btn-white">
									                            <option>Simple Admin</option>
									                            <option>Moderator Admin</option>
									                            <option>Super Admin</option>
									                        </select>
									                        </div>

                                                        </div>
                                                    </div>
                                                    <div class="row">


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Phone</label>
                                                                <input type="text" class="form-control" id="phone" placeholder="United States">
                                                            </div>
                                                        </div>

                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Password</label>
                                                                <input value="unchanged" type="password" class="form-control" id="password" placeholder="United States">
                                                            </div>
                                                        </div>


                                                         <div class="">
                                                             <div class="checkbox checkbox-primary">

                                                                <input data-id="${item._id}" data-url="/admin-profile-detail-verification"  onchange="update_value_checked(this)" type="checkbox" class="" id="is_verified${item._id}" value="false">
                                                                <label for="field-3" class="control-label">User Verification  </label>
                                                            </div>
                                                         </div>



                                                        <div class="">
                                                            <div class="form-group">

                                                                <input type="hidden" class="form-control" id="certificate" placeholder="Boston">
                                                            </div>
                                                        </div>




                                                    </div>
                                                    <div class="row">


                                                    </div>
                                                </div>

                                                <div class="modal-footer">
                                                <button disabled id="create" onclick="addEvent(this)" data-id="${item._id}" data-url="/add-profile" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button disabled onclick="deleteData(this)" data-id="${item._id}" data-url="/admins-profile" id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>
                                                    <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button id="update-profile"  data-id="${item._id}" data-url="/admin-profile-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





		      `;

    })
    modalbody1.innerHTML=viewModals;


     let firstname = document.getElementById("firstname"),
      lastname =document.getElementById("lastname"),
      username=document.getElementById("username"),
      password=document.getElementById("password"),

      phoneNumber= document.getElementById("phone");

    const certificate = document.getElementById("certificate");
    var user_typeSelect = document.getElementById('type');
    const user_type = user_typeSelect.options[user_typeSelect.selectedIndex].text;
    const email = document.getElementById("email");

    let idz= "#status";
    $( idz + " option").each(function () {
        if ($(this).html() == datas[0].status) {
            $(this).attr("selected", "selected");
            return;
        }
    });


     let idzz= "#type"
        $( idzz + " option").each(function () {
            if ($(this).html() == datas[0].roles) {
                $(this).attr("selected", "selected");
                return;
            }
        });



    const data = datas[0];
    firstname.value =data.firstname;
    lastname.value = data.lastname;
    username.value= data.username;
    email.value= data.email;
    phoneNumber.value= data.phone_number
    password.value="unchanged";



     const triggerUpdate = document.getElementById("update-profile");
     triggerUpdate.addEventListener("click", (e)=>{



       // const status_xa = document.getElementById("status");
       // const status = status_xa.options[status_xa.selectedIndex].text;









     let routeLink = {
          dataset:{
            url:"/admin-profile-detail",
            id: user.user._id,
            prePostData :{
              firstname: firstname.value,
            lastname:lastname.value,
            username: username.value,
            email: email.value,
            password: password.value,
            phoneNumber:phoneNumber.value,
            //avatar,
            certificate: certificate.value,
            user_type,
            //status: status,
        }
          }
     };
       e.preventDefault();
       profileUpdate(routeLink);
     });


     AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','Profile page viewed')


  }

  static runPlanPackage(individualPlans,corporatePlans,previledges){



 WarLockAdmin(previledges,'view_package','manage_package')
     noReadWrite(previledges,'manage_package')
  	GateKeepersForAdmin();
  	addPlan()
  	document.getElementById("search").addEventListener("keyup",(e)=>{
   	 searchTable()
   })



  	let data = [...individualPlans, ...corporatePlans]


        let template2 ='';
    let viewModals = '';

  	const tablebody1 = document.getElementById('tablebody1');
  	const modalbody1 = document.getElementById("modalbody1");

  	if(data.length<=0){
      return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;
    }


    data = sortBy(data, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })


  	data.map((item, i) => {
  		let className = "label-success"

  	if(item.status=="Active"){
           className = "label-success"
  	    }else if(item.status=="Disabled"){
           className = "label-warning"
  	    } else if(item.status=="Suspended"){
  	    	className = "label-danger"
  	    } else{
  	    	className="label-pink"
  	    }
        template2 =`<tr>
                         <td class=""><a onclick="viewPlan(this)" href="#" id="plancat${item._id}" data-id="${item._id}" data-url="/admin-plan-package-detail" class=""><b>${item.plan_name} </b></a> </td>
                          <td class="">${item.plan_categories}</td>
                          <td class="">NGN ${item.price}</td>
                           <td class="">${item.description}</td>

                           <td class=""><span class="label ${className}">${item.status}</span></td>
                           <td class="">
                               <a  onclick="viewPlan(this)" href="#" data-plan="${item.plan_name}" data-category="${item.plan_categories}" data-price="${item.price}" data-description="${item.description}" data-max_car="${item.car_max}" data-status="${item.status}"  id="plancat${item._id}" data-id="${item._id}" data-url="/admin-plan-package-detail" class="table-action-btn"><i class="md md-edit"></i></a>

                               <a onclick="deleteRecord(this)" data-id="${item._id}" data-url="/plan-package" data-delete_type="${item.plan_name}" id="delete" class="table-action-btn "><i class="md md-close"></i></a></td>
                           </td>
                   </tr>`;

      viewModals+=  `<div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class=" slimScrollBar" >
                                            <div >
                                                <div >
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                    <h4 class="modal-title">Plan Detail</h4>
                                                </div>
                                                <br/>
                                                <div >
                                                    <div class="row">
                                                         <div class="form-group">
									                        <label for="position">Plan</label>
									                        <select id="plan${item._id}" class="form-control" data-style="btn-white">
									                            <option value="Individual">Individual</option>
									                            <option value="Corporate">Corporate</option>

									                        </select>
									                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">Category</label>
                                                                <input type="text" class="form-control" id="category${item._id}" placeholder="New or old category type">
                                                            </div>
                                                            </div>

									                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">Price</label>
                                                                <input type="text" class="form-control" id="price${item._id}" placeholder="9000">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row">



                                                        <div class="" style="display:none">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Max Cars</label>
                                                                <input  type="text" class="form-control" value="3" id="max_car${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>


                                                         <div class="form-group">
									                        <label for="position">Status</label>
									                        <select id="status${item._id}" class="form-control" data-style="btn-white">
									                            <option>Active</option>
									                            <option>Disabled</option>
									                            <option>Suspended</option>
									                             <option>Dormant</option>
									                        </select>
									                        </div>


									                         <div class="form-group">
                                                                <label for="field-3" class="control-label">Description</label>


                                                            <textarea class="form-control autogrow" id="description${item._id}" placeholder="description" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>

                                                            </div>






                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">







                                                        </div>
                                                    </div>

                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button onclick="addPlanEvent(this)" data-id="${item._id}" data-url="/add-plan" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button style="display:none;opacity:0" onclick="deleteData(this)" data-id="${item._id}" data-url="/plan-package" data-delete_type="${item.plan_name}" id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>
                                                    <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="updatePlanData(this)" data-id="${item._id}" data-url="/admin-plan-package-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

		      `;

        tablebody1.insertAdjacentHTML('beforeend', template2);
    });

    modalbody1.innerHTML=viewModals;

    AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','Plan page viewed')


  }

  static runAdminSOS(datas,previledges){
    WarLockAdmin(previledges,'view_sos','manage_sos')
        noReadWrite(previledges,'manage_sos')

  	GateKeepersForAdmin();
  	//addSOS()
  	document.getElementById("search").addEventListener("keyup",(e)=>{
   	 searchTable()
   })

   datas = sortBy(datas, {
    prop: "created_at",
    desc: true,
    parser: (d) => new Date(d)
    })



	  	let data = [...datas]



	            let template2 ='';
    let viewModals = '';

  	const tablebody1 = document.getElementById('tablebody1');
  	const modalbody1 = document.getElementById("modalbody1");
  	if(data.length<=0){
      return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;
    }

    console.log(data)

    let media ="";
  	data.map((item, i) => {
  		let className='';

        if(item.status=="Ongoing"){

                className=`label-danger`;
         }else if(item.status=="Completed"){

                className= `label-success`;
        }else{

              className=`label-warning`;
         }

  	    // if(isVideo(item.media)){
       //    media ="video_viewer"
  	    // } else if(isImage(item.media)){
  	    // 	media ="image_viewer"
  	    // }

        // <td class="">
        //                        <button id="${item._id}" onclick="showModalVideo(this)" data-id="${item._id}" type="button" class="btn btn-primary video-btn" data-toggle="modal" data-src="https://Goom Logistics-bucket.s3.amazonaws.com/${item.media[0]}" data-target="#myModal">
        //                          View media
        //                        </button>
        //                    </td>
        template2 =`<tr>
                         <td class=""><a onclick="viewRecordTemplate(this)" href="#" id="plancat${item._id}" data-id="${item._id}" data-url="/admin-sos-detail" class=""><b>${formatDate(new Date(item.created_at))} </b></a> </td>

                          <td class="">CMT-USER- ${item.username}</td>
                           <td class="">${item.email}</td>

                           <td class="">${item.location}</td>
                           <td class=""><span class="label ${className}">${item.status}</span></td>
                           <td class="">
                               <a onclick="viewRecordTemplate(this)" href="#" data-plate_number="${item.plate_number}" data-date="${formatDate(new Date(item.created_at))}" data-user_id="${item.user_id}"  data-media="https://Goom Logistics-bucket.s3.amazonaws.com/${item.media[0]}" data-location="${item.location}" data-status="${item.status}"  id="plancat${item._id}" data-id="${item._id}" data-username="${item.username}" data-email="${item.email}" data-phone_number="${item.phone_number}" data-url="/admin-sos-detail" class="table-action-btn"><i class="md md-edit"></i></a>
                               <a onclick="deleteRecord(this)" data-id="${item._id}" data-url="/redflag-sos"  id="delete" class="table-action-btn "><i class="md md-close"></i></a></td>

                           </td>
                   </tr>`;

      viewModals+=  `<div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar" >
                                            <div>
                                                <div>
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>

                                                </div>
                                                <div>
                                                    <div class="row">
                                                         <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Created Date</label>
                                                                <input  type="text" disabled class="form-control" id="date${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">User ID</label>
                                                                <input type="text" disabled class="form-control" id="user_id${item._id}" placeholder="saladin">
                                                            </div>
                                                            </div>


                                                            <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Username</label>
                                                                <input  type="text" disabled class="form-control" id="username${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Email</label>
                                                                <input  type="text" disabled class="form-control" id="email${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Phone Number</label>
                                                                <input  type="text" disabled class="form-control" id="phone_number${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>

									                        <div class="">
                                                            <div class="form-group" style="display:none">
                                                                <label for="field-4" class="control-label">Plate Number</label>
                                                                <input type="text" disabled class="form-control" id="plate_number${item._id}" placeholder="AE-GX-2211">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row">











                                                         <div class="form-group ">
									                        <label for="position">Status</label>
									                        <select id="status${item._id}" class="form-control" data-style="btn-white">
									                            <option>Pending</option>
									                            <option>Ongoing</option>
									                            <option>Completed</option>

									                        </select>
									                        </div>






                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">

                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Location</label>


                                                            <textarea disabled class="form-control autogrow" id="location${item._id}" placeholder="Address location" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>

                                                            </div>





                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                         <div class="">
                                                        <label for="field-4" class="control-label">Record Link</label>
                                                          <button id="${item._id}" onclick="showModalVideo(this)" data-media="${item.media[0]}" data-id="${item._id}" type="button" class="btn " data-toggle="modal" data-src="${item.media[0]}" data-target="#myModal">
                                                          View media
                                                          </button>
                                                          <input style="visibility:hidden" type="hidden" disabled class="form-control" id="media${item._id}" placeholder="s3://aws.console....">



                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div class="modal-footer">
                                                <button onclick="addRecordEvent(this)" data-id="${item._id}" data-url="/add-sos" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>

                                                    <button onclick="updateRecordTemplate(this)" data-id="${item._id}" data-url="/admin-sos-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                    <button style="display:none; opacity:0" onclick="deleteData(this)" data-id="${item._id}" data-url="/redflag-sos"  id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>





		      `;



        tablebody1.insertAdjacentHTML('beforeend', template2);

    });

    modalbody1.innerHTML=viewModals;









    AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','SOS page viewed')



  }


  static runAdminTickets(datas, admins, users,previledges){

    datas = sortBy(datas, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })

    WarLockAdmin(previledges,'view_tickets','manage_tickets')
        noReadWrite(previledges,'manage_tickets')


    document.getElementById('add-new').addEventListener('click',(e)=>{
      //$('.mebox').show()

       document.getElementById("create").style.visibility="visible";
       document.getElementById("create").style.display="block";
     document.getElementById("update").style.visibility="hidden";
     //document.getElementById("delete").style.visibility="hidden";
     document.getElementById("cancle").style.visibility="hidden";

     let modal_view_id = document.getElementsByClassName("mebox");
     modal_view_id[0].style.display="block";


     var elements = document.getElementsByTagName("input");
    for (var ii=0; ii < elements.length; ii++) {
      if (elements[ii].type == "text") {
        elements[ii].value = "";

        elements[ii].disabled=false
      }
    }

    if(document.getElementsByTagName("textarea")){

    var elements = document.getElementsByTagName("textarea");
    for (var ii=0; ii < elements.length; ii++) {
      if (elements[ii].type == "text") {
        elements[ii].value = "";

        elements[ii].disabled=false
      }

    }
    }



     document.getElementById("first-view").style.display="none";
       document.getElementById("second-view").style.display="block";

    })


  	GateKeepersForAdmin();
  	//addSOS()
  	document.getElementById("search").addEventListener("keyup",(e)=>{
   	 searchTable()
   })



	let data = [...datas];

	let adminUsers = [...admins];
	let selectOptions = ``;


	adminUsers.map((item, i) => {
      selectOptions+=`<option>${item.username}</option>`;

    });


  //the users for the ticket


      let selectboxData = users;


    let usernames = [];

    let this_user_names = [...new Set(selectboxData)].filter((item)=>usernames.push(item.username) )



      let selectOptions_users = ``;





      [...new Set(selectboxData)].map((item, i) => {
          selectOptions_users+=`<option data-with="${item.phone_number}" data-id="${item.username}"  value="${item.username}">${item.email}</option>`;


      });






	let template2 ='';
    let viewModals = '';

  	const tablebody1 = document.getElementById('tablebody1');
  	const modalbody1 = document.getElementById("modalbody1");

    if(datas.length<=0){
        let item ={_id: 'jdskj83829309-02032' };
        let AviewModals ='';
        AviewModals += `

        <div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar">
                                            <div >
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>

                                                </div>
                                                <div class="">
                                                    <div class="row">


                                                             <div class="form-group">
                                          <label for="position">Email</label>
                                          <select data-id="${item._id}" onchange="autofill(this)" id="email${item._id}" class="form-control" data-style="btn-white">
                                              <option>--Select an email user--</option>
                                              ${selectOptions_users}

                                          </select>
                                          </div>

                                                       <div class="form-group">
                                          <label for="position">Username</label>
                                          <input  type="text" disabled class="form-control" id="username${item._id}" placeholder="unlimited">
                                          </div>

                                          <div class="">
                                                              <div class="form-group">
                                                                  <label for="field-4" class="control-label">Phone</label>
                                                                  <input type="text" disabled class="form-control" id="phone_number${item._id}" placeholder="AE-GX-2211">
                                                              </div>
                                                            </div>


                                          <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Ticket ID</label>
                                                                <input  type="text" disabled class="form-control" id="ticket_id${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>


                                          <div class="form-group">
                                                                <label for="field-5" class="control-label">Created Date</label>
                                                                <input  type="date"  class="form-control" id="date${item._id}" placeholder="unlimited">
                                          </div>


                                           <div class="form-group">
                                                                <label for="field-4" class="control-label">Subject</label>
                                                                <input type="text" disabled class="form-control" id="subject${item._id}" placeholder="AE-GX-2211">
                                                            </div>




                                                            <div class="form-group" style="display:none">
                                                                <label for="field-4" class="control-label">User ID</label>
                                                                <input type="text" disabled class="form-control" id="user_id${item._id}" placeholder="saladin">
                                                            </div>




                                                        </div>


                                                    <div class="row">















                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">








                                                            <br/>


                                                         <div class="form-group">
                                          <label for="position">Category</label>
                                          <select id="category${item._id}" class="form-control" data-style="btn-white">
                                              <option>General Enquiries</option>
                                              <option>Technical Support</option>
                                              <option>Feedback</option>

                                          </select>
                                          </div>

                                                         <div class="form-group">
                                          <label for="position">Status</label>
                                          <select id="status${item._id}" class="form-control" data-style="btn-white">
                                              <option>Pending</option>
                                              <option>Ongoing</option>
                                              <option>Completed</option>

                                          </select>
                                          </div>


                                          <div class="form-group">
                                          <label for="position">Assigned Admin</label>
                                          <select id="assigned_to${item._id}" class="form-control" data-style="btn-white">
                                              ${selectOptions}

                                          </select>
                                          </div>

                                          <br/>

                                          <div class="form-group">
                                                                <label for="field-3" class="control-label">Response</label>


                                                            <textarea  class="form-control autogrow" id="response${item._id}" placeholder="Response" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>

                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Ticket Complaints</label>


                                                            <textarea disabled class="form-control autogrow" id="comment${item._id}" placeholder="Description" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>

                                                            </div>









                                                        </div>
                                                    </div>

                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button onclick="addRecordEvent(this)" data-id="${item._id}" data-url="/add-ticket" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button style="display:none; opacity:0" onclick="deleteData(this)" data-id="${item._id}" data-url="/tickets" id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>
                                                    <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="updateRecordTemplate(this)" data-id="${item._id}" data-url="/admin-ticket-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





          `;

       modalbody1.innerHTML=AviewModals;
      return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;


    }


  	data.map((item, i) => {
  		let className='';

        if(item.status=="Ongoing"){

                className=`label-danger`;
         }else if(item.status=="Completed"){

                className= `label-success`;
        }else{

              className=`label-warning`;
         }
          console.log(item)
        template2 =`<tr>
                         <td class=""><a  href="#" id="plancat${item._id}" data-id="${item._id}" data-url="/admin-ticket-detail" class=""><b>${formatDate(new Date(item.created_at))} </b></a> </td>

                          <td class=""> ${item.email}</td>
                           <td class="">${item.category}</td>

                           <td class="">${item.subject}</td>
                           <td class="">CMT-RECORD-${item._id.substring(-12,item._id.length)}</td>
                           <td class=""><span class="label ${className}">${item.status}</span></td>
                           <td class="">
                               <a onclick="viewRecordTemplate(this)" href="#" data-assigned_to="${item.assigned_to}" data-username="${item.username}" data-response="${item.response}" data-email="${item.email}" data-phone_number="${item.phone_number}" data-ticket_id="${item.ticket_id}" data-date="${formatDate(new Date(item.created_at))}" data-user_id="${item.user_id}" data-category="${item.category}"  data-comment="${item.comment}" data-subject="${item.subject}" data-status="${item.status}"  id="plancat${item._id}" data-id="${item._id}" data-url="/admin-ticket-detail" class="table-action-btn"><i class="md md-edit"></i></a>
                               <a onclick="deleteRecord(this)" data-id="${item._id}" data-url="/tickets"  id="delete" class="table-action-btn "><i class="md md-close"></i></a></td>

                           </td>
                   </tr>`;



      viewModals+=  `<div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar">
                                            <div >
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>

                                                </div>
                                                <div class="">
                                                    <div class="row">


                                                             <div class="form-group">
                                          <label for="position">Email</label>
                                          <select data-id="${item._id}" onchange="autofill(this)" id="email${item._id}" class="form-control" data-style="btn-white">
                                              <option>--Select an email user--</option>
                                              ${selectOptions_users}

                                          </select>
                                          </div>

                                                       <div class="form-group">
                                          <label for="position">Username</label>
                                          <input  type="text" disabled class="form-control" id="username${item._id}" placeholder="unlimited">
                                          </div>

                                          <div class="">
                                                              <div class="form-group">
                                                                  <label for="field-4" class="control-label">Phone</label>
                                                                  <input type="text" disabled class="form-control" id="phone_number${item._id}" placeholder="AE-GX-2211">
                                                              </div>
                                                            </div>


                                          <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Ticket ID</label>
                                                                <input  type="text" disabled class="form-control" id="ticket_id${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>


                                          <div class="form-group">
                                                                <label for="field-5" class="control-label">Created Date</label>
                                                                <input  type="date"  class="form-control" id="date${item._id}" placeholder="unlimited">
                                          </div>


                                           <div class="form-group">
                                                                <label for="field-4" class="control-label">Subject</label>
                                                                <input type="text" disabled class="form-control" id="subject${item._id}" placeholder="AE-GX-2211">
                                                            </div>




                                                            <div class="form-group" style="display:none">
                                                                <label for="field-4" class="control-label">User ID</label>
                                                                <input type="text" disabled class="form-control" id="user_id${item._id}" placeholder="saladin">
                                                            </div>




                                                        </div>


                                                    <div class="row">















                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">








                                                            <br/>


                                                         <div class="form-group">
									                        <label for="position">Category</label>
									                        <select id="category${item._id}" class="form-control" data-style="btn-white">
									                            <option>General Enquiries</option>
									                            <option>Technical Support</option>
									                            <option>Feedback</option>

									                        </select>
									                        </div>

                                                         <div class="form-group">
									                        <label for="position">Status</label>
									                        <select id="status${item._id}" class="form-control" data-style="btn-white">
									                            <option>Pending</option>
									                            <option>Ongoing</option>
									                            <option>Completed</option>

									                        </select>
									                        </div>


									                        <div class="form-group">
									                        <label for="position">Assigned Admin</label>
									                        <select id="assigned_to${item._id}" class="form-control" data-style="btn-white">
									                            ${selectOptions}

									                        </select>
									                        </div>

									                        <br/>

									                        <div class="form-group">
                                                                <label for="field-3" class="control-label">Response</label>


                                                            <textarea  class="form-control autogrow" id="response${item._id}" placeholder="Response" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>

                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Ticket Complaints</label>


                                                            <textarea disabled class="form-control autogrow" id="comment${item._id}" placeholder="Description" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>

                                                            </div>









                                                        </div>
                                                    </div>

                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button onclick="addRecordEvent(this)" data-id="${item._id}" data-url="/add-ticket" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button style="display:none; opacity:0" onclick="deleteData(this)" data-id="${item._id}" data-url="/tickets" id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>
                                                    <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="updateRecordTemplate(this)" data-id="${item._id}" data-url="/admin-ticket-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


		      `;

        tablebody1.insertAdjacentHTML('beforeend', template2);
    });

    modalbody1.innerHTML=viewModals;

    AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','Ticket page viewed')

  }


  static runAdminFaqs(datas,previledges){

    datas = sortBy(datas, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })

     WarLockAdmin(previledges,'view_faqs','manage_faqs')
         noReadWrite(previledges,'manage_faqs')
    GateKeepersForAdmin();
    document.getElementById('add-new').addEventListener('click',(e)=>{
      //$('.mebox').show()

       document.getElementById("create").style.visibility="visible";
       document.getElementById("create").style.display="block";
     document.getElementById("update").style.visibility="hidden";
     //document.getElementById("delete").style.visibility="hidden";
     document.getElementById("cancle").style.visibility="hidden";

     let modal_view_id = document.getElementsByClassName("mebox");
     modal_view_id[0].style.display="block";


     var elements = document.getElementsByTagName("input");
    for (var ii=0; ii < elements.length; ii++) {
      if (elements[ii].type == "text") {
        elements[ii].value = "";
      }
    }

     document.getElementById("first-view").style.display="none";
       document.getElementById("second-view").style.display="block";

    })
    //addSOS()
    document.getElementById("search").addEventListener("keyup",(e)=>{
     searchTable()
   })



      let data = [...datas]



              let template2 ='';
    let viewModals = '';

    const tablebody1 = document.getElementById('tablebody1');
    const modalbody1 = document.getElementById("modalbody1");

    if(datas.length<=0){
        let item ={_id: 'jdskj83829309-02032' };
        let AviewModals ='';
        AviewModals += `

        <div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar" >
                                            <div class="">
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>

                                                </div>
                                                <div class="">


                                                    <div class="row">
                                                        <div class="col-md-12">


                                                        <div class="form-group">
                                          <label for="position">Status</label>
                                          <select id="status${item._id}" class="form-control" data-style="btn-white">
                                              <option>Active</option>
                                              <option>Disabled</option>


                                          </select>
                                          </div>

                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Question</label>


                                                            <textarea  class="form-control autogrow" id="question${item._id}" placeholder="Questions" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>

                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Answers</label>


                                                            <textarea class="form-control autogrow" id="answers${item._id}" placeholder="Answers" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>

                                                            </div>





                                                        </div>
                                                    </div>

                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button onclick="addRecordEvent(this)" data-id="${item._id}" data-url="/add-faq" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button style="display:none;opacity:0" onclick="deleteData(this)" data-id="${item._id}" data-url="/faqs" id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>
                                                    <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="updateRecordTemplate(this)" data-id="${item._id}" data-url="/admin-faqs-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



          `;

       modalbody1.innerHTML=AviewModals;
      return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;


    }


    data.map((item, i) => {
      let className = "label-success"
        if(item.status=="Active"){
             className ='label-success';
          }else if(item.status=="Disabled"){
             className ='label-danger';
          }else{
            className="label-warning"
          }
      template2 =`<tr>
                         <td class=""><a onclick="viewRecordTemplate(this)" href="#" id="plancat${item._id}" data-id="${item._id}" data-url="/admin-faq-detail" class=""><b>${formatDate(new Date(item.created_at))} </b></a> </td>

                          <td class=""> ${item.question}</td>
                           <td ><span class="label ${className}" >${item.status}</span></td>


                           <td class="">
                               <a onclick="viewRecordTemplate(this)" href="#" data-status="${item.status}"  data-question="${item.question}"  data-answer="${item.answer}" id="plancat${item._id}" data-id="${item._id}" data-url="/admin-faq-detail" class="table-action-btn"><i class="md md-edit"></i></a>
                               <a onclick="deleteRecord(this)" data-id="${item._id}" data-url="/faqs"  id="delete" class="table-action-btn "><i class="md md-close"></i></a></td>

                           </td>
                   </tr>`;

      viewModals+=  `<div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar" >
                                            <div class="">
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>

                                                </div>
                                                <div class="">


                                                    <div class="row">
                                                        <div class="col-md-12">


                                                        <div class="form-group">
                                          <label for="position">Status</label>
                                          <select id="status${item._id}" class="form-control" data-style="btn-white">
                                              <option>Active</option>
                                              <option>Disabled</option>


                                          </select>
                                          </div>

                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Question</label>


                                                            <textarea  class="form-control autogrow" id="question${item._id}" placeholder="Questions" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>

                                                            </div>


                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Answers</label>


                                                            <textarea class="form-control autogrow" id="answers${item._id}" placeholder="Answers" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>

                                                            </div>





                                                        </div>
                                                    </div>

                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button onclick="addRecordEvent(this)" data-id="${item._id}" data-url="/add-faq" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button style="display:none;opacity:0" onclick="deleteData(this)" data-id="${item._id}" data-url="/faqs" id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>
                                                    <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="updateRecordTemplate(this)" data-id="${item._id}" data-url="/admin-faqs-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





          `;

        tablebody1.insertAdjacentHTML('beforeend', template2);
    });

    modalbody1.innerHTML=viewModals;



    //add tiny mice to faq

    // $(document).ready(function () {
    //       if($("#elm1").length > 0){
    //           tinymce.init({
    //               selector: "textarea",
    //               theme: "modern",
    //               height:300,
    //               plugins: [
    //                   "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
    //                   "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
    //                   "save table contextmenu directionality emoticons template paste textcolor"
    //               ],
    //               toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      ink image | print preview media fullpage | forecolor backcolor emoticons",
    //               style_formats: [
    //                   {title: 'Bold text', inline: 'b'},
    //                   {title: 'Red text', inline: 'span', styles: {color: '#ff0000'}},
    //                   {title: 'Red header', block: 'h1', styles: {color: '#ff0000'}},
    //                   {title: 'Example 1', inline: 'span', classes: 'example1'},
    //                   {title: 'Example 2', inline: 'span', classes: 'example2'},
    //                   {title: 'Table styles'},
    //                   {title: 'Table row 1', selector: 'tr', classes: 'tablerow1'}
    //               ]
    //           });
    //       }
    //   });

    AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','FAQ page viewed')


  }


  static runAdminCarsMgt(datas,carsInfo,drivers,partners,previledges){

    datas = sortBy(datas, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })

WarLockAdmin(previledges,'view_cars','manage_cars')

noReadWrite(previledges,'manage_cars')

     GateKeepersForAdmin();
  		console.log("loading plan page")
  	document.getElementById("search").addEventListener("keyup",(e)=>{
   	  searchTable()
    })
    addClick()

     let selectOptionsDrivers = ``;
  let driv = [...new Set(drivers)]


  console.log(drivers)
   let selectOptionsPart ='';
  partners.map((item, i) => {
      selectOptionsPart+=`<option data-username="${item.name || item.firstname}" data-email="${item.email}" id="${item._id}" >${item.email}</option>`;

    });

  driv.map((item, i) => {
      selectOptionsDrivers+=`<option data-username="${item.username}" data-email="${item.email}" id="${item._id}" value="${item.phone_number}">${item.username}-${item.email}</option>`;

    });


    console.log(carsInfo)

    let carCategory = [];
    let modelNameOptionX = [];
    let car_year = [];

   carsInfo.map((item)=>{
     carCategory.push(item.car_name)
   });
   carCategory = [...new Set(carCategory)];

  let modelOption=``;



  carsInfo.map((item)=>{
     modelOption+=`<option data-value="${item.model_name}" data-year="${item.year}" data-trim="${item.model_trim}" data-id="${item.model_make_id}">${item.car_name}</option>`

  })









	let data = [...datas]
	let template2 ='';
    let viewModals = '';


   // let driversC = [...drivers];



  	const tablebody1 = document.getElementById('tablebody1');
  	const modalbody1 = document.getElementById("modalbody1");

    if(data.length<=0){
      return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;
    }

  	data.map((item, i) => {
  		let className = "label-success"
  	    if(item.status=="Booked"){
           className = "label-danger"
  	    }else if(item.status=="Available"){
           className = "label-success"
  	    } else{
           className = "label-warning"
        }

        let className2 ='label-warning'
        if(item.health_status=="Pending"){
           className2 = "label-warning"
        }else if(item.health_status=="Completed"){
          className2 = "label-success"
        }else{
          className2 = "label-danger"
        }

        let className3='';
        if(item.car_status=="Disabled"){
           className3 = "label-danger"
        }else if(item.car_status=="Active"){
           className3 = "label-success"
        } else{
           className3 = "label-warning"
        }




        template2 =`<tr>
                         <td class=""><a  href="#" id="plancat${item._id}" data-id="${item._id}" data-url="/admin-car-mgt-detail" class=""><b>${formatDate(new Date(item.created_at))} </b></a> </td>
                          <td class="">${item._id}</td>
                          <td class="">${ item.carModel  ||item.car_type}</td>
                          <td class="">${ item.carModel || item.model_make_id}</td>
                          <td class="">${ item.plateNo  || item.plate_number}</td>

                           <td class="">${ item.carYear || item.car_year}</td>
                           <td class="">${ item.vehicleColor || item.color}</td>

                           <td class=""><span class="label ${className}">${item.status}</span></td>

                          <td class=""><span class="label ${className2}">${ item.health_status}</span></td>

                          <td class=""><span class="label ${className3}">${ item.car_status}</span></td>
                           <td><img  style="width:100px;height:100px" src="${item.imagePath || item.images}" /></td>
                           <td class="">
                               <a onclick="viewCarRecordTemplate(this)" data-tin="${item.vehicleIdentificationNumber}" data-inspection_date="${item.inspectionDate }" data-inspection_time="${item.inspectionTime}" data-car_status="${item.car_status}" data-health_status="${item.health_status}" data-model_make_id="${ item.model_make_id || item.car.model_id}" data-trim="${ item.car.model_trim}" data-old_car="${ item.imagePath || item.images}" href="#" data-model="${ item.carModel  || item.car_type }"  data-car_type="${ item.carModel || item.car_type}" data-car_id="${item._id}" data-assigned_driver_name="${item.assigned_driver_name}" data-assigned_driver_email="${item.assigned_driver_email}" data-checkmate="${item.assigned_driver_name}-${item.assigned_driver_email}" data-date="${formatDate(new Date(item.created_at))}"  data-partner_id="${ item.creator || 'owned by company'}" data-model="${ item.carModel || item.model}"  data-car_year="${ item.carYear  || item.car_year}" data-color="${ item.vehicleColor || item.color}"  data-status="${item.status}" data-plate_number="${ item.plateNo || item.plate_number}" data-inspection_detail="${item.inspection_detail || 'No comment.' }" data-description="${ item.carDescription || item.description}"  id="plancat${item._id}" data-id="${item._id}" data-license="${ item.plateNo || item.license}" data-url="/admin-car-mgt-detail" class="table-action-btn"><i class="md md-edit"></i></a>
                                <a onclick="deleteRecord(this)" data-id="${item._id}" data-url="/cars"  id="delete" class="table-action-btn "><i class="md md-close"></i></a></td>

                           </td>
                   </tr>`;


      viewModals=`<div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar" style="">
                                            <div class="">
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>

                                                </div>

                                                <div class=" text-left">

								                        <div class="form-group">
                                        <div class="m-t-20">
                                                    <label for="position">Car Booking Status</label>
                                                    <div>
                                                    <select id="status${item._id}" class="selectpicker form-control" data-style="btn-white" tabindex="-98">
                                                       <option>--Select Status--</option>
                                                       <option>Booked</option>

                                                       <option>Available</option>



                                                    </select></div>
                                            </div>
                                        </div>


                                        <div class="m-t-20">
                                                    <label for="position">Inspection Status</label>
                                                    <div>
                                                    <select id="health_status${item._id}" class="selectpicker form-control" data-style="btn-white" tabindex="-98">
                                                        <option>--Select Status--</option>
                                                       <option>Pending</option>
                                                       <option>Completed</option>



                                                    </select></div>
                                            </div>
                                        </div>


                                        <div class="m-t-20">
                                                    <label for="position">Car Status</label>
                                                    <div>
                                                    <select id="car_status${item._id}" class="selectpicker form-control" data-style="btn-white" tabindex="-98">
                                                        <option>--Select Status--</option>
                                                       <option>Active</option>
                                                       <option>Disabled</option>
                                                       <option>Suspended</option>



                                                    </select></div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                <label for="inputColor">Partner Id</label>
                                <select id="partner_id${item._id}" type="text" class="form-control" id="" >
                                    ${selectOptionsPart}
                                </select>
                              </div>

								                        <div class="form-group">
                                        <div class="m-t-20">
                                                    <label for="position">Vehicle</label>
                                                    <div>
                                                    <select data-id="${item._id}" onchange="setCarDetail(this)"    id="car_model_make${item._id}" class="selectpicker form-control" data-style="btn-white" >
                                                        ${modelOption}
                                                    </select></div>
                                            </div>
                                        </div>




                                        <div class="form-group">
                                            <label for="inputColor">Model Id</label>
                                            <input disabled id="car_model_id${item._id}" type="text" class="form-control"  value="Blue">
                                        </div>

                                        <div class="form-group">
                                            <label for="inputColor">Model Name</label>
                                            <input disabled id="car_model_name${item._id}" type="text" class="form-control"  value="Blue">
                                        </div>

                                        <div class="form-group">
                                            <label for="inputColor">Trim Model</label>
                                            <input disabled id="car_model_trim${item._id}" type="text" class="form-control"  value="Blue">
                                        </div>

                                         <div class="form-group">
                                        <div class="m-t-20">
                                                    <label for="position">Car Year</label>
                                                    <div>

                                                    <input  id="car_year${item._id}" type="text" class="form-control"  >


                                                    </div>
                                            </div>
                                        </div>



                                        <div class="form-group">
                                            <label for="inputColor">Vehicle Identification Number</label>
                                            <input id="tin${item._id}" type="text" class="form-control"  value="Blue">
                                        </div>





								                        <div class="form-group">
								                            <label for="inputColor">Color</label>
								                            <input id="color${item._id}" type="text" class="form-control"  value="Blue">
								                        </div>

								                        <div class="form-group ">
								                            <label for="inputColor">Plate Number</label>
								                            <input id="plate_number${item._id}" type="text" class="form-control"  >
								                        </div>






                                      <div class="form-group">
                                        <div class="m-t-20">
                                                    <label for="position">Driver Assigned</label>
                                                    <div >
                                                    <select  id="drivers${item._id}" class="selectpicker form-control" data-style="btn-white">
                                                        <option>--Select Driver--</option>
                                                        ${selectOptionsDrivers}
                                                    </select></div>
                                            </div>
                                        </div>
                                        <br/><br/>

								                        <div class="">
								                        <div class="form-group">
								                            <label for="inputCarDescription">Car Description</label>
								                            <textarea id="description${item._id}" class="form-control autogrow" id="inputCarDescription" placeholder="The car is neat and the engine is working properly." style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>
								                        </div>

                                        <br/>
								                        <div class="form-group" style="display:none">
								                            <label for="inputLicense">License Plate Number</label>
								                            <input type="text" class="form-control" id="inputLicense${item._id}" >

								                        </div>
														</div>



															<div class="form-group">
																	<label for="">Car Inspection Details</label>
																	<textarea id="inspection_detail${item._id}" type="text" class="form-control"  >Inspection detail</textarea>
															</div>


                              <div class="form-group">
                                  <label for="">Car Inspection Date</label>
                                  <input  id="inspection_date${item._id}" type="text" class="form-control" placeholder="MM/DD/YYYY" >
                              </div>


                              <div class="form-group">
                                  <label for="">Car Inspection Time</label>
                                  <input id="inspection_time${item._id}" type="text" class="form-control" placeholder="HH:MM:AM/PM" >
                              </div>



                              <div class="form-group">
                              <label class="control-label">Upload Image</label>
                              <input onchange="initCarUpload(this)" data-id="${item._id}" type="file" class="filestyle" data-placeholder="No file" id="image-file${item._id}">
                              </div>


                              <img class="review-car" src="${item.images}"  id="img${item._id}" title="cars are here" data-carinfo="hello car"  style="width:100px;height:100px" /><span id="oldcar">old car profile</span>

								               <br/>


								                </div>
                                                <div style="clear:both;display:table;margin-right:0px">
                                                <button style="display:none" style="margin-right:5px;display:none" onclick="addCarRecordEvent(this)" data-id="${item._id}" data-url="/add-cars" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button style="display:none" style="margin-right:5px;" onclick="deleteData(this)" data-id="${item._id}" data-url="/faqs" id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>
                                                    <button style="margin-right:5px;" id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button style="margin-right:5px;" data-old_car="${item.images}" onclick="updateCarRecordTemplate(this)" data-id="${item._id}" data-url="/admin-cars-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





		      `;

        tablebody1.insertAdjacentHTML('beforeend', template2);

        modalbody1.innerHTML+=viewModals;


        // $("#car_model_make" + item._id).on('change', function() {
        //     alert("am here")

        // });

    });



    $('#publisher').on('change', function(e) {
      let selector = $(this).val();
      $("#site > option").hide();
      $("#site > option").filter(function(){return $(this).data('pub') == selector}).show();
    });



    AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','CAR MANAGEMENT page viewed')




  }

  static runAdminDriveTestAdd(url='add-drive-test', users, partners,previledges){


     WarLockAdmin(previledges,'view_drive_test','manage_drive_test')
   // WarLockAdmin('view_users','manage_users')
        noReadWrite(previledges,'manage_drive_test')
    let selectboxData = users;
    if(url='add-inspection'){
      selectboxData = partners;

    }

     // WarLockAdmin('view_cars')


     function hasClass(el, classname) {
       return el.classList.contains(classname);
    }

    console.log('this was called')
    let usernames = [];

    let this_user_names = [...new Set(selectboxData)].filter((item)=>usernames.push(item.username) )



      let selectOptions_users = ``;


     if(url!='add-inspection'){//for drive test

      [...new Set(selectboxData)].map((item, i) => {
          selectOptions_users+=`<option data-with="${item.test_certificate}" id="${item.username}-${i}"  value="${item.username}">${item.email}</option>`;


      });

    }else{


      [...new Set(selectboxData)].map((item, i) => {
          selectOptions_users+=`<option data-with="${item.test_certificate}" id="${item.userName}-${i}"  value="${item.userName}">${item.email}</option>`;


      });


    }

      $('#email').append(selectOptions_users);

      //document.getElementById("username").innerHTML= selectOptions_users



     // Map your choices to your option value

       let me;
        // When an option is changed, search the above for matching choices
        $('#email').on('change', function() {
           // Set selected option as variable
           var selectValue = $(this).text();




           // Empty the target field
           $('#username').empty();




           if(url!='add-inspection'){

              me =this_user_names.filter((item)=>item.username== $(this).val())
           console.log(me)
             if(me[0].phone_number){
                document.getElementById("phone_number").value =me[0].phone_number;
             }

             if(me[0].test_center){
               document.getElementById("time").value =me[0].test_center
              document.getElementById("description").value =me[0].test_center_address
             }
          }else{

            me =this_user_names.filter((item)=>item.userName== $(this).val())
             console.log(me)

            if(me[0].phoneNumber){
               document.getElementById("phone_number").value =me[0].phoneNumber;
             }

          }




           // For each chocie in the selected option
          // for (i = 0; i <  magicalLookup[selectValue].length; i++) {
              // Output choice in the target field
            $('#username').append(`<option>` +  $(this).val() + "</option>");



           //}
        });


     document.getElementById("savemesa").addEventListener('click', (e) =>{


       e.preventDefault()


        let linkOfApi = baseUrl+ '/'+ url ;




        const email_x = document.getElementById("email")


       const username_x = document.getElementById("username") ;

   const description=      document.getElementById("description").value

       const date = document.getElementById("created_date").value

        const phone_number = document.getElementById("phone_number").value


  const time =        document.getElementById("time").value

     const car_id =   document.getElementById("car_id").value

      const  status_x = document.getElementById("status")



      if( email_x.options[email_x.selectedIndex].text =='--Select an email user--'){
        var notification = alertify.notify('Select an email user.', 'error', 5, function(){  console.log('dismissed'); });

         return false;
      }


      if( !date){
        var notification = alertify.notify('Date required.', 'error', 5, function(){  console.log('dismissed'); });

         return false;
      }

      if(!car_id){
        var notification = alertify.notify('car id/plate number required.', 'error', 5, function(){  console.log('dismissed'); });

         return false;


      }


      if(url!='add-inspection'){

        if(!time){
        var notification = alertify.notify('Time required.', 'error', 5, function(){  console.log('dismissed'); });

         return false;


        }


        if(!description){
        var notification = alertify.notify('Remarks/Comment about the car inspected is required.', 'error', 5, function(){  console.log('dismissed'); });

         return false;


      }


      }

















          const prePostData = {

             username: username_x.options[username_x.selectedIndex].text,
            email: email_x.options[email_x.selectedIndex].text,
            phone_number: phone_number,
            description: description,
            createdDate: date,
            time: time,
            status: status_x.options[status_x.selectedIndex].text,
            car_id,


          };







          const user =JSON.parse(localStorage.getItem("userToken"));

          // const validResult = Validator.validatePlanPost({...prePostData});

         // console.log(validResult+ "update error")

              // if(validResult){
          fetch(linkOfApi, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': user.token,
              },
              body: JSON.stringify(prePostData),
              mode:"cors",
            })
              .then(response => response.json())
              .then(data => {
                console.log(data)
                if (data.status === 201) {

                  var notification = alertify.notify('Successfully created inspection ', 'success', 5, function(){  console.log('dismissed'); });

                  setTimeout(()=>{
                    window.location.href="./admin-drive-test"
                  },2000)


                 // ApiDeleteOneStatusRecord.redirect(recordOfType);
                } else {

                  var notification = alertify.notify('Could not perform update operation. Ensure the plan selected is correct.', 'error', 5, function(){  console.log('dismissed'); });

                }
              }).catch(e=> console.log(e));
         // }else{
         //  var notification = alertify.notify('unsuccessful update operation', 'error', 5, function(){  console.log('dismissed'); });

         // }


         if(url!='add-inspection'){
          let link=baseUrl+ "/update-testcenter/"+me[0]._id
         updateUsersTestCenter(link, {test_center:me[0].test_center, test_center_address: me[0].test_center_address})

         }


         // update user test center


     })


  }

  static runAdminInspectionAdd(url='add-inspection', users, partners,previledges){
    WarLockAdmin(previledges,'view_car_inspection','manage_car_inspection')
   // WarLockAdmin('view_users','manage_users')
      noReadWrite(previledges,'manage_car_inspection')
    let selectboxData = users;
    if(url='add-inspection'){
      selectboxData = partners;

    }

     // WarLockAdmin('view_cars')


     function hasClass(el, classname) {
       return el.classList.contains(classname);
    }

    console.log('this was called')
    let usernames = [];

    let this_user_names = [...new Set(selectboxData)].filter((item)=>usernames.push(item.username) )



      let selectOptions_users = ``;


     if(url!='add-inspection'){//for drive test

      [...new Set(selectboxData)].map((item, i) => {
          selectOptions_users+=`<option data-with="${item.test_certificate}" id="${item.username}-${i}"  value="${item.username}">${item.email}</option>`;


      });

    }else{


      [...new Set(selectboxData)].map((item, i) => {
          selectOptions_users+=`<option data-with="${item.test_certificate}" id="${item.userName}-${i}"  value="${item.userName}">${item.email}</option>`;


      });


    }

      $('#email').append(selectOptions_users);

      //document.getElementById("username").innerHTML= selectOptions_users



     // Map your choices to your option value

       let me;
        // When an option is changed, search the above for matching choices
        $('#email').on('change', function() {
           // Set selected option as variable
           var selectValue = $(this).text();




           // Empty the target field
           $('#username').empty();




           if(url!='add-inspection'){

              me =this_user_names.filter((item)=>item.username== $(this).val())
           console.log(me)
             if(me[0].phone_number){
                document.getElementById("phone_number").value =me[0].phone_number;
             }

             if(me[0].test_center){
               document.getElementById("time").value =me[0].test_center
              document.getElementById("description").value =me[0].test_center_address
             }
          }else{

            me =this_user_names.filter((item)=>item.userName== $(this).val())
             console.log(me)

            if(me[0].phoneNumber){
               document.getElementById("phone_number").value =me[0].phoneNumber;
             }

          }




           // For each chocie in the selected option
          // for (i = 0; i <  magicalLookup[selectValue].length; i++) {
              // Output choice in the target field
            $('#username').append(`<option>` +  $(this).val() + "</option>");



           //}
        });


     document.getElementById("savemesa").addEventListener('click', (e) =>{


       e.preventDefault()


        let linkOfApi = baseUrl+ '/'+ url ;




        const email_x = document.getElementById("email")


       const username_x = document.getElementById("username") ;

   const description=      document.getElementById("description").value

       const date = document.getElementById("created_date").value

        const phone_number = document.getElementById("phone_number").value


  const time =        document.getElementById("time").value

     const car_id =   document.getElementById("car_id").value

      const  status_x = document.getElementById("status")



      if( email_x.options[email_x.selectedIndex].text =='--Select an email user--'){
        var notification = alertify.notify('Select an email user.', 'error', 5, function(){  console.log('dismissed'); });

         return false;
      }


      if( !date){
        var notification = alertify.notify('Date required.', 'error', 5, function(){  console.log('dismissed'); });

         return false;
      }

      if(!car_id){
        var notification = alertify.notify('car id/plate number required.', 'error', 5, function(){  console.log('dismissed'); });

         return false;


      }


      if(url!='add-inspection'){

        if(!time){
        var notification = alertify.notify('Time required.', 'error', 5, function(){  console.log('dismissed'); });

         return false;


        }


        if(!description){
        var notification = alertify.notify('Remarks/Comment about the car inspected is required.', 'error', 5, function(){  console.log('dismissed'); });

         return false;


      }


      }

















          const prePostData = {

             username: username_x.options[username_x.selectedIndex].text,
            email: email_x.options[email_x.selectedIndex].text,
            phone_number: phone_number,
            description: description,
            createdDate: date,
            time: time,
            status: status_x.options[status_x.selectedIndex].text,
            car_id,


            // username: username,
            // email: email,
            // phone_number: phone_number,
            // description: description,
            // createdDate: createdDate,
            // time: time,
            // status,
            // car_id,
          };







          const user =JSON.parse(localStorage.getItem("userToken"));

          // const validResult = Validator.validatePlanPost({...prePostData});

         // console.log(validResult+ "update error")

              // if(validResult){
          fetch(linkOfApi, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': user.token,
              },
              body: JSON.stringify(prePostData),
              mode:"cors",
            })
              .then(response => response.json())
              .then(data => {
                console.log(data)
                if (data.status === 201) {

                  var notification = alertify.notify('Successfully created inspection ', 'success', 5, function(){  console.log('dismissed'); });

                  setTimeout(()=>{
                    window.location.href="./admin-inspection"
                  },2000)


                 // ApiDeleteOneStatusRecord.redirect(recordOfType);
                } else {

                  var notification = alertify.notify('Could not perform update operation. Ensure the plan selected is correct.', 'error', 5, function(){  console.log('dismissed'); });

                }
              }).catch(e=> console.log(e));
         // }else{
         //  var notification = alertify.notify('unsuccessful update operation', 'error', 5, function(){  console.log('dismissed'); });

         // }


         if(url!='add-inspection'){
          let link=baseUrl+ "/update-testcenter/"+me[0]._id
         updateUsersTestCenter(link, {test_center:me[0].test_center, test_center_address: me[0].test_center_address})

         }


         // update user test center


     })

  }

  static runAdminInspection(datas,carsInfo,drivers,partners,previledges){

    datas =sortBy(datas, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })

     WarLockAdmin(previledges,'view_car_inspection','manage_car_inspection')
         noReadWrite(previledges,'manage_car_inspection')
    GateKeepersForAdmin();
     document.getElementById("search").addEventListener("keyup",(e)=>{
      searchCars()
    })
    addClick()

     let selectOptionsDrivers = ``;
  let driv = [...new Set(drivers)]


  console.log(drivers)
   let selectOptionsPart ='';
  partners.map((item, i) => {
      selectOptionsPart+=`<option data-username="${item.name || item.firstname}" data-email="${item.email}" id="${item._id}" >${item.email}</option>`;

    });

  driv.map((item, i) => {
      selectOptionsDrivers+=`<option data-username="${item.username}" data-email="${item.email}" id="${item._id}" value="${item.phone_number}">${item.username}-${item.email}</option>`;

    });


    console.log(carsInfo)

    let carCategory = [];
    let modelNameOptionX = [];
    let car_year = [];

   carsInfo.map((item)=>{
     carCategory.push(item.car_name)
   });
   carCategory = [...new Set(carCategory)];

  let modelOption=``;



  carsInfo.map((item)=>{
     modelOption+=`<option data-value="${item.model_name}" data-year="${item.year}" data-trim="${item.model_trim}" data-id="${item.model_make_id}">${item.car_name}</option>`

  })









  let data = [...datas]
  let template2 ='';
    let viewModals = '';


    data =sortBy(data, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })


   // let driversC = [...drivers];



    const tablebody1 = document.getElementById('tablebody1');
    const modalbody1 = document.getElementById("modalbody1");


    if(data.length<=0){
      return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;
    }

    data.map((item, i) => {
      let className = "label-success"
        if(item.status=="Booked"){
           className = "label-danger"
        }else if(item.status=="Available"){
           className = "label-success"
        } else{
           className = "label-warning"
        }

        let className2 ='label-warning'
        if(item.health_status=="Pending"){
           className2 = "label-warning"
        }else if(item.health_status=="Completed"){
          className2 = "label-success"
        }else{
          className2 = "label-danger"
        }

        let className3='';
        if(item.car_status=="Disabled"){
           className3 = "label-danger"
        }else if(item.car_status=="Active"){
           className3 = "label-success"
        } else{
           className3 = "label-warning"
        }

        if(item.status=="Pending"){
          item.health_status= 'Pending'
          item.status="Available"
        }

        // let itemv = JSON.stringify(data);




        template2 =`

                           <div style=""  class="col-sm-6 col-lg-3 col-md-4 mobiles" >



                                    <div class="product-list-box thumb">
                                        <a href="#" class="image-popup" title="Screenshot-1">
                                            <img style="height:200px; " src="${item.imagePath || item.images}" class="thumb-img" alt="work-thumbnail" />
                                        </a>

                                        <div class="product-action">
                                            <a href="#" class="btn btn-success btn-sm" onclick="viewInspectionUpdate(this);" href="#" data-contime="${item.confirmedInspectionTime}" data-condate="${item.confirmedInspectionDate}" data-id="${item._id}" data-inspection_date="${item.inspectionDate }" data-inspection_time="${item.inspectionTime}" data-car_status="${item.car_status}" data-health_status="${item.health_status}" data-model_make_id="${ item.model_make_id || item.car.model_id}" data-trim="${ item.car.model_trim}" data-old_car="${ item.imagePath || item.images}" href="#" data-model="${ item.carModel  || item.car_type }"  data-car_type="${ item.carModel || item.car_type}" data-car_id="${item._id}" data-assigned_driver_name="${item.assigned_driver_name}" data-assigned_driver_email="${item.assigned_driver_email}" data-checkmate="${item.assigned_driver_name }-${item.assigned_driver_email }" data-date="${formatDate(new Date(item.created_at))}"  data-partner_id="${ item.creator || 'owned by company'}" data-model="${ item.carModel || item.model}"  data-car_year="${ item.carYear  || item.car_year}" data-color="${ item.vehicleColor || item.color}"  data-status="${item.status}" data-plate_number="${ item.plateNo || item.plate_number}" data-inspection_detail="${item.inspection_detail || 'No comment.' }" data-description="${ item.carDescription || item.description}"  id="plancat${item._id}" data-id="${item._id}" data-license="${ item.plateNo || item.license}" data-url="/admin-car-mgt-detail" class="table-action-btn"><i class="md md-mode-edit"></i></a>
                                <a href="#" class="btn btn-danger btn-sm"><i class="md md-close"></i></a>
                                        </div>


                                        <div class="detail">
                                            <h4 class="m-t-0"><a href="" class="text-dark">${ item.car.car_name  }</a> </h4>
                                            <div class="rating">
                                                <ul class="list-inline">
                                                    <li><span class="label ${className2}">${ item.health_status}</span></li>

                                                </ul>
                                            </div>
                                            <h5 class="m-0"> <span class="text-muted"> ${ item.car.model_make_id}</span></h5>
                                        </div>
                                    </div>
                                </div>

                  `;


         viewModals+=`<div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar" style="">
                                            <div class="">
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>

                                                </div>

                                                <div class=" text-left">

                                        <div class="form-group">
                                        <div class="m-t-20">
                                                    <label for="position">Car Booking Status</label>
                                                    <div>
                                                    <select disabled id="status${item._id}" class="selectpicker form-control" data-style="btn-white" tabindex="-98">
                                                       <option>--Select Status--</option>
                                                       <option>Booked</option>

                                                       <option>Available</option>



                                                    </select></div>
                                            </div>
                                        </div>


                                        <div class="m-t-20">
                                                    <label for="position">Inspection Status</label>
                                                    <div>
                                                    <select id="health_status${item._id}" class="selectpicker form-control" data-style="btn-white" tabindex="-98">
                                                        <option>--Select Status--</option>
                                                       <option>Pending</option>
                                                       <option>Completed</option>



                                                    </select></div>
                                            </div>
                                        </div>


                                        <div class="form-group">
                                            <label for="inputColor">Confirmed Inspection Date</label>
                                            <input  id="condate${item._id}" type="date" class="form-control"  value="Blue">
                                        </div>

                                        <div class="form-group">
                                            <label for="inputColor">Confirmed Inspection Time</label>
                                            <input  id="contime${item._id}" type="time" class="form-control"  value="Blue">
                                        </div>


                                        <div class="m-t-20">
                                                    <label for="position">Car Status</label>
                                                    <div>
                                                    <select disabled id="car_status${item._id}" class="selectpicker form-control" data-style="btn-white" tabindex="-98">
                                                        <option>--Select Status--</option>
                                                       <option>Active</option>
                                                       <option>Disabled</option>
                                                       <option>Suspended</option>



                                                    </select></div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                <label for="inputColor">Partner Id</label>
                                <select disabled id="partner_id${item._id}" type="text" class="form-control" id="" >
                                    ${selectOptionsPart}
                                </select>
                              </div>

                                        <div class="form-group">
                                        <div class="m-t-20">
                                                    <label for="position">Vehicle</label>
                                                    <div>
                                                    <select disabled data-id="${item._id}" onchange="setCarDetail(this)"    id="car_model_make${item._id}" class="selectpicker form-control" data-style="btn-white" >
                                                        ${modelOption}
                                                    </select></div>
                                            </div>
                                        </div>




                                        <div class="form-group">
                                            <label for="inputColor">Model Id</label>
                                            <input disabled id="car_model_id${item._id}" type="text" class="form-control"  value="Blue">
                                        </div>

                                        <div class="form-group">
                                            <label for="inputColor">Model Name</label>
                                            <input disabled id="car_model_name${item._id}" type="text" class="form-control"  value="Blue">
                                        </div>

                                        <div class="form-group">
                                            <label for="inputColor">Trim Model</label>
                                            <input disabled id="car_model_trim${item._id}" type="text" class="form-control"  value="Blue">
                                        </div>

                                         <div class="form-group">
                                        <div class="m-t-20">
                                                    <label for="position">Car Year</label>
                                                    <div>

                                                    <input disabled  id="car_year${item._id}" type="text" class="form-control"  >


                                                    </div>
                                            </div>
                                        </div>





                                        <div class="form-group">
                                            <label for="inputColor">Color</label>
                                            <input disabled id="color${item._id}" type="text" class="form-control"  value="Blue">
                                        </div>

                                        <div class="form-group ">
                                            <label for="inputColor">Plate Number</label>
                                            <input disabled id="plate_number${item._id}" type="text" class="form-control"  >
                                        </div>






                                      <div class="form-group" style="display:none">
                                        <div class="m-t-20">
                                                    <label for="position">Driver Assigned</label>
                                                    <div >
                                                    <select  id="drivers${item._id}" class="selectpicker form-control" data-style="btn-white">
                                                        <option>--Select Driver--</option>
                                                        ${selectOptionsDrivers}
                                                    </select></div>
                                            </div>
                                        </div>
                                        <br/><br/>

                                        <div class="">
                                        <div class="form-group">
                                            <label for="inputCarDescription">Car Description</label>
                                            <textarea disabled id="description${item._id}" class="form-control autogrow" id="inputCarDescription" placeholder="The car is neat and the engine is working properly." style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>
                                        </div>

                                        <br/>
                                        <div class="form-group" style="display:none">
                                            <label for="inputLicense">License Plate Number</label>
                                            <input disabled type="text" class="form-control" id="inputLicense${item._id}" >

                                        </div>
                            </div>



                              <div class="form-group">
                                  <label for="">Car Inspection Details</label>
                                  <textarea disabled id="inspection_detail${item._id}" type="text" class="form-control"  >Inspection detail</textarea>
                              </div>


                              <div class="form-group">
                                  <label for="">Car Inspection Date</label>
                                  <input  disabled id="inspection_date${item._id}" type="text" class="form-control" placeholder="MM/DD/YYYY" >
                              </div>


                              <div class="form-group">
                                  <label for="">Car Inspection Time</label>
                                  <input disabled id="inspection_time${item._id}" type="text" class="form-control" placeholder="HH:MM:AM/PM" >
                              </div>



                              <div class="form-group" style="display:none">
                              <label class="control-label">Upload Image</label>
                              <input disabled onchange="initCarUpload(this)" data-id="${item._id}" type="file" class="filestyle" data-placeholder="No file" id="image-file${item._id}">
                              </div>


                              <img style="display:none" class="review-car" src="${item.images}"  id="img${item._id}" title="cars are here" data-carinfo="hello car"  style="width:100px;height:100px" /><span id="oldcar"></span>

                               <br/>


                                </div>
                                                <div style="clear:both;display:table;margin-right:0px">
                                                <button style="display:none" style="margin-right:5px;display:none" onclick="addCarRecordEvent(this)" data-id="${item._id}" data-url="/add-cars" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button style="display:none" style="margin-right:5px;" onclick="deleteData(this)" data-id="${item._id}" data-url="/faqs" id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>
                                                    <button style="margin-right:5px;" id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button style="margin-right:5px;" data-old_car="${item.images}" onclick="updateInspectionAction(this)" data-id="${item._id}" data-url="/admin-inspection-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





          `;

        tablebody1.insertAdjacentHTML('beforeend', template2);
    });


    modalbody1.innerHTML=viewModals;

    AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','Inspection  page viewed')


  }



  static runAdminCarRetrieval(datas,carsInfo,drivers,partners,previledges){

    datas =sortBy(datas, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })

     WarLockAdmin(previledges,'view_car_inspection','manage_car_inspection')
         noReadWrite(previledges,'manage_car_inspection')
    GateKeepersForAdmin();
     document.getElementById("search").addEventListener("keyup",(e)=>{
      searchCars()
    })
    addClick()

     let selectOptionsDrivers = ``;
  let driv = [...new Set(drivers)]


  // console.log(drivers)
   let selectOptionsPart ='';
  partners.map((item, i) => {
     if(!item.name){
       item.name = item.firstName;
     }
      selectOptionsPart+=`<option data-username="${item.name || item.firstName}" data-email="${item.email}" id="${item._id}" >${item.email}</option>`;

    });

  driv.map((item, i) => {
      selectOptionsDrivers+=`<option data-username="${item.username}" data-email="${item.email}" id="${item._id}" value="${item.phone_number}">${item.username}-${item.email}</option>`;

    });


    console.log(carsInfo)

    let carCategory = [];
    let modelNameOptionX = [];
    let car_year = [];

   carsInfo.map((item)=>{
     carCategory.push(item.car_name)
   });
   carCategory = [...new Set(carCategory)];

  let modelOption=``;



  carsInfo.map((item)=>{
     modelOption+=`<option data-car_id="${item._id}" data-value="${item.car.model_name}" data-year="${item.carYear}" data-trim="${item.car.model_trim}" data-id="${item.car.model_make_id}">${item.car.car_name}</option>`

  })









  let data = [...datas]
  let template2 ='';
    let viewModals = '';


    data =sortBy(data, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })


   // let driversC = [...drivers];



    const tablebody1 = document.getElementById('tablebody1');
    const modalbody1 = document.getElementById("modalbody1");


    if(data.length<=0){
      return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;
    }

    data.map((item, i) => {
      let className = "label-success"
        if(item.status=="Booked"){
           className = "label-danger"
        }else if(item.status=="Available"){
           className = "label-success"
        } else{
           className = "label-warning"
        }

        let className2 ='label-warning'
        if(item.health_status=="Pending"){
           className2 = "label-warning"
        }else if(item.health_status=="Completed"){
          className2 = "label-success"
        }else{
          className2 = "label-danger"
        }

        let className3='';
        if(item.car_status=="Disabled"){
           className3 = "label-danger"
        }else if(item.car_status=="Active"){
           className3 = "label-success"
        } else{
           className3 = "label-warning"
        }

        if(item.status=="Pending"){
          item.health_status= 'Pending'
          item.status="Available"
        }

        // let itemv = JSON.stringify(data);


        // if(item.car_status=="Active"){



        template2 =`

                           <div style=""  class="col-sm-6 col-lg-3 col-md-4 mobiles" >



                                    <div class="product-list-box thumb">
                                        <a href="#" class="image-popup" title="Screenshot-1">
                                            <img style="height:200px; " src="${item.imagePath || item.images}" class="thumb-img" alt="work-thumbnail" />
                                        </a>

                                        <div class="product-action">
                                            <a href="#" class="btn btn-success btn-sm" onclick="viewRetrievalUpdate(this);" href="#" data-revoked="${item.hasBeenRevoked}" data-contime="${item.confirmedInspectionTime}" data-condate="${item.confirmedInspectionDate}" data-id="${item._id}" data-inspection_date="${item.inspectionDate }" data-inspection_time="${item.inspectionTime}" data-car_status="${item.car_status}" data-health_status="${item.health_status}" data-model_make_id="${ item.model_make_id || item.car.model_id}" data-trim="${ item.car.model_trim}" data-old_car="${ item.imagePath || item.images}" href="#" data-model="${ item.carModel  || item.car_type }"  data-car_type="${ item.carModel || item.car_type}" data-car_id="${item._id}" data-assigned_driver_name="${item.assigned_driver_name}" data-assigned_driver_email="${item.assigned_driver_email}" data-checkmate="${item.assigned_driver_name }-${item.assigned_driver_email }" data-date="${formatDate(new Date(item.created_at))}"  data-partner_id="${ item.creator || 'owned by company'}" data-model="${ item.carModel || item.model}"  data-car_year="${ item.carYear  || item.car_year}" data-color="${ item.vehicleColor || item.color}"  data-status="${item.status}" data-plate_number="${ item.plateNo || item.plate_number}" data-inspection_detail="${item.inspection_detail || 'No comment.' }" data-description="${ item.carDescription || item.description}"  id="plancat${item._id}" data-id="${item._id}" data-license="${ item.plateNo || item.license}" data-url="/admin-car-mgt-detail" class="table-action-btn"><i class="md md-mode-edit"></i></a>
                                        </div>


                                        <div class="detail">
                                            <h4 class="m-t-0"><a href="" class="text-dark">${ item.car.car_name  }</a> </h4>
                                            <div class="rating">
                                                <ul class="list-inline">
                                                    <li><span class="label ${className2}">${ item.health_status}</span></li>

                                                </ul>
  <section class="article">
  <article class="article__panel article__panel_blue" id="article-blue">
    <div class="article__body">
      <div class="article__container">
        <header class="article__header">
          <h2>${item.car.car_name}</h2>
          <a role="button" href="#0" class="back-link">close</a>
        </header>
        <p>
          ${item.carDescription}
        </p>
        <p></p>
      </div>
    </div>
  </article>
  <a style="display:none"  role="button" class="article__pointer article__pointer_blue" style="height: 30px; width:30px; margin-top:-100px;border:1px solid blue;" href="#article-blue">
    <span class="" role="presentation"><i class="ti-car" > </i></span>

  </a>
</section>

                                            </div>
                                            <h5 class="m-0"> <span class="text-muted"> ${ item.car.model_make_id}</span></h5>
                                        </div>
                                    </div>


                                </div>

                  `;


         viewModals+=`<div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar" style="">
                                            <div class="">
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>

                                                </div>

                                                <div class=" text-left">

                                        <div class="form-group">
                                        <div class="m-t-20">
                                                    <label for="position">Car Booking Status</label>
                                                    <div>
                                                    <select disabled id="status${item._id}" class="selectpicker form-control" data-style="btn-white" tabindex="-98">
                                                       <option>--Select Status--</option>
                                                       <option>Booked</option>

                                                       <option>Available</option>



                                                    </select></div>
                                            </div>
                                        </div>


                                        <div class="m-t-20">
                                                    <label for="position">Inspection Status</label>
                                                    <div>
                                                    <select disabled id="health_status${item._id}" class="selectpicker form-control" data-style="btn-white" tabindex="-98">
                                                        <option>--Select Status--</option>
                                                       <option>Pending</option>
                                                       <option>Completed</option>



                                                    </select></div>
                                            </div>
                                        </div>


                                        <div class="form-group" style="display:none">
                                            <label for="inputColor">Confirmed Inspection Date</label>
                                            <input  id="condate${item._id}" type="text" class="form-control"  >
                                        </div>

                                        <div class="form-group"  style="display:none">
                                            <label for="inputColor">Confirmed Inspection Time</label>
                                            <input  id="contime${item._id}" type="text" class="form-control"  >
                                        </div>


                                        <div class="m-t-20">
                                                    <label for="position">Car Status</label>
                                                    <div>
                                                    <select disabled id="car_status${item._id}" class="selectpicker form-control" data-style="btn-white" tabindex="-98">
                                                        <option>--Select Status--</option>
                                                       <option>Active</option>
                                                       <option>Disabled</option>
                                                       <option>Suspended</option>



                                                    </select></div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                <label for="inputColor">Partner Id</label>
                                <select disabled id="partner_id${item._id}" type="text" class="form-control" id="" >
                                    ${selectOptionsPart}
                                </select>
                              </div>

                                        <div class="form-group">
                                        <div class="m-t-20">
                                                    <label for="position">Vehicle</label>
                                                    <div>
                                                    <select disabled data-id="${item._id}" onchange="setCarDetail(this)"    id="car_model_make${item._id}" class="selectpicker form-control" data-style="btn-white" >
                                                        ${modelOption}
                                                    </select></div>
                                            </div>
                                        </div>




                                        <div class="form-group">
                                            <label for="inputColor">Model Id</label>
                                            <input disabled id="car_model_id${item._id}" type="text" class="form-control"  >
                                        </div>

                                        <div class="form-group">
                                            <label for="inputColor">Model Name</label>
                                            <input disabled id="car_model_name${item._id}" type="text" class="form-control" >
                                        </div>

                                        <div class="form-group">
                                            <label for="inputColor">Trim Model</label>
                                            <input disabled id="car_model_trim${item._id}" type="text" class="form-control">
                                        </div>

                                         <div class="form-group">
                                        <div class="m-t-20">
                                                    <label for="position">Car Year</label>
                                                    <div>

                                                    <input disabled  id="car_year${item._id}" type="text" class="form-control"  >


                                                    </div>
                                            </div>
                                        </div>





                                        <div class="form-group">
                                            <label for="inputColor">Color</label>
                                            <input disabled id="color${item._id}" type="text" class="form-control"  >
                                        </div>

                                        <div class="form-group ">
                                            <label for="inputColor">Plate Number</label>
                                            <input disabled id="plate_number${item._id}" type="text" class="form-control"  >
                                        </div>






                                      <div class="form-group" style="display:none">
                                        <div class="m-t-20">
                                                    <label for="position">Driver Assigned</label>
                                                    <div >
                                                    <select  id="drivers${item._id}" class="selectpicker form-control" data-style="btn-white">
                                                        <option>--Select Driver--</option>
                                                        ${selectOptionsDrivers}
                                                    </select></div>
                                            </div>
                                        </div>
                                        <br/><br/>

                                        <div class="">
                                        <div class="form-group">
                                            <label for="inputCarDescription">Car Description</label>
                                            <textarea disabled id="description${item._id}" class="form-control autogrow" id="inputCarDescription" placeholder="The car is neat and the engine is working properly." style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>
                                        </div>

                                        <br/>
                                        <div class="form-group" style="display:none">
                                            <label for="inputLicense">License Plate Number</label>
                                            <input disabled type="text" class="form-control" id="inputLicense${item._id}" >

                                        </div>
                            </div>



                              <div class="form-group">
                                  <label for="">Car Inspection Details</label>
                                  <textarea disabled id="inspection_detail${item._id}" type="text" class="form-control"  >Inspection detail</textarea>
                              </div>


                              <div class="form-group">
                                  <label for="">Car Inspection Date</label>
                                  <input  disabled id="inspection_date${item._id}" type="text" class="form-control" placeholder="MM/DD/YYYY" >
                              </div>


                              <div class="form-group">
                                  <label for="">Car Inspection Time</label>
                                  <input disabled id="inspection_time${item._id}" type="text" class="form-control" placeholder="HH:MM:AM/PM" >
                              </div>



                              <div class="form-group" style="display:none">
                              <label class="control-label">Upload Image</label>
                              <input disabled onchange="initCarUpload(this)" data-id="${item._id}" type="file" class="filestyle" data-placeholder="No file" id="image-file${item._id}">
                              </div>


                              <img style="display:none" class="review-car" src="${item.images}"  id="img${item._id}" title="cars are here" data-carinfo="hello car"  style="width:100px;height:100px" /><span id="oldcar"></span>

                               <br/>


                                </div>
                                                <div style="clear:both;display:table;margin-right:0px">
                                                <button style="display:none" style="margin-right:5px;display:none" onclick="addCarRecordEvent(this)" data-id="${item._id}" data-url="/add-cars" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button style="display:none" style="margin-right:5px;" onclick="deleteData(this)" data-id="${item._id}" data-url="/faqs" id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>
                                                    <button style="margin-right:5px;" id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button style="margin-right:5px;display:none" data-old_car="${item.images}" onclick="updateInspectionAction(this)" data-revoked="${item.hasBeenRevoked}" data-contime="${item.confirmedInspectionTime}" data-condate="${item.confirmedInspectionDate}" data-id="${item._id}" data-inspection_date="${item.inspectionDate }" data-inspection_time="${item.inspectionTime}" data-car_status="${item.car_status}" data-health_status="${item.health_status}" data-model_make_id="${ item.model_make_id || item.car.model_id}" data-trim="${ item.car.model_trim}" data-old_car="${ item.imagePath || item.images}" href="#" data-model="${ item.carModel  || item.car_type }"  data-car_type="${ item.carModel || item.car_type}" data-car_id="${item._id}" data-assigned_driver_name="${item.assigned_driver_name}" data-assigned_driver_email="${item.assigned_driver_email}" data-checkmate="${item.assigned_driver_name }-${item.assigned_driver_email }" data-date="${formatDate(new Date(item.created_at))}"  data-partner_id="${ item.creator || 'owned by company'}" data-model="${ item.carModel || item.model}"  data-car_year="${ item.carYear  || item.car_year}" data-color="${ item.vehicleColor || item.color}"  data-status="${item.status}" data-plate_number="${ item.plateNo || item.plate_number}" data-inspection_detail="${item.inspection_detail || 'No comment.' }" data-description="${ item.carDescription || item.description}"  id="plancat${item._id}" data-id="${item._id}" data-license="${ item.plateNo || item.license}" data-url="/admin-car-mgt-detail" data-url="/admin-inspection-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Revoke Car</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





          `;

        tablebody1.insertAdjacentHTML('beforeend', template2);


   // }

    });


    modalbody1.innerHTML=viewModals;



    AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','Car Retrieval page viewed')



  }






  static runAdminCarRetrievalEdit(datas,carsInfo,drivers,partners,previledges){

    datas =sortBy(datas, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })

     WarLockAdmin(previledges,'view_car_inspection','manage_car_inspection')
         noReadWrite(previledges,'manage_car_inspection')
    GateKeepersForAdmin();
     document.getElementById("search").addEventListener("keyup",(e)=>{
      searchTable()
    })
    addClick()

     let selectOptionsDrivers = ``;
  let driv = [...new Set(drivers)]


  // console.log(drivers)
   let selectOptionsPart ='';
  partners.map((item, i) => {
      selectOptionsPart+=`<option data-username="${item.name || item.firstname}" data-email="${item.email}" id="${item._id}" >${item.email}</option>`;

    });

  driv.map((item, i) => {
      selectOptionsDrivers+=`<option data-username="${item.username}" data-email="${item.email}" id="${item._id}" value="${item.phone_number}">${item.username}-${item.email}</option>`;

    });


    console.log(carsInfo)

    let carCategory = [];
    let modelNameOptionX = [];
    let car_year = [];

   carsInfo.map((item)=>{
     carCategory.push(item.car_name)
   });
   carCategory = [...new Set(carCategory)];

  let modelOption=``;



  carsInfo.map((item)=>{
     modelOption+=`<option data-car_id="${item._id}" data-value="${item.car.model_name}" data-year="${item.carYear}" data-trim="${item.car.model_trim}" data-id="${item.car.model_make_id}">${item.car.car_name}</option>`

  })









  let data = [...datas]
  let template2 ='';
    let viewModals = '';


   // let driversC = [...drivers];



    const tablebody1 = document.getElementById('tablebody1');
    const modalbody1 = document.getElementById("modalbody1");


    if(data.length<=0){
      return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;
    }

    data.map((item, i) => {
      let className = "label-success"
        if(item.status=="Pending" || "OnHold"){
           className = "label-warning"
        }else if(item.status=="Completed" || item.status=="Successful"){
           className = "label-success"
        } else{
           className = "label-danger"
        }
        let shortStory =''
        // if(item.retrievalComments){
        //   shortStory = item.retrievalComments.substring(0,5)+ '...'
        // }






        template2 =`<tr>
                         <td class=""><a  href="#" id="plancat${item._id}" data-id="${item._id}" data-url="/" class=""><b>${formatDate(new Date(item.date_created))} </b></a> </td>
                          <td class="">${item.partner}</td>
                          <td class="">${ item.partnerEmail}</td>
                          <td class="">${ item.partnerName || 'No partner'}</td>
                          <td class="">${ item.retrievalComments + '...' || 'No comment'}</td>

                           <td class="">${ item.vehicleIdentificationNumber || "No Vehicle ID"}</td>

                           <td class="">${item.vehiclePlateNo}</td>

                          <td class="">${ item.vehicle}</td>

                          <td class=""><span class="label ${className}">${ item.status}</span></td>
                           <td class="">
                               <a onclick="showRetiveDetail(this)" id="${item._id}" data-id="${item._id}" data-name="${item.partnerName}" data-vin="${item.vehicleIdentificationNumber}" data-partnerid="${item.partner}" data-date="${item.date_created}" data-email="${item.partnerEmail}"  data-car="${item.vehicleName}" data-plate="${item.vehiclePlateNo}" data-carid="${item.vehicle}"  data-status="${item.status}" data-description="${item.retrievalComments}"  data-url="" class="table-action-btn"><i class="md md-edit"></i></a>

                           </td>
                   </tr>
                  `;

          tablebody1.insertAdjacentHTML('beforeend', template2);

         viewModals=`<div  id="con-close-modal-${item._id}" class="mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >                                <div class="slimScrollBar" style="">
                                            <div class="">
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>

                                                </div>

                                                <div class=" text-left">

                                        <div class="form-group">
                                        <div class="m-t-20">
                                                    <label for="position">Car Booking Status</label>
                                                    <div>
                                                    <select  id="status${item._id}" class="selectpicker form-control" data-style="btn-white" tabindex="-98">
                                                       <option>--Select Status--</option>
                                                       <option>Pending</option>

                                                       <option>Completed</option>



                                                    </select></div>
                                            </div>
                                        </div>









                                        <div class="form-group" style="display:none">
                                            <label for="inputColor">Date</label>
                                            <input  id="date${item._id}" type="date" class="form-control"  >
                                        </div>

                                        <div class="form-group"  style="display:none">
                                            <label for="inputColor">Partner Id</label>
                                            <input  id="partner_id${item._id}"  class="form-control"  >
                                        </div>









                                        <div class="form-group">
                                            <label for="inputColor">Partner Name</label>
                                            <input disabled id="name${item._id}" type="text" class="form-control"  >
                                        </div>

                                        <div class="form-group">
                                            <label for="inputColor">Partner Email</label>
                                            <input disabled id="email${item._id}" type="text" class="form-control"  >
                                        </div>

                                        <div class="form-group">
                                            <label for="inputColor">Vehicle Id</label>
                                            <input disabled id="carid${item._id}" type="text" class="form-control"  value="Blue">
                                        </div>

                                         <div class="form-group">
                                        <div class="m-t-20">
                                                    <label for="position">Car Name</label>
                                                    <div>

                                                    <input disabled  id="carname${item._id}" type="text" class="form-control"  >


                                                    </div>
                                            </div>
                                        </div>


                                        <div class="form-group ">
                                            <label for="inputColor">Vin</label>
                                            <input disabled id="vin${item._id}" type="text" class="form-control"  >
                                        </div>








                                        <div class="form-group ">
                                            <label for="inputColor">Plate Number</label>
                                            <input disabled id="plate_number${item._id}" type="text" class="form-control"  >
                                        </div>







                                        <div class="">
                                        <div class="form-group">
                                            <label for="inputCarDescription">Car Description</label>
                                            <textarea disabled id="description${item._id}" class="form-control autogrow" id="inputCarDescription" placeholder="The car is neat and the engine is working properly." style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>
                                        </div>

                                        <br/>

                                       </div>









                                                <div style="clear:both;display:table;margin-right:0px">
                                                <button style="display:none" style="margin-right:5px;display:none" onclick="addCarRecordEvent(this)" data-id="${item._id}" data-url="/add-cars" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button style="display:none" style="margin-right:5px;" onclick="deleteData(this)" data-id="${item._id}" data-url="/faqs" id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>
                                                    <button style="margin-right:5px;" id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button style="margin-right:5px;display:none" data-old_car="${item.images}" onclick="unrevokecar(this)" data-id="${item._id}" data-url="/admin-inspection-detail" id="update-x" type="button" class="btn btn-info waves-effect waves-light">Update</button>

                                                    <button style="margin-right:5px;display:none" data-old_car="${item.images}" onclick="updateCarRetrievalStatus(this)" data-id="${item._id}" data-url="/admin-inspection-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Update</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





          `;

          modalbody1.innerHTML+=viewModals;





   // }

    });








  }



  static runSettings(datas,previledges){

    datas =  sortBy(datas, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })

    WarLockAdmin(previledges,'view_settings','manage_settings')
        noReadWrite(previledges,'manage_settings')
  	GateKeepersForAdmin();


	let data = [...datas];
	let template2 ='';
    let viewModals = '';

    console.log(JSON.stringify(data)+ "from settings...");


    data.map((item,i) => {

    	template2 =`<tr>
	                    <td class="">${item.api_mode}</td>
	                    <td class="">${item.test_secret_key}</td>
	                    <td class="">${item.test_public_key}</td>
	                    <td class="">${item.live_secret_key}</td>
	                    <td class="">${item.live_public_key}</td>
	                     <td class="">
                               <a onclick="viewRecordSettings(this)" href="#" data-ticket_id="${item._id}" data-app_mode="${item.api_mode}" data-test_secret_key="${item.test_secret_key}" data-test_public_key="${item.test_public_key}"  data-live_secret_key="${item.live_secret_key}"  data-live_public_key="${item.live_public_key}"  id="plancat${item._id}" data-id="${item._id}" data-url="/admin-settings-detail" class="table-action-btn"><i class="md md-edit"></i></a>

                           </td>

	                </tr>`;
	        tablebody1.insertAdjacentHTML('beforeend', template2);

    	viewModals+=  `<div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar">
                                            <div >
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                    <h4 class="modal-title">Settings Detail</h4>
                                                </div>
                                                <br/>
                                                <div class="">
                                                    <div class="row">
                                                         <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Test Secret Key</label>
                                                                <input  type="text" class="form-control" id="test_secret_key${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">Test Public Key</label>
                                                                <input type="text"  class="form-control" id="test_public_key${item._id}" placeholder="saladin">
                                                            </div>
                                                            </div>

									                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">Live Secret Key</label>
                                                                <input type="text"  class="form-control" id="live_secret_key${item._id}" placeholder="AE-GX-2211">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row">



                                                       <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Live Public Key</label>
                                                                <input  type="text"  class="form-control" id="live_public_key${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>







                                                         <div class="form-group">
									                        <label for="position">Api Mode</label>
									                        <select id="api_mode${item._id}" class="form-control" data-style="btn-white">
									                            <option>test</option>
									                            <option>live</option>


									                        </select>
									                        </div>






                                                    </div>


                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button disabled onclick="addRecordSettings(this)" data-id="${item._id}" data-url="/add-ticket" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button style="display:none;opacity:0" disabled onclick="deleteData(this)" data-id="${item._id}" data-url="/tickets" id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>
                                                    <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="updateRecordSettings(this)" data-id="${item._id}" data-type="${item.settings_type}" data-url="/admin-settings-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





		      `;



    });

    modalbody1.innerHTML=viewModals;





    AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','Settings page viewed')



  }

  static runAdminItineraries(itineraries, drivers,previledges){
    WarLockAdmin(previledges,'view_bookings','manage_bookings')
        noReadWrite(previledges,'manage_bookings')
    let itinerary =[...new Set(itineraries)] || [];
    // console.log(itinerary)


    let selectOptionsDrivers = ``;
  let driv = [...new Set(drivers)]


  itinerary =  sortBy(itinerary, {
    prop: "created_at",
    desc: true,
    parser: (d) => new Date(d)
    })




  driv.map((item, i) => {
      selectOptionsDrivers+=`<option data-username="${item.username}" data-email="${item.email}" id="${item._id}" value="${item.phone_number}">${item.username}-${item.email}</option>`;

    });

    document.getElementById("search").addEventListener("keyup",(e)=>{
   	  searchTable(1)
    })

        let tablebody = document.getElementById('tablebody1');
        let modalbody1 = document.getElementById('modalbody1');

        let viewModals='';
        let eachRecord=``;
        let className="label-success"
        itinerary.map((item, i) => {
               if(item.status=="Paid" || item.status=="Successful" || item.status=="Completed"){
               className="label-success"
            }else if(item.status=='Unpaid'){
              className="label-warning"
            }else{
              className='label-danger'
            }


            // alert(item.assigned_driver_name)
            eachRecord = `
                          <tr id="${i}">
                          <td>${item.username} </td>
                          <td>${item.email} </td>
                                <td>${formatDate(new Date(item.created_at))} </td>
                          <td class="">${item.plan_category}</td>
                          <td class="">${item.start_location.substring(0,5)+'...'} </td>
                          <td class="">${item.destination.substring(0,5)+'...'}</td>

                            <td class=""><span class="label label-table ${className}">${item.status}</span></td>

                            <td class="">
                               <a onclick="viewRecordItinsDetail(this)" href="#" data-checkmate="${item.assigned_driver_name}-${item.assigned_driver_email}"  data-id="${item._id}" data-start_time="${formatDate(new Date(item.start_time))}" data-end_time="${formatDate(new Date(item.end_time))}" data-id="${item._id}" data-no_hours="${item.no_hours}" data-start_location="${item.start_location}" data-destination="${item.destination}" data-drive_option="${item.drive_option}"  data-travel_option="${item.travel_option}"  data-username="${item.username}"  data-email="${item.email}"  data-phone_number="${item.phone_number}"  id="plancat${item._id}" data-assigned_driver_name="${item.assigned_driver_name}" data-status="${item.status}" data-id="${item._id}" data-url="/admin-itinerary-details" class="table-action-btn"><i class="md md-edit"></i></a>

                           </td>

                         </tr>`;
             tablebody.insertAdjacentHTML('beforeend', eachRecord);


             viewModals+=  `<div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar">
                                            <div >
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>

                                                </div>
                                                <div class="">
                                                    <div class="row">
                                                         <div class="form-group">
									                        <label for="position">Status</label>
									                        <select id="status${item._id}" class="form-control" data-style="btn-white">
									                            <option>Pending</option>
                                              <option>Paid</option>
									                            <option>Ongoing</option>

									                            <option>Completed</option>

									                        </select>
									                        </div>

                                          <div class="form-group" id="p${item._id}">
                                                                  <label for="position">Assigned Drivers</label>
                                                                  <select   id="assigned_driver${item._id}" class="form-control" data-style="btn-white">
                                                                      <option>--Please select a driver--</option>
                                                                      ${selectOptionsDrivers}

                                                                  </select>
                                                                  </div>


                                                         <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Start Time</label>
                                                                <input  type="text" disabled class="form-control" id="start_time${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>



									                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">Drive Option</label>
                                                                <input type="text" disabled class="form-control" id="drive_option${item._id}" placeholder="AE-GX-2211">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row">



                                                       <div >
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Travel Option</label>
                                                                <input  type="text" disabled class="form-control" id="travel_option${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">No of hours</label>
                                                                <input  type="text" disabled class="form-control" id="no_hours${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>










                                                        <div class="" style="display:none">
                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">End Time</label>
                                                                <input type="text" disabled class="form-control" id="end_time${item._id}" placeholder="saladin">
                                                            </div>
                                                            </div>







                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">


                                                            <div class="">
	                                                            <div class="form-group">
	                                                                <label for="field-4" class="control-label">Username</label>
	                                                                <input type="text" disabled class="form-control" id="username${item._id}" placeholder="saladin">
	                                                            </div>
                                                            </div>

									                        <div class="">
	                                                            <div class="form-group">
	                                                                <label for="field-4" class="control-label">Email</label>
	                                                                <input type="text" disabled class="form-control" id="email${item._id}" placeholder="AE-GX-2211">
	                                                            </div>
                                                            </div>

                                                            <div class="">
	                                                            <div class="form-group">
	                                                                <label for="field-4" class="control-label">Phone</label>
	                                                                <input type="text" disabled class="form-control" id="phone_number${item._id}" placeholder="AE-GX-2211">
	                                                            </div>
                                                            </div>



                                                            <br/>

                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Start Location</label>


                                                            <textarea disabled class="form-control autogrow" id="start_location${item._id}" placeholder="Description" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>

                                                            </div>



                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Destination</label>


                                                            <textarea disabled class="form-control autogrow" id="destination${item._id}" placeholder="Response" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>

                                                            </div>





                                                        </div>
                                                    </div>

                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button style="display:none; opacity:0" onclick="addRecordEvent(this)" data-id="${item._id}" data-url="/add-ticket" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button style="display:none; opacity:0" onclick="deleteData(this)" data-id="${item._id}" data-url="/tickets" id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>
                                                    <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="updateRecordItins(this)" data-id="${item._id}" data-url="/admin-itinerary-details" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





          `;



            });

           modalbody1.innerHTML= viewModals;

           AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','Itinerary page viewed')

  }


  runAdminPlanDetails(usersPlan){





  }



  static runAdminPlans(usersPlan,previledges){
    WarLockAdmin(previledges,'view_bookings','manage_bookings')
        noReadWrite(previledges,'manage_bookings')

        document.getElementById("search").addEventListener("keyup",(e)=>{
     searchTable(3)
   })


    let plans = [...new Set(usersPlan)] || [];

    plans =sortBy(plans, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })



    // console.log(plans)
            //console.log(JSON.stringify(plans)+"main plan")
    let currentPlan = plans[plans.length -1] || []; // last plan user embarked on


            // console.log(datas)



    let tablebody1 = document.getElementById('tablebody1');
    let modalbody1 = document.getElementById('modalbody1');
    let viewModals ='';
    let template2;
    let className=``;

    if(plans.length<=0){
      return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;
    }
    plans.map((item, i) => {
                           //console.log(item)
                           if(item.status=="Unpaid"){
                             className =`label label-table label-warning`
                            //item.payment_status=`<span class="label label-table label-danger">${item.payment_status}</span>`;
                          }else if(item.status=="Paid" || item.status=="Completed" || item.status=="Successful"){
                            item.price= `₦ ${item.price}`;
                              className =`label label-table label-success`
                            //item.payment_status= `<span class="label label-table label-success">${item.payment_status}</span>`+ `₦ ${item.price}`;
                          }else{
                              className =`label label-table label-danger`
                            //item.price= `₦ ${item.price}`;
                            //item.payment_status=`<span class="label label-table label-warning">${item.payment_status}</span>`;
                          }
                          template2 =`<tr>
                                        <td class="">   ${formatDate(new Date(item.created_at))} </td>
                                        <td class=""><a onclick="getPlanId(this)" data-id="${item._id}" href="plan-detail">PLANID-${item.plan_id}</a></td>
                                            <td class="">   ${item.username} </td>

                                            <td class="">${item.email}</td>
                                            <td class="">${item.plan_name}</td>
                                            <td class="text-center "><span class="${className}">${item.status}</span></td>
                                            <td class="">  ${item.price}</td>


                                              <td class="">
                                                   <a id="plan-current-${item._id}" onclick="getBookingId(this)"  data-id="${item._id}" href="#" class="table-action-btn btn-custom btn-purple"><i class="md md-chevron-right"></i></a>
                                              </td>

                              </tr>`;
                              tablebody1.insertAdjacentHTML('beforeend', template2);





    });


    AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','Plan page viewed')



  }



  static runAdminPlansDetail(usersPlan,previledges){
        WarLockAdmin(previledges,'view_bookings','manage_bookings')
        noReadWrite(previledges,'manage_bookings')



  	console.log(usersPlan)
  	let modalbody1 = document.getElementById("modalbody1");
  	 let viewModals='';

      if(localStorage.getItem("bookingId")){

      }else{
        window.location.href='./admin-bookings'
      }

  	let clickedPlan = localStorage.getItem("bookingId");


  	console.log(clickedPlan);

  	setTimeout(()=>{

  	let planToView = usersPlan.filter((item,i)=> item._id== clickedPlan);
    let q_id, p_id;
    let planId = planToView[0].plan_id;
  	let has_been_updated = planToView[0].has_updated;
  	console.log(has_been_updated)
    if(has_been_updated=='Yes'){
      q_id ='CMT-QUOTE'+ planId;
       p_id='CMT-REF-'+ planId;

    }
    console.log(planToView[0])
   document.getElementById("quote-date").disabled=true



  	if(has_been_updated=="No"){
       document.getElementById("quote-amount").disabled=false;
  	}else{
        document.getElementById("quote-amount").disabled=true;
        document.getElementById("quote-amount").value = planToView[0].price;
        //document.getElementById("quote-date").value = formatDate(new Date(planToView[0].created_at)) ;

        let id= "#quote-status";
	    $( id + " option").each(function () {
	        if ($(this).html() == planToView[0].status) {
	            $(this).attr("selected", "selected");
	            return;
	        }
	    });
	     //document.getElementById("quote-status").disabled=true;
     }

     let superAd = JSON.parse(localStorage.getItem('userToken'));

     if(superAd.user.roles=='Super Admin'){
       document.getElementById("quote-amount").disabled=false;
     }

  	var selectedCars = [...new Set(planToView[0].cars_on_plan)];

  	console.log(planToView)

  	let itinerary = [...new Set(planToView[0].itineries)];

    let plans = usersPlan || [];

    let price_of_plan = planToView[0].price;
     let quote_date;
     console.log(planToView[0])
    if(planToView[0].createdDateOfQuotation){
        //alert(planToView[0].createdDateOfQuotation)
         quote_date =planToView[0].createdDateOfQuotation
    }




        let createdDateOfQuotation = quote_date
        if(createdDateOfQuotation){
           document.getElementById("quote-date").value=  formatDate(new Date(createdDateOfQuotation));
        }


    document.getElementById("plan-id").innerHTML= planToView[0].plan_id    //"PLANID-"+clickedPlan.substring(-12,clickedPlan.length);
    let plan_ids = "PLANID-"+clickedPlan.substring(-12,clickedPlan.length);

    let id= "#status";
    $( id + " option").each(function () {
        if ($(this).html() == planToView[0].status) {
            $(this).attr("selected", "selected");
            return;
        }
    });

     let userPhone = [];





    let tablebody = document.getElementById('tablebody');

    let eachRecord=``;
    let user_name = [];

    let className ="label-success"


    itinerary.map((item, i) => {
        if(item.status=="Ongoing"){
            className="label-danger"

        }else if(item.status=="Completed"){

            className="label-success"
        }else{

            className="label-warning"
        }

        document.getElementById("username").value=item.username;
    document.getElementById("email").value=item.email;
    user_name.push(item.email)
    document.getElementById("date").value=formatDate(new Date(item.start_time));
    document.getElementById("id").value= planToView[0].plan_id //'CMPAYSTK-'+clickedPlan;

    document.getElementById("category").value=item.plan_category;

    //userPhone.push(item.phone_number)






        eachRecord = `
                          <tr id="${i}">
                                <td>${formatDate(new Date(item.start_time))} </td>

                          <td class="">${item.start_location} </td>
                          <td class="">${item.destination}</td>
                          <td class="">${item.plan_category}</td>
                             <td class="">${item.drive_option}</td>
                              <td class="">${item.travel_option}</td>
                               <td class="">${item.no_hours}</td>
                                <td class=""><span class="label ${className}">${item.status}</span></td>
                               <td class="">${item.plan_id}</td>
                                <td class="">
                               <a onclick="viewRecordItinsDetail(this)" href="#" data-id="${item._id}" data-start_time="${formatDate(new Date(item.start_time))}" data-end_time="${formatDate(new Date(item.end_time))}" data-id="${item._id}" data-no_hours="${item.no_hours}" data-start_location="${item.start_location}" data-destination="${item.destination}" data-drive_option="${item.drive_option}"  data-travel_option="${item.travel_option}"  data-username="${item.username}"  data-email="${item.email}"  data-phone_number="${item.phone_number}"  id="plancat${item._id}" data-status="${item.status}" data-id="${item._id}" data-url="/admin-itinerary-details" class="table-action-btn"><i class="md md-edit"></i></a>
                               <a onclick="deleteRecord(this)" data-id="${item._id}" data-url="/itins-delete-from-plan"  id="delete" class="table-action-btn "><i class="md md-close"></i></a></td>

                           </td>
                         </tr>`;
        tablebody.insertAdjacentHTML('beforeend', eachRecord);


        viewModals+=  `<div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar">
                                            <div >
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>

                                                </div>
                                                <div class="">
                                                    <div class="row">
                                                         <div class="form-group">
									                        <label for="position">Status</label>
									                        <select id="status${item._id}" class="form-control" data-style="btn-white">
									                            <option>Pending</option>
									                            <option>Ongoing</option>
									                            <option>Completed</option>

									                        </select>
									                        </div>


                                                         <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Start Time</label>
                                                                <input  type="text" disabled class="form-control" id="start_time${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">End Time</label>
                                                                <input type="text" disabled class="form-control" id="end_time${item._id}" placeholder="saladin">
                                                            </div>
                                                            </div>

									                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">Drive Option</label>
                                                                <input type="text" disabled class="form-control" id="drive_option${item._id}" placeholder="AE-GX-2211">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row">



                                                       <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Travel Option</label>
                                                                <input  type="text" disabled class="form-control" id="travel_option${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">No of hours</label>
                                                                <input  type="text" disabled class="form-control" id="no_hours${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>














                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">


                                                            <div class="">
	                                                            <div class="form-group">
	                                                                <label for="field-4" class="control-label">Username</label>
	                                                                <input type="text" disabled class="form-control" id="username${item._id}" placeholder="saladin">
	                                                            </div>
                                                            </div>

									                        <div class="">
	                                                            <div class="form-group">
	                                                                <label for="field-4" class="control-label">Email</label>
	                                                                <input type="text" disabled class="form-control" id="email${item._id}" placeholder="AE-GX-2211">
	                                                            </div>
                                                            </div>

                                                            <div class="">
	                                                            <div class="form-group">
	                                                                <label for="field-4" class="control-label">Phone</label>
	                                                                <input type="text" disabled class="form-control" id="phone_number${item._id}" placeholder="AE-GX-2211">
	                                                            </div>
                                                            </div>



                                                            <br/>

                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Start Location</label>


                                                            <textarea disabled class="form-control autogrow" id="start_location${item._id}" placeholder="Description" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>

                                                            </div>



                                                            <div class="form-group">
                                                                <label for="field-3" class="control-label">Destination</label>


                                                            <textarea disabled class="form-control autogrow" id="destination${item._id}" placeholder="Response" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>

                                                            </div>





                                                        </div>
                                                    </div>

                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button style="display:none; opacity:0" onclick="addRecordEvent(this)" data-id="${item._id}" data-url="/add-ticket" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button style="display:none; opacity:0" onclick="deleteData(this)" data-id="${item._id}" data-url="/tickets" id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>
                                                    <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="updateRecordItins(this)" data-id="${item._id}" data-url="/admin-itinerary-details" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





          `;




            });

           modalbody1.innerHTML= viewModals;











                  planClicked = planToView ;

                  let carbounds = document.getElementById("carlist");

                  let car_record='';

                  //console.log(JSON.stringify(selectedCars)+"all cars for this guy")
                   selectedCars.map((item, i) => {
                          car_record += `
                           <a href="#"><div class="col-sm-6  col-md-6 col-lg-4" >
                                <div class="widget-bg-color-icon card-box">
                                    <div class="bg-icon bg-icon-info pull-left" >
                                        <img src="${  item.imagePath || item.image || item.images}" style="height:90px"/>
                                    </div>
                                    <div class="col-lg-6 pull-right text-right">
                                        <h3 class="text-dark"><b className=""> ${ item.carModel || item.model} ${ item.carYear || item.car_year}</b></h3>
                                        <p class="text-muted"></p>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div></a>`;

                });
                carbounds.innerHTML=car_record;



        //quotations and update quote notifications


        let this_user = user_name[0]
        document.getElementById("quote-id").value="CMT-QT-"+ clickedPlan;

        if(has_been_updated=="Yes"){
          document.getElementById("quote-payment-id").value='CMT-PAY-'+clickedPlan;
          document.getElementById("paystack-reference").value='CMT-REF-'+clickedPlan;

      }
        let plan_ref= 'CMPAYREF-'+clickedPlan;
        document.getElementById("quote-payment-amount").value= price_of_plan;


        if(has_been_updated=="No"){
          document.getElementById("quote-payment-id").value='NOT SET';
        document.getElementById("paystack-reference").value='NOT SET';
        }









		var input = document.getElementById("quote-amount");
        input.onkeyup = input.onchange = enforceFloat;

        //enforce that only a float can be inputed
function enforceFloat() {
  var valid = /^\-?\d+\.\d*$|^\-?[\d]*$/;
  var number = /\-\d+\.\d*|\-[\d]*|[\d]+\.[\d]*|[\d]+/;
  if (!valid.test(this.value)) {
    var n = this.value.match(number);
    this.value = n ? n[0] : '';
  }
}



        document.getElementById("send-quote").addEventListener("click", (e)=>{
          e.preventDefault();

          //document.getElementById("send-quote").disabled=true;

           //disable the submit button
            var btn = document.getElementById('send-quote');
        btn.disabled = true;
        btn.innerText = 'Posting...'




		  let amt = document.getElementById("quote-amount").value;

		  var status_xi = document.getElementById('quote-status');
          const status = status_xi.options[status_xi.selectedIndex].text;

          let value_text = document.getElementById("quote-amount").value;

          if(status=="--choose--"){
             var notification = alertify.notify('Choose a status', 'error', 5, function(){  console.log('dismissed'); });
			  return false;
          }

		  if(amt && amt.length){


		        		let data_msg ="Dear " + this_user + " ";
		        		 data_msg+=" You have subscribed to the plan " + plan_ids + "on our platform  and the cumulated charges for the plan chosen is slated below.";
		        		 data_msg+="The total cost for this package including fare charges and other";
		        		 data_msg+=" related charges for this plan has been reviewed and slated at NGN "+ value_text;
		        		 data_msg+=". To proceed with this process, you are to make payments via the Goom Logistics platform. ";
		        		 data_msg+="If this message was sent to you via email you can login via the link below and proceed ";
		        		 data_msg+="to make payments.";


			        	//console.log("clicked me..." +user_name[0])


			            let userplan_url =baseUrl+ "/userplan-status-update/"+ planId ;
			            let itins_url =baseUrl+ "/user-itinerary-status-update/"+ planId;



                  let notification_url =baseUrl+ "/notification";

			            let dataNotification = {
			              user_id: this_user,
			              type: 'information',
			              description: data_msg,


			            };



		        	   //craete notification and update status to ongoing
		        	   postNotification(notification_url,dataNotification);

                 var notification = alertify.notify('Please wait while transaction is  processing...', 'success', 10, function(){  console.log('dismissed'); });


		        	let dataPlan = {
			              status:status,
			              payment_status: status ,
			              email: this_user,
			               has_updated: "Yes",
			               plan_id: planId,
			               price:amt,
                     createdDateOfQuotation: new Date()
			            };

			          let dataItins ={

			               //price:amt,
			                status:status ,
			              user_plan_id:planId,
			              plan_id:planId,
                    has_received_quote: 'Yes',

			          }



                let dataQuotations = {
                   plan_id: planId,
                  amount:amt,
                  status: status,
                  full_name: this_user,
                  quotation_id: 'CMT-QUOTE-'+ planId,
                  email: this_user,
                  reference: 'CMT-REF-'+ planId,
                  phone_number: usersPlan[0],
                  createdDateOfQuotation: new Date()

                }






               let quot_url = baseUrl+ '/make-quotation'
               createQuotations(quot_url, dataQuotations)





		        	 updateStatus(userplan_url, dataPlan)
		        	 updateStatus(itins_url, dataItins)




               setTimeout(() =>{
                  btn.disabled = false;
                window.location.reload()
               },15000)

		          }
		          else{

                $("#send-quote").attr("disabled", false);
                 //document.getElementById("send-quote").disabled=false;
                   btn.disabled = false;
		            //alert('Could not upload file.');

		            var notification = alertify.notify('Error occured while processing update. Please ensure to update the fields on the quotation section ', 'error', 5, function(){  console.log('dismissed'); });
			         return false
		          }

        });




    }, 4000)



  }


  static runAdminWallets(data,previledges){

    data = sortBy(data, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })

WarLockAdmin(previledges,'view_transactions','manage_transactions')
    noReadWrite(previledges,'manage_transactions')

  	let datas =[...new Set(data)] || [];

    document.getElementById("search").addEventListener("keyup",(e)=>{
     searchTable(4)
   })



    let tablebody = document.getElementById('tablebody1');
    let modalbody1 = document.getElementById('modalbody1');
    let viewModals ='';
    let template2;
    let eachRecord=``;

    let className="label-success";

  	datas.map((item,i)=>{
            console.log(item.createdDate)
            if(item.status=="Successful"){
               className="label-success"
            }else{
              className="label-warning"
            }
            eachRecord =`
                      <tr>
                          <td class=""> ${formatDate(new Date(item.createdDate))} </td>
                          <td class="">${item.reference}</td>
                          <td class="">${item.full_name}</td>
                          <td class="">${item.amount} </td>
                          <td class="">${item.email}</td>
                          <td class=""><span class="label ${className}">${item.status}</span></td>

                          <td class="">
                               <a onclick="viewRecordWalletTransactions(this)" data-url="/admin-wallet-detail" href="#" data-username="${item.full_name}" data-email="${item.email}" data-phone_number="${item.phone_number}" data-reference="${item.reference}" data-date="${formatDate(new Date(item.created_at))}" data-amount="${item.amount}" data-plan_id="${item.plan_id}"  data-quotation_id="${item.quotation_id}"  data-status="${item.status}"  id="plancat${item._id}" data-id="${item._id}"  class="table-action-btn"><i class="md md-edit"></i></a>
                               <a onclick="deleteRecord(this)" data-id="${item._id}" data-url="/wallet"  id="delete" class="table-action-btn "><i class="md md-close"></i></a></td>

                           </td>

                     </tr>`;
             tablebody.insertAdjacentHTML('beforeend', eachRecord);


             viewModals+=  `<div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar">
                                            <div >
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                    <h4 class="modal-title">Transaction Detail</h4>
                                                </div>
                                                <br/>
                                                <div class="">
                                                    <div class="row">
                                                         <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Created Date</label>
                                                                <input disabled type="text" class="form-control" id="date${item._id}" placeholder="12/12/0000">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Email</label>
                                                                <input disabled type="text" class="form-control" id="email${item._id}" placeholder="email@email.com">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Username</label>
                                                                <input disabled  type="text" class="form-control" id="username${item._id}" placeholder="abdulrazak">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Mobile</label>
                                                                <input disabled  type="text" class="form-control" id="phone_number${item._id}" placeholder="abdulrazak">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">Amount</label>
                                                                <input disabled type="text"  class="form-control" id="amount${item._id}" placeholder="40000">
                                                            </div>
                                                            </div>

									                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">Reference</label>
                                                                <input disabled type="text"  class="form-control" id="reference${item._id}" placeholder="PAYSTACK-GX-2211">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row">



                                                       <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Balance Before</label>
                                                                <input disabled  type="text"  class="form-control" id="plan_id${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Balance After</label>
                                                                <input disabled type="text"  class="form-control" id="quotation_id${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>







                                                         <div class="form-group">
									                        <label for="position">Status</label>
									                        <select disabled id="status${item._id}" class="form-control" data-style="btn-white">
									                            <option>Successful</option>
									                            <option>Unpaid</option>
									                            <option>Failed</option>

									                        </select>
									                        </div>






                                                    </div>


                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">

                                                <button "display:none;opacity:0"   data-id="${item._id}" data-url="/add-wallets" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                      <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button style="display:none;opacity:0"   id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                    <button  style="display:none;opacity:0" disabled onclick="deleteData(this)" data-id="${item._id}" data-url="/wallets" id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>





		      `;



          });
          modalbody1.innerHTML= viewModals;


          AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','Wallet page viewed')


  }


  static runAdminPlansManualBookings(dataCars, users,previledges){
  	//ApiAdminBotService.gobackFor()

     WarLockAdmin(previledges,'view_bookings','manage_bookings')
         noReadWrite(previledges,'manage_bookings')
  	 console.log('this page rocks...')

     let chosen_id_user =1;

    document.getElementById("drive-test-certificate").disabled=true;


     let id = guidGenerator();
     var noHrs =0;


     let usernames = [];
     let useremails =[];
     let this_user_names = [...new Set(users)].filter((item)=>usernames.push(item.username) )



      let selectOptions_users = ``;




      [...new Set(users)].map((item, i) => {
          selectOptions_users+=`<option data-with="${item.test_certificate}" id="${item.username}-${i}"  value="${item.username}">${item.email}</option>`;


      });

      $('#email').append(selectOptions_users);

      //document.getElementById("username").innerHTML= selectOptions_users



     // Map your choices to your option value


        // When an option is changed, search the above for matching choices
        $('#email').on('change', function() {
           // Set selected option as variable
           var selectValue = $(this).text();




           // Empty the target field
           $('#username').empty();


           let me =this_user_names.filter((item)=>item.username== $(this).val())
           console.log(me)
           chosen_id_user = Number(me[0].id);
           document.getElementById("drive-test-certificate").value =me[0].test_certificate;
           document.getElementById("phone_number").value =me[0].phone_number;




           // For each chocie in the selected option
          // for (i = 0; i <  magicalLookup[selectValue].length; i++) {
              // Output choice in the target field
            $('#username').append(`<option>` +  $(this).val() + "</option>");



           //}
        });


      var location = document.getElementById("location");
    //location.value= item.dataset.start_location;
    var destination = document.getElementById("destination");
    //destination.value = item.dataset.destination;
    var options = {
      types: ['geocode'],
      // types: [
      // '(address)'
      // ],
      componentRestrictions: {country: "NG"}
     };
    var autocomplete3 = new google.maps.places.Autocomplete(location,options);
        google.maps.event.addListener(autocomplete3, 'place_changed', function () {
            //startLoc = autocomplete3.getPlace();
            //startLoc = startLoc.formatted_address;



        });


         var autocomplete4 = new google.maps.places.Autocomplete(destination,options);
        google.maps.event.addListener(autocomplete4, 'place_changed', function () {
            //destination = autocomplete4.getPlace();

        });


      let cars_on_plan = [...new Set(dataCars)];

      let selectOptions = ``;


      cars_on_plan.map((item, i) => {
          selectOptions+=`<option data-item="${item}">${item.car_type}</option>`;

      });


      function guidGenerator() {
          var S4 = function() {
             return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
          };
          return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
      }



      // Map your choices to your option value
        var lookup = {
           'Option 1': ['Goom Logistics Saver', 'Goom Logistics Richly', 'Goom Logistics Weekend'],
           'Option 2': ['Corporate Plus', 'Corporate Lite'],
           //'Option 3': ['Option 3 - Choice 1'],
        };

        // When an option is changed, search the above for matching choices
        $('#plan_name').on('change', function() {
           // Set selected option as variable
           var selectValue = $(this).val();

           // Empty the target field
           $('#plan_categories').empty();

           // For each chocie in the selected option
           for (i = 0; i < lookup[selectValue].length; i++) {
              // Output choice in the target field
              $('#plan_categories').append("<option value='" + lookup[selectValue][i] + "'>" + lookup[selectValue][i] + "</option>");
           }
        });








     document.getElementById('plan_id').value = 'CMT-PLAN-'+ id;
     let first_car = document.getElementById("car1");
     //first_car.innerHTML= selectOptions;
     $('#car1').append(selectOptions);
     // $('#car_1').on('change', function() {
     //    carsSelected[0] =
     // })
     let second_car = document.getElementById("car2")
     //second_car.innerHTML= selectOptions;
     $('#car2').append(selectOptions);


     let third_car = document.getElementById("car3")
     //third_car.innerHTML= selectOptions;
     $('#car3').append(selectOptions);
     let uid = 'CMT-USER-'+ guidGenerator()
     //fetch the drivers assigned to these cars then push to the car lists
     let itinsData ={};
     let allItins = [];
     let  ItineraryList = [];
     let userPlanData = {};
     let cars_data = [];
     let planList = [];
     var carsSelected =[];



       let emailsUser = document.getElementById('email');
      let user_selected = [...new Set(users)].filter((item)=>item.email ==emailsUser.options[emailsUser.selectedIndex].text )
      console.log(user_selected)


     document.body.addEventListener('click', function(e){
        if(e.target.id=="submitItinerary"){

           e.preventDefault();
           console.log(user_selected)



            let emalMan = emailsUser.options[emailsUser.selectedIndex].text

            getUserdetail(emalMan);



           var notification = alertify.notify('The Plan and cars selected for these itineraries cant be modified on submit.', 'success', 5, function(){  console.log('dismissed'); });

            var location2a =  document.getElementById("location").value;
            var destination =  document.getElementById("destination").value;
            var testCert = document.getElementById("drive-test-certificate").value;
            var startDate = document.getElementById("start").value;
            var endDate = document.getElementById("end").value;
            var driverOpt = document.getElementById("driver-option");
            const optDriver = driverOpt.options[driverOpt.selectedIndex].text;
            var certDate = document.getElementById("testdate").value;
            var travelOpt = document.getElementById("traveloption")
            const optTraveler = travelOpt.options[travelOpt.selectedIndex].text;
            noHrs = document.getElementById("no_hrs").value;
            var plan_name = document.getElementById("plan_name").value ;
            var plancategory = document.getElementById("plan_category").value;

            var driverSchOpt = document.getElementById("driving-school");
            const driving_school = driverSchOpt.options[driverSchOpt.selectedIndex].text;

            let status_xi = document.getElementById('status');
           const status = status_xi.options[status_xi.selectedIndex].text;

            if(driverOpt=="i would like a driver"){
              certDate="";
            }

            noHrs = noHrs || 2;






            let car_1 = first_car.options[first_car.selectedIndex].text;
            let car_2 = second_car.options[second_car.selectedIndex].text;
            let car_3 = third_car.options[third_car.selectedIndex].text;


            if(plan_name =='--Kindly select a plan --'){
              var notification = alertify.notify('Select a plan name', 'error', 5, function(){  console.log('dismissed'); });

              return false;
            }

            if(plancategory =='--Kindly select a category --'){
               var notification = alertify.notify('Select a category for this plan', 'error', 5, function(){  console.log('dismissed'); });

              return false;
            }

            if(car_1 =='--Kindly select a car --'){
               var notification = alertify.notify('Select a car for this plan', 'error', 5, function(){  console.log('dismissed'); });

              return false;
            }

            if(car_2 =='--Kindly select a car --'){
               var notification = alertify.notify('Select a car for this plan', 'error', 5, function(){  console.log('dismissed'); });

              return false;
            }

            if(car_3 =='--Kindly select a car --'){
               var notification = alertify.notify('Select a car for this plan', 'error', 5, function(){  console.log('dismissed'); });

              return false;
            }
            let car_detail1 =cars_on_plan.filter(item => item.car_type == car_1);
            let car_detail2 =cars_on_plan.filter(item => item.car_type == car_2);
            let car_detail3 =cars_on_plan.filter(item => item.car_type == car_3);


            carsSelected = [...car_detail1,...car_detail2, ...car_detail3];

            console.log(carsSelected)



            //localStorage.setItem('plan',JSON.stringify(planList));
            //localStorage.setItem('cars',JSON.stringify(carsSelected));
            // localStorage.setItem('duration',noHrs);

            //var plansetIt = JSON.parse(localStorage.getItem('plan'));
            let plan_name1 = document.getElementById('plan_name')
            let plan_categories1 = document.getElementById("plan_categories");
            let itinStatus ='Pending';
            if(status=="Paid"){
              itinStatus = 'Completed'
            }else{
              itinStatus = 'Ongoing'
            }



            //valdate username and email
            let usernames = document.getElementById('username');
            let emails = document.getElementById('email');
            let usr = usernames.options[usernames.selectedIndex].text;
            let emal = emails.options[emails.selectedIndex].text
            if(emal=='--Select an email--'){
                var notification = alertify.notify('Select an email', 'error', 5, function(){  console.log('dismissed'); });
                 return false

            }


             if(usr=='--Select user--'){
                var notification = alertify.notify('Select a username', 'error', 5, function(){  console.log('dismissed'); });
                return false

            }

            if(localStorage.getItem('user_to_book')){
              usersFoundId = Number(localStorage.getItem('user_to_book'));
            }



             var start_location =location2a;
            let userPlanItineries = {
              plan_id: document.getElementById('plan_id').value,
              plan_category: plan_categories1.options[plan_categories1.selectedIndex].text ,//plan_categories1.value,
              plan_name:   plan_name1.options[plan_name1.selectedIndex].text ,//plan_name1.value,
              //price:
              status:status,
               certificate_id: document.getElementById("drive-test-certificate").value,
               certificate_date: document.getElementById("testdate").value,
               start_location : location2a,
               destination :destination,
               no_hours:noHrs,
               start_time :startDate,
               end_time :endDate,
               pickup_time: endDate,
               drive_option: optDriver,
               user_id:   chosen_id_user, //usersFoundId,  //document.getElementById("email").value,
               travel_option:optTraveler,
               drivingschool: driving_school,
               carsSelected,
               //planChosen,
               username: usr,
               email: emal,
               phone_number: document.getElementById("phone_number").value,
               //has_been_updated:'Yes',
        };


            console.log(userPlanItineries)

            //ItineraryList.push(userPlanItineries)

            if(BookingValidationFails(userPlanItineries) == true){
              return false;
            }

            ItineraryList.push(userPlanItineries)




            //localStorage.setItem('itins',JSON.stringify(ItineraryList));

            let allNewItineraries = userPlanItineries;  //JSON.parse(localStorage.getItem('itins'));

            var _tr;
             var dated = new Date(startDate)
            _tr = `<tr>
                <td class="">${formatDate(dated) + " "+ endDate}</td>
                <td class="">${start_location}</td>
                <td class="">${destination}</td>
                <td class="">${optDriver}</td>
                <td class="">
                  <a href="#" id="" data-id=""  data-driver_option="${optDriver}"  data-start_time="" data-start_location="${start_location}" data-destination="${destination}" class="table-action-btn md-trigger" data-toggle="modal" data-target="#con-close-modal"><i class="md md-edit"></i></a>
                  </td>
                </tr>`;
                $(_tr).hide().insertAfter("#startPoint").fadeIn('slow');


              let postUrl = baseUrl+ '/admin-itinerary-add';
              createBookingSet(postUrl ,userPlanItineries)




               if(driverOpt!="i would like a driver"){
                       let user = JSON.parse(localStorage.getItem('userToken'))

                        const userDriveTestData = {
                              username: user.user.username,
                              email: user.user.email,
                              phone_number: user.user.phoneNumber,
                              car_id:carsSelected[0].plate_number,
                              status:"Pending",
                              description:driving_school,
                              time: driving_school,
                              createdDate: formatDate(new Date()),
                              user_id: chosen_id_user,

                             }



                        let drvUrl =baseUrl+ '/add-drive-test-for-user'

                        createUserDriveTestDetail(drvUrl, userDriveTestData)

                    }

      }

    });



      document.getElementById("quote-id").value="CMT-QT-"+ id;
        document.getElementById("quote-payment-id").value='NOT SET';
        document.getElementById("paystack-reference").value='NOT SET';
        let plan_ref= 'CMPAYREF-'+id;
       // document.getElementById("quote-payment-amount").value= price_of_plan;





    var input = document.getElementById("quote-amount");
        input.onkeyup = input.onchange = enforceFloatEntered;

        //enforce that only a float can be inputed
    function enforceFloatEntered() {
      var valid = /^\-?\d+\.\d*$|^\-?[\d]*$/;
      var number = /\-\d+\.\d*|\-[\d]*|[\d]+\.[\d]*|[\d]+/;
      if (!valid.test(this.value)) {
        var n = this.value.match(number);
        this.value = n ? n[0] : '';
      }
    }








     document.getElementById("submitPlan").addEventListener('click', (e)=>{

        e.preventDefault()

        let plan_id  = document.getElementById('plan_id');
        let createdDate = document.getElementById("date");
        let status_xi = document.getElementById('quote-status');
        const status = status_xi.options[status_xi.selectedIndex].text;
        let username =  document.getElementById("username");
        let email = document.getElementById("email")
        let plan_name = document.getElementById('plan_name')
        let plan_categories = document.getElementById("plan_categories")
        plan_categories = plan_categories.options[plan_categories.selectedIndex].text;


        if(ItineraryList.length<= 0){
            var notification = alertify.notify('You did not add any itinerary for this plan.', 'error', 5, function(){  console.log('dismissed'); });

            return false
        }else{





                  let amt = document.getElementById("quote-amount").value;

                  var status_xis = document.getElementById('quote-status');
                  let status_QUOTE = status_xis.options[status_xis.selectedIndex].text;

                  let value_text = document.getElementById("quote-amount").value;


                   let e = document.getElementById('email')
                   let em =e.options[e.selectedIndex].text;

                   //alert(em)

                  if(status_QUOTE=="--choose--"){
                     var notification = alertify.notify('Choose a status', 'error', 5, function(){  console.log('dismissed'); });
                     return false;
                  }

                 if(amt && amt.length){


                      let data_msg ="Dear " + username.value + " ";
                       data_msg+=" You have subscribed to the plan " + plan_id.value + " referenced on " + createdDate.value+ "  and ";
                       data_msg+="the total cost for this package including fare charges and other";
                       data_msg+=" related charges for this plan is slated at NGN "+ value_text;
                       data_msg+=". To proceed with this process, you are to make payments via the Goom Logistics platform. ";
                       data_msg+="If this message was sent to you via email you can login via the link below and proceed ";
                       data_msg+="to make payments ";


                      //console.log("clicked me..." +user_name[0])


                        //let userplan_url =baseUrl+ "/userplan-status-update/"+ planId ;

                        let notification_url =baseUrl+ "/notification";

                        let dataNotification = {
                          user_id: em,
                          type: 'information',
                          description: data_msg,


                        };



                       //craete notification and update status to ongoing
                       postNotification(notification_url,dataNotification)



                       let plan_name1 = document.getElementById('plan_name')
            let plan_categories1 = document.getElementById("plan_categories");

                   var usersPlan = {
                     plan_id:  plan_id.value,
                     createdDate: createdDate.value,
                    itineraries:  ItineraryList,
                    user_id: Number( chosen_id_user),
                    carsSelected: carsSelected,
                    // plan_name:  plan_name.options[plan_name.selectedIndex].text,   //plan_name.value,
                    price: document.getElementById("quote-amount").value ,
                    // plan_categories: plan_categories,
                    status:status_QUOTE,
                    no_hours:noHrs ,
                    duration: noHrs,

                     plan_category: plan_categories1.options[plan_categories1.selectedIndex].text ,//plan_categories1.value,
              plan_name:   plan_name1.options[plan_name1.selectedIndex].text ,//plan_name1.value,

                    username: username.value,
                    email: em,
                    phone_number: document.getElementById("phone_number").value,
                     has_been_updated:'Yes',
                  };

                  console.log(usersPlan)



                  let postUrl = baseUrl+ '/admin-plan-add';
                  createBookingSet(postUrl ,usersPlan)




                let dataQuotations = {
                   plan_id:  plan_id.value,
                  amount:value_text,
                  status: status,
                  full_name: username.value,
                  quotation_id: 'CMT-QUOTE-'+ plan_id.value,
                  email: em,
                  reference: 'CMT-REF-'+ plan_id.value,
                  phone_number: document.getElementById("phone_number").value,
                  createdDateOfQuotation: new Date(),
                  user_id:Number( chosen_id_user)

                }






               let quot_url = baseUrl+ '/make-quotation'
               createQuotations(quot_url, dataQuotations)




               let userplan_url =baseUrl+ "/userplan-status-update/"+ plan_id.value ;
                  let itins_url =baseUrl+ "/user-itinerary-status-update/"+ plan_id.value;


              let dataPlan = {
                    status:status,
                    payment_status: status ,
                    email: em,
                     has_updated: "Yes",
                     plan_id: plan_id.value,
                     price:value_text,
                     createdDateOfQuotation: new Date()
                  };

                let dataItins ={

                     //price:amt,
                      status:status ,
                    user_plan_id:plan_id.value,
                    plan_id:plan_id.value,
                    has_received_quote: 'Yes',

                }
               updateStatus(userplan_url, dataPlan)
               updateStatus(itins_url, dataItins)









               ////////////////







              }
              else{
                //alert('Could not upload file.');

                var notification = alertify.notify('Error occured while processing update. Please ensure to update the fields on the quotation section ', 'error', 5, function(){  console.log('dismissed'); });
               return false
              }


        }




     })

  }

  static runAdminPayments(data,previledges){

    data = sortBy(data, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })

WarLockAdmin(previledges,'view_payments','manage_payments')
    noReadWrite(previledges,'manage_payments')


     let datas =[...new Set(data)] || [];
let className="label-success";

document.getElementById("search").addEventListener("keyup",(e)=>{
   	 searchTable(2)
   })


    let tablebody= document.getElementById('tablebody1');
    //let modalbody1 = document.getElementById('modalbody1');
    let viewModals ='';
    let template2;
    let eachRecord=``;

    if(datas.length<=0){
      return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;
    }


          datas.map((item,i)=>{
            console.log(item.createdDate)
            if(item.status=="Paid" || item.status=="Successful"){
               className="label-success"
            }else if(item.status=='Unpaid'){
              className="label-warning"
            }else{
              className='label-danger'
            }
            eachRecord =`
                      <tr>
                          <td class=""> ${formatDate(new Date(item.createdDate))} </td>
                          <td class="">${item.reference}</td>
                          <td class="">${item.plan_id}</td>
                          <td class="">${item.amount} </td>
                          <td class="">${item.quotation_id}</td>
                          <td class=""><span class="label ${className}">${item.status}</span></td>

                          <td class="">
                               <a onclick="viewRecordWalletTransactions(this)"  data-url="/admin-payments-detail" href="#" data-username="${item.full_name}" data-email="${item.email}" data-phone_number="${item.phone_number}" data-reference="${item.reference}" data-date="${formatDate(new Date(item.createdDate))}" data-amount="${item.amount}" data-plan_id="${item.plan_id}"  data-quotation_id="${item.quotation_id}"  data-status="${item.status}"  id="plancat${item._id}" data-id="${item._id}"  class="table-action-btn"><i class="md md-edit"></i></a>
                               <a onclick="deleteRecord(this)" data-id="${item._id}" data-url="/payment"  id="delete" class="table-action-btn "><i class="md md-close"></i></a></td>

                           </td>

                     </tr>`;


             tablebody.insertAdjacentHTML('beforeend', eachRecord);



             viewModals+=  `<div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar">
                                            <div >
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                    <h4 class="modal-title">Transaction Detail</h4>
                                                </div>
                                                <br/>
                                                <div class="">
                                                    <div class="row">
                                                         <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Created Date</label>
                                                                <input disabled type="text" class="form-control" id="date${item._id}" placeholder="12/12/0000">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Email</label>
                                                                <input disabled type="text" class="form-control" id="email${item._id}" placeholder="email@email.com">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Username</label>
                                                                <input disabled  type="text" class="form-control" id="username${item._id}" placeholder="abdulrazak">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Mobile</label>
                                                                <input disabled  type="text" class="form-control" id="phone_number${item._id}" placeholder="abdulrazak">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">Amount</label>
                                                                <input disabled type="text"  class="form-control" id="amount${item._id}" placeholder="40000">
                                                            </div>
                                                            </div>

									                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">Reference</label>
                                                                <input disabled type="text"  class="form-control" id="reference${item._id}" placeholder="PAYSTACK-GX-2211">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row">



                                                       <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Plan ID</label>
                                                                <input disabled  type="text"  class="form-control" id="plan_id${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Quotation ID</label>
                                                                <input disabled type="text"  class="form-control" id="quotation_id${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>







                                                         <div class="form-group">
									                        <label for="position">Status</label>
									                        <select disabled id="status${item._id}" class="form-control" data-style="btn-white">
									                            <option>Successful</option>
									                            <option>Unpaid</option>
									                            <option>Failed</option>

									                        </select>
									                        </div>






                                                    </div>


                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">

                                                <button "display:none;opacity:0"   data-id="${item._id}" data-url="/add-wallets" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                      <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button style="display:none;opacity:0"   id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                    <button  style="display:none;opacity:0" disabled onclick="deleteData(this)" data-id="${item._id}" data-url="/wallets" id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>





		      `;

          });
modalbody1.innerHTML= viewModals;

AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','Payments page viewed')


  }


  static runAdminQuotations(data,previledges){
    data = sortBy(data, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })
     WarLockAdmin(previledges,'view_quotations', 'manage_quotations')
         noReadWrite(previledges,'manage_quotations')
// WarLockAdmin('view_payments','manage_payments')
// WarLockAdmin('view_transactions','manage_transactions')
  	let datas =[...new Set(data)] || [];

  	document.getElementById("search").addEventListener("keyup",(e)=>{
   	 searchTable(2)
   })



    let tablebody = document.getElementById('tablebody1');
    //let modalbody1 = document.getElementById('modalbody1');
    let viewModals ='';
    let template2;
    let eachRecord=``;
    let className="label-success";
    let payNow='';

    if(datas.length<=0){
      return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;
    }

  	datas.map((item,i)=>{
            console.log(item.createdDate)
            if(item.status=="Paid" || item.status=="Successful"){
               className="label-success"
            }else if(item.status=='Unpaid'){
              className="label-warning"
            }else{
              className='label-danger'
            }
            eachRecord =`
                      <tr>
                          <td class=""> ${formatDate(new Date(item.createdDate))} </td>
                          <td class="">${item.reference}</td>
                          <td class="">${item.plan_id}</td>
                          <td class="">${item.amount} </td>
                          <td class="">${item.quotation_id}</td>
                          <td class=""><span class="label ${className}">${item.status} </span> ${payNow}</td>


                          <td class="">
                               <a onclick="viewRecordWalletTransactions(this)" data-url="/admin-quotations-detail" href="#" data-username="${item.full_name}" data-email="${item.email}" data-phone_number="${item.phone_number}" data-reference="${item.reference}" data-date="${formatDate(new Date(item.created_at))}" data-amount="${item.amount}" data-plan_id="${item.plan_id}"  data-quotation_id="${item.quotation_id}"  data-status="${item.status}"  id="plancat${item._id}" data-id="${item._id}"  class="table-action-btn"><i class="md md-edit"></i></a>
                               <a onclick="deleteRecord(this)" data-id="${item._id}" data-url="/quotation"  id="delete" class="table-action-btn "><i class="md md-close"></i></a></td>

                           </td>
                     </tr>`;
             tablebody.insertAdjacentHTML('beforeend', eachRecord);


             viewModals+=  `<div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar">
                                            <div >
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                    <h4 class="modal-title">Transaction Detail</h4>
                                                </div>
                                                <br/>
                                                <div class="">
                                                    <div class="row">
                                                         <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Created Date</label>
                                                                <input disabled type="text" class="form-control" id="date${item._id}" placeholder="12/12/0000">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Email</label>
                                                                <input disabled type="text" class="form-control" id="email${item._id}" placeholder="email@email.com">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Username</label>
                                                                <input disabled  type="text" class="form-control" id="username${item._id}" placeholder="abdulrazak">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Mobile</label>
                                                                <input disabled  type="text" class="form-control" id="phone_number${item._id}" placeholder="abdulrazak">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">Amount</label>
                                                                <input disabled type="text"  class="form-control" id="amount${item._id}" placeholder="40000">
                                                            </div>
                                                            </div>

									                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">Reference</label>
                                                                <input disabled type="text"  class="form-control" id="reference${item._id}" placeholder="PAYSTACK-GX-2211">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row">



                                                       <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Plan ID</label>
                                                                <input disabled  type="text"  class="form-control" id="plan_id${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>


                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Quotation ID</label>
                                                                <input disabled type="text"  class="form-control" id="quotation_id${item._id}" placeholder="unlimited">
                                                            </div>
                                                        </div>







                                                         <div class="form-group ">
									                        <label for="position">Status</label>
									                        <select disabled id="status${item._id}" class="form-control" data-style="btn-white">
									                            <option>Successful</option>
									                            <option>Unpaid</option>
									                            <option>Failed</option>

									                        </select>
									                        </div>






                                                    </div>


                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">

                                                <button "display:none;opacity:0"   data-id="${item._id}" data-url="/add-wallets" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                      <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button style="display:none;opacity:0"   id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                    <button  style="display:none;opacity:0" disabled onclick="deleteData(this)" data-id="${item._id}" data-url="/wallets" id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>





		      `;

          });
modalbody1.innerHTML= viewModals;
AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','Quotations page viewed')


  }







  static runAdminDriveTest(driveTest,users,previledges){
    WarLockAdmin(previledges,'view_drive_test','manage_drivers')

        noReadWrite(previledges,'manage_drive_test')

     GateKeepersForAdmin();
      console.log("loading plan page")
    document.getElementById("search").addEventListener("keyup",(e)=>{
      searchTable()
    })




  let data = [...driveTest]
  data = sortBy(data, {
    prop: "created_at",
    desc: true,
    parser: (d) => new Date(d)
    })
  let template2 ='';
    let viewModals = '';




    const tablebody1 = document.getElementById('tablebody1');
    const modalbody1 = document.getElementById("modalbody1");




    if(data.length<=0){
      return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;
    }// if(data.length<=0){
    //   return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;
    // }

    data.map((item, i) => {
      let className='';

        if(item.status=="Ongoing"){

                className=`label-danger`;
         }else if(item.status=="Completed"){

                className= `label-success`;
        }else{

              className=`label-warning`;
         }
        template2 =`<tr>


                          <td>${item.createdDate}</td>
                          <td>${item.email}</td>
                          <td >${item.username}</td>
                           <td >${item.phone_number}</td>
                           <td >${item.description}</td>

                           <td><span class="label ${className}">${item.status}</span></td>
                           <td >
                               <a onclick="viewDriveTest(this)"  data-id="${item._id}" href="#" data-date="${item.createdDate}" data-username="${item.username}" data-description="${item.description}" data-phone_number="${item.phone_number}" data-email="${item.email}" data-date="${formatDate(new Date(item.createdDate))}"    data-status="${item.status}" id="plancat${item._id}"    data-id="${item._id}" data-url="/admin-inspection-detail" class="table-action-btn"><i class="md md-edit"></i></a>
                                <a onclick="deleteRecord(this)" data-id="${item._id}" data-url="/drive-test"  id="delete" class="table-action-btn "><i class="md md-close"></i></a></td>

                           </td>
                   </tr>`;

      viewModals+=  `<div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar" style="">
                                            <div class="">
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect2(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>

                                                </div>

                                                <div class=" text-left">

                                        <div class="form-group">
                                        <div class="m-t-20">
                                                    <label for="position">Car Status</label>
                                                    <div>
                                                    <select id="status${item._id}" class="selectpicker form-control" data-style="btn-white" tabindex="-98">
                                                       <option>Pending</option>
                                                       <option>Completed</option>



                                                    </select></div>
                                            </div>
                                        </div>

                                           <div class="form-group">
                                            <label for="inputColor">Email</label>
                                            <input disabled id="email${item._id}" type="text" class="form-control"  value="Blue">
                                        </div>


                                        <div class="form-group">
                                            <label for="inputColor">Username</label>
                                            <input disabled id="username${item._id}" type="text" class="form-control"  value="Blue">
                                        </div>


                                        <div class="form-group">
                                            <label for="inputColor">Test Center</label>
                                            <input disabled id="description${item._id}" type="text" class="form-control"  value="Blue">
                                        </div>



                                        <div class="form-group">
                                        <div class="m-t-20">
                                                    <label for="position">Phone</label>
                                                    <div>

                                                    <input disabled id="phone_number${item._id}" type="text" class="form-control"  value="Blue">


                                                    </div>
                                            </div>
                                        </div>





                                        <div class="">



                                         <div class="form-group">
                                            <label for="inputLicense">Date</label>
                                            <input type="text" disabled class="form-control" id="date${item._id}" value="">

                                        </div>
                            </div>






                                </div>
                                                <div style="clear:both;display:table;margin-right:0px">
                                                <button style="display:none" style="margin-right:5px;display:none" onclick="addCarRecordEvent(this)" data-id="${item._id}" data-url="/add-cars" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button style="display:none" style="margin-right:5px;" onclick="deleteData(this)" data-id="${item._id}" data-url="/faqs" id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>
                                                    <button style="margin-right:5px;" id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button style="margin-right:5px;" onclick="updateDriveTest(this)" data-id="${item._id}" data-url="/admin-drive-test-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





          `;

        tablebody1.insertAdjacentHTML('beforeend', template2);
    });

    $('#publisher').on('change', function(e) {
      let selector = $(this).val();
      $("#site > option").hide();
      $("#site > option").filter(function(){return $(this).data('pub') == selector}).show();
    });

    modalbody1.innerHTML=viewModals;

    AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','Drive test page viewed')


  }




  static runAdminPreviledges(previledges,previledgesA){

    GateKeepersForAdmin();

    WarLockAdmin(previledgesA,'view_settings','manage_settings')
        noReadWrite(previledgesA,'manage_settings')

    document.getElementById("search").addEventListener("keyup",(e)=>{
     searchTable()
   });

    addClick()



    let data = [...previledges]
    data  = sortBy(data, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })

    // console.log(previledges)


        let template2 ='';
    let viewModals = '';

    const tablebody1 = document.getElementById('tablebody1');
    const modalbody1 = document.getElementById("modalbody1");
    let previledgesModal = document.getElementById("modalbody2");

    if(data.length<=0){
      return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;
    }

    let actionableRoles =``;
    let usergroups_old = data[0].usergroup_set;

    let allroles =``;

    usergroups_old.forEach(item=> allroles+=item +',')


    data.map((item, i) => {
      let className = "label-success"




        template2 =`<tr>

        <td>${item.previledges_info}</td>
        <td>${item.previledges_description}</td>

         <td>

              <a onclick="RolesUpdate(this)" href="#" data-id="${item._id}" data-info="${item.previledges_info}" data-description="${item.previledges_description}"  id="plancat${item._id}"  data-url="/admin-role-detail" class="table-action-btn"><i class="md md-edit"></i></a>

          </td>

          <td>
            <a onclick="viewPreviledges(this)" data-mdrivetest="${item.manage_drive_test}" data-minspection="${item.manage_car_inspection}" data-drivetest="${item.view_drive_test}" data-inspection="${item.view_car_inspection}" data-madmins="${item.manage_admins}" data-admins="${item.view_admins}" data-msettings="${item.manage_settings}" data-settings="${item.view_settings}" data-musers="${item.manage_settings}" data-users="${item.view_users}" data-mfaqs="${item.manage_faqs}" data-faqs="${item.view_faqs}" data-mtickets="${item.manage_tickets}" data-tickets="${item.view_tickets}" data-mtransactions="${item.manage_transactions}" data-transactions="${item.view_transactions}" data-mquotations="${item.manage_quotations}"  data-quotations="${item.view_quotations}"  data-mpayments="${item.manage_payments}" data-payments="${item.view_payments}" data-mpartners="${item.manage_partners}" data-partners="${item.view_partners}" data-mdrivers="${item.manage_drivers}" data-drivers="${item.view_drivers}" data-mcars="${item.manage_cars}"  data-cars="${item.view_cars}" data-msos="${item.manage_sos}" data-sos="${item.view_sos}"  data-mpackages="${item.manage_package}" data-packages="${item.view_package}" data-mbookings="${item.manage_bookings}" data-bookings="${item.view_bookings}" data-id="${item._id}" data-role="${item.previledges_info}" data-url="/admin-role-previledges"  id="delete" class="table-action-btn "><i class="glyphicon glyphicon-eye-open"></i></a>


          </td>


      </tr>`;

      viewModals+=  `<div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class=" slimScrollBar" >
                                            <div >
                                                <div >
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                    <h4 class="modal-title">Roles Detail</h4>
                                                </div>
                                                <br/>
                                                <div >





                                          <div class="">
                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">Role</label>
                                                                <input type="text" data-usergroups_old="${allroles}" class="form-control" id="role${item._id}" placeholder="9000">
                                                            </div>
                                                        </div>




                                           <div class="form-group">
                                                                <label for="field-3" class="control-label">Description</label>


                                                            <textarea class="form-control autogrow" id="description${item._id}" placeholder="description" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>

                                                            </div>






                                                    </div>


                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button onclick="RolesAddAction(this)" data-id="${item._id}" data-url="/add-roles" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button style="display:none;opacity:0" onclick="deleteData(this)" data-id="${item._id}" data-url="/plan-package" data-delete_type="${item.plan_name}" id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>
                                                    <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="RolesUpdateAction(this)" data-id="${item._id}" data-url="/admin-role-detail" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;

      actionableRoles+=`<div style="display:none"  id="con-close-modala-${item._id}" class="" tabindex="-1"  aria-hidden="true" >

                                <button id="close-id" data-id="${item._id}" onclick="addCloseEffect2(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>

<form class="form-horizontal" role="form" data-parsley-validate="" novalidate="" style="display:none"  id="con-close-modalla${item._id}">

                    <div class="form-group col-sm-6">
                      <label for="" class="col-sm-2 control-label">Role Title</label>
                      <div class="col-sm-9">
                        <input type="text" required=""  disabled parsley-type="text" class="form-control" id="userrole-${item._id}" value="${item.previledges_info}">
                      </div>
                    </div>

                    <div class="form-group col-sm-6">
                        <label for="" class="col-sm-4 control-label">Status</label>
                        <div class="col-sm-7">
                          <select class="form-control" data-status="${item.status}" id="status${item._id}">
                            <option>Active</option>
                            <option>Disabled</option>
                            <option>Suspended</option>
                          </select>
                        </div>
                    </div>



                    <div class="clearfix"></div>





                    <h4 class="m-t-10">Roles and Permission</h4>
                    <div class="m-t-10 m-b-30" style="border:0.5px solid #4c3392;"></div>
                    <div class="clearfix"></div>

                    <div >
                      <div class="form-group col-sm-12">
                        <div class="checkbox checkbox-primary col-sm-6 ">
                          <input id="payments${item._id}" data-info="${item.previledges_info}" data-payments="${item.view_payments}" type="checkbox" data-field="view_payments"   data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="payments" class=""  >View Payments </label>
                        </div>

                        <div class="checkbox checkbox-primary col-sm-6 ">
                          <input id="mpayments${item._id}" data-info="${item.previledges_info}" data-mpayments="${item.manage_payments}" type="checkbox" data-field="manage_payments"   data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="payments" class=""  >Manage Payments </label>
                        </div>
                        <br/>

                      </div>
                          <br/>
                      <div class="form-group col-sm-12 ">
                        <div class="checkbox checkbox-primary col-sm-6 ">
                          <input id="transactions${item._id}" data-transactions="${item.view_transactions}" data-info="${item.previledges_info}" type="checkbox" data-field="view_transactions"  data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="topup-transactions" class="">View Wallet</label>
                        </div>

                        <div class="checkbox checkbox-primary col-sm-6 ">
                          <input id="mtransactions${item._id}" data-transactions="${item.manage_transactions}" data-minfo="${item.previledges_info}" type="checkbox" data-field="manage_transactions"  data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="topup-transactions" class="">Manage Wallet </label>
                        </div>


                      </div>
                          <br/>
                      <div class="form-group col-sm-12">
                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="quotations${item._id}"data-info="${item.previledges_info}"  data-quotations="${item.view_quotations}" data-field="view_quotations" type="checkbox"  data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="quotations" class="">View Quotations </label>
                        </div>

                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="mquotations${item._id}"data-info="${item.previledges_info}"  data-mquotations="${item.manage_quotations}" data-field="view_quotations" type="checkbox"  data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="quotations" class="">Manage Quotations </label>
                        </div>


                      </div>
                    </div>

                    <div >
                      <div class="form-group col-sm-12">
                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="cars${item._id}" data-info="${item.previledges_info}" data-cars="${item.view_cars} type="checkbox" data-field="view_cars"  data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="cars" class="">View Cars </label>
                        </div>

                         <div class="checkbox checkbox-primary col-sm-6">
                          <input id="mcars${item._id}" data-info="${item.previledges_info}" data-mcars="${item.manage_cars} type="checkbox" data-field="view_cars"  data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="cars" class="">Manage Cars </label>
                        </div>

                      </div>
                      <div class="form-group col-sm-12">
                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="drivers${item._id}" data-info="${item.previledges_info}" data-drivers="${item.view_drivers}" type="checkbox" data-field="view_drivers" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="drivers" class="">View Drivers </label>
                        </div>

                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="mdrivers${item._id}" data-info="${item.previledges_info}" data-mdrivers="${item.manage_drivers}" type="checkbox" data-field="view_drivers" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="drivers" class="">Manage Drivers </label>
                        </div>


                      </div>
                      <div class="form-group col-sm-12">
                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="partners${item._id}" data-info="${item.previledges_info}" data-partners="${item.view_partners}" type="checkbox" data-field="view_partners"  data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="partners" class="">View Partners </label>
                        </div>

                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="mpartners${item._id}" data-info="${item.previledges_info}" data-mpartners="${item.manage_partners}" type="checkbox" data-field="view_partners"  data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="partners" class="">Manage Partners </label>
                        </div>


                      </div>
                    </div>

                    <div >
                      <div class="form-group col-sm-12">
                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="sos${item._id}" type="checkbox" data-info="${item.previledges_info}" data-sos="${item.view_sos}" data-field="view_sos" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="sos" class="">View SOS </label>
                        </div>

                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="msos${item._id}" type="checkbox" data-info="${item.previledges_info}" data-msos="${item.manage_sos}" data-field="view_sos" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="sos" class="">Manage SOS </label>
                        </div>


                      </div>
                      <div class="form-group col-sm-12">
                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="packages${item._id}" data-info="${item.previledges_info}" data-packages="${item.view_package}" type="checkbox" data-field="view_package"  data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="plan-packages" class="">View Packages </label>
                        </div>

                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="mpackages${item._id}" data-info="${item.previledges_info}" data-mpackages="${item.manage_package}" type="checkbox" data-field="view_package"  data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="plan-packages" class="">Manage Packages </label>
                        </div>

                      </div>
                      <div class="form-group col-sm-12">
                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="bookings${item._id}" data-info="${item.previledges_info}" data-bookings="${item.view_bookings}" type="checkbox"  data-field="view_bookings" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="plan-bookings" class="">View Bookings </label>
                        </div>

                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="mbookings${item._id}" data-info="${item.previledges_info}" data-mbookings="${item.manage_bookings}" type="checkbox"  data-field="view_bookings" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="plan-bookings" class="">Manage Bookings </label>
                        </div>

                      </div>

                      <div class="form-group col-sm-12">
                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="tickets${item._id}" data-info="${item.previledges_info}" data-tickets="${item.view_tickets}" type="checkbox"  data-field="view_bookings" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="plan-bookings" class="">View Tickets</label>
                        </div>

                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="mtickets${item._id}" data-info="${item.previledges_info}" data-mtickets="${item.manage_tickets}" type="checkbox"  data-field="view_bookings" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="plan-bookings" class="">Manage Tickets</label>
                        </div>

                      </div>

                      <div class="form-group col-sm-12">
                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="faqs${item._id}" data-info="${item.previledges_info}" data-faqs="${item.view_faqs}" type="checkbox"  data-field="view_bookings" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="plan-bookings" class="">View Faqs </label>
                        </div>

                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="mfaqs${item._id}" data-info="${item.previledges_info}" data-mfaqs="${item.manage_faqs}" type="checkbox"  data-field="view_bookings" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="plan-bookings" class="">Manage Faqs </label>
                        </div>

                      </div>

                      <div class="form-group col-sm-12">
                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="users${item._id}" data-info="${item.previledges_info}" data-users="${item.view_users}" type="checkbox"  data-field="view_bookings" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="plan-bookings" class="">View Users</label>
                        </div>

                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="musers${item._id}" data-info="${item.previledges_info}" data-musers="${item.manage_users}" type="checkbox"  data-field="view_bookings" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="plan-bookings" class="">Manage Users</label>
                        </div>


                      </div>


                      <div class="form-group col-sm-12">
                        <div class="checkbox checkbox-primary  col-sm-6">
                          <input id="admins${item._id}" data-info="${item.previledges_info}" data-admins="${item.view_admins}" type="checkbox"  data-field="view_bookings" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="plan-bookings" class="">View Admins </label>
                        </div>

                        <div class="checkbox checkbox-primary  col-sm-6">
                          <input id="madmins${item._id}" data-info="${item.previledges_info}" data-madmins="${item.manage_admins}" type="checkbox"  data-field="view_bookings" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="plan-bookings" class="">Manage Admins </label>
                        </div>

                      </div>

                      <div class="form-group col-sm-12">
                        <div class="checkbox checkbox-primary col-sm-6">
                          <input id="settings${item._id}" data-info="${item.previledges_info}" data-settings="${item.view_settings}" type="checkbox"  data-field="view_bookings" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="plan-bookings" class="">View Settings </label>
                        </div>


                         <div class="checkbox checkbox-primary col-sm-6">
                          <input id="msettings${item._id}" data-info="${item.previledges_info}" data-msettings="${item.manage_settings}" type="checkbox"  data-field="view_bookings" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label for="plan-bookings" class="">Manage Settings </label>
                        </div>


                      </div>
                    </div>


                    <div class="checkbox checkbox-primary col-sm-6">
                          <input id="inspection${item._id}" data-info="${item.previledges_info}" data-inspection="${item.view_car_inspection}" type="checkbox"  data-field="view_bookings" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label  class="">View Inspection </label>
                        </div>


                         <div class="checkbox checkbox-primary col-sm-6">
                          <input id="minspection${item._id}" data-info="${item.previledges_info}" data-minspection="${item.manage_car_inspection}" type="checkbox"  data-field="view_bookings" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label  class="">Manage Inspection </label>
                        </div>



                    <br/>



                                            <div class="checkbox checkbox-primary col-sm-6">
                          <input id="drivetest${item._id}" data-info="${item.previledges_info}" data-drivetest="${item.view_drive_test}" type="checkbox"  data-field="view_bookings" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label  class="">View Drive Test </label>
                        </div>


                         <div class="checkbox checkbox-primary col-sm-6">
                          <input id="mdrivetest${item._id}" data-info="${item.previledges_info}" data-mdrivetest="${item.manage_drive_test}" type="checkbox"  data-field="view_bookings" data-id="${item._id}" onchange="update_value_checked_previledges(this)" data-url="/admin-previledges-update" type="checkbox" class=""  value="false">
                          <label  class="">Manage Drive Test </label>
                        </div>





                    <div class="form-group col-sm-12">
                       <button id="saveChanges${item._id}" type="button" class="btn btn-primary btn-custom btn-rounded waves-effect waves-light pull-right">Save</button>

                    </div>
                  </form>

</div>`;

        tablebody1.insertAdjacentHTML('beforeend', template2);
    });

    modalbody1.innerHTML=viewModals;
    previledgesModal.innerHTML=actionableRoles;

    AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','Previledges page viewed')


  }

  static runAdminNotification(data){
        // alert(data)
        data = sortBy(data, {
          prop: "created_at",
          desc: true,
          parser: (d) => new Date(d)
          })
    if(data.length>0){
                 data.map((item,i)=>{

                  if(item.type=="payment"){

                     let markup =`   <div class="pull-left p-r-10" style="" id="${i}">
                                                    <em class="fa fa-diamond noti-primary"></em>
                                                 </div>
                                                 <div class="media-body" data-id="${item._id}" onclick="updateNotificationStatus(this)" data-status="${item.status}">
                                                    <h5 class="media-heading">Quotation Notification</h5>
                                                    <hr/>
                                                    <p class="m-0">
                                                        <small>${item.description.substring(0,100)}...</small>
                                                    </p>
                                                 </div><hr/>`;

                 $( "#notice_board" ).append( $( markup ) )

                  }







                  //$( "#notice_board2" ).append( $( markup ) )
              })
    }



  }

  static runAdminActivityTrail(dataTrails){

   let className ="label-warning"
    dataTrails = sortBy(dataTrails, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })
      let eachRecord ='';
    let recordItems =document.getElementById('tablebody1')


    // var loadMore = new LoadMore({
    //     "dataUrl": baseUrl+ "",
    //     "pageSize": 5
    //   });

    //   loadMore.init(dataTrails)
    dataTrails.forEach((item) => {
      if(item.message_type=='Success'){
        className ='label-success'
      }else{
        className="label-danger"

      }
       eachRecord = `
         <tr>
            <td>
            ${item.logMessage}
            </td>
            <td class="">${item.date}</td>
            <td class=""><img  src="${item.avatar}"  style="height:30px;width30px;border-radius:50px"/></td>

            <td class="">${item.admin}</td>
            <td class="">${item.message_type}</td>
            <td class="">${timeAgo(new Date(item.created_at))}</td>
            <td class=""><span class="label ${className}">${item.status}</span></td>

        <td>
        ${item.module_name || "status changed"}
    </td>

                   </tr>`;

    recordItems.innerHTML += eachRecord;

    document.getElementById("search").addEventListener("keyup",(e)=>{
      searchTable()
    });
  })






  }

  static runAdminRepairs(data){
    let items = [...new Set(data)];

    items =sortBy(items, {
      prop: "created_at",
      desc: true,
      parser: (d) => new Date(d)
      })
    let className;
    let eachRecord ='';
    let recordItems =document.getElementById('tablebody1')
    let viewModals ='';

    let modalB = document.getElementById('modalbody1')

    console.log(items)

    if(items.length<=0){
      return tablebody1.innerHTML = `<h6 style="text-align:center;position:absolute;top:68%;left:40%; margin:0px auto">No records Yet<br/><a class="btn btn-default" id="add-new-id" onclick="addClickStartNew()" href="#">Get Started</a></h6>`;
    }

    items.forEach((item) => {
        if(item.status=="Completed"){
             className ='label-success';
          }else if(item.status=="Ongoing"){
             className ='label-danger';
          }else{
            className="label-warning"
          }

         var loc = item.location.split(",");
         var lat = loc[0];
         var long = loc[1];

         eachRecord = `
           <tr>
              <td class=""><a href="#">CMT-USER-${item.user_id}</a></td>
              <td class="">${item.location}</td>
              <td class="">${item.carbrand}</td>
              <td class="">${formatDate(new Date(item.created_at))}</td>
              <td class=""><span class="label ${className}">${item.status}</span></td>
              <td>
            <a onclick="viewRecordTemplate(this)" data-user_id="${item.user_id}" data-location="${item.location}" data-carbrand="${item.carbrand}" data-status="${item.status}" data-id="${item._id}"  data-url="/admin-mech-status"  id="delete" class="table-action-btn "><i class="glyphicon glyphicon-eye-open"></i></a>


          </td>
                     </tr>
    `;
       let image = (item.images[0] || item.images);
        // if(image.contains('http')){
        //   document.getElementById('carImage').src= item.images[0]
        // }else{
          document.getElementById('carImage').src ="https://Goom Logistics-bucket.s3.amazonaws.com/"+ image;
        // }
        recordItems.innerHTML += eachRecord;
        //   <td><a data-email="${item.carbrand}" data-firstname="${item.firstname}" data-lastname="${item.lastname}" data-location="${item.location}" data-description="${item.description}" data-userid="${user.user.id}" data-points="-1" data-type="mechRequest" className="btn btn-primary waves-effect waves-light table-action-btn read_more md-trigger" data-toggle="modal" data-target="#con-close-modal"  href=""  data-carbrand="${item.carbrand}"  data-id="${item.id}" onclick="getIdRepair(this)"><i class="md md-edit"></i></a>
        //      </td>
viewModals+=  `<div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar" >
                                            <div class="">
                                                <div class="">
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>

                                                </div>
                                                <div class="">


                                                    <div class="row">
                                                        <div class="col-md-12">


                                                        <div class="form-group">
                                          <label for="position">Status</label>
                                          <select id="admin-repairs-status${item._id}" class="form-control" data-style="btn-white">
                                              <option>Pending</option>
                                              <option>Completed</option>
                                              <option>Ongoing</option>


                                          </select>
                                          </div>





                                                            <div class="form-group">
                                                                <label for="field-4" class="control-label">Location</label>
                                                                <input disabled type="text" class="form-control" id="location${item._id}" placeholder="Boston">
                                                                  <div></div>
                                                            </div>



                                                            <div class="form-group">
                                                                <label for="field-5" class="control-label">Car brand</label>
                                                                <input disabled type="text" class="form-control" id="carbrand${item._id}" placeholder="United States">
                                                            </div>












                                                        </div>
                                                    </div>

                                                    <div class="row">


                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button onclick="addRecordEvent(this)" data-id="${item._id}" data-url="/add-faq" id="create" style="display:none" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Create</button>
                                                     <button style="display:none;opacity:0" onclick="deleteData(this)" data-id="${item._id}" data-url="/faqs" id="delete" type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Delete</button>
                                                    <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button onclick="updateRecordTemplate(this)" data-id="${item._id}" data-url="/admin-mech-status" id="update" type="button" class="btn btn-info waves-effect waves-light">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





          `;



      });
modalB.innerHTML=viewModals;

     document.getElementById("search").addEventListener("keyup",(e)=>{
     searchTable()
   });

   AuditTrail.sendLogInfo('','', 'VIEW MODE', 'success', '201', 'UPDATE','Car Repairs page viewed')

  }





  static runEndpoints(){
  	//AdminBash.start();

  }



}









 /*
      Function to carry out the actual PUT request to S3 using the signed request from the app.
    */
 window.uploadFile = (file, signedRequest, url,o) =>{
    if(document.getElementById('preview')){
      document.getElementById('preview').src = url;
            document.getElementById('avatar-url').value = url;
      }
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){

            if( document.getElementById('preview'+o.dataset.id)){
              document.getElementById('preview'+o.dataset.id).src = url;
            document.getElementById('avatar-url'+o.dataset.id).value = url;
            }


            var notification = alertify.notify('Successfully uploaded avatar.', 'success', 5, function(){  console.log('dismissed'); });

          }
          else{
            //alert('Could not upload file.');

            var notification = alertify.notify('Could not perform upload. ', 'error', 5, function(){  console.log('dismissed'); });

          }
        }
      };
      xhr.send(file);
    }

    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
window.getSignedRequest = (file,o) =>{
      const xhr = new XMLHttpRequest();

      xhr.open('GET', baseUrl+`/sign-s3?file-name=${file.name}&file-type=${file.type}`);
        xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            const response = JSON.parse(xhr.responseText);
            uploadFile(file, response.signedRequest, response.url,o);
          }
          else{
            alert('Could not get signed URL.');
          }
        }
      };
      xhr.send();
    }

    /*
     Function called when file input updated. If there is a file selected, then
     start upload procedure by asking for a signed request from the app.
    */
window.initUpload =(o) =>{
  const files = document.getElementById('file-input'+ o.dataset.id).files;
  const file = files[0];
  if(file == null){
    return alert('No file selected.');
  }
      getSignedRequest(file,o);
}

    /*
     Bind listeners when the page loads.
    */

if (document.getElementById('preview')) {
    document.addEventListener('DOMContentLoaded',() => {

	    //  document.body.addEventListener('change', (e)=>{
	  	//  	if(e.target.id=='file-input'){
	  	//  		console.log('upload to start...')
	  	//  		initUpload();
	  	//  	}
	  	//  })




    document.getElementById('file-input'+localStorage.getItem('prologId')).onchange = initUpload;
  });

}


    /*
     Function called when file input updated. If there is a file selected, then
     start upload procedure by asking for a signed request from the app.
    */
window.initCarUpload = (o) =>{
      console.log(o.dataset.id + '--this is th id for thecar')

      const files = document.getElementById('image-file'+ o.dataset.id).files;
      const file = files[0];
      if(file == null){
        return alert('No file selected.');
      }
      getSignedRequest(file);
}


//      Bind listeners when the page loads.



if (document.getElementById('admin-cars-mgt')) {
    document.addEventListener('DOMContentLoaded',() => {

        document.getElementById('image-file'+localStorage.getItem('carId')).onchange = initCarUpload;
    });

}








export default ApiAdminBotService;
