function navigator() {
    console.log('location', { location });
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
    $("categories-container").classList.remove("unvisible");
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
    $("categories-container").classList.add("unvisible");
    getMoviesByCategory(categoryId)
}
function movieDetail() {
    console.log('movie!')
}

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
