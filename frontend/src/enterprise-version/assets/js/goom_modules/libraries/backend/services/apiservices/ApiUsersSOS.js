'use strict';
import GateKeepersForUser from './helpers/whois';
import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';
import FetchPromiseApi from './helpers/FetchPromiseApi';

let activeUrl = getOnlineUrlConnection();
let baseUrl = getOnlineUrlConnection();

function searchTable() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById('foo-table-input');
  filter = input.value.toUpperCase();
  table = document.getElementById('demo-foo-pagination');
  tr = table.getElementsByTagName('tr');

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
}

class ApiUsersSOS {
  static getDataById() {
    GateKeepersForUser();
    const user = JSON.parse(localStorage.getItem('userToken'));
    let recordUrl;
    const reportId = localStorage.getItem('Id');

    recordUrl = activeUrl + `/sos/${user.user.account_num}/users`;

    //alert(recordUrl)

    console.log('specific url: ' + recordUrl);

    //window.addEventListener('load', (event) => {
    //event.preventDefault();
    return fetch(recordUrl, {
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
          const records = data.data[0].redFlags;
          document.getElementById('foo-table-input').addEventListener('keyup', e => {
            searchTable();
          });

          return records;
        }
      })
      .catch(error => {
        throw error;
      });
    //});
  }
}
export default ApiUsersSOS;
