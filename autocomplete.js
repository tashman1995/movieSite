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

    if (results.length > 0 && centralContentStatus === "home") {
      checkStatusUpdateContent("search");

      root.innerHTML = `
        <div class = "results">
        </div>
        `;
    }

    resultsWrapper = root.querySelector(".results");

    if (!results.length && centralContentStatus === "search") {
      resultsWrapper.innerHTML = "";

      checkStatusUpdateContent("home");
      return;
    }

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
