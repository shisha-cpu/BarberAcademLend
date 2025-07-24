document.addEventListener('DOMContentLoaded', function() {
    // Анимация при скролле
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .audience-card, .step, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    // Инициализация анимаций
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Запускаем сразу для видимых элементов

    // Плавный скролл для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Слайдер работ (показывает 3 изображения одновременно)
    const sliderImages = document.querySelectorAll('.slider-image');
    const prevBtn = document.querySelector('.slider-btn-prev');
    const nextBtn = document.querySelector('.slider-btn-next');
    const imagesToShow = 3;
    let currentStart = 0;

    function showSlides(start) {
        sliderImages.forEach((img, i) => {
            if (i >= start && i < start + imagesToShow) {
                img.style.display = 'block';
            } else {
                img.style.display = 'none';
            }
        });
    }

    if (prevBtn && nextBtn && sliderImages.length) {
        prevBtn.addEventListener('click', function() {
            currentStart = (currentStart - 1 + sliderImages.length) % sliderImages.length;
            // Зацикливаем окно
            if (currentStart > sliderImages.length - imagesToShow) {
                currentStart = sliderImages.length - imagesToShow;
            }
            if (currentStart < 0) {
                currentStart = 0;
            }
            showSlides(currentStart);
        });
        nextBtn.addEventListener('click', function() {
            currentStart = (currentStart + 1) % sliderImages.length;
            if (currentStart > sliderImages.length - imagesToShow) {
                currentStart = 0;
            }
            showSlides(currentStart);
        });
        showSlides(currentStart);
    }
});