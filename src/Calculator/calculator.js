
import React, { useState } from 'react';

import '@fortawesome/fontawesome-free/css/all.min.css';
import * as math from 'mathjs';


function Calculator() {
  
  const [currentValue, SetcurrentValue] = useState('');

  const [expression, setExpression] = useState('');
  const [memory, setMemory] = useState(0);
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [power, setPower] = useState('');

  const handleButtonClick = (value) => {
    if (value === '^') {
      setExpression(expression + '^');
    } else {
      setExpression(expression + value);
    }
    setPower('');
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
    if (expression.charAt(expression.length - 1) === '^') {
      setExpression(expression.slice(0, -1));
    } else {
      setExpression(expression.slice(0, -1));
    }
    setPower('');
  };


  const handleSquareRoot = () => {
    try {
      const result = math.evaluate(`sqrt(${expression})`);
      setExpression(result.toString());
    } catch (error) {
      console.error("Square root error:", error);
    }
  };
//%
  const handlePercentage = () => {
    try {
      const result = math.evaluate(`${expression} / 100`);
      setExpression(result.toString());
    } catch (error) {
      console.error("Percentage error:", error);
    }
  };
  //x²

  const handleSquare = (value) => {
    if (value === '^2') {
      const currentExpression = expression.trim();
      const currentValue = parseFloat(currentExpression);

      if (currentValue < 0) {
        const squaredValue = Math.pow(currentValue, 2);
        setExpression('(' + currentExpression + ')^2');
      } else {
        setExpression(expression + '^2');
      }
    } else {
      setExpression(expression + value);
    }
    setPower('');
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


  const handleAbsoluteValue = () => {
    try {
      const result = math.evaluate(`abs(${expression})`);
      setExpression(result.toString());
    } catch (error) {
      console.error("Absolute value calculation error:", error);
    }
  };

  const handleParentheses = () => {
    setExpression(expression + '(');
  };

  const handleClosingParentheses = () => {
    setExpression(expression + ')');
  };
  /**hàm true false hiển thị danh sách */
  const [showHistory, setShowHistory] = useState(false);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="container calculator">
      <div className="history" >
        <i className="fa-solid fa-list" onClick={toggleHistory}></i>
        {showHistory && (
          <div className='historyOpen' >
            {calculationHistory.map((item, index) => (
              <div key={index} style={{ width: 270,textAlign:'left' }}>
                {item.expression} = {item.result}
              </div>
            ))}
          </div>
        )}
      </div>
      <input className="display" type="text" value={expression + power } readOnly />

      <div class="btn-memory" >
        <button style={{ backgroundColor: 'white' }} onClick={handleMemoryAdd}>M+</button>
        <button style={{ backgroundColor: 'white' }} onClick={handleMemorySubtract}>M-</button>
        <button style={{ backgroundColor: 'white' }} onClick={handleMemoryRecall}>MR</button>
        <button style={{ backgroundColor: 'white' }} onClick={handleMemoryClear}>MC</button>

      </div>

      <div class="row">
        <button onClick={handlePercentage}>%</button>
        <button onClick={handleClearInput}>CE</button>
        <button onClick={handleDeleteLastChar}><i class="fa-solid fa-delete-left"></i></button>
        <button onClick={() => handleSquare('^2')}><i class="fas fa-times"></i><sup>2</sup></button>


        <button onClick={() => handleButtonClick('^')}><i className="fas fa-times"></i><sup>n</sup></button>

        <button onClick={handleSquareRoot} ><i class="fa-solid fa-square-root-variable"></i></button>
        <button ><sup>n</sup><i class="fa-solid fa-square-root-variable" ></i></button>
        <button onClick={handleAbsoluteValue}>|<i class="fas fa-times"></i>|</button>
        <button onClick={handleParentheses}>(</button>
        <button onClick={handleClosingParentheses}>)</button>
        <button onClick={handleInverse}>1/x</button>
        <button class="operator" onClick={() => handleButtonClick('/')}><i class="fa-solid fa-divide"></i></button>

        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <button class="operator" onClick={() => handleButtonClick('*')}><i class="fa-solid fa-xmark"></i></button>

        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button class="operator" onClick={() => handleButtonClick('-')}><i class="fa-solid fa-minus"></i></button>

        <button onClick={() => handleButtonClick('1')}>1</button>
        <button onClick={() => handleButtonClick('2')}>2</button>
        <button onClick={() => handleButtonClick('3')}>3</button>
        <button class="operator" onClick={() => handleButtonClick('+')}><i class="fa-solid fa-plus"></i></button>

        <button onClick={() => handleButtonClick('0')}>0</button>
        <button onClick={() => handleButtonClick('.')}>.</button>
        <button onClick={handleCalculate} class="equal">=</button>

      </div>



    </div >
  );
}

export default Calculator;
