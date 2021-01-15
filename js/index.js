const homeContent = document.getElementById("homeContent");
const searchResults = document.getElementById("searchResults");
const showDisplay = document.getElementById("showDisplay");
const shuffleDisplay = document.getElementById("shuffleDisplay");
const shuffleDisplayResults = document.getElementById("shuffleDisplayResults");
const compareDisplay = document.getElementById("compareDisplay");
const homeBtn = document.getElementById("home-btn");
const shuffleBtn = document.getElementById("random-btn");
const compareBtn = document.getElementById("compare-btn");
const searchBtn = document.getElementById("search-btn");
const shufflePageBtn = document.getElementById("shufflePageBtn");
const accountBtn = document.getElementById("account-btn");
const navToggleBtn = document.getElementById("navigation-toggle");
const navBar = document.querySelector(".side-bar");
const cornerLogo = document.querySelector(".side-bar__logo");
const gridSlider = document.querySelector("#grid-slider");
const gridSliderContainer = document.querySelector("#grid-slider-container");
const lscapeCardImages = document.querySelectorAll(".lscape-card__img");
const filmCardImages = document.querySelectorAll(".film-card__info-backdrop");
const compareSearchInputs = document.querySelectorAll(
  ".search__input--compare"
);

/////////////////////////////////////////////////////////////////
// LOADING INITIAL HOME PAGE
/////////////////////////////////////////////////////////////////

let centralContentStatus = "home";
let previousContentStatus = "home";

checkStatusUpdateContent(centralContentStatus);
centralContentHome = createCentralContent(homeContent);

/////////////////////////////////////////////////////////////////
// HOME PAGE HORIZONTAL SUGGESTIONS
/////////////////////////////////////////////////////////////////

const suggestionContainers = document.querySelectorAll(
  ".suggestions__cards-container"
);

suggestionContainers[1].classList.add("suggestions__cards-container--moveLeft");
const switchSuggestions = (e) => {
  let type = e.toElement.innerText;

  if (type === "Movies") {
    suggestionContainers[1].classList.remove(
      "suggestions__cards-container--moveLeft"
    );
    suggestionContainers[0].classList.add(
      "suggestions__cards-container--moveRight"
    );
    moviesSuggestionsBtn.classList.remove("suggestions__heading--not-selected");
    tvShowSuggestionsBtn.classList.add("suggestions__heading--not-selected");

  } else {
    suggestionContainers[1].classList.add(
      "suggestions__cards-container--moveLeft"
    );
    suggestionContainers[0].classList.remove(
      "suggestions__cards-container--moveRight"
    );
    moviesSuggestionsBtn.classList.add("suggestions__heading--not-selected");
    tvShowSuggestionsBtn.classList.remove("suggestions__heading--not-selected");
  }
};

/////////////////////////////////////////////////////////////////
// SHOWING DATA ON SELECTION
/////////////////////////////////////////////////////////////////

const onShowSelect = async (imdbID, targetEl) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "1ff2c261",
      i: imdbID,
    },
  });

  targetEl.innerHTML = "";

  targetEl.appendChild(showTemplate(response.data));

  if (targetEl === showDisplay) {
    checkStatusUpdateContent("show");
  } else if (targetEl === shuffleDisplayResults) {
    checkStatusUpdateContent("shuffle");
  }
};
/////////////////////////////////////////////////////////////////
// AUTO COMPLETE CONFIGURATION FOR ALL AUTO-COMPLETES
/////////////////////////////////////////////////////////////////

const autoCompleteConfig = {
  inputValue(movie) {
    return movie.Title;
  },

  //How data is fetched from the database
  async fetchData(searchTerm) {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "1ff2c261",
        s: searchTerm,
      },
    });

    if (response.data.Error) {
      return [];
    }

    return response.data.Search;
  },
};

const searchInput = document.querySelector("#search-input");

/////////////////////////////////////////////////////////////////
// TOP PAGE AUTOCOMPLETE
/////////////////////////////////////////////////////////////////

createAutoComplete({
  ...autoCompleteConfig,
  // resultsElement: document.querySelector(".results"),
  // Element to put results in
  root: document.querySelector("#searchResults"),
  status: "search",
  renderOption(show) {
    const imgSrc =
      show.Poster === "N/A"
        ? "https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg"
        : show.Poster;
    const showType = show.Type === "movie" ? "Film" : "Tv Show";
    return `
    <div class = "results-card__img-container">
      <img src="${imgSrc}" alt="" class="results-card__img bottom-margin-small">
      <div class="lscape-card__details">
        <h4 class="fourth-header bottom-margin-smaller">${show.Title}</h4>
        <div class="lscape-card__sub-details">
            <p class="sub-paragraph sub-paragraph--faded all-caps">${showType}</p>
            <p class="sub-paragraph sub-paragraph--faded all-caps">${show.Year}</p>
        </div>
      </div>
    </div>
    `;
  },
  optionClass: "results-card",
  optionsClass: "results",

  searchInput: searchInput,
  // What happens when a movie is selected
  onSelection: onShowSelect,
  resultOutputElement: showDisplay,
});

/////////////////////////////////////////////////////////////////
// SHOW COMPARE AUTOCOMPLETES
/////////////////////////////////////////////////////////////////

createAutoComplete({
  ...autoCompleteConfig,
  ...compareAutoCompleteConfig,
  root: document.querySelector("#rightDropdown"),
  searchInput: document.querySelector("#compare-input-right"),
  resultOutputElement: document.getElementById("comp-display-right"),
});

createAutoComplete({
  ...autoCompleteConfig,
  ...compareAutoCompleteConfig,
  root: document.querySelector("#leftDropdown"),
  searchInput: document.querySelector("#compare-input-left"),
  resultOutputElement: document.getElementById("comp-display-left"),
});

/////////////////////////////////////////////////////////////////
// TOGGLE NAV MENU FOR MOBILE
/////////////////////////////////////////////////////////////////

const toggleNavMenu = () => {
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth;

  if (viewportWidth <= 600) {
    console.log(viewportWidth);
    navToggleBtn.classList.toggle("side-bar__button--cross");
    navBar.classList.toggle("side-bar--nav-open");
    cornerLogo.classList.toggle("opacity-hidden");
  }
};

/////////////////////////////////////////////////////////////////
// RESULTS GRID SIZE SLIDER
/////////////////////////////////////////////////////////////////

document.getElementById("grid-slider").addEventListener("input", (event) => {
  updateGridSize(event.target.value.toString())
});

const updateGridSize = (size) => {
  const resultsGrid = document.querySelector(".results");
  resultsGrid.style[
    "grid-template-columns"
  ] = `repeat(auto-fit, minmax(${size}rem, 1fr))`;
};

//////////////////////////////////////////////////
// BUTTON EVENT LISTENERS
//////////////////////////////////////////////////

const moviesSuggestionsBtn = document.querySelector("#movieSuggestionsBtn");
const tvShowSuggestionsBtn = document.querySelector("#tvShowSuggestionsBtn");
moviesSuggestionsBtn.addEventListener("click", switchSuggestions);

tvShowSuggestionsBtn.addEventListener("click", switchSuggestions);

shufflePageBtn.addEventListener("click", randomSearch);

shuffleBtn.addEventListener("click", () => {
  randomSearch();
  searchInput.value = "";
  toggleNavMenu();
});

homeBtn.addEventListener("click", () => {
  checkStatusUpdateContent("home");
  searchInput.value = "";
  toggleNavMenu();
});

compareBtn.addEventListener("click", () => {
  checkStatusUpdateContent("compare");
  searchInput.value = "";
  toggleNavMenu();
});

searchBtn.addEventListener("click", () => {
  checkStatusUpdateContent("search");
  toggleNavMenu();
});

accountBtn.addEventListener("click", () => {
  userMenuNav.classList.add("user-menu--visible");
});

navToggleBtn.addEventListener("click", toggleNavMenu);

cornerLogo.addEventListener("click", () => {
  checkStatusUpdateContent("home");
  searchInput.value = "";
});

filmCardImages.forEach((card) => {
  card.addEventListener("click", () => {
    onShowSelect(card.dataset.id, showDisplay);
  });
});

