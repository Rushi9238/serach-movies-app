 // Get the 'imdbID' parameter from the URL
 const params = new URLSearchParams(window.location.search);
 const imdbID = params.get("imdbID");

 // Convert the minutes in hr if minutes is greater than 59min
 function convertMinutesToHours(data) {
   // console.log(data)
   const minutes = data.split(" ")[0];

   if (minutes <= 0) {
     return "0";
   }

   var hours = Math.floor(minutes / 60);
   var remainingMinutes = minutes % 60;

   if (hours === 0) {
     return remainingMinutes + " Minutes";
   } else if (remainingMinutes === 0) {
     return hours + " Hours";
   } else {
     return hours + " Hours " + remainingMinutes + " Minutes";
   }
 }

 function languageList(data) {
   const language = document.getElementById("language");
   if (language) {
     const lang = data.split(" ").filter((str) => str !== "");
     console.log(lang);
     lang.length > 0 &&
       lang.forEach((ele) => {
         const span = document.createElement("span");
         span.innerText = ele.replace(/,/g, ""); // Remove any commas from the language string
         language.appendChild(span);
       });
     //   console.log(language);
   }
 }

 // Define the fetchData function
 const fetchData = async (imdbID) => {
   // Make a request to the OMDB API
   const response = await fetch(
     `https://www.omdbapi.com/?i=${imdbID}&apikey=e2ac1245`
   );

   // Ensure the request was successful
   if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`);
   }

   // Get the response data as JSON
   const data = await response.json();
   return data;
 };

 // Define the renderDetails function
 const renderDetails = (details) => {
   // Get the container element
   const container = document.getElementById("movieDetailsPage");

   // Render the movie details
   container.innerHTML = `
     <div class="container-fluid">
       <div class="movieBanner">
           <div class="backGroundImg" style="background-image: url(${
             details.Poster
           });">
              <div class="wrapperDiv">
               <div class="movieName">${details.Title}</div>
               <div class="secondDiv">
                   <div class="date">• ${details.Released}</div>
                   <div class="time">• ${convertMinutesToHours(
                     details.Runtime
                   )}</div>
                   <div class="ratings">
                       <span>• IMDB Rating ${details.imdbRating}</span>
                       <img src="./Assets/Images/selectStar.png" alt="">
                   </div>
               </div>
               <div class="desc">
                   ${details.Plot}
               </div>
               <div id="language" class="language">
                   Director : ${details.Director}
                   
               </div>
               <div class="awards">
                   <img src="./Assets/Images/trophy.png" alt="">
                   <span>${details.Awards}</span>
               </div>
              </div>
           </div>
           <!-- <img class="img-fluid w-100" src="https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg" alt=""> -->
       </div>
       <div class="moviesDetails">
           <h3>Movies Details</h3>
           <table class="movie-table">
               <thead>
              <tr>
                   <th>Title:</th>
                   <td>${details.Title}</td>
                 </tr>
                 <tr>
                   <th>Year:
                   <td>${details.Year}</td>
                 </tr>
                 <tr>
              <th>Rated:</th>
                   <td>${details.Rated}</td>
                 </tr>
                 <tr>
                   <th>Released</th>
                   <td>${details.Released}</td>
                 </tr>
                 <tr>
                   <th>Runtime:</th>
                   <td>${convertMinutesToHours(details.Runtime)}</td>
                 </tr>
                 <tr>
                   <th>Genre:</th>
                   <td>${details.Genre}</td>
                 </tr>
                 <tr>
                   <th>Director:</th>
                   <td>${details.Director}</td>
                 </tr>
                 <tr>
                   <th>Writer:</th>
                   <td>${details.Writer}</td>
                 </tr>
                 <tr>
                   <th>Actors:</th>
                   <td>${details.Actors}</td>
                 </tr>
                 <tr>
                   <th>Plot:</th>
                   <td>${details.Plot}</td>
                 </tr>
                 <tr>
                   <th>Language:</th>
                   <td>${details.Language}</td>
                 </tr>
                 <tr>
                   <th>Country:</th>
                   <td>${details.Country}</td>
                 </tr>
                 <tr>
                   <th>Awards:</th>
                   <td>${details.Awards}</td>
                 </tr>
               </thead >
             </table>
       </div>
       <div class="backButton">
           <button onclick="goBack()">← Back</button>
       </div>

   </div>
     `;
 };

 function goBack() {
   window.history.back();
 }
 // Fetch the movie data and render it
 try {
   const movieData = fetchData(imdbID);
   movieData.then(renderDetails);
 } catch (error) {
   console.error("Error fetching movie details:", error);
 }