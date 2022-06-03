const goToWishlistBtn = document.getElementById("go-to-wishlist-btn");
const searchInput = document.querySelector('[name="movie-search"]');
const searchBtn = document.getElementById("search-btn");
const searchForm = document.getElementById("search-form");
const searchContent = document.getElementById("search-results-content");

let idsArr;
let moviesArr;

const getMoviesArr = async () => {
  const data = Promise.all(
    idsArr.map(
      async (movieId) =>
        await (
          await fetch(`https://www.omdbapi.com/?apikey=652b6583&i=${movieId}`)
        ).json()
    )
  );
  return data;
};

const displayResults = async (e) => {
  e.preventDefault();

  const resp = await fetch(
    `https://www.omdbapi.com/?apikey=652b6583&s=${searchInput.value}`,
    { method: "GET" }
  );
  const data = await resp.json();
  searchForm.reset();

  if (data.Response === "True") {
    idsArr = Array.from(Array(data.Search.length).keys()).map(
      (movie) => data.Search[movie].imdbID
    );

    const moviesArr = await getMoviesArr();
    [
      {
        Actors,
        Awards,
        BoxOffice,
        Country,
        DVD,
        Director,
        Genre,
        Language,
        Metascore,
        Plot,
        Poster,
        Production,
        Rated,
        Ratings,
        Released,
        Response,
        Runtime,
        Title,
        Type,
        Website,
        Writer,
        Year,
        imdbID,
        imdbRating,
        imdbVotes,
      },
    ] = moviesArr;

    const moviesHtml = moviesArr
      .map((movie) => {
        return `
          <article class="width-wrapper flexbox">
            <div class="movie-items flexbox">
              <div class="movie-images"><img src="${movie.Poster}"></div>
              <div class="movie-side flexbox">
                <div class="movie-title-row flexbox">
                  <h2 class="movie-title">${movie.Title}</h2>
                  <span class="movie-rating">${movie.imdbRating}</span>
                </div>
                <div class="movie-data-row flexbox">
                  <span class="movie-duration">${movie.Runtime}</span>
                  <span class="movie-genres">${movie.Genre}</span>
                  <button class="add-btn" id="${movie.imdbID}" type="button">
                    Add to watchlist
                  </button>
                </div>
                <div class="movie-desc-row">
                  <p class="movie-desc">${movie.Plot}</p>
                </div>
              </div>
            </div>
          </article>`;
      })
      .join("");

    searchContent.innerHTML = moviesHtml;

    const addBtnsArr = document.getElementsByClassName("add-btn");
    for (const addBtn of addBtnsArr) {
      addBtn.addEventListener("click", () => console.log("clicked!"));
    }
  } else {
    console.log(data.Error);
  }
};

searchBtn.addEventListener("click", displayResults);

// TODO: results in the OMDb: n (up top)

/* <article class="width-wrapper flexbox">
  <div class="movie-items flexbox">
    <div class="movie-images">Movie image</div>
    <div class="movie-side flexbox">
      <div class="movie-title-row flexbox">
        <h2 class="movie-title">Movie title</h2>
        <span class="movie-rating">Movie rating</span>
      </div>
      <div class="movie-data-row flexbox">
        <span class="movie-duration">51 min</span>
        <span class="movie-genres">Drama, Sci-fi</span>
        <button class="add-btn" type="button">
          Add to watchlist
        </button>
      </div>
      <div class="movie-desc-row">
        <p class="movie-desc">Movie description</p>
      </div>
    </div>
  </div>
</article>; */
