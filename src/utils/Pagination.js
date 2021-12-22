import _ from "lodash";

function getMoviesToDisplay(pageNumber, movies, pageSize) {
  const moviesChunks = [];
  let temp = 0;
  for (let i = 0; i <= movies.length; i += pageSize) {
    const chunk = movies.slice(temp, temp + pageSize);
    moviesChunks.push(chunk);
    temp += pageSize;
  }
  const moviesToDisplay = moviesChunks[pageNumber - 1];
  return moviesToDisplay;
}

export { getMoviesToDisplay };
