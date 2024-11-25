import React from 'react';
import Button from './Button';
import '../styles/ButtonPanel.css';

const ButtonPanel = ({ onButtonClick }) => {
  
  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['C', '0', '=', '+']
  ];
  
  return (
    <div className='button-panel'>
      {buttons.flat().map((button) => (
        <Button key={button} label={button} onClick={onButtonClick} />
      ))}
      </div>
  )
}

export default ButtonPanel