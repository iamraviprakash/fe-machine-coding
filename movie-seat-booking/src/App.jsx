import React, { useState } from 'react';
import classes from './App.module.css';
import SeatSelection from "./SeatSelection"
import Header from "./Header"

function App() {
  const [screen, setScreen] = useState({});
  const [seatCount, setSeatCount] = useState(0);
  
  return (
    <div className={classes.container}>
      <Header 
        screen={screen}
        seatCount={seatCount}
        onSelectScreen={setScreen}
        onSelectSeatCount={setSeatCount}
      />
       {(screen && seatCount) 
          && (
            <SeatSelection
              seatSelectionCount={seatCount}
              arrangementType={screen.seatArrangementType}
            />
          )  
        }
    </div>
  );
}

export default App;