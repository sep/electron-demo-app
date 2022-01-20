import React from 'react';

export function MathButton({ firstOperand, secondOperand, operation, setResult, label }: any) {
  const onClick = () => setResult(operation(firstOperand, secondOperand));

  return (
    <button type="button" onClick={onClick}>{label}</button>
  );
}
