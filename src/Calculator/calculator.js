import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import * as math from 'mathjs';

function Calculator() {
  const [expression, setExpression] = useState('');
  const [memory, setMemory] = useState(0);
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [nthRootMode, setNthRootMode] = useState(false);
  const [nthRootValue, setNthRootValue] = useState('');
  const [showExpressionInput, setShowExpressionInput] = useState(true); // Thêm state để ẩn hiện dòng input

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
    try {
      // Lấy giá trị từ bộ nhớ và chuyển đổi thành chuỗi
      const memoryValue = memory.toString();
  
      // Thêm giá trị từ bộ nhớ vào biểu thức hiện tại
      const newExpression = expression + memoryValue;
      
      // Cập nhật biểu thức với giá trị từ bộ nhớ
      setExpression(newExpression);
    } catch (error) {
      console.error("Memory recall error:", error);
    }
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
      // Sử dụng biểu thức chính quy để tìm số hoặc tiểu biểu thức cuối cùng trong chuỗi biểu thức
      const regex = /(\d+(\.\d+)?|\([\d+\-*/^.\s]+\))$/;
      const match = expression.match(regex);
  
      if (match) {
        // Lấy phần cuối cùng tìm được
        const partToEvaluate = match[0];
        const evaluatedPart = math.evaluate(partToEvaluate);
  
        // Đảm bảo phần được đánh giá là một số
        if (typeof evaluatedPart === 'number' && evaluatedPart >= 0) { // Chỉ tính căn bậc hai của số không âm
          // Tính căn bậc hai của phần được đánh giá
          const result = Math.sqrt(evaluatedPart);
  
          // Thay thế phần gốc bằng kết quả căn bậc hai trong biểu thức
          const newExpression = expression.replace(regex, result.toString());
          setExpression(newExpression);
        } else {
          console.error("Square root error: Part to evaluate is not a single non-negative number");
        }
      } else {
        console.error("Square root error: No valid part found to evaluate");
      }
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

  const handleSquare = () => {
    try {
      // Use a regular expression to match the last number or sub-expression in the expression string
      const regex = /(\d+(\.\d+)?|\([\d+\-*/^.\s]+\))$/;
      const match = expression.match(regex);
  
      if (match) {
        // Evaluate the matched part to ensure it's a valid expression
        const partToSquare = match[0];
        const evaluatedPart = math.evaluate(partToSquare);
  
        // Ensure the evaluated part is a number
        if (typeof evaluatedPart === 'number') {
          // Square the evaluated part
          const squaredPart = evaluatedPart ** 2;
  
          // Replace the original part with the squared result in the expression
          const newExpression = expression.replace(regex, squaredPart.toString());
          setExpression(newExpression);
        } else {
          console.error("Square error: Part to square is not a single number or valid sub-expression");
        }
      } else {
        console.error("Square error: No valid part found to square");
      }
    } catch (error) {
      console.error("Square error:", error);
    }
  };
  

  const handleInverse = () => {
    try {
      // Sử dụng biểu thức chính quy để tìm số hoặc tiểu biểu thức cuối cùng trong chuỗi biểu thức
      const regex = /(\d+(\.\d+)?|\([\d+\-*/^.\s]+\))$/;
      const match = expression.match(regex);
  
      if (match) {
        // Đánh giá phần tìm được để đảm bảo nó là một biểu thức hợp lệ
        const partToEvaluate = match[0];
        const evaluatedPart = math.evaluate(partToEvaluate);
  
        // Đảm bảo phần được đánh giá là một số
        if (typeof evaluatedPart === 'number') {
          // Tính giá trị nghịch đảo của phần được đánh giá
          const reciprocalPart = 1 / evaluatedPart;
  
          // Thay thế phần gốc bằng giá trị nghịch đảo trong biểu thức
          const newExpression = expression.replace(regex, reciprocalPart.toString());
          setExpression(newExpression);
        } else {
          console.error("Reciprocal error: Part to evaluate is not a single number or valid sub-expression");
        }
      } else {
        console.error("Reciprocal error: No valid part found to evaluate");
      }
    } catch (error) {
      console.error("Reciprocal error:", error);
    }
  };

  const handleAbsoluteValue = () => {
    try {
      // Sử dụng biểu thức chính quy để tìm tất cả các số và phép toán trong biểu thức
      const regex = /(\d+(\.\d+)?|[-+*/()])/g;
      const matches = expression.match(regex);
  
      if (matches) {
        // Tạo một biến lưu trữ biểu thức mới
        let newExpression = '';
  
        // Duyệt qua từng phần tử trong mảng matches
        matches.forEach(part => {
          // Kiểm tra nếu phần tử là một số
          if (!isNaN(part)) {
            // Tính giá trị trị tuyệt đối của số và thêm vào biểu thức mới
            newExpression += Math.abs(parseFloat(part)).toString();
          } else {
            // Nếu không phải số, thêm phần tử vào biểu thức mới
            newExpression += part;
          }
        });
  
        // Cập nhật biểu thức với giá trị trị tuyệt đối
        setExpression(newExpression);
      } else {
        console.error("Absolute value error: No valid part found to evaluate");
      }
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

  const handleNthRoot = () => {
    setNthRootMode(true);
    setExpression('');
    setShowExpressionInput(false); // Ẩn dòng input khi nhấn n căng x
  };

  const handleNthRootCalculate = () => {
    if (nthRootValue.trim() !== '') {
      try {
        const [n, x] = nthRootValue.split(',').map(num => parseFloat(num));
        if (!isNaN(n) && !isNaN(x)) {
          const result = math.nthRoot(x, n);
          const newHistory = [...calculationHistory, { expression: `nthRoot(${x}, ${n})`, result }];
          setExpression(result.toString());
          setCalculationHistory(newHistory);
        }
      } catch (error) {
        console.error("Nth root calculation error:", error);
      }
      setNthRootMode(false);
      setNthRootValue('');
      setShowExpressionInput(true); // Hiện dòng input khi tính toán kết thúc
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="container calculator">
      <div className="history">
        <i style={{ display: "flex" }} className="fa-solid fa-list" onClick={toggleHistory}></i>
        {showHistory && (
          <div className='historyOpen'>
            {calculationHistory.map((item, index) => (
              <div key={index} style={{ width: 270, textAlign: 'left' }}>
                {item.expression} = {item.result}
              </div>
            ))}
          </div>
        )}
      </div>
      {showExpressionInput && ( 
        <input
          className="display"
          type="text"
          value={nthRootMode ? nthRootValue : expression}
          readOnly
        />
      )}

      {nthRootMode ? (
        <div className="nth-root-input">
          <input
            type="text"
            value={nthRootValue}
            onChange={(e) => setNthRootValue(e.target.value)}
            placeholder="Nhập n , x :  "
          />
          <button onClick={handleNthRootCalculate}>=</button>
        </div>
      ) : (
        <>
          <div className="btn-memory">
            <button style={{ backgroundColor: 'white' }} onClick={handleMemoryAdd}>M+</button>
            <button style={{ backgroundColor: 'white' }} onClick={handleMemorySubtract}>M-</button>
            <button style={{ backgroundColor: 'white' }} onClick={handleMemoryRecall}>MR</button>
            <button style={{ backgroundColor: 'white' }} onClick={handleMemoryClear}>MC</button>
          </div>

          <div className="row">
            <button onClick={handlePercentage}>%</button>
            <button onClick={handleClearInput}>CE</button>
            <button onClick={handleDeleteLastChar}><i className="fa-solid fa-delete-left"></i></button>
            <button onClick={handleSquare}><i className="fas fa-times"></i><sup>2</sup></button>
            <button onClick={() => handleButtonClick('^')}><i className="fas fa-times"></i><sup>n</sup></button>
            <button onClick={handleSquareRoot}><i className="fa-solid fa-square-root-variable"></i></button>
            <button onClick={handleNthRoot}><sup>n</sup><i className="fa-solid fa-square-root-variable"></i></button>
            <button onClick={handleAbsoluteValue}>|<i className="fas fa-times"></i>|</button>
            <button onClick={handleParentheses}>(</button>
            <button onClick={handleClosingParentheses}>)</button>
            <button onClick={handleInverse}>1/x</button>
            <button className="operator" onClick={() => handleButtonClick('/')}><i className="fa-solid fa-divide"></i></button>
            <button onClick={() => handleButtonClick('7')}>7</button>
            <button onClick={() => handleButtonClick('8')}>8</button>
            <button onClick={() => handleButtonClick('9')}>9</button>
            <button className="operator" onClick={() => handleButtonClick('*')}><i className="fa-solid fa-xmark"></i></button>
            <button onClick={() => handleButtonClick('4')}>4</button>
            <button onClick={() => handleButtonClick('5')}>5</button>
            <button onClick={() => handleButtonClick('6')}>6</button>
            <button className="operator" onClick={() => handleButtonClick('-')}><i className="fa-solid fa-minus"></i></button>
            <button onClick={() => handleButtonClick('1')}>1</button>
            <button onClick={() => handleButtonClick('2')}>2</button>
            <button onClick={() => handleButtonClick('3')}>3</button>
            <button className="operator" onClick={() => handleButtonClick('+')}><i className="fa-solid fa-plus"></i></button>
            <button onClick={() => handleButtonClick('0')}>0</button>
            <button onClick={() => handleButtonClick('.')}>.</button>
            <button onClick={handleCalculate} className="equal">=</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Calculator;
