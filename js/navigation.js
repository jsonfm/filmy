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
    console.log('home!');
}

function searchPage(){
    console.log('search!');
}

function trendsPage(){
    console.log('trends!');
}

function categoryPage(){
    console.log('category!')
}
function movieDetail() {
    console.log('movie!')
}

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
