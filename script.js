document.addEventListener('DOMContentLoaded', () => {
    const carouselImages = document.querySelectorAll('.carousel-images img');
    const totalImages = carouselImages.length;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    if (totalImages === 0) {
        console.warn('No images found for the carousel.');
        return; // Exit if no images are found
    }

    function showImage(index) {
        carouselImages.forEach((img, i) => {
            img.classList.remove('active');
            if (i === index) {
                img.classList.add('active');
            }
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextImage);
    } else {
        console.warn('Next button not found.');
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevImage);
    } else {
        console.warn('Previous button not found.');
    }

    // Auto rotate images every 3 seconds
    const intervalId = setInterval(nextImage, 3000);

    // Optionally, stop interval if visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(intervalId); // Stop rotation when the page is not visible
        }
    });
});
