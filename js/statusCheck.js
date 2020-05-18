const checkStatusUpdateContent = (status) => {
    if (status != "previous") {
      previousContentStatus = centralContentStatus;
      centralContentStatus = status;
    } else {
      centralContentStatus = previousContentStatus;
    }
  
    if (centralContentStatus === "home") {
      homeContent.classList.remove("hidden");
      searchResults.classList.add("hidden");
      showDisplay.classList.add("hidden");
      shuffleDisplay.classList.add("hidden");
      compareDisplay.classList.add("hidden");
  
      homeBtn.classList.add("side-bar__icon-container--selected");
      shuffleBtn.classList.remove("side-bar__icon-container--selected");
      compareBtn.classList.remove("side-bar__icon-container--selected");
      searchBtn.classList.remove("side-bar__icon-container--selected");
      
    } else if (centralContentStatus === "search") {
      searchResults.classList.remove("hidden");
      homeContent.classList.add("hidden");
      showDisplay.classList.add("hidden");
      shuffleDisplay.classList.add("hidden");
      compareDisplay.classList.add("hidden");
  
      homeBtn.classList.remove("side-bar__icon-container--selected");
      shuffleBtn.classList.remove("side-bar__icon-container--selected");
      compareBtn.classList.remove("side-bar__icon-container--selected");
      searchBtn.classList.add("side-bar__icon-container--selected");
  
  
    } else if (centralContentStatus === "show") {
      homeContent.classList.add("hidden");
      searchResults.classList.add("hidden");
      showDisplay.classList.remove("hidden");
      shuffleDisplay.classList.add("hidden");
      compareDisplay.classList.add("hidden");
  
    } else if (centralContentStatus === "shuffle") {
      homeContent.classList.add("hidden");
      searchResults.classList.add("hidden");
      showDisplay.classList.add("hidden");
      compareDisplay.classList.add("hidden");
      shuffleDisplay.classList.remove("hidden");
  
      homeBtn.classList.remove("side-bar__icon-container--selected");
      shuffleBtn.classList.add("side-bar__icon-container--selected");
      compareBtn.classList.remove("side-bar__icon-container--selected");
      searchBtn.classList.remove("side-bar__icon-container--selected");
    } else if (centralContentStatus === "compare") {
      homeContent.classList.add("hidden");
      searchResults.classList.add("hidden");
      showDisplay.classList.add("hidden");
      shuffleDisplay.classList.add("hidden");
      compareDisplay.classList.remove("hidden");
  
      homeBtn.classList.remove("side-bar__icon-container--selected");
      shuffleBtn.classList.remove("side-bar__icon-container--selected");
      compareBtn.classList.add("side-bar__icon-container--selected");
      searchBtn.classList.remove("side-bar__icon-container--selected");
    }
  };