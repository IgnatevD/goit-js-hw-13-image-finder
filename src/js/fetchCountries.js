import _ from 'lodash';
import { BASE_URL_FN } from './config.js';
import pixabayApi from '../templates/pixabayApi';

let nameInput = "";
let page = 1;
let allImg;

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-input');


searchForm.addEventListener('input', _.debounce(fetchPixabayImg, 500));

async function fetchPixabayImg(e) {
    if (e.target.value !== nameInput) {
        gallery.innerHTML = "";
        page = 1;
    }

    if (e.target.value !== "") {
        nameInput = e.target.value;
        const urlCart = await getUrl(nameInput, page);
        await renderPage(urlCart.hits);
        
        const lastElementImg = gallery.lastElementChild;
        observer.observe(lastElementImg);
    }


}

async function getUrl(nameInput, page) {
    const getUrlFetch = await fetch(BASE_URL_FN(nameInput, page));
    return  getUrlFetch.json();
}

async function renderPage(el) {
    let counter = 0;
    el.forEach((img) => {
        gallery.insertAdjacentHTML('beforeend', pixabayApi(img));
        const lastImg = gallery.lastElementChild.querySelector('img');
        lastImg.onload = () => {
            if (++counter >= el.length) {
                document.querySelectorAll('.hide').forEach(node => {
                    node.classList.remove('hide')
                }) 
            }
        }
    })
    gallery.addEventListener('click', e => {
        if (e.target.nodeName !== "IMG") return false;
        e.target.setAttribute('src', e.target.getAttribute('href'));
        })
}

async function renderNewPage(nameInput, page) {
    const urlCart = await getUrl(nameInput, page);
    await renderPage(urlCart.hits);
    const lastElementImg = gallery.lastElementChild;
    observer.observe(lastElementImg);
}



const onEntry = (entries, observer) => {
  entries.forEach(entry => {
      if (!entry.isIntersecting) return false;
      page++;
      renderNewPage(nameInput, page);
      observer.unobserve(entry.target);
  });
};

const observer = new IntersectionObserver(onEntry);




