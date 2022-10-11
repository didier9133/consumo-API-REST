let id
let searchValue
let title
let page=1;



function categoryName(title){
    headerCategoryTitle.innerHTML=title
}

window.addEventListener('click',(e)=>{
    console.log(e.target)
    if(e.target.matches('.guardar')){
        classHover(e.target, e.target.id)
    }

    else if(e.target.matches(".trendingPreview-btn")){
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
        title=e.target.outerText
        location.hash=`#category=${id}=${title}`

    }else if(e.target.matches(".movie-img")){
        console.log(e.target)
        location.hash=`#movie=${e.target.dataset.id}`
    }
},false)


window.addEventListener('load',()=>{
    navigation();
    history.pushState({load:location.href}, null,'') // como estamos cargando solo una vez la pagina si venimos de otra pagina 
    // se va aguardar en load esa href o url que escibimos el segundo valor es null // porque es irrelevante en todos los casos y el ultimo es un endpoint por ejemplo
    // /contacto
    
  
},false)
window.addEventListener('hashchange', navigation,false)

window.addEventListener('scroll',(e)=>{
    const {clientHeight, scrollTop, scrollHeight}=document.documentElement
    
    if(clientHeight+scrollTop+300>= scrollHeight && location.hash.startsWith('#trends')) {
        console.log('bottom')
        return  trendPage()
    } 
    
    if(clientHeight+scrollTop+300>= scrollHeight && location.hash.startsWith('#category=')){
        console.log('bottom')
        return categoriesPage();
    }

    if(clientHeight+scrollTop+300>= scrollHeight && location.hash.startsWith('#search=')){
        console.log('bottom')
        return searchPage();
    }

},false)

lenguaje.addEventListener('change',(e)=>{
    localStorage.setItem('leng',e.target.value)
    leng=localStorage.getItem('leng')
    location.reload()
})

// movieList.addEventListener('scroll',(e)=>{
//     const {clientWidth, scrollLeft, scrollWidth}=movieList
//     if(clientWidth+scrollLeft+10>= scrollWidth){
//         console.log('rigth')
//         return getTrendingMovie();
//     }

// })

function navigation(){
    page=1
    
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
    console.log('navigation', page)
   
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
    trendingFavorites.classList.remove('inactive')
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
    trendingFavorites.classList.add('inactive')
    footer.classList.remove('inactive')
    full_container.classList.remove('movieDetail')
    
    headerCategoryTitle.innerHTML='Trends'
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
    trendingFavorites.classList.add('inactive')
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
    trendingFavorites.classList.add('inactive')
    footer.classList.add('inactive')
    full_container.classList.add('movieDetail')

    getMovieById(idMovie)
    
}

function categoriesPage(){
    console.log('category')
    const[,id,categoria]=location.hash.split('=')
    
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
    trendingFavorites.classList.add('inactive')
    footer.classList.remove('inactive')
    full_container.classList.remove('movieDetail')
    
    getMoviesByCategory(id)
    categoryName(categoria)
    
  
}

const classHover=(target,newid)=>{
    
    let byId=document.querySelector(`#${newid}`)
    let corazon=target
 

    let id=corazon.id.split("").splice(1).join('')
    let poster_path=corazon.dataset.poster
    let title=corazon.dataset.title
    let movies
    let item=localStorage.getItem('liked_movies')
    item===null ?movies={}:movies=JSON.parse(item)
   
    if(!corazon.classList.contains('classHover')){
        corazon.classList.add('classHover')
        byId.classList.add('classHover')
        movies[newid]={id,poster_path,title}
       
    }else{
        corazon.classList.remove('classHover')
        byId.classList.remove('classHover')
        movies[newid]=undefined
       
    }
    
    localStorage.setItem('liked_movies',JSON.stringify( movies))
    getMovieFavorites()
}
