const showTemplate = (show) => {
    const showRatings1 = show.Ratings[0].Value.split('/', 1);
    const showRatings2 = show.Ratings[1].Value.split('%', 1);
    const showRatings3 = show.Ratings[2].Value.split('/', 1);
    const showGenre = show.Genre.split(',', 3);


return `<div class="show">
    <div class="show__img-container">
      <img src="${show.Poster}" alt="" class="show__img bottom-margin">
      <div class="show__other-ratings">
        <div class="show__other-rating">
          <div class="rating__value bottom-margin-small">
            <span class="rating__main">${showRatings1}</span>
            <span class="rating__out-of">/10</span>
          </div>

          <h5 class="fifth-heading">
            Internet Movie Database
          </h5>
        </div>
        <div class="show__other-rating">
          <div class="rating__value bottom-margin-small">
            <span class="rating__main">${showRatings2}</span>
            <span class="rating__out-of">%</span>
          </div>
          <h5 class="fifth-heading">
            Rotten Tomatoes
          </h5>
        </div>
        <div class="show__other-rating">

          <div class="rating__value bottom-margin-small">
            <span class="rating__main">${showRatings3}</span>
            <span class="rating__out-of">/100</span>
          </div>
          <h5 class="fifth-heading">
            Metacritic
          </h5>
        </div>
      </div>
    </div>


    <div class="show__main-details">
      <div class="show__top-line">
        <div class="show__title-and-date">
          <h1 class="primary-heading primary-heading--show">${show.Title}</h1>
        </div>

        <div class="show__rating">
          <div class="rating">
            <div class="rating__value">
              <span class="rating__main">${show.imdbRating}</span>
              <span class="rating__out-of">/10</span>
            </div>
            
            <p class="rating__votes">${show.imdbVotes}</p>
            <p class="rating__votes">votes</p>
          </div>
        </div>
      </div>
      
      <hr class="hr bottom-margin">
      <div class="show__sub-titles bottom-margin">
        <p class="paragraph all-caps">${show.Type}</p>
        <p class="secondary-heading all-caps">|</p>
        <p class="paragraph all-caps">${show.Rated}</p>
        <p class="secondary-heading all-caps">|</p>
        <p class="paragraph all-caps">${show.Runtime}</p>
        <p class="secondary-heading all-caps">|</p>
        <p class="paragraph all-caps">${showGenre}</p>
      </div>
      <hr class="hr bottom-margin">
      <div class="show__plot">
        <p class="show__paragraph bottom-margin">${show.Plot}</p>
      </div>
      <hr class="hr bottom-margin">
        <p class="show__paragraph bottom-margin">Box Office: ${show.BoxOffice}</p>
      <hr class="hr bottom-margin">
        <p class="show__paragraph bottom-margin">${show.Awards}</p>
      <hr class="hr bottom-margin">
      <div class="show__people-involved">
        <p class="two-column">
          
          <span class="show__paragraph show__paragraph--bold">Director:</span>
          <span class="show__paragraph">${show.Director}</span>
          <span class="show__paragraph show__paragraph--bold">Cast:</span>
          <span class="show__paragraph ">${show.Actors}</span>
          <span class="show__paragraph show__paragraph--bold">Writers:</span>
          <span class="show__paragraph">${show.Writer}</span>
        </p>
      </div>


    </div>
  </div>
  `
  }
