const createFilmCard = async (movie, targetElement) => {
  const fetchFilm = async (movie) => {
    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        apikey: "1ff2c261",
        t: movie,
      },
    });

    return response.data;
  };

  const results = await fetchFilm(movie);

  const boxOffice = parseInt(
    results.BoxOffice.replace(/\D/g, "") / 1000000
  ).toFixed(0);

  const genres = results.Genre.split(", ", 2);
  const genresString = genres[0] + ",  " + genres[1];

  const cardElement = document.createElement("div");
  cardElement.classList.add("film-card");
  cardElement.innerHTML = `
    <img src="${results.Poster}" alt="" class="film-card__img">
              <div class="film-card__info-backdrop">
                <div class="film-card__info">
                  <h3 class="tertiary-heading bottom-margin-small">${results.Title}</h3>
                  <div class="film-card__details">
                    <p class="sub-paragraph all-caps">${results.Rated}</p>
                    <p class="sub-paragraph all-caps">$${boxOffice}M</p>
                  </div>
                    <p class="sub-paragraph smaller all-caps">${genresString}</p>  
                </div>
              </div>
    `;

  targetElement.appendChild(cardElement);
};
