'use strict';
import GateKeepersForUser from './helpers/whois';
import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';
import FetchPromiseApi from './helpers/FetchPromiseApi';

let activeUrl = getOnlineUrlConnection();
let baseUrl = getOnlineUrlConnection();


class ApiGetBothRecord {
  

  static getLoggedInUser() {
    const user = JSON.parse(localStorage.getItem('userToken'));
    if (!user) {
      return false;
    }
    console.log(JSON.stringify(user));
    return user;
  }
  static getData() {
    //event.preventDefault();
    GateKeepersForUser();

    const urls = [activeUrl + '/feedback', activeUrl + '/sos'];
    //console.log('Token:  ' + ApiGetBothRecord.getLoggedInUser().token);
    const promises = urls.map(url =>
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': ApiGetBothRecord.getLoggedInUser().token,
        },
      }).then(response => response.json()),
    );
    return Promise.all(promises);
  }
}
export default ApiGetBothRecord;
