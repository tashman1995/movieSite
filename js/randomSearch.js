const checkIfValid = async (imdbID) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "1ff2c261",
      i: imdbID,
    },
  });

  const show = response.data;

  if (
    show.Poster === "N/A" ||
    show.imdbRating === "N/A" ||
    show.Type === "episode" ||
    show.Response === "False"
  ) {
    return false;
  } else {
    return true;
  }
};

const randomSearch = async () => {
  checkStatusUpdateContent("shuffle");
  let idNums = [0];
  for (i = 0; i < 6; i++) {
    idNums.push(Math.floor(Math.random() * 10));
  }

  let imdbID = "tt" + idNums.join("");
  const valid = await checkIfValid(imdbID);
  if (valid === true) {
    onShowSelect(imdbID, shuffleDisplayResults);
    return;
  } else {
    console.log("false");
    randomSearch();
  }
};
