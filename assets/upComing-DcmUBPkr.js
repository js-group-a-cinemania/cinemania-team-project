import{a as g}from"./vendor-DW_MHI2K.js";const f="9a0d30072ad38e4a4c69d8b167f5dfc1",L="https://api.themoviedb.org/3",y="yedek-gorsel-url.jpg";let p=JSON.parse(localStorage.getItem("movieLibrary"))||[];const b=async(e,t={})=>{var o;try{return(await g.get(`${L}${e}`,{params:{api_key:f,language:"en-US",...t}})).data}catch(n){return console.error(`API isteği başarısız (${e}):`,((o=n.response)==null?void 0:o.data)||n.message),null}},$=async()=>{var t;const e=await b("/genre/movie/list");return((t=e==null?void 0:e.genres)==null?void 0:t.reduce((o,n)=>(o[n.id]=n.name,o),{}))||{}},S=async()=>{const e=await b("/trending/movie/day");return(e==null?void 0:e.results)||[]},T=async(e=3)=>{const t=document.querySelector(".weeklyTrendsContent");t.innerHTML="";try{const[o,n]=await Promise.all([S(),$()]);if(!o.length){console.warn("Film bulunamadı."),t.innerHTML="<p>Film bulunamadı.</p>";return}o.slice(0,e).forEach(a=>{var c;const r=a.poster_path?`https://image.tmdb.org/t/p/w500${a.poster_path}`:y,d=((c=a.genre_ids)==null?void 0:c.map(i=>n[i]||"Unknown").join(", "))||"Bilinmiyor",l=a.release_date||"Tarih bilinmiyor",s=document.createElement("div");s.classList.add("MovieCard"),s.style.cursor="pointer",s.dataset.movie=JSON.stringify(a),s.innerHTML=`
        <img class="MovieCardİmg" src="${r}" alt="${a.title}" />
        <div class="gradient-container"></div>
        <h3>${a.title}</h3>
        <p>${d} / ${l}</p>
        <div class="stars">${w(a.vote_average)}</div>
      `,s.addEventListener("click",()=>k(a,n)),t.appendChild(s)})}catch(o){console.error("Filmler yüklenirken hata oluştu:",o),t.innerHTML="<p>Failed to load movies. Please try again later.</p>"}},w=e=>{const t=Math.round(e)/2;return"⭐".repeat(Math.floor(t))},k=(e,t)=>{var c;const o=document.querySelector("#WTmovieModal"),n=document.querySelector(".WTmodal-content");if(!o||!n){console.error("Modal elemanları bulunamadı.");return}const a=e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:y,r=p.some(i=>i.id===e.id),d=((c=e.genre_ids)==null?void 0:c.map(i=>t[i]||"Unknown").join(", "))||"Bilinmiyor";n.innerHTML=`
    <span class="close">&times;</span>
    <img src="${a}" alt="${e.title}" class="WTmodal-img"/>
    <h2>${e.title}</h2>
    <p><strong>Vote / Votes:</strong> ${e.vote_average.toFixed(1)} / ${e.vote_count}</p>
    <p><strong>Popularity:</strong> ${e.popularity}</p>
    <p><strong>Genre:</strong> ${d}</p>
    <p><strong>About:</strong> ${e.overview||"Açıklama mevcut değil."}</p>
    <button class="addToLibraryButton" data-movie-id="${e.id}">
      ${r?"Remove from library":"Add to my library"}
    </button>
  `,o.style.display="block";const l=i=>{(i.target===o||i.target.classList.contains("close")||i.key==="Escape")&&(o.style.display="none",window.removeEventListener("click",l),window.removeEventListener("keydown",l))};window.addEventListener("click",l),window.addEventListener("keydown",l);const s=n.querySelector(".addToLibraryButton");s.addEventListener("click",()=>E(e,s))},E=(e,t)=>{p.some(n=>n.id===e.id)?(p=p.filter(n=>n.id!==e.id),t.innerText="Add to my library"):(p.push(e),t.innerText="Remove from library"),localStorage.setItem("movieLibrary",JSON.stringify(p))};document.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>T(3),100)});var u;(u=document.querySelector("#viewAll"))==null||u.addEventListener("click",()=>{window.location.href=`${window.location.origin}/cinemania-team-project/catalog.html`});document.getElementById("darkmode-toggle").addEventListener("change",function(){document.querySelector(".weeklyTrendsTitle").style.color=this.checked?"":"#111111"});const v="cacaf4fb30e4adeda0cb251474aaa7da",h="https://api.themoviedb.org/3";let m=JSON.parse(localStorage.getItem("movieLibrary"))||[];async function M(){try{const e=await fetch(`${h}/movie/upcoming?api_key=${v}&language=en-US&page=1`);if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);const o=(await e.json()).results;let n="";if(o.length>0){const r=o[0],d=r.poster_path?`https://image.tmdb.org/t/p/w500${r.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",l=m.some(i=>Number(i.id)===Number(r.id)),s=await _(),c=r.genre_ids.map(i=>s[i]).join(", ");n=`
        <div class="UpcomingMovie">
          <img class="UpdateImg" src="${d}" alt="${r.title} Poster" />
          <div class="UpcomingMovieContent">
            <h2 class="DetailsTitle">${r.title}</h2>
            <p class="DetailsContent">Release date <span class="SpanDate">${r.release_date}</span></p>
            <p class="DetailsContent">Vote / Votes <span class="SpanVotes"><span class="SpanVote">${r.vote_average}</span> / <span class="SpanVote">${r.vote_count}</span></span></p>
            <p class="DetailsContent">Popularity <span class="SpanPopular">${r.popularity}</span></p>
            <p class="DetailsContent">Genre <span class="SpanGenre">${c}</span></p>
            <h3 class="DetailsAbout">ABOUT</h3>
            <p class="AboutContent">${r.overview}</p>    
            <button type="button" class="addToLibraryButton" data-movie-id="${r.id}">
              ${l?"Remove from library":"Add to my library"}
            </button>
          </div>
        </div>`}const a=document.querySelector(".movieInfoContent");a&&(a.innerHTML=n),document.querySelectorAll(".addToLibraryButton").forEach(r=>{r.addEventListener("click",A)})}catch(e){console.error("Upcoming filmleri alırken hata oluştu:",e.message)}}async function _(){try{return(await g.get(`${h}/genre/movie/list`,{params:{language:"en-US",api_key:v}})).data.genres.reduce((t,o)=>(t[o.id]=o.name,t),{})}catch(e){return console.error("Türleri alırken hata oluştu:",e),{}}}function A(e){var l;const t=e.target,o=t.getAttribute("data-movie-id"),n=(l=t.closest(".UpcomingMovie"))==null?void 0:l.querySelector(".DetailsTitle");if(!n)return;const a=n.innerText,r={id:o,title:a};m.some(s=>Number(s.id)===Number(r.id))?(m=m.filter(s=>Number(s.id)!==Number(r.id)),t.innerText="Add to my library"):(m.push(r),t.innerText="Remove from library"),localStorage.setItem("movieLibrary",JSON.stringify(m))}document.addEventListener("DOMContentLoaded",M);document.getElementById("darkmode-toggle").addEventListener("change",function(){const e=this.checked;document.querySelector(".sectionUpComingTitle").style.color=e?"":"#111111",document.querySelector(".AboutContent").style.color=e?"":"#282828",document.querySelector(".SpanPopular").style.color=e?"":"#282828",document.querySelector("body").style.backgroundColor=e?"#000000":"",document.querySelector(".logo-text").style.color=e?"#ffffff":""});
//# sourceMappingURL=upComing-DcmUBPkr.js.map
