'use strict';
import GateKeepersForUser from './helpers/whois';
import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';
import FetchPromiseApi from './helpers/FetchPromiseApi';

let activeUrl = getOnlineUrlConnection();
let baseUrl = getOnlineUrlConnection();

class ApiUpdateStatusRecord {
  static updateOneStatus() {
    GateKeepersForUser();
    document.getElementById('errorMsg').innerHTML = '';
    let linkOfApi;
    let newStatus;
    const user = JSON.parse(localStorage.getItem('userToken'));

    const reportId = localStorage.getItem('Id');
    const reportType = localStorage.getItem('reportType');
    if (reportType === 'red-flag') {
      linkOfApi = activeUrl + `/red-flags/${reportId}/status`;
    } else if (reportType === 'intervention') {
      linkOfApi = activeUrl + `/interventions/${reportId}/status`;
    }

    const select = document.getElementById('selectStatus');
    const statusType = select.options[select.selectedIndex].value;

    if (statusType === 'under investigation') {
      newStatus = 'under investigation';
    } else if (statusType === 'resolved') {
      newStatus = 'resolved';
    } else if (statusType === 'rejected') {
      newStatus = 'rejected';
    } else if (statusType === 'draft') {
      newStatus = 'draft';
    }

    const statusData = {
      status: newStatus,
    };

    fetch(linkOfApi, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      mode: 'cors',
      body: JSON.stringify(statusData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          loader.style.display = 'none';
          console.log(data);
          document.getElementById('selectStatus').options[select.selectedIndex].value = newStatus;
        } else {
          document.getElementById('errorMsg').style.color = 'red';
          document.getElementById('errorMsg').style.textAlign = 'center';
          document.getElementById('errorMsg').innerHTML = 'Admin rights required';
        }
      });
  }
}

export default ApiUpdateStatusRecord;
