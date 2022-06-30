'use strict';
import GateKeepersForUser from './helpers/whois';
import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';
import MessageBoard from '../../../core/MessageBoard';

import $ from 'jquery';

import CarCarousel from './helpers/CarCarousel';
let activeUrl = getOnlineUrlConnection();
let baseUrl = getOnlineUrlConnection();
var price,
  plan,
  cart,
  carPrice,
  carName,
  car,
  planCounter = 1,
  allplans = document.getElementsByClassName('plan'),
  element,
  overlaySelected,
  maxCars = 2,
  selectedCars = 0,
  overlaySelectedCars,
  elementCars,
  planList,
  planName,
  rootParentSection,
  next2,
  currentView = 1,
  maxViewSteps = 3,
  steps = ['choose-plan', 'choose-cars', 'add-itineries'],
  mainUrl = activeUrl,
  slideIndex = 1,
  prev,
  next,
  requestQuote;
var linkOfApi = activeUrl;

window.planClicked = false; // declare the variable that tracks the state
window.planClickHandler = () => {
  // declare a function that updates the state
  planClicked = true;
};
window.carClickedCount = 1;
window.carClicked = false; // declare the variable that tracks the state
window.carClickHandler = () => {
  // declare a function that updates the state
  carClicked = true;
  carClickedCount += 1;
};

window.addEventPlan = (ev, el) => {
  let chosenPlan;

  var thisEl = el;
  if (el.classList.contains('plan')) {
    ev.preventDefault();

    if (planCounter > 1) {
      $('#overlay').fadeIn(200, function() {
        $('#box').animate({ top: '220px' }, 200);
      });

      $('#boxclose').click(function() {
        $('#box').animate({ top: '-200px' }, 500, function() {
          $('#overlay').fadeOut('fast');
        });
      });

      document.getElementById('msg-').innerHTML = 'cant choose more than one plan';
    } else {
      var id = thisEl.getAttribute('id');
      overlaySelected = document.getElementById(id + '-plan');
      var closer = document.getElementById(id + '-boxclose');
      // Removes an element from the document
      element = thisEl.parentNode.parentNode;
      element.style.border = '1px solid blue';
      rootParentSection = thisEl.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
      localStorage.setItem('planSelected', thisEl.id);
      //alert(rootParentSection.id)

      closer.style.display = 'block';
      closer.addEventListener('click', () => {
        planCounter = 1;
        localStorage.setItem('planSelectedCount', planCounter);
        element.style.border = 'none';
        closer.style.display = 'none';
      });
      overlaySelected.style.opacity = 0.9;
      price = thisEl.getAttribute('data-price');
      planName = thisEl.getAttribute('data-plan');
      planList = {
        price,
        planName,
      };
    }
    planCounter += 1;

    localStorage.setItem('planSelectedCount', planCounter);
    return true;
  }
};

const recordPlans = (items, displayBoard) => {
  let style = 'display:block;fontSize:14px';
  items.forEach((item, i) => {
    if (item.plan_categories != 'Goom Logistics Richly') {
      item.price = '₦ ' + item.price;
    } else {
      item.price = ' ';
    }
    const eachRecord = `<div  class="col-sm-6 col-md-6 col-lg-3 galleryImage" >
                         <a class="boxclose" id="btn-${i}-boxclose"></a>
                                <div class="price_card text-center">
                             <div class="pricing-header bg-purple" style="height:160px">
                                    <span class="price" >${item.price}</span>
                                    <span class="name"> ${item.plan_categories}</span>
                                  </div>
                                  <div class="col-lg-12 m-t-20" style="height:240px">
                                  <div class="col-sm-12 col-md-12 col-lg-12 center-block text-center">
                                  <p style="font-size:16px">${item.description}</p>
                                  </div></div>
                                  <input type="hidden" class="galleryImageInput" name="galleryImage[]" value="12345.png">
                                  <button onClick="planClickHandler();addEventPlan(event,this);document.getElementById('next').disabled=false; document.getElementById('previous').disabled=false;" style="width:80px; font-size:12px; " id="btn-${i}" data-id="btn-${i}" data-type="plan" data-plan="${item.plan_name} ${item.plan_categories}" data-plancategory="${item.plan_categories}" data-price="${item.price}" class=" btn btn-primary waves-effect waves-light w-md cd-add-to-cart js-cd-add-to-cart plan">Select</button>
                                </div> 
                                <div className="overlay-plan" id="btn-${i}-plan">
                                  <a href="#" class="icon" title="User Profile">
                                    
                                  </a>
                                 
                                </div>
                            </div> 
    `;

    displayBoard.innerHTML += eachRecord;
  });
};

window.addCarSelectEvent = (ev, el) => {
  var carList = [];

  var allcars = document.getElementsByClassName('car-select');

  if (el.classList.contains('car-select')) {
    ev.preventDefault();

    if (selectedCars > maxCars) {
      $('#overlay').fadeIn(200, function() {
        $('#messenger').html('cant choose more than 3 cars');
        // document.getElementById("messenger").innerHTML="cant choose more than one plan"
        $('#box').animate({ top: '220px' }, 200);
      });

      $('#boxclose').click(function() {
        $('#box').animate({ top: '-200px' }, 500, function() {
          $('#overlay').fadeOut('fast');
        });
      });

      document.getElementById('msg-').innerHTML = 'cant choose more than 3 cars';
    } else {
      //$('#modal-1').toggleClass("md-show"); //you can list several class names
      var id = el.getAttribute('id');

      overlaySelectedCars = document.getElementById(id + '-plan');

      overlaySelectedCars.style.opacity = 0.5;

      carPrice = el.getAttribute('data-price');
      carName = el.getAttribute('data-carmodel');
      const carImage = el.getAttribute('data-image');

      carList.push({
        price: carPrice,
        name: carName,
        image: carImage,
      });

      elementCars = el.parentNode.parentNode;
      var closer = document.getElementById('close-btc-' + id);
      closer.style.display = 'block';
      closer.addEventListener('click', () => {
        selectedCars -= 1;
        elementCars.style.border = 'none';
        closer.style.display = 'none';
      });

      elementCars.style.border = '1px solid blue';

      rootParentSection = el.parentNode.parentNode.parentNode.parentNode.parentNode;

      //alert(rootParentSection.id + "is here")
    }
  }
  selectedCars += 1;
};

window.preventWindow = e => {
  e.preventDefault();
};

let car_count = 101;
const recordCars = (items, displayBoard) => {
  console.log(items);
  items.forEach((item, i) => {
    let className = '';
    if (item.status == 'Booked') {
      className = 'label-danger';
    } else if (item.status == 'Available') {
      className = 'label-success';
    } else {
      className = 'label-warning';
    }

    let className2 = 'label-warning';
    if (item.health_status == 'Pending') {
      className2 = 'label-danger';
    } else if (item.health_status == 'Completed') {
      className2 = 'label-success';
    }

    let className3 = '';
    if (item.car_status == 'Disabled') {
      className3 = 'label-danger';
    } else if (item.car_status == 'Active') {
      className3 = 'label-success';
    } else {
      className3 = 'label-warning';
    }

    const eachRecord = `<div data-target="card" style="background:#fff; border-radius:12px"  class=" slide col-sm-6 col-md-6 col-lg-3 galleryImage" >
                         
                         <a class="boxclose" id="btnc-${car_count}-boxclose" style="z-index:99999999999; margin-top:-19px"></a>
                                
                                <div class=" text-center">
                             <div class="pricing-header ">
                                    <img src="${item.imagePath ||
                                      item.images}" style="width:140px;height:130px" /><br />
                                    <span class="label ${className}">${item.status}</span>
                                  

                                  </div>
                                  <div class="col-lg-12 m-t-20">
                                  <div class="col-sm-12 col-md-12 col-lg-12 center-block text-center">
                                  <br/>
                                  <div class="cars-info">
                                             
                                             <h4 class="m-t-0 text-center"><a id="car-info-${car_count}" href="#" class="text-dark">${item.carModel ||
      item.model}</a> </h4>
                                  </div>

                                  
                                  </div></div>
                                  <input type="hidden" class="galleryImageInput" name="galleryImage[]" value="12345.png">
                                  <button onClick="carClickHandler();addCarSelectEvent(event,this);document.getElementById('next').disabled=false; document.getElementById('previous').disabled=false;" style=" left:20px;margin-left:30px; font-size:12px; margin:20px auto"  id="btnc-${car_count}" data-driver="${
      item.assigned_driver_name
    }" data-driver_email="${item.assigned_driver_email}" data-plate="${
      item.plate_number
    }" driver_location="${item.assigned_driver_location}" data-driver_phone="${
      item.assigned_driver_phone
    }" class="add-to-cart car-select-proven btn btn-primary waves-effect waves-light car-select" data-id="btnc-${car_count}" data-type2="car-select" data-price="${
      item.price
    }" data-type="${item.car_type}"  data-carmodel="${item.model}" data-image="${
      item.images
    }" data-caryear="${item.car_year}" data-id="1" >Select</button>

                                </div> 
                                <div class="overlay-plan" id="btnc-${car_count}-car">
                                  <a href="#" class="icon" title="User Profile">
                                    
                                  </a>
                                 
                                </div>
                            </div>`;

    displayBoard.innerHTML += eachRecord;

    car_count += 1;
  });
  displayBoard.innerHTML += '<br/><br/><br/>';

  //carSlider();
};

function carSlider() {
  const args = {
    transitionDuration: '0.8s',
  };
  new CarCarousel(document.getElementById('car-carousel'), args);
  // $(document).ready(function () {
  //   var itemsMainDiv = ('.MultiCarousel');
  //   var itemsDiv = ('.MultiCarousel-inner');
  //   var itemWidth = "";

  //   $('.leftLst, .rightLst').click(function () {
  //       var condition = $(this).hasClass("leftLst");
  //       if (condition)
  //           click(0, this);
  //       else
  //           click(1, this)
  //   });

  //  ResCarouselSize();

  //   $(window).resize(function () {
  //       ResCarouselSize();
  //   });

  //   //this function define the size of the items
  //   function ResCarouselSize() {
  //       var incno = 0;
  //       var dataItems = ("data-items");
  //       var itemClass = ('.item_');
  //       var id = 0;
  //       var btnParentSb = '';
  //       var itemsSplit = '';
  //       var sampwidth = $(itemsMainDiv).width();
  //       var bodyWidth = $('body').width();
  //       $(itemsDiv).each(function () {
  //           id = id + 1;
  //           var itemNumbers = $(this).find(itemClass).length;
  //           btnParentSb = $(this).parent().attr(dataItems);
  //           itemsSplit = btnParentSb.split(',');
  //           $(this).parent().attr("id", "MultiCarousel" + id);

  //           if (bodyWidth >= 1200) {
  //               incno = itemsSplit[3];
  //               itemWidth = sampwidth / incno;
  //           }
  //           else if (bodyWidth >= 992) {
  //               incno = itemsSplit[2];
  //               itemWidth = sampwidth / incno;
  //           }
  //           else if (bodyWidth >= 768) {
  //               incno = itemsSplit[1];
  //               itemWidth = sampwidth / incno;
  //           }
  //           else {
  //               incno = itemsSplit[0];
  //               itemWidth = sampwidth / incno;
  //           }
  //           $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
  //           $(this).find(itemClass).each(function () {
  //               $(this).outerWidth(itemWidth);
  //           });

  //           $(".leftLst").addClass("over");
  //           $(".rightLst").removeClass("over");

  //       });
  //     }

  //     //this function used to move the items
  //     function ResCarousel(e, el, s) {
  //         var leftBtn = ('.leftLst');
  //         var rightBtn = ('.rightLst');
  //         var translateXval = '';
  //         var divStyle = $(el + ' ' + itemsDiv).css('transform');
  //         var values = divStyle.match(/-?[\d\.]+/g);
  //         var xds = Math.abs(values[4]);
  //         if (e == 0) {
  //             translateXval = parseInt(xds) - parseInt(itemWidth * s);
  //             $(el + ' ' + rightBtn).removeClass("over");

  //             if (translateXval <= itemWidth / 2) {
  //                 translateXval = 0;
  //                 $(el + ' ' + leftBtn).addClass("over");
  //             }
  //         }
  //         else if (e == 1) {
  //             var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
  //             translateXval = parseInt(xds) + parseInt(itemWidth * s);
  //             $(el + ' ' + leftBtn).removeClass("over");

  //             if (translateXval >= itemsCondition - itemWidth / 2) {
  //                 translateXval = itemsCondition;
  //                 $(el + ' ' + rightBtn).addClass("over");
  //             }
  //         }
  //         $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
  //     }

  //     //It is used to get some elements from btn
  //     function click(ell, ee) {
  //         var Parent = "#" + $(ee).parent().attr("id");
  //         var slide = $(Parent).attr("data-slide");
  //         ResCarousel(ell, Parent, slide);
  //     }

  // });
}

class ApiGetAllPlansRecord {
  static getData(urlType) {
    const carsUrl = activeUrl + '/cars';
    //const loader = document.querySelector('#loader');
    //  loader.style.display = 'block';
    GateKeepersForUser();
    if (urlType == '/individual/plans/view') {
      activeUrl = activeUrl + urlType;
    } else {
      activeUrl = activeUrl + urlType;
    }

    const user = JSON.parse(localStorage.getItem('userToken'));
    const urls = [activeUrl, carsUrl];
    let displayPlanTemplate, carLists, planList, displayCarsTemplates;

    const promises = urls.map(url =>
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': user.token,
        },
        mode: 'cors',
      }).then(response => response.json()),
    );

    return Promise.all(promises)
      .then(datas => {
        console.log(datas);
        //loader.style.display="none"

        if (datas[1].data[0].carsAvailable) {
          carLists = datas[1].data[0].carsAvailable;
          let car_count = 101;
          var displayBoard = document.getElementById('travelcars');
          recordCars(carLists, displayBoard);
        }

        if (datas[0].data[0].individualPlans) {
          planList = datas[0].data[0].individualPlans;
          planList = planList.filter(item => item.plan_name == 'Individual');

          var displayBoard = document.getElementById('plan-section');
          recordPlans(planList, displayBoard);
          // document.getElementById("plan-section").innerHTML=displayPlanTemplate;
        } else {
          planList = datas[0].data[0].coperatePlan;
          planList = planList.filter(item => item.plan_name != 'Individual');
          var displayBoard = document.getElementById('plan-section');
          recordPlans(planList, displayBoard);
        }
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  getOnePlanById() {}

  static updateItem(record) {
    const user = JSON.parse(localStorage.getItem('userToken'));
    var linkOfApi = baseUrl + '/plans/' + record.id;
    return fetch(linkOfApi, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      mode: 'cors',
      body: JSON.stringify(record),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          MessageBoard.displayMsg('Successfully updated request for data mechanic request.');
        } else {
          console.log(JSON.strigify(data) + 'error updating iti');

          return MessageBoard.displayMsg('Could not perform Update for mech request');
        }
      });
  }
  static deleteItem(record) {
    // de
    const user = JSON.parse(localStorage.getItem('userToken'));
    var linkOfApi = baseUrl + '/plans/' + record.id;
    return fetch(linkOfApi, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 202) {
          const recordOfType = data.data[0].type;
          MessageBoard.displayMsg('Deleted data record');
          // ApiDeleteOneStatusRecord.redirect(recordOfType);
        } else {
          return MessageBoard.displayMsg('Could not perform delete operation');
        }
      });
  }
}

export default ApiGetAllPlansRecord;
