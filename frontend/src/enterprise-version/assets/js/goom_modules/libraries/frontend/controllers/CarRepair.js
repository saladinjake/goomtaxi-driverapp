'use strict';
import View from '../views/View';
import RepairModel from '../models/RepairsModel';
import setConfigData from '../helpers/localStorageData';
import $ from 'jquery';

import getApiUrl from '../../backend/services/apiservices/helpers/getOnlineUrlConnection';
let baseUrl = getApiUrl();

var sortBy = (function() {
  var toString = Object.prototype.toString,
    // default parser function
    parse = function(x) {
      return x;
    },
    // gets the item to be sorted
    getItem = function(x) {
      var isObject = x != null && typeof x === 'object';
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
  return function sortby(array, cfg) {
    if (!(array instanceof Array && array.length)) return [];
    if (toString.call(cfg) !== '[object Object]') cfg = {};
    if (typeof cfg.parser !== 'function') cfg.parser = parse;
    cfg.desc = !!cfg.desc ? -1 : 1;
    return array.sort(function(a, b) {
      a = getItem.call(cfg, a);
      b = getItem.call(cfg, b);
      return cfg.desc * (a < b ? -1 : +(a > b));
    });
  };
})();

function searchTable(trId = 0) {
  // $(document).ready(function(){

  // Search all columns
  $('#foo-table-input').keyup(function() {
    // Search Text
    var search = $(this).val();

    // Hide all table tbody rows
    $('table tbody tr').hide();

    // Count total search result
    var len = $('table tbody tr:not(.notfound) td:contains("' + search + '")').length;

    if (len > 0) {
      // Searching text in columns and show match row
      $('table tbody tr:not(.notfound) td:contains("' + search + '")').each(function() {
        $(this)
          .closest('tr')
          .show();
      });
    } else {
      //$('.notfound').show();
    }
  });

  // // });

  // // Case-insensitive searching (Note - remove the below script for Case sensitive search )
  $.expr[':'].contains = $.expr.createPseudo(function(arg) {
    return function(elem) {
      return (
        $(elem)
          .text()
          .toUpperCase()
          .indexOf(arg.toUpperCase()) >= 0
      );
    };
  });
}

//get-cars-info-use

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + strTime;
}
alertify.set('notifier', 'position', 'top-left');

function hasClass(el, classname) {
  return el.classList.contains(classname);
}

window.getIdRepair = item => {
  var that = item;

  if (document.getElementById('car-repair')) {
    localStorage.setItem('Id', item.dataset.id);
    localStorage.setItem('reportType', 'mechRequest');
    // let dataPromise =  RepairModel.getSpecificData();
    // dataPromise.then(data => {
    const user = JSON.parse(localStorage.getItem('userToken'));

    console.log(item.dataset);
    let firstname = document.getElementById('field-1');
    let lastname = document.getElementById('field-2');
    let email = document.getElementById('field-3');
    let location = document.getElementById('field-4');
    let carbrand = document.getElementById('field-5');
    let id = document.getElementById('field-6');
    let description = document.getElementById('field-7');

    location.value = item.dataset.location;
    firstname.value = item.dataset.firstname;
    lastname.value = item.dataset.lastname;
    email.value = item.dataset.email;
    description.value = item.dataset.description;
    carbrand.value = item.dataset.carbrand;
    let ids = item.dataset.id;
    id.disabled = true;
    id.value = ids;

    const record = {
      user_id: user.user.id,
      firstname: item.dataset.firstname,
      lastname: item.dataset.lastname,
      email: item.dataset.email,
      description: item.dataset.description,
      carbrand: item.dataset.carbrand,
      id: ids,
      location: item.dataset.location,
      recordType: 'mechRequest',
    };

    document.getElementById('title-header').innerHTML = 'Editing Record of id:' + ids;
    //update modal form on submit....
    document.body.addEventListener('click', e => {
      e.preventDefault();
      if (hasClass(e.target, 'update')) {
        RepairModel.updateOneRecord(record);
      }
    });
  }
};

class IReporterWebsiteRepairs {
  constructor() {}

  attachEvents() {
    console.log('calling feedback intervention controller');
    if (document.getElementById('car-repair')) {
      const user = JSON.parse(localStorage.getItem('userToken'));

      document.getElementById('firstname').value = user.user.firstname;
      document.getElementById('lastname').value = user.user.username;
      document.getElementById('email').value = user.user.email;
      var loc = document.getElementById('findme');
      var options = {
        types: ['geocode'],
        componentRestrictions: { country: 'NG' },
      };

      var autocomplete3 = new google.maps.places.Autocomplete(loc, options);
      google.maps.event.addListener(autocomplete3, 'place_changed', function() {
        //startLoc = autocomplete3.getPlace();
        // document.getElementById('city2').value = place.name;
        // document.getElementById('cityLat').value = place.geometry.location.lat();
        // document.getElementById('cityLng').value = place.geometry.location.lng();
      });

      this.saveNewRecordPageController();
    } else if (document.getElementById('fetched-data-repair')) {
      this.indexPageController();
      console.log('cant find where to load data');
    }

    if (document.getElementById('car-repair')) {
      if (localStorage.getItem('userToken')) {
        let user = JSON.parse(localStorage.getItem('userToken'));
        fetch(baseUrl + '/get-cars-info-user', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': user.token,
          },
          mode: 'cors',
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            //if (data.status === 200) {
            let modelNameOptionX = [];
            let cars = data.data[0].carInfo;
            console.log(cars);

            cars.map(item => {
              modelNameOptionX.push(item.car_name);
            });

            modelNameOptionX = [...new Set(modelNameOptionX)];

            console.log(modelNameOptionX);

            let modelNameOption = ``;

            modelNameOptionX.map(item => {
              modelNameOption += `<option>${item}</option>`;
            });

            // document.getElementById('carbrand').innerHTML=modelNameOption
            $('#carbrand').append(modelNameOption);

            // }
          })
          .catch(error => {
            throw error;
          });
      }
    }
  }
  static hasClass(el, classname) {
    return el.classList.contains(classname);
  }

  static render(items) {
    document.getElementById('foo-table-input').addEventListener('keyup', e => {
      searchTable();
    });

    const recordItems = document.getElementById('fetched-data-repair');
    const user = JSON.parse(localStorage.getItem('userToken'));
    let eachRecord;
    let className;
    if (items.length === 0) {
      recordItems.innerHTML = 'No records Yet';
      recordItems.style.textAlign = 'center';
      recordItems.style.fontSize = '32px';
      recordItems.style.font = 'bold';
    } else {
      items = sortBy(items, {
        prop: 'created_at',
        desc: true,
        parser: d => new Date(d),
      });

      items.forEach(item => {
        if (item.status == 'Completed') {
          className = 'label-success';
        } else if (item.status == 'Ongoing') {
          className = 'label-danger';
        } else {
          className = 'label-warning';
        }

        var loc = item.location.split(',');
        var lat = loc[0];
        var long = loc[1];

        eachRecord = `
           <tr>
              <td class=""><a href="#">CMT-USER-${user.user.account_num}</a></td>
              <td class="">${item.location}</td>
              <td class="">${item.carbrand}</td>
              <td class="">${formatDate(new Date(item.created_at))}</td>
              <td class=""><span class="label ${className}">${item.status}</span></td>
                     </tr>
    `;
        recordItems.innerHTML += eachRecord;
        //   <td><a data-email="${item.carbrand}" data-firstname="${item.firstname}" data-lastname="${item.lastname}" data-location="${item.location}" data-description="${item.description}" data-userid="${user.user.id}" data-points="-1" data-type="mechRequest" className="btn btn-primary waves-effect waves-light table-action-btn read_more md-trigger" data-toggle="modal" data-target="#con-close-modal"  href=""  data-carbrand="${item.carbrand}"  data-id="${item.id}" onclick="getIdRepair(this)"><i class="md md-edit"></i></a>
        //      </td>
      });
    }
  }

  indexPageController() {
    let that = this;
    let dataPromise = RepairModel.getUsersRepairs();

    console.log(dataPromise);

    dataPromise
      .then(data => {
        console.log(data.data[0].mechRequest);
        IReporterWebsiteRepairs.render(data.data[0].mechRequest);
      })
      .catch(err => console.log(err));
  }

  saveNewRecordPageController() {
    let documentDom = document;

    documentDom.addEventListener(
      'click',
      e => {
        if (IReporterWebsiteRepairs.hasClass(e.target, 'new_content')) {
          e.preventDefault();
          console.log('called');
          return RepairModel.saveRepairs();
        }
      },
      false,
    );
  }

  static editRecord(record) {}
}

/*
      Function to carry out the actual PUT request to S3 using the signed request from the app.
    */
function uploadFile(file, signedRequest, url) {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var notification = alertify.notify('image upload success.', 'success', 5, function() {
          console.log('dismissed');
        });
      } else {
        var notification = alertify.notify('Image upload error.', 'error', 5, function() {
          console.log('dismissed');
        });
      }
    }
  };
  xhr.send(file);
}

/*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
function getSignedRequest(file) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', baseUrl + `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
  xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedRequest, response.url);
      } else {
        alert('Could not get signed URL.');
      }
    }
  };
  xhr.send();
}

/*
     Function called when file input updated. If there is a file selected, then
     start upload procedure by asking for a signed request from the app.
    */
function initUpload() {
  const files = document.getElementById('image-file').files;
  const file = files[0];
  if (file == null) {
    return alert('No file selected.');
  }
  getSignedRequest(file);
}

/*
     Bind listeners when the page loads.
    */

if (document.getElementById('car-repair')) {
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('image-file').onchange = initUpload;
  });
}

export default IReporterWebsiteRepairs;
