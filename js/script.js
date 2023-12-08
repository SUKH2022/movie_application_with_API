// link of the webpage document of the website
// https://developer.themoviedb.org/docs

// Add constants for student information
const studentId = "200520246";
const studentName = "Sukhpreet Saini";

// DOM elements for student information
const studentInfoElement = document.getElementById("studentInfo");
const showStudentInfoButton = document.getElementById("showStudentInfo");

// Event listener for the button click
showStudentInfoButton.addEventListener("click", () => {
    displayStudentInfo();
});

// Function to display Student ID and Name
function displayStudentInfo() {
    // Format the student information and set it to the <p> tag
    const formattedStudentInfo = `Student ID: ${studentId}, Name: ${studentName}`;
    studentInfoElement.textContent = formattedStudentInfo;
}

// DOM element for the new button
const showTopRatedButton = document.getElementById("showTopRated");

// Event listener for the new button click
showTopRatedButton.addEventListener("click", () => {
    const topRatedAPIURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=04c35731a5ee918f014970082a0088b1&page=1";
    getMovies(topRatedAPIURL);
});

// Constants for API URLs
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// DOM elements
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// DOM element for the "Load More" button
const loadMoreButton = document.getElementById("loadMore");

// Variable to track the current page
let currentPage = 1;

// Event listener for the "Load More" button click
loadMoreButton.addEventListener("click", () => {
    currentPage++;
    const nextPageURL = `${APIURL}&page=${currentPage}`;
    getMovies(nextPageURL, true);
});

// Fetch and display movies on page load
getMovies(APIURL);

// Async function to fetch movies from the API
async function getMovies(url, append) {
    try {
        const resp = await fetch(url);

        if (!resp.ok) {
            throw new Error('Network response was not ok');
        }

        const respData = await resp.json();

        console.log(respData);

        showMovies(respData.results, append);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

// Display movies on the page
function showMovies(movies, append) {
    if (!append) {
        // Clear main if not appending
        main.innerHTML = "";
    }

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

// Determine the CSS class based on the movie rating
function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

// Event listener for the form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});

// DOM element for the "Return to Top" button
const returnToTopButton = document.getElementById("returnToTop");

// Event listener for the "Return to Top" button click
returnToTopButton.addEventListener("click", scrollToTop);

// Function to scroll to the top of the page
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari browser
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera browser
}