import React, { useState, useEffect } from 'react';
import classes from './SeatSelection.module.css';
import Seat from "./Seat";
import Screen from "./Screen";

import classNames from 'classnames';

const MAX_SEAT_IN_ROW = 10;

function SeatSelection(props) {
  const { seatSelectionCount, totalSeats, arrangementType } = props;

  const [seatBookingStates, setSeatBookingStates] = useState({ 
    booked: ['0_0', '1_4'],
    selected: [],
  });

  useEffect(() => {
    setSeatBookingStates((prev) => ({...prev, selected: []}))
  }, [arrangementType])

  const rowsCount = totalSeats / MAX_SEAT_IN_ROW;
  const rows = Array.from(Array(rowsCount).keys());

  const seats = Array.from(Array(MAX_SEAT_IN_ROW).keys())

  const onSeatClick = ({ id }) => {
    setSeatBookingStates((prev) => ({
      ...prev,
      selected: prev.selected.includes(id) 
        ? prev.selected.filter(item => item != id) 
        : prev.selected.length < seatSelectionCount 
        ? [...prev.selected, id]
        : [...prev.selected.shift(), id]
    }))    
  }

  const getSeatState = ({ seatId, bookingStates }) => {    
    if(bookingStates.booked.includes(seatId)) {
      return 'BOOKED'
    } else if (bookingStates.selected.includes(seatId)) {
      return 'SELECTED'
    } else {
      return 'AVAILABLE'
    }
  }


  const seatsContainerClass = classNames({
    [classes.seatsContainer]: true,
    [classes.smallSeatsContainer]: arrangementType == 'SMALL',
    [classes.mediumSeatsContainer]: arrangementType == 'MEDIUM',
    [classes.largeSeatsContainer]: arrangementType == 'LARGE',
  })

  return (
    <div className={classes.container}>
      <div className={seatsContainerClass}>
        {
          rows.map(rowIndex => {
            return (
              <div className={classes.row} key={rowIndex} >
                <div className={classes.rowHeader}>{rowIndex+1}</div>
                {
                  seats.map(seatIndex => {
                    const id = `${rowIndex}_${seatIndex}`;
                    
                    const seatState = getSeatState({
                      seatId: id,
                      bookingStates: seatBookingStates
                    })
                    
                    return (
                      <Seat 
                        key={seatIndex} 
                        label={seatIndex+1} 
                        state={seatState}
                        onSeatClick={() => onSeatClick({id})}
                      /> 
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
      <Screen />
     </div>
  );
}

export default SeatSelection;