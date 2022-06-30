import SOSModel from '../models/SOSModel';
import $ from 'jquery';

var video_sos;
let media_url = '';
let data = {};

function successAction(position) {
  var latitude = position.coords.latitude; // set latitude variable
  var longitude = position.coords.longitude; // set longitude variable

  var latLongResponse = 'Latitude: ' + latitude + ' / Longitude: ' + longitude; // build string containing lat/long
  getAddress(latitude, longitude); // geocode the lat/long into an address

  //$("#location-lat-long").val(latLongResponse);                 // write lat/long string to input field
}
function launch_toast(address) {
  var x = document.getElementById('toast');
  x.className = 'show';
  document.getElementById('desc').innerHTML = 'Your address' + ' has been sent';
  setTimeout(function() {
    x.className = x.className.replace('show', '');
  }, 5000);
}

function processAddress(address) {
  //$("#location-address").val(address);                  // write address to field
  var spokenResponse = 'S O S response at ' + address; // build string to speak
  //Recorder.speakText(spokenResponse);
  const me = JSON.parse(localStorage.getItem('userToken'));

  const username = me.user.username;
  const email = me.user.email;
  const phone_number = me.user.phoneNumber;

  launch_toast(address);

  // speak the address
}

function beep() {
  var snd = new Audio(
    'data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=',
  );
  snd.play();
}

function getAddress(myLatitude, myLongitude) {
  var geocoder = new google.maps.Geocoder(); // create a geocoder object
  var location = new google.maps.LatLng(myLatitude, myLongitude); // turn coordinates into an object
  geocoder.geocode({ latLng: location }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      // if geocode success
      processAddress(results[0].formatted_address);

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

      document.getElementById('notifyCount').innerHTML = data.notification_count;
      beep();
      console.log(data);
      return SOSModel.saveSOSRequest(data); // if address found, pass to processing function
    } else {
      alert('Geocode failure: ' + status); // alert any other error(s)
      return false;
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('sos-page')) {
    const getMic = document.getElementById('mic');
    const recordButton = document.getElementById('record');
    const list = document.getElementById('recordings');
    if ('MediaRecorder' in window) {
      getMic.addEventListener('click', async () => {
        document.getElementById('cancle-sos').setAttribute('hidden', 'hidden');
        getMic.setAttribute('hidden', 'hidden');
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
          });
          const mimeType = 'audio/webm';
          let chunks = [];
          const recorder = new MediaRecorder(stream, { type: mimeType });
          recorder.addEventListener('dataavailable', event => {
            if (typeof event.data === 'undefined') return;
            if (event.data.size === 0) return;
            chunks.push(event.data);
          });
          recorder.addEventListener('stop', () => {
            const recording = new Blob(chunks, {
              type: mimeType,
            });

            let file_name = 'sos-now' + new Date().getTime() + '_testVideo.webm';
            var file = new File([recording], file_name);

            initUpload(file);

            localStorage.setItem('sosFile', file_name);

            data.filename = localStorage.getItem('sosFile', file_name);

            renderRecording(recording, list);
            chunks = [];
          });
          recordButton.removeAttribute('hidden');
          recordButton.addEventListener('click', () => {
            if (recorder.state === 'inactive') {
              recorder.start();
              recordButton.innerText = 'Stop';

              setTimeout(() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(successAction);
                  // if geolocation supported, call function
                } else {
                  // $("#location-lat-long").val('Your browser doesn\'t support the geolocation api.');

                  var notification = alertify.notify(
                    'Your browser does not support the geolocation api.',
                    'error',
                    5,
                    function() {
                      console.log('dismissed');
                    },
                  );
                }
              }, 4000);
            } else {
              recorder.stop();

              setTimeout(() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(successAction);
                  // if geolocation supported, call function
                } else {
                  // $("#location-lat-long").val('Your browser doesn\'t support the geolocation api.');

                  var notification = alertify.notify(
                    'Your browser does not support the geolocation api.',
                    'error',
                    5,
                    function() {
                      console.log('dismissed');
                    },
                  );
                }
              }, 4000);
            }
          });
        } catch {
          renderError('You denied access to the microphone so this demo will not work.');
        }
      });
    } else {
      renderError(
        "Sorry, your browser doesn't support the MediaRecorder API, so this demo will not work.",
      );
    }
  }
});

function renderError(message) {
  const main = document.querySelector('main');
  main.innerHTML = `<div class="error"><p>${message}</p></div>`;
}

function renderRecording(blob, list) {
  const blobUrl = URL.createObjectURL(blob);
  const li = document.createElement('li');
  const audio = document.createElement('audio');
  const anchor = document.createElement('a');
  anchor.setAttribute('href', blobUrl);
  const now = new Date();
  anchor.setAttribute(
    'download',
    `recording-${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now
      .getDay()
      .toString()
      .padStart(2, '0')}--${now
      .getHours()
      .toString()
      .padStart(2, '0')}-${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}-${now
      .getSeconds()
      .toString()
      .padStart(2, '0')}.webm`,
  );
  anchor.innerText = 'Download';
  audio.setAttribute('src', blobUrl);
  audio.setAttribute('controls', 'controls');
  li.appendChild(audio);
  li.appendChild(anchor);
  list.appendChild(li);
}

function uploadFile(file, signedRequest, url) {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var notification = alertify.notify('sos uploaded successfully', 'success', 5, function() {
          console.log('dismissed');
        });
        media_url = 'https://Goom Logistics-bucket.s3.amazonaws.com/' + file;

        var notification = alertify.notify('Processing please wait...', 'success', 15, function() {
          console.log('dismissed');
        });

        //alert(file.filename)
      } else {
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

  xhr.open(
    'GET',
    `https://demo-Goom Logistics-taxi-surf-api.herokuapp.com/api/v1/sign-s3?file-name=${file.name}&file-type=${file.type}`,
  );
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
