'use strict';
import Router from './Router';
import MessageBoard from './MessageBoard';
import ApiBot from '../backend/services/postgres_api_bot';

class WebsiteSignUp {
  constructor() {}
  attachEvents() {
    let that = this;

    // this.upgooSign()


    //only if this btn exists can user signup
    if (document.getElementById('signup_page')) {
      this.isLoggedIn();
      console.log("you are in sign up")
      let signUp = document.getElementById('signup_btn');
      signUp.addEventListener('click', e => {
        e.preventDefault();
        that.authorize(e);
      });

      $(".toggle-password").click(function() {

        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
          input.attr("type", "text");
        } else {
          input.attr("type", "password");
        }
      });


      const pwHint = document.getElementById('me-password');
    pwHint.addEventListener('focus', () =>{
      MessageBoard.displayMsg('Password should contain alphabets and characters or numbers');

       // setTimeout(()=>{  MessageBoard.displayMsg('');},6000)
    });


    }
  }



  upgooSign(){

    document.getElementById("goosign").addEventListener("click",(e)=>{
      e.preventDefault()
      let goosignUpUrl = "https://demouserapp.Goom Logistics.ng:12000/api/v1" + '/request/gmail/auth'

      fetch(goosignUpUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        mode: 'cors',
       
      })
        .then(response => response.json())
        .then(data=>{
          alert(data)
        })
      
    })

  }










  authorize(event) {
    event.preventDefault();
    ApiBot.authorizeUser();
  }

  isLoggedIn(){
    let user ;
    // if(JSON.parse(localStorage.getItem('userToken'))){
    //    user = JSON.parse(localStorage.getItem('userToken'));
    //    if(user){
    //      window.location.href="./dashboard"
    //    }
    // }
  }

}

export default WebsiteSignUp;
