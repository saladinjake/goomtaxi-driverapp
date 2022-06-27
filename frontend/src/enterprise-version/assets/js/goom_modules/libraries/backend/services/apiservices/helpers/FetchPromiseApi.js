'use strict';
const FetchPromiseApi = (Apilink, ExecutionMethod, BodyToSend, token) => {
  if (BodyToSend == null) {
    return fetch(Apilink, {
      method: ExecutionMethod,
      headers: {
        'Accept ': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      mode: 'cors',
    }).then(response => response.json());
  } else if (BodyToSend && token != null) {
    return fetch(Apilink, {
      method: ExecutionMethod,
      headers: {
        'Accept ': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      mode: 'cors',
      body: JSON.stringify(BodyToSend),
    }).then(response => response.json());
  } else {
    // sign in or sign up case when user hasn't existed
    return fetch(Apilink, {
      method: ExecutionMethod,
      headers: {
        'Accept ': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(BodyToSend),
    }).then(response => response.json());
  }
};

export default FetchPromiseApi;
