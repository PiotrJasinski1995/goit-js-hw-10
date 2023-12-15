import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_cPGyQpOwKH5NMhDgf9vtVO1fbcA1n7Y6XPZgHBDAg7Ml8U9Ljk0VzEWSFGH5jW2C';

export const fetchBreeds = () => {
  return axios.get('https://api.thecatapi.com/v1/breeds');
};

export const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(({ data }) => data);
};
