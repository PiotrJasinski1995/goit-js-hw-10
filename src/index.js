import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

breedSelect.style.display = 'none';
error.style.display = 'none';

fetchBreeds()
  .then(data => {
    const options = data.data;

    loader.style.display = 'block';
    error.style.display = 'none';

    breedSelect.innerHTML = options
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');

    loader.style.display = 'none';
  })
  .catch(() => {
    loader.style.display = 'none';
    error.style.display = 'block';
  })
  .finally(() => {
    breedSelect.style.display = 'block';
  });

breedSelect.addEventListener('change', event => {
  error.style.display = 'none';
  loader.style.display = 'block';
  catInfo.style.display = 'none';

  const breedId = event.target.value;

  fetchCatByBreed(breedId)
    .then(data => {
      const catData = data[0].breeds[0];

      if (catData) {
        catInfo.innerHTML = `<img src='${data[0].url}' alt='${catData.name} cat' class='cat-image' ><div class='cat-data'><h2>${catData.name}</h2><p>${catData.description}</p><p><span class='cat-temperament'>Temperament: </span>${catData.temperament}</p></div>`;
      } else {
        Notiflix.Notify.failure('No data for this cat!');
      }

      loader.style.display = 'none';
      catInfo.style.display = 'flex';
    })
    .catch(() => {
      loader.style.display = 'none';
      error.style.display = 'block';
      Notiflix.Notify.failure('No data for this cat!');
    });
});
