import getRefs from './refs';
import QueryService from './query-service';

const refs = getRefs();
const trailerApiFetch = new QueryService();

function createIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.allowFullscreen = true;
 
    return iframe;
}
    
function createVideoTemplate(data) {
    const video = data.results[0];
    const iframeContainer = document.querySelector('.lightbox__content');
    const iframe = createIframe(video);
    iframeContainer.innerHTML = '';
    iframeContainer.appendChild(iframe);
}

document.addEventListener('click', openLightbox);

function openLightbox(event) {
    const target = event.target;

    if (target.tagName.toLowerCase() === 'img') {
        const movieID = target.dataset.movieId;
        // console.log(movieID);

        trailerApiFetch.fetchById(movieID)
            .then(data =>
                createVideoTemplate(data))
            .catch((error) => {
            console.log(error);
            })
    }

    if (target.classList.contains('btn__trailer')) {
        refs.lightbox.classList.add('is-open'); 
    }
}

//---------------------------------------------------------------------------------------
    
// Закрытие модального окна 
refs.closeLightboxBtn.addEventListener('click', onCloseLightbox);
    
function onCloseLightbox() {
    refs.lightbox.classList.remove('is-open');
    document.body.style.overflow = 'visible';
    // window.removeEventListener('keydown', onEscKeyPress);    
}

//по нажатию клавиши ESC

function onEscKeyPress(evt) {
    if (evt.code === 'Escape') {
        onCloseLightbox();         
    }    
}

//по клику на div.lightbox__overlay.
refs.lightbox.addEventListener('click', clickOnLightbox);

function clickOnLightbox(evt) {
  if (evt.target !== refs.lightboxImage) {
        onCloseLightbox();
    }    
}