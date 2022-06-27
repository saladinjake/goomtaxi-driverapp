'use strict';
import GateKeepersForUser from './helpers/whois';
import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';
import FetchPromiseApi from './helpers/FetchPromiseApi';
import MessageBoard from '../../../core/MessageBoard';

import ApiMediaUploadService from './ApiMediaUploadService';

let activeUrl = getOnlineUrlConnection();
let baseUrl = getOnlineUrlConnection();

function searchTable() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("foo-table-input");
  filter = input.value.toUpperCase();
  table = document.getElementById("demo-foo-pagination");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

class ApiMech {
  static hasClass(el, classname) {
    return el.classList.contains(classname);
  }

  static getAddress(myLatitude,myLongitude) {
      
    var geocoder  = new google.maps.Geocoder();             // create a geocoder object
    var location  = new google.maps.LatLng(myLatitude, myLongitude);    // turn coordinates into an object
      
    geocoder.geocode({'latLng': location}, function (results, status) {
      if(status == google.maps.GeocoderStatus.OK) {           // if geocode success
          
              const address = results[0].formatted_address;
             return address;         // if address found, pass to processing function
      } else {
          alert("Geocode failure: " + status);                // alert any other error(s)
          return false;
      }
    });
  }

  static getUsersRepairs(){}
  static saveRepairs() {
    GateKeepersForUser();
    const user = JSON.parse(localStorage.getItem('userToken'));
    const comment = document.getElementById('description').value;
    const firstname =  user.user.firstname; //document.getElementById('firstname').value;
    const lastname =   user.user.username; //document.getElementById('lastname').value;
    const email =  user.user.email ; //document.getElementById('email').value;
    const select = document.getElementById('carbrand');
    let carbrand = select.options[select.selectedIndex].text;
    //const imageInput = document.querySelectorAll('.image-uploads');
    //const videoInput = document.querySelectorAll('.video-uploads');
    const locationField = document.getElementById('findme');
    let location ='';

     var imageInput = document.getElementById('image-file').value;
     var fullPath = imageInput;
     var filename = fullPath.replace(/^.*[\\\/]/, '');
     imageInput = filename;

     

   
    
   
     
    console.log('getting geolocation');
    if (!('geolocation' in navigator)) {
          return;
    }
     
   

    let postUrl;
    
    postUrl = activeUrl + '/mechanic-request';
    


    const reportImages = [imageInput];
    const reportVideos = ['a.mp4'];
    location = comment;
    if (!(location && location.length)) {
      var notification = alertify.notify('Please enter your location.', 'error', 5, function(){  console.log('dismissed'); });
       return false;
      // return MessageBoard.displayMsg('Please enter a comment');
    }


    if (!(comment && comment.length)) {
      var notification = alertify.notify('Please enter a comment', 'error', 5, function(){  console.log('dismissed'); });
       return false;
      // return MessageBoard.displayMsg('Please enter a comment');
    }



    if (carbrand=="--Select Car--"){
      var notification = alertify.notify('Please select a brand', 'error', 5, function(){  console.log('dismissed'); });
       return false;
    }


    if (!(firstname)) {
      // return MessageBoard.displayMsg('Please enter a firstname');
      var notification = alertify.notify('Please enter your firstname', 'error', 5, function(){  console.log('dismissed'); });
      return false;
    }


    if (!(lastname)) {
      //return MessageBoard.displayMsg('Please enter a lastname');
      var notification = alertify.notify('Please enter a username', 'error', 5, function(){  console.log('dismissed'); });
      return false;
    }


    if (!(imageInput)) {
      //return MessageBoard.displayMsg('Please enter a lastname');
      var notification = alertify.notify('Please upload an image.', 'error', 5, function(){  console.log('dismissed'); });
      return false;
    }

    //location = locationField.value || 

    // if (locationField.value) {
      
    //   location = locationField.value;
    // } else {
    //   return MessageBoard.displayMsg('Please enter a location');
    // }

    if (imageInput.length > 0) {
      for (let i = 0; i < imageInput.length; i++) {
        reportImages.push(imageInput[i].innerHTML);
      }
    }

    // if (videoInput.length > 0) {
    //   for (let i = 0; i < videoInput.length; i++) {
    //     reportVideos.push(videoInput[i].innerHTML);
    //   }
    // }

   var description = comment;

    var lat,long;
    var pos = locationField.value;
    
    const prePostData = {
      description,
      carbrand,
      images: imageInput,
      firstname,
      lastname,
      location:pos,
      status: 'Pending',
      user_id: user.user._id,


    
    };
    console.log(prePostData)

    if (!prePostData.description) {
      console.log(prePostData.comment);
      // return MessageBoard.displayMsg('Error in posting record');
      var notification = alertify.notify('Error in posting record', 'error', 5, function(){  console.log('dismissed'); });
      return false;
    }

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
        if (data.status === 201) {
          //MessageBoard.displayMsg('Form submitted succesfully');
          var notification = alertify.notify('Form submitted succesfully', 'success', 5, function(){  console.log('dismissed'); });
      
          window.location.href ="./request-repairs-history"


          localStorage.setItem('urlType', postUrl);
        } else if (data.status === 401 || data.status === 403) {
          window.location.href = './';
        } else {
          //MessageBoard.displayMsg(data.error);
           var notification = alertify.notify(data.error, 'error', 5, function(){  console.log('dismissed'); });
      


        }
      })
      .catch(error => {
        throw error;
      });
  }

  static getUsersRepairs() {
    console.log('you want to post');//

        GateKeepersForUser();
    const user = JSON.parse(localStorage.getItem('userToken'));
    let recordUrl;
    recordUrl = activeUrl + `/mechanic-request/${user.user._id}/users`;
    
    return fetch(recordUrl, {
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
        if (data.status === 200) {
          document.getElementById("foo-table-input").addEventListener("keyup",(e)=>{
                 searchTable();
               })

          const records = data;
          
          return records;
        }
      })
      .catch(error => {
        throw error;
      });

  }
}

// if (document.getElementById('filestyle-6')) {
//   console.log('image upload target');
//   ApiMediaUploadService.triggerEvents();
// }

export default ApiMech;
