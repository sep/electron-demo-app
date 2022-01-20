import React from 'react';
import Calculator from "./Calculator";
import {render, screen} from '@testing-library/react'

describe("Calculator app", () => {
  // const expectedResult = 3;
  // let capturedResult: number;
  // const dummyOperation = (a: number, b: number) => expectedResult;
  // const dummySetResult = (a: number) => { capturedResult = a};

  test("initial state", () => {
    const {queryAllByTestId} = render(<Calculator/>);
    const numInput1 = queryByTestId("firstOperand");
  });
});
