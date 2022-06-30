const locationText = document.getElementById('location-code');

export const showPosition = position => {
  locationText.innerHTML = `Location: <span id="location" style="color:#361f55">${position.coords.latitude}, ${position.coords.longitude}</span>`;
};

export const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    locationText.innerHTML = 'Geolocation is not supported by this browser.';
  }
};

export const initMap = position => {
  const myLocation = {
    lat: `${position.coords.latitude}`,
    lng: `${position.coords.longitude}`,
  };
  // eslint-disable-next-line no-undef
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLocation,
  });
  // eslint-disable-next-line no-undef
  const marker = new google.maps.Marker({
    position: myLocation,
    map,
  });

  marker.setMap(map);
};
