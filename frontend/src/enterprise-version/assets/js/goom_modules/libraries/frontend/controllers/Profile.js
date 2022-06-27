'use strict';
import View from '../views/View';
import UserProfileModel from '../models/UserProfileModel';
import setConfigData from '../helpers/localStorageData';

import getApiUrl from '../../backend/services/apiservices/helpers/getOnlineUrlConnection'
let baseUrl =  getApiUrl();

//import  TextEditor from '../../core/TextEditor';
import $ from 'jquery';
class WebsiteProfile {
  constructor() {}

  attachEvents() {
    console.log('calling profile controller');

    if(localStorage.getItem('userToken')){

    const user = JSON.parse(localStorage.getItem('userToken'));

    if((!document.getElementById('signup_page') && !document.getElementById('loginpage') && !document.getElementById('pass_forgot_page') )){
      if(user.user.profile){
        document.getElementById("user-profile").src="https://Goom Logistics-bucket.s3.amazonaws.com/"+ user.user.profile

      }else{
        document.getElementById("user-profile").src="./public/assets/images/avatar.png"
      }
     
    }
    if (document.getElementById('profile-page')) {
     if(user.user.profile){
       document.getElementById("preview").src="https://Goom Logistics-bucket.s3.amazonaws.com/"+ user.user.profile
      }else{
        document.getElementById("preview").src="./public/assets/images/avatar.png"
      }
      var plancert = document.getElementById("certificate");
        plancert.disabled=true;
      this.indexPageController();
      this.deleteRecordPageController();
      this.saveNewRecordPageController();

    } else {
      console.log('cant find where to load data');
    }

   }else{
     //localStorage
     // window.location.href='./'
   }



   $(".toggle-password").click(function() {

        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
          input.attr("type", "text");
        } else {
          input.attr("type", "password");
        }
      });
   
    
  }
  static hasClass(el, classname) {
    return el.classList.contains(classname);
  }


  downloadAgreement(){
    
   

  }

  indexPageController() {
    let that = this;
    let dataPromise = UserProfileModel.fetchUserProfile();
    
    // dataPromise
    //   .then(data => {
    //     console.log(JSON.stringify(data) +'hello')
    //     //View.Index(data,'data');
    //   })
    //   .catch(err => console.log(err));
  }

  
  saveNewRecordPageController() {
    let documentDom = document;

    documentDom.addEventListener(
      'click',
      e => {
        if (WebsiteProfile.hasClass(e.target, 'new_content')) {

          e.target.innerHTML="Loading..";
          e.target.disabled=true;
          e.preventDefault();
          return UserProfileModel.updateProfile();
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
        if (WebsiteProfile.hasClass(e.target, 'delete_icon')) {
          UserProfileModel.deleteOneProfileRecord();
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
      document.getElementById('preview').src = url;
            document.getElementById('avatar-url').value = url;
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            document.getElementById('preview').src = url;
            document.getElementById('avatar-url').value = url;
          }
          else{
            alert('Could not upload file.');
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
    function getSignedRequest(file){
      const xhr = new XMLHttpRequest();
    
      xhr.open('GET', baseUrl+`/sign-s3?file-name=${file.name}&file-type=${file.type}`);
        xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            const response = JSON.parse(xhr.responseText);
            uploadFile(file, response.signedRequest, response.url);
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
    function initUpload(){
      const files = document.getElementById('file-input').files;
      const file = files[0];
      if(file == null){
        return alert('No file selected.');
      }
      getSignedRequest(file);
    }

    /*
     Bind listeners when the page loads.
    */


  if (document.getElementById('profile-page')) {
    document.addEventListener('DOMContentLoaded',() => {
      
     

        document.getElementById('file-input').onchange = initUpload;
    });

  }


    
export default WebsiteProfile;
