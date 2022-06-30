import SOSModel from '../models/SOSModel';
import $ from 'jquery';

import Recording from './SOSRecorder';
import getApiUrl from '../../backend/services/apiservices/helpers/getOnlineUrlConnection';
let baseUrl = getApiUrl();
const SUCCESS_URL = './sos-history';
const POST_URL = baseUrl + '/sos';
const notification_url = baseUrl + '/notifications';

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

function searchTable(trId = 0) {
  // $(document).ready(function(){

  // Search all columns
  $('#foo-table-input-sos').keyup(function() {
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
  // $.expr[":"].contains = $.expr.createPseudo(function(arg) {
  //    return function( elem ) {
  //      return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
  //    };
  // });
}

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

function GateKeepersForUser() {
  let user;
  // if(JSON.parse(localStorage.getItem('userToken'))){
  user = JSON.parse(localStorage.getItem('userToken'));
  // }
  //back to login
  if (!user) {
    window.location.href = './';
  } else if (user.isVerified === false) {
    window.location.href = './';
  }
}

export default class SOS {
  constructor() {}

  seeAllSOSNotifications() {}

  static index() {}

  attachEvents() {
    if (localStorage.getItem('userToken')) {
      if (document.getElementById('sos-page')) {
        // $("#show-map").hide();
        //  $(document).ready(function() {
        // 	// get location button functionality
        // 	$("#get-location-btn").click(function(event){
        // 		event.preventDefault();
        //
        //        document.getElementById("record").disabled=false;
        //        document.getElementById("record").click()
        // 		$("#hide-on-click").hide();
        // 		$("#show-map").show();
        // 	});
        // });

        new Recording();
      }

      if (document.getElementById('view-sos')) {
        this.indexController();
      }
    } else {
    }
  }

  static render(items) {
    const user = JSON.parse(localStorage.getItem('userToken'));
    const recordItems = document.getElementById('fetched-data-sos');
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
        } else if (item.status == 'Pending') {
          className = 'label-warning';
        } else {
          className = 'label-danger';
        }
        const eachRecord = `
           <tr>
          
               <td class=""><a href="#">CMT-USER-${user.user.account_num}</a></td>
                <td class="">${item.address}</td>
                 
                 <td class="">${formatDate(new Date(item.created_at))}</td>
                   <td class="">
                      <span class="label ${className}">${item.status}</span>
                    </td>
                    
            </tr>

       
    `;

        recordItems.innerHTML += eachRecord;
      });
    }
  }

  indexController() {
    let that = this;
    let dataPromise = SOSModel.getAllUserSOS();

    document.getElementById('foo-table-input').addEventListener('keyup', e => {
      searchTable();
    });

    dataPromise
      .then(data => {
        // let newData = data[0].data[0].redFlags
        SOS.render(data);
      })
      .catch(err => console.log(err));
  }
}

/*
     Bind listeners when the page loads.
    */
