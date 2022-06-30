'use strict';
import Router from '../../../core/Router';
import MessageBoard from '../../../core/MessageBoard';
import FetchPromiseApi from './helpers/FetchPromiseApi';
import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';
import GateKeepersForUser from './helpers/whois';
let activeUrl = getOnlineUrlConnection();
let baseUrl = getOnlineUrlConnection();
alertify.set('notifier', 'position', 'top-left');
let sosUrl = activeUrl + '/sos';

class ApiSOSService {
  static saveSOSRequest(user) {
    GateKeepersForUser();

    if (localStorage.getItem('userToken')) {
      let users = JSON.parse(localStorage.getItem('userToken'));

      // if(document.getElementById('drivers-sos')){
      //   sosUrl = activeUrl + '/drivers-sos';
      // }

      //alert(sosUrl)

      fetch(sosUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': users.token,
        },
        mode: 'cors',
        body: JSON.stringify(user),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 422) {
            //MessageBoard.displayMsg('server error: ' + data.error);
            //var notification = alertify.notify(data.error, 'error', 5, function(){  console.log('dismissed'); });
          } else if (data.status === 200) {
            // MessageBoard.displayMsg("Your sos request has been sent.");
            var notification = alertify.notify(
              'Your sos request has been sent.',
              'success',
              5,
              function() {
                console.log('dismissed');
              },
            );
            window.location.href = './sos-history';
          } else {
            // MessageBoard.displayMsg(data.error);
            //var notification = alertify.notify(data.error, 'error', 5, function(){  console.log('dismissed'); });
            // Router.redirect('login.html');
          }
        })
        .catch(error => {
          throw error;
        });
    }
  }
}

export default ApiSOSService;
