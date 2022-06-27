'use strict';



//"http://localhost:12000/api/v1"

const localUrl = "https://goomtaxibackendapi/api/v1"  || "https://goomtaxibackendapi/api/v1"//process.env.DEPLOY_BACK_URL;
const serverUrl = localUrl;
let resolvedUrl;
function getOnlineUrlConnection() {

  return localUrl;
}

let data = getOnlineUrlConnection();
console.log('data is :' + data);
export default getOnlineUrlConnection;
