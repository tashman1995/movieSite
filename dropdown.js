
//To start create a div with the ID required
const createDropdown = ({dropdownElement, labelContent, options, onToggle}) => {
    dropdownElement.classList.add('dropdown')
    // Create Label
    const label = document.createElement("div");
    label.classList.add('dropdown__label');
    label.innerHTML = labelContent;

    // Create dropdown options
    const optionsEl = document.createElement("ul");
    optionsEl.classList.add('dropdown__options');
    // optionsEl.classList.add('dropdown__options--hidden');



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

    // const optionsElements = document.querySelectorAll('.dropdown__option')

    
    dropdownElement.addEventListener("click", () => {
        onToggle(optionsEl)
    });


}