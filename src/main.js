let leng=localStorage.getItem('leng') || 'es'

const api=axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers:{
        'Content-Type': 'application/json;charset;charset=utf-8'
    },
    params:{
        'api_key':API_KEY,
        'language': leng
    }
});


async function getTrendingMovie(){
    if(page===1){
        const {data}=await api(`/trending/movie/day?`)
        render(data.results, movieList, {lazy:true, clean:true})
        getMovieFavorites()
        
    }

}

async function getGenreMovie(){
    const {data}=await api(`/genre/movie/list`)

    let view=data.genres.map(i=>
        `<div class="category-container">
            <h3 id="id${i.id}" class="category-title" onclick="categoryName('${i.name}')">${i.name}</h3>
        </div>`
    ).join('')

    genreList.innerHTML=view
}

async function  getMoviesByCategory(id){
    const {data}=await api(`/discover/movie`,{
        params:{
            with_genres:id,
            page
        }
    })
    
    page===1 ?render(data.results, genericSection):render(data.results, genericSection,{lazy:false, clean:false})

    page++
  

}

async function getMoviesBySearch(query){
    const {data}=await api(`/search/movie`,{
        params:{
            query:query,
            page
        }
    })

    page===1 ?render(data.results, genericSection):render(data.results, genericSection,{lazy:false, clean:false})

    page++

}

async function getTrendingMovieVertical(){
    const {data}=await api(`/trending/movie/day?`,{
        params:{
            page
        }
    })
    
    page===1 ?render(data.results, genericSection):render(data.results, genericSection,{lazy:false, clean:false})

    page++
            
}

async function getMovieById(idMovie){

    const {data}=await api(`/movie/${idMovie}`)

    let view=
    `<h1 class="movieDetail-title">${data.title}</h1>
    <span class="movieDetail-score">${data.vote_average}</span>
    <p class="movieDetail-description">
    ${data.overview}
    </p>`
    
    let view2= data.genres.map(i=>
        `<div class="category-container">
            <h3 id="id${i.id}" class="category-title" onclick="categoryName('${i.name}')">${i.name}</h3>
        </div>`
    ).join('')
    
    headerSection.style.background=`linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(https://image.tmdb.org/t/p/w500/${data.poster_path})`;
    containerDetail.innerHTML=view
    movieDetailCategoriesList.innerHTML=view2
    getMovieSimilar(idMovie)
    window.scrollTo(0, 0)
}

async function getMovieSimilar(id){
    const {data}=await api(`/movie/${id}/similar`)
    render(data.results, relatedMoviesContainer )

}

function render(movies, container,{lazy=false,clean=true}={}){

    let view=movies.map(i=>{
        let url;
        let className;
        const parseo=JSON.parse(localStorage.getItem('liked_movies'))
       
        parseo[`A${i.id}`]?className='guardar classHover':className='guardar'
        lazy?url='data-src':url='src';
        return `<div class="movie-container">
            <img data-id="${i.id}"
            ${url}="https://image.tmdb.org/t/p/w300/${i.poster_path}" 
            class="movie-img"
            alt="${i.title}"
            />
            <button data-title=${i.title} data-poster=${i.poster_path} class="${className}" id='A${i.id}' >❤</button> 
        </div>`
    }).join('')
    
  

    if(clean){
   
        container.innerHTML= view
      
    }if(!clean){
        const div=document.createElement('div')
        div.classList.add("genericList-container")
        div.classList.add("padding")
     
        container.appendChild(div)
        div.innerHTML=view
    } 

    if(lazy) {
    
        // lazyLoading()
        let $image=document.querySelectorAll(`#movieList .movie-img, #movieListFavorites .movie-img`)  
    
   
        const callback=(entries)=>entries.forEach(entry=>{  //entries va a ser todo los elementos que yo le diga a observer.observe()
           const url= entry.target.dataset.src
           if(entry.isIntersecting){
            entry.target.setAttribute('src',url)
           }
    
        })
        
        const observer=new IntersectionObserver(callback)
        
        $image.forEach(i=>{
            observer.observe(i)
        })
        
    }
}

function getMovieFavorites(){
    let parseo=JSON.parse(localStorage.getItem('liked_movies')) 
    if(parseo===null){
        parseo={}
        localStorage.setItem('liked_movies',JSON.stringify( parseo))
    }
    const movieData=Object.values(parseo)
    render(movieData, movieListFavorite, {lazy:true, clean:true})
}
