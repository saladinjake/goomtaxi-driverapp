'use strict';
import Router from '../../../core/Router';
import MessageBoard from '../../../core/MessageBoard';
import FetchPromiseApi from './helpers/FetchPromiseApi';
import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';
import $ from 'jquery';
const emailRegularExpression = /\S+@\S+\.\S+/;
alertify.set('notifier', 'position', 'bottom-left');

let activeUrl = getOnlineUrlConnection();
let baseUrl = getOnlineUrlConnection();

const admin_url = './admin-dashboard';
let user_dashpane = './dashboard';
let driver_dashpane = './dashboard-driver';

let loginUrl = activeUrl + '/auth/login';
let resetPwUrl = activeUrl + '/auth/forgot_password';

let API = process.env.DEPLOY_FRONT_URL;
let APP = baseUrl;

function clearState() {
  MessageBoard.displayMsg('Login Failed');
  localStorage.clear();
}

class ApiLoginService {
  static validate() {
    //if request is from driver app handle it

    if (document.getElementById('drivers-login')) {
      loginUrl = activeUrl + '/auth/drivers-login';
    }

    //alert(loginUrl)
    let email = document.getElementById('userName').value;
    let password = document.getElementById('userPw').value;
    let dome2 = document.getElementById('login_btn');
    dome2.innerHTML = 'loading...';
    dome2.disabled = true;

    if (!userName) {
      MessageBoard.displayMsg('Email is required');
      setTimeout(() => {
        MessageBoard.displayMsg('');
      }, 6000);
      var notification = alertify.notify('Email is required', 'error', 5, function() {
        console.log('dismissed');
      });
    }
    if (!userPw) {
      MessageBoard.displayMsg('Password is required');
      var notification = alertify.notify('Password is required', 'error', 5, function() {
        console.log('dismissed');
      });
      setTimeout(() => {
        MessageBoard.displayMsg('');
      }, 4000);
    }

    const credentials = {
      email,
      password,
    };

    fetch(loginUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
      body: JSON.stringify(credentials),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 422) {
          setTimeout(() => {
            dome2.disabled = false;
            dome2.innerHTML = 'LOG IN';
          }, 4000);
          MessageBoard.displayMsg(data.error);
          var notification = alertify.notify(data.error, 'error', 5, function() {
            console.log('dismissed');
          });
        } else if (data.status === 200) {
          setTimeout(() => {
            dome2.disabled = false;
            dome2.innerHTML = 'LOG IN';
          }, 4000);
          localStorage.setItem('userToken', JSON.stringify(data.data[0]));
          localStorage.login == 'true';
          localStorage.setItem('userToken', JSON.stringify(data.data[0]));
          console.log(data.data[0].user);

          if (
            data.data[0].user.roles != 'Individual Driver' &&
            data.data[0].user.isAdmin == false
          ) {
            window.location.href = user_dashpane;
          } else if (
            data.data[0].user.roles == 'Individual Driver' &&
            data.data[0].user.isAdmin == false
          ) {
            window.location.href = driver_dashpane;
          } else if (data.data[0].user.isAdmin == true) {
            window.location.href = admin_url;
          } else {
            var notification = alertify.notify('Failed login', 'error', 5, function() {
              console.log('dismissed');
            });
            setTimeout(() => {
              dome2.disabled = false;
              dome2.innerHTML = 'LOG IN';
            }, 4000);
          }
        } else if (data.status == 409) {
          MessageBoard.displayMsg(data.error);
          var notification = alertify.notify(data.error, 'error', 5, function() {
            console.log('dismissed');
          });
          setTimeout(() => {
            dome2.disabled = false;
            dome2.innerHTML = 'LOG IN';
          }, 4000);
        } else if (data.status == 404) {
          MessageBoard.displayMsg(data.error);
          var notification = alertify.notify(data.error, 'error', 5, function() {
            console.log('dismissed');
          });
          setTimeout(() => {
            dome2.disabled = false;
            dome2.innerHTML = 'LOG IN';
          }, 4000);
        } else if (data.status == 400) {
          console.log(data);
          MessageBoard.displayMsg('credentials entered could not be found.');
          var notification = alertify.notify(
            'credentials entered could not be found.',
            'error',
            5,
            function() {
              console.log('dismissed');
            },
          );
          setTimeout(() => {
            dome2.disabled = false;
            dome2.innerHTML = 'LOG IN';
          }, 4000);
          // MessageBoard.displayMsg(data.error );
          //Router.redirect('./');
        }
      })
      .catch(error => {
        setTimeout(() => {
          dome2.disabled = false;
          dome2.innerHTML = 'LOG IN';
        }, 4000);
        //throw error;
        MessageBoard.displayMsg(error + ' some error occured');
      });
  }

  static passwordReset() {
    if (document.getElementById('recovery-drivers')) {
      resetPwUrl = activeUrl + '/auth/drivers-forgot_password';
    } //drivers-forgot_password

    //alert(resetPwUrl)

    let email = document.getElementById('email').value;
    const emailForm = document.getElementById('e-form');
    const successAnimationStart = document.getElementById('success-mark');

    if (!emailRegularExpression.test(email)) {
      MessageBoard.displayMsg('Email is invalid.');
      var notification = alertify.notify('Email is invalid.', 'error', 5, function() {
        console.log('dismissed');
      });

      return false;
    }

    const credentials = {
      email,
    };

    fetch(resetPwUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
      body: JSON.stringify(credentials),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        //alert(data)
        if (data.status) {
          emailForm.style.display = 'none';
          setTimeout(() => {
            MessageBoard.displayMsg('Password reset mail sent.');
          }, 6000);
          var notification = alertify.notify('Password reset mail sent.', 'error', 5, function() {
            console.log('dismissed');
          });

          //setTimeout(()=>{  MessageBoard.displayMsg('');},9000)
          setTimeout(function() {
            successAnimationStart.style.display = 'block';
          }, 5000);
        } else {
          MessageBoard.displayMsg('Enter your email');
          setTimeout(() => {
            MessageBoard.displayMsg('');
          }, 9000);
          var notification = alertify.notify('Enter your email', 'error', 5, function() {
            console.log('dismissed');
          });

          // alert(error)
        }
      })
      .catch(error => {
        //alert(error + "here")
        throw error;
      });
  }
}

export default ApiLoginService;
