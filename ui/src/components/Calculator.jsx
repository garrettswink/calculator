// Package Imports
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';


// Component Imports
import ButtonPanel from './ButtonPanel';

// Style Imports
import '../styles/Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('0');

  const handleButtonClick = async (value) => {
    if (value === 'C') {
      setInput('0'); // Clear the input
    } else if (value === '=') {
      try {
        console.log("Sending request:", input); // Debugging log
        const response = await fetch('http://127.0.0.1:5000/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ expression: input }), // Convert input to JSON
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json(); // Parse JSON response
        console.log("Received response:", data); // Debugging log
        setInput(data.result.toString());
      } catch (error) {
        console.error("Error during Fetch API call:", error); // Debugging log
        setInput('ERROR');
      }
    } else {
      // Prevent the input from exceeding 11 characters
    setInput((prev) => {
      if (prev.length >= 11) {
        return prev; // Ignore input if already at limit
      }
      return prev === '0' ? value : prev + value; // Append input
    });
  }
};
  

  return (
    <Container className="calculator-container bg-dark text-white p-4 rounded shadow" style={{ maxWidth: '370px' }}>
      
      {/* 🔥🔥🔥 Display Component Will Go Here 🔥🔥🔥 */}
      <Row className="mt-3">
        <Col>
          <div className="display bg-black text-success p-3 rounded text-end fs-1">{input}</div>
        </Col>
      </Row>

 {/* 🔥🔥🔥 Button Panel Component Will Go Here 🔥🔥🔥 */}
      <Row className="mt-3">
        <Col>
          <div className="button-panel bg-secondary p-3 rounded">
           <ButtonPanel onButtonClick={handleButtonClick} />
          </div>
        </Col>
      </Row>

    </Container>
  );
};

export default Calculator;
