import{a as u}from"./vendor-DW_MHI2K.js";const y="9a0d30072ad38e4a4c69d8b167f5dfc1",h="https://api.themoviedb.org/3",c="yedek-gorsel-url.jpg",d=async(e,t={})=>{var n;try{return(await u.get(`${h}${e}`,{params:{api_key:y,language:"en-US",...t}})).data}catch(s){return console.error(`API isteği basarisiz (${e}):`,((n=s.response)==null?void 0:n.data)||s.message),null}},w=async()=>{var t;const e=await d("/genre/movie/list");return((t=e==null?void 0:e.genres)==null?void 0:t.reduce((n,s)=>(n[s.id]=s.name,n),{}))||{}},L=async()=>{const e=await d("/trending/movie/day");return(e==null?void 0:e.results)||[]},v=async(e=3)=>{const t=document.querySelector(".weeklyTrendsContent");t.innerHTML="";try{const[n,s]=await Promise.all([L(),w()]);if(!n.length){console.warn("Film bulunamadı."),t.innerHTML="<p>Film bulunamadı.</p>";return}n.slice(0,e).forEach(r=>{var i;const a=r.poster_path?`https://image.tmdb.org/t/p/w500${r.poster_path}`:c,p=((i=r.genre_ids)==null?void 0:i.map(g=>s[g]||"Unknown").join(", "))||"Bilinmiyor",m=r.release_date||"Tarih bilinmiyor",o=document.createElement("div");o.classList.add("MovieCard"),o.style.cursor="pointer",o.dataset.movie=JSON.stringify(r),o.innerHTML=`
        <img class="MovieCardİmg" src="${a}" alt="${r.title}" />
        <div class="gradient-container"></div>
        <h3>${r.title}</h3>
        <p>${p} / ${m}</p>
      `,o.addEventListener("click",()=>$(r)),t.appendChild(o)})}catch(n){console.error("Filmler yüklenirken hata oluştu:",n),t.innerHTML="<p>Failed to load movies. Please try again later.</p>"}},$=e=>{const t=document.querySelector("#WTmovieModal"),n=document.querySelector(".WTmodal-content");if(!t||!n){console.error("Modal elemanları bulunamadı.");return}const s=e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:c;n.innerHTML=`
    <span class="close">&times;</span>
    <img src="${s}" alt="${e.title}" class="WTmodal-img"/>
    <h2>${e.title}</h2>
    <p><strong>Release Date:</strong> ${e.release_date||"Tarih bilinmiyor"}</p>
    <p><strong>Popularity:</strong> ${e.popularity||"Bilinmiyor"}</p>
    <p><strong>Overview:</strong> ${e.overview||"Açıklama mevcut değil."}</p>
  `,t.style.display="block";const r=a=>{(a.target===t||a.target.classList.contains("close")||a.key==="Escape")&&(t.style.display="none",window.removeEventListener("click",r),window.removeEventListener("keydown",r))};window.addEventListener("click",r),window.addEventListener("keydown",r)};document.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>v(3),100)});var l;(l=document.querySelector("#viewAll"))==null||l.addEventListener("click",()=>{window.location.href="catalog.html"});
//# sourceMappingURL=weekly-trends-DoJwOQaa.js.map
