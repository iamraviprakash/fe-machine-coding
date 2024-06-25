
function ProgressBarLoader(element, buttonElement, timeDuration) {
  // State
  let requestsInQueue = 0;
  let start, previousTimeStamp;

  // Initialisation
  const loader = document.getElementById(element);
  const runButton = document.getElementById(buttonElement);

  const updateButton = () => {
    runButton.innerHTML = `Run ${requestsInQueue > 1 ? requestsInQueue : ""}`;
  }

  const fillLoader = (timestamp) => {
    if (start === undefined) {
      start = timestamp;
    }

    const elapsed = timestamp - start;

    if (previousTimeStamp !== timestamp) {
      const count = Math.min((100 / timeDuration) * elapsed, 100);
      loader.style.width = count + '%';
    }

    if (elapsed < timeDuration) {
      previousTimeStamp = timestamp
      window.requestAnimationFrame(fillLoader);
    } else {
      dequeue();
      resetState();
      updateButton();
      resetLoader();

      if (requestsInQueue > 0) {
        startLoader();
      }
    }
  }

  const dequeue = () => {
    requestsInQueue--;
  }

  const enqueue = () => {
    requestsInQueue++;
  }

  const resetState = () => {
    start = undefined;
    previousTimeStamp = undefined;
  }

  const resetLoader = () => {
    loader.style.width = '0%';
  }

  const startLoader = () => {
    window.requestAnimationFrame(fillLoader)
  }

  runButton.addEventListener("click", (e) => {
    if (requestsInQueue == 0) {
      startLoader();
    }

    enqueue();
    updateButton();
  });
}