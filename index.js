const inputText = document.getElementById("query");
const root = document.getElementById("root");
let currentPage = 1;
let totalResults = 0;
let resultData = [];

async function serachFun(text, pageNo) {
  // console.log(inputText.value);
  root.innerHTML = "";
  try {
    const api = await fetch(
      `https://www.omdbapi.com/?s=${text}&apikey=e2ac1245&page=${pageNo}`
    );
    const respo = await api.json();
    return respo;
   
  } catch (error) {
    console.log(error);
  }
}

function withThreeDot(str){
    if(str.length > 15){
      let newStr = str.substring(0,20).concat('...')
      return newStr
    }else{
      return str
    }
  }

const showData=()=>{
    root.innerHTML=""
    resultData.forEach((item)=>{
        root.innerHTML += `
                <div class="ist col-lg-3 col-sm-6">
            <div class="cards">
              <img
                class="img-fluid"
                src=${item.Poster=="N/A"?'./Assets/Images/Untitled.jpg':`${item.Poster}`}
                alt="Rudra"
                class='img-fluid'
              />
              <div class="overlayDiv">
                <div class="movie_name">${withThreeDot(item.Title)}</div>
                <div class="date">${item.Year}</div>
                <div class="ratings">
                  ${item.Type}
                
                </div>
                <button onclick="gotoDetailsPage('${item.imdbID}')">More Details</button>
                <button onclick="addToFavour('${item.imdbID}','${item.Poster}','${item.Title}','${item.Year}','${item.Type}')">Add Favourite</button>
              </div>
            </div>
          </div>
                `
    })
                
}

const handelPagination=()=>{
    const totalPages = Math.ceil(totalResults / 10);
    const paginationUl = document.getElementById('pageList');
    paginationUl.innerHTML=''
    for (let i = 1; i <= totalPages; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = i;
        listItem.addEventListener('click', () => {
          currentPage = i;
          searchCommonFun();
        });
        paginationUl.appendChild(listItem);
      }
}

async function searchCommonFun() {
  const data = await serachFun(inputText.value, currentPage);
  if (data.Response === "True") {
    console.log("data", data);
    resultData = data.Search || []; 
    totalResults = parseInt(data.totalResults) || 0;

    // call function Data Show in Card Formate
    showData()
    
    // handel pagination API call Function
    // handelPagination()
  }
}

function gotoDetailsPage(imdbID){
  console.log('hello',imdbID)
  window.location.href = `movieDetail.html?imdbID=${imdbID}`;
}

// Add favourite Data
function addToFavour(id,img,name,year,type){
  const data={
    id,img,name,year,type
  }
 
  let favourites = JSON.parse(sessionStorage.getItem("favouritesMovies")) || [];
if (!favourites.some(fav => fav.id === data.id)) {
      favourites.push(data);
      sessionStorage.setItem("favouritesMovies", JSON.stringify(favourites));
      alert("Movies add to the favourite list ")
  }
  else{
    alert("Movies allrady add to the favourite list ")
  }
  showFavBtnHide()
};


// fav button get
const favBtn=document.getElementById('favoBtn');

function showFavBtnHide(){
  let favourites = JSON.parse(sessionStorage.getItem("favouritesMovies"))
  if(!favourites){
    favBtn.classList.add('d-none')
  }else{
    favBtn.classList.remove('d-none')
  }
}
showFavBtnHide()