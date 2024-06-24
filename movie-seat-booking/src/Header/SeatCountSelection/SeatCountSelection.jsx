import React, { useEffect } from 'react';
import classes from './SeatCountSelection.module.css';

import classNames from 'classnames';


function SeatCountSelection(props) {
  const { seatCount, onSelectSeatCount, maxSeatAllowed } = props;

  useEffect(() => {
    onSelectSeatCount(1);
  }, [])

  const seatCountList = Array.from(Array(maxSeatAllowed).keys());
  
  return (
    <div className={classes.container}>
      <div className={classes.label}>How many seats?</div>
      <div className={classes.seatContainer}>
        {
          seatCountList.map(seatCountItem => {
            const seatCountClass = classNames({
              [classes.seatCount]: true,
              [classes.selectedSeatCount]: seatCount == seatCountItem+1
            })
            
            return ( 
              <div 
                key={seatCountItem}
                className={seatCountClass} 
                onClick={() => onSelectSeatCount(seatCountItem+1)}
              >
                {seatCountItem+1}
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default SeatCountSelection;