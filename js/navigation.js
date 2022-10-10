function navigator() {
    console.log('location', { location });
    scrollToTop();
    if(location.hash.startsWith('#trends')){
        trendsPage();
    }else if(location.hash.startsWith('#search=')){
        searchPage()
    }else if(location.hash.startsWith('#movie=')){
        movieDetail();
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
    searchContainer.classList.remove("active");
    getMoviesByCategory(categoryId)
}
function movieDetail() {
    console.log('movie!')
}

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
