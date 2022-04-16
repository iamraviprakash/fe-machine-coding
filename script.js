const color = "#ffffff";
const oddColor = "#000000";
const highlightColor = "#ff0000";

const stepsAlongXAxis = 1;
const stepsAlongYAxis = 8;


function ChessGame(element, initialSize = 8) {
  let currentGridSize = initialSize;
  let highlightedPos = [];

  function generateGrid(size) {
    const grid = document.getElementById(element);
    const gridFragment = document.createDocumentFragment();
    
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    const cellCount = Math.pow(size, 2);

    for (let cellIndex = 0; cellIndex < cellCount; cellIndex++) {
      const cell = document.createElement("DIV");

      cell.setAttribute("data-cell-pos", cellIndex + 1);
      cell.setAttribute("data-cell-x-pos", cellIndex % 8);
      cell.setAttribute("data-cell-y-pos", Math.floor(cellIndex / 8));


      const isOddRow = Math.floor((cellIndex / 8)) % 2;
      let backgroundColor = null;

      if (isOddRow) {
        backgroundColor = cellIndex % 2 == 0 ? oddColor : color;
      } else {
        backgroundColor = cellIndex % 2 == 0 ? color : oddColor;
      }

      cell.style.backgroundColor = backgroundColor;
      cell.addEventListener("click", showSuggestions);
      cell.setAttribute("data-cell-color", backgroundColor);

      gridFragment.appendChild(cell);
    }

    grid.appendChild(gridFragment);
  }

  function highlightACellAtPos(cellPos) {
     const cell = document.getElementById(element).childNodes[cellPos];
      cell.style.backgroundColor = highlightColor;

      if (!highlightedPos.includes(cellPos)) {
        highlightedPos.push(cellPos);
      }
  }

  function showSuggestions(event) {
    resetGrid();

    const cellPos = Number(event.target.getAttribute("data-cell-pos"));
    const cellXPos = Number(event.target.getAttribute("data-cell-x-pos"));
    const cellYPos = Number(event.target.getAttribute("data-cell-y-pos"));

    event.target.style.backgroundColor = highlightColor;

    if (!highlightedPos.includes(cellPos)) {
      highlightedPos.push(cellPos)
    }

    highlightTopLeft(cellXPos, cellYPos, cellPos);
    highlightTopRight(cellXPos, cellYPos, cellPos);
    highlightBottomLeft(cellXPos, cellYPos, cellPos);
    highlightBottomRight(cellXPos, cellYPos, cellPos);
  }

  function highlightTopLeft(cellXPos, cellYPos, cellPos) {
    let currentCellPos = cellPos;
    let currentCellXPos = cellXPos;
    let currentCellYPos = cellYPos;

    while (currentCellXPos >= 0 && currentCellYPos >= 0) {
      highlightACellAtPos(currentCellPos)

      currentCellXPos -= 1;
      currentCellYPos -= 1;
      currentCellPos -= stepsAlongYAxis + stepsAlongXAxis;
    }
  }

  function highlightTopRight(cellXPos, cellYPos, cellPos) {
    let currentCellPos = cellPos;
    let currentCellXPos = cellXPos;
    let currentCellYPos = cellYPos;

    while (currentCellXPos <= 7 && currentCellYPos >= 0) {
      highlightACellAtPos(currentCellPos)

      currentCellXPos += 1;
      currentCellYPos -= 1;
      currentCellPos -= stepsAlongYAxis - stepsAlongXAxis;
    }
  }

  function highlightBottomLeft(cellXPos, cellYPos, cellPos) {
    let currentCellPos = cellPos;
    let currentCellXPos = cellXPos;
    let currentCellYPos = cellYPos;

    while (currentCellXPos >= 0 && currentCellYPos <= 7) {
      highlightACellAtPos(currentCellPos)

      currentCellXPos -= 1;
      currentCellYPos += 1;
      currentCellPos += stepsAlongYAxis - stepsAlongXAxis;
    }
  }

  function highlightBottomRight(cellXPos, cellYPos, cellPos) {
    let currentCellPos = cellPos;
    let currentCellXPos = cellXPos;
    let currentCellYPos = cellYPos;

    while (currentCellXPos <= 7 && currentCellYPos <= 7) {
      highlightACellAtPos(currentCellPos)

      currentCellXPos += 1;
      currentCellYPos += 1;
      currentCellPos += stepsAlongYAxis + stepsAlongXAxis;
    }
  }

  function resetGrid() {
    for (let item of highlightedPos) {
      const cell = document.getElementById(element).childNodes[item];
      const backgroundColor = cell.getAttribute("data-cell-color");
      cell.style.backgroundColor = backgroundColor;
    }

    highlightedPos = [];
  }

  function initGame() {
    generateGrid(currentGridSize);
  }

  initGame();
}
