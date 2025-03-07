// Progressive image loading
function loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;
    
    img.src = src;
    img.removeAttribute('data-src');
    
    if ('loading' in HTMLImageElement.prototype) {
        img.loading = 'lazy';
    }
}

// Use Intersection Observer for lazy loading
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadImage(entry.target);
            imageObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
}); 