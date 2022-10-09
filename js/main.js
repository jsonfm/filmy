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

const themeButton = document.getElementById('theme-button');

// Render functions
const renderMovie = (movie) => {
    const html = `
    <div class="swiper-slide">
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

const renderCategory = (category) => {
    const html = `
    <div class="category">
        <div class="icon id${category.id}"></div>
        <h4>${category.name}</h4>
    </div>
    `
    return html;
}

const renderCategories = (categories) => {
    let html = ``;
    categories.map((category) => html += renderCategory(category));
    return html;
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


getTrendingDayMovies();
getMoviesCategories();


window.addEventListener('load', () => {
    setTimeout(() => {
        loadingSpinner.style.display = 'none';
    }, 1500);
})

themeButton.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
})