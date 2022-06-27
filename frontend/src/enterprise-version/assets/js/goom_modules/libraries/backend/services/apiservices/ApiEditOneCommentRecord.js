'use strict';
import GateKeepersForUser from './helpers/whois';
import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';
import FetchPromiseApi from './helpers/FetchPromiseApi';

let baseUrl = getOnlineUrlConnection();

class ApiEditOneComment {
  static editOneCommentById() {
    GateKeepersForUser();

    let linkOfApi;

    const user = JSON.parse(localStorage.getItem('userToken'));
    let activeUrl = getOnlineUrlConnection();

    let commentError = document.getElementById('errorMsgComment');

    const clickedId = localStorage.getItem('Id');
    const reportType = localStorage.getItem('reportType');
    if (reportType === 'sos') {
      linkOfApi = activeUrl + `/sos/${clickedId}/comment`;
    } else if (reportType === 'intervention') {
      linkOfApi = activeUrl + `/feedback/${clickedId}/comment`;
    }
    const newComment = document.getElementById('commentEdit').value;

    if (!(newComment && newComment.trim().length)) {
      return (commentError.innerHTML = '<p style="color:red";>Please enter a comment</p>');
    }

    const bodyContent = {
      comment: newComment,
    };
    fetch(linkOfApi, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      mode: 'cors',
      body: JSON.stringify(bodyContent),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          commentError.innerHTML = 'success';
        } else {
          //handle message error
          commentError.innerHTML = 'Could not perform update comment';
        }
      });
  }
}

export default ApiEditOneComment;
