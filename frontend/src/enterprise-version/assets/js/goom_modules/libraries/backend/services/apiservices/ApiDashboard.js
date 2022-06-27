'use strict';

import FetchPromiseApi from './helpers/FetchPromiseApi';
import Router from '../../../core/Router';
import GateKeepersForUser from './helpers/whois';
import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';
import MessageBoard from '../../../core/MessageBoard';
import $ from "jquery"

// let activeUrl = getOnlineUrlConnection();
let baseUrl = getOnlineUrlConnection();

let socket;
let detinationMarker;
let startMarker;

import socketIOClient from "socket.io-client";
const ENDPOINT = "https://goomtaxibackendapi";

var element ;
var myStorage = localStorage;






var sortBy = (function () {
  var toString = Object.prototype.toString,
      // default parser function
      parse = function (x) { return x; },
      // gets the item to be sorted
      getItem = function (x) {
        var isObject = x != null && typeof x === "object";
        var isProp = isObject && this.prop in x;
        return this.parser(isProp ? x[this.prop] : x);
      };

  /**
   * Sorts an array of elements.
   *
   * @param  {Array} array: the collection to sort
   * @param  {Object} cfg: the configuration options
   * @property {String}   cfg.prop: property name (if it is an Array of objects)
   * @property {Boolean}  cfg.desc: determines whether the sort is descending
   * @property {Function} cfg.parser: function to parse the items to expected type
   * @return {Array}
   */
  return function sortby (array, cfg) {
    if (!(array instanceof Array && array.length)) return [];
    if (toString.call(cfg) !== "[object Object]") cfg = {};
    if (typeof cfg.parser !== "function") cfg.parser = parse;
    cfg.desc = !!cfg.desc ? -1 : 1;
    return array.sort(function (a, b) {
      a = getItem.call(cfg, a);
      b = getItem.call(cfg, b);
      return cfg.desc * (a < b ? -1 : +(a > b));
    });
  };

}());





const loadQuotation = (url) =>{

  let postUrl = url + "/" + localStorage.getItem("setPlan") + '/user'
  let user = JSON.parse(localStorage.getItem('userToken'))
  fetch(postUrl, {
      method: 'GET',
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {

        //  console.log(data)
        if (data.status === 200) {

          const records = data.data[0].quote;
          const { status, amount, email, username, phone_number, plan_id, quotation_id } = records;
          //planned-quotation


          let tablebody2 = document.getElementById('planned-quotation');

                      let className='';
                      let eachRecord=``;
                     records.map((item, i) => {





                        if(item.status=="Unpaid"){
                             className=`label-table label-danger`;
                             localStorage.setItem('paymentOptions',
                              JSON.stringify({
                                amount: item.amount,
                                reference: item.reference,
                                quotation_id: item.quotation_id,
                                plan_id: item.plan_id,

                              }))
                             //item.status=`${item.status}`;
                          }else if(item.status=="Paid"){
                            className=`label-table  label-success`
                            //item.status= `<span class="label ">${item.status}</span>`;
                          }else{
                            className =`label-table label-warning`;

                            //item.status=`<span class="label ">${item.status}</span>`;
                          }
                          eachRecord = `
                          <tr id="${i}">
                                <td class="">${formatDate(new Date(item.created_at))} </td>
                          <td class="">${item.plan_id}</td>
                          <td class="">${item.quotation_id} </td>
                          <td class="">${item.amount}</td>
                           <td class="">${item.reference}</td>

                            <td class=""><span class="label ${className}">${item.status}</span></td>

                         </tr>`;
                         tablebody2.insertAdjacentHTML('beforeend', eachRecord);
                      });

        }
      })
      .catch(error => {
        throw error;
      });
}

window.setItem = (t) =>{
  let dataRequired = JSON.parse(localStorage.getItem('paymentOptions'))
  //alert(dataRequired.amount)
  let paymentDetail = {
    amount:t.dataset.price || dataRequired.amount,
    reference: t.dataset.reference || dataRequired.reference,
    email: t.dataset.email,
    quotation_id: t.dataset.quotation_id || dataRequired.quotation_id,
    plan_id: t.dataset.plan_id || dataRequired.plan_id,
    phone: t.dataset.phone,
    firstname: t.dataset.firstname,
    balance : t.dataset.userbalance
  };
 localStorage.setItem('quoteToPay', JSON.stringify(paymentDetail))
}

//console.log(/^[a-zA-Z]'?([a-zA-Z]|\.| |-){4,}$/.test('solomon\'s'), 'from dash')
let activeUrl = getOnlineUrlConnection();
var executed = false;

 var current_page = 1;
    var records_per_page = 6;

let itinerary = []
let plans = [];

var InforObj = [];


window.setClickedItinerary = (o) =>{
  // console.log("hello clicked..")
  if(o.dataset.status=="ongoing"){

       o.dataset.status=`<span class="label label-table label-danger">${o.dataset.status}</span>`;
  }else if(o.dataset.status=="completed"){

     o.dataset.status= `<span class="label label-table label-success">${o.dataset.status}</span>`;
  }else{

    o.dataset.status=`<span class="label label-table label-warning">${o.dataset.status}</span>`;
  }
  //document.getElementById("itin_ids").innerHTML= o.dataset.id;
  //document.getElementById("itin_status").innerHTML= o.dataset.status;
  //pickupti

  if(o.dataset.drive_option=="I would like to drive myself"){
    document.getElementById('start').disable= false
  }else{
     document.getElementById('start').disable= true
    document.getElementById('start').innerHTML='Track Driver'
    // document.getElementById('start').style.opacity=0;
    // document.getElementById('start').style.visibility='hidden'
  }




  document.getElementById("start_date").value= o.dataset.start_time;
  document.getElementById("start_time").value = o.dataset.end_time || '00:00:00'
  document.getElementById("startloc").value= o.dataset.start_location
  document.getElementById("destination").value= o.dataset.destination
  document.getElementById("near_driver").value= o.dataset.drive_option
  document.getElementById("travel_option").value= o.dataset.travel_option

  localStorage.setItem('startlocation',o.dataset.start_location);
  localStorage.setItem('endlocation',o.dataset.destination)
}



function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " //+ strTime;
}


function searchTable(tbId="#foo-table-input") {


  // $(document).ready(function(){

  // Search all columns
  $(tbId).keyup(function(){
    // Search Text
    var search = $(this).val();

    // Hide all table tbody rows
    $('table tbody tr').hide();

    // Count total search result
    var len = $('table tbody tr:not(.notfound) td:contains("'+search+'")').length;

    if(len > 0){
      // Searching text in columns and show match row
      $('table tbody tr:not(.notfound) td:contains("'+search+'")').each(function(){
        $(this).closest('tr').show();
      });
    }else{
      //$('.notfound').show();
    }

  });


// // });

// // Case-insensitive searching (Note - remove the below script for Case sensitive search )
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
   return function( elem ) {
     return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
   };
});
}




window.getPlanId = (item) =>{
  localStorage.setItem("setPlan",item.dataset.plan_id);
  //alert(item.dataset.plan_id)

  window.location.href ="./plan-detail"
}


let planClicked ={};
planClicked._id =0;




function dashboard() {
  GateKeepersForUser()

  $("#map-set").hide();


// $("#show").click(function(){
//   $("p").show();
// });
  // const loader = document.querySelector('#loader');
  // loader.style.display = 'block';

  // const mockupPreview = document.getElementById("mockup-loading")
  // mockupPreview.style.display="block"

  const gtd= document.getElementById("gtd");
  if(document.getElementById("dashboard") || document.getElementById('plan-detail')){



    const user = JSON.parse(localStorage.getItem('userToken'));
    //window.addEventListener('DOMContentLoaded', event => {
      // event.preventDefault();
    const urls = [activeUrl + `/itinerary/${user.user.email}/user`,
                    activeUrl + `/plans/${user.user.email}/user`,

    ];



     if(!executed){
       executed =true




      const promises = urls.map(url =>
        fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': user.token,
          },
           mode: 'cors',
        }).then(response => response.json()),
      );



      Promise.all(promises)
        .then(datas => {
            // console.log(datas)

            if(datas[0].error){
              // alert('no itin'+ datas[0].error)
              if(document.getElementById("dashboard")){
                if(document.getElementById('tableviewItins')){
                  document.getElementById('tableviewItins').style.display="none"
                  document.getElementById('svgItins').style.display="block"


                   //alert('no plans')
                   document.getElementById('tableviewPlans').style.display="none"
                   document.getElementById('svgPlans').style.display='block'
                }


              }
            }else {

              if(document.getElementById("dashboard")){

              document.getElementById('tableviewItins').style.display="block"
              document.getElementById('svgItins').style.display="none"
              document.getElementById('svgPlans').style.display='none'

            }


              itinerary =[...new Set(datas[0].data[0].itinerary)] || [];

              itinerary = sortBy(itinerary, {
                prop: "created_at",
                desc: true,
                parser: (d) => new Date(d)
              });

            plans = [...new Set(datas[1].data[0].plans)] ;

            plans = sortBy(plans, {
              prop: "created_at",
              desc: true,
              parser: (d) => new Date(d)
            })
            // console.log(JSON.stringify(plans)+"main plan")
            let currentPlan = plans[0] || []; // last plan user embarked on

            localStorage.setItem('currentUserPlan', currentPlan);



            // console.log(datas)
           if(document.getElementById("dashboard")){
              // document.getElementById("idvalue").innerHTML=currentPlan.plan_id
              document.getElementById("idvalue").style.display="none"

               document.getElementById("plan-detail").addEventListener("click", (e)=>{
               //magical
                 e.preventDefault();
                 //console.log("current plan id:"+ currentPlan._id)

                 //this redo
                // document.getElementById("plan-current-"+currentPlan._id).click();
             })


               document.getElementById("foo-table-input").addEventListener("keyup",(e)=>{
                 searchTable();
               })

               document.getElementById("foo-table-input2").addEventListener("keyup",(e)=>{
                 searchTable("#foo-table-input2");
               })



              let tablebody = document.getElementById('tablebody');
              let tablebody2 = document.getElementById('tablebody1');

              if( plans.length>0 && !datas[0].error){
                document.getElementById("plan-id").innerHTML = currentPlan.plan_name
              }else{
                document.getElementById("plan-id").innerHTML =   "No Plan";
              }

              // console.log(itinerary.length+ ":it length")


                    let eachRecord=``;
                      itinerary.map((item, i) => {
                        let className='label-success'


                        if(item.status=="Ongoing"){
                             className='label-danger';

                          }else if(item.status=="Completed" || item.status=="Paid"){

                            className= `label-success`;
                          }else{
                            className='label-warning';

                            //item.status=`<span class="label label-table label-warning">${item.status}</span>`;
                          }
                          eachRecord = `
                          <tr key={i}>
                          <td> ${formatDate(new Date(item.created_at))} </td>
                          <td>${item.plan_category}</td>
                          <td>${item.start_location} </td>
                          <td>${item.destination}</td>
                          <td> ${formatDate(new Date(item.start_time))}</td>
                          <td>${item.drive_option}</td>
                           <td>${item.no_hours}</td>
                            <td><span class="label label-table ${className}">${item.status}</span></td>
                     </tr>`;
                         tablebody.insertAdjacentHTML('beforeend', eachRecord);
                      });






                      // const tablebody = document.getElementById('tablebody');
                        // var paginatedItinerary = Paginator(itinerary);
                        let template2;
                        let classFor =``;
                        let planAction = ``;
                        plans.map((item, i) => {
                           //console.log(item)
                           if(item.has_updated=="Yes"){ //if quotation has been sent
                             //item.price= `Quote not yet sent.`;
                             //item.payment_status=`<span class="label label-table label-danger">${item.payment_status}</span>`;


                            if(item.status=="Paid"){
                                classFor =`label-success`;
                                item.price= `₦ ${item.price}`;
                                planAction = ` <td class="">
                                                       <a disabled href="#" class="table-action-btn  btn-purple tool"   data-tip="Visit the plan history page to view the detai of this completed plan." tabindex="1"><i class="glyphicon glyphicon-ok"></i></a>
                                                  </td>`
                            //item.payment_status= `<span class="label label-table label-success">${item.payment_status}</span>`+ `₦ ${item.price}`;
                            }else{
                               classFor =`label-danger`;
                             planAction = ` <td class="">
                                                   <a onclick="getPlanId(this)" id="plan-current-${item.plan_id}" href="#" data-plan_id="${item.plan_id}" data-id="${item.plan_id}" class="table-action-btn btn-custom btn-purple"><i class="md md-chevron-right"></i></a>
                                              </td>`
                            }
                          }else if(item.has_updated=="No"){
                            classFor="label-warning"
                            item.price= `Quote not yet sent.`;
                             //item.payment_status=`<span class="label label-table label-danger">${item.payment_status}</span>`;
                             planAction = ` <td class="">
                                                   <a id="plan-current-${item.plan_id}" onclick="getPlanId(this)" data-plan_id="${item.plan_id}" data-id="${item.plan_id}" href="#" class="table-action-btn btn-custom btn-purple"><i class="md md-chevron-right"></i></a>
                                              </td>`
                            //item.price= `₦ ${item.price}`;
                            //item.payment_status=`<span class="label label-table label-warning">${item.payment_status}</span>`;
                          }
                          template2 =`<tr>
                                        <td class=""><a onclick="getPlanId(this)" data-plan_id="${item.plan_id}" data-id="${item.plan_id}" href="plan-detail">${item.plan_id}</a></td>
                                            <td class="">   ${item.plan_name} </td>

                                            <td class="">${item.no_hours} hrs</td>
                                            <td class=""><span class="label ${classFor}">${item.status}</span></td>
                                            <td class=""><span class="label label-warning">Charges:</span>NGN  ${item.price}</td>
                                            <td class="">  ${planAction}</td>

                              </tr>`;
                              tablebody1.insertAdjacentHTML('beforeend', template2);
                      });





            }
            // loader.style.display="none"
            // mockupPreview.style.display="none"

               // cars attached to itineraries
            if(document.getElementById("plan-detail")){


                   const clickedId = localStorage.getItem("setPlan");

                   //alert(clickedId)
                 // console.log(clickedId)
                  planClicked = plans.find(item => item.plan_id==clickedId );
                  //console.log(JSON.stringify(planClicked) +"was this")
                  if(planClicked){
                    if(document.getElementById("plan_id")){
                      document.getElementById("plan_id").innerHTML=planClicked.plan_id || 'No Plan';
                    }
                    //


                  let carbounds = document.getElementById("car-chosen");
                  // var selectedCars = [...new Set(plans[0].cars_on_plan)];
                   var selectedCars = [...new Set(planClicked.cars_on_plan)];
                   //console.log(planClicked.cars_on_plan)
                  let car_record='';

                  console.log(selectedCars)

                  //console.log(JSON.stringify(selectedCars)+"all cars for this guy")
                  selectedCars.map((item, i) => {
                          car_record += `
                           <a href="#"><div class="col-sm-6  col-md-6 col-lg-4" >
                                <div class="widget-bg-color-icon card-box">
                                    <div class="bg-icon bg-icon-info pull-left" >
                                        <img src="${item.image|| item.images}" style="height:90px"/>
                                    </div>
                                    <div class="col-lg-6 pull-right text-right">
                                        <h3 class="text-dark"><b className="">${item.car_type} ${item.model} ${item.car_year}</b></h3>
                                        <p class="text-muted"></p>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div></a>`;

                });
                 if(document.getElementById("car-chosen")){
                    carbounds.innerHTML=car_record;
                 }



                  //itineries attached to plan
                  let planned_itineraries = document.getElementById("planned-itineraries");
                  var selectedItineraries = [...new Set(planClicked.itineries)];
                  //console.log(planClicked+"taken")


                  let className='';
                  let itineraries_record='';
                  // console.log(planClicked)
                  let payButton = ``;
                  selectedItineraries.map((item, i) => {
                           if(item.status=="Paid"){
                             className="label-success";
                             //item.status=`<span class="label label-table label-danger">${item.status}</span>`;

                             payButton=`<td class="">
                                    <a  href="#" onclick="setClickedItinerary(this)" data-driver="${planClicked.cars_on_plan[0].assigned_driver_name}" data-driver_email="${planClicked.cars_on_plan[0].assigned_driver_email}" data-driver-plate_num="${planClicked.cars_on_plan[0].assigned_driver_phone}" data-driver_loc="${planClicked.cars_on_plan[0].assigned_driver_location}" data-status="${item.status}"  data-id="${item.id}" data-travel_option="${item.travel_option}" data-pickup_time=${item.pickup_time} data-start_time="${formatDate(new Date(item.start_time))}" data-end_time="${item.end_time}"  data-start_location="${item.start_location}" data-destination="${item.destination}" data-drive_option="${item.drive_option}"  class="table-action-btn btn-custom btn-purple right-bar-toggle "><i class="md md-chevron-right"></i></a>
                                </td>`;


                          }else if(item.status=="Completed"){
                             className="label-success";
                            //item.status= `<span class="label label-table label-success">${item.status}</span>`;
                            payButton= `<td class="">
                                       <button class="btn btn-danger" disabled>Completed</button>
                            </td>`;
                          }else if(item.status=="Unpaid"){
                            className="label-warning";
                            if(document.getElementById('start')){
                              document.getElementById('start').disabled=true;
                            }

                            let msgBox =`<span class="label label-danger">
                                    Please make payments to start this plan .</span>`;

                            document.getElementById("itin-ids").innerHTML = msgBox;




                            payButton=`<td class="">
                                    <a id="click-me"  href="#" onclick="setClickedItinerary(this)" data-driver="${planClicked.cars_on_plan[0].assigned_driver_name}" data-driver_email="${planClicked.cars_on_plan[0].assigned_driver_email}" data-driver-plate_num="${planClicked.cars_on_plan[0].assigned_driver_phone}" data-driver_loc="${planClicked.cars_on_plan[0].assigned_driver_location}" data-status="${item.status}"  data-id="${item.id}" data-travel_option="${item.travel_option}" data-pickup_time=${item.pickup_time} data-start_time="${formatDate(new Date(item.start_time))}" data-end_time="${item.end_time}"  data-start_location="${item.start_location}" data-destination="${item.destination}" data-drive_option="${item.drive_option}"  class="table-action-btn btn-custom btn-purple right-bar-toggle " ><i class="md md-chevron-right"></i></a>
                                </td>`;

                            //   payButton= `<td class="">
                            //            <a onclick="setItem(this)"   data-amount="${item.amount}"    data-reference="${item.reference}"   data-quotation_id="${item.quotation_id}" data-plan_id="${item.plan_id}" data-userbalance="${user.user.balance}" data-phone="${user.user.phoneNumber}" data-firstname="${user.user.firstname}" data-email="${user.user.email}" href="./pay-action"  class="btn btn-primary" >Make payment</a>
                            // </td>`;




                          }else{

                            if(document.getElementById('start')){
                              document.getElementById('start').disabled=true;
                            }

                            let msgBox =`<span class="label label-danger">Quotations has not yet been sent .</span>`;


                            if(document.getElementById("itin-ids")){
                               document.getElementById("itin-ids").innerHTML = msgBox;
                            }



                            className="label-warning";
                             let driver='No Driver Assigned',



                            payButton=`<td class="">
                                    <a  href="#" onclick="setClickedItinerary(this)" data-driver="${planClicked.cars_on_plan[0].assigned_driver_name}" data-driver_email="${planClicked.cars_on_plan[0].assigned_driver_email}" data-driver-plate_num="${planClicked.cars_on_plan[0].assigned_driver_phone}" data-driver_loc="${planClicked.cars_on_plan[0].assigned_driver_location}" data-status="${item.status}"  data-id="${item.id}" data-travel_option="${item.travel_option}" data-pickup_time=${item.pickup_time} data-start_time="${formatDate(new Date(item.start_time))}" data-end_time="${item.end_time}"  data-start_location="${item.start_location}" data-destination="${item.destination}" data-drive_option="${item.drive_option}"  class="table-action-btn btn-custom btn-purple right-bar-toggle " ><i class="md md-chevron-right"></i></a>
                                </td>`;

                          }
                          itineraries_record = `
                          <tr id="${i}">
                                <td class="">${formatDate(new Date(item.start_time))} </td>
                                <td class="">${item.start_location}</td>
                                <td class="">${item.destination} </td>
                                <td class="">${item.drive_option}</td>

                                <td class=""><span class="label label-table ${className}">${item.status}</span></td>
                                ${payButton}


                         </tr>`;
                         if(planned_itineraries){
                            planned_itineraries.insertAdjacentHTML('beforeend', itineraries_record);
                         }

                      });




                  let tablebody2 = document.getElementById('tablebodyDetail');

                          let dataRequired = JSON.parse(localStorage.getItem('paymentOptions'))

                          // if(!dataRequired.reference){

                          //  dataRequired =  {
                          //     amount: '',
                          //     reference:'',
                          //     email: '',
                          //     quotation_id: '',
                          //     plan_id: '',
                          //     phone: '',
                          //     firstname: '',
                          //     balance : ''
                          //   };
                          // }

                        // var paginatedItinerary = Paginator(itinerary);
                        let template2;
                        let actionBtn =``;

                        [planClicked].map((item, i) => {
                           if(item.status=="Unpaid" ||  item.status=='Paid'){
                             //item.price=`<span class="label label-table label-danger">${item.payment_status}</span>`;
                             if(item.has_updated=='Yes'){

                                if(item.status=='Paid'){
                                    item.reference='CMT-REF-'+item.plan_id;
                                 item.quotation_id='CMT-QUT-'+item.plan_id;
                                 actionBtn = `<div class="">
                                       <a    data-amount="${item.price}"    data-reference="${item.reference}"   data-quotation_id="${item.quotation_id}" data-plan_id="${item.plan_id}" data-userbalance="${user.user.balance}" data-phone="${user.user.phoneNumber}" data-firstname="${user.user.firstname}" data-email="${user.user.email}" href="#"  class="label label-success" >Successful Payment</a>
                                 </div><h4>Payment Reference : ${item.reference}</h4>`
                               }else{
                                 item.reference='CMT-REF-'+item.plan_id;
                                 item.quotation_id='CMT-QUT-'+item.plan_id;
                                 actionBtn = `<div class="">
                                       <a onclick="setItem(this)"   data-amount="${item.price}"    data-reference="${item.reference}"   data-quotation_id="${item.quotation_id}" data-plan_id="${item.plan_id}" data-userbalance="${user.user.balance}" data-phone="${user.user.phoneNumber}" data-firstname="${user.user.firstname}" data-email="${user.user.email}" href="./pay-action"  class="btn btn-primary" >Make payment</a>
                                 </div>`

                               }
                             }else{
                                actionBtn = `<div class="">
                                       <a onclick="setItem(this)"   data-amount="0"    data-reference=""   data-quotation_id="" data-plan_id="" data-userbalance="${user.user.balance}" data-phone="${user.user.phoneNumber}" data-firstname="${user.user.firstname}" data-email="${user.user.email}" href="#" disabled  class="btn btn-primary" >Make payment</a>
                                 </div>`
                             }

                           }else{
                             item.price= ` ${item.price}`;
                            actionBtn =`<td class="">
                                        ${item.price}  <span class="label label-success">${item.status}</span>
                                        </td>`


                           }
                          template2 =`<tr>
                                        <div class=""><strong>Plan ID : <a href="plan-detail">${item.plan_id}</a></strong></div><br/>
                                            <div class=""><strong>Plan :   ${item.plan_name} </div><br/>

                                            <div class=""><strong>Plan Category : ${item.plan_category_name} </strong></div><br/>
                                            <div class=""><strong>Created Date : ${formatDate(new Date(item.created_at))} </strong></div><br/>
                                            ${actionBtn}

                                            <div style="display:none" class=""><strong>Duration: ${item.duration} hrs</strong></div><br/>




                              </tr>`;
                              if(tablebody2){
                                tablebody2.insertAdjacentHTML('beforeend', template2);
                              }

                      });

                       //quotation will show here... load quotation with the given plan id
                    let url = baseUrl+ '/quotations'
                    loadQuotation(url);



                    if(document.getElementById('start')){
                      document.getElementById('start').addEventListener('click',(e)=>{
                         e.preventDefault()

                         document.getElementById("plan-detail").style.display="none"
                         document.getElementById('mapout').style.opacity=1
                         document.getElementById('mapout').style.display="block"

                         //start trip detail right side view
                        initializeMap()
                      })
                    }






              }


            }


            }


        })
        .catch(error => {
            //loader.style.display = 'block';
            //mockupPreview.style.display="block"
            //gtd.style.display="none"

          throw error;
        });
    //});

    }



  }
}



var watchID;

 var pathArray = [];
var myPath;
var myDistance = 0;
var infoWindow;
var googleMap;

const positionOptions = {
    enableHighAccuracy: true,
      timeout: Infinity,
      maximumAge: 0
  }

function stopWatch() {
  window.navigator.geolocation.clearWatch(watchID);
}


function watchPosition() {
  watchID = window.navigator.geolocation.watchPosition(handleData, handleError, positionOptions);
}



// Get proper error message based on the code.
const getPositionErrorMessage = code => {
  switch (code) {
    case 1:
      return 'Permission denied.';
    case 2:
      return 'Position unavailable.';
    case 3:
      return 'Timeout reached.';
  }
}


function handleData(geoData) {
 let  latlng={lat:geoData.coords.latitude, lng:geoData.coords.longitude};

     var { latitude: lat, longitude: lng } = geoData.coords
      // console.log(socket.id,pos.coords)



      socket.emit('updateLocation', { lat, lng })



  // googleMap.setOptions({center:latLng});
}

function handleError(error) {
  document.querySelector("#error").innerHTML = "<b>" + error.message + "</b>";
  switch (error.code){
    case 1:
      document.querySelector("#error").innerHTML += ":<br>You blocked the request <br> or <br> You need to add 'https://' to this pen's URL";
      break;
    case 2:
      document.querySelector("#error").innerHTML += ":<br> The device has failed in getting your position";
      break;
    case 3:
      document.querySelector("#error").innerHTML += ":<br> You need to increase the timeout value in positionOptions";
      break;
  }
}


function buildPath(latlng,map) {
  //  console.log('working path')
    pathArray.push(latlng); // Add the click event's latLng object to array
    myPath.setPath(pathArray); // Create path based on the array of latLng objects
    myDistance = google.maps.geometry.spherical.computeLength(myPath.getPath()); // calculate length of the path
    infoWindow.setPosition(pathArray[0]); // Sets position of infoWindow to start of journey
    infoWindow.setContent("<b>Drivers Distance:</b><br>" + parseInt(myDistance)/1000 + " km"); // add HTML to infoWindow
    infoWindow.open(map); // show infoWindow on this map
}



window.initializeMap = (el) => {




  let markers = new Map()
  let InforObj = [];
  // Save the positions' history
  var path = [];


  let takenDriver = JSON.parse(localStorage.getItem('userToken'))




  var mapOptions = {
      center: { lat: 6.5244, lng: 3.3792},// 6.5244, 3.3792
      zoom: 8
  };

  var map = new google.maps.Map(document.getElementById('gmaps-types'),
    mapOptions);


  // Create an InfoWindow object to show the distance:
  infoWindow = new google.maps.InfoWindow();

  // This array be used to collect latLng objects for the path:
  pathArray = [];

  // Create the Polyline path object:
  myPath = new google.maps.Polyline( {map: map, strokeColor: "red"} );






   ////// Get drivers location


  //custom info driver marker
  let profiler = '';
  if(takenDriver.user.profile == ""){
    profiler = "https://Goom Logistics-bucket.s3.amazonaws.com/saladinjake.jpg"
  }else{
    profiler = "https://Goom Logistics-bucket.s3.amazonaws.com/"+takenDriver.user.profile
  }














  //initial action before realtime activity: nONE REAL TIME



  let startPointer =document.getElementById('startloc').value //user says he is here
  let endPointer = document.getElementById('destination').value; //users destination
  let detinationMarker = document.getElementById('destination').value;

  var geocoder = new google.maps.Geocoder();
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  showUserDrift(startPointer, endPointer, geocoder, map); //route to users location
  showTravelRoute(map, directionsService, directionsDisplay,   startPointer, endPointer)


  // calculateDistance(startPointer, endPointer)



  calTravelDist(startPointer, endPointer,google.maps)


   var markerUser = new google.maps.Marker({
                  map: map,
                  position: { lat: 6.5244, lng: 3.3792},
                  animation: google.maps.Animation.DROP,
                });





   //real time activity: REAL TIME ACTIVITY TRACKER
   //show driver on map
   //track drivers movement to destination
   socket = socketIOClient("http://localhost:12000",{secure:true});

    socket.on("FromAPI", data => {
      // console.log(data);
    });




  //emit the drivers location to the broad cast


  setInterval(() => {
    // console.log('tick tock')
    watchPosition();

    //watch user position

    if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        // console.log(`Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}`);

        // Set marker's position.
        markerUser.setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });

        // Center map to user's position.
        map.panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      err => alert(`Error (${err.code}): `)
    );
  } else {
    alert('Geolocation is not supported by your browser.');
  }

  }, 2000)


  socket.on('locationsUpdate', locations => {
    const markerToDelete = new Set()
    markers.forEach((marker,id) =>{
      marker.setMap(null)
      markers.delete(id)
    })
    locations.forEach(([id, position]) => {


       if((position.lat) && (position.lng)){
          const marker = new google.maps.Marker({
          position,
          map,
          title:id
        })

          let longlat = {lat:position.lat, lng:position.lng};

          // Create the array that will be used to fit the view to the points range and
          // place the markers to the polyline's points



         // var driverPath = new google.maps.Polyline({
         //  path: path,
         //  });

         // driverPath.setMap(map);

         buildPath(longlat,map);//for driver
         // destinationReached({lat:position.lat,lng:position.lng},detinationMarker)



          //custom info driver marker
        let profiler = '';
        if(takenDriver.user.profile == ""){
          profiler = "https://Goom Logistics-bucket.s3.amazonaws.com/saladinjake.jpg"
        }else{
          profiler = "https://Goom Logistics-bucket.s3.amazonaws.com/"+takenDriver.user.profile
        }

         // google.maps.event.addListener(marker, 'click', function(e) {
      let str;
      // let addr =''

      // var geocoder2 = new google.maps.Geocoder();
      //     geocoder2.geocode({
      //       'latLng': longlat,

      // }, function(results, status) {
      //   if (status == google.maps.GeocoderStatus.OK) {
      //     if (results[0].formatted_address) {
      //       // here assign the data to asp lables
      //       addr = results[0].formatted_address


      //     } else {
      //       alert('No results found');
      //     }
      //   } else {
      //     alert('Geocoder failed due to: ' + status);
      //   }
      // });

          str = `<div>
                  <img style="width:50px;height:50px" src="${profiler}" />
                  </div>
                  <div >
                  <p>Name:${takenDriver.user.username}</p>

                  </div>
                 `



              const infowindow = new google.maps.InfoWindow({
                                  content: str,
                                  maxWidth: 200
                });

                 // marker.addListener('click', function () {

                    infowindow.open(marker.get('map'),  marker);
                    InforObj[0] = infowindow;
                // });
         // });



            markers.set(id,marker)
       } //END IF

    })
  })



  setInterval(() => {
    socket.emit('requestLocations')
  }, 2000)






 //to do real time
  window.setInterval(function(){
       /// call your function here

}, 20000);


}







function calculateDistance(startpos, destpos) {
           var origin = startpos;
            var destination = destpos;

            // alert(startpos,destpos)
            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
                {
                    origins: [origin],
                    destinations: [destination],
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
                    // unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
                    avoidHighways: false,
                    avoidTolls: false
                }, callback);
        }
        // get distance results
        function callback(response, status) {
            let driver = JSON.parse(localStorage.getItem('userToken'));
            if (status != google.maps.DistanceMatrixStatus.OK) {
                $('#result').html("some error occured using google maps.");
            } else {
                var origin = response.originAddresses[0];
                var destination = response.destinationAddresses[0];
                if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
                    $('#result').html("There are no roads between "  + origin + " and " + destination);
                } else {
                    var distance = response.rows[0].elements[0].distance;
                    var duration = response.rows[0].elements[0].duration;
                    // console.log(response.rows[0].elements[0].distance);
                    var distance_in_kilo = distance.value / 1000; // the kilom
                    var distance_in_mile = distance.value / 1609.34; // the mile
                    var duration_text = duration.text;
                    var duration_value = duration.value;
                    $('#in_mile').text(distance_in_mile.toFixed(2));
                    $('#in_kilo').text(distance_in_kilo.toFixed(2));
                    $('#duration_text').text(duration_text);
                    $('#duration_value').text(duration_value);
                    $('#from').text(origin);
                    $('#to').text(destination);
                    let takenDriver = JSON.parse(localStorage.getItem('userToken'))


                    let profiler = '';
  if(takenDriver.user.profile == ""){
    profiler = "https://Goom Logistics-bucket.s3.amazonaws.com/saladinjake.jpg"
  }else{
    profiler = "https://Goom Logistics-bucket.s3.amazonaws.com/" + takenDriver.user.profile;
  }

                    let notification =` <div id="result">
                    <img style="width:100px;height:100px" src="${profiler}" />
                      <p>${driver.user.email}</p>
                       <p>${driver.user.phoneNumber || driver.user.phone_number}</p>
<ul class="list-group">
    <li class="ialign-items-center">Distance In Mile :${distance_in_mile.toFixed(2)}</li>
    <li class=" align-items-center">Distance is Kilo: ${distance_in_kilo.toFixed(2)}</li>
    <li class=" align-items-center">IN TEXT: ${duration_text}</li>
    <li class=" align-items-center">IN MINUTES: ${duration_value}</li>
    <li class=" align-items-center">FROM: ${origin}</li>
    <li class=" align-items-center">TO:${destination}</li>
</ul>
</div>`;

 var notificationx = alertify.notify(notification, 'successw', 5, function(){
  //  console.log('dismissed');
});

                }
            }
        }




function getuserLoc(address){

  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {


            let  lat =results[0].geometry.location.lat();
            let  lng =results[0].geometry.location.lng()


            //console.log(userpos)
            // let userpos =lat + ',' + lng;
            // console.log(userpos)

            //return userpos

          }else{

            var notification = alertify.notify('Geocode was not successful for the following reason: ' , 'error', 5, function(){  console.log('dismissed'); });

          }
     })
}


function showTravelRoute(map, directionsService, directionsDisplay, source , destination){


      directionsDisplay.setMap(map);

      calculateAndDisplayRoute(directionsService, directionsDisplay, source, destination)
}

 function calculateAndDisplayRoute(directionsService, directionsDisplay, source, destination) {
  directionsService.route({
    origin: source,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);

    }
  });
}






//for admin manager
function getAlldriversOntheMap(map){

}


//for admin
function driversNearBy(MAP, startLocationCordinates){ //lat , long
   const user = JSON.parse(localStorage.getItem('userToken'));

   //let cords = startLocationCordinates.split(',')

   // console.log(startLocationCordinates)

   // startLocationCordinatesLat =parseFloat(cords[0]);
   // startLocationCordinatesLng = parseFloat(cords[1]);

  //let nearDriver = activeUrl + `/driverLocation/`+ startLocationCordinatesLat + '/'+ startLocationCordinatesLng;
  let drivers = activeUrl + `/drivers`


  fetch(drivers, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': user.token,
          },
           mode: 'cors',
        }).then(response => response.json())
      .then(result =>{
        results.map((item,i)=>{
              //  console.log(item.location)
        })

      }).catch(e=>{
        // console.log(e)
      })
}

// let InforObj= [];
function showUserDrift(startlocAdress, destinationAddress, geocoder, resultsMap){
   CustomMarker.prototype = new google.maps.OverlayView();

function CustomMarker(opts) {
    this.setValues(opts);
}

CustomMarker.prototype.draw = function() {
    var self = this;
    var div = this.div;
    if (!div) {
        div = this.div = $('' +
            '<div>' +
            '<div class="shadow"></div>' +
            '<div class="pulse"></div>' +
            '<div class="pin-wrap">' +
            '<div class="pin"></div>' +
            '</div>' +
            '</div>' +
            '')[0];
        this.pinWrap = this.div.getElementsByClassName('pin-wrap');
        this.pin = this.div.getElementsByClassName('pin');
        this.pinShadow = this.div.getElementsByClassName('shadow');
        div.style.position = 'absolute';
        div.style.cursor = 'pointer';
        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
        google.maps.event.addDomListener(div, "click", function(event) {
            google.maps.event.trigger(self, "click", event);
        });
    }
    var point = this.getProjection().fromLatLngToDivPixel(this.position);
    if (point) {
        div.style.left = point.x + 'px';
        div.style.top = point.y + 'px';
    }
};

CustomMarker.prototype.animateDrop = function() {
    dynamics.stop(this.pinWrap);
    dynamics.css(this.pinWrap, {
        'transform': 'scaleY(2) translateY(-'+$('#map').outerHeight()+'px)',
        'opacity': '1',
    });
    dynamics.animate(this.pinWrap, {
        translateY: 0,
        scaleY: 1.0,
    }, {
        type: dynamics.gravity,
        duration: 1800,
    });

    dynamics.stop(this.pin);
    dynamics.css(this.pin, {
        'transform': 'none',
    });
    dynamics.animate(this.pin, {
        scaleY: 0.8
    }, {
        type: dynamics.bounce,
        duration: 1800,
        bounciness: 600,
    })

    dynamics.stop(this.pinShadow);
    dynamics.css(this.pinShadow, {
        'transform': 'scale(0,0)',
    });
    dynamics.animate(this.pinShadow, {
        scale: 1,
    }, {
        type: dynamics.gravity,
        duration: 1800,
    });
}

CustomMarker.prototype.animateBounce = function() {
    dynamics.stop(this.pinWrap);
    dynamics.css(this.pinWrap, {
        'transform': 'none',
    });
    dynamics.animate(this.pinWrap, {
        translateY: -30
    }, {
        type: dynamics.forceWithGravity,
        bounciness: 0,
        duration: 500,
        delay: 150,
    });

    dynamics.stop(this.pin);
    dynamics.css(this.pin, {
        'transform': 'none',
    });
    dynamics.animate(this.pin, {
        scaleY: 0.8
    }, {
        type: dynamics.bounce,
        duration: 800,
        bounciness: 0,
    });
    dynamics.animate(this.pin, {
        scaleY: 0.8
    }, {
        type: dynamics.bounce,
        duration: 800,
        bounciness: 600,
        delay: 650,
    });

    dynamics.stop(this.pinShadow);
    dynamics.css(this.pinShadow, {
        'transform': 'none',
    });
    dynamics.animate(this.pinShadow, {
        scale: 0.6,
    }, {
        type: dynamics.forceWithGravity,
        bounciness: 0,
        duration: 500,
        delay: 150,
    });
}

CustomMarker.prototype.animateWobble = function() {
    dynamics.stop(this.pinWrap);
    dynamics.css(this.pinWrap, {
        'transform': 'none',
    });
    dynamics.animate(this.pinWrap, {
        rotateZ: -45,
    }, {
        type: dynamics.bounce,
        duration: 1800,
    });

    dynamics.stop(this.pin);
    dynamics.css(this.pin, {
        'transform': 'none',
    });
    dynamics.animate(this.pin, {
        scaleX: 0.8
    }, {
        type: dynamics.bounce,
        duration: 800,
        bounciness: 1800,
    });
}


  var address1 =  startlocAdress;                //document.getElementById('address').value;
  var address2 =  destinationAddress;
  geocoder.geocode({'address': address1}, function(results, status) {
          if (status === 'OK') {
            // console.log(results[0].geometry.location + "is your location")
            //resultsMap.setCenter(results[0].geometry.location);
            //alert(results[0].geometry.location)
            // var marker = new google.maps.Marker({
            //   map: resultsMap,
            //   position: results[0].geometry.location,
            //   animation: google.maps.Animation.DROP,
            // });

            var marker  = new CustomMarker({
        position: results[0].geometry.location,
        map: resultsMap,
        animation: google.maps.Animation.DROP,

    });

            startMarker = marker;


            var contentString = '<div id="content"><h1>Pickup Location.' +
                    `</h1><p>${address1}</p></div>`;





          const infowindow = new google.maps.InfoWindow({
                            content: contentString,
                            maxWidth: 200
          });

          marker.addListener('click', function () {

                            infowindow.open(marker.get('map'), marker);
                            InforObj[0] = infowindow;
          });

           marker.addListener('mouseover', function () {

                            infowindow.open(marker.get('map'), marker);
                            InforObj[0] = infowindow;
          });
















          } else {
            var notification = alertify.notify('Geocode was not successful for the following reason: ' + status, 'error', 5, function(){  console.log('dismissed'); });

            //alert('Geocode was not successful for the following reason: ' + status);
          }
  });


  geocoder.geocode({'address': address2}, function(results, status) {
          if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                // var marker = new google.maps.Marker({
                //   map: resultsMap,
                //   position: results[0].geometry.location,
                //   animation: google.maps.Animation.DROP,
                // });

                          var marker = new CustomMarker({
        map: resultsMap,
        position: results[0].geometry.location,
        animation: google.maps.Animation.DROP,
    });



                var contentString = '<div id="content"><h1>Destination.' +
                        `</h1><p>${address2}</p></div>`;





                const infowindow = new google.maps.InfoWindow({
                                  content: contentString,
                                  maxWidth: 200
                });

                marker.addListener('click', function () {

                                  infowindow.open(marker.get('map'), marker);
                                  InforObj[0] = infowindow;
                });

                 marker.addListener('mouseover', function () {

                                  infowindow.open(marker.get('map'), marker);
                                  InforObj[0] = infowindow;
                });
          } else {
            var notification = alertify.notify('Geocode was not successful for the following reason: ' + status, 'error', 5, function(){  console.log('dismissed'); });

            // alert('Geocode was not successful for the following reason: ' + status);

          }
  });

}





function destinationReached(myPosition,destinationAddress){
  //tolerance 50 meters
//requires the geometry-library
 var geocoder = new google.maps.Geocoder();

geocoder.geocode({'address': destinationAddress}, function(results, status) {
          if (status === 'OK') {


                if(google.maps.geometry.spherical.computeDistanceBetween(myPosition,results[0].geometry.location)<50){
                     resultsMap.setCenter(results[0].geometry.location);
                    alert('You have arrived!');
                }else{
                  // console.log('traffic jam')
                }

          } else {
            var notification = alertify.notify('Geocode was not successful for the following reason: ' + status, 'error', 5, function(){  console.log('dismissed'); });

            // alert('Geocode was not successful for the following reason: ' + status);

          }
  });


}









function calTravelDist(startlocAdd,endlocAdd,maps){


  var helper = {};

  helper.getMetersToMiles = function(meters, precision) {
    precision = precision || 2;

    var ret =  +((meters * 0.00062137).toFixed(precision));
    return ret;
  };

  helper.getDistanceMatrixService = function() {
    return new maps.DistanceMatrixService();
  };

  helper.getDistance = function(opts, fnCallBack) {
    var serv = helper.getDistanceMatrixService();

    serv.getDistanceMatrix(opts, function(response, status) {
      if (status === maps.DistanceMatrixStatus.OK) {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;

        var returnList = [];

        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            var distance = element.distance;
            var duration = element.duration;
            var from = origins[i];
            var to = destinations[j];

            returnList.push({
              distance: {
                text: distance.text,
                miles: helper.getMetersToMiles(distance.value),
                meters: distance.value
              },
              duration: {
                text: duration.text,
                seconds: duration.value
              },
              origin: from,
              destination: to
            });
          }
        }

        fnCallBack(returnList);

      } else {
        throw "Could not call distance matrix service...";
      }
    });
  }

  helper.getDistanceDriving = function(opts, fnCallBack) {
    opts.travelMode = maps.TravelMode.DRIVING;
    opts.drivingOptions = {
      departureTime: new Date(),
      trafficModel: "optimistic"
    };

    opts.unitSystem = opts.unitSystem || maps.UnitSystem.IMPERIAL;

    helper.getDistance(opts, fnCallBack);
  }

  helper.getDistanceDrivingMiles = function(origin, destination, fnCallBack) {
    helper.getDistanceDriving({
      origins: [origin],
      destinations: [destination]
    }, fnCallBack);
  }

  var originCoords = {lat: 55.93, lng: -3.118};
  var destCoords = {lat: 50.087, lng: 14.421};

  var originText = startlocAdd;
  var destText = endlocAdd;

  helper.getDistanceDrivingMiles(originText, destText, function(obj) {
    var el = obj[0];

    var builder = [];
    builder.push('From ');
    builder.push(el.origin);
    builder.push(' to ');
    builder.push(el.destination);
    builder.push(' will take you ')
    builder.push(moment.duration(el.duration.seconds, 'seconds').humanize());
    builder.push(' seconds and you will travel ');
    builder.push(el.distance.miles);
    builder.push(' miles ')

    $("#label").text(builder.join(''))

    var notificationx = alertify.notify(builder.join(''), 'successw', 35, function(){  console.log('dismissed'); });

  });


}









export default dashboard;
