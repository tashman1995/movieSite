const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {

  root.innerHTML = `
    <label><b>Search</b><label>
    <input class = "input" class = "input"/>
    <div class = "dropdown">
    <div class = "dropdown-menu">
        <div class = "dropdown-content results"></div>
    </div>
    </div>
    `;

  const input           = root.querySelector(".input"),
        dropdown        = root.querySelector(".dropdown"),
        resultsWrapper  = root.querySelector(".results");


  const onInput = async (event) => {
    const results = await fetchData(event.target.value);

    if (!results.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    resultsWrapper.innerHTML = "";
    dropdown.classList.add("is-active");

    for (let result of results) {
      const option = document.createElement("a");

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(result);
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(result);
        onOptionSelect(result);
      });

      resultsWrapper.appendChild(option);
    }
  };

  input.addEventListener("input", debounce(onInput, 500));

  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
