import React from 'react';

export interface MathButtonType {
  firstOperand: number;
  secondOperand: number;
  operation: (a: number, b: number) => number;
  setResult: (a: number) => void;
  label: string;
  id: string;
}

export function MathButton({ firstOperand, secondOperand, operation, setResult, label, id }: MathButtonType) {
  const onClick = () => setResult(operation(firstOperand, secondOperand));

  return (
    <button type="button" onClick={onClick} id={id}>{label}</button>
  );
}
