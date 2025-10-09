document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu (tous pages)
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // Accordion (sur mes-droits.html)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Smooth scroll (seulement si liens # sur la page)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Carrousel (seulement si .carousel-container existe, sur index)
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(ind => ind.classList.remove('active'));

            if (index >= totalSlides) currentSlideIndex = 0;
            else if (index < 0) currentSlideIndex = totalSlides - 1;
            else currentSlideIndex = index;

            slides[currentSlideIndex].classList.add('active');
            indicators[currentSlideIndex].classList.add('active');
        }

        window.changeSlide = function(direction) {
            showSlide(currentSlideIndex + direction);
        };

        window.currentSlide = function(slideNumber) {
            showSlide(slideNumber - 1);
        };

        setInterval(() => {
            showSlide(currentSlideIndex + 1);
        }, 4000);

        showSlide(0);
    }
});