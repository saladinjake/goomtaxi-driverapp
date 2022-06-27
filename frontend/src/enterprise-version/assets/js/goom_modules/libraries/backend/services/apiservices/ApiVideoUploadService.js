'use strict';
//to handle local uploads with multer
// or to live server cloudinary.com
import FetchPromiseApi from './helpers/FetchPromiseApi';
import MessageBoard from '../../../core/MessageBoard';

import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';

let activeUrl = getOnlineUrlConnection();

const videoUpload = document.getElementById('video-upload');

class ApiVideoUploadService {
  static uploadVideo(event) {
    const displayVideos = document.getElementById('displayVideos');
    const file = event.target.files[0];
    let files = event.target.files;
    const formData = new FormData();
    formData.append('file', file);
    console.log([...files]);
    let allFilesArray = [...files];
    formData.append('upload_preset', 'yftnq9xd');
    // eslint-disable-next-line no-undef
    fetch(activeUrl + '/test', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (typeof data.body !== 'undefined') {
          allFilesArray.forEach(ApiVideoUploadService.previewFile);

          // imageUpload.value = '';
          MessageBoard.displayMsg('Image  upload success');
        } else {
          MessageBoard.displayMsg('Image failed to upload');
        }
      })
      .catch(error => {
        throw error;
      });
  }

  static previewFile(file) {
    let videoList = document.getElementById('displayVideos');
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
      let video = document.createElement('video');

      videoList.innerHTML += `<li class="video-list">
        <i class="video-uploads" style="display:none">${file.name.replace(/\\/g, '')}</i>
                <video src="${reader.result}" width="240" height="180" id="video">
                <span class="del-btn">&times;</span>
        </li>`;
    };
  }
}

export default ApiVideoUploadService;
