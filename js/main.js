import { initializeNeon } from './neon';
// import { renderShader } from './gl';
import supportsWebGL from './supports-webgl';
import jankMessage from './jankMessage';

window.App = {
    smallBreakpoint: 768,
    nav: document.querySelector('nav'),
    navExpanders: document.querySelectorAll('.header__expand-btn'),
    footer: document.querySelector('footer'),
    isIntro: document.querySelector('.intro')
}

// state container for site
var State = {
    navExpanded: false
};

var shaderStartTime = 0;
const MINIMUM_FPS = 50;
const MAX_JANK_FRAMES = 5;
let framesUnderMinFpsCount = 0;

const startSnow = (time) => {
    // only render if the fps is decent enough
    if (shaderStartTime + 1000 / MINIMUM_FPS > time) {
        shaderStartTime = time;
        renderShader(time);
        document.hidden || requestAnimationFrame(startSnow);
        framesUnderMinFpsCount = 0;
    }
    else if (framesUnderMinFpsCount < MAX_JANK_FRAMES) {
        shaderStartTime = time;
        renderShader(time);
        document.hidden || requestAnimationFrame(startSnow);
        framesUnderMinFpsCount++;
    }
    else if (document.querySelector('canvas')) {
        // get rid of the canvas, we can't show a cool shader without jank
        let canvas = document.querySelector('canvas');
        canvas.style.opacity = 0;
        canvas.addEventListener('transitionend', e => e.target.parentNode.removeChild(e.target));
        jankMessage();
    }
}

const setupUI = (e) => {
    // // start the cool bits
    // if ('requestAnimationFrame' in window && 'performance' in window) {
    //     shaderStartTime = performance.now();
    //     requestAnimationFrame(startSnow);
    // }

    // make sure ARIA is happy
    if (window.innerWidth > App.smallBreakpoint) {
        for (let expander of Array.from(App.navExpanders)) {
            expander.removeAttribute('aria-expanded');
        }
    }
}

// set DOM state of nav expanders
if (App.navExpanders) {
    for (let expander of Array.from(App.navExpanders)) {
        expander.addEventListener('click', (e) => {
            let expanded = expander.getAttribute('aria-expanded') == 'true';
            expander.setAttribute('aria-expanded', !expanded);
            App.nav.setAttribute('aria-expanded', !expanded);
        });
    }
}

// attach a scroll listener for the footer graphic
function scrollListener(e) {
    if (window.scrollY + window.innerHeight > App.footer.offsetTop) {
        initializeNeon();
        document.removeEventListener('scroll', scrollListener);
    }
}

document.addEventListener('scroll', scrollListener);
scrollListener();

// also reinit the footer graphic on click
document.querySelector('.neon').addEventListener('click', (e) => {
    initializeNeon();
});

// document.addEventListener('visibilitychange', e => {
//     if (requestAnimationFrame) {
//         shaderStartTime = performance.now();
//         if (supportsWebGL()) {
//             document.hidden || requestAnimationFrame(startSnow);
//         }
//         else {
//             console.info('It seems your browser doesn\'t support WebGL.', e);
//         }
//     }
// });

document.addEventListener('DOMContentLoaded', e => {
    if (App.isIntro) {
        // this is where the header animation finishes, at which point we can do all sorts of stuff
        const navItems = [].slice.call(document.getElementsByClassName('header__links__link'), 0);

        for (let i in navItems) {
            navItems[i].addEventListener('animationend', e => e.stopPropagation());
        }

        document.querySelector('nav').addEventListener('animationend', setupUI);
    }
    else {
        setupUI();
    }
});
