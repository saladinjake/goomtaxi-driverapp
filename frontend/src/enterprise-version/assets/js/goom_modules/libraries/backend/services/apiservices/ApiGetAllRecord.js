'use strict';
import GateKeepersForUser from './helpers/whois';
import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';
import FetchPromiseApi from './helpers/FetchPromiseApi';

let activeUrl = getOnlineUrlConnection();
let baseUrl = getOnlineUrlConnection();

//const redflagUrl = activeUrl + '/interventions';

class ApiGetAllRecord {
  static getData(urlType) {
    GateKeepersForUser();
    if (urlType == 'sos') {
      activeUrl = activeUrl + urlType;
    }
    activeUrl = activeUrl + urlType;
    const user = JSON.parse(localStorage.getItem('userToken'));
    return fetch(activeUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
        //'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors',
    })
      .then(response => response.json())

      .then(data => {
        let dummyData = false;
        let allData = [];
        //console.log(data)
        if (data.status === 200) {
          //console.log(data);
          let recordList;
          if (data.data[0].intervention) {
            recordList = data.data[0].intervention;
            for (let rec of recordList) {
              console.log('hello ' + rec);
              Object.keys(rec).forEach(function(item) {
                if (!rec.reportType) {
                  rec.reportType = 'create-ticket';
                }
              });
            }

            console.log(JSON.stringify(data.data[0].intervention) + ' is this');

            return recordList;
          } else if (data.data[0].redFlag) {
            recordList = data.data[0].redFlag;
            for (let rec of recordList) {
              console.log('hello ' + rec);
              Object.keys(rec).forEach(function(item) {
                if (!rec.reportType) {
                  rec.reportType = 'sos';
                }
              });
            }

            return recordList;
          }
        } else {
          //console.log("3)" + data.data[0].intervention)
          //window.location.href = './';
        }
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
}

export default ApiGetAllRecord;
