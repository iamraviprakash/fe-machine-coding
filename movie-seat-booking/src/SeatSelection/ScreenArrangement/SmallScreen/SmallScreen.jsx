import React, { useState, useEffect } from 'react';
import classes from './SmallScreen.module.css';

import classNames from 'classnames';

const SCREEN_CONFIG = {
  id: 1,
  label: '4DX',
  seatCount: 30,
  maxSeatInRow: 10,
  seatArrangementType: 'SMALL'
}

function SmallScreen(props) {
  const { children } = props;

  const rowsCount = SCREEN_CONFIG.seatCount / SCREEN_CONFIG.maxSeatInRow;
  const rows = Array.from(Array(rowsCount).keys());

  const seats = Array.from(Array(SCREEN_CONFIG.maxSeatInRow).keys())

  const containerClass = classNames({
    [classes.container]: true,
    [classes.smallSeatsContainer]: true,
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

export default SmallScreen;