'use strict';
import GateKeepersForUser from './helpers/whois';
import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';
import FetchPromiseApi from './helpers/FetchPromiseApi';

let activeUrl = getOnlineUrlConnection();
let baseUrl = getOnlineUrlConnection();

class ApiGetAllFaqs {
  static getAllFaqs() {
    GateKeepersForUser();
    const user = JSON.parse(localStorage.getItem('userToken'));
    let recordUrl;
    
      recordUrl = activeUrl + `/faqs`;
      
  
    console.log('specific url: ' + recordUrl);

    return fetch(recordUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          const records = data;
          
          return records;
        }
      })
      .catch(error => {
        throw error;
      });
    //});
  }
}
export default ApiGetAllFaqs;
