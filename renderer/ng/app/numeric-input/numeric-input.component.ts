import { Component, Input } from '@angular/core';

@Component({
  selector: 'numeric-input',
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.css']
})
export class NumericInputComponent {
  @Input() value = {
    value: 0
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue(event: any) {
    this.value.value = parseFloat(event.target.value);
  }
}
