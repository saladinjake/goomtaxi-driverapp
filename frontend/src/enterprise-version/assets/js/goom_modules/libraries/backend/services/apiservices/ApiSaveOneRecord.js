'use strict';
import GateKeepersForUser from './helpers/whois';
import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';
import FetchPromiseApi from './helpers/FetchPromiseApi';
import MessageBoard from '../../../core/MessageBoard';

import ApiMediaUploadService from './ApiMediaUploadService';

import $ from 'jquery';

alertify.set('notifier','position', 'top-left');
   

let activeUrl = getOnlineUrlConnection();
let baseUrl = getOnlineUrlConnection();

class ApiSaveOneRecord {
  static hasClass(el, classname) {
    return el.classList.contains(classname);
  }
  static submitFormData() {
    GateKeepersForUser();

    const comment = document.getElementById('comment').value;
    const subject = document.getElementById('subject').value;
    const select = document.getElementById('select');
    const reportType = select.options[select.selectedIndex].value;
    //const imageInput = document.querySelectorAll('.image-uploads');
    var user_typeSelect = document.getElementById('select');
    const category = user_typeSelect.options[user_typeSelect.selectedIndex].text;
    //const videoInput = document.querySelectorAll('.video-uploads');
    const locationField = document.getElementById('findme');
    let location ='';

    var  imageInput = document.getElementById('filestyle-6').value;
     var fullPath = imageInput;
     var filename = fullPath.replace(/^.*[\\\/]/, '');
     imageInput = filename;

   
    
   
     
        console.log('getting geolocation');
        if (!('geolocation' in navigator)) {
          return;
        }
        navigator.geolocation.getCurrentPosition(
          function(position) {
            location = `${position.coords.latitude}, ${position.coords.longitude}`;
            console.log(location);
            locationField.value = location;
          },
          function(err) {
            console.log(err);
            // alert("Couldn't fetch location!");
            location = location;
          },
          { timeout: 7000 },
        );
     
   

    let postUrl;
    
    postUrl = activeUrl + '/feedback';
    

    console.log(activeUrl)

    console.log(postUrl)

    const reportImages = imageInput;
    const reportVideos = ['a.mp4'];

    if (!(comment && comment.trim().length)) {
      // return MessageBoard.displayMsg('Please enter a comment');
      var notification = alertify.notify('Comment field required.', 'success', 5, function(){  console.log('dismissed'); });

    }


    if (!(subject)) {
      var notification = alertify.notify('Subject field required.', 'success', 5, function(){  console.log('dismissed'); });

      //return MessageBoard.displayMsg('Please enter a subject');
    }

    //location = locationField.value || 

    // if (locationField.value) {
      
    //   location = locationField.value;
    // } else {
    //   return MessageBoard.displayMsg('Please enter a location');
    // }

    // if (imageInput.length > 0) {
    //   for (let i = 0; i < imageInput.length; i++) {
    //     reportImages.push(imageInput[i].innerHTML);
    //   }
    // }

    // if (videoInput.length > 0) {
    //   for (let i = 0; i < videoInput.length; i++) {
    //     reportVideos.push(videoInput[i].innerHTML);
    //   }
    // }

    const user = JSON.parse(localStorage.getItem('userToken'));

    const username = user.user.username;
    const email = user.user.email;
    const phone_number = user.user.phoneNumber;



    const prePostData = {
      comment,
      reportType,
      images: reportImages,
      subject: subject,
      location,
      status: 'Pending',
      user_id: user.user.account_num,
      category,
      ticket_id: "CMT-TKT-"+ new Date()+ user.user.account_num,
      username,
      email,
      phone_number,
      response:'Not Yet Responded'
    };

    if (!prePostData.comment) {
      console.log(prePostData.comment);
      var notification = alertify.notify('Error in posting record.', 'success', 5, function(){  console.log('dismissed'); });

      //return MessageBoard.displayMsg('Error in posting record');
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
          var notification = alertify.notify('succesfully created ticket.', 'success', 5, function(){  console.log('dismissed'); });

       
          localStorage.setItem('urlType', postUrl);
          window.location.replace("./submitted-ticket")
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

  static triggerEvents() {
    console.log('you want to post');

    return ApiSaveOneRecord.submitFormData();
  }
}

// if (document.getElementById('filestyle-6')) {
//   console.log('image upload target');
//   ApiMediaUploadService.triggerEvents();
// }

export default ApiSaveOneRecord;
