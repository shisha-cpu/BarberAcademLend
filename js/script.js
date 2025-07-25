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

    // Слайдер работ (показывает 3 изображения одновременно, 1 на мобилке)
    const sliderItems = document.querySelectorAll('.slider-item');
    const prevBtn = document.querySelector('.slider-btn-prev');
    const nextBtn = document.querySelector('.slider-btn-next');
    let imagesToShow = 3;
    let currentStart = 0;

    function updateImagesToShow() {
        if (window.innerWidth <= 768) {
            imagesToShow = 1;
        } else {
            imagesToShow = 3;
        }
        // Обновляем отображение слайдов при изменении размера
        if (currentStart > sliderItems.length - imagesToShow) {
            currentStart = Math.max(0, sliderItems.length - imagesToShow);
        }
        showSlides(currentStart);
    }

    function showSlides(start) {
        sliderItems.forEach((item, i) => {
            if (i >= start && i < start + imagesToShow) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    if (prevBtn && nextBtn && sliderItems.length) {
        prevBtn.addEventListener('click', function() {
            currentStart = (currentStart - 1 + sliderItems.length) % sliderItems.length;
            if (currentStart > sliderItems.length - imagesToShow) {
                currentStart = sliderItems.length - imagesToShow;
            }
            if (currentStart < 0) {
                currentStart = 0;
            }
            showSlides(currentStart);
        });
        nextBtn.addEventListener('click', function() {
            currentStart = (currentStart + 1) % sliderItems.length;
            if (currentStart > sliderItems.length - imagesToShow) {
                currentStart = 0;
            }
            showSlides(currentStart);
        });
        // Инициализация количества отображаемых слайдов
        updateImagesToShow();
        window.addEventListener('resize', updateImagesToShow);
    }
});