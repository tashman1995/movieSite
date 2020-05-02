const createAutoComplete = ({ root, searchInput, renderOption, onOptionSelect, inputValue, fetchData }) => {

  root.innerHTML = `
    <div class = "results">
    </div>
    
    `;

  const resultsWrapper  = root.querySelector(".results");


  const onInput = async (event) => {
    const results = await fetchData(event.target.value);

    if (!results.length) {
      resultsWrapper.innerHTML = "";
      return;
    }

    resultsWrapper.innerHTML = "";

    for (let result of results) {
      const option = document.createElement("div");

      option.classList.add("card");
      option.innerHTML = renderOption(result);
      option.addEventListener("click", () => {
        searchInput.value = inputValue(result);
        onOptionSelect(result);
      });

      resultsWrapper.appendChild(option);
    }
  };

  searchInput.addEventListener("input", debounce(onInput, 500));

};
