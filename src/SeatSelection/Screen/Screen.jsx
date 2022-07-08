import React from 'react';
import classes from './Screen.module.css';

function Screen() {

  return (
    <div className={classes.container}>
        <div className={classes.screen}>
        </div>
        <div className={classes.message}>
          All eyes this way please!
        </div>
      </div>
  );
}

export default Screen;