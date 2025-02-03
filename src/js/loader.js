const loader = document.querySelector(".loader");

export function showLoader() {
    loader.style.display = "block";
}

export function hideLoader() {
    loader.style.display = "none";
}

export function loadMoviesWithLoader(callback) {
    showLoader();
    setTimeout(() => {
        callback();
        hideLoader();
    }, 1000);
}
