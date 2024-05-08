import React, { useState } from 'react';
import * as math from 'mathjs';
import '../App.css';


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

  const handleDeleteLastChar = () => {
    setExpression(expression.slice(0, -1));
  };

  const handleSquareRoot = () => {
    try {
      const result = math.evaluate(`sqrt(${expression})`);
      setExpression(result.toString());
    } catch (error) {
      console.error("Square root error:", error);
    }
  };

  const handlePercentage = () => {
    try {
      const result = math.evaluate(`${expression} / 100`);
      setExpression(result.toString());
    } catch (error) {
      console.error("Percentage error:", error);
    }
  };
  //x²
  const handleSquare = () => {
    try {
      const result = math.evaluate(`(${expression})^2`);
      setExpression(result.toString());
    } catch (error) {
      console.error("Square calculation error:", error);
    }
  };
  //1/x
  const handleInverse = () => {
    try {
      const result = math.evaluate(`1 / (${expression})`);
      setExpression(result.toString());
    } catch (error) {
      console.error("Inverse calculation error:", error);
    }
  };
  //CE
  const handleClearEntry = () => {
    setExpression('');
  };
  //+/-
  const handleToggleSign = () => {
    setExpression((prevExpression) => {
      if (prevExpression.startsWith('-')) {
        return prevExpression.slice(1);
      } else {
        return '-' + prevExpression;
      }
    });
  };

  return (
    <div className="calculator">
      <input className="display" type="text" value={expression} readOnly />
      <div className="buttons">
        
        <div>
        <button onClick={handleMemoryAdd}>M+</button>
        <button onClick={handleMemorySubtract}>M-</button>
        <button onClick={handleMemoryRecall}>MR</button>
        <button onClick={handleMemoryClear}>MC</button>
        </div>
        <div>

        <button onClick={handlePercentage}>%</button>
        <button onClick={handleClearEntry}>CE</button>
        <button onClick={handleClearInput}>C</button>
        <button onClick={handleDeleteLastChar}>⌫</button>
        </div>
        <div>
        <button onClick={handleInverse}>1/x</button>
        <button onClick={handleSquare}>x²</button>
        <button onClick={handleSquareRoot}>√</button>
        <button onClick={() => handleButtonClick('/')}>/</button>
        </div>
        {/* Buttons for basic operations */}
        <div>
        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <button onClick={() => handleButtonClick('*')}>*</button>
        </div>

        <div>
        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button onClick={() => handleButtonClick('-')}>-</button>
        </div>

        <div>
        <button onClick={() => handleButtonClick('1')}>1</button>
        <button onClick={() => handleButtonClick('2')}>2</button>
        <button onClick={() => handleButtonClick('3')}>3</button>
        <button onClick={() => handleButtonClick('+')}>+</button>
        </div>

        <div>
        <button onClick={handleToggleSign}>+/-</button>
        <button onClick={() => handleButtonClick('0')}>0</button>
        <button onClick={() => handleButtonClick('.')}>.</button>
        <button onClick={handleCalculate}>=</button>
        </div>
        {/* Additional functions */}
      </div>
      {/* Display history */}
      <div className="history">
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
