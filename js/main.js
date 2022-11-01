//
const $ = (id) => document.getElementById(id);

// 
const API_KEY = "262f41a25fc42012a850c6e20904096f";
const API_URL = "https://api.themoviedb.org/3";

// GUI
const swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-scrollbar",
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            // spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3,
            // spaceBetween: 20,
        },
    },
    freeMode: true,
    observer: true
});

const loadingSpinner = document.getElementById('loading-spinner');
const moviesContainer = document.getElementById('movies-container');
const categoriesContainer = document.getElementById('categories-container');
const searchContainer = document.getElementById('search-container');
const moviesGrid = document.getElementById('movies-grid');
const movieDetail = document.getElementById('movie-detail');
const infoSection = document.getElementById('info-section');

const backButton = document.getElementById('back-button-container');
const themeButton = document.getElementById('theme-button');
const searchButton = document.getElementById('search-button');
const scrollButton = document.getElementById('scroll-button');

const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');


let infintyScroll = null;

const scrollToTop = () => {
    window.scrollTo({ top: 0 , behavior: 'smooth'});
}


// Observer
const lazyloader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            const url = entry.target.getAttribute("data-src");
            entry.target.setAttribute('src', url);
        }
    })
});


const renderLazyImages = (images) => {
    console.log("images: ", images);
}


const scrollBottomReached = () => {
    const {scrollTop, scrollHeight, clientHeight } = document.documentElement;
    return (scrollTop + clientHeight) >= (scrollHeight - 15);
}


const getTrendingDayMovies = async () => {
    const response = await fetch(`${API_URL}/trending/all/day?api_key=${API_KEY}`).then(res => res.json());
    const { results: movies } = response;
    const html = renderTrendingMovies(movies, true);
    moviesContainer.innerHTML = html;

    const lazyImgs = Array.from(document.querySelectorAll('.img-lazy'));
    lazyImgs.forEach((img) => {
        lazyloader.observe(img);
    })

}

const getMoviesCategories = async () => {
    const response = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}`).then(res => res.json());
    const { genres: categories } = response;
    const html = renderCategories(categories);
    categoriesContainer.innerHTML = html;
}


const getMoviesByCategory = async(categoryId, categoryName='', page=1) => {
    const response = await fetch(`${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${categoryId}&page=${page}`).then(res => res.json());
    const { results: movies } = response;

    infoSection.innerHTML = `
        <p class="filtering-title mt-5">Showing <b>${categoryName}</b> movies</p>
    `

    renderMoviesGrid({ movies, page, categoryId, categoryName });
}

const getMovie = async (id) => {
    const movie = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`).then(res => res.json());
    renderMovieDetail(movie);
}

const searchMovie = async (query) => {
    const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`).then(res => res.json());
    const { results:movies } = response;
    infoSection.innerHTML = `
        <p>Results of ${query}</p>
    `
    renderMoviesGrid({ movies });
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
});

searchButton.addEventListener('click', () => {
    searchContainer.classList.toggle('active');
});

scrollButton.addEventListener('click', () => {
    scrollToTop();
});

backButton.addEventListener('click', () => {
    window.history.back();
});

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchInput.value;
    navigateTo(`#search=${query}`);
})

window.addEventListener('load', () => {
    setTimeout(() => {
        loadingSpinner.style.display = 'none';
    }, 1500);
});


getTrendingDayMovies();
getMoviesCategories();