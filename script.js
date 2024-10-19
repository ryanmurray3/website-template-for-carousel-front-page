document.addEventListener('DOMContentLoaded', () => {
    const carouselSlides = document.querySelectorAll('.carousel-images .carousel-slide');
    const totalSlides = carouselSlides.length;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    let intervalId;

    if (totalSlides === 0) {
        console.warn('No slides found for the carousel.');
        return; // Exit if no slides are found
    }

    // CSS classes to show/hide slides
    const ACTIVE_CLASS = 'active-slide';

    // Show the current slide and hide the previous one
    function showImage(index) {
        const previousSlide = carouselSlides[currentIndex];
        const currentSlide = carouselSlides[index];
        
        if (previousSlide) previousSlide.classList.remove(ACTIVE_CLASS);
        if (currentSlide) currentSlide.classList.add(ACTIVE_CLASS);
        
        currentIndex = index;
    }

    function nextImage() {
        const newIndex = (currentIndex + 1) % totalSlides;
        showImage(newIndex);
    }

    function prevImage() {
        const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showImage(newIndex);
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

    // Show the first image initially
    showImage(currentIndex);

    // Auto rotate images every 3 seconds
    function startCarousel() {
        if (!intervalId) {
            intervalId = setInterval(nextImage, 3000);
        }
    }

    function stopCarousel() {
        clearInterval(intervalId);
        intervalId = null;
    }

    startCarousel();

    // Pause and resume auto rotation based on visibility with debounce
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopCarousel();
        } else {
            startCarousel();
        }
    });
});
