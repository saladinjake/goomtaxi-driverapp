'use strict';
import View from '../views/View';
import InterventionModel from '../models/InterventionModel';
import setConfigData from '../helpers/localStorageData';
// import $ from 'jquery';
// import googleMapsGeocoder from 'google-maps-geocoder';

import $ from 'jquery';
import getApiUrl from '../../backend/services/apiservices/helpers/getOnlineUrlConnection'
let baseUrl =  getApiUrl();

alertify.set('notifier','position', 'top-left');



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

    

function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}

function codeLatLng(lat, lng) {
  // const geocoder = googleMapsGeocoder('AIzaSyC2zkhqhHZk1o_sEln8ahx3KuI1XP07w9I');
  // const add = geocoder.reverseGeocode(lat, lng).then((where) => { 
  //   // console.log(where);
  //   var locationText = document.getElementById('location-code');
  //   locationText.innerHTML=where;

  // }).catch(e => { return "No found routes or address"});
  // //return add;

   var geocoder  = new google.maps.Geocoder();             // create a geocoder object
    var location  = new google.maps.LatLng(lat, lng);    // turn coordinates into an object
      
    geocoder.geocode({'latLng': location}, function (results, status) {
      if(status == google.maps.GeocoderStatus.OK) {           // if geocode success
          

         var locationText = document.getElementById('location-code');
            locationText.innerHTML=results[0].formatted_address;
              // if address found, pass to processing function
      } else {
          alert("Geocode failure: " + status);                // alert any other error(s)
          return false;
      }
    });
}

window.getLocation = () => {
        var locationText = document.getElementById('location-code');
  var autocomplete3 = new google.maps.places.Autocomplete(locationText);
        google.maps.event.addListener(autocomplete3, 'place_changed', function () {
            startLoc = autocomplete3.getPlace();
            // document.getElementById('city2').value = place.name;
            // document.getElementById('cityLat').value = place.geometry.location.lat();
            // document.getElementById('cityLng').value = place.geometry.location.lng();
        });
     var locationText = document.getElementById('location-code');
var locationText2 = document.getElementById('findme')
var location2 = document.getElementById("location2");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    locationText.innerHTML = 'Geolocation is not supported by this browser.';
   
  }
};

const showPosition = (position) => {
  var locationText = document.getElementById('location-code');
var locationText2 = document.getElementById('findme')
var location2 = document.getElementById("location2");
  // locationText.innerHTML = `Location: <span id="location" style="color:#361f55">${
  //   position.coords.latitude
  // }, ${position.coords.longitude}</span>`;
  locationText2.value= position.coords.latitude + ',' + position.coords.longitude
  codeLatLng(position.coords.latitude,position.coords.longitude);
  
//location2.value= position.coords.latitude + ',' + position.coords.longitude
  //locationText2.innerHTML = locationText.innerHTML

};

window.getId  = (item)  =>{
    var that = item;
    //defining all needed variables
 //You may use vanilla JS, I just chose jquery
  const form = document.getElementById('container-x');
  form.style.opacity=1;
  console.log(item)
on()

    localStorage.setItem('Id', item.id);
    console.log(item.id)
    localStorage.setItem('reportType', item.title);
     console.log(item.title);
     

     let dataPromise = InterventionModel.getSpecificData();
          dataPromise.then(data => {
           
  
  

            let location = document.getElementById('location2');
            let category = document.getElementById('category2');
            let description = document.getElementById('description2');
            let subject = document.getElementById('subject2');
            //let image = document.getElementById('image-off');            

            location.value = item.dataset.location;
            category.value = item.dataset.category;
            description.value = item.dataset.description;
            subject.value= item.dataset.subject
            //image.src = 'a.jpg';

      });


}

window.imgArry = (image) => {
  if (image.length === 0) {
    return 'No Image Uploaded';
  }
  const displayImage = image.map(
    img => `
  <img src="./assets/images/${img}" alt="" class="item" height="200" width="240">
  `
  );
  return displayImage;
};

window.videoArry = (video) => {
  if (video.length === 0) {
    return 'No Video Uploaded';
  }
  const displayVideo = video.map(
    (vid, i) => `
    <video width="240" height="180" controls>
      <source src="${vid}">
    </video>
`
  );
  return displayVideo;
};





// document.body.addEventListener("click",(e)=>{
//    if (e.target.id="myImg"){

//     var modal = document.getElementById("myModal");

//     // Get the image and insert it inside the modal - use its "alt" text as a caption
//     var img = document.getElementById("myImg");
//     var modalImg = document.getElementById("img01");
//     var captionText = document.getElementById("caption-image");
//     img.onclick = function(){
//       modal.style.display = "block";
//       modalImg.src = this.src;
//       captionText.innerHTML = this.alt;
//     }

//     // Get the <span> element that closes the modal
//     var span = document.getElementsByClassName("close-image")[0];

//     // When the user clicks on <span> (x), close the modal
//     span.onclick = function() { 
//       modal.style.display = "none";
//     }

//    }


// })



function searchTable(trId=0) {


  // $(document).ready(function(){

  // Search all columns
  $('#foo-table-input').keyup(function(){
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
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
   return function( elem ) {
     return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
   };
});
}


function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
}



class IReporterWebsiteInterventions {
  constructor() {}

  attachEvents() {
    console.log('calling feedback intervention controller');

    if (document.getElementById('create-ticket')) {
            var locationText = document.getElementById('findme');
  // var autocomplete3 = new google.maps.places.Autocomplete(locationText);
  //       google.maps.event.addListener(autocomplete3, 'place_changed', function () {
  //           startLoc = autocomplete3.getPlace();
  //           // document.getElementById('city2').value = place.name;
  //           // document.getElementById('cityLat').value = place.geometry.location.lat();
  //           // document.getElementById('cityLng').value = place.geometry.location.lng();
  //       });

      document.getElementById("get-currentloc").addEventListener("click", (e)=>{

    
      getLocation()
    })
      
      // this.singleItemPageController();
      // this.deleteRecordPageController();
      // this.editLocationRecordPageController();
      // this.editStatusRecordPageController();
      // this.editCommentRecordPageController();
      this.saveNewRecordPageController();
      
    }  else if(document.getElementById("view-tickets")){
      this.indexPageController();

    }else {
      console.log('cant find where to load data');
    }

    
  }
  static hasClass(el, classname) {
    return el.classList.contains(classname);
  }



 


  static render(items) {

     if (document.getElementById('view-tickets')) {

      document.getElementById("foo-table-input").addEventListener("keyup",(e)=>{
        searchTable() 
      })

    const recordItems = document.querySelector('#fetched-data');
     //alert('hello man')
    if (items.length ===0) {
      recordItems.innerHTML = 'No records Yet';
      recordItems.style.textAlign = 'center';
      recordItems.style.fontSize = '32px';
      recordItems.style.font = 'bold';
    } else {
      items =  sortBy(items, {
        prop: "created_at",
        desc: true,
        parser: (d) => new Date(d)
      })
      items.forEach((item) => {
        var d = new Date(item.created_at);
        var e = formatDate(d);
        let className ='label-success'
         if(item.status=="Completed"){
             className ='label-success';
          }else if(item.status=="Pending"){
             className ='label-warning';
          }else{
            className="label-danger"
          }

          if(!item.response){
            item.response = "awaiting response";
          }
          let imgView;
          if(item.images[0]){
            console.log(item.images[0])
            imgView = `
                <div id="image-frame">
                       <a href="#" class="interventions">
                        <img id="myImg" src="https://Goom Logistics-bucket.s3.amazonaws.com/${item.images}" alt="Snow" style="width:100%;max-width:300px"/>
                      </a>
                </div>


            `;


          }else{
             imgView = `
                <div id="image-frame">
                       <a href="#" class="interventions">
                        No Image uploaded
                      </a>
                </div>
             `;
          }



          let styler ="display:none";

        const eachRecord = `
           <tr>
              <td class="">${e} </td>
              <td class=""> ${item.subject}</td>
              <td class=""> ${item.category}</td>
              
              <td class="">${item.comment.slice(0, 150)}</td>
              
              
              <td class="text-center "><span class="label ${className} " >${item.status}</span></td>
              <td class="text-center ">${item.response}</td>

              <td class="text-center ">${imgView}</td>
              <td class="">
              <a data-subject="${item.subject}" data-category="${item.category}" data-location="${item.location}" data-description="${item.comment}" data-points="-1" data-type="General Enquiries" class="table-action-btn read_more md-trigger" href="./record.html"  title=${item.reportType} class="comment" id=${item.id} onclick="function(e){e.preventDefault()};getId(this)"></a>
              </td>
           
          </tr>

          

       
    `;
  

        recordItems.innerHTML += eachRecord;
      });
    }

   }
  }




  indexPageController() {
    let that = this;
    let dataPromise = InterventionModel.getAllData();
    dataPromise
      .then(data => {
        IReporterWebsiteInterventions.render(data);
      })
      .catch(err => console.log(err));
  }

  singleItemPageController() {
    let that = this;
    let documentDom = document;
    documentDom.addEventListener(
      'click',
      e => {
        if (IReporterWebsiteInterventions.hasClass(e.target, 'read_more')) {
          console.log('we are here')
          let dataPromise = InterventionModel.getSpecificData();
          dataPromise.then(data => {
            console.log(data)
          });
        }
      },
      false,
    );
  }

  saveNewRecordPageController() {
    let documentDom = document;

    documentDom.addEventListener(
      'click',
      e => {
        if (IReporterWebsiteInterventions.hasClass(e.target, 'new_content')) {

          e.preventDefault();
          console.log('called')
          return InterventionModel.submitFormData();
        } 
      },
      false,
    );



  }

  
  deleteRecordPageController() {
    let that = this;
    document.addEventListener(
      'click',
      function(e) {
        e.preventDefault();
        if (IReporterWebsiteInterventions.hasClass(e.target, 'delete_icon')) {
          InterventionModel.deleteOneRecord();

           setTimeout(()=>{
              window.location.reload()
            },3000)
        }
      },
      false,
    );
  }

  editLocationRecordPageController() {
    let that = this;
    document.addEventListener(
      'click',
      function(e) {
        e.preventDefault();
        if (IReporterWebsiteInterventions.hasClass(e.target, 'update_loc_icon')) {
          let dataPromise = InterventionModel.getSpecificData();
          dataPromise.then(data => {
            return View.EditLocation(data, () => {
              let triggerBtn = document.getElementById('trigger');
              triggerBtn.addEventListener('click', e => {
                e.preventDefault();
                return InterventionModel.updateOneLocation();
              });
            });
          });
        }
      },
      false,
    );
  }

  editCommentRecordPageController() {
    let that = this;
    document.addEventListener(
      'click',
      function(e) {
        e.preventDefault();
        if (IReporterWebsiteInterventions.hasClass(e.target, 'update_comment_icon')) {
          let dataPromise = InterventionModel.getSpecificData();
          dataPromise.then(data => {
            return View.EditComment(data, () => {
              let triggerBtn = document.getElementById('triggerComment');
              triggerBtn.addEventListener('click', e => {
                e.preventDefault();
                return InterventionModel.updateOneComment();
              });
            });
          });
        }
      },
      false,
    );
  }

  editStatusRecordPageController() {
    let that = this;
    document.addEventListener(
      'click',
      function(e) {
        if (IReporterWebsiteInterventions.hasClass(e.target, 'update_status_icon')) {
          let dataPromise = InterventionModel.getSpecificData();
          dataPromise.then(data => {
            return View.EditStatus(data, () => {
              let triggerBtn = document.getElementById('triggerStatus');
              triggerBtn.addEventListener('click', e => {
                e.preventDefault();
                return InterventionModel.updateOneStatus();
              });
            });
          });
        }
      },
      false,
    );
  }
}


/*
      Function to carry out the actual PUT request to S3 using the signed request from the app.
    */
    function uploadFile(file, signedRequest, url){
       if(file != null){
          //document.getElementById('preview').src = url;
                //document.getElementById('avatar-url').value = url;
          const xhr = new XMLHttpRequest();
          xhr.open('PUT', signedRequest);
          xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
              if(xhr.status === 200){
                console.log("successful image upload")
                 document.getElementById("filename-view").innerHTML = "";
                //document.getElementById('preview').src = url;
                //document.getElementById('avatar-url').value = url;
                var notification = alertify.notify('Upload image Success.', 'success', 5, function(){  console.log('dismissed'); });
       
              }
              else{
                 document.getElementById("filename-view").innerHTML = "";
                //alert('Could not upload file.');
                var notification = alertify.notify('Upload image error.', 'error', 5, function(){  console.log('dismissed'); });
       
              }
            }
          };
          xhr.send(file);
      }
    }

    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    function getSignedRequest(file){
      if(file != null){
          const xhr = new XMLHttpRequest();
        
          xhr.open('GET', baseUrl+`/sign-s3?file-name=${file.name}&file-type=${file.type}`);
            xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
          xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
              if(xhr.status === 200){
                 //document.getElementById("filename-view").innerHTML = "";
                const response = JSON.parse(xhr.responseText);
                uploadFile(file, response.signedRequest, response.url);
              }
              else{
                alert('Could not get signed URL.');
                 //document.getElementById("filename-view").innerHTML = "";
              }
            }
          };
          xhr.send();

      }
    }

    /*
     Function called when file input updated. If there is a file selected, then
     start upload procedure by asking for a signed request from the app.
    */
    function initUpload(){
      const files = document.getElementById('filestyle-6').files;
      document.getElementById("filename-view").innerHTML = "file name: "+ files[0].name+ "<br/><br/>";
      const file = files[0];
      if(file == null){
         document.getElementById("filename-view").innerHTML = "";
      
        return alert('No file selected.');

      }
      getSignedRequest(file);
    }

    /*
     Bind listeners when the page loads.
    */

  if (document.getElementById('filestyle-6')) {
    document.addEventListener('DOMContentLoaded',() => {
     

        document.getElementById('filestyle-6').onchange = initUpload;
    });

  }

export default IReporterWebsiteInterventions;
