// API key 
const accessKey = "EibsmJvAUJhEOscOEPbVfHmlOfSAYWipKB0udyx8310";

//variable that stores the form 
const formEl = document.querySelector("form");
//variable that stores the input element 
const inputEl = document.getElementById("search-input");
//variable that stores the images and their titles
const searchResults = document.querySelector(".search-results");
//Variable that stores the show more button
const showMore = document.getElementById("show-more-button");

// Variable for storing the search keyword 
let inputData = " ";
// Variable for storing the pae number
let page = 1;

// Function for searching the images using unsplash API
async function searchImages() {
    //Taking the value input element and storing it in inputData variable
    inputData = inputEl.value;
    
    const url = 'https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}'

    const response = await fetch(url);
    const data = await response.json()

    const results = data.results

    if (page === 1) {
        searchResults.innerHTML = ""
    }

    // Mapping of the search results to the container
    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault;
    page = 1;
    searchImages();
})

showMore.addEventListener("click", () => {
    searchImages();
})
