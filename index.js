import"./assets/styles-DuRPrMN1.js";import"./assets/main-czpORc44.js";import"./assets/footer-Cc6FgX3v.js";import"./assets/weekly-trends-DoJwOQaa.js";import{a as n}from"./assets/vendor-DW_MHI2K.js";const o="https://api.themoviedb.org/3",r={accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWNhZjRmYjMwZTRhZGVkYTBjYjI1MTQ3NGFhYTdkYSIsIm5iZiI6MTczODM1NDIxMy4zNDgsInN1YiI6IjY3OWQyZTI1MTc2ZmRiMjI0NGNiMjkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ug0aezZ5htnawKCPoADR0i-JxcDzj43sBX4NiKOKbvg"};async function u(){try{return(await n.get(`${o}/genre/movie/list`,{params:{language:"en-US"},headers:r})).data.genres.reduce((a,e)=>(a[e.id]=e.name,a),{})}catch(t){return console.error("Türleri alırken hata oluştu:",t),{}}}async function m(){try{const t=await u(),e=(await n.get(`${o}/movie/upcoming`,{params:{language:"en-US",page:"1"},headers:r})).data.results[0];if(!e){console.error("Film verisi bulunamadı.");return}const i=`https://image.tmdb.org/t/p/w500${e.poster_path}`,p=e.genre_ids.map(c=>t[c]||"Unknown").join(", "),l=`
    <img class="UpdateImg" src="${i}" alt="movie poster"/>
    <div class="UpdateElementDetails">
      <h2 class="DetailsTitle">${e.original_title}</h2>
      <p class="DetailsContent">Release date <span class="SpanDate">${e.release_date}</span></p>
      <p class="DetailsContent">Vote / Votes <span class="SpanVotes"><span class="SpanVote">${e.vote_average}</span> / <span class="SpanVote">${e.vote_count}</span></span></p>
      <p class="DetailsContent">Popularity <span class="SpanPopular">${e.popularity}</span></p>
      <p class="DetailsContent">Genre <span class="SpanGenre">${p}</span></p>
      <h3 class="DetailsAbout">ABOUT</h3>
      <p class="AboutContent">${e.overview}</p>
      <button type="button" class="addToLibraryButton">Add to my library</button>
    </div>`,s=document.querySelector(".movieInfoContent");s?s.insertAdjacentHTML("beforeend",l):console.error("Belirtilen .movieInfoContent div'i bulunamadı.")}catch(t){console.error("Hata oluştu:",t)}}m();
//# sourceMappingURL=index.js.map
