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

window.getRestaurantList = () => {
  let result = '';
  db.collection('places').orderBy('ranking', 'asc').get()
    .then(result => {
      result.forEach(place => {
        result += `<div class="col-md-4 my-4">
                    <div class="frontside">
                        <div class="card">
                            <div class="card-body text-center">
                                <p>
                                    <img class="img-fluid" src="${place.data().url}"
                                        alt="card image" style="height: 120px">
                                </p>
                                <h4 class="card-title">${place.data().name}</h4>
                                <p>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>  
                                </p>
                                <a href="#" class="btn btn-red btn-sm">
                                    <i class="fa fa-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
            </div>`;
        document.getElementById('restaurant').innerHTML = result;
      });
    });
};

getRestaurantList();
