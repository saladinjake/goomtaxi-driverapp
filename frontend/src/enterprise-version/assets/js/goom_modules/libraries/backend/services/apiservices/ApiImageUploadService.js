'use strict';
import FetchPromiseApi from './helpers/FetchPromiseApi';
import MessageBoard from '../../../core/MessageBoard';

import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';

let activeUrl = getOnlineUrlConnection();
class ApiImageUploadService {
  constructor() {}

  static uploadImage(event) {
    
    const file = event.target.files[0];
    let files = event.target.files;
    const formData = new FormData();
    formData.append('file', files);
    console.log([...files]);
    let allFilesArray = [...files];
    formData.append('upload_preset', 'yftnq9xd');

    console.log(activeUrl + '/image/profile/avater')
    // eslint-disable-next-line no-undef
    fetch(activeUrl + '/image/profile/avater', {
      method: 'POST',
        headers: {
        // 'Access-Control-Allow-Headers': 'x-access-token',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        //'x-access-token': user.token,
      },
      mode: 'cors',
    
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data) {
          allFilesArray.forEach(ApiImageUploadService.previewFile);

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
    let reader = new FileReader();
    reader.readAsDataURL(file);
      let profile = document.getElementById('avatar-img2');
    let displayImages = document.getElementById('displayImages');
    reader.onloadend = function() {
      let img = document.createElement('img');
      img.src = reader.result;
      let imgLink = 'https://goomtaxiuser.herokuapp.com/public/images/';
      //img.setAttribute("class", "image-uploads")
      // img.width="200px"
      // img.height="200px"
      //displayImages.appendChild(img)
     
      //console.log('Here you go >> ' + file.name.replace(/\\/g, ''));

      displayImages.innerHTML += `<li class="image-list" style="float:left; list-style-type:none;">
        <img src=${reader.result} height="50" width="50" id="img">
        <span class="del-btn">&times;</span>
        <i class="image-uploads" style="">${file.name.replace(/\\/g, '')}</i>
      profile.
</li>`;

      profile.src=reader.result;
    };
  }
}
export default ApiImageUploadService;
