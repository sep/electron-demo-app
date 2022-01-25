import { sum, difference, product, division } from '../renderer/operations';

describe("Math operations", () => {
    test("sum", () => {
      const actual = sum(1, 2);
      expect(actual).toEqual(3);
    });
    
    test("difference", () => {
      const actual = difference(1, 2);
      expect(actual).toEqual(-1);
    });
    
    test("product", () => {
      const actual = product(1, 2);
      expect(actual).toEqual(2);
    });
    
    test("division", () => {
      const actual = division(1, 2);
      expect(actual).toEqual(0.5);
    });
});
