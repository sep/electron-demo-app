import React from 'react';
import { MathButton } from "./MathButton";
import TestRenderer from 'react-test-renderer';

describe("Math button", () => {
  const expectedResult = 3;
  let capturedResult: number;
  const dummyOperation = () => expectedResult;
  const dummySetResult = (a: number) => { capturedResult = a};

  test("sets result of applying operation", () => {
    const testRenderer = TestRenderer.create(
      <MathButton
        firstOperand={1}
        secondOperand={2}
        operation={dummyOperation}
        setResult={dummySetResult}
        id="sum"
        label="+"
      />);
    const testInstance = testRenderer.root;
    testInstance.findByType("button").props["onClick"]();
    expect(capturedResult).toEqual(expectedResult);
  });
});
