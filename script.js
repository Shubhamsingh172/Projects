const accessKey = "YfGrzhSDd-_7Kl5SubHe9l1WIKvNaZNUlzug5ASPfBM";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;

    console.log("Fetching:", url); // Debugging URL

    const response = await fetch(url);

    if (!response.ok) {
        console.error("Error fetching data:", response.status);
        return;
    }

    const data = await response.json();

    if (page === 1) {
        searchResult.innerHTML = ""; // Clear previous results on a new search
    }

    data.results.forEach((result) => {
        const img = document.createElement("img");
        img.src = result.urls.small;
        img.alt = result.alt_description;

        const downloadBtn = document.createElement("a");
        downloadBtn.href = result.urls.full;
        downloadBtn.target = "_blank"; // Opens in a new tab
        downloadBtn.innerText = "Download";
        downloadBtn.classList.add("download-btn");

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
        imageContainer.appendChild(img);
        imageContainer.appendChild(downloadBtn);

        searchResult.appendChild(imageContainer);
    });

    showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
