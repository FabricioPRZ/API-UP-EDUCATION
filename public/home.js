let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    const slideWidth = slides[0].clientWidth;
    const offset = -index * slideWidth;
    document.querySelector('.slides').style.transform = `translateX(${offset}px)`;

    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
        showSlide(i);
        currentIndex = i;
    });
});

setInterval(nextSlide, 3000);

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
});
