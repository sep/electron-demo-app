import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'function-button',
  templateUrl: './function-button.component.html',
  styleUrls: ['./function-button.component.css']
})
export class FunctionButtonComponent {

  @Input() firstOperand = {value:0};
  @Input() secondOperand = {value:0};
  @Input() action!: (arg0: number, arg1: number) => number; 
  @Output() output = new EventEmitter<number>();

  click(): void {
    const temp = this.action(this.firstOperand.value, this.secondOperand.value)
    this.output.emit(temp);
  }

}
