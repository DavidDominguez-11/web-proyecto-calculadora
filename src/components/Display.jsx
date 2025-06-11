import React from 'react';

import './Display.css'

function Display ({ value }) {
  return (
    <div className='display' data-testid="display">
      {value}
    </div>
  )
}

export default Display