import React, { useState } from 'react';
import * as math from 'mathjs';

function Calculator() {
  const [expression, setExpression] = useState('');
  const [memory, setMemory] = useState(0);
  const [calculationHistory, setCalculationHistory] = useState([]);

  const handleButtonClick = (value) => {
    setExpression(expression + value);
  };

  const handleCalculate = () => {
    if (expression.trim() !== '') {
      try {
        const result = math.evaluate(expression);
        const newHistory = [...calculationHistory, { expression, result }];
        setExpression(result.toString());
        setCalculationHistory(newHistory);
      } catch (error) {
        console.error("Calculation error:", error);
      }
    }
  };

  const handleMemoryAdd = () => {
    if (expression.trim() !== '') {
      try {
        const currentValue = parseFloat(expression);
        if (!isNaN(currentValue)) {
          const newMemory = memory + currentValue;
          setMemory(newMemory);
          setExpression('');
        }
      } catch (error) {
        console.error("Memory add error:", error);
      }
    }
  };

  const handleMemorySubtract = () => {
    if (expression.trim() !== '') {
      try {
        const currentValue = parseFloat(expression);
        if (!isNaN(currentValue)) {
          const newMemory = memory - currentValue;
          setMemory(newMemory);
          setExpression('');
        }
      } catch (error) {
        console.error("Memory subtract error:", error);
      }
    }
  };

  const handleMemoryRecall = () => {
    setExpression(memory.toString());
  };

  const handleMemoryClear = () => {
    setMemory(0);
  };

  const handleClearInput = () => {
    setExpression('');
  };

  

  return (
    <div>
      <input type="text" value={expression} readOnly />
      <div>
        {/* Buttons for basic operations */}
        <button onClick={() => handleButtonClick('1')}>1</button>
        <button onClick={() => handleButtonClick('2')}>2</button>
        <button onClick={() => handleButtonClick('3')}>3</button>
        <button onClick={() => handleButtonClick('+')}>+</button>
      </div>
      <div>
        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button onClick={() => handleButtonClick('-')}>-</button>
      </div>
      <div>
        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <button onClick={() => handleButtonClick('*')}>*</button>
      </div>
      <div>
        <button onClick={handleClearInput}>Clear Input</button>
        <button onClick={() => handleButtonClick('0')}>0</button>
        <button onClick={() => handleButtonClick('.')}>.</button>
        <button onClick={() => handleButtonClick('/')}>/</button>
        <button onClick={handleCalculate}>=</button>
      </div>
      <div>
        {/* Memory operations */}
        <button onClick={handleMemoryAdd}>M+</button>
        <button onClick={handleMemorySubtract}>M-</button>
        <button onClick={handleMemoryRecall}>MR</button>
        <button onClick={handleMemoryClear}>MC</button>
      </div>
      <div>
        {/* Display history */}
        <ul>
          {calculationHistory.map((item, index) => (
            <li key={index}>
              {item.expression} = {item.result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default Calculator;
