import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  @Input() firstOperand = {value:0}
  @Input() secondOperand = {value:0}
  displayValue: {value:string};

  constructor() { 
    this.displayValue = {value: "Hello world"};
  }

  ngOnInit(): void {
  }

  add2(a:number, b:number): number { 
    return a + b
  }

  add(): void { 
    this.outputChanged((a,b) => a + b)
  }

  subtract(): void { 
    this.outputChanged((a,b) => a - b)
  }

  multiply(): void { 
    this.outputChanged((a,b) => a * b)
  }

  divide(): void { 
    this.outputChanged((a,b) => a / b)
  }

  outputChanged(f: (a:number,b:number) => number): void {
    this.displayValue.value = f(this.firstOperand.value, this.secondOperand.value).toString();
  }

  output(a: number): void {
    this.displayValue.value = a.toString();
  }

}
