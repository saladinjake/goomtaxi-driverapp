import ApiBotService from '../postgres_api_bot';
import ApiAdminBotService from './postgres_api_admin_bot';
import GateKeepersForAdmin from '../apiservices/helpers/whoisAdmin';
import getOnlineUrlConnection from '../apiservices/helpers/getOnlineUrlConnection';
import $ from 'jquery';
//import carsInfo from "./helpers/cars_info";
import Validator from "./helpers/validator";
import AuditTrail from './helpers/Logger';

import getApiUrl from '../apiservices/helpers/getOnlineUrlConnection'
let baseUrl =  getApiUrl();


import {
  addInspection,
  viewInspectionUpdate,
  RolesUpdateAction,
  RolesAddAction,
  RolesUpdate,
  viewPreviledges,

  addClickStartNew,
  setCarDetailsOnearning,
  setCarDetail,
  setEarningsDetail,
  autofill,
  update_value_checked_previledges,
  updateInspectionAction,
} from './globals.fn'

let activeUrl = getOnlineUrlConnection();

alertify.set('notifier','position', 'bottom-right');


import socketIOClient from "socket.io-client";
const ENDPOINT = "https://goomtaxibackendapi";

export default class AdminBash{
  static runEndpoints(){

    document.getElementById("linkstate").style.display="block"


      var menu = document.querySelector("#c-circle-nav");
  var toggle = document.querySelector("#c-circle-nav__toggle");
  var mask = document.createElement("div");
  var activeClass = "is-active";

  /**
   * Create mask
   */
  mask.classList.add("c-mask");
  document.body.appendChild(mask);

  /**
   * Listen for clicks on the toggle
   */
  toggle.addEventListener("click", function(e) {
    e.preventDefault();
    toggle.classList.contains(activeClass) ? deactivateMenu() : activateMenu();
  });

  /**
   * Listen for clicks on the mask, which should close the menu
   */
  mask.addEventListener("click", function() {
    deactivateMenu();
    console.log('click');
  });

  /**
   * Activate the menu
   */
  function activateMenu() {
    menu.classList.add(activeClass);
    toggle.classList.add(activeClass);
    mask.classList.add(activeClass);
  }

  /**
   * Deactivate the menu
   */
  function deactivateMenu() {
    menu.classList.remove(activeClass);
    toggle.classList.remove(activeClass);
    mask.classList.remove(activeClass);
  }


    GateKeepersForAdmin();



    if(document.getElementById("add-new")){
      document.getElementById("add-new").addEventListener("click",(e)=>{

        if(document.getElementById('user-id')){
          document.getElementById('user-id').innerHTML="";
        }


        document.getElementById("first-view").style.display="none";


        const loader = document.getElementById("loader");
          // loader.style.display = 'block';
          //  loader.style.zIndex="9999999";


        setTimeout(()=>{
          loader.style.display = 'none';
          document.getElementById("second-view").style.display="block";
        },2000)


      })
   }
   let app =document.getElementById('app')
   // app.style.display="none"
   app.style.display="block"
    ApiAdminBotService.goBack()
    const loader = document.getElementById("loader");
     // loader.style.display = 'block';
     // loader.style.zIndex="9999999";

     // document.getElementsByClassName('loader')[0].style.display="block"

    window.addEventListener('load', (event) => {
      //event.preventDefault();
      const user = JSON.parse(localStorage.getItem('userToken'));
      if (!user) {
        window.location.href = '/';
      }

      if(user.user.roles!='user'){


                if(document.getElementById("balance")){
                      document.getElementById("balance").style.display="none"
                }

                if(document.getElementById("new-balance")){
                document.getElementById("new-balance").style.display="none"
              }


          }else{
                    if(document.getElementById("balance")){
                      document.getElementById("balance").style.display="block"
                }

                if(document.getElementById("new-balance")){
                document.getElementById("new-balance").style.display="block"
                 }

          }
      const urls = [
           activeUrl + `/admin-users`,
         activeUrl + `/admin-admins`,
         activeUrl+ `/admin-drivers`,
         activeUrl+ `/admin-partners`,
         activeUrl+`/admin-profile/`+ user.user._id,
         activeUrl+ `/admin-plan-package`,
         activeUrl+ `/admin-plan-package-corporate`,
         activeUrl+`/admin-sos`,
         activeUrl+ `/admin-tickets`,
         activeUrl+`/admin-faqs`,
         activeUrl+`/admin-settings-google`,
         activeUrl+ `/admin-settings-facebook`,
         activeUrl+`/admin-settings-paystack`,
         activeUrl+`/admin-settings-email`,
         activeUrl+`/admin-settings-bucket`,
         activeUrl+`/admin-settings-instagram`,
         activeUrl+`/admin-cars-mgt`,
         activeUrl+ `/admin-itineraries`,
         activeUrl+ `/admin-users-plan`,


         activeUrl+ `/admin-sales-today`,
         activeUrl+ `/payment-history`,
         activeUrl+ `/payment-payments`,
         activeUrl+ `/payment-quotations`,
         activeUrl+ `/get-cars-info`,
          activeUrl+`/admin-inspection`,
         activeUrl+`/admin-drive-test`,
          activeUrl+`/admin-previledges`,
         activeUrl+ `/admin-sales-yesterday`,
         activeUrl+ `/admin-sales-lastweek`,
         activeUrl+ `/admin-users-month-ago`,
         activeUrl+`/get-trails`,
         activeUrl+`/get-all-notification`,
         activeUrl+ '/profile-admin-rights/update/'+ user.user.email+ '/permission/'+ user.user.roles,
         activeUrl+ '/get-all-cars-repair-request',
         activeUrl+ '/admin-earnings',
         activeUrl+ '/admin-get-revoke-details',











      ];

       const page_id_attribute = document.getElementById("admin").getAttribute("data-pageid")
           const pageId=page_id_attribute;
           console.log("my id:"+ pageId)


      const promises = urls.map(url => fetch(url, {
        method: 'GET',
            headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
              'x-access-token': user.token,
           },
           mode: 'cors',
      }).then(response => response.json()));

      Promise.all(promises).then((datas) => {


         document.getElementById('gtd').style.display="none"
         document.querySelector("#gtd").style.visibility = "visible";
        document.querySelector("#gtd").style.opacity = 1;

         //first set the right previledges
         let previledgesRight = datas[32].data[0].userInfo;



         localStorage.setItem('previledges', JSON.stringify(previledgesRight))

         console.log(datas)

         // setTimeout(()=>{
          loader.style.display = 'none';
          document.getElementById('gtd').style.display="block"

          switch(pageId){
           //switches for views
          case "admin-dashboard":
             ApiAdminBotService.runDashboard(
              datas[0].data[0].users,
              datas[3].data[0].partners,
              datas[2].data[0].drivers,
              datas[16].data[0].carsAvailable,
              datas[8].data[0].intervention,
              datas[17].data[0].itineraries,
              //today
              datas[19].data[0].todaySales,

              //yesterday
              datas[27].data[0].yesterdaysSales,

              //lastweek
              datas[28].data.weeklySales,

              //lastMonth

               datas[29].data.lastMonth,
              datas[31].data[0].allNotification
               //[]
              );
             app.style.display="block"

             break;
          case "admin-users":



            ApiAdminBotService.runAdminUsers(datas[0].data[0].users,previledgesRight);
              app.style.display="block"
            break;
          case "admin-admins":
            ApiAdminBotService.runAdminAdmins(datas[1].data[0].admins,previledgesRight)
              app.style.display="block"
            break;
          case "admin-drivers":
            ApiAdminBotService.runAdminDrivers(datas[2].data[0].drivers,datas[16].data[0].carsAvailable,previledgesRight)
              app.style.display="block"
            break;
          case "admin-partners":
            ApiAdminBotService.runAdminPartners(datas[3].data[0].partners,previledgesRight)
              app.style.display="block"
            break;
          case "admin-profile":
            ApiAdminBotService.runAdminProfile(datas[4].data[0].profile)
              app.style.display="block"
            break;
          case "admin-plan-package":
            ApiAdminBotService.runPlanPackage(datas[5].data[0].individualPlans, datas[6].data[0].corporatePlans ,previledgesRight);
              app.style.display="block"
            break;
          case "admin-sos":
          console.log(datas[7].data[0].redFlag)
           ApiAdminBotService.runAdminSOS(datas[7].data[0].redFlag,previledgesRight);
             app.style.display="block"
           break;
          case "admin-tickets":
           ApiAdminBotService.runAdminTickets(datas[8].data[0].intervention, datas[1].data[0].admins,datas[0].data[0].users,previledgesRight);
             app.style.display="block"
            break;

          case "admin-enquiries":
           let ticket = datas[8].data[0].intervention;
           const enquiries = ticket.filter((item)=>item.category==="General Enquiries")
           console.log("here in enquiries"+ enquiries)
           ApiAdminBotService.runAdminTickets(enquiries, datas[1].data[0].admins,datas[0].data[0].users,previledgesRight);
             app.style.display="block"
            break;


          case "admin-feedback":
           let ticketFeed = datas[8].data[0].intervention;
           const feedback = ticketFeed.filter((item)=>item.category==="Feedback")
           ApiAdminBotService.runAdminTickets(feedback, datas[1].data[0].admins,datas[0].data[0].users,previledgesRight);
             app.style.display="block"

           break;

           case "admin-technical-support":
            let ticketTech =  datas[8].data[0].intervention;
                  const technicalSupport = ticketTech.filter((item)=>item.category=="Feedback");
            ApiAdminBotService.runAdminTickets(technicalSupport, datas[1].data[0].admins,datas[0].data[0].users,previledgesRight);
              app.style.display="block"
            break;
          case "admin-faqs":
            ApiAdminBotService.runAdminFaqs(datas[9].data[0].faqs,previledgesRight);
              app.style.display="block"
            break;

          case "admin-settings-google":
            ApiAdminBotService.runSettings(datas[10].data[0].googleSettings,previledgesRight);
              app.style.display="block"
            break;
                case "admin-settings-facebook":
            ApiAdminBotService.runSettings(datas[11].data[0].facebookSettings,previledgesRight);
              app.style.display="block"
            break;

                case "admin-settings-paystack":
            ApiAdminBotService.runSettings(datas[12].data[0].paystackSettings,previledgesRight);
              app.style.display="block"
            break;
          case "admin-settings-email":
            ApiAdminBotService.runSettings(datas[13].data[0].sendgridSettings,previledgesRight);
              app.style.display="block"
            break;

                case "admin-settings-bucket":
            ApiAdminBotService.runSettings(datas[14].data[0].awsSettings,previledgesRight);
              app.style.display="block"
            break;

                case "admin-settings-instagram":
            ApiAdminBotService.runSettings(datas[15].data[0].instagramSettings,previledgesRight);
              app.style.display="block"
            break;

          case "admin-cars-mgt" :
           ApiAdminBotService.runAdminCarsMgt(datas[16].data[0].carsAvailable,
            datas[23].data[0].carInfo,
            datas[2].data[0].drivers,
             datas[3].data[0].partners,
            previledgesRight

            )
             app.style.display="block"
           break;
          case "admin-bookings" :
           ApiAdminBotService.runAdminPlans( datas[18].data[0].usersPlan,previledgesRight)
             app.style.display="block"
           break;

          case "plan-detail-admin":
            ApiAdminBotService.runAdminPlansDetail(datas[18].data[0].usersPlan,previledgesRight);
              app.style.display="block"
             break;

          case "plan-manual-bookings-admin":
            ApiAdminBotService.runAdminPlansManualBookings(datas[16].data[0].carsAvailable, datas[0].data[0].users,previledgesRight);
              app.style.display="block"
             break;

          case "admin-itineraries":
                   ApiAdminBotService.runAdminItineraries(datas[17].data[0].itineraries, datas[2].data[0].drivers,previledgesRight)
                     app.style.display="block"
             break;
          case "admin-wallets":
           ApiAdminBotService.runAdminWallets(datas[20].data[0].wallets,previledgesRight)
             app.style.display="block"
             break;
          case "admin-payments":
           ApiAdminBotService.runAdminPayments(datas[21].data[0].payments,previledgesRight)
             app.style.display="block"
             break;
          case "admin-quotations":
           ApiAdminBotService.runAdminQuotations(datas[22].data[0].quotations,previledgesRight)
             app.style.display="block"
            break;
          case "admin-redo-inspection":
           ApiAdminBotService.runAdminInspection(datas[24].data[0].inspections,
            datas[23].data[0].carInfo,
            datas[2].data[0].drivers,
             datas[3].data[0].partners,
            previledgesRight
           ) //24
             app.style.display="block"
           break;
          case "admin-inspection-add":
           ApiAdminBotService.runAdminInspectionAdd( 'add-inspection' , datas[0].data[0].users, datas[3].data[0].partners,previledgesRight) //24
             app.style.display="block"
           break;
           case "admin-drive-test-add":
           ApiAdminBotService.runAdminDriveTestAdd('add-drive-test', datas[0].data[0].users, datas[3].data[0].partners,previledgesRight) //24
             app.style.display="block"
           break;
          case "admin-drive-test":
           ApiAdminBotService.runAdminDriveTest(datas[25].data[0].testDrive, datas[0].data[0].users,previledgesRight)//25
             app.style.display="block"
           break;
         case "admin-previledges":
           ApiAdminBotService.runAdminPreviledges(datas[26].data[0].previledges,previledgesRight)
             app.style.display="block"
           break;
        case "admin-logs":
           ApiAdminBotService.runAdminActivityTrail(datas[30].data[0].audit)
             app.style.display="block"
           break;
        case "admin-notification":
           ApiAdminBotService.runAdminNotification(datas[31].data[0].allNotification)
             app.style.display="block"
           break;
        case "admin-repairs":
           ApiAdminBotService.runAdminRepairs(datas[33].data[0].mech)
             app.style.display="block"
           break;
        case "admin-earnings":
           ApiAdminBotService.runAdminPartnersEarnings(datas[34].data[0].earnings,datas[3].data[0].partners,datas[16].data[0].carsAvailable,previledgesRight)
             app.style.display="block"
           break;
        case "admin-retrievals":
           ApiAdminBotService.runAdminCarRetrieval(datas[16].data[0].carsAvailable,
            datas[16].data[0].carsAvailable,
            datas[2].data[0].drivers,
             datas[3].data[0].partners,
            previledgesRight
           )
             app.style.display="block"
           break;
        case "view-retrievals":
          ApiAdminBotService.runAdminCarRetrievalEdit(datas[35].data[0].carsNotInUse,
            datas[16].data[0].carsAvailable,
            datas[2].data[0].drivers,
             datas[3].data[0].partners,
            previledgesRight
            )
          break;
      case "admin-map":
          app.style.display="block"

          let map
let markers = new Map()

  document.getElementById('gmaps-types').style.opacity=1;
  document.getElementById('gmaps-types').style.visibility="visible";
  document.getElementById('gmaps-types').style.display="block"
  setTimeout(()=>{

    navigator.geolocation.getCurrentPosition(pos => {
    const { latitude: lat, longitude: lng } = pos.coords
    map = new google.maps.Map(document.getElementById('gmaps-types'), {
      center: { lat, lng },
      zoom: 12
    })
  }, err => {
    console.error(err)
  })

   let  socket = socketIOClient(
      // ENDPOINT,
     "https://goomtaxibackendapi",

      // {secure: true}
        {
            secure: true // for SSL
        }
     );



  socket.on('locationsUpdate', locations => {
    const markerToDelete = new Set()
    markers.forEach((marker,id) =>{
      marker.setMap(null)
      markers.delete(id)
    })
    locations.forEach(([id, position]) => {

     if(markers.has(id)){

     }
       if((position.lat) && (position.lng)){
          const marker = new google.maps.Marker({
          position,
          map,
          title:id
        })

        markers.set(id,marker)
       }




    })
  })



  setInterval(() => {
    socket.emit('requestLocations')
  }, 2000)

  },5000)






          break;
      default:
            app.style.display="block"
             window.location.href='./admin-dashboard'
             // ApiAdminBotService.runDashboard(datas[0].data[0].users,
              // datas[3].data[0].partners,
              // datas[2].data[0].drivers,
              // datas[16].data[0].carsAvailable,
              // datas[8].data[0].intervention,
              // datas[17].data[0].itineraries,
              // //today
              // datas[19].data[0].todaySales,

              //yesterday

              //lastweek

              //lastMonth);
              break;


        }


         // },7000)

      }).catch((error) => {
        throw error;
      });
  });
  }
}
