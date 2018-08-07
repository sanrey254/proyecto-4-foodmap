let config = {
  apiKey: 'AIzaSyCiLDBi-b0s3qQ7StQwIpepNwyEX65LHyo',
  authDomain: 'affamato-project.firebaseapp.com',
  databaseURL: 'https://affamato-project.firebaseio.com',
  projectId: 'affamato-project',
  storageBucket: 'affamato-project.appspot.com',
  messagingSenderId: '371498322149'
};
firebase.initializeApp(config);
let db = firebase.firestore();

window.searchRestaurant = (keyword) => {
  let response = '';
  const keywordUpperCase = keyword.toUpperCase();
  db.collection('places').get()
    .then(result => {
      result.forEach(place => {
        const placeName = place.data().name;
        const placeNameUpperCase = placeName.toUpperCase();
        let existKeyword = placeNameUpperCase.indexOf(keywordUpperCase);
        if (existKeyword !== -1) {
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
                                <a href="#" class="btn btn-red btn-sm">
                                    <i class="fa fa-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
            </div>`;
          document.getElementById('restaurant').innerHTML = response;
        }
      });
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
                                <a href="#" class="btn btn-red btn-sm">
                                    <i class="fa fa-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
            </div>`;
        document.getElementById('restaurant').innerHTML = response;
      });
    });
};


