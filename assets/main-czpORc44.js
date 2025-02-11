const w="myLibrary";function u(){return JSON.parse(localStorage.getItem(w))||[]}function C(e){console.log(`📌 Film ekleniyor: ${e.title}`);let t=u();t.some(n=>n.id===e.id)?(console.log("⚠️ Film zaten kütüphanede!",u()),alert(`${e.title} is already in My Library!`)):(t.push(e),localStorage.setItem("myLibrary",JSON.stringify(t)),console.log("✅ Film başarıyla eklendi!",u()),Swal.fire({title:`${e.title} Added to Library! 🎬`,icon:"success",confirmButtonText:"OK",confirmButtonColor:"#ff9800",timer:2500,toast:!0,showCloseButton:!0}),window.location.pathname.includes("mylibrary.html")&&displayLibraryMovies())}function D(e){let t=u();const n=t.find(o=>o.id===e);n&&(t=t.filter(o=>o.id!==e),localStorage.setItem(w,JSON.stringify(t)),Swal.fire({text:`${n.title} has been removed from your library.`,icon:"error",timer:2e3,showConfirmButton:!1}),window.location.pathname.includes("mylibrary.html")&&displayLibraryMovies())}function O(e){return u().some(n=>n.id===e.id)?(D(e.id),"Add to Library"):(C(e),"Remove from Library")}const M="myLibrary";function T(){return JSON.parse(localStorage.getItem(M))||[]}function q(e){let t=T().filter(n=>n.id!==e);localStorage.setItem(M,JSON.stringify(t)),console.log(`❌ Movie ID ${e} removed from Library!`)}function F(){const e=document.getElementById("genreFilter");if(!e)return;let t=JSON.parse(localStorage.getItem("myLibrary"))||[],n=new Set;t.forEach(o=>{o.genres&&o.genres.forEach(r=>n.add(JSON.stringify({id:r.id,name:r.name})))}),e.innerHTML='<option value="all">All Genres</option>',n.forEach(o=>{let r=JSON.parse(o);e.innerHTML+=`<option value="${r.id}">${r.name}</option>`}),e.addEventListener("change",h)}function h(){const e=document.getElementById("genreFilter").value;let t=JSON.parse(localStorage.getItem("myLibrary"))||[];e!=="all"&&(t=t.filter(n=>n.genres.some(o=>o.id==e))),H(t)}function H(e){const t=document.querySelector(".library-movies"),n=document.querySelector(".empty-library-message");if(!t||!n){console.error("❌ Library container veya boş mesaj elementi bulunamadı!");return}if(e.length===0){n.style.display="block",t.innerHTML="<p>No movies found in this genre!</p>";return}else n.style.display="none";t.innerHTML=e.map(o=>`
        <li class="movie-card">
            <img src="https://image.tmdb.org/t/p/w500${o.poster_path}" alt="${o.title}">
            <h3>${o.title}</h3>
            <p><strong>Release Date:</strong> ${o.release_date}</p>
            <button class="library-btn" data-id="${o.id}">Remove Add Library</button>
        </li>
    `).join(""),document.querySelectorAll(".library-btn").forEach(o=>{o.addEventListener("click",r=>{const d=Number(r.target.dataset.id);q(d),h()})})}document.addEventListener("DOMContentLoaded",()=>{document.getElementById("genreFilter")&&(F(),h())});document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".search-button");e&&e.addEventListener("click",function(){window.location.href="catalog.html"})});document.addEventListener("DOMContentLoaded",async()=>{await S()});console.log("📌 library.js yüklendi mi?",u());//! DARK MODE-LIGHT MODE
document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("darkmode-toggle"),t=document.body;localStorage.getItem("darkMode")==="enabled"&&(t.classList.add("dark-mode"),e.checked=!0),e.addEventListener("change",function(){this.checked?(t.classList.add("dark-mode"),localStorage.setItem("darkMode","enabled")):(t.classList.remove("dark-mode"),localStorage.setItem("darkMode","disabled"))})});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".year-dropdown");if(!e){console.error("Hata: Year dropdown elementi HTML içinde bulunamadı!");return}e.addEventListener("change",async function(){const t=this.value;console.log(`📅 ${t} yılına ait filmler listeleniyor...`),await $(t)})});//! DARK MODE-LIGHT MODE SONU
const p="9a0d30072ad38e4a4c69d8b167f5dfc1",f="https://api.themoviedb.org/3";document.addEventListener("DOMContentLoaded",async()=>{await I(),await k()});document.addEventListener("DOMContentLoaded",()=>{k()});function k(){const e=document.querySelector(".year-dropdown");if(!e){console.error("Year dropdown elementi bulunamadı!");return}const t=new Date().getFullYear(),n=1900;e.innerHTML='<option value="">Year</option>';for(let o=t;o>=n;o--){const r=document.createElement("option");r.value=o,r.textContent=o,e.appendChild(r)}}document.querySelector(".year-dropdown").addEventListener("change",async function(){const e=this.value;e&&(console.log(`📅 ${e} yılına ait filmler listeleniyor...`),await $(e))});async function $(e){const t="9a0d30072ad38e4a4c69d8b167f5dfc1",n="https://api.themoviedb.org/3";try{const r=await(await fetch(`${n}/discover/movie?api_key=${t}&primary_release_year=${e}`)).json();r.results.length>0?v(r.results):(console.warn(`❌ ${e} yılına ait film bulunamadı.`),document.querySelector(".gallery-movies").innerHTML=`<p>No movies found for ${e}</p>`)}catch(o){console.error("API'den film listesi alınırken hata oluştu:",o)}}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".gallery-movies"),t=document.getElementById("movie-modal"),n=document.querySelector(".modal-movie-info-container"),o=document.getElementById("close-modal");if(!e||!t||!n||!o){console.error("Modal veya film galerisi elementi bulunamadı!");return}e.addEventListener("click",async a=>{a.preventDefault();const i=a.target.closest(".gallery-movies-item");if(!i){console.warn("Tıklanan öğe bir film kartı değil!");return}const l=i.dataset.id;if(!l){console.error("Film ID bulunamadı!");return}console.log("Tıklandı, film ID:",l);try{const c=await d(l);r(c)}catch(c){console.error("Film detayları yüklenirken hata oluştu:",c)}});function r(a){var g;const i=document.getElementById("movie-modal"),l=document.querySelector(".modal-movie-info-container");l.innerHTML=`
      <h2 class="modal-title">${a.title||"Unknown Title"}</h2>
      <img height="500" class="modal-poster" src="${a.poster_path?`https://image.tmdb.org/t/p/w500${a.poster_path}`:"./img/no-image.png"}" alt="${a.title}" />
      <p><strong>Overview:</strong> ${a.overview||"No description available."}</p>
      <p><strong>Genres:</strong> ${((g=a.genres)==null?void 0:g.map(y=>y.name).join(", "))||"Unknown"}</p>
      <p><strong>Release Date:</strong> ${a.release_date||"Unknown"}</p>
      <button id="add-to-library-btn" class="library-button">${u().some(y=>y.id===a.id)?"❌ Remove from Library":"📚 Add to Library"}</button>
    `,i.style.display="flex",i.classList.add("open");const c=document.getElementById("add-to-library-btn");c?c.addEventListener("click",()=>{console.log("📌 Add to Library butonuna tıklandı!"),O(a)}):console.error("❌ Add to Library butonu bulunamadı!")}o.addEventListener("click",()=>{t.style.display="none",t.classList.remove("open")}),t.addEventListener("click",a=>{a.target===t&&(t.style.display="none",t.classList.remove("open"))}),document.addEventListener("keydown",a=>{a.key==="Escape"&&(t.style.display="none",t.classList.remove("open"))});async function d(a){const c=await(await fetch(`https://api.themoviedb.org/3/movie/${a}?api_key=9a0d30072ad38e4a4c69d8b167f5dfc1`)).json();return console.log("🎥 API'den Gelen Film Verisi:",c),c}});let E={};async function S(){try{(await(await fetch(`${f}/genre/movie/list?api_key=${p}`)).json()).genres.forEach(n=>{E[n.id]=n.name})}catch(e){console.error("Film türleri alınırken hata oluştu:",e)}}async function I(){await S();const t=await(await fetch(`${f}/trending/movie/week?api_key=${p}`)).json();v(t.results)}function v(e){const t=document.querySelector(".gallery-movies");t.innerHTML=e.map(({title:n,poster_path:o,vote_average:r,id:d,release_date:a,genre_ids:i})=>{const l=a?a.split("-")[0]:"Unknown",c=_(r),g=i.map(y=>E[y]||"Unknown").join(", ");return`
        <li class="gallery-movies-item" data-id="${d}">
          <img class="gallery-movies-img" src="https://image.tmdb.org/t/p/original/${o}" alt="${n}" loading="lazy">
          <div class="gallery-movies-overlay js-modal-info" data-id="${d}"></div>
          <div class="gallery-movies-description">
            <h3 class="gallery-movies-title">${n}</h3>
            <div class="gallery-movies-wrap">
              <p class="gallery-movies-details">${g} | ${l}</p>
            </div>
          </div>
          <div class="star-rating">${c}</div>
        </li>
      `}).join("")}function _(e){const t=Math.round(e/2);return"★".repeat(t)+"☆".repeat(5-t)}document.addEventListener("DOMContentLoaded",()=>{I()});//! MOBIL MENU
document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("menu-toggle"),t=document.getElementById("mobil"),n=document.getElementById("backdrop"),o=document.getElementById("mobil-nav");e.addEventListener("click",function(r){r.preventDefault(),t.classList.add("active"),n.classList.add("active"),o.style.display="block"}),document.addEventListener("click",function(r){const d=t.contains(r.target),a=e.contains(r.target);!d&&!a&&(t.classList.remove("active"),n.classList.remove("active"))})});//! MOBIL MENU SON
//!MOVIE SEARCH
document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("search-form"),t=document.getElementById("form-input"),n=document.querySelector(".search-input2"),o=document.querySelector(".close-icon"),r=document.querySelector(".catalog-movie-container");e.addEventListener("submit",async function(a){a.preventDefault();const i=t.value.trim();i&&(await d(i),n.value=i)}),o.addEventListener("click",function(){n.value=""});async function d(a){try{const l=await(await fetch(`${f}/search/movie?api_key=${p}&query=${a}`)).json();l.results.length>0?v(l.results):r.innerHTML='<p class="no-results">OOPS...<br>We are very sorry!<br>We don’t have any results matching your search.</p>'}catch(i){console.error("Hata:",i)}}});//!MOVIE SEARCH SONU
//! PAGINATION KISMI
const L=document.getElementById("pagination-container");let s=1;const b=500;let m=1;async function B(e=1){try{if(e>b){console.error(`Maksimum ${b} sayfayı geçemezsiniz.`);return}const n=await(await fetch(`${f}/movie/popular?api_key=${p}&page=${e}`)).json();m=Math.min(n.total_pages,b),v(n.results),N()}catch(t){console.error("API'den veri alınırken hata oluştu:",t)}}function N(){L.innerHTML="";let e="";s>1&&(e+=`
      <button class="pagination-btn" onclick="changePage(1)">&laquo;</button>
    `),s>1&&(e+=`
      <button class="pagination-btn" onclick="changePage(${s-1})">&lt;</button>
    `),s>3&&(e+='<span class="pagination-dots">...</span>');for(let t=Math.max(1,s-1);t<=Math.min(m,s+1);t++)e+=`
      <button class="pagination-btn ${s===t?"active":""}" onclick="changePage(${t})">${t}</button>
    `;s<m-2&&(e+='<span class="pagination-dots">...</span>'),s<m&&(e+=`
      <button class="pagination-btn" onclick="changePage(${s+1})">&gt;</button>
    `),s<m&&(e+=`
      <button class="pagination-btn" onclick="changePage(${m})">&raquo;</button>
    `),L.innerHTML=e}window.changePage=function(e){e<1||e>m||(s=e,B(e))};document.addEventListener("DOMContentLoaded",()=>{B()});//! PAGINATION SONU
window.global||(window.global=window);
//# sourceMappingURL=main-czpORc44.js.map
