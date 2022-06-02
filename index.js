const goToWishlistBtn = document.getElementById("go-to-wishlist-btn");
const searchInput = document.querySelector('[name="movie-search"]');
const searchBtn = document.getElementById("search-btn");
const searchForm = document.getElementById("search-form");

let idArr;
let movieArr;

const getResults = async (e) => {
  e.preventDefault();

  const resp = await fetch(
    `https://www.omdbapi.com/?apikey=652b6583&s=${searchInput.value}`,
    { method: "GET" }
  );
  const data = await resp.json();
  searchForm.reset();

  if (data.Response === "True") {
    idArr = Array.from(Array(data.Search.length).keys()).map(
      (movie) => data.Search[movie].imdbID
    );

    async function getData() {
      const data = Promise.all(
        idArr.map(
          async (i) =>
            await (
              await fetch(`https://www.omdbapi.com/?apikey=652b6583&i=${i}`)
            ).json()
        )
      );
      return data;
    }

    getData().then((data) => {
      console.log(data);
    });

    // movieArr = await Promise.all(
    //   idArr.map(async (movieId) => {
    //     await fetch(`https://www.omdbapi.com/?apikey=652b6583&i=${[movieId]}`, {
    //       method: "GET",
    //     });
    //     console.log(movieArr);
    //   })
    // );
    // console.log(movieArr);
  } else {
    console.log(data.Error);
  }
};

searchBtn.addEventListener("click", getResults);

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
