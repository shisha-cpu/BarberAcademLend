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

    // Слайдер работ
    const sliderImages = document.querySelectorAll('.slider-image');
    const prevBtn = document.querySelector('.slider-btn-prev');
    const nextBtn = document.querySelector('.slider-btn-next');
    let currentSlide = 0;

    function showSlide(index) {
        sliderImages.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }

    if (prevBtn && nextBtn && sliderImages.length) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
            showSlide(currentSlide);
        });
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % sliderImages.length;
            showSlide(currentSlide);
        });
        showSlide(currentSlide);
    }
});