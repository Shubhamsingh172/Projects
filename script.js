const accessKey = "YfGrzhSDd-_7Kl5SubHe9l1WIKvNaZNUlzug5ASPfBM";

const searchForm = document.getElementById("search-form");  // Fixed incorrect ID name
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;

    // ✅ Removed spaces around `=` in the URL query parameters (they were causing invalid API requests)
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;

    const response = await fetch(url);
    
    if (!response.ok) {
        console.error("Failed to fetch data:", response.status);
        return;
    }

    const data = await response.json();
    const results = data.results;

    if (page === 1) {
        searchResult.innerHTML = "";  // ✅ Clear previous results when starting a new search
    }

    results.forEach((result) => {   // ✅ Fixed incorrect arrow function syntax
        const image = document.createElement("img");   // ✅ Fixed typo: `doucment` → `document`
        image.src = result.urls.small;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.appendChild(image);

        searchResult.appendChild(imageLink);
    });

    // ✅ Show the "Show More" button only if there are results
    if (results.length > 0) {
        showMoreBtn.style.display = "block";
    } else {
        showMoreBtn.style.display = "none";
    }
}

// ✅ Added event listener for the "Show More" button to load more results
showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});
