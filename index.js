const goToWatchlistBtn = document.getElementById("go-to-watchlist-btn");
const searchInput = document.querySelector('[name="movie-search"]');
const searchBtn = document.getElementById("search-btn");

let getResults = async () => {
  const resp = await fetch(
    `https://www.omdbapi.com/?apikey=652b6583&s=gladiator`,
    { method: "GET" }
  );
  const data = await resp.json();
  console.log(data);
};

searchBtn.addEventListener("click", getResults);

// https://www.omdbapi.com/?apikey=652b6583&s=[title_here]

{
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
              <button class="add-btn" type="button">Add to watchlist</button>
            </div>
            <div class="movie-desc-row">
              <p class="movie-desc">Movie description</p>
            </div>
          </div>
        </div>
      </article> */
}
