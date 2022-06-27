'use strict';
import GateKeepersForUser from './helpers/whois';
import FetchPromiseApi from './helpers/FetchPromiseApi';
import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';
import MessageBoard from '../../../core/MessageBoard';

let activeUrl = getOnlineUrlConnection();
	let baseUrl = getOnlineUrlConnection();

class ApiUpdateOneRecord {
  static hasClass(el, classname) {
    return el.classList.contains(classname);
  }
  static updateOneRecord(record) {
    GateKeepersForUser();
    let linkOfApi;

    const user = JSON.parse(localStorage.getItem('userToken'));
    const clickedId = localStorage.getItem('Id');
    const reportType = localStorage.getItem('reportType');
    if (reportType === 'mechRequest') {
      linkOfApi = activeUrl + `/mech-request/${clickedId}/update`;
    } else if (reportType === 'intervention') {
      linkOfApi = activeUrl + `/interventions/${clickedId}/update`;
    }
    

    return fetch(linkOfApi, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      mode: 'cors',
      body: JSON.stringify(record),
    }).then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          MessageBoard.displayMsg('Successfully updated request for data mechanic request.' );
        } else {
          console.log('update loc error');
          return MessageBoard.displayMsg('Could not perform Update for mech request');
        }
      });
  }
}

export default ApiUpdateOneRecord;
