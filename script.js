/*
 * Creates star rating functionality
 * @param element DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */
function Star(element, count, callback) {
    const starList = document.getElementById(element);
    const starListFragment = document.createDocumentFragment();
  
    function createStars() {
      for(let starIndex = 0; starIndex < count; starIndex++) {
        let star = document.createElement("I");
        star.classList.add("fa", "fa-star-o");
        star.dataset.id=starIndex;

        starListFragment.appendChild(star);
      }

      starList.append(starListFragment)
    }

    function toggleStarsTillIndex(lastIndex) {
      for(let starIndex = 0; starIndex <= lastIndex; starIndex++) {
        const star = document.querySelectorAll(`[data-id='${starIndex}']`)[0];

        if(star.classList.contains("fa-star-o")) {
          star.classList.toggle("fa-star-o", false);
        }

        star.classList.toggle("fa-star", true);
      }
    }

    function resetStars() {
      const stars = document.querySelectorAll('[data-id]');

      for(let starIndex = 0; starIndex < stars.length; starIndex++) {
        const star = document.querySelectorAll(`[data-id='${starIndex}']`)[0];
        
        if(star.classList.contains("fa-star")) {
          star.classList.toggle("fa-star", false);
        }

        star.classList.toggle("fa-star-o", true);
      }
    }

    function initStars() {
      const stars = document.querySelectorAll('[data-id]');
      
      for(let starIndex in Object.entries(stars)) {
        const star = stars[starIndex];

        star.addEventListener("click", () => {
          resetStars();
          toggleStarsTillIndex(starIndex);
          callback(Number(starIndex)+1);
        });

        star.addEventListener("mouseenter", () => {
          resetStars();
          toggleStarsTillIndex(starIndex);
        });
      }
    }

    
    function main() {
      createStars();
      initStars();
    }

    main();
}
