/* eslint-disable func-names */

//to do use higher ordder func to ensure user
'use strict';
import FrontEndApp from './App';

import BackendApp from './backend/App';

// turned off from stand alone and then imported in the react App.js

// this project was initially a js es6 code base ,
//partly transformed to react with vanilla js under the hood

// const loadingAction = () => {
//   document.onreadystatechange = function() {

//             if (document.readyState !== "complete") {
//                 document.querySelector("#gtd").style.visibility = "hidden";
//                 document.querySelector("#gtd").style.opacity = 0;
//                 document.querySelector("#loader").style.visibility = "visible";
//             } else {
//                 document.querySelector("#loader").style.display = "none";
//                 document.querySelector("#gtd").style.visibility = "visible";
//                 document.querySelector("#gtd").style.opacity = 1;

//                 document.body.addEventListener('click', (e) =>{
//                    if(e.target.getAttribute("href")){
//                       window.location.replace(e.target.getAttribute("href"))

//                    }
//                 })
//             }
//   }

//  }

//  loadingAction();

// window.addEventListener('load', (event) => {
//   event.preventDefault();
//   if (!document.getElementById('admin')) {
//     console.log('frontend');
//     new FrontEndApp().run();
//   } else {
//     console.log('backend');
//     //new BackendApp().run();
//   }
// });
