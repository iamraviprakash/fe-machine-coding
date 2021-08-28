function getRandomColors(){
    var ratio = 0.618033988749895;
    
    var hue = (Math.random() + ratio) % 1;
    var saturation = Math.round(Math.random() * 100) % 85;
    var lightness = Math.round(Math.random() * 100) % 85;

    var color = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + lightness + '%)';
    var oddColor = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + (lightness + 5) + '%)';

    return {
        color,
        oddColor
    }
}

function GridGame (element, initialSize, callback) {
  // state
  let score = 0;
  let currentGridSize = initialSize;

  function generateGrid(size) {
    const {color, oddColor} = getRandomColors();

    const grid = document.getElementById(element);
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    const cellCount = Math.pow(size, 2);
    const oddColorIndex = Math.floor(Math.random() * cellCount)

    for(let cellIndex = 0; cellIndex < cellCount; cellIndex++) {
      const cell = document.createElement("DIV");
      
      if(cellIndex == oddColorIndex) {
        cell.setAttribute("data-cell-type", "ODD");
        cell.style.backgroundColor = oddColor
      } else {
        cell.setAttribute("data-cell-type", "EVEN");
        cell.style.backgroundColor = color
      }

      cell.addEventListener("click", validateInput);
      grid.appendChild(cell)
    }
  }

  function resetGrid() {
      const grid = document.getElementById(element);

      while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
      }
  }

  function validateInput(event) {
    const cellType = event.target.getAttribute("data-cell-type");

    if(cellType == "ODD") {
      score++;
      currentGridSize++;
      callback(score);
      resetGrid();
      generateGrid(currentGridSize);
    } else {
      score = 0;
      currentGridSize = initialSize;
      callback(score);
      resetGrid();
      generateGrid(initialSize);
    }
  }

  function main() {
    callback(score);
    generateGrid(currentGridSize);
  }

  main();
}
