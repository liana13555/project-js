// import QueryService from './query'
const KEY_USER = '2fa9e4bbaa008ede70ee7a4ceca0d3a2';

const url = 'https://api.themoviedb.org/3/search/movie?api_key=2fa9e4bbaa008ede70ee7a4ceca0d3a2';


const watchTrailer = document.querySelector('#trailer');
const input = document.querySelector('.input');

watchTrailer.addEventListener('click', onClick);


function onClick(event) {
    event.preventDefault();
    const value = input.value;

    const path = '/search/movie';
    const newUrl = generateUrl(path) +'&query=' + value;
   
    fetch(newUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log('Data:', data);
        })
        .catch((error) => {
            console.log(error);
        });
    console.log('Value:', value);
}

function generateUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=2fa9e4bbaa008ede70ee7a4ceca0d3a2`;

    return url;
}

function createIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;

    iframe.allowFullscreen = true;
    return iframe;
    
}