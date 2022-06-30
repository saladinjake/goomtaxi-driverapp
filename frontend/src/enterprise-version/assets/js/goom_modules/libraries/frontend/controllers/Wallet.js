import WebsiteLogin from '../../core/Login';
import WalletModel from '../models/WalletModel';

import getApiUrl from '../../backend/services/apiservices/helpers/getOnlineUrlConnection';
let baseUrl = getApiUrl();
let accountBalance;

const postUrl = baseUrl + '/paystack/pay';
alertify.set('notifier', 'position', 'top-left');
('use strict');

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

function setOldBalance(balance) {
  if (localStorage.getItem('userToken')) {
    const user = JSON.parse(localStorage.getItem('userToken'));
    return fetch(baseUrl + '/old_balance/' + user.user.email, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      mode: 'cors',
      body: JSON.stringify({ old_balance: balance }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          var notification = alertify.notify('Wallet balance set.', 'success', 5, function() {
            console.log('dismissed');
          });
        }
      })
      .catch(error => {
        throw error;
      });
  }
}

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

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear(); //+ " " + strTime;
}

function numberWithCommas(x) {
  // if(typeof(x)=='string'){
  //    var parts = x.split(".");
  //   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   return parts.join(".");
  // }else{
  //   var parts = x.toString().split(".");
  // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // return parts.join(".");
  // }
  return x;
}

function formatAmount(x) {
  if (typeof x == 'string') {
    var parts = x.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  } else {
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
}
class Ewallet {
  constructor() {}

  static render(items) {
    const user = JSON.parse(localStorage.getItem('userToken'));
    const recordItems = document.getElementById('fetched-data-transactions');
  }

  static hasClass(el, classname) {
    return el.classList.contains(classname);
  }

  static getBalance() {
    if (document.getElementById('wallet-page')) {
      if (localStorage.getItem('userToken')) {
        const user = JSON.parse(localStorage.getItem('userToken'));
        return fetch(baseUrl + '/balance/' + user.user.email, {
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
            if (data.status === 200) {
              console.log(data);

              // if(user.user.roles!='user'){
              //       document.getElementById("balance").style.display="none"
              //       document.getElementById("new-balance").style.display="none"
              // }else{
              document.getElementById('balance').innerHTML =
                '₦ ' + numberWithCommas(data.data[0].accountBalance);
              // document.getElementById('balance-seen').innerHTML = '₦ '+ formatAmount(data.data[0].accountBalance);
              document.getElementById('new-balance').innerHTML =
                '₦ ' + numberWithCommas(data.data[0].accountBalance);
              accountBalance = data.data[0].accountBalance;
              user.user.balance = accountBalance;
              localStorage.setItem('userToken', JSON.stringify(user));
              document.getElementById('balance').style.display = 'block';

              // }
            }
          })
          .catch(error => {
            throw error;
          });
      }
    }
  }

  static getTransactions() {
    if (document.getElementById('wallet-page')) {
      if (localStorage.getItem('userToken')) {
        const user = JSON.parse(localStorage.getItem('userToken'));

        return fetch(baseUrl + '/transactions', {
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
            if (data.status === 200) {
              console.log(data);
            }
          })
          .catch(error => {
            throw error;
          });
      }
    }
  }

  attachEvents() {
    //  document.getElementById("demo-foo-search").addEventListener("keyup",(e)=>{
    //   searchTable()
    // })

    if (localStorage.getItem('userToken')) {
      const user = JSON.parse(localStorage.getItem('userToken'));

      // if(user.user.roles!='user'){
      //            document.getElementById("balance").style.display="none"
      //            document.getElementById("new-balance").style.display="none"
      //      }else{

      if (
        !document.getElementById('signup_page') &&
        !document.getElementById('loginpage') &&
        !document.getElementById('pass_forgot_page')
      ) {
        document.getElementById('balance').innerHTML = '₦ ' + numberWithCommas(user.user.balance);
      }

      if (document.getElementById('wallet-page')) {
        document.getElementById('new-balance').innerHTML =
          '₦ ' + numberWithCommas(user.user.balance);
        document.getElementById('field-1').value = user.user.firstname;
        document.getElementById('field-2').value = user.user.email;
        document.getElementById('field-2').style.display = 'none';
        document.getElementById('field-1').style.display = 'none';
        Ewallet.getBalance();

        document.getElementById('balance').innerHTML = '₦ ' + numberWithCommas(user.user.balance);
        document.addEventListener('click', e => {
          if (Ewallet.hasClass(e.target, 'topup')) {
            console.log('top up');
            this.indexPageController();
          }
        });

        // Ewallet.getTransactions();

        const tablebody = document.getElementById('tablebodyx');
        let eachRecord = '';

        let that = this;
        let dataPromise = WalletModel.getUsersTrnx();

        console.log(dataPromise + 'prommise');
        dataPromise
          .then(data => {
            // console.log(data)
            let className = 'label-success';

            data = sortBy(data, {
              prop: 'created_at',
              desc: true,
              parser: d => new Date(d),
            });

            data.map((item, i) => {
              console.log(item.createdDate);
              if (item.status == 'Successful') {
                className = 'label-success';
              } else {
                className = 'label-error';
              }
              eachRecord = `
                              <tr>
                                  <td class=""> ${formatDate(new Date(item.createdDate))} </td>
                                  <td class="">${item.reference}</td>
                                  <td class="">${item.full_name}</td>
                                  <td class="">${item.amount} </td>
                                  <td class="">${item.email}</td>
                                  <td class=""><span class="label ${className}">${
                item.status
              }</span></td>
                                  
                             </tr>`;
              tablebody.insertAdjacentHTML('beforeend', eachRecord);
            });
          })
          .catch(err => console.log(err.msg));

        //}
      }
    }
  }

  indexPageController() {
    //return WalletModel.topUp()
    if (localStorage.getItem('userToken')) {
      const user = JSON.parse(localStorage.getItem('userToken'));

      const fullname = document.getElementById('field-1').value;
      const email = document.getElementById('field-2').value;
      const amount = document.getElementById('field-3').value;
      //const phone_number = document.getElementById('field_4').value

      if (!fullname) {
        console.log('Fullname required');
        var notification = alertify.notify('Fullname required', 'error', 5, function() {
          console.log('dismissed');
        });

        return false;
      }

      if (!email) {
        console.log('email required');
        var notification = alertify.notify('email required', 'error', 5, function() {
          console.log('dismissed');
        });

        return false;
      }

      if (!amount) {
        console.log('enter an amount');
        var notification = alertify.notify('Amount required', 'error', 5, function() {
          console.log('dismissed');
        });

        return false;
      }

      if (isNaN(amount)) {
        var notification = alertify.notify(
          'Enter a valid amount:hint remove comma from the amount entered',
          'error',
          5,
          function() {
            console.log('dismissed');
          },
        );

        return false;
      }

      //let oldbalance =localStorage.getItem('oldbalance')

      const prePostData = {
        fullname,
        email,
        amount,
        phone_number: user.user.phoneNumber,
        //old_balance:oldbalance
      };

      user.user.fullname = fullname;

      localStorage.setItem('userToken', JSON.stringify(user));

      fetch(postUrl, {
        method: 'POST',
        headers: {
          // 'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Headers': 'X-Requested-With,content-type, Authorization',
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
            // console.log('Form submitted succesfully');
            // var notification = alertify.notify('Form submitted succesfully', 'success', 5, function(){  console.log('dismissed'); });
            document.getElementById('relink').innerHTML = data.message;
            document.getElementById('tou_up').style.display = 'none';
            localStorage.setItem('urlType', postUrl);

            setOldBalance(user.user.balance);
          } else if (data.status === 401 || data.status === 403) {
            window.location.href = './';
            document.getElementById('tou_up').style.display = 'block';
          } else {
            //MessageBoard.displayMsg(data.error);
            document.getElementById('tou_up').style.display = 'block';
            var notification = alertify.notify(data.error, 'error', 5, function() {
              console.log('dismissed');
            });
          }
        })
        .catch(error => {
          throw error;
        });
    }
  }
}

export default Ewallet;
