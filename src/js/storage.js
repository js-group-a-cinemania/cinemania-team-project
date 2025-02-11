const LIBRARY_KEY = "myLibrary";

// **Kütüphanedeki Filmleri Getir**
export function getLibraryMovies() {
    return JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];
}

// **Filmi Kütüphaneye Ekle**
export function addMovieToLibrary(movie) {
    console.log(`📌 Film ekleniyor: ${movie.title}`);
    
    let movies = getLibraryMovies();
    if (!movies.some(m => m.id === movie.id)) {
        movies.push(movie);
        localStorage.setItem("myLibrary", JSON.stringify(movies));
        
        console.log("✅ Film başarıyla eklendi!", getLibraryMovies()); // ✅ **Test Logu**
        Swal.fire({
            title: `${movie.title} Added to Library! 🎬`,
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#ff9800", // 🍊 Turuncu buton
            timer: 2500, // ⏳ 2.5 saniye sonra kapanır
            toast: true,
            showCloseButton: true,
        });

        // 📌 **My Library Sayfasını Güncelle**
        if (window.location.pathname.includes("mylibrary.html")) {
            displayLibraryMovies();
        }
    } else {
        console.log("⚠️ Film zaten kütüphanede!", getLibraryMovies());
        alert(`${movie.title} is already in My Library!`);
    }
}

// **Filmi Kütüphaneden Sil**
export function removeMovieFromLibrary(movieId) {
    let movies = getLibraryMovies();
    const movie = movies.find(m => m.id === movieId); // Kaldırılacak filmi bul

    if (!movie) return; // Eğer film yoksa işlem yapma

    movies = movies.filter(m => m.id !== movieId);
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(movies));

    // ✅ **SweetAlert ile kaldırma bildirimi**
    Swal.fire({
    
        text: `${movie.title} has been removed from your library.`,
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
    });

    // 📌 **Library Sayfasını Güncelle**
    if (window.location.pathname.includes("mylibrary.html")) {
        displayLibraryMovies();
    }
}


// **Film Kütüphanede Var mı?**
export function isMovieInLibrary(movieId) {
    let movies = getLibraryMovies();
    return movies.some(m => m.id === movieId);
}

// **Film Kütüphaneye Eklendi Mi? Toggle İşlemi**
export function toggleLibrary(movie) {
    let movies = getLibraryMovies();
    if (movies.some(m => m.id === movie.id)) {
        removeMovieFromLibrary(movie.id);
        return "Add to Library";
    } else {
        addMovieToLibrary(movie);
        return "Remove from Library";
    }
}
