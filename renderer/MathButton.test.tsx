import React from 'react';
import { MathButton } from "../renderer/MathButton";
import TestRenderer from 'react-test-renderer';

describe("Math button", () => {
  const expectedResult = 3;
  let capturedResult: number;
  const dummyOperation = (a: number, b: number) => expectedResult;
  const dummySetResult = (a: number) => { capturedResult = a};

  test("sets result of applying operation", () => {
    const testRenderer = TestRenderer.create(
      <MathButton
        firstOperand={1}
        secondOperand={2}
        operation={dummyOperation}
        setResult={dummySetResult}
        label="+" />);
    const testInstance = testRenderer.root;
    testInstance.findByType("button").props["onClick"]();
    expect(capturedResult).toEqual(expectedResult);
  });
});
