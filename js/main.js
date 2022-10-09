const swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
    },
});

const loadingSpinner = document.getElementById('loading-spinner');

window.addEventListener('load', () => {
    setTimeout(() => {
        loadingSpinner.style.display = 'none';
    }, 2000);
})