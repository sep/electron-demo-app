import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'numeric-input',
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.css']
})
export class NumericInputComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  @Input() value = {
    value: 0
  }

  setValue(event: any) {
    this.value.value = parseFloat(event.target.value);
  }
}
