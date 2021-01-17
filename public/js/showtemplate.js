const showTemplate = (show) => {
  console.log(show)
  let showRatings1 = 'N/A';
  let showRatings2 = 'N/A';
  let showRatings3 = 'N/A';
  let showSpecificData = ''

  if(show.Ratings){
    if(show.Ratings[0]){
      showRatings1 = show.Ratings[0].Value.split('/', 1);
    } 
    if(show.Ratings[1]){
      showRatings2 = show.Ratings[1].Value.split('%', 1);
    } 
    if(show.Ratings[2]){
      showRatings3 = show.Ratings[2].Value.split('/', 1);
    }
  }
  

  if(show.Type === 'series') {
    showSpecificData = `<span class = "show__paragraph--bold" >Duration:&nbsp;&nbsp;&nbsp;</span>${show.totalSeasons} Seasons,    ${show.Year}`
  } else if (show.Type === 'movie') {
    showSpecificData = `<span class = "show__paragraph--bold"> Box Office:</span> ${show.BoxOffice}`
  }

  const showGenre = show.Genre.split(',', 3);

  const showEl = document.createElement('div');
  showEl.classList.add('show');
  showEl.innerHTML = `
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
      <p class="show__paragraph bottom-margin">${showSpecificData}</p>
    <hr class="hr bottom-margin">
      <p class="show__paragraph bottom-margin"><span class = "show__paragraph--bold" >Awards:</span> ${show.Awards}</p>
    <hr class="hr bottom-margin">
    <div class="show__people-involved">
      
        
        <p class="show__paragraph"><span class=" show__paragraph--bold">Director:&nbsp;&nbsp;&nbsp;</span>${show.Director}</p>
        
        <p class="show__paragraph"><span class=" show__paragraph--bold">Cast:&nbsp;&nbsp;&nbsp;</span>${show.Actors}</p>

        <p class="show__paragraph"><span class=" show__paragraph--bold">Writers:&nbsp;&nbsp;&nbsp;</span>${show.Writer}</p>
      
    </div>


  </div>

`

  return showEl;
}
