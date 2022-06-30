'use strict';
import Router from '../../../core/Router';
import GateKeepersForUser from './helpers/whois';
import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';
import MessageBoard from '../../../core/MessageBoard';
import FetchPromiseApi from './helpers/FetchPromiseApi';
//import sweet animations and sweet loading effects

let activeUrl = getOnlineUrlConnection();
let baseUrl = getOnlineUrlConnection();

class ApiDeleteOneStatusRecord {
  static redirect(TypeOfReport) {
    if (TypeOfReport === 'red-flag') {
      window.location.href = TypeOfReport + '.html';
    } else {
      window.location.href = 'interventions.html';
    }
  }
  static deleteDataById() {
    GateKeepersForUser();
    let linkOfApi;
    const user = JSON.parse(localStorage.getItem('userToken'));
    let activeUrl = getOnlineUrlConnection();

    const clickedId = localStorage.getItem('Id');
    const recordType = localStorage.getItem('reportType');
    if (recordType === 'sos') {
      linkOfApi = activeUrl + `/sos/${clickedId}/status`;
    } else if (recordType === 'create-ticket') {
      linkOfApi = activeUrl + `/feedback/${clickedId}/status`;
    } else if (recordType === 'mechanic') {
      linkOfApi = activeUrl + `/mechanic/${clickedId}/status`;
    } else if (recordType === 'users') {
      linkOfApi = activeUrl + `/users/${clickedId}`;
    }

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

export default ApiDeleteOneStatusRecord;
