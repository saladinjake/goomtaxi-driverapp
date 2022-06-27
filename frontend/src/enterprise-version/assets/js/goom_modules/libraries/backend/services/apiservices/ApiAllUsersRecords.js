'use strict';
import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';
import FetchPromiseApi from './helpers/FetchPromiseApi';

let activeUrl = getOnlineUrlConnection();
let baseUrl = getOnlineUrlConnection();
class ApiAllUsersRecords {
	constructor(){

	}
	static getData(){
      const user = JSON.parse(localStorage.getItem('userToken'));
	  if (!user) {
	    window.location.href = './login.html';
	  }
	  const userId = user.user.id;

	  const links = [
	     activeUrl + `/users/${userId}/feedback`,
	     activeUrl + `/users/${userId}/sos`,
	     activeUrl + `/users/${userId}/mechanic-request`,
	     activeUrl+ `/users/${userId}/plan-history`,
	     activeUrl+ `/users/${userId}/itinerary`,
	     activeUrl+ `/profile/update/${userId}`,
	     
	  ];

	  const promises = links.map(url => fetch(url, {
	    method: 'GET',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json',
	      'x-access-token': user.token
	    }
	  }).then(response => response.json()));
	  return Promise.all(promises);
	}
}

export default ApiAllUsersRecords;