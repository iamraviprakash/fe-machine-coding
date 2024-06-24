import path from './path.json' assert {type: 'json'};

let currentStep = {};

const root = document.querySelector(':root');

function next(path) {
  let step = path.find(s => s.id === currentStep.nextId) ?? {};

  // set the alignment
  root.style.setProperty('--focus-start-x', step.left)
  root.style.setProperty('--focus-start-y', step.top)
  root.style.setProperty('--focus-height', step.height)
  root.style.setProperty('--focus-width', step.width)

  // set the message
  const message = document.querySelector('.message');
  message.innerHTML = step.message;

  // update current step
  currentStep = step;
}

function prev(path) {
  let step = path.find(s => s.id === currentStep.prevId) ?? {};

  // set the alignment
  root.style.setProperty('--focus-start-x', step.left)
  root.style.setProperty('--focus-start-y', step.top)
  root.style.setProperty('--focus-height', step.height)
  root.style.setProperty('--focus-width', step.width)

  // set the message
  const message = document.querySelector('.message');
  message.innerHTML = step.message;

  // update current step
  currentStep = step;
}

function startGuide(path, startId) {
  let step = path.find(s => s.id === startId) ?? {};

  // set the alignment
  root.style.setProperty('--focus-start-x', step.left)
  root.style.setProperty('--focus-start-y', step.top)
  root.style.setProperty('--focus-height', step.height)
  root.style.setProperty('--focus-width', step.width)

  // set the message
  const message = document.querySelector('.message');
  message.innerHTML = step.message;

  // update current step
  currentStep = step;
}

// Start the guide
startGuide(path, 1);


// Listen to events
window.addEventListener('keyup', (e) => {
  if(e.key === 'ArrowRight' && currentStep.nextId ) {
    next(path)
  } 

  if(e.key === 'ArrowLeft' && currentStep.prevId ) {
    prev(path)
  } 
})