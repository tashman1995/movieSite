const createFilmCard = (movie) => {
    const topPicksContainer = document.querySelector('.top-picks')
    
    const  fetchFilm  = async (movie) => {

        const response = await axios.get("http://www.omdbapi.com/", {
          params: {
            apikey: "1ff2c261",
            t: movie
          },
        });
    
        if (response.data.Error) {
            console.log(response.data.Error)
          return [];
        }
        return response.data;
    }

    const filmDetails = fetchFilm(movie);
    console.log(filmDetails)

    const cardElement = document.createElement('div');
    cardElement.classList.add('film-card');
    cardElement.innerHTML = `
    <img src="https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" alt="" class="film-card__img">
              <div class="film-card__info-backdrop">
                <div class="film-card__info">
                  <h3 class="tertiary-heading bottom-margin-small">Interstellar</h3>
                  <div class="film-card__details">
                    <p class="sub-paragraph all-caps">PG</p>
                    <p class="sub-paragraph all-caps">$44,0M</p>
                  </div>
                    <p class="sub-paragraph all-caps">Action, Adventure</p>  
                </div>
              </div>
    `;


    topPicksContainer.appendChild(cardElement)
      
}