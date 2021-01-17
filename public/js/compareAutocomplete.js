const runComparison = () => {
    const leftSide = document.querySelector("#comp-display-left");
  
    const rightSide = document.querySelector("#comp-display-right");
  
    const leftSideStats = leftSide.querySelectorAll(".movie-details");
    const rightSideStats = rightSide.querySelectorAll(".movie-details");
  
    leftSideStats.forEach((leftStat, index) => {
      const rightStat = rightSideStats[index];
  
      if (rightSideStats.length > 0) {
        const leftSideValue = parseInt(leftStat.dataset.value);
        const rightSideValue = parseInt(rightStat.dataset.value);
        console.log("left ", leftSideValue);
        console.log(leftSideValue === NaN);
        console.log("right ", rightSideValue);
  
        if (rightSideValue > leftSideValue || Number.isNaN(leftSideValue)) {
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
    const dollars = parseInt(data.BoxOffice.replace(/\D/g, ""));
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
    const container = document.createElement("div");
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
  
  
  `;
    return container;
  };
  
  const onCompareShowSelect = async (imdbID, targetEl, dropdownEl) => {
    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        apikey: "1ff2c261",
        i: imdbID,
      },
    });
  
    dropdownEl.classList.add("drop-down--hidden");
  
    targetEl.innerHTML = "";
  
    targetEl.appendChild(showCompareTemplate(response.data));
  
    runComparison();
  };
  
  const compareAutoCompleteConfig = {
    optionClass: "drop-down__option",
    optionsClass: "drop-down",
    status: "compare",
    onSelection: onCompareShowSelect,
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
  };