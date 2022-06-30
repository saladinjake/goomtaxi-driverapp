'use strict';
import Router from '../../../core/Router';
import MessageBoard from '../../../core/MessageBoard';
import SignUpCheker from './helpers/signupChecker';
import FetchPromiseApi from './helpers/FetchPromiseApi';
import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';
import $ from 'jquery';

alertify.set('notifier', 'position', 'top-left');

let activeUrl = getOnlineUrlConnection();
let baseUrl = getOnlineUrlConnection();

let signUpUrl = activeUrl + '/auth/signup';
class ApiSignUpService {
  static authorize() {
    const resultingData = SignUpCheker.triggerValidation();
    const signUpForm = document.getElementById('sign-form');
    const successAnimationStart = document.getElementById('success-mark');

    if (document.getElementById('drivers-signup')) {
      signUpUrl = activeUrl + '/auth/drivers-signup';
    }
    //alert(signUpUrl)
    console.log(JSON.stringify(resultingData));
    if (resultingData) {
      fetch(signUpUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        mode: 'cors',
        body: JSON.stringify(resultingData),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 201 && data.data[0].token) {
            // localStorage.setItem('userToken', data.data[0].token);
            localStorage.login = 'true';
            signUpForm.style.display = 'none';
            setTimeout(function() {
              successAnimationStart.style.display = 'block';
            }, 10);
            var notification = alertify.notify('Successfully signed up', 'success', 5, function() {
              console.log('dismissed');
            });
          } else {
            signUpForm.style.display = 'block';
            MessageBoard.displayMsg(data.error);
            var notification = alertify.notify(data.error, 'error', 5, function() {
              console.log('dismissed');
            });
          }
        })
        .catch(error => {
          throw error;
        });
    } else {
      //MessageBoard.displayMsg('Error occured while processing data');
      //setTimeout(()=>{  MessageBoard.displayMsg('');},6000)
    }
  }
}
export default ApiSignUpService;
