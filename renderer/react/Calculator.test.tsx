import React from 'react';
import Calculator from "./Calculator";
import { NumericInput } from './NumericInput';
import TestRenderer, { act } from 'react-test-renderer';


describe("Calculator app", () => {

  test("initial state", () => {
    const calculator = TestRenderer.create(<Calculator/>);
    const span = calculator.root.findByType("span");
    expect(span.children[1]).toBe("0");
    const ni = calculator.root.findAllByType(NumericInput);
    expect(ni).toHaveLength(2);
    expect(ni[0].props["getter"]).toBe(0);
  });

  test("buttons are connected", () => {
    const calculator = TestRenderer.create(<Calculator/>);
    const span = calculator.root.findByType("span");
    const ni = calculator.root.findAllByType(NumericInput);
    const buttons = calculator.root.findAllByType("button");
    act(()=> {
      ni[0].props["setter"](1);
      ni[1].props["setter"](1);
    });
    act(() => {buttons[0].props["onClick"]()});
    expect(span.children[1]).toBe("2");
  });
});
