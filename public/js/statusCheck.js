const checkStatusUpdateContent = (newStatus) => {
    if (newStatus != "previous") {
      previousContentStatus = centralContentStatus;
      centralContentStatus = newStatus;
    } else {
      centralContentStatus = previousContentStatus;
    }

    const statusArr = [{
      name: 'home',
      element: homeContent,
      button: homeBtn
    },

    {
      name: 'show',
      element: showDisplay,
      button: searchBtn
    },
    {
      name: 'shuffle',
      element: shuffleDisplay,
      button: shuffleBtn
    },
    {
      name: 'compare',
      element: compareDisplay,
      button: compareBtn
    },
    {
      name: 'search',
      element: searchResults,
      button: searchBtn
    }]

    statusArr.forEach((status) =>{
      if(centralContentStatus != status.name) {
        status.element.classList.add('hidden');
        status.button.classList.remove('side-bar__icon-container--selected');
      } else { 
        status.element.classList.remove('hidden');
        status.button.classList.add('side-bar__icon-container--selected');
      }

      
      if(centralContentStatus === 'search') {
        gridSliderContainer.classList.remove('hidden');
      } else {
        gridSliderContainer.classList.add('hidden')
      }
    })
}