/* eslint-disable no-plusplus */
'use strict';
import ApiBot from '../backend/services/postgres_api_bot';
import Router from './Router';

class WebsitePasswordReset {
  
  attachEvents() {
    if (document.getElementById('pass_forgot_page')) {
      this.passwordForgotEvents();
    }
  }




 
  passwordForgotEvents() {
   if(document.getElementById('reset_btn')){
      let resetBtn = document.getElementById('reset_btn');
      let that = this;
      resetBtn.onclick = function(event) {
        event.preventDefault();
        that.passwordReset(event);
      };
    }
  }
  
  passwordReset(event) {
    let that = this;
    event.preventDefault();
    ApiBot.passwordReset();
  }
 
}

export default WebsitePasswordReset;
