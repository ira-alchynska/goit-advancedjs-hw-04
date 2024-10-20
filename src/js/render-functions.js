import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
let lightbox = null;

export function renderGallery(images) {

  const markup = images
    .map(
      ({ id, webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
          <div class="photo-card" data-id="${id}">
              <a href="${largeImageURL}">
                  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
              </a>
              <div class="info">
                  <p><b>Likes</b>: ${likes}</p>
                  <p><b>Views</b>: ${views}</p>
                  <p><b>Comments</b>: ${comments}</p>
                  <p><b>Downloads</b>: ${downloads}</p>
              </div>
          </div>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a');
  }
}



export function clearGallery() {
  gallery.innerHTML = '';
}
