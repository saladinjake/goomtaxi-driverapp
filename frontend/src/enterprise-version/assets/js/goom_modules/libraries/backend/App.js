'use strict';
// import '../../../public/css/mainstyles_backend.css';
import backendControllers from './Bootstrap';
const DEPLOY_BACK_URLS = "http://localhost:12000/api/v1"


const frontend = false;
const backend = true;
class BackendApp {
  constructor() {
    this.classes = backendControllers;

  }

  bootstrap() {

    const keys = Object.values(this.classes).map(function(item) {
      let classInstance = item;
      classInstance.attachEvents();
    });
  }

  run() {
     // $('#gtd').animate({'margin-top': '-25px'}, 3000);
     this.isLoggedIn();
    this.bootstrap();
    this.logOutEvents();

  }


  logOutEvents() {
    // eslint-disable-next-line no-plusplus

    if (document.getElementById('logOut')) {

      document.body.addEventListener("click", (e)=>{
         if(e.target.getAttribute("id") =="logOut" ){
           e.preventDefault();
           console.log("logging out")
           localStorage.removeItem("userToken");
           localStorage.clear();
           //localStorage.clearItems();
            window.location.href="/";

         }

      });


    }
  }

  isLoggedIn(){

    window.addEventListener('load', (event) => {

   let  user = localStorage.getItem('userToken');
   if( (!document.getElementById('signup_page') && !document.getElementById('loginpage') && !document.getElementById('pass_forgot_page') ) && !localStorage.getItem('userToken')){

        window.location.href="/";
    }
    else if( (!document.getElementById('loginpage') ) && !localStorage.getItem('userToken')){

       // window.location.href="index.html";
    }else if( (!document.getElementById('pass_forgot_page') || !document.getElementById('loginpage') || !document.getElementById('signup_page') ) && localStorage.getItem('userToken')){
      user = localStorage.getItem('userToken');
      var regExp = /\{([^)]+)\}/;
      var matches = regExp.exec(user);
      if(user.indexOf('id')){
        console.log("yes ")
        if(JSON.parse(user)){
           user  =JSON.parse(user) ;
            if(!user.token && !document.getElementById('loginpage') && !document.getElementById('signup_page')){
              console.log("yes 2")

                window.location.href="./";
             }else if(user.token && (document.getElementById('signup_page') || document.getElementById('loginpage') )){
              console.log("yes 3")

              if(user.user.isAdmin===true){
                window.location.href="./admin-dashboard"
              }else if(user.user.isAdmin===false){
               window.location.href="./dashboard"
              }
              window.location.href="./"



            }
        }
      }else{
        window.location.href="/"
      }



    }

  });


    // window.onbeforeunload = function () {
    //    localStorage.clear();
    //    //localStorage.clearItems()
    // };


    //finally check if token has expired then log user out
    if(localStorage.getItem('userToken')){
        const user = JSON.parse(localStorage.getItem('userToken'));

        let recordUrl;

// DEPLOY_BACK_URL=http://167.71.131.172:12000/api/v1
          recordUrl = DEPLOY_BACK_URLS+ `/admin-users`; //this url is default test url for checking autorization via jwt token to see if user is still available on local storage
          //but inactive

        console.log('specific url: ' + recordUrl);

        fetch(recordUrl, {
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
            if (data.status === 403) { //if it falls back that user is unauthorized to view this page
              localStorage.clear();
               window.location.href="/";
            }
          })
          .catch(error => {
            throw error;
          });

    }


  }

}

export default BackendApp;
