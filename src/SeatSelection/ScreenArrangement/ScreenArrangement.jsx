import React, { useState, useEffect } from 'react';
import Seat from "../Seat";
import SmallScreen from "./SmallScreen";
import MediumScreen from "./MediumScreen";
import LargeScreen from "./LargeScreen";

function SeatSelection(props) {
  const { 
    arrangementType,
    seatSelectionCount
  } = props;

  const [seatBookingStates, setSeatBookingStates] = useState({ 
    booked: ['0_0', '1_4'],
    selected: [],
  });

  useEffect(() => {
    setSeatBookingStates((prev) => ({...prev, selected: []}))
  }, [arrangementType])

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

  const getScreenComponent = ({ arrangementType }) => {
    switch(arrangementType) {
      case 'SMALL':
        return SmallScreen;
      case 'MEDIUM':
        return MediumScreen;
      case 'LARGE':
        return LargeScreen;
      default:
        return SmallScreen;
    }
  }

  const ScreenComponent = getScreenComponent({ arrangementType });

  return (
    <ScreenComponent>
      {({ id, isSeat, label }) => {
        const seatState = isSeat 
        ? getSeatState({
            seatId: id,
            bookingStates: seatBookingStates
        }) 
        : 'NOT_A_SEAT';
      
        return (
          <Seat 
            key={id} 
            label={label} 
            state={seatState}
            onSeatClick={() => onSeatClick({id})}
          /> 
        )
      }}
    </ScreenComponent>
  );
}

export default SeatSelection;