import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'action-button',
  templateUrl: './function-button.component.html',
  styleUrls: ['./function-button.component.css']
})
export class FunctionButtonComponent implements OnInit {

  @Input() firstOperand = {value:0};
  @Input() secondOperand = {value:0};
  @Output() output = new EventEmitter<number>();
  @Input() action!: (arg0: number, arg1: number) => number; 
  @Input() text: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  click(): void {
    console.log("result is " + this.action(this.firstOperand.value, this.secondOperand.value))
    this.output.emit(this.action(this.firstOperand.value, this.secondOperand.value))
  }

}
