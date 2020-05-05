const autoCompleteConfig = {
  // What renders for each result
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
    <img class = "card__img" src = "${imgSrc}"/>
    <h3 class = "card__title">${movie.Title}</h3>
    `;
  },

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

    console.log(response.data.Search)
    return response.data.Search;
  },
};

// createAutoComplete({
//   ...autoCompleteConfig,
//   // Element to put resultsin
//   root: document.querySelector("#left-autocomplete"),
//   // What happens when a movie is selected
//   onOptionSelect(movie) {
//     document.querySelector(".tutorial").classList.add("is-hidden");
//     onMovieSelect(movie, document.querySelector("#left-summary"), "left");
//   },
// });

// createAutoComplete({
//   ...autoCompleteConfig,
//   // Element to put resultsin
//   root: document.querySelector("#right-autocomplete"),
//   // What happens when a movie is selected
//   onOptionSelect(movie) {
//     document.querySelector(".tutorial").classList.add("is-hidden");
//     onMovieSelect(movie, document.querySelector("#right-summary"), "right");
//   },
// });
let leftMovie;
let rightMovie;

const onMovieSelect = async (movie, summaryElement, side) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "1ff2c261",
      i: movie.imdbID
    },
  });

  console.log(response.data);

  summaryElement.innerHTML = movieTemplate(response.data);

  if (side === "left") {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    runComparison();
  }
};

const runComparison = () => {
  const leftSideStats = document.querySelectorAll(
    "#left-summary .notification"
  );
  const rightSideStats = document.querySelectorAll(
    "#right-summary .notification"
  );

  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];

    const leftSideValue = parseInt(leftStat.dataset.value);
    const rightSideValue = parseInt(rightStat.dataset.value);

    if (rightSideValue > leftSideValue) {
      leftStat.classList.remove("is-primary");
      leftStat.classList.add("is-warning");
    } else {
      rightStat.classList.remove("is-primary");
      rightStat.classList.add("is-warning");
    }
  });
};

const movieTemplate = (movieDetail) => {
  const dollars = parseInt(
    movieDetail.BoxOffice.replace(/$/g, "").replace(/,/g, "")
  );
  const metascore = parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ""));

  const awards = movieDetail.Awards.split(" ").reduce((prev, word) => {
    const value = parseInt(word);

    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);

  return `
    <article class = "media">
      <figure class = "media-left">
        <p class = "image">
          <img src = "${movieDetail.Poster}" />
        </p>
      </figure>
      <div class = "content">
        <h1>${movieDetail.Title}</h1>
        <h4>${movieDetail.Genre}</h4>
        <p>${movieDetail.Plot}</p>
      </div>
    </article>
    <article data-value = "${awards}" class="notification is-primary">
      <p class = "title">${movieDetail.Awards}</p>
      <p class = "subtitle">Awards</p>
    </article>
    <article data-value = "${dollars}" class="notification is-primary">
      <p class = "title">${movieDetail.BoxOffice}</p>
      <p class = "subtitle">Box Office</p>
    </article>
    <article data-value = "${metascore}" class="notification is-primary">
      <p class = "title">${movieDetail.Metascore}</p>
      <p class = "subtitle">MetaScore</p>
    </article>
    <article data-value = "${imdbRating}" class="notification is-primary">
      <p class = "title">${movieDetail.imdbRating}</p>
      <p class = "subtitle">IMDB Rating</p>
    </article>
    <article data-value = "${imdbVotes}" class="notification is-primary">
      <p class = "title">${movieDetail.imdbVotes}</p>
      <p class = "subtitle">IMDB Votes</p>
    </article>
  `;
};

// const test = async (searchTerm) => {
//   const response = await axios.get("http://www.omdbapi.com/", {
//     params: {
//       apikey: "1ff2c261",
//       s: searchTerm,
//     },
//   });

//   if (response.data.Error) {
//     return [];
//   }

//   console.log(response.data)
//   return response.data;
// }

createAutoComplete({
  ...autoCompleteConfig,
  // Element to put resultsin
  root: document.querySelector(".results-wrapper"),

  searchInput: document.querySelector("#search-input"),
  // What happens when a movie is selected
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    console.log(movie);
  },
});

const dropdown = document.querySelector("#dropdown1");
const labelContent = `<img src="img/icon.jpg" class="dropdown__img">
<span class="dropdown__text">Tashman<span class = " dropdown__text--blue">1995</span></span>
<svg class="dropdown__icon">
  <use xlink:href="img/sprite.svg#icon-chevron-thin-down"> </use>
</svg>`;

//Drop Down creation

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


// TOP PICK FILMS GENERATOR
// let topPickFilms = ['Interstellar', 'inception', 'Django Unchained', '1917'];
// const topPicksContainer = document.querySelector('.top-picks');
// for(i = 0; i < topPickFilms.length; i++){
//   createFilmCard(topPickFilms[i], topPicksContainer);
// }
