import $ from 'jquery';

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + ' '; //+ strTime;
}
export default class Logger {
  constructor() {}

  static sendLogInfo(
    adminEntity,
    userEntity,
    ModuleEntity,
    messageType,
    status,
    MethodType = 'ACTION TRIGGER',
    log = 'A',
  ) {
    let logMessage = ``;
    if (log.length > 3) {
      logMessage = log;
    } else {
      if (userEntity != '') {
        if (MethodType == 'GET') {
          logMessage = `Fetch Record by ${adminEntity.user.username} for the Api resource `;
        } else if (MethodType == 'POST') {
          logMessage = `Post Record by ${
            adminEntity.user.username
          } operation regarding resource/entity for ${userEntity} on ${formatDate(new Date())} `;
        } else if (MethodType == 'PUT') {
          logMessage = `Edit Record by ${adminEntity.user.username} operation  on ${formatDate(
            new Date(),
          )} has a  labeled status of ${messageType} `;
        } else if (MethodType == 'DELETE') {
          logMessage = `Delete Record ${adminEntity.user.username} operation on ${formatDate(
            new Date(),
          )} has status ${messageType} .`;
        }
      } else {
        logMessage = `${adminEntity.user.username} operation on ${formatDate(
          new Date(),
        )} with status ${messageType} `;
      }
    }

    let prePostData = {
      date: formatDate(new Date()),
      admin: 'Admin',
      avatar: 'https://Goom Logistics-bucket.s3.amazonaws.com/' + adminEntity.user.profile,
      user: userEntity,
      module_name: ModuleEntity,
      status,
      message_type: messageType,
      logMessage,
    };

    let linkOfApi = process.env.DEPLOY_BACK_URL + '/log-audit';
    const user = JSON.parse(localStorage.getItem('userToken'));
    fetch(linkOfApi, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      body: JSON.stringify(prePostData),
      mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status == 201) {
          // ApiDeleteOneStatusRecord.redirect(recordOfType);
        } else {
          var notification = alertify.notify(
            'Failed operation. Audit Trailing unsuccessful.',
            'error',
            15,
            function() {
              console.log('dismissed');
            },
          );
        }
      })
      .catch(e => console.log(e));
  }
}
