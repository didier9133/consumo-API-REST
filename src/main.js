const api=axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers:{
        'Content-Type': 'application/json;charset;charset=utf-8'
    },
    params:{
        'api_key':API_KEY
    }
});


async function getTrendingMovie(){
    const {data}=await api(`/trending/movie/day?`)
    render(data, movieList)

}

async function getGenreMovie(){
    const {data}=await api(`/genre/movie/list?language=en-US`)
    console.log(data)
    let view=data.genres.map(i=>
        `<div class="category-container">
            <h3 id="id${i.id}" class="category-title" onclick="categoryName('${i.name}')">${i.name}</h3>
        </div>`
    ).slice(0,9).join('')

    genreList.innerHTML=view
}

async function  getMoviesByCategory(id){
    const {data}=await api(`/discover/movie`,{
        params:{
            with_genres:id
        }
    })
    
    render(data, genericSection)

}

async function getMoviesBySearch(query){
    console.log(query)
    const {data}=await api(`/search/movie`,{
        params:{
            query:query,
        }
    })
    console.log(data)
    render(data, genericSection)
}


async function getTrendingMovieVertical(){
    const {data}=await api(`/trending/movie/day?`)
    render(data, genericSection)

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
    render(data, relatedMoviesContainer )

}

function render(movies, container){
    let view=movies.results.map(i=>
        `<div class="movie-container">
            <img data-id="${i.id}"
            src="https://image.tmdb.org/t/p/w300/${i.poster_path}
            "
            class="movie-img"
            alt="${i.title}"
            />
        </div>`
    ).slice(0,9).join('')
    

    container.innerHTML=view
}