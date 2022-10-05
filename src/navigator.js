let id
let searchValue

function categoryName(title){
    headerCategoryTitle.innerHTML=title
}

window.addEventListener('click',(e)=>{
    console.log(e.target)
    if(e.target.matches(".trendingPreview-btn")){
        location.hash='#trends'
    
    }else if(e.target.matches("#searchBtn")){
        const inputValue=searchFormInput.value
        location.hash=`#search=${inputValue}`
        
    }else if(e.target.matches(".header-arrow")){
        if(!history.state){
            history.back()
        }else{
            location.hash='#home'
        }
       
    }else if(e.target.matches(".category-title")){
        console.log(e)
        id=e.target.id.split("").splice(2).join('')
        location.hash=`#category=${id}`

    }else if(e.target.matches(".movie-img")){
        console.log(e.target)
        location.hash=`#movie=${e.target.dataset.id}`
    }
})


window.addEventListener('load',()=>{
    navigator();
    history.pushState({load:location.href}, null,'') // como estamos cargando solo una vez la pagina si venimos de otra pagina 
                                                     // se va aguardar en load esa href o url que escibimos el segundo valor es null
                                                     // porque es irrelevante en todos los casos y el ultimo es un endpoint por ejemplo
                                                     // /contacto 
})
window.addEventListener('hashchange', navigator)

function navigator(){
    if(location.hash.startsWith('#trends')){
        trendPage()
    }else if(location.hash.startsWith('#search=')){
        searchPage()
    }else if(location.hash.startsWith('#movie=')){
        moviePage()
    }else if(location.hash.startsWith('#category=')){
        categoriesPage()
    }else{
        homePage()
    }
   
    window.scrollTo(0, 0)
}

function homePage(){
    console.log('home')
    
    headerSection.classList.remove('header-container--long')
    headerSection.style.background=''
    arrowBtn.classList.add('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerCategoryTitle.classList.add('inactive')
    headerTitle.classList.remove('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.remove('inactive')
    categoriesPreviewSection.classList.remove('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')
    footer.classList.remove('inactive')
    full_container.classList.remove('movieDetail')
    
    

    getTrendingMovie()
    getGenreMovie()
   
}

function trendPage(){
    console.log('trends')

    
    headerSection.classList.remove('header-container--long')
    headerSection.style.background=''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerCategoryTitle.classList.remove('inactive')
    headerTitle.classList.add('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')
    footer.classList.remove('inactive')
    full_container.classList.remove('movieDetail')
    
    headerCategoryTitle.innerHTML='Tendencias'
    getTrendingMovieVertical()
    
}

function searchPage(){
    console.log('search')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background=''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerCategoryTitle.classList.add('inactive')
    headerTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')
    footer.classList.remove('inactive')
    full_container.classList.remove('movieDetail')
    
    
    searchValue=location.hash.split('=').splice(1).join('')
    getMoviesBySearch(searchValue)
    
}
function moviePage(){
    console.log('moviedetails')

    idMovie=location.hash.split('=').splice(1).join('')

    headerSection.classList.add('header-container--long')
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.add('header-arrow--white')
    headerCategoryTitle.classList.add('inactive')
    headerTitle.classList.add('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.remove('inactive')
    footer.classList.add('inactive')
    full_container.classList.add('movieDetail')
    

 

    getMovieById(idMovie)
    
}

function categoriesPage(){
    console.log('category')

    
    headerSection.classList.remove('header-container--long')
    headerSection.style.background=''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerCategoryTitle.classList.remove('inactive')
    headerTitle.classList.add('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')
    footer.classList.remove('inactive')
    full_container.classList.remove('movieDetail')
    

    getMoviesByCategory(id)

    
  
}
