const k="myLibrary";function u(){return JSON.parse(localStorage.getItem(k))||[]}function C(e){console.log(`📌 Film ekleniyor: ${e.title}`);let t=u();t.some(n=>n.id===e.id)?(console.log("⚠️ Film zaten kütüphanede!",u()),alert(`${e.title} is already in My Library!`)):(t.push(e),localStorage.setItem("myLibrary",JSON.stringify(t)),console.log("✅ Film başarıyla eklendi!",u()),Swal.fire({title:`${e.title} Added to Library! 🎬`,icon:"success",confirmButtonText:"OK",confirmButtonColor:"#ff9800",timer:2500,toast:!0,showCloseButton:!0}),window.location.pathname.includes("mylibrary.html")&&displayLibraryMovies())}function O(e){let t=u();const n=t.find(o=>o.id===e);n&&(t=t.filter(o=>o.id!==e),localStorage.setItem(k,JSON.stringify(t)),Swal.fire({text:`${n.title} has been removed from your library.`,icon:"error",timer:2e3,showConfirmButton:!1}),window.location.pathname.includes("mylibrary.html")&&displayLibraryMovies())}function T(e){return u().some(n=>n.id===e.id)?(O(e.id),"Add to Library"):(C(e),"Remove from Library")}const w="myLibrary";function q(){return JSON.parse(localStorage.getItem(w))||[]}function F(e){let t=q().filter(n=>n.id!==e);localStorage.setItem(w,JSON.stringify(t)),console.log(`❌ Movie ID ${e} removed from Library!`)}//! MOBIL MENU
document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("menu-toggle"),t=document.getElementById("mobil"),n=document.getElementById("backdrop"),o=document.getElementById("mobil-nav");e.addEventListener("click",function(a){a.preventDefault(),t.classList.add("active"),n.classList.add("active"),o.style.display="block"}),document.addEventListener("click",function(a){const s=t.contains(a.target),r=e.contains(a.target);!s&&!r&&(t.classList.remove("active"),n.classList.remove("active"))})});function _(){const e=document.getElementById("genreFilter");if(!e)return;let t=JSON.parse(localStorage.getItem("myLibrary"))||[],n=new Set;t.forEach(o=>{o.genres&&o.genres.forEach(a=>n.add(JSON.stringify({id:a.id,name:a.name})))}),e.innerHTML='<option value="all">All Genres</option>',n.forEach(o=>{let a=JSON.parse(o);e.innerHTML+=`<option value="${a.id}">${a.name}</option>`}),e.addEventListener("change",h)}function h(){const e=document.getElementById("genreFilter").value;let t=JSON.parse(localStorage.getItem("myLibrary"))||[];e!=="all"&&(t=t.filter(n=>n.genres.some(o=>o.id==e))),j(t)}function j(e){const t=document.querySelector(".library-movies"),n=document.querySelector(".empty-library-message");if(!t||!n){console.error("❌ Library container veya boş mesaj elementi bulunamadı!");return}if(e.length===0){n.style.display="block",t.innerHTML="<p>No movies found in this genre!</p>";return}else n.style.display="none";t.innerHTML=e.map(o=>`
        <li class="movie-card">
            <img src="https://image.tmdb.org/t/p/w500${o.poster_path}" alt="${o.title}">
            <h3>${o.title}</h3>
            <p><strong>Release Date:</strong> ${o.release_date}</p>
            <button class="library-btn" data-id="${o.id}">Remove Add Library</button>
        </li>
    `).join(""),document.querySelectorAll(".library-btn").forEach(o=>{o.addEventListener("click",a=>{const s=Number(a.target.dataset.id);F(s),h()})})}document.addEventListener("DOMContentLoaded",()=>{document.getElementById("genreFilter")&&(_(),h())});document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".search-button");e&&e.addEventListener("click",function(){window.location.href="catalog.html"})});document.addEventListener("DOMContentLoaded",async()=>{await I()});console.log("📌 library.js yüklendi mi?",u());//! DARK MODE-LIGHT MODE
document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("darkmode-toggle"),t=document.body;localStorage.getItem("darkMode")==="enabled"&&(t.classList.add("dark-mode"),e.checked=!0),e.addEventListener("change",function(){this.checked?(t.classList.add("dark-mode"),localStorage.setItem("darkMode","enabled")):(t.classList.remove("dark-mode"),localStorage.setItem("darkMode","disabled"))})});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".year-dropdown");if(!e){console.error("Hata: Year dropdown elementi HTML içinde bulunamadı!");return}e.addEventListener("change",async function(){const t=this.value;console.log(`📅 ${t} yılına ait filmler listeleniyor...`),await $(t)})});//! DARK MODE-LIGHT MODE SONU
const g="9a0d30072ad38e4a4c69d8b167f5dfc1",f="https://api.themoviedb.org/3",H="https://image.tmdb.org/t/p/w500";document.addEventListener("DOMContentLoaded",async()=>{await S(),await M()});document.addEventListener("DOMContentLoaded",()=>{M()});function M(){const e=document.querySelector(".year-dropdown");if(!e){console.error("Year dropdown elementi bulunamadı!");return}const t=new Date().getFullYear(),n=1900;e.innerHTML='<option value="">Year</option>';for(let o=t;o>=n;o--){const a=document.createElement("option");a.value=o,a.textContent=o,e.appendChild(a)}}document.querySelector(".year-dropdown").addEventListener("change",async function(){const e=this.value;e&&(console.log(`📅 ${e} yılına ait filmler listeleniyor...`),await $(e))});async function $(e){const t="9a0d30072ad38e4a4c69d8b167f5dfc1",n="https://api.themoviedb.org/3";try{const a=await(await fetch(`${n}/discover/movie?api_key=${t}&primary_release_year=${e}`)).json();a.results.length>0?v(a.results):(console.warn(`❌ ${e} yılına ait film bulunamadı.`),document.querySelector(".gallery-movies").innerHTML=`<p>No movies found for ${e}</p>`)}catch(o){console.error("API'den film listesi alınırken hata oluştu:",o)}}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".gallery-movies"),t=document.getElementById("movie-modal"),n=document.querySelector(".modal-movie-info-container"),o=document.getElementById("close-modal");if(!e||!t||!n||!o){console.error("Modal veya film galerisi elementi bulunamadı!");return}e.addEventListener("click",async r=>{r.preventDefault();const i=r.target.closest(".gallery-movies-item");if(!i){console.warn("Tıklanan öğe bir film kartı değil!");return}const l=i.dataset.id;if(!l){console.error("Film ID bulunamadı!");return}console.log("Tıklandı, film ID:",l);try{const c=await s(l);a(c)}catch(c){console.error("Film detayları yüklenirken hata oluştu:",c)}});function a(r){var p;const i=document.getElementById("movie-modal"),l=document.querySelector(".modal-movie-info-container");l.innerHTML=`
    <h2 class="modal-title">${r.title||"Unknown Title"}</h2>
    <img height="500" class="modal-poster" src="${r.poster_path?`https://image.tmdb.org/t/p/w500${r.poster_path}`:"./img/no-image.png"}" alt="${r.title}" />
    <p><strong>Overview:</strong> ${r.overview||"No description available."}</p>
    <p><strong>Genres:</strong> ${((p=r.genres)==null?void 0:p.map(y=>y.name).join(", "))||"Unknown"}</p>
    <p><strong>Release Date:</strong> ${r.release_date||"Unknown"}</p>
    <button id="add-to-library-btn" class="library-button">${u().some(y=>y.id===r.id)?"❌ Remove from Library":"📚 Add to Library"}</button>
  `,i.style.display="flex",i.classList.add("open");const c=document.getElementById("add-to-library-btn");c?c.addEventListener("click",()=>{console.log("📌 Add to Library butonuna tıklandı!"),T(r)}):console.error("❌ Add to Library butonu bulunamadı!")}document.querySelector(".hero-text-container").addEventListener("click",async r=>{if(r.target&&r.target.classList.contains("js-details-btn")){const i=r.target.dataset.id;if(!i){console.error("Film ID bulunamadı!");return}try{const l=await s(i);a(l)}catch(l){console.error("Film detayları yüklenirken hata oluştu:",l)}}}),o.addEventListener("click",()=>{t.style.display="none",t.classList.remove("open")}),t.addEventListener("click",r=>{r.target===t&&(t.style.display="none",t.classList.remove("open"))}),document.addEventListener("keydown",r=>{r.key==="Escape"&&(t.style.display="none",t.classList.remove("open"))});async function s(r){const c=await(await fetch(`https://api.themoviedb.org/3/movie/${r}?api_key=9a0d30072ad38e4a4c69d8b167f5dfc1`)).json();return console.log("🎥 API'den Gelen Film Verisi:",c),c}});function N(e){const{title:t,backdrop_path:n,vote_average:o,overview:a,id:s}=e,r=document.querySelector(".hero-text-container");r.innerHTML=`
    <div class="image-container">
        <img class="section-hero-img" src="${H}${n}" alt="${t}">
        <div class="gradient-container"></div>
    </div>
    <div class="section-hero-content">
        <h1 class="title section-hero-title">${t}</h1>
        <p class="star-rating-hero">${B(o)}</p>
        <p class="text hero-text">${a}</p>
        <ul class="btn-list">
            <li><button class="btn js-trailer-btn" data-id="${s}">Watch trailer</button></li>
            <li><button class="btn-details js-details-btn" data-id="${s}">More details</button></li>
        </ul>
        <div class="background-container"></div>
    </div>
  `}let E={};async function I(){try{(await(await fetch(`${f}/genre/movie/list?api_key=${g}`)).json()).genres.forEach(n=>{E[n.id]=n.name})}catch(e){console.error("Film türleri alınırken hata oluştu:",e)}}async function S(){await I();const t=await(await fetch(`${f}/trending/movie/week?api_key=${g}`)).json();t.results.length>0&&(N(t.results[0]),v(t.results))}function v(e){const t=document.querySelector(".gallery-movies");t.innerHTML=e.map(({title:n,poster_path:o,vote_average:a,id:s,release_date:r,genre_ids:i})=>{const l=r?r.split("-")[0]:"Unknown",c=B(a),p=i.map(y=>E[y]||"Unknown").join(", ");return`
        <li class="gallery-movies-item" data-id="${s}">
          <img class="gallery-movies-img" src="https://image.tmdb.org/t/p/original/${o}" alt="${n}" loading="lazy">
          <div class="gallery-movies-overlay js-modal-info" data-id="${s}"></div>
          <div class="gallery-movies-description">
            <h3 class="gallery-movies-title">${n}</h3>
            <div class="gallery-movies-wrap">
              <p class="gallery-movies-details">${p} | ${l}</p>
            </div>
          </div>
          <div class="star-rating">${c}</div>
        </li>
      `}).join("")}function B(e){const t=Math.round(e/2);return"★".repeat(t)+"☆".repeat(5-t)}document.addEventListener("DOMContentLoaded",()=>{S()});//! MOBIL MENU
document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("menu-toggle"),t=document.getElementById("mobil"),n=document.getElementById("backdrop"),o=document.getElementById("mobil-nav");e.addEventListener("click",function(a){a.preventDefault(),t.classList.add("active"),n.classList.add("active"),o.style.display="block"}),document.addEventListener("click",function(a){const s=t.contains(a.target),r=e.contains(a.target);!s&&!r&&(t.classList.remove("active"),n.classList.remove("active"))})});//! MOBIL MENU SON
//!MOVIE SEARCH
document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("search-form"),t=document.getElementById("form-input"),n=document.querySelector(".search-input2"),o=document.querySelector(".close-icon"),a=document.querySelector(".catalog-movie-container");e.addEventListener("submit",async function(r){r.preventDefault();const i=t.value.trim();i&&(await s(i),n.value=i)}),o.addEventListener("click",function(){n.value=""});async function s(r){try{const l=await(await fetch(`${f}/search/movie?api_key=${g}&query=${r}`)).json();l.results.length>0?v(l.results):a.innerHTML='<p class="no-results">OOPS...<br>We are very sorry!<br>We don’t have any results matching your search.</p>'}catch(i){console.error("Hata:",i)}}});//!MOVIE SEARCH SONU
//! PAGINATION KISMI
const L=document.getElementById("pagination-container");let d=1;const b=500;let m=1;async function D(e=1){try{if(e>b){console.error(`Maksimum ${b} sayfayı geçemezsiniz.`);return}const n=await(await fetch(`${f}/movie/popular?api_key=${g}&page=${e}`)).json();m=Math.min(n.total_pages,b),v(n.results),P()}catch(t){console.error("API'den veri alınırken hata oluştu:",t)}}function P(){L.innerHTML="";let e="";d>1&&(e+=`
      <button class="pagination-btn" onclick="changePage(1)">&laquo;</button>
    `),d>1&&(e+=`
      <button class="pagination-btn" onclick="changePage(${d-1})">&lt;</button>
    `),d>3&&(e+='<span class="pagination-dots">...</span>');for(let t=Math.max(1,d-1);t<=Math.min(m,d+1);t++)e+=`
      <button class="pagination-btn ${d===t?"active":""}" onclick="changePage(${t})">${t}</button>
    `;d<m-2&&(e+='<span class="pagination-dots">...</span>'),d<m&&(e+=`
      <button class="pagination-btn" onclick="changePage(${d+1})">&gt;</button>
    `),d<m&&(e+=`
      <button class="pagination-btn" onclick="changePage(${m})">&raquo;</button>
    `),L.innerHTML=e}window.changePage=function(e){e<1||e>m||(d=e,D(e))};document.addEventListener("DOMContentLoaded",()=>{D()});//! PAGINATION SONU
//! TRAILER MODAL
document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("click",async n=>{const o=n.target.closest(".js-trailer-btn");if(o){const a=o.dataset.id;console.log(`🎬 Fragman açılıyor, Film ID: ${a}`),await e(a)}});async function e(n){const o=document.querySelector(".trailer-modal"),a=document.getElementById("trailer-frame"),s=document.querySelector(".backdrop-trailer");try{const l=(await(await fetch(`https://api.themoviedb.org/3/movie/${n}/videos?api_key=${g}`)).json()).results.find(c=>c.type==="Trailer");l?(a.src=`https://www.youtube.com/embed/${l.key}`,o.style.display="flex",s.style.display="block",o.classList.add("show")):alert("Fragman bulunamadı!")}catch(r){console.error("Fragman yüklenirken hata oluştu:",r)}}function t(){const n=document.querySelector(".trailer-modal"),o=document.getElementById("trailer-frame"),a=document.querySelector(".backdrop-trailer");n.classList.remove("show"),a.style.display="none",o.src=""}document.addEventListener("click",t),document.addEventListener("keydown",n=>{n.key==="Escape"&&t()}),document.querySelector(".trailer-modal").addEventListener("click",n=>{n.stopPropagation()})});
//# sourceMappingURL=catalog-CkzMJLle.js.map
