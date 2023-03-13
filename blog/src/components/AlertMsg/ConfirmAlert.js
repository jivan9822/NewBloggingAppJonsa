import classes from './confirmalert.module.css';

import React, { useState } from 'react';

function ConfirmAlert(props) {
  const [showBackdrop, setShowBackdrop] = useState(false);

  function handleConfirm(e) {
    console.log('Confirmed!');
    props.onClick(e);
    setShowBackdrop(false);
  }

  function handleCancel() {
    console.log('Cancelled!');
    setShowBackdrop(false);
  }

  function handleClick() {
    setShowBackdrop(true);
  }

  return (
    <>
      <button
        onClick={handleClick}
        style={{ backgroundColor: 'transparent', cursor: 'pointer' }}
      >
        {props.name}
      </button>
      {showBackdrop && (
        <div className={classes.backdrop}>
          <div className={classes.modal}>
            <h2>Are you sure?</h2>
            <button onClick={handleConfirm}>Yes</button>
            <button onClick={handleCancel}>No</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmAlert;
