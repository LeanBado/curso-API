searchFormBtn.addEventListener("click", () => {
    location.hash = "#search="+searchFormInput.value;
    }
);
  
trendingBtn.addEventListener("click", () => {
    location.hash = "#trends";
    }
);
  
arrowBtn.addEventListener("click", () => {
    location.hash = window.history.back()
    }
);

window.addEventListener("DOMContentLoaded", navigator, false)
window.addEventListener("hashchange", navigator, false)

function navigator(){
    if(location.hash.startsWith("#trends")){
        trends()
    } else if (location.hash.startsWith("#search=")){
        search()
    }else if (location.hash.startsWith("#movie=")){
        movie()
    }else if (location.hash.startsWith("#category=")){
        category()
    } else{
        home()
    }
};

function trends(){
    console.log("estas en trends")

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "Tendencias"
  getByTrend()
};

function search(){
    console.log("estas en search")

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const arr1 = location.hash.split("=")
  getBySearch(arr1[1])
};

function movie(){
    console.log("estas en movie")

  headerSection.classList.add("header-container--long");
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  const arr1 = location.hash.split("=")
  moviePorId(arr1[1])
};

function category(){
    console.log("estas en category")

    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.remove("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");
    
    // hash: #category=12-Adventure
    const arr1 = location.hash.split("=")
    console.log(arr1) // ["#category", "12-Adventure"]
    const arr2 = arr1[1].split("-")
    console.log(arr2) // ["12","Adventure"]

    headerCategoryTitle.innerHTML = arr2[1]
    getByCategory(arr2[0])
    
};

function home(){
    console.log("estas en home")

    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.add("inactive");
    headerTitle.classList.remove("inactive");
    headerCategoryTitle.classList.add("inactive");
    searchForm.classList.remove("inactive");
  
    trendingPreviewSection.classList.remove("inactive");
    categoriesPreviewSection.classList.remove("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.add("inactive");

    trendingPreviewMovies()
    categoriesPreviewMovies()
};
