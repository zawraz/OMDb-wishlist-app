const goToSearchBtn = document.getElementById("go-to-search-btn");
const wishlistContent = document.getElementById("wishlist-results-content");

let wishlistIdsArr;

const checkContent = () => {};

const getWishlistArr = async () => {
  const data = await Promise.all(
    wishlistIdsArr.map(
      async (movieId) =>
        await (
          await fetch(`https://www.omdbapi.com/?apikey=652b6583&i=${movieId}`)
        ).json()
    )
  );
  return data;
};

const displayWishlist = async () => {
  wishlistIdsArr = JSON.parse(localStorage.getItem("wishlist-ids"));
  const wishlistArr = await getWishlistArr();

  const wishlistHtml = wishlistArr
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
      <button class="remove-btn" id="${movie.imdbID}" type="button">
      Remove from wishlist
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
  wishlistContent.innerHTML = wishlistHtml;

  const removeBtnsArr = document.getElementsByClassName("remove-btn");
  for (const removeBtn of removeBtnsArr) {
    removeBtn.addEventListener("click", function () {
      const idToRemove = this.id;

      wishlistIdsArr.splice(
        wishlistIdsArr.findIndex((i) => i === idToRemove),
        1
      );

      localStorage.setItem("wishlist-ids", JSON.stringify(wishlistIdsArr));
      displayWishlist();
    });
  }
};

if (localStorage.getItem("wishlist-ids") === null) {
  wishlistContent.textContent = "Your wishlist is empty :(";
} else {
  displayWishlist();
}

goToSearchBtn.addEventListener("click", () => (location.href = "/index.html"));
