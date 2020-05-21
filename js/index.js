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
const userMenuNav = document.querySelector(".user-menu");
const lscapeCardImages = document.querySelectorAll(".lscape-card__img");
const filmCardImages = document.querySelectorAll(".film-card__info-backdrop");
const compareSearchInputs = document.querySelectorAll(
  ".search__input--compare"
);
const userMenu = document.querySelector("#dropdownHeader");

let centralContentStatus = "home";
let previousContentStatus = "home";

checkStatusUpdateContent(centralContentStatus);
centralContentHome = createCentralContent(homeContent);

// SELECTED SHOW DISPLAY

const onShowSelect = async (imdbID, targetEl) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "1ff2c261",
      i: imdbID,
    },
  });

  // console.log(response.data);

  targetEl.innerHTML = "";

  targetEl.appendChild(showTemplate(response.data));

  if (targetEl === showDisplay) {
    checkStatusUpdateContent("show");
  } else if (targetEl === shuffleDisplayResults) {
    checkStatusUpdateContent("shuffle");
  }
};

//AUTO COMPLETE

const autoCompleteConfig = {
  // What renders for each result

  //What the value of the search bar becomes when an option is selected
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

const checkIfInputValue = () => {
  if (searchInput.value) {
  } else {
  }
};

// TOP PAGE AUTOCOMPLETE

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

//////////////////////////////////////////////////
// USER MENU DROP DOWN
//////////////////////////////////////////////////

const labelContent = `<img src="img/icon.jpg" class="dropdown__img">
<span class="dropdown__text">Tashman<span class = " dropdown__text--blue">1995</span></span>
<svg class="dropdown__icon">
  <use xlink:href="img/sprite.svg#icon-chevron-thin-down"> </use>
</svg>`;

createDropdown({
  dropdownElement: userMenu,
  labelContent: labelContent,
  options: ["Account", "Pro Features", "Settings", "Log Out"],
  onToggle(options) {
    const optionsElements = options.querySelectorAll(".dropdown__option");
    options.classList.toggle("dropdown__options--show");
    for (option of optionsElements) {
      option.classList.toggle("dropdown__option--show");
    }
    const icon = document.querySelector(".dropdown__icon");
    icon.classList.toggle("dropdown__icon--rotated");
  },
  hideOptionsEl(options) {
    const optionsElements = options.querySelectorAll(".dropdown__option");
    options.classList.remove("dropdown__options--show");
    for (option of optionsElements) {
      option.classList.remove("dropdown__option--show");
    }
    const icon = document.querySelector(".dropdown__icon");
    icon.classList.remove("dropdown__icon--rotated");
  },
});

//////////////////////////////////////////////////
// HOME PAGE HORIZONTAL SUGGESTIONS
//////////////////////////////////////////////////
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

//////////////////////////////////////////////////
// COMPARE AUTOCOMPLETES
//////////////////////////////////////////////////

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

//////////////////////////////////////////////////
// TOGGLE NAV MENU
//////////////////////////////////////////////////

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

searchInput.addEventListener("input", checkIfInputValue);
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
});

// TOP PICKS EVENT LISTENER
filmCardImages.forEach((card) => {
  card.addEventListener("click", () => {
    onShowSelect(card.dataset.id, showDisplay);
  });
});

// TOP PICK FILMS GENERATOR
// let topPickFilms = ['Interstellar', 'inception', 'Django Unchained', '1917'];
// const topPicksContainer = document.querySelector('.top-picks');
// for(i = 0; i < topPickFilms.length; i++){
//   createFilmCard(topPickFilms[i], topPicksContainer);
// }
