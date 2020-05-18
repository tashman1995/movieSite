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
const lscapeCardImages = document.querySelectorAll(".lscape-card__img");
const filmCardImages = document.querySelectorAll(".film-card__info-backdrop");
const compareSearchInputs = document.querySelectorAll('.search__input--compare');


let centralContentStatus = "compare";
let previousContentStatus = "compare";

// MOVIES AND TV FILM SUGGESTIONS

centralContentHome = createCentralContent(homeContent);

checkStatusUpdateContent(centralContentStatus);

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

// TOP PICKS EVENT LISTENER
filmCardImages.forEach((card) => {
  card.addEventListener("click", () => {
    onShowSelect(card.dataset.id, showDisplay);
  });
});

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
  status: 'search',
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
  resultOutputElement: showDisplay
});

/// DROP DOWN
const dropdown = document.querySelector("#dropdown1");
const labelContent = `<img src="img/icon.jpg" class="dropdown__img">
<span class="dropdown__text">Tashman<span class = " dropdown__text--blue">1995</span></span>
<svg class="dropdown__icon">
  <use xlink:href="img/sprite.svg#icon-chevron-thin-down"> </use>
</svg>`;

createDropdown({
  dropdownElement: dropdown,
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

// SUGGESTIONS FUNCTIONALITY

const moviesSuggestionsBtn = document.querySelector("#movieSuggestionsBtn");
const tvShowSuggestionsBtn = document.querySelector("#tvShowSuggestionsBtn");
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

// RANDOM SEARCH



//ADD EVENT LISTENERS
moviesSuggestionsBtn.addEventListener("click", switchSuggestions);
tvShowSuggestionsBtn.addEventListener("click", switchSuggestions);
shuffleBtn.addEventListener("click", randomSearch);
shufflePageBtn.addEventListener("click", randomSearch);

searchInput.addEventListener("input", checkIfInputValue);
homeBtn.addEventListener("click", () => {
  checkStatusUpdateContent("home");
  searchInput.value = "";
});
compareBtn.addEventListener("click", () => {
  checkStatusUpdateContent("compare");
});

/////////////////////////////////////
// DATABASE COMPARISON
////////////////////////////////////////

const runComparison = () => {
  const leftSide = document.querySelector(
    "#comp-display-left"
  );

  const rightSide = document.querySelector(
    "#comp-display-right"
  );

  const leftSideStats = leftSide.querySelectorAll('.movie-details')
  const rightSideStats = rightSide.querySelectorAll(".movie-details");

  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];
    
    if(rightSideStats.length > 0){
      const leftSideValue = parseInt(leftStat.dataset.value);
      const rightSideValue = parseInt(rightStat.dataset.value);

      if (rightSideValue > leftSideValue || leftSideValue === NaN) {
        leftStat.classList.add("movie-details__lower");
        leftStat.classList.remove("movie-details__higher");
        rightStat.classList.remove("movie-details__lower");
        rightStat.classList.add("movie-details__higher"); 
      } else {
        rightStat.classList.add("movie-details__lower");
        rightStat.classList.remove("movie-details__higher");
        leftStat.classList.remove("movie-details__lower");
        leftStat.classList.add("movie-details__higher");
      }
    }

  });
};

const showCompareTemplate = (data) => {
const genre = data.Genre.split(",", 2);
  const dollars = parseInt(
    data.BoxOffice.replace(/\D/g,'')
  );
  const metascore = parseInt(data.Metascore);
  const imdbRating = parseFloat(data.imdbRating);
  const imdbVotes = parseInt(data.imdbVotes.replace(/,/g, ""));
  const awards = data.Awards.split(" ").reduce((prev, word) => {
    const value = parseInt(word);

    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);
const container = document.createElement('div');
container.innerHTML = `
  <div class="comp-display__top bottom-margin">
    <div class="comp-display__top--left">
      <img src="${data.Poster}" alt="" class="comp-display__img">
    </div>
    <div class="comp-display__top--right">
      <h2 class="secondary-heading bottom-margin">${data.Title}</h2>
      <p class="paragraph">
      ${data.Plot}
      </p>
    </div>
  </div>
  <hr class="hr bottom-margin">
  <div class="show__sub-titles bottom-margin">
    <p class="paragraph all-caps">${data.Type}</p>
    <p class="secondary-heading all-caps">|</p>
    <p class="paragraph all-caps">${data.Runtime}</p>
    <p class="secondary-heading all-caps">|</p>
    <p class="paragraph all-caps">${data.Rated}</p>
    <p class="secondary-heading all-caps">|</p>
    <p class="paragraph all-caps">${genre}</p>
  </div>
  <hr class="hr bottom-margin">
  <article data-value = "${awards}" class="movie-details bottom-margin">
  <h3 class="tertiary-heading bottom-margin-small">
    Awards
  </h3>
  <p  class="paragraph">
    ${data.Awards}
  </p>
  </article>
  <hr class="hr bottom-margin">
  <article data-value = "${dollars}" class="movie-details bottom-margin">
  <h3 class="tertiary-heading bottom-margin-small">
    Box Office
  </h3>
  <p  class="paragraph">
  ${data.BoxOffice}
  </p>
  </article>
  <hr class="hr bottom-margin">
  <article data-value = "${metascore}" class="movie-details bottom-margin">
  <h3 class="tertiary-heading bottom-margin-small">
    Metascore
  </h3>
  <p  class="paragraph">
  ${data.Metascore}/10
  </p>
  </article>
  <hr class="hr bottom-margin">
  <article data-value = "${imdbRating}" class="movie-details bottom-margin">
  <h3 class="tertiary-heading bottom-margin-small">
    imdb Rating
  </h3>
  <p  class="paragraph">
  ${data.imdbRating}/10
  </p>
  </article>


`
return container
}

const onCompareShowSelect = async (imdbID, targetEl, dropdownEl) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "1ff2c261",
      i: imdbID,
    },
  });

  dropdownEl.classList.add('drop-down--hidden')
  
  targetEl.innerHTML = "";

  targetEl.appendChild(showCompareTemplate(response.data));

  runComparison()

};

createAutoComplete({
  ...autoCompleteConfig,
  renderOption(show) {
    const imgSrc =
      show.Poster === "N/A"
        ? "https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg"
        : show.Poster;
    return `
      <hr class="hr hr--light">
      <div class = "drop-down__details">
      <img src="${imgSrc}" alt="" class="drop-down__img">
      <h3 class="tertiary-heading dark-text">${show.Title}</h3>
      </div>
    `;

    
  },
  optionClass: "drop-down__option",
  optionsClass: "drop-down",
  status: 'compare',
  // Element to put resultsin
  root: document.querySelector("#rightDropdown"),
  searchInput: document.querySelector("#compare-input-right"),
  // What happens when a movie is selected
  onSelection: onCompareShowSelect,
  resultOutputElement: document.getElementById('comp-display-right')
});



createAutoComplete({
  ...autoCompleteConfig,
  renderOption(show) {
    const imgSrc =
      show.Poster === "N/A"
        ? "https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg"
        : show.Poster;
        
    return `
      <hr class="hr hr--light">
      <div class = "drop-down__details">
      <img src="${imgSrc}" alt="" class="drop-down__img">
      <h3 class="tertiary-heading dark-text">${show.Title}</h3>
      </div>
    `;
    
  },
  optionClass: "drop-down__option",
  optionsClass: "drop-down",
  status: 'compare',
  // Element to put resultsin
  root: document.querySelector("#leftDropdown"),
  searchInput: document.querySelector("#compare-input-left"),
  // What happens when a movie is selected
  onSelection: onCompareShowSelect,
  resultOutputElement: document.getElementById('comp-display-left')
});


// TOP PICK FILMS GENERATOR
// let topPickFilms = ['Interstellar', 'inception', 'Django Unchained', '1917'];
// const topPicksContainer = document.querySelector('.top-picks');
// for(i = 0; i < topPickFilms.length; i++){
//   createFilmCard(topPickFilms[i], topPicksContainer);
// }
