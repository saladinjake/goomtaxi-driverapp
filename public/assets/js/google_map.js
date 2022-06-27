/**
 * Create google maps Map instance.
 * @param {number} lat
 * @param {number} lng
 * @return {Object}
 */
const createMap = ({ lat, lng }) => {
  return new google.maps.Map(document.getElementById('map'), {
    center: { lat, lng },
    zoom: 12
  });

};

/**
 * Create google maps Marker instance.
 * @param {Object} map
 * @param {Object} position
 * @return {Object}
 */
const createMarker = ({ map, position }) => {
  return new google.maps.Marker({ map, position });

  
  
};

/**
 * Track the user location.
 * @param {Object} onSuccess
 * @param {Object} [onError]
 * @return {number}
 */
const trackLocation = ({ onSuccess, onError = () => { } }) => {
  if ('geolocation' in navigator === false) {
    return onError(new Error('Geolocation is not supported by your browser.'));
  }

  return navigator.geolocation.watchPosition(onSuccess, onError, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  });
};

/**
 * Get position error message from the given error code.
 * @param {number} code
 * @return {String}
 */
const getPositionErrorMessage = code => {
  switch (code) {
    case 1:
      return 'Permission denied.';
    case 2:
      return 'Position unavailable.';
    case 3:
      return 'Timeout reached.';
  }
}

/**
 * Initialize the application.
 * Automatically called by the google maps API once it's loaded.
*/
function init() {
  const initialPosition = { lat: 6.5244, lng: 3.3792};
  const map = createMap(initialPosition);
  const marker = createMarker({ map, position: initialPosition });
  const $info = document.getElementById('info');


   var contentString = '<div id="content"><h1>You are here.' +
                    '</h1><p>Lorem ipsum dolor sit amet.</p></div>';
 



 
  const infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 200
  });
 
  marker.addListener('click', function () {
            
                    infowindow.open(marker.get('map'), marker);
                    InforObj[0] = infowindow;
  });

  let watchId = trackLocation({
    onSuccess: ({ coords: { latitude: lat, longitude: lng } }) => {
      marker.setPosition({ lat, lng });
      map.panTo({ lat, lng });
      $info.textContent = `Lat: ${lat.toFixed(5)} Lng: ${lng.toFixed(5)}`;
      $info.classList.remove('error');
    },
    onError: err => {
      console.log($info);
      $info.textContent = `Error: ${err.message || getPositionErrorMessage(err.code)}`;
      $info.classList.add('error');
    }
  });


  driversAvailable(map)



   
}


function hasClass(el, classname) {
    return el.classList.contains(classname);
  }









var InforObj = [];
        function driversAvailable(map){
            var markersOnMap = [{
                    placeName: "Ijaye (Lagos)",
                    LatLng: [{
                        lat: 6.6233,
                        lng: 3.3313


                    }]
                },
                {
                    placeName: "Agege",
                    LatLng: [{
                        lat: 6.6180,
                        lng: 3.3209
                    }]
                },
                
            ];


            for (var i = 0; i < markersOnMap.length; i++) {
                var contentString = '<div id="content"><h1>' + markersOnMap[i].placeName +
                    '</h1><p>Lorem ipsum dolor sit amet, vix mutat posse suscipit id, vel ea tantas omittam detraxit.</p></div>';
 

                var image = {
                      url: "./img/taxi.png",
                      // This marker is 50 pixels wide by 50 pixels high.
                      size: new google.maps.Size(40, 40),
                      // The origin for this image is (0, 0).
                      //origin: new google.maps.Point(0, 0),
                      // The anchor for this image is the base of the flagpole at (0, 32).
                     // anchor: new google.maps.Point(0, 32)
                    };


                const marker = new google.maps.Marker({
                    position: markersOnMap[i].LatLng[0],
                    map: map,
                    //icon: image
                });
 
                const infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 200
                });
 
                marker.addListener('click', function () {
                    closeOtherInfo();
                    infowindow.open(marker.get('map'), marker);
                    InforObj[0] = infowindow;
                });
                marker.addListener('mouseover', function () {
                    closeOtherInfo();
                    infowindow.open(marker.get('map'), marker);
                    InforObj[0] = infowindow;
                });
                marker.addListener('mouseout', function () {
                    closeOtherInfo();
                    infowindow.close();
                    InforObj[0] = infowindow;
                });
            }

        }


        function closeOtherInfo() {
            if (InforObj.length > 0) {
                /* detach the info-window from the marker ... undocumented in the API docs */
                InforObj[0].set("marker", null);
                /* and close it */
                InforObj[0].close();
                /* blank the array */
                InforObj.length = 0;
            }
        }





function getDistance(origin=[19.075984, 72.877656], destination=[12.971599, 77.594563])
  {
     //Find the distance
     var distanceService = new google.maps.DistanceMatrixService();
     distanceService.getDistanceMatrix({
        origins: origin, //[$("#autocompleteDeparture").val()],
        destinations: destination,  //[$("#autocompleteArrival").val()],
        travelMode: google.maps.TravelMode.WALKING,
        unitSystem: google.maps.UnitSystem.METRIC,
        durationInTraffic: true,
        avoidHighways: false,
        avoidTolls: false
    },
    function (response, status) {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
            console.log('Error:', status);
        } else {
            console.log(response);
            $info.textContent = response.rows[0].elements[0].distance.text
            //$("#distance").text(response.rows[0].elements[0].distance.text).show();
            //$("#duration").text(response.rows[0].elements[0].duration.text).show();
        }
    });
  }