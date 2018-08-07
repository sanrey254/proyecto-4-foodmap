window.initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: 'AIzaSyDTnRlgj3YITuH0fTWO7Qv_Cg8aCXBWH80',
    authDomain: 'food-map-2.firebaseapp.com',
    databaseURL: 'https://food-map-2.firebaseio.com',
    projectId: 'food-map-2',
    storageBucket: '',
    messagingSenderId: '330495915253'
  });
};
initializeFirebase()
let db = firebase.firestore();

window.searchRestaurant = (keyword) => {
  let response = '';
  let noResult = 0;
  const keywordUpperCase = keyword.toUpperCase();
  db.collection('places').get()
    .then(result => {
      result.forEach(place => {
        const placeName = place.data().name;
        const placeNameUpperCase = placeName.toUpperCase();
        let existKeyword = placeNameUpperCase.indexOf(keywordUpperCase);
        if (existKeyword !== -1) {
          noResult++;
          let ranking = drawRanking(place.data().rate);
          response += `<div class="col-md-4 my-4">
                    <div class="frontside">
                        <div class="card">
                            <div class="card-body text-center">
                                <p>
                                    <img class="img-fluid img-thumbnail" src="${place.data().url}"
                                        alt="card image" style="height: 120px;">
                                </p>
                                <h5 class="card-title">${place.data().name}</h5>
                                <p><span class="badge badge-warning">${place.data().type}</span></p>
                                <p>
                                ${ranking}
                                </p>
                                <button class="btn btn-red btn-sm" onclick="showRestaurantInfo('${place.id}')">
                                    <i class="fas fa-question"></i>
                                </button>
                            </div>
                        </div>
                    </div>
            </div>`;
          document.getElementById('restaurant').innerHTML = response;
        }
      });
      if (noResult === 0) {
        swal({
          type: 'error',
          title: '<p class="title-font">No existen coincidencias</p>',
          width: 300
        });
        getRestaurantList();
      }
    });
};


window.drawRanking = (ranking) => {
  let response;
  if (ranking === 'Aceptable') {
    response = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
  }
  if (ranking === 'Bueno') {
    response = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
  }
  if (ranking === 'Excelente') {
    response = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
  }
  return response;
};

window.showRestaurantInfo = (restaurantID) => {
  db.collection('places').doc(restaurantID).get()
    .then(result => {
      swal({
        title: `<strong class="title-font">${result.data().name}</strong>`,
        type: 'info',
        html: `<p class="small-font"><i class="fas fa-map-marker-alt"></i> ${result.data().address}</p><p class="small-font"><i class="far fa-money-bill-alt"></i> ${result.data().price}</p><p class="small-font"><i class="fas fa-phone"></i> ${result.data().phone}</p>`,
        showCloseButton: true,
        focusConfirm: false,
        width: 400,
        padding: '2.25em',
        confirmButtonText:
          '<span class="small-font">Ordenar ahora! <i class="fas fa-utensils"></i></span>',
        confirmButtonAriaLabel: 'Thumbs up, great!',
      }).catch(error => {
        console.log('Error', error);
      });
    });
};

window.getRestaurantList = () => {
  let response = '';
  db.collection('places').orderBy('rate', 'desc').get()
    .then(result => {
      result.forEach(place => {
        let ranking = drawRanking(place.data().rate);
        response += `<div class="col-md-4 my-4">
                    <div class="frontside">
                        <div class="card">
                            <div class="card-body text-center">
                                <p>
                                    <img class="img-fluid img-thumbnail" src="${place.data().url}"
                                        alt="card image" style="height: 120px;">
                                </p>
                                <h5 class="card-title">${place.data().name}</h5>
                                <p><span class="badge badge-warning">${place.data().type}</span></p>
                                <p>
                                ${ranking}
                                </p>
                                <button class="btn btn-red btn-sm" onclick="showRestaurantInfo('${place.id}')">
                                    <i class="fas fa-question"></i>
                                </button>
                            </div>
                        </div>
                    </div>
            </div>`;
        document.getElementById('restaurant').innerHTML = response;
      });
    });
};

window.setMapMarkers = () => {
  db.collection('places').orderBy('rate', 'desc').get()
    .then(result => {
      result.forEach(place =>{
        let ranking = drawRanking(place.data().rate);
        let marker = L.marker([place.data().location.latitude, place.data().location.longitude], { icon: mapMarker }).addTo(mymap);
        marker.bindPopup(`<strong>${place.data().name}<strong><p class="mt-1 text-center">${ranking}</p><p class="text-center mt-1"></p><p class="text-center"><button class="btn btn-red btn-sm" onclick="showRestaurantInfo('${place.id}')"><i class="fas fa-question"></i></button></p>`).openPopup();
      });
    });
  
};

getRestaurantList();


