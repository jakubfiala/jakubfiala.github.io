function initializeNeon() {
    const neonWrapper = document.querySelector('.neon');
    const neons = document.querySelectorAll('.neon__component');

    neonWrapper.style.opacity = 1;

    for (let n = 0; n < neons.length; n++) {
        let rotation = Math.floor((Math.random() - 0.5) * 80);
        let scaleX = Math.random() / 2 + 0.7;
        if (!n) rotation *= -1;
        if (n != 1) neons[n].style.transformOrigin = Math.random() > 0.5 ? 'center right' : 'center left';
        neons[n].style.transform = `scaleX(${scaleX}) rotate(${rotation}deg)`;
    }
}

export {
    initializeNeon
}