import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  @Input() firstOperand = {value:0}
  @Input() secondOperand = {value:0}

  constructor() { }

  ngOnInit(): void {
  }

  add = (a:number,b:number) => a + b

}
