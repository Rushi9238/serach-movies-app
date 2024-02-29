
const root1 = document.getElementById("root1");
console.log(root1);

function withThreeDot(str){
    if(str.length > 15){
      let newStr = str.substring(0,20).concat('...')
      return newStr
    }else{
      return str
    }
  }

const showData1=()=>{
    let favourites = JSON.parse(sessionStorage.getItem("favouritesMovies"))
    root1.innerHTML=""
   if(favourites.length>3){
    favourites.forEach((item)=>{
      root1.innerHTML += `
              <div class="ist col-lg-3 col-sm-6">
          <div class="cards">
            <img
              class="img-fluid"
              src=${item.img=="N/A"?'./Assets/Images/Untitled.jpg':`${item.img}`}
              alt="Rudra"
              class='img-fluid'
            />
            <div class="overlayDiv">
              <div class="movie_name">${withThreeDot(item.name)}</div>
              <div class="date">${item.year}</div>
              <div class="ratings">
                ${item.type}
              
              </div>
              <button onclick="gotoDetailsPage('${item.id}')">More Details</button>
              <button onclick="removeFavour('${item.id}')">remove Favourite</button>
            </div>
          </div>
        </div>
              `
  })
   } else {
    root1.innerHTML=`
    <h4 class='miniList'>Add at least 4 movies in your list</h4>
    `
   }
                
}

function removeFavour(id){
    let favourites = JSON.parse(sessionStorage.getItem("favouritesMovies"))
    const filterData=favourites.filter((ele)=>ele.id!==id)
    console.log(filterData); 
    sessionStorage.setItem('favouritesMovies',JSON.stringify(filterData))  
    showData1()

}

showData1()