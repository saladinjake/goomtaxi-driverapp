'use strict';
import ApiImageUploadService from './ApiImageUploadService';
import ApiVideoUploadService from './ApiVideoUploadService';

class ApiMediaUploadService {
  static triggerEvents() {
    console.log('from modal in intervention page');

    //  if(document.getElementById('filestyle-6')){
    //     const createTicketImageUpload = document.getElementById('filestyle-6');
    //    createTicketImageUpload.addEventListener('change', e => {
    //      ApiImageUploadService.uploadImage(e);
    //    });
    // }

    // const imageUpload = document.getElementById('image-upload');
    // imageUpload.addEventListener('change', e => {
    //   ApiImageUploadService.uploadImage(e);
    // });

    // const videoUpload = document.getElementById('video-upload');
    // videoUpload.addEventListener('change', e => {
    //   ApiVideoUploadService.uploadVideo(e);
    // });
  }
}

export default ApiMediaUploadService;
