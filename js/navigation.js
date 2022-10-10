function navigator() {
    console.log('location', { location });
    scrollToTop();
    if(location.hash.startsWith('#trends')){
        trendsPage();
    }else if(location.hash.startsWith('#search=')){
        searchPage()
    }else if(location.hash.startsWith('#movie=')){
        movieDetailPage();
    }else if(location.hash.startsWith('#category=')){
        categoryPage();
    }else {
        homePage();
    }
}

function homePage(){
    $("movies-section").classList.remove("unvisible");
    $("header").classList.remove("unvisible");
    $("categories-section").classList.remove("unvisible");
    $("movies-grid").classList.add("unvisible");
    $("movie-detail").classList.add("unvisible");
    $("back-section").classList.add("unvisible");
    moviesGrid.innerHTML = '';
    console.log('home!');
}

function searchPage(){
    console.log('search!');
}

function trendsPage(){
    console.log('trends!');
}

function categoryPage(){
    const categoryId = window.location.hash.replace("#category=", '');
    $("movies-section").classList.add("unvisible");
    $("header").classList.add("unvisible");
    $("categories-section").classList.add("unvisible");
    $("movies-grid").classList.remove("unvisible");
    $("movie-detail").classList.add("unvisible");
    searchContainer.classList.remove("active");
    $("back-section").classList.remove("unvisible");
    getMoviesByCategory(categoryId)
}
function movieDetailPage() {
    $("movies-section").classList.add("unvisible");
    $("header").classList.add("unvisible");
    $("categories-section").classList.add("unvisible"); 
    $("movies-grid").classList.add("unvisible");
    $("back-section").classList.remove("unvisible");
    $("movie-detail").classList.remove("unvisible");
    const movieId = window.location.hash.replace("#movie=", '');
    getMovie(movieId);
}

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
