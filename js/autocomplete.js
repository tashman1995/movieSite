const createAutoComplete = ({
  root,
  searchInput,
  renderOption,
  fetchData,
  status,
  optionClass,
  optionsClass,
  onSelection,
  resultOutputElement
  
}) => {
  let resultsWrapper;

  const onInput = async (event) => {
    const results = await fetchData(event.target.value);

    if (results.length > 0 && centralContentStatus != "search") {
      checkStatusUpdateContent(status);

      root.innerHTML = `
        <div class = "${optionsClass}"></div>
        `;

      resultsWrapper = root.querySelector("." + optionsClass);
    } else if (!results.length && centralContentStatus === "search") {
      checkStatusUpdateContent("previous");
      return;
    }
    if(resultsWrapper){
      resultsWrapper.innerHTML = "";
    }
    
    for (let result of results) {
      // if(result.Poster && result.Poster != "N/A"){

      const option = document.createElement("div");

      option.classList.add(optionClass);
      option.innerHTML = renderOption(result);

      option.addEventListener("click", () => {
        onSelection(result.imdbID, resultOutputElement, resultsWrapper);
  
        searchInput.value = result.Title;
      });

      resultsWrapper.appendChild(option);
      // }
    }
  };

  const comparisonContainers = document.querySelectorAll('.comparison__container')

  document.addEventListener("click", (event) => {
    for(comparisonContainer of comparisonContainers){
      if (!comparisonContainer.contains(event.target)) {
        const dropdown = comparisonContainer.querySelector('.drop-down');
        if(dropdown != null){
          dropdown.classList.add('drop-down--hidden')
        }
        
      }
    }
  
  });
  


  searchInput.addEventListener("input", debounce(onInput, 500));

};
