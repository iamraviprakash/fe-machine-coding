import React, { useEffect } from "react";
import classes from "./ScreenTypeSelection.module.css";

import classNames from 'classnames';

const SCREENS = [
  {
    id: 1,
    label: '4DX',
    seatArrangementType: 'SMALL'
  },
  {
    id: 2,
    label: '3D',
    seatArrangementType: 'MEDIUM'
  },
    {
    id: 3,
    label: '2D',
    seatArrangementType: 'LARGE'
  },
]

function ScreenTypeSelection(props) {
  const { screen, onSelectScreen } = props;

  useEffect(() => {
    onSelectScreen(SCREENS[0])
  }, [])
  
  return (
    <div className={classes.container}>
      <div className={classes.label}>Which screen?</div>
      <div className={classes.screenContainer}>
        {
          SCREENS.map(screenItem => {
            const screenClass = classNames({
              [classes.screen]: true,
              [classes.selectedScreen]: screen.id == screenItem.id
            })
            
            return (
              <div 
                key={screenItem.id}
                className={screenClass}
                onClick={() => onSelectScreen(screenItem)}
              >
                {screenItem.label}
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default ScreenTypeSelection;