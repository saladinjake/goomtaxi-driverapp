/* eslint-disable no-plusplus */
'use strict';
import ApiBot from '../backend/services/postgres_api_bot';
import Router from './Router';
import $ from 'jquery';

const home_url = '/';
class WebsiteLogin {
  constructor() {}
  attachEvents() {
    this.isLoggedIn();
    this.logOutEvents();
    if (document.getElementById('loginpage')) {
      //this.isLoggedIn();

      $('.toggle-password').click(function() {
        $(this).toggleClass('fa-eye fa-eye-slash');
        var input = $($(this).attr('toggle'));
        if (input.attr('type') == 'password') {
          input.attr('type', 'text');
        } else {
          input.attr('type', 'password');
        }
      });

      this.switchFormEvents();
      this.loginEvents();

      //     $(function() {
      //   var $progress = $('#progress');
      //   $(document).ajaxStart(function() {
      //     //only add progress bar if not added yet.
      //     if ($progress.length === 0) {
      //       $progress = $('<div><dt/><dd/></div>').attr('id', 'progress');
      //       $("header").append($progress);
      //     }
      //     $progress.width((50 + Math.random() * 30) + "%");
      //   });

      //   $(document).ajaxComplete(function() {
      //     //End loading animation
      //     $progress.width("100%").delay(200).fadeOut(400, function() {
      //       $progress.width("0%").delay(200).show();
      //     });
      //   });

      // });
    }
  }
  switchFormEvents() {}
  loginEvents() {
    if (document.getElementById('login_btn')) {
      let loginBtn = document.getElementById('login_btn');
      let that = this;
      loginBtn.onclick = function(event) {
        event.preventDefault();
        that.authenticate(event);
      };
    }
  }
  authenticate(event) {
    let that = this;
    event.preventDefault();
    ApiBot.authenticateUser();
  }

  static hasClass(el, classname) {
    return el.classList.contains(classname);
  }
  logOutEvents() {
    // eslint-disable-next-line no-plusplus

    if (document.getElementById('logOut')) {
      document.body.addEventListener('click', e => {
        if (e.target.getAttribute('id') == 'logOut') {
          e.preventDefault();
          console.log('logging out');
          localStorage.removeItem('userToken');
          localStorage.clear();
          //localStorage.clearItems();
          window.location.href = '/';
        }
      });
    }
  }

  isLoggedIn() {
    window.addEventListener('load', event => {
      console.log('this has been called to check');
      let user = localStorage.getItem('userToken');

      if (
        !document.getElementById('signup_page') &&
        !document.getElementById('loginpage') &&
        !document.getElementById('pass_forgot_page') &&
        !localStorage.getItem('userToken')
      ) {
        window.location.href = '/';
      } else if (!document.getElementById('loginpage') && !localStorage.getItem('userToken')) {
        // window.location.href="index.html";
      } else if (
        (!document.getElementById('pass_forgot_page') ||
          !document.getElementById('loginpage') ||
          !document.getElementById('signup_page')) &&
        localStorage.getItem('userToken')
      ) {
        user = localStorage.getItem('userToken');
        var regExp = /\{([^)]+)\}/;
        var matches = regExp.exec(user);
        if (user.indexOf('id')) {
          console.log('yes ');
          if (JSON.parse(user)) {
            user = JSON.parse(user);
            if (
              !user.token &&
              !document.getElementById('loginpage') &&
              !document.getElementById('signup_page')
            ) {
              console.log('yes 2');

              window.location.href = './';
            } else if (
              user.token &&
              (document.getElementById('signup_page') || document.getElementById('loginpage'))
            ) {
              window.location.href = './dashboard';
            }
          }
        } else {
          window.location.href = '/';
        }
      }
    });

    //finally check if token has expired then log user out
    if (localStorage.getItem('userToken')) {
    }
  }
}

export default WebsiteLogin;
