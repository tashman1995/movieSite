const createAutoComplete = ({
  root,
  searchInput,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  let resultsWrapper;

  

  const onInput = async (event) => {
    const results = await fetchData(event.target.value);

    if (results.length > 0 && centralContentStatus != 'search') {
      checkStatusUpdateContent("search");

      root.innerHTML = `
        <div class = "results">
        </div>
        `;

      resultsWrapper = root.querySelector(".results");
    } else if (!results.length && centralContentStatus === "search") {
      checkStatusUpdateContent("previous");
      return;
    }

        
    resultsWrapper.innerHTML = "";
    

    for (let result of results) {
      // if(result.Poster && result.Poster != "N/A"){
  
        const option = document.createElement("div");

        option.classList.add("results-card");
        option.innerHTML = renderOption(result);
        option.addEventListener("click", () => {
          searchInput.value = inputValue(result);
          onOptionSelect(result);
        });

        option.addEventListener('click', () => {
          // console.log(this.imdbID)
          onShowSelect(result.imdbID)
        });

        resultsWrapper.appendChild(option);
      // }
 
    }
  };

  searchInput.addEventListener("input", debounce(onInput, 500));
};
