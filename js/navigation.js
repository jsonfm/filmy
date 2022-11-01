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
    if(infiniteScroll){
        window.removeEventListener('scroll', infiniteScroll, {passive: false});
        infiniteScroll = undefined;
    }

    $("footer").classList.remove("unvisible");
    $("movies-section").classList.remove("unvisible");
    $("header").classList.remove("unvisible");
    $("categories-section").classList.remove("unvisible");
    $("movies-grid").classList.add("unvisible");
    $("movie-detail").classList.add("unvisible");
    $("back-button-container").classList.add("unvisible");
    $("home-button-container").classList.add("unvisible");
    $("back-section").classList.add("unvisible");
    $("info-section").classList.add("unvisible");
    moviesGrid.innerHTML = '';
    console.log('home!');
}

function searchPage(){
    if(infiniteScroll){
        window.removeEventListener('scroll', infiniteScroll, {passive: false});
        infiniteScroll = undefined;
    }

    searchContainer.classList.remove('active');
    $("footer").classList.add("unvisible");
    $("header").classList.remove("unvisible");
    $("movies-section").classList.add("unvisible");
    $("categories-section").classList.add("unvisible");
    $("movie-detail").classList.add("unvisible");
    $("back-section").classList.add("unvisible");
    $("movies-grid").classList.remove("unvisible");
    $("info-section").classList.remove("unvisible");
    const query = window.location.hash.replace("#search=", '');
    searchMovie(query);
    console.log('search: ', query);
}

function trendsPage(){
    infiniteScroll = null;
    console.log('trends!');
}

function categoryPage(){
    if(infiniteScroll){
        window.removeEventListener('scroll', infiniteScroll, {passive: false});
        infiniteScroll = undefined;
    }
    infiniteScroll = scrollingMoviesByCategory;

    window.addEventListener('scroll', infiniteScroll, { passive: false});

    //
    const categoryParams = window.location.hash.replace("#category=", '').split("-");
    const categoryId = categoryParams[0];
    const categoryName = categoryParams[1];
    $("footer").classList.add("unvisible");
    $("movies-section").classList.add("unvisible");
    $("header").classList.add("unvisible");
    $("categories-section").classList.add("unvisible");
    $("movies-grid").classList.remove("unvisible");
    $("movie-detail").classList.add("unvisible");
    $("info-section").classList.remove("unvisible");
    $("back-button-container").classList.remove("unvisible");
    $("home-button-container").classList.remove("unvisible");
    $("back-section").classList.remove("unvisible");
    searchContainer.classList.remove("active");

    getMoviesByCategory({ categoryId, categoryName });
}

function movieDetailPage() {
    infiniteScroll = null;
    $("footer").classList.add("unvisible");
    $("movies-section").classList.add("unvisible");
    $("header").classList.add("unvisible");
    $("categories-section").classList.add("unvisible"); 
    $("movies-grid").classList.add("unvisible");
    $("back-section").classList.remove("unvisible");
    $("movie-detail").classList.remove("unvisible");
    $("info-section").classList.add("unvisible");
    $("back-button-container").classList.remove("unvisible");
    $("home-button-container").classList.remove("unvisible");
    const movieId = window.location.hash.replace("#movie=", '');
    getMovie(movieId);
}

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
