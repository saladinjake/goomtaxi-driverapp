'use strict';
import SOSModel from '../models/SOSModel';
import $ from 'jquery';
import getApiUrl from '../../backend/services/apiservices/helpers/getOnlineUrlConnection';
import Recording from './SOSRecorder';
let baseUrl = getApiUrl();
const SUCCESS_URL = '/sos-history';
const POST_URL = baseUrl + '/sos';
const notification_url = baseUrl + '/notifications';
var video_sos;
let media_url = '';

alertify.set('notifier', 'position', 'top-left');
let data = {};
export default class Recorder {
  constructor() {
    // Defining all globals.
    if (document.getElementById('sos-page')) {
      this.mediaSource = new MediaSource();
      this.mediaRecorder;
      this.recordedBlobs;
      this.sourceBuffer;
      this.videoOutputVideo = document.querySelector('video#videoOutput');
      this.recordedVideo = document.querySelector('video#recorded');

      this.recordButton = document.querySelector('button#record');
      this.recordButton.disabled = true;
      this.playButton = document.querySelector('button#play');
      this.downloadButton = document.querySelector('button#download');
      const constraints = {
        audio: true,
        video: true,
      };

      this.testIfProtocolVerified();
      this.attachHTMLEvents();

      // Get user permission,
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          this.handleSuccess(stream);
        })
        .catch(error => {
          this.handleError(error);
        });
    }

    var notification = alertify.notify(
      'Initializing audio and video device. Please wait..',
      'success',
      5,
      function() {
        console.log('dismissed');
      },
    );

    setTimeout(() => {
      this.recordButton.innerHTML = 'initializing...';
      this.recordButton.disabled = true;
    }, 2000);

    setTimeout(() => {
      this.recordButton.innerHTML = 'yes';
      this.recordButton.disabled = false;
    }, 9000);
  }

  attachHTMLEvents() {
    // Attach all actios to HTML buttons.
    this.recordButton.onclick = this.toggleRecording.bind(this);
    this.playButton.onclick = this.play.bind(this);
    this.downloadButton.onclick = this.download.bind(this);
  }

  testIfProtocolVerified() {
    const isSecureOrigin = location.protocol === 'https:' || location.hostname === 'localhost';
    if (!isSecureOrigin) {
      console.error(`No HTTPS or localhost. Non secured pages can't reach media accessories`);
      return false;
    }
    return true;
  }

  handleSuccess(stream) {
    this.recordButton.disabled = false;
    console.log('getUserMedia() got stream: ', stream);
    window.stream = stream;
    if (window.URL) {
      this.videoOutputVideo.src = window.URL.createObjectURL(stream);
    } else {
      this.videoOutputVideo.src = stream;
    }
  }

  handleError(error) {
    console.log('navigator.getUserMedia error: ', error);
  }

  handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data);
    }
  }

  toggleRecording() {
    if (this.recordButton.textContent === 'yes') {
      this.startRecording();
    } else {
      this.stopRecording();
      this.recordButton.textContent = 'yes';
      this.playButton.disabled = false;
      this.downloadButton.disabled = false;
    }
    var notification = alertify.notify('Record in session..', 'warning', 45, function() {
      console.log('dismissed');
    });
  }

  startRecording() {
    this.recordedBlobs = [];
    let options = { mimeType: 'video/webm;codecs=vp9' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.log(`${options.mimeType} is not Supported`);
      options = { mimeType: 'video/webm;codecs=vp8' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(`${options.mimeType} is not Supported`);
        options = { mimeType: 'video/webm' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          console.log(`${options.mimeType} is not Supported`);
          options = { mimeType: '' };
        }
      }
    }
    try {
      this.mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e) {
      console.error(`Exception while creating MediaRecorder: ${e}`);
      return;
    }
    console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);
    this.recordButton.textContent = 'Stop Recording';
    this.playButton.disabled = true;
    this.downloadButton.disabled = true;
    this.mediaRecorder.ondataavailable = this.handleDataAvailable.bind(this);
    this.mediaRecorder.start(10); // collect 10ms of data
    console.log('MediaRecorder started', this.mediaRecorder);

    setTimeout(() => {
      this.recordButton.textContent = 'Loading......';
      this.recordButton.disabled = true;
    }, 3000);

    setTimeout(() => {
      this.stopRecording();

      this.recordButton.textContent = 'Loading...';
      this.recordButton.disabled = true;
    }, 15000);

    setTimeout(() => {
      //this.play();
      console.log(this.videoOutputVideo.src);
      this.recordButton.textContent = 'saving record...';
      this.recordButton.disabled = true;

      this.download();
    }, 18000);

    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(Recorder.success);
        this.recordButton.textContent = 'yes';
        this.recordButton.disabled = false; // if geolocation supported, call function
      } else {
        // $("#location-lat-long").val('Your browser doesn\'t support the geolocation api.');
        this.recordButton.textContent = 'yes';
        this.recordButton.disabled = false;
        var notification = alertify.notify(
          'Your browser does not support the geolocation api.',
          'error',
          5,
          function() {
            console.log('dismissed');
          },
        );
      }
    }, 20000);
  }

  stopRecording() {
    this.mediaRecorder.stop();
    console.log('Recorded Blobs: ', this.recordedBlobs);
    this.recordedVideo.controls = true;
  }

  play() {
    const superBuffer = new Blob(this.recordedBlobs, { type: 'video/webm' });
    this.recordedVideo.src = window.URL.createObjectURL(superBuffer);
  }

  download() {
    const blob = new Blob(this.recordedBlobs, { type: 'video/webm' });
    let file_name = 'sos-now' + new Date().getTime() + '_testVideo.webm';
    var file = new File([blob], file_name);

    localStorage.setItem('sosFile', file_name);

    data.filename = localStorage.getItem('sosFile', file_name);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.webm';
    document.body.appendChild(a);

    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      console.log(window.URL.revokeObjectURL(url));
    }, 100);
    console.log(a.download);

    initUpload(file);
    video_sos = file;

    console.log(file.filename);
    return a.download;
  }

  static success(position) {
    var latitude = position.coords.latitude; // set latitude variable
    var longitude = position.coords.longitude; // set longitude variable

    // var mapcanvas   = document.createElement('div');    // create div to hold map
    // mapcanvas.id = 'map';                   // give this div an id of 'map'
    // mapcanvas.style.height = '400px';             // set map height
    // mapcanvas.style.width = '100%';               // set map width

    // document.querySelector('#map-container').appendChild(mapcanvas);  // place new div within the 'map-container' div

    //var coords = new google.maps.LatLng(latitude,longitude);  // set lat/long object for new map

    // var options = {                       // set options for map
    //   zoom: 15,
    //   center: coords,
    //   mapTypeControl: false,
    //   navigationControlOptions: {
    //     style: google.maps.NavigationControlStyle.SMALL
    //   },
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };

    // var map = new google.maps.Map(document.getElementById("map"), options); // create new map using settings above

    // var marker = new google.maps.Marker({           // place a marker at our lat/long
    //   position: coords,
    //   map:    map
    // });

    var latLongResponse = 'Latitude: ' + latitude + ' / Longitude: ' + longitude; // build string containing lat/long
    Recorder.getAddress(latitude, longitude); // geocode the lat/long into an address

    //$("#location-lat-long").val(latLongResponse);                 // write lat/long string to input field
  }

  static launch_toast(address) {
    var x = document.getElementById('toast');
    x.className = 'show';
    document.getElementById('desc').innerHTML = 'Your address' + ' has been sent';
    setTimeout(function() {
      x.className = x.className.replace('show', '');
    }, 5000);
  }

  // function to process address data
  static processAddress(address) {
    //$("#location-address").val(address);                  // write address to field
    var spokenResponse = 'S O S response at ' + address; // build string to speak
    //Recorder.speakText(spokenResponse);
    const me = JSON.parse(localStorage.getItem('userToken'));

    const username = me.user.username;
    const email = me.user.email;
    const phone_number = me.user.phoneNumber;

    //alert(video_sos)
    const sosRequest = {
      address,
      user_id: me.user.account_num,
      location: address,
      status: 'Pending',
      media: [video_sos.filename],

      plate_number: 'plate  number',

      //driver_email
      //plate_number
      username,
      email,
      phone_number,
    };

    Recorder.launch_toast(address);

    //            var notify = '<div id="app"><div class="notification">notification</div>' +
    // '<div class="pop"><div class="cl"><i class="fas fa-times"></i></div><div class="message">' + 'Your address at ' +  address ' has been sent.</div>' +
    //  '</div></div>';

    // if(document.getElementById('drivers-sos')){
    //   POST_URL = "https://demo-Goom Logistics-taxi-surf-api.herokuapp.com/api/v1/drivers-sos";
    // }

    // fetch(POST_URL, {
    //     method: 'POST',
    //     headers: {
    //       'Access-Control-Allow-Headers': 'x-access-token',
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //       'x-access-token': me.token,
    //     },
    //     mode: 'cors',
    //     body: JSON.stringify(sosRequest),
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data.status === 422) {
    //       console.log("field required")
    //       //MessageBoard.displayMsg( data.error);
    //       var notification = alertify.notify('field required upload', 'error', 5, function(){  console.log('dismissed'); });

    //     } else if (data.status === 200) {
    //       console.log("success..")
    //        var notification = alertify.notify("SOS has been created", 'success', 5, function(){  console.log('dismissed'); });

    //       //MessageBoard.displayMsg("Notification has been sent to you");
    //       if(document.getElementById('drivers-sos')){
    //            setTimeout(()=>{
    //                window.location.replace("https://demo-Goom Logistics-taxi-user.herokuapp.com/drivers-sos-history")
    //          },2000)
    //        }
    //       setTimeout(()=>{
    //         window.location.replace("https://demo-Goom Logistics-taxi-user.herokuapp.com/sos-history")
    //       },2000)

    //     } else {
    //       console.log(data.error)
    //       //MessageBoard.displayMsg(data.error);
    //       //Router.redirect('login.html');
    //     }
    //   })
    //   .catch(error => {
    //     throw error;
    //   });                     // speak the address
  }

  static beep() {
    var snd = new Audio(
      'data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=',
    );
    snd.play();
  }

  // function to geocode a lat/long
  static getAddress(myLatitude, myLongitude) {
    var geocoder = new google.maps.Geocoder(); // create a geocoder object
    var location = new google.maps.LatLng(myLatitude, myLongitude); // turn coordinates into an object
    geocoder.geocode({ latLng: location }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        // if geocode success
        Recorder.processAddress(results[0].formatted_address);

        let user = JSON.parse(localStorage.getItem('userToken'));

        data.address = results[0].formatted_address;
        data.location = results[0].formatted_address; //myLatitude + " ," + myLongitude;
        data.user_id = user.user.account_num;
        data.media = [data.filename];
        data.notification_count = user.user.notification_count + 1;
        (data.plate_number = 'plate  number'),
          (data.status = 'Pending'),
          (data.username = user.user.username);
        data.phone_number = user.user.phoneNumber;
        data.email = user.user.email;

        //plate_number:'plate  number',

        //driver_email
        //plate_number
        // username,
        //email,
        //phone_number

        document.getElementById('notifyCount').innerHTML = data.notification_count;
        Recorder.beep();
        console.log(data);

        setTimeout(function() {
          return SOSModel.saveSOSRequest(data);
        }, 5000);
        // if address found, pass to processing function
      } else {
        alert('Geocode failure: ' + status); // alert any other error(s)
        return false;
      }
    });
  }

  // function to speak a response
  static speakText(response) {
    // setup synthesis
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[2]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 2; // 0 to 2
    msg.text = response;
    msg.lang = 'en-US';

    speechSynthesis.speak(msg);
  }
}

/*
      Function to carry out the actual PUT request to S3 using the signed request from the app.
    */
function uploadFile(file, signedRequest, url) {
  var recordButton = document.querySelector('button#record');
  recordButton.disabled = true;
  recordButton.textContent = 'uploading please wait...';
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        recordButton.disabled = false;
        recordButton.textContent = 'yes';
        var notification = alertify.notify('sos uploaded successfully', 'success', 5, function() {
          console.log('dismissed');
        });
        media_url = 'https://Goom Logistics-bucket.s3.amazonaws.com/' + file;

        var notification = alertify.notify('Processing please wait...', 'success', 15, function() {
          console.log('dismissed');
        });

        //alert(file.filename)
      } else {
        recordButton.disabled = false;
        recordButton.textContent = 'yes';

        //alert('Could not upload file.');

        var notification = alertify.notify(
          'Could not send sos response and upload unsuccessful.',
          'error',
          5,
          function() {
            console.log('dismissed');
          },
        );
      }
    }
  };
  xhr.send(file);
}

/*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
function getSignedRequest(file) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', baseUrl + `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
  xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedRequest, response.url);
      } else {
        alert('Could not get signed URL.');
        var notification = alertify.notify(
          'Error uploading file to server.',
          'error',
          5,
          function() {
            console.log('dismissed');
          },
        );
      }
    }
  };
  xhr.send();
}

/*
     Function called when file input updated. If there is a file selected, then
     start upload procedure by asking for a signed request from the app.
    */
function initUpload(file) {
  console.log(file);
  if (file == null) {
    var notification = alertify.notify('No file was selected.', 'error', 5, function() {
      console.log('dismissed');
    });

    return alert('No file selected.');
  }
  getSignedRequest(file);
}
