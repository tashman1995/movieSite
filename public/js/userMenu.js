
//To start create a div with the ID required
const createDropdown = ({dropdownElement, labelContent, options, onToggle, hideOptionsEl}) => {
    dropdownElement.classList.add('dropdown')
    // Create Label
    const label = document.createElement("div");
    label.classList.add('dropdown__label');
    label.innerHTML = labelContent;

    // Create dropdown options
    const optionsEl = document.createElement("ul");
    optionsEl.classList.add('dropdown__options');

    for(option of options) {
        const optionEl = document.createElement('li');
        const optionLink = document.createElement('a');
        optionLink.innerText = `${option}`
        optionEl.classList.add('dropdown__option');
        optionEl.appendChild(optionLink)
        optionsEl.appendChild(optionEl)
    }

    dropdownElement.appendChild(label);
    dropdownElement.appendChild(optionsEl);

    dropdownElement.addEventListener("click", () => {
        onToggle(optionsEl)
    });

    document.addEventListener("click", (event) => {
        if (!dropdownElement.contains(event.target)) {
          hideOptionsEl(optionsEl)
        }
    });


}