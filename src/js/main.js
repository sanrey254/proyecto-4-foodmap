window.currentPosition = () => {
  // Get user's current/initial position.
  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  const success = (pos) => {
    let crd = pos.coords;
    let initialPosition = {
      lat: crd.latitude,
      lng: crd.longitude
    };
    let map = new google.maps.Map(
      document.getElementById('map'), {
        zoom: 15,
        center: initialPosition,

      });
    let marker = new google.maps.Marker({
      position: initialPosition,
      map: map
    });
  };

  const error = (err) => {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);
};


window.getRestaurant = () => {
  fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=19.4047876,-99.1644084&radius=500&type=restaurant&key=AIzaSyBuz9gLAStcBB3YUGbBJdAuO8R8DH2quYs', miInit)
    .then(result => {
      console.log(result);
    })
    .catch(error =>{
      console.log('Error', error);
    });
};

var miInit = {
  method: 'GET',
  mode: 'no-cors',
  cache: 'default',
  crossDomain: true
};

getRestaurant();