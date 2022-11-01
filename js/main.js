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

// Render functions
const renderMovie = (movie) => {
    const html = `
    <div class="swiper-slide" onclick="navigateTo('#movie=${movie.id}')" >
        <img 
            class="swiper-img img-lazy"
            data-src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
        />
    </div>
    `
    return html;
}

const renderLazyImages = (images) => {
    console.log("images: ", images);
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
    <div class="category" onclick="navigateTo('#category=${category.id}-${category.name}')">
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

const scrollBottomReached = () => {
    const {scrollTop, scrollHeight, clientHeight } = document.documentElement;
    return (scrollTop + clientHeight) >= (scrollHeight - 15);
}

const renderMoviesGrid = (movies, {categoryId, categoryName, page=1 } = {}) => {
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
    if(page == 1){
        moviesGrid.innerHTML = html;
    }else {
        moviesGrid.innerHTML += html;
    }


    moviesGrid.innerHTML += `
        <button onclick="getMoviesByCategory(${categoryId}, ${categoryName} ,${page + 1})">Load more</button>
    `
}


const renderSimilarMovies = (similar = []) => {
    let similarGrid = ``;
    similar.forEach((movie) => {
        similarGrid += `
        <div class="similar-movie" onclick="navigateTo('#movie=${movie.id}')">
            <img
                class="img-lazy"
                src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
            />
        </div>
        `
    });
    return similarGrid;
}

const renderGenreGrid = (genres = []) => {
    let genresGrid = ``;
    genres.forEach((genre) => {
        genresGrid += `
        <div class="genre">
            <div class="genre-color id${genre.id}"></div>
            <div class="genre-name">${genre.name}</div>
        </div>
     `
    });
    return genresGrid;
}

const renderMovieDetail = async (movie) => {
    console.log("movie: ", movie)
    const { genres } = movie;

    const response = await fetch(`${API_URL}/movie/${movie.id}/similar?api_key=${API_KEY}`).then(res => res.json());
    const { results: similar } = response;

    const similarGrid = renderSimilarMovies(similar);
    const genresGrid = renderGenreGrid(genres);

    const html = `
        <div 
            class="movie-bg"
            style="background: url(https://image.tmdb.org/t/p/w500${movie.poster_path})"
        ></div>
        <div class="movie-card">
            <h4 class="movie-title">${movie.original_title}</h4>
            <p class="movie-description">${movie.overview}</p>
           
            <div class="votes">
                <p><b>Votes:</b> </p>
                <p>${movie.vote_average} / 10</p>
            </div>

            <div class="runtime">
                <i class="gg-stopwatch"></i>
                <p>${movie.runtime} min</p>
            </div>

            <div class="genres">
                ${genresGrid}
            </div>

            <h5 class="similar-title">Similar movies</h5>
            <div class="similar-grid">
                ${similarGrid}
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

    renderMoviesGrid(movies, { page, categoryId, categoryName });
}

const getMovie = async (id) => {
    const movie = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`).then(res => res.json());
    // console.log("movie: ", movie);
    renderMovieDetail(movie);
}

const searchMovie = async (query) => {
    const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`).then(res => res.json());
    const { results:movies } = response;
    infoSection.innerHTML = `
        <p>Results of ${query}</p>
    `
    renderMoviesGrid(movies);
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