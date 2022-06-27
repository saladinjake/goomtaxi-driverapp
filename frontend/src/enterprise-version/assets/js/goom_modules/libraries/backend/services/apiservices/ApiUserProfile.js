'use strict';
import GateKeepersForUser from './helpers/whois';
import FetchPromiseApi from './helpers/FetchPromiseApi';
import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';
import MessageBoard from '../../../core/MessageBoard';
let success_url= './dashboard';
import $ from 'jquery';
alertify.set('notifier','position', 'top-left');
let activeUrl = getOnlineUrlConnection();
let baseUrl = getOnlineUrlConnection();




class ApiUpdateProfile {
  static hasClass(el, classname) {
    return el.classList.contains(classname);
  }
  static fetchUserProfile() {
    GateKeepersForUser();


    const user = JSON.parse(localStorage.getItem('userToken'));
     let linkOfApi = activeUrl + '/profile/update/'+ user.user.email;
     console.log(linkOfApi)

    if(document.getElementById('drivers-profile')){
       linkOfApi = activeUrl + '/profile/update/'+ user.user.email;
    }


   
    //alert(linkOfApi)

    

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
          
          document.getElementById('email').value = userRecord.email;
          document.getElementById('phoneNumber').value = userRecord.phone_number
          document.getElementById('password').value = '';
          document.getElementById('password-confirm').value='';
          document.getElementById("certificate").value= userRecord.test_certificate
          document.getElementById('firstname').value = userRecord.firstname;
          document.getElementById('lastname').value= userRecord.lastname;
          // document.getElementById('user_type').value= userRecord.roles;
          document.getElementById('username').value= userRecord.username;
          document.getElementById('avatar-img2').src= userRecord.avatar;

          let idz='#user_type';
    $( idz + " option").each(function () {
        
       // alert('hello')
        let checkmate = userRecord.user_type
        // console.log(checkmate)
       //alert(checkmate)
       //alert($(this).html())
        if ($(this).html() == checkmate ) {
          // alert('yes check mate'+ $(this).html() )
            $(this).attr("selected", "selected");
            return;
        }
    });


          if(document.getElementById('drivers-profile')){
            document.getElementById('car-model').innerHTML= userRecord.assigned_car_name[0]
            document.getElementById('plate').innerHTML= userRecord.assigned_car_plate_number
            document.getElementById('ratings').innerHTML=userRecord.ratings_average
          }

          var me =JSON.parse(localStorage.getItem('userToken'));
          if(userRecord.avatar){
          
             me.profile = userRecord.avatar;
          }

         

          localStorage.setItem('userToken', JSON.stringify(me))

          
        } else {
          var notification = alertify.notify('Could not perform Update location operation', 'error', 5, function(){  console.log('dismissed'); });
      
        }
      }).catch(e => {
        // var notification = alertify.notify(e, 'error', 5, function(){  console.log('dismissed'); });
      
        // return MessageBoard.displayMsg(e);
      })
  }

  static updateProfile(){
     GateKeepersForUser();
     const user = JSON.parse(localStorage.getItem('userToken'));
     let linkOfApi = activeUrl + '/profile/update/'+ user.user.email;
     console.log(linkOfApi)


      if(document.getElementById('drivers-profile')){
       linkOfApi = activeUrl + '/profile/update/'+ user.user.email;
      }


     

     let email = document.getElementById('email').value  ;
     let phoneNumber = document.getElementById('phoneNumber').value;
     let password =    document.getElementById('password').value ;
     let passwordConfirm =    document.getElementById('password-confirm').value;
     let firstname =    document.getElementById('firstname').value;
     let lastname =    document.getElementById('lastname').value;
      //const othernames = document.getElementById('othernames').value;
    var user_typeSelect = document.getElementById('user_type');
    const user_type = user_typeSelect.options[user_typeSelect.selectedIndex].text;

     let username =    document.getElementById('username').value;
     let avatar = document.getElementById('file-input').value ;
     var fullPath = avatar;
     var filename = fullPath.replace(/^.*[\\\/]/, '');
     avatar = filename;

     console.log("this pic:" + avatar)

      var domel =document.getElementById('new_content')
           

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


     let certificate = document.getElementById("certificate").value;
     

     if (!(avatar && avatar.trim().length)) {
       // MessageBoard.displayMsg('Please enter a avatar');
       var notification = alertify.notify('Please enter an avatar', 'error', 5, function(){  console.log('dismissed'); });
       setTimeout(()=>{
        domel.innerHTML="Update";
            domel.disabled=false;
       },5000)
    }

     if (!(certificate && certificate.trim().length)) {
      certificate ='Goom Logistics-122-211-333111'
      setTimeout(()=>{
        domel.innerHTML="Update";
            domel.disabled=false;
       },5000)
      //return MessageBoard.displayMsg('Please enter a certificate');
    }

    if (!(email && email.trim().length)) {
      // MessageBoard.displayMsg('Please enter a email');
      // setTimeout(()=>{
      //   MessageBoard.displayMsg('');
      //  }, 4000);
      var notification = alertify.notify('Please enter a email', 'error', 5, function(){  console.log('dismissed'); });
      setTimeout(()=>{
        domel.innerHTML="Update";
            domel.disabled=false;
       },5000)

    }

    if (!(phoneNumber && phoneNumber.trim().length)) {
      
      var notification = alertify.notify('Please enter a phone number', 'error', 5, function(){  console.log('dismissed'); });
      setTimeout(()=>{
        domel.innerHTML="Update";
            domel.disabled=false;
       },5000)
    }
    if (!(firstname && firstname.trim().length)) {
      
       var notification = alertify.notify('Please enter a firstname', 'error', 5, function(){  console.log('dismissed'); });
       setTimeout(()=>{
        domel.innerHTML="Update";
            domel.disabled=false;
       },5000)

    }
    if (!(lastname && lastname.trim().length)) {
      
      var notification = alertify.notify('Please enter a lastname', 'error', 5, function(){  console.log('dismissed'); });
       setTimeout(()=>{
       domel.innerHTML="Update";
            domel.disabled=false;
       },5000)
    }
    // if (!(user_type && user_type.trim().length)) {
      
    //   var notification = alertify.notify('Please enter a type', 'error', 5, function(){  console.log('dismissed'); });
    //    setTimeout(()=>{
    //     domel.innerHTML="Update";
    //         domel.disabled=false;
    //    },5000)
    // }

    if (!(password && password.trim().length)) {
      
     
      password = "unchanged";
    }

    if (!(passwordConfirm && passwordConfirm.trim().length)) {
      
      passwordConfirm = "unchanged";
    }

    if(password!= passwordConfirm){
      
       var notification = alertify.notify('Please ensure that your password matches the confirm password field.', 'error', 5, function(){  console.log('dismissed'); });
       setTimeout(()=>{
        domel.innerHTML="Update";
            domel.disabled=false;
       },5000)
       
      }
      //avatar = 'https://Goom Logistics-bucket.s3.amazonaws.com/'+avatar;

     let userProfile ={
      email,
      phoneNumber,
      password,
      passwordConfirm,
      firstname,
      lastname,
      user_type: user_type,
      username,
      avatar,
      certificate

     };

     return fetch(linkOfApi, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      mode: 'cors',
      body: JSON.stringify(userProfile)
      
    })
      .then(response => response.json())
      .then(data => {
        if(data.success){
          setTimeout(()=>{
            MessageBoard.displayMsg("success");
            //window.location.replace(success_url);

            var notification = alertify.notify('Successfully updated your profile', 'success', 5, function(){  console.log('dismissed'); });
            var domel =document.getElementById('new_content')
            domel.innerHTML="Update";
            domel.disabled=false;

              window.location.reload();
             
          }, 2000);

         
          

          

        }
      })
      .catch(e => {
        var notification = alertify.notify('Update was not successful. '+ e, 'error', 5, function(){  console.log('dismissed'); });
        var domel =document.getElementById('new_content')
            domel.innerHTML="Update";
            domel.disabled=false;
        // return MessageBoard.displayMsg(e);
      })


  }

}



export default ApiUpdateProfile;
