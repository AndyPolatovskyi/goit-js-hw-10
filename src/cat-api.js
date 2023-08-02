import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_goEbF2uAnTYu9mxm6XDdMSrKvITbKOqy5omIxWrwL4Nl9zysaMmoCAzdHiKlOZXy';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
    console.log(response)
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data[0];
    });
}
