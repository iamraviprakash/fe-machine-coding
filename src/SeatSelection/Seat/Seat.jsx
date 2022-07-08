import React from 'react';
import classes from './Seat.module.css';
import classNames from 'classnames';

function Seat(props) {
  const { label, state, onSeatClick } = props;

  const containerClass = classNames({
    [classes.container]: true,
    [classes.booked]: state == 'BOOKED',
    [classes.available]: state == 'AVAILABLE',
    [classes.selected]: state == 'SELECTED'
  })

  return (
    <div 
      className={containerClass} 
      onClick={
        ['AVAILABLE', 'SELECTED'].includes(state) ? onSeatClick : () => {}
      }
    >
      <div className={classes.label}>
        {label}
      </div>
    </div>
  );
}

Seat.defaultProps = {
  state: 'AVAILABLE',
  label: ''
}

export default Seat;