const totalHorizontalCells = 10;

function ProgressBarLoader(element, buttonElement, timeDuration) {
  // State
  let requestsInQueue = 0;
  let progressCount = 0;
  let fillInterval = [];
  let isRunning = false;

  // Initialisation
  const loader = document.getElementById(element);
  const runButton = document.getElementById(buttonElement);

  runButton.addEventListener("click", (e) => {

    if (requestsInQueue == 0) {
      startLoader();
    }

    requestsInQueue += 1;
    e.target.innerHTML = `Run ${requestsInQueue > 1 ? requestsInQueue : ""}`;
  });

  const fillLoader = () => {
    if (progressCount > (totalHorizontalCells - 1) ){
      requestsInQueue--;
      progressCount = 0;


      runButton.innerHTML = `Run ${requestsInQueue > 1 ? requestsInQueue : ""}`;

      resetLoader();

      if (requestsInQueue != 0) {
        startLoader();
      }

      return;
    }

    let child = document.createElement("DIV");
    child.classList.add("filledCell");

    progressCount++;
    loader.appendChild(child);
  }

  const resetLoader = () => {
    while (loader.firstChild) {
      loader.removeChild(loader.firstChild);
    }

    window.clearTimeout(fillInterval[0]);
    fillInterval.shift();
  }

  const startLoader = () => {
    let intervalKey = setInterval(fillLoader, timeDuration / totalHorizontalCells);

    fillInterval.push(intervalKey);
  }
}