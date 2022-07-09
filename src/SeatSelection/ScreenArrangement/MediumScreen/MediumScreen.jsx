import React, { useState, useEffect } from 'react';
import classes from './MediumScreen.module.css';

import classNames from 'classnames';

const SCREEN_CONFIG = {
  id: 2,
  label: '3D',
  seatCount: 40,
  maxSeatInRow: 10,
  seatArrangementType: 'MEDIUM'
}

function MediumScreen(props) {
  const { children } = props;

  const rowsCount = SCREEN_CONFIG.seatCount / SCREEN_CONFIG.maxSeatInRow;
  const rows = Array.from(Array(rowsCount).keys());

  const seats = Array.from(Array(SCREEN_CONFIG.maxSeatInRow).keys())

  const containerClass = classNames({
    [classes.container]: true,
    [classes.mediumSeatsContainer]: true,
    // [classes.largeSeatsContainer]: arrangementType == 'LARGE',
  })

  return (
    <div className={containerClass}>
        {
          rows.map(rowIndex => {
            return (
              <div className={classes.row} key={rowIndex} >
                <div 
                  className={classes.rowHeader}
                >
                  {String.fromCharCode(rowIndex+65)}
                </div>
                {
                  seats.map(seatIndex => {
                    const id = `${rowIndex}_${seatIndex}`;
                    
                    return children({
                      id, 
                      isSeat: true,
                      label: seatIndex+1
                    })
                  })
                }
              </div>
            )
          })
        }
      </div>
  );
}

export default MediumScreen;