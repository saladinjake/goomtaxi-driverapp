'use strict';
import PlanCategoryModel from '../models/PlanCategoryModel';
import $ from 'jquery';
import getApiUrl from '../../backend/services/apiservices/helpers/getOnlineUrlConnection';
let baseUrl = getApiUrl();

alertify.set('notifier', 'position', 'top-left');

let price,
  plan,
  cart,
  carPrice,
  carImage,
  car_type,
  car_year,
  assigned_driver_name,
  assigned_driver_email,
  assigned_driver_location,
  assigned_driver_phone,
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
  planList = [],
  planName,
  rootParentSection,
  next2,
  planCategoryName,
  currentView = 1,
  maxViewSteps = 3,
  steps = ['choose-plan', 'choose-cars', 'add-itineries'],
  activeUrl = baseUrl,
  mainUrl = activeUrl,
  slideIndex = 1,
  prev,
  next,
  requestQuote,
  carList = [],
  carIdsSet = [],
  total = 0,
  allNewItineraries = [];

// console.log(process.env)
// alert(baseUrl)
var startLoc, endLoc;
let userPlanItineries;
let ItineraryList = [];

window.deleteItinerary = el => {
  let id = el.dataset.id;

  let itin = JSON.parse(localStorage.getItem('itins'));

  itin = itin.filter(item => item.plan_id != id);

  let user = JSON.parse(localStorage.getItem('userToken'));
  fetch(baseUrl + '/itinerary/delete/' + id, {
    method: 'DELETE',
    headers: {
      'Access-Control-Allow-Headers': 'x-access-token',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': user.token,
    },
    mode: 'cors',
    // body: JSON.stringify(prePostData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 202) {
        localStorage.setItem('itins', JSON.stringify(itin));

        var notification = alertify.notify('Delete Successful.', 'success', 5, function() {
          console.log('dismissed');
        });

        document.getElementById('trip' + id).style.display = 'none';
      } else {
        //MessageBoard.displayMsg(data.error);
        var notification = alertify.notify('Failed to delete itinerary.', 'error', 5, function() {
          console.log('dismissed');
        });
      }
    })
    .catch(error => {
      throw error;
    });
};

function postNotification(postUrl, prePostData) {
  let user = JSON.parse(localStorage.getItem('userToken'));
  fetch(postUrl, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Headers': 'x-access-token',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': user.token,
    },
    mode: 'cors',
    body: JSON.stringify(prePostData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 201) {
        console.log(data);
        //MessageBoard.displayMsg('Form submitted succesfully');
        var notification = alertify.notify(
          'A notification message would be sent to you regarding your quotation.',
          'success',
          5,
          function() {
            console.log('dismissed');
          },
        );

        localStorage.setItem('urlType', postUrl);
      } else if (data.status === 401 || data.status === 403) {
        //window.location.href = './';
      } else {
        //MessageBoard.displayMsg(data.error);
        var notification = alertify.notify(
          'Failed to send quotation to user',
          'error',
          5,
          function() {
            console.log('dismissed');
          },
        );
      }
    })
    .catch(error => {
      throw error;
    });
}

function createUserDriveTestDetail(url, data) {
  const user = JSON.parse(localStorage.getItem('userToken'));
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': user.token,
    },
    body: JSON.stringify(data),
    mode: 'cors',
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.status == 201) {
        // var notification = alertify.notify('Successfully created drive test ', 'success', 5, function(){  console.log('dismissed'); });
        // setTimeout(()=>{
        //   window.location.reload();
        // },2000)
        // ApiDeleteOneStatusRecord.redirect(recordOfType);
      } else {
        var notification = alertify.notify(
          'Could not perform update operation.',
          'error',
          5,
          function() {
            console.log('dismissed');
          },
        );
      }
    })
    .catch(e => console.log(e));
}

function guidGenerator() {
  var S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}

function insertAfter(el, referenceNode) {
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

// function is_location_valid(address)
// {
//     var geocoder = new google.maps.Geocoder();

//     geocoder.geocode( {"address": address}, function(results, status) {
//         if (status == google.maps.GeocoderStatus.OK)
//         {

//             var notification = alertify.notify('Found the location entered.', 'success', 5, function(){  console.log('dismissed'); });

//         }
//         else
//         {
//             var notification = alertify.notify('Could not find the address.', 'error', 5, function(){  console.log('dismissed'); });

//         }
//     });
// }

function hasClass(el, classname) {
  return el.classList.contains(classname);
}

window.getIdPlan = item => {
  // you can only edit unpaid or un processed itineries
  if (item.dataset.status != 'completed') {
    console.log(item + 'edit this');
    localStorage.setItem('Id', item.id);
    localStorage.setItem('reportType', 'planRequest');

    var location = document.getElementById('field-1');
    //location.value= item.dataset.start_location;
    var destination = document.getElementById('field-2');
    //destination.value = item.dataset.destination;
    var options = {
      types: ['geocode'],
      // types: [
      // '(address)'
      // ],
      componentRestrictions: { country: 'NG' },
    };
    var autocomplete3 = new google.maps.places.Autocomplete(location, options);
    google.maps.event.addListener(autocomplete3, 'place_changed', function() {
      startLoc = autocomplete3.getPlace();
      //startLoc = startLoc.formatted_address;
      console.log(startLoc);
    });

    var autocomplete4 = new google.maps.places.Autocomplete(destination, options);
    google.maps.event.addListener(autocomplete4, 'place_changed', function() {
      destination = autocomplete4.getPlace();
      //destination = destination.formatted_address;

      // document.getElementById('city2').value = place.name;
      // document.getElementById('cityLat').value = place.geometry.location.lat();
      // document.getElementById('cityLng').value = place.geometry.location.lng();
    });

    var driverOpt = document.getElementById('selection');
    var startDate = document.getElementById('field-3');
    startDate.value = item.dataset.start_time;

    var EndDate = document.getElementById('field-4');
    EndDate.value = item.dataset.end_date;

    var no_hours = document.getElementById('field-5');
    no_hours.value = item.dataset.no_hours;

    var drive_option = document.getElementById('field-6');
    drive_option = drive_option.options[drive_option.selectedIndex].text;

    var drivingschool = document.getElementById('field-7');
    drivingschool = drivingschool.options[drivingschool.selectedIndex].text;

    const record = {
      location: location.value,
      destination: destination.value,
      start_date: startDate.value,
      end_date: EndDate.value,
      no_hours: no_hours.value,
      drive_option: drive_option,
      drivingschool: drivingschool,
      id: item.dataset.id,
    };

    document.body.addEventListener('click', e => {
      if (hasClass(e.target, 'edit_content')) {
        e.preventDefault();
        PlanCategoryModel.updateItem(record);
      } else if (hasClass(e.target, 'delete_content')) {
        e.preventDefault();
        PlanCategoryModel.deleteItem(record);
      }
    });
  }
};

window.planClicked = false; // declare the variable that tracks the state
window.planClickHandler = () => {
  // declare a function that updates the state
  window.planClicked = true;
};
window.carClickedCount = 1;
window.carClicked = false; // declare the variable that tracks the state
window.carClickHandler = () => {
  // declare a function that updates the state
  window.carClicked = true;
  window.carClickedCount += 1;
};

const prevent = e => {
  e.preventDefault();
};

window.addEventPlan = (ev, el) => {
  let chosenPlan;
  var thisEl = el;
  var clicked = true;
  if (el.classList.contains('plan')) {
    ev.preventDefault();
    ev.target.disabled = true;
    element = thisEl.parentNode.parentNode;
    console.log(planCounter);
    if (planCounter > 1) {
      //cant choose more than 1
      console.log('cant select more than 1');
      $('#overlay').fadeIn(200, function() {
        $('#box').animate({ top: '220px' }, 200);
      });

      $('#boxclose').click(function() {
        $('#box').animate({ top: '-200px' }, 500, function() {
          $('#overlay').fadeOut('fast');
        });
      });
    } else {
      var thisEl = ev.target;
      var id = thisEl.getAttribute('id');
      overlaySelected = document.getElementById(id + '-plan');
      var closer = document.getElementById(id + '-boxclose');
      // Removes an element from the document

      element.style.opacity = 0.6;
      element.style.transition = 'width 1s ease-in-out';

      if (clicked == true) {
        element.disabled = true;
        $('.plan').prop('disabled', true);
        // element.value="Chosen Plan"
      }

      // element.style.border="1px solid blue";
      rootParentSection = thisEl.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
      localStorage.setItem('planSelected', thisEl.id);
      //alert(rootParentSection.id)

      closer.style.display = 'block';
      closer.addEventListener('click', () => {
        planCounter = 1;
        localStorage.setItem('planSelectedCount', planCounter);
        element.style.opacity = 1;
        closer.style.display = 'none';
        element.disabled = false;
        element.value = 'select';
        ev.target.disabled = false;
        clicked = false;
        $('.plan').prop('disabled', false);
        next.disabled = true;
        prev.disabled = false;
      });
      overlaySelected.style.opacity = 0.9;
      price = thisEl.getAttribute('data-price');
      price = price.replace(',', '');
      //prints: 123
      planName = thisEl.getAttribute('data-plan');
      planCategoryName = thisEl.getAttribute('data-plancategory');
      planList.push(price, planName, planCategoryName);
    }
    planCounter += 1;
  }
};

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + ' '; //+ strTime;
}

var clickedCarId = 1;
window.addCarSelectEvent = (ev, el) => {
  const user = JSON.parse(localStorage.getItem('userToken'));

  let chosenPlan;
  var thisEl = el;
  var clicked = true;
  var AllCars = document.getElementsByClassName('car-select');
  next.style.opacity = 0;

  if (el.classList.contains('car-select')) {
    el.classList.add('good'); //add-cars-template

    if (user.user.user_type == 'Individual') {
      if (selectedCars == maxCars) {
        $('.car-select').prop('disabled', true);
        var notification = alertify.notify(
          'You can only select 3 cars for this plan.',
          'error',
          5,
          function() {
            console.log('dismissed');
          },
        );
        next.disabled = false;
        next.style.opacity = 1;
      } else {
        prev.disabled = true;
      }
    }
    ev.preventDefault();
    thisEl.disabled = true;
    element = thisEl.parentNode.parentNode;
    console.log(planCounter);
    if (user.user.user_type == 'Individual') {
      if (selectedCars > maxCars) {
        //cant choose more than 1
        //  console.log("cant select more than 3")
        $('#overlay').fadeIn(200, function() {
          $('#box').animate({ top: '220px' }, 200);
        });

        $('#boxclose').click(function() {
          $('#box').animate({ top: '-200px' }, 500, function() {
            $('#overlay').fadeOut('fast');
          });
        });
      } else {
        //  console.log(selectedCars+ "carClicked")

        var id = thisEl.getAttribute('id');
        overlaySelected = document.getElementById(id + '-car');
        var closer = document.getElementById(id + '-boxclose');
        // Removes an element from the document

        //element.style.opacity=0.6;
        //element.style.transition="width 1s ease-in-out";

        if (clicked == true) {
          //element.disabled=true;
          thisEl.disabled = true;
          // $('.car-select').prop('disabled', true);
          // element.value="Chosen Plan"
        }

        // element.style.border="1px solid blue";
        rootParentSection =
          thisEl.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        localStorage.setItem('carSelected', thisEl.id);
        //alert(rootParentSection.id)

        closer.style.display = 'block';
        closer.addEventListener('click', () => {
          selectedCars -= 1;
          console.log(selectedCars + 'car deduce');
          if (selectedCars < 0) {
            selectedCars = 0;
            carList = [];
          }
          localStorage.setItem('carSelectedCount', selectedCars);
          element.style.opacity = 1;
          closer.style.display = 'none';

          thisEl.disabled = false;
          clicked = false;

          if (selectedCars < 2) {
            next.disabled = true;
            prev.disabled = true;
          }

          const carsSelected = carList.find(item => item.id === id);
          const index = carList.indexOf(carsSelected);
          carList.splice(index, 1);

          const ix = carIdsSet.find(item => item.id === id);
          const ixn = carIdsSet.indexOf(ix);
          carIdsSet.splice(ixn, 1);

          //  console.log(carList)

          $('#add-cars-template button')
            .not('.good')
            .prop('disabled', false);
          el.classList.remove('good');
        });
        //overlaySelected.style.opacity=0.9;
        carPrice = el.getAttribute('data-price');
        carName = el.getAttribute('data-carmodel');
        carImage = el.getAttribute('data-image');

        car_year = el.getAttribute('data-caryear');
        car_type = el.getAttribute('data-type');
        assigned_driver_name = el.getAttribute('data-driver');
        assigned_driver_email = el.getAttribute('data-driver_email');
        assigned_driver_location = el.getAttribute('data-driver_location');
        assigned_driver_phone = el.getAttribute('data-driver_phone');

        if (carList.length < 3) {
          carList.push({
            id: id,
            price: carPrice,
            name: carName,
            image: carImage,
            car_type: car_type,
            model: carName,
            car_year: car_year,
            assigned_driver_phone: assigned_driver_phone || 'Not Assigned',
            assigned_driver_location: assigned_driver_location || '0.000,0.000',
            assigned_driver_name: assigned_driver_name || 'Not Assigned',
            assigned_driver_email: assigned_driver_email || 'Not Assigned',
            plate_number: el.getAttribute('data-plate'),
          });
          carIdsSet.push(id);
        }

        console.log(carList);
      }
    } //for Individual plan
    else {
      //for corporate

      console.log(selectedCars + 'carClicked');

      var thisEl = ev.target;
      var id = thisEl.getAttribute('id');
      overlaySelected = document.getElementById(id + '-car');
      var closer = document.getElementById(id + '-boxclose');
      // Removes an element from the document

      element.style.opacity = 0.6;
      element.style.transition = 'width 1s ease-in-out';

      if (clicked == true) {
        element.disabled = true;
        // $('.car-select').prop('disabled', true);
        // element.value="Chosen Plan"
      }

      // element.style.border="1px solid blue";
      rootParentSection = thisEl.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
      localStorage.setItem('carSelected', thisEl.id);
      //alert(rootParentSection.id)

      closer.style.display = 'block';
      closer.addEventListener('click', () => {
        selectedCars -= 1;
        console.log(selectedCars + 'car deduce');
        if (selectedCars < 0) {
          selectedCars = 0;
        }
        localStorage.setItem('carSelectedCount', selectedCars);
        element.style.opacity = 1;
        closer.style.display = 'none';
        element.disabled = false;
        element.value = 'select';
        ev.target.disabled = false;
        clicked = false;
        $('.car-select').prop('disabled', false);
        if (selectedCars < 2) {
          next.disabled = true;
          prev.disabled = true;
        }

        const carsSelected = carList.find(item => item.id === id);

        const index = carList.indexOf(carsSelected);
        carList.splice(index, 1);

        console.log(carList);
      });
      overlaySelected.style.opacity = 0.9;
      carPrice = el.getAttribute('data-price');
      carName = el.getAttribute('data-carmodel');
      carImage = el.getAttribute('data-image');
      let plate_number = el.getAttribute('data-plate');

      car_year = el.getAttribute('data-caryear');
      car_type = el.getAttribute('data-type');
      assigned_driver_name = el.getAttribute('data-driver');
      assigned_driver_email = el.getAttribute('data-driver_email');
      assigned_driver_location = el.getAttribute('data-driver_location');
      assigned_driver_phone = el.getAttribute('data-driver_phone');

      // if(carList.length<3){
      carList.push({
        id: id,
        price: carPrice,
        name: carName,
        image: carImage,
        car_type: car_type,
        model: carName,
        car_year: car_year,
        assigned_driver_phone,
        assigned_driver_location,
        assigned_driver_name,
        assigned_driver_email,
        plate_number: plate_number,
      });

      // }
    }
    selectedCars += 1;
  }
};

function filterCars(e) {
  let search = e.target.value.toLowerCase();
  console.log(e.target.value);
  document.querySelectorAll('.cars-info').forEach(function(row) {
    var target = row.querySelector('h4 a');
    var text = target.innerText.toLowerCase();

    var element = target.parentNode.parentNode.parentNode.parentNode.parentNode;
    // element.style.border="1px solid blue"
    if (text.match(search)) {
      document.getElementById('searchResult').innerHTML = 'Search Results...';
      element.style.display = 'block';
    } else {
      // document.getElementById("searchResult").innerHTML = "No Search Result found. Please try another search keyword."
      element.style.display = 'none';
    }
  });
}

class WebsitePlanCategory {
  constructor() {}

  static runCarsCarousel() {
    document.addEventListener('DOMContentLoaded', () => {});
    // Select the carousel you'll need to manipulate and the buttons you'll add events to
  }

  loadItineraries(itinerarys) {
    var allNewItineraries = [...new Set(itinerarys)]; //[...new Set(JSON.parse(localStorage.getItem('itins')) )];
    var _tr;
    allNewItineraries.map((item, i) => {
      var dated = item.start_time;
      _tr = `<tr> 
                <td>${item.end_time}</td>
                <td>${item.start_location}</td>
                <td>${item.destination}</td>
             
                
                </tr>`;
      $(_tr)
        .hide()
        .insertAfter('#startPoint')
        .fadeIn('slow');

      //<td>
      //   <a href="#" id="" data-id=""  data-driver_option="${item.drive_option}"  data-start_time="" data-start_location="${item.start_location}" data-destination="${item.destination}" class="table-action-btn md-trigger" data-toggle="modal" data-target="#con-close-modal"><i class="md md-edit"></i></a>
      //   </td>
    });
  }

  attachEvents() {
    if (document.getElementById('planpage')) {
      if (localStorage.getItem('userToken')) {
        WebsitePlanCategory.runCarsCarousel();

        const user = JSON.parse(localStorage.getItem('userToken'));
        document.getElementById('plan_name').value = user.user.user_type;
        document.getElementById('plan_category').value = user.user.plan_name;
        // var options = {
        //  types: ['(regions)'],
        //  componentRestrictions: {country: "NG"}
        // };
        var options = {
          types: ['geocode'],
          // types: [
          // '(address)'
          // ],
          componentRestrictions: { country: 'NG' },
        };
        //itinerary auto complete
        startLoc = document.getElementById('location');
        endLoc = document.getElementById('destination');
        var isPlaceChanged = false;
        var autocomplete = new google.maps.places.Autocomplete(startLoc, options);
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          isPlaceChanged = true;
          startLoc = autocomplete.getPlace();
        });

        var autocomplete2 = new google.maps.places.Autocomplete(endLoc, options);
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          endLoc = autocomplete.getPlace();

          // document.getElementById('city2').value = place.name;
          // document.getElementById('cityLat').value = place.geometry.location.lat();
          // document.getElementById('cityLng').value = place.geometry.location.lng();
        });

        document.body.addEventListener('change', e => {
          if (hasClass(e.target, 'searchme')) {
            filterCars(e);
          }
        });
      }

      if (document.getElementById('planpage')) {
        this.indexPageController();

        var prevB = document.getElementById('previous');
        var nextB = document.getElementById('next');
        var requestQuoteB = document.getElementById('requestQuote');
        // if(slideIndex==1){
        //    prevB.disabled=true;
        //    nextB.disabled=true;
        // }
      }

      if (document.getElementById('planpage')) {
        this.showSlides(slideIndex);
        this.saveItinerary();

        if (localStorage.getItem('planSelected')) {
          var selectedPlansTaken = localStorage.getItem('planSelected');
          // alert(selectedPlansTaken)
        }

        prev = document.getElementById('previous');
        next = document.getElementById('next');
        requestQuote = document.getElementById('requestQuote');

        next.style.opacity = 1;
        prev.style.opacity = 1;
        prev.disabled = true;
        next.disabled = true;
        requestQuote.style.float = 'right';
        requestQuote.style.opacity = 0;

        prev.addEventListener('click', e => {
          this.plusSlides(-1);
          if (slideIndex % 3 != 0) {
            next.style.opacity = 1;
            next.style.display = 'block';
            next.style.visibility = 'visible';
            requestQuote.style.opacity = 0;
          } else if (slideIndex % 3 == 0) {
            next.style.opacity = 0;
            next.style.display = 'none';
            next.style.visibility = 'hidden';
            var next1 = next;
            next1.parentNode.removeChild(next1);
            prev.disabled = false;

            requestQuote.style.opacity = 1;
          } else if (slideIndex == 1) {
            prev.disabled = true;
            next.disabled = false;
            next.style.display = 'block';
            next.style.visibility = 'visible';
          }
        });

        next.addEventListener('click', e => {
          this.plusSlides(1);
          if (slideIndex % 3 == 0) {
            next.style.opacity = 0;
            next.style.visibility = 'hidden';
            var next1 = next;
            //next1.parentNode.removeChild(next1);
            requestQuote.style.opacity = 1;
            requestQuote.style.display = 'block';
            prev.disabled = false;
          } else if (slideIndex % 3 != 0) {
            next.style.opacity = 1;
            next.style.visibility = 'visible';
            requestQuote.style.opacity = 0;
            prev.disabled = false;
          } else if (slideIndex == 1) {
            prev.disabled = false;
            next.disabled = false;
          }
        });

        let chosenPlan;
        document.addEventListener('DOMContentLoaded', function(event) {
          if (localStorage.getItem('planSelected')) {
            chosenPlan = localStorage.getItem('planSelected');
          }
        });

        // $(document).ready(function(){
        $('select#driver-option')
          .change(function() {
            $(this)
              .find('option:selected')
              .each(function() {
                console.log(this);
                var optionValue = $(this).attr('value');
                console.log(optionValue);
                if (optionValue == 'self-driven') {
                  //$("div#driver-fields").hide();
                  $('div#self-driven-fields').show();

                  var driveTestCertificate = $('input#drive-test-certificate').attr('value');
                  console.log(driveTestCertificate);
                  if (driveTestCertificate != '') {
                    $('div#drive-test-fields').hide();
                  }

                  //$(".box").not("." + optionValue).hide();
                  //$("." + optionValue).show();
                } else {
                  $('div#self-driven-fields').hide();
                  //$("div#driver-fields").show();
                }
              });
          })
          .change();
        // });

        // document.body.addEventListener('click', function(e){
        //   if(e.target.classList.contains('plan')){
        next.style.opacity = 1;
        next.style.float = 'right';
        prev.style.float = 'left';
        // prev.disabled=false;
        // next.disabled=false

        // }
        // },false);
      }
    }
  }

  indexPageController() {
    if (localStorage.getItem('userToken')) {
      const user = JSON.parse(localStorage.getItem('userToken'));
      console.log(user.user);
      if (user.user.user_type === 'Individual') {
        return PlanCategoryModel.getAllIndividualPlans();
      }
      return PlanCategoryModel.getAllCoperatePlans();
    }
  }

  // Next/previous controls
  plusSlides(n) {
    this.showSlides((slideIndex += n));
  }

  // Thumbnail image controls
  currentSlide(n) {
    this.showSlides((slideIndex = n));
  }

  showSlides(n) {
    var i;
    var slides = document.getElementsByClassName('mySlides');

    var prevB = document.getElementById('previous');
    var nextB = document.getElementById('next');
    prevB.disabled = true;
    nextB.disabled = true;

    if (slideIndex == 1) {
      console.log(window.planClicked);
      if (window.planClicked) {
        //global var
        nextB.disabled = false;
      }
    } else if (slideIndex == 2) {
      prevB.disabled = false;
      nextB.disabled = true;
      if (carClickedCount >= 3) {
        nextB.disabled = false;
      }
    } else if (slideIndex == 3) {
      prevB.disabled = true;
    }

    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    var index = slideIndex - 1;
    slides[index].style.display = 'block';
    slides[index].style.opacity = 1;
  }

  saveItinerary() {
    if (localStorage.getItem('userToken')) {
      const user = JSON.parse(localStorage.getItem('userToken'));
      let dformat;
      var date = new Date();
      var dateStr =
        ('00' + (date.getMonth() + 1)).slice(-2) +
        '-' +
        ('00' + date.getDate()).slice(-2) +
        '-' +
        date.getFullYear(); //+ "-" +
      // ("00" + date.getHours()).slice(-2) + ":" +
      // ("00" + date.getMinutes()).slice(-2) + ":" +
      // ("00" + date.getSeconds()).slice(-2);

      //if() --- //if user plan is individual make sure 3 cars are selected before submitting

      let guid = guidGenerator();
      let PLAN_ID = 'CMT-PLAN-' + user.user.account_num + dateStr;

      document.getElementById('drive-test-certificate').value = user.user.test_certificate;

      document.body.addEventListener('click', function(e) {
        if (e.target.id == 'submitItinerary') {
          e.preventDefault();
          prev.disabled = true;

          const userOnline = JSON.parse(localStorage.getItem('userToken'));

          insertAfter(requestQuote, document.getElementById('placeme'));

          var notification = alertify.notify(
            'The Plan and cars selected for these itineraries cant be modified on submit.',
            'success',
            5,
            function() {
              console.log('dismissed');
            },
          );

          var location2a = document.getElementById('location').value;
          var destination = document.getElementById('destination').value;
          var testCert = document.getElementById('drive-test-certificate').value;
          var startDate = document.getElementById('start').value;
          var endDate = document.getElementById('end').value;
          var driverOpt = document.getElementById('driver-option');
          const optDriver = driverOpt.options[driverOpt.selectedIndex].text;
          var certDate = document.getElementById('datepicker').value;
          var travelOpt = document.getElementById('traveloption');
          const optTraveler = travelOpt.options[travelOpt.selectedIndex].text;
          var noHrs = document.getElementById('no_hrs').value;
          var plan_name = document.getElementById('plan_name').value;
          var plancategory = document.getElementById('plan_category').value;

          var driverSchOpt = document.getElementById('driving-school');
          const driving_school = driverSchOpt.options[driverSchOpt.selectedIndex].text;

          if (driverOpt == 'i would like a driver') {
            certDate = '';
          }

          if (!startDate.length) {
            var notification = alertify.notify(
              'Please Enter a date for this itinerary.',
              'error',
              5,
              function() {
                console.log('dismissed');
              },
            );
            return false;
          }

          if (!endDate.length) {
            var notification = alertify.notify(
              'Please enter a time for the pick up.',
              'error',
              5,
              function() {
                console.log('dismissed');
              },
            );
            return false;
          }

          noHrs = noHrs || 2;
          planList.push(noHrs);

          var carsSelected = carList;
          var planChosen = planList;

          localStorage.setItem('plan', JSON.stringify(planList));
          localStorage.setItem('cars', JSON.stringify(carsSelected));
          // localStorage.setItem('duration',noHrs);

          // console.log(carsSelected);
          // console.log(planChosen)

          var plansetIt = JSON.parse(localStorage.getItem('plan'));

          var start_location = location2a;
          userPlanItineries = {
            plan_category: plansetIt[2],
            plan_id: PLAN_ID,
            plan_name: plansetIt[1],
            status: 'Pending',
            certificate_id: testCert || 'no-test-cert',
            start_location: location2a,
            destination: destination,
            no_hours: noHrs || plansetIt[3],
            start_time: startDate,
            end_time: endDate,
            pickup_time: endDate,
            drive_option: optDriver,

            user_id: user.user.id,
            travel_option: optTraveler,

            drivingschool: driving_school,
            carsSelected,
            planChosen,
            username: user.user.username,
            email: user.user.email,
            phone_number: user.user.phoneNumber,
          };

          if (certDate.length) {
            const userDriveTestData = {
              username: user.user.username,
              email: user.user.email,
              phone_number: user.user.phoneNumber,
              car_id: carsSelected[0].plate_number,
              status: 'Pending',
              description: driving_school,
              time: driving_school,
              createdDate: certDate,
            };

            let drvUrl = baseUrl + '/add-drive-test-for-user';

            if (carList.length >= 3) {
              createUserDriveTestDetail(drvUrl, userDriveTestData);
            } else {
              return false;
            }
          }

          if (carList.length >= 3) {
            if (WebsitePlanCategory.validationFails(userPlanItineries) == true) {
              return false;
            }

            ItineraryList.push(userPlanItineries);

            localStorage.setItem('itins', JSON.stringify(ItineraryList));

            allNewItineraries = userPlanItineries; //JSON.parse(localStorage.getItem('itins'));

            var _tr;
            var dated = new Date(startDate);
            _tr = `<tr id="trip${userPlanItineries.plan_id}"> 
                <td>${formatDate(dated) + ' ' + endDate}</td>
                <td>${start_location}</td>
                <td>${destination}</td>
                <td>${optDriver}</td>
                <td>
                  <a onclick="deleteItinerary(this)" id="${
                    userPlanItineries.plan_id
                  }" href="#" data-id="${
              userPlanItineries.plan_id
            }" data-id=""  data-driver_option="${optDriver}"  data-start_time="" data-start_location="${start_location}" data-destination="${destination}" class="table-action-btn md-trigger" ><i style="color:red"  class="md md-delete"></i></a>    
                  </td>
                </tr>`;
            $(_tr)
              .hide()
              .insertAfter('#startPoint')
              .fadeIn('slow');

            // console.log(ItineraryList,mainUrl)

            let it_url = mainUrl + `/itinerary/${userOnline.user.email}/user`;
            return fetch(it_url, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': userOnline.token,
              },
              body: JSON.stringify(userPlanItineries),
              mode: 'cors',
            })
              .then(response => response.json())
              .then(data => {
                console.log(data);

                document.getElementById('location').value = '';
                document.getElementById('destination').value = '';
                document.getElementById('drive-test-certificate').value = '';
                document.getElementById('start').value = '';
                document.getElementById('end').value = '';

                document.getElementById('datepicker').value = '';

                var noHrs = (document.getElementById('no_hrs').value = '');

                var notification = alertify.notify(
                  'Itinerary added succesfully.',
                  'success',
                  5,
                  function() {
                    console.log('dismissed');
                  },
                );
              })
              .catch(e => {
                console.log(e);

                var notification = alertify.notify(
                  'Could not add itinerary to cart.',
                  'error',
                  5,
                  function() {
                    console.log('dismissed');
                  },
                );
              });
          } else {
            var notification = alertify.notify(
              'You must Select at least 3 cars.',
              'error',
              5,
              function() {
                console.log('dismissed');
              },
            );
            return false;
          }
        } //target if
      });

      WebsitePlanCategory.saveNewPlan(PLAN_ID);
    } //main if
    //
  }

  static saveNewPlan(PLAN_ID) {
    document.body.addEventListener('click', function(e) {
      const userOnline = JSON.parse(localStorage.getItem('userToken'));
      if (e.target.id == 'requestQuote') {
        e.preventDefault();

        var planset = JSON.parse(localStorage.getItem('plan'));
        var carsss = JSON.parse(localStorage.getItem('cars'));
        var duration = JSON.parse(localStorage.getItem('duration'));
        var iti = JSON.parse(localStorage.getItem('itins'));

        console.log(JSON.stringify(iti), 'hello');
        total = Number(planset[0]);
        var no_hourss;

        if (ItineraryList.length) {
          no_hourss = iti.no_hours || 12;
        }

        var usersPlan = {
          plan_id: PLAN_ID,
          itineraries: iti,
          user_id: Number(userOnline.user.id),
          carsSelected: carList,
          planName: planset[1],
          price: 'Pending',
          planCategoryName: planset[2],
          status: 'Pending',
          no_hours: iti.no_hours || planset[3],
          duration: no_hourss,

          username: userOnline.user.username,
          email: userOnline.user.email,
          phone_number: userOnline.user.phoneNumber,
        };

        console.log(userPlanItineries);
        let it_url = mainUrl + `/plans/${userOnline.user.id}/user`;
        fetch(it_url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': userOnline.token,
          },
          body: JSON.stringify(usersPlan),
          mode: 'cors',
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);

            var notification = alertify.notify(
              'Plan has been added successfully. Syncronization initiated , please wait...',
              'success',
              10,
              function() {
                console.log('dismissed');
              },
            );

            let data_msg = ' ' + userOnline.user.username + ' ';
            data_msg += 'has  subscribed to the plan ' + PLAN_ID + 'on our platform.';
            data_msg += 'Please prepare a quotation for the user.';

            let notification_url = baseUrl + '/notification';

            let dataNotification = {
              user_id: userOnline.user.email,
              type: 'payment',
              description: data_msg,
              for_users: false,
            };

            //craete notification and update status to ongoing
            postNotification(notification_url, dataNotification);

            setTimeout(() => {
              window.location.href = './dashboard';
            }, 8000);

            //localStorage.removeItem('duration')
            // localStorage.removeItem('plan')
            // localStorage.removeItem('cars')
            // localStorage.removeItem('itins')
          })
          .catch(e => {
            console.log(e);
            var notification = alertify.notify(e, 'error', 5, function() {
              console.log('dismissed');
            });
          });
      }
    });
  }

  static validationFails(planItineries) {
    let validationFails = false;

    const {
      // start_location,
      // destination,
      // testCert,
      // startDate,
      // endDate,
      // optDriver,
      // certDate,
      // optTraveler,
      // noHrs,
      // carsSelected,
      // planName,
      // price

      plan_category,
      plan_name,
      status,
      certificate_id,
      start_location,
      destination,
      no_hours,
      start_time,
      end_time,
      drive_option,
      user_id,
      travel_option,
      carsSelected,
      drivingschool,
    } = planItineries;

    if (start_location.length <= 0) {
      validationFails = true;
      console.log('location err');
      var notification = alertify.notify('location is required', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    if (destination.length <= 0) {
      validationFails = true;
      console.log('dest err');
      var notification = alertify.notify('destination is required', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    if (start_time.length <= 0) {
      validationFails = true;
      document.getElementById('msg').innerHTML = 'start date required';
      console.log('startdate err');
      var notification = alertify.notify('start date required', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    if (end_time.length <= 0) {
      validationFails = true;
      console.log('enddate err');
      //document.getElementById("msg").innerHTML="end date is required"
      var notification = alertify.notify('end date is required', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    if (drive_option.length <= 0) {
      validationFails = true;
      console.log('optD err');

      var notification = alertify.notify('drive option is required', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    if (no_hours.length <= 0) {
      validationFails = true;
      var notification = alertify.notify('Duration required', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    if (travel_option.length <= 0) {
      validationFails = true;
      console.log('optT err');
      var notification = alertify.notify('travel option required', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    if (travel_option == 'Select City Option') {
      validationFails = true;
      var notification = alertify.notify('Select a travel option plan', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    // if(planName.length<=0){
    //   validationFails = true
    //   console.log("planname err")
    //   setTimeout(()=>{
    //     document.getElementById("msg").innerHTML="";
    //    },3000)
    // }

    // if( price.length<=0){
    //   validationFails = true
    //   console.log("price err")
    //   setTimeout(()=>{
    //     document.getElementById("msg").innerHTML="";
    //    },3000)
    // }

    if (carsSelected.length <= 0) {
      validationFails = true;
      var notification = alertify.notify(
        'You did not choose atleast one  of the 3 cars requested for you to create this plan.',
        'error',
        5,
        function() {
          console.log('dismissed');
        },
      );
    }
    return validationFails;
  }
}

export default WebsitePlanCategory;
