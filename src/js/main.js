
document.getElementById('btn-search').addEventListener('click', event => {
  event.preventDefault();
  const keyword = document.getElementById('searching').value;
  if (keyword !== '' && keyword !== ' ') {
    searchRestaurant(keyword);
  }
});