//
const $ = (id) => document.getElementById(id);

// 
const API_KEY = "262f41a25fc42012a850c6e20904096f";
const API_URL = "https://api.themoviedb.org/3";

// GUI
const swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
    },
    observer: true
});

const loadingSpinner = document.getElementById('loading-spinner');
const moviesContainer = document.getElementById('movies-container');
const categoriesContainer = document.getElementById('categories-container');
const searchContainer = document.getElementById('search-container');
const moviesGrid = document.getElementById('movies-grid');
const movieDetail = document.getElementById('movie-detail');

const backButton = document.getElementById('back-button-container');
const themeButton = document.getElementById('theme-button');
const searchButton = document.getElementById('search-button');
const scrollButton = document.getElementById('scroll-button');

const scrollToTop = () => {
    window.scrollTo({ top: 0 , behavior: 'smooth'});
}

// Render functions
const renderMovie = (movie) => {
    const html = `
    <div class="swiper-slide" onclick="navigateTo('#movie=${movie.id}')" >
        <img 
            class="swiper-img"
            src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
        />
    </div>
    `
    return html;
}

const renderMovies = (movies) => {
    let html = ``;
    movies.map((movie) => html += renderMovie(movie));
    return html;
}

const navigateTo = (path) => {
    window.location.hash = path;
}


const renderCategory = (category) => {
    const html = `
    <div class="category" onclick="navigateTo('#category=${category.id}')">
        <div class="category-color id${category.id}"></div>
        <h4 class="category-name">${category.name}</h4>
    </div>
    `
    return html;
}

const renderCategories = (categories) => {
    let html = ``;
    categories.map((category) => html += renderCategory(category));
    return html;
}

const renderMoviesGrid = (movies) => {
    let html = ``;
    movies.map((movie) => {
        html += `
        <div class="movie-grid-element" onclick="navigateTo('#movie=${movie.id}')">
            <img
                class="movie-poster" 
                src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
            />
        </div>
    `
    });
    moviesGrid.innerHTML = html;
}

const renderMovieDetail = (movie) => {
    const { genres } = movie;

    let genresGrid = ``;
    genres.map((genre) => {
        genresGrid += `
        <div class="genre">
            <div class="genre-color id${genre.id}"></div>
            <div class="genre-name">${genre.name}</div>
        </div>
     `
    });
    const html = `
        <div 
            class="movie-bg"
            style="background: url(https://image.tmdb.org/t/p/w500${movie.poster_path})"
        ></div>
        <div class="movie-card">
            <h4 class="movie-title">${movie.original_title}</h4>
            <p class="movie-description">${movie.overview}</p>
            <div class="genres">
                ${genresGrid}
            </div>
        </div>
    `
    movieDetail.innerHTML = html;
}



const getTrendingDayMovies = async () => {
    const response = await fetch(`${API_URL}/trending/all/day?api_key=${API_KEY}`).then(res => res.json());
    const { results: movies } = response;
    const html = renderMovies(movies);
    moviesContainer.innerHTML = html;
}

const getMoviesCategories = async () => {
    const response = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}`).then(res => res.json());
    const { genres: categories } = response;
    console.log("categories: ", categories);
    const html = renderCategories(categories);
    categoriesContainer.innerHTML = html;
}


const getMoviesByCategory = async(categoryId) => {
    const response = await fetch(`${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${categoryId}`).then(res => res.json());
    const { results: movies } = response;
    renderMoviesGrid(movies);
}

const getMovie = async (id) => {
    const movie = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`).then(res => res.json());
    console.log("movie: ", movie);
    renderMovieDetail(movie);
}



getTrendingDayMovies();
getMoviesCategories();


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
})

window.addEventListener('load', () => {
    setTimeout(() => {
        loadingSpinner.style.display = 'none';
    }, 1500);
});
