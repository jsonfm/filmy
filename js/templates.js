// Render templates functions

/**
 * Updates window location given a path/route
 * @param {string} path 
 */
 const navigateTo = (path) => {
    window.location.hash = path;
}


/**
 * Render Category card
 * @param {Object} category 
 * @returns {string}
 */
const renderCategory = (category = {}) => {
    const { id, name, } = category;
    const html = `
    <div class="category" onclick="navigateTo('#category=${id}-${name}')">
        <div class="category-color id${id}"></div>
        <h4 class="category-name">${name}</h4>
    </div>
    `
    return html;
}

/** Renders a list of categories. 
 * @param {array} categories - a list of categories.
 * @returns {string} html
*/
const renderCategories = (categories = []) => {
    let html = ``;

    if(!!categories.length){
        categories.map((category) => html += renderCategory(category));
    }

    return html;
}

/**
 * Renders a single movie
 * @param {Object} param0 
 * @returns {string} html
 */
const renderTrendingMovie = ({ movie, lazy=false, posterWidth=300 } = {}) => {
    const posterUrl = `"https://image.tmdb.org/t/p/w${posterWidth}${movie.poster_path}"`;
    
    const html = `
    <div class="swiper-slide" onclick="navigateTo('#movie=${movie.id}')" >
        <img 
            class="swiper-img img-lazy"
            ${lazy ? `data-src=${posterUrl}` : `src=${posterUrl}`}
        />
    </div>
    `

    return html;
}

/**
 * Renders a list of movies
 * @param {array} movies 
 * @param {boolean} lazy 
 * @returns {string} html
 */
const renderTrendingMovies = (movies = [], lazy=false) => {
    let html = ``;
    if(!!movies.length) {
        movies.map((movie) => html += renderTrendingMovie({ movie, lazy }));
    }
    return html;
}

let categoriesHistory = {};

/**
 * Renders Movies grid
 * @param {Object} param0 
 * @param {array} param0.movies 
 * @param {number} param0.categoryId
 * @param {string} param0.categoryName
 * @param {number} param0.page
 */
const renderMoviesGrid = ({ movies, categoryId, categoryName, page=1 } = {}) => {
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

    categoriesHistory = {
        categoryId,
        categoryName,
        page,
    };
    console.log("categories ---> ", categoriesHistory)
    // moviesGrid.innerHTML += `
    //     <button onclick="getMoviesByCategory(${categoryId}, '${categoryName}' , ${page + 1})">Load more</button>
    // `
}

/**
 * Renders similar movies list, thinking to be used with movie detail view
 * @param {array} similar - a movies array
 * @returns {string} html
 */
const renderSimilarMovies = (similar = []) => {
    let html = ``;
    if(!!similar.length){
        similar.forEach((movie) => {
            html += `
            <div class="similar-movie" onclick="navigateTo('#movie=${movie.id}')">
                <img
                    class="img-lazy"
                    src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
                />
            </div>
            `
        });
    }
    return html;
}

/**
 * Renders a grid with a list of movies genres
 * @param {array} genres 
 * @returns {string}
 */
const renderGenreGrid = (genres = []) => {
    let html = ``;
    genres.forEach((genre) => {
        html += `
        <div class="genre">
            <div class="genre-color id${genre.id}"></div>
            <div class="genre-name">${genre.name}</div>
        </div>
     `
    });
    return html;
}


/**
 * Renders movie details
 * @param {Object} movie - a JSON with movie info
 */
const renderMovieDetail = async (movie = {}) => {

    const { 
        id,
        genres,
        original_title,
        poster_path,
        overview,
        vote_average,
        runtime,
    } = movie;

    const response = await fetch(`${API_URL}/movie/${id}/similar?api_key=${API_KEY}`).then(res => res.json());
    const { results: similar } = response;

    const similarGrid = renderSimilarMovies(similar);
    const genresGrid = renderGenreGrid(genres);

    const html = `
        <div 
            class="movie-bg"
            style="background: url(https://image.tmdb.org/t/p/w500${poster_path})"
        ></div>
        <div class="movie-card">
            <h4 class="movie-title">${original_title}</h4>
            <p class="movie-description">${overview}</p>
           
            <div class="votes">
                <p><b>Votes:</b> </p>
                <p>${vote_average} / 10</p>
            </div>

            <div class="runtime">
                <i class="gg-stopwatch"></i>
                <p>${runtime} min</p>
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
