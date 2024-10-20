import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
let lightbox = null;

export function renderGallery(images) {



  const existingImageIds = new Set([...gallery.querySelectorAll('.photo-card')].map(card => card.dataset.id));


  const markup = images
      .filter(image => !existingImageIds.has(image.id.toString()))  
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
