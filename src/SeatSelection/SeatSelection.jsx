import React, { useState, useEffect } from 'react';
import classes from './SeatSelection.module.css';

import ScreenArrangement from "./ScreenArrangement";
import Screen from "./Screen";

import classNames from 'classnames';

function SeatSelection(props) {
  const { 
    arrangementType,
    seatSelectionCount
  } = props;

  return (
    <div className={classes.container}>
      <ScreenArrangement
        arrangementType={arrangementType}
        seatSelectionCount={seatSelectionCount}
      />
      <Screen />
     </div>
  );
}

export default SeatSelection;