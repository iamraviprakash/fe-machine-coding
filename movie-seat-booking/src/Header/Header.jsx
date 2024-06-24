import React from "react";
import classes from "./Header.module.css";

import SeatCountSelection from "./SeatCountSelection";
import ScreenTypeSelection from "./ScreenTypeSelection";

const MAX_SEAT_CAN_BE_BOOKED = 6;

function Header(props) {
  const { screen, seatCount, onSelectScreen, onSelectSeatCount } = props;
  
  return (
    <div className={classes.container}>
      <div className={classes.label}>
        Movie Seat Booking
      </div>
      <div className={classes.controlContainer}>
        <SeatCountSelection 
          seatCount={seatCount}
          onSelectSeatCount={onSelectSeatCount}
          maxSeatAllowed={MAX_SEAT_CAN_BE_BOOKED}
        />
        <ScreenTypeSelection 
          screen={screen}
          onSelectScreen={onSelectScreen}
        /> 
      </div>
    </div>
  )
}


export default Header;