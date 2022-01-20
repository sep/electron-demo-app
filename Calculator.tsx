import React, { useState } from 'react'
import { MathButton } from './MathButton';
import { NumericInput } from './NumericInput';
import { sum, difference, product, division } from './operations';

export default function Calculator() {
  const [firstOperand, setFirstOperand] = useState(0);
  const [secondOperand, setSecondOperand] = useState(0);
  const [result, setResult] = useState(0);

  return (
    <div className="calculator">
      <div className="inputs">
        <NumericInput getter={firstOperand} setter={setFirstOperand} />
        <NumericInput getter={secondOperand} setter={setSecondOperand} />
        <MathButton firstOperand={firstOperand} secondOperand={secondOperand} operation={sum} setResult={setResult} label="+" />
        <MathButton firstOperand={firstOperand} secondOperand={secondOperand} operation={difference} setResult={setResult} label="-" />
        <MathButton firstOperand={firstOperand} secondOperand={secondOperand} operation={product} setResult={setResult} label="*" />
        <MathButton firstOperand={firstOperand} secondOperand={secondOperand} operation={division} setResult={setResult} label="/" />
      </div>
      <div className="results">
        <span id="result">The result is {result}</span>
      </div>
    </div>
  );
}
