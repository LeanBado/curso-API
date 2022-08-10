const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    Headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
    params: {
        "api_key": API_KEY
    },
});

async function trendingPreviewMovies(){
    const {data} = await api("trending/movie/week") //axios devuelve la solicitud en forma de objeto y parseado, no hace falta el .json()
console.log("trending", data)
    const movies = data.results
console.log(movies)

    trendingMoviesPreviewList.innerHTML = "" //esta linea lo que hace es volver el article class="trendingPreview-movieList" a vacio antes de empezar a iterar y que cree de nuevo todas las imagenes de peliculas (asi no se repiten)

    movies.forEach(element => {
        const img = document.createElement("img")
        const div = document.createElement("div")
        const article = document.querySelector(".trendingPreview-movieList")

        img.classList.add("movie-img")
        img.setAttribute("alt", element.title)
        img.setAttribute("src", "https://image.tmdb.org/t/p/w300" + element.poster_path)
        
        div.classList.add("movie-container")
        div.addEventListener("click",()=>{
            location.hash = "#movie="+ element.id
        })

        div.appendChild(img)
        article.appendChild(div)

    });
};

async function categoriesPreviewMovies(){
    const {data} = await api("genre/movie/list")
console.log("genero", data)
    const genero = data.genres
console.log(genero)

    categoriesPreviewList.innerHTML = ""    //esta linea vuelve el article <article class="categoriesPreview-list"> a valor vacio antes de empezar a iterar y crear cada categoria (asi nos aseguramos que siempre que se llame la funcion arranque vacio y no se dupliquen)

    genero.forEach(element => {
        const h3 = document.createElement("h3")
        const div = document.createElement("div")
        const article = document.querySelector(".categoriesPreview-list")

        h3.classList.add("category-title")
        h3.setAttribute("id", "id"+element.id)
        h3.innerHTML = element.name
                
        div.classList.add("category-container")

        div.appendChild(h3)
        article.appendChild(div)

        h3.addEventListener("click", ()=>{
            location.hash = `#category=${element.id}-${element.name}`
        })
    });
};

async function getByCategory(id){
    const {data} = await api("discover/movie",{
        params: {
            with_genres: id,
        }
    }) //axios devuelve la solicitud en forma de objeto y parseado, no hace falta el .json()
console.log("trending", data)
    const movies = data.results
console.log(movies)

    genericSection.innerHTML = "" //esta linea lo que hace es volver el article class="trendingPreview-movieList" a vacio antes de empezar a iterar y que cree de nuevo todas las imagenes de peliculas (asi no se repiten)

    movies.forEach(element => {
        const img = document.createElement("img")
        const div = document.createElement("div")
        const article = document.querySelector(".trendingPreview-movieList")

        img.classList.add("movie-img")
        img.setAttribute("alt", element.title)
        img.setAttribute("src", "https://image.tmdb.org/t/p/w300" + element.poster_path)
        
        div.classList.add("movie-container")
        div.addEventListener("click",()=>{
            location.hash = "#movie="+ element.id
        })

        div.appendChild(img)
        genericSection.appendChild(div)

    });
};

async function getBySearch(search){
    const {data} = await api("search/movie",{
        params: {
            query: search,
        }
    }) //axios devuelve la solicitud en forma de objeto y parseado, no hace falta el .json()
console.log("trending", data)
    const movies = data.results
console.log(movies)

    genericSection.innerHTML = "" //esta linea lo que hace es volver el article class="trendingPreview-movieList" a vacio antes de empezar a iterar y que cree de nuevo todas las imagenes de peliculas (asi no se repiten)

    movies.forEach(element => {
        const img = document.createElement("img")
        const div = document.createElement("div")
        const article = document.querySelector(".trendingPreview-movieList")

        img.classList.add("movie-img")
        img.setAttribute("alt", element.title)
        img.setAttribute("src", "https://image.tmdb.org/t/p/w300" + element.poster_path)
        
        div.classList.add("movie-container")
        div.addEventListener("click",()=>{
            location.hash = "#movie="+ element.id
        })
        
        div.appendChild(img)
        genericSection.appendChild(div)

    });
};

async function getByTrend(){
    const {data} = await api("trending/movie/day") //axios devuelve la solicitud en forma de objeto y parseado, no hace falta el .json()
console.log("trending", data)
    const movies = data.results
console.log(movies)

  
genericSection.innerHTML = "" //esta linea lo que hace es volver el article class="trendingPreview-movieList" a vacio antes de empezar a iterar y que cree de nuevo todas las imagenes de peliculas (asi no se repiten)

movies.forEach(element => {
    const img = document.createElement("img")
    const div = document.createElement("div")
    const article = document.querySelector(".trendingPreview-movieList")

    img.classList.add("movie-img")
    img.setAttribute("alt", element.title)
    img.setAttribute("src", "https://image.tmdb.org/t/p/w300" + element.poster_path)
    
    div.classList.add("movie-container")
    div.addEventListener("click",()=>{
        location.hash = "#movie="+ element.id
    })

    div.appendChild(img)
    genericSection.appendChild(div)

});
};

async function moviePorId(id){
    const {data: movie} = await api("movie/"+id) //axios devuelve la solicitud en forma de objeto y parseado, no hace falta el .json()
        //data pasa a renombrarse -> movie

    const movieImg = "https://image.tmdb.org/t/p/w500" + movie.poster_path
    headerSection.style.background = `
    linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%) 
    ,url(${movieImg})`//el gradient hace mas oscura la imagen en la zona de la flecha para ir para atrás asi se ve
    
    movieDetailTitle.textContent = movie.title
    movieDetailDescription.textContent = movie.overview
    movieDetailScore.textContent = movie.vote_average

    movieDetailCategoriesList.innerHTML="";
    movie.genres.forEach(category=>{
        const categoryContainer=document.createElement('div');
        categoryContainer.classList.add('category-container');
        const categoryTitle=document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id','id'+category.id);
        categoryTitle.addEventListener('click',()=>{
            location.hash=`#category=${category.id}-${category.name}`;
        });
        const categoryTitleText=document.createTextNode(category.name);
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        movieDetailCategoriesList.appendChild(categoryContainer);
    });
    getPeliRelacionada(id)
};

async function getPeliRelacionada(id){
    const {data} = await api(`movie/${id}/similar`) //axios devuelve la solicitud en forma de objeto y parseado, no hace falta el .json()
    console.log("data", data)
        const movies = data.results
        console.log("movies", movies)

        relatedMoviesContainer.innerHTML='';
        movies.forEach(movie=>{
        const movieContainer=document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click',()=>{
            location.hash='#movie='+movie.id;
        });
            const movieImg=document.createElement('img');
            movieImg.classList.add('movie-img');
            movieImg.setAttribute('alt',movie.title);
            movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300'+movie.poster_path,);
            movieContainer.appendChild(movieImg);
            relatedMoviesContainer.appendChild(movieContainer);
        });

}
