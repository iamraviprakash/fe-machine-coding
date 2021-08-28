

/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */
function Star(el, count, callback) {
    // write logic to create star rating utility.
    let stars = document.getElementById(el).children;

    function toggleStarsTill(lastIndex) {
      for(let starIndex = 0; starIndex <= lastIndex; starIndex++) {
        const star = stars[starIndex];

        if(star.classList.contains("fa-star-o")) {
          star.classList.toggle("fa-star-o", false);
        }

        star.classList.toggle("fa-star", true);

      }
    }

    function resetStars() {
      for(let starIndex = 0; starIndex < stars.length; starIndex++) {
        const star = stars[starIndex];

        if(star.classList.contains("fa-star")) {
          star.classList.toggle("fa-star", false);
        }

        star.classList.toggle("fa-star-o", true);
      }
    }

    for(let starIndex in Object.entries(stars)) {
      const star = stars[starIndex];

      star.addEventListener("click", () => {
        resetStars();
        toggleStarsTill(starIndex);
        callback(Number(starIndex)+1);
      });

      star.addEventListener("mouseenter", () => {
        resetStars();
        toggleStarsTill(starIndex);
      });
    }
}
