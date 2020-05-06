const createCentralContent = () => {
    const container = document.createElement('div');
    container.classList.add('central-content__container');
    const baseImg = createBaseImg(darkKnight);
    const suggestions = createSuggestions(tvShows);

    container.appendChild(baseImg);
    container.appendChild(suggestions);

    return container;
}


const createBaseImg = (filmData) => {
    const baseContainer = document.createElement('div');
    baseContainer.classList.add('base__container');
    baseContainer.innerHTML = `
        
            <img
            class="base__img"
            src="${filmData.poster}"
            alt=""
            />
            <div class="base">
            <div class="base__info">
                <h2 class="primary-heading bottom-margin">${filmData.title}</h2>
                <div class="base__sub-details">
                <h3 class="tertiary-heading bottom-margin">${filmData.ageRating}</h3>
                <h3 class="tertiary-heading bottom-margin">
                ${filmData.genre}
                </h3>
                <h3 class="tertiary-heading bottom-margin">${filmData.rating}</h3>
                </div>
                <div class="paragraph bottom-margin">
                ${filmData.plot}
                </div>
                <div class="base__ctas">
                <button class="colour-btn">Learn More</button>
                <div class="base__play-trailer">
                    <!-- <a href="#" class="base__play-link">
                    Play Trailer
                    </a> -->
                </div>
                </div>
            </div>
            </div>

    `
    return baseContainer;
}

const createSuggestions = (shows) => {
    const suggestions = document.createElement('div');
    suggestions.classList.add('suggestions');

    const suggestionHeadings = document.createElement('div');
    suggestionHeadings.classList.add('suggestions__headings');
    suggestionHeadings.innerHTML = `
        <div class="suggestions__heading">
            <h2 class="secondary-heading">
            Tv Shows
            </h2>
            <hr class="suggestions__hr">
        </div>
         <div class="suggestions__heading suggestions__heading--not-selected">
            <h2 class="secondary-heading ">
            Movies
            </h2>
            <hr class="suggestions__hr">
    </div>
    `;

    const suggestionCards = document.createElement('div');
    suggestionCards.classList.add('suggestions__cards');

    for (show of shows) {
        const card = document.createElement('div');
        card.classList.add('lscape-card');
        card.innerHTML = `
            <img src="${show.poster}" alt="" class="lscape-card__img bottom-margin-small">
            <div class="lscape-card__details">
            <h4 class="fourth-header bottom-margin-smaller">${show.title}</h4>
            <div class="lscape-card__sub-details">
                <p class="sub-paragraph sub-paragraph--faded all-caps">${show.genre}</p>
                <p class="sub-paragraph sub-paragraph--faded all-caps">${show.rating}/10</p>
            </div>
            </div>            
        `
        suggestionCards.appendChild(card)
    }

    const hr = document.createElement('hr');
    hr.classList.add('hr');

    suggestions.appendChild(suggestionHeadings);
    suggestions.appendChild(hr);
    suggestions.appendChild(suggestionCards);

    return suggestions;


}