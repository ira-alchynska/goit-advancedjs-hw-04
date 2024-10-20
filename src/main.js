import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let searchQuery = '';

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
    event.preventDefault();
    searchQuery = input.value.trim();

    if (!searchQuery) {
        iziToast.warning({
            title: 'Warning',
            message: 'Please enter a search query.',
        });
        return;
    }

    clearGallery();
    loader.classList.add('show');
    loadMoreBtn.classList.add('hidden');
    page = 1;

    try {
        const images = await fetchImages(searchQuery, page);
        console.log('Images fetched:', images);

        if (!images || images.length === 0) {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
            return;
        }

        renderGallery(images);

        if (images.length >= 15) {
            loadMoreBtn.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error in onSearch:', error.message);
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later.',
        });
    } finally {
        loader.classList.remove('show');
    }
}

async function onLoadMore() {
    page += 1;
    loader.classList.add('show');
    try {
        const images = await fetchImages(searchQuery, page);
        if (images.length === 0) {
            iziToast.info({
                title: 'Info',
                message: "We're sorry, but you've reached the end of search results.",
            });
            loadMoreBtn.classList.add('hidden');
            return;
        }
        renderGallery(images);
        smoothScroll();

        if (images.length < 15) {
            loadMoreBtn.classList.add('hidden');
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later.',
        });
    } finally {
        loader.classList.remove('show');
    }
}

function smoothScroll() {
    const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}
