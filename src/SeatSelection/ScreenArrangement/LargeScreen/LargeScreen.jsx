import React, { useState, useEffect } from 'react';
import classes from './LargeScreen.module.css';

import classNames from 'classnames';

const SCREEN_CONFIG = {
  id: 3,
  label: '2D',
  seatCount: 44,
  maxSeatInRow: 11,
  seatArrangementType: 'LARGE'
}

function LargeScreen(props) {
  const { children } = props;

  const rowsCount = SCREEN_CONFIG.seatCount / SCREEN_CONFIG.maxSeatInRow;
  const rows = Array.from(Array(rowsCount).keys());

  const seats = Array.from(Array(SCREEN_CONFIG.maxSeatInRow).keys())

  const containerClass = classNames({
    [classes.container]: true,
    [classes.largeSeatsContainer]: true,
  })

  return (
    <div className={containerClass}>
        {
          rows.map(rowIndex => {
            let seatLabel = 0;
            
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

                    let isSeat = true;

                    // set middle column seats as no seats
                    if(parseInt(SCREEN_CONFIG.maxSeatInRow / 2) == seatIndex) {
                      isSeat = false;
                    } else {
                      seatLabel++;
                    }
                    
                    return children({
                      id, 
                      label: isSeat ? seatLabel : '',
                      isSeat
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

export default LargeScreen;