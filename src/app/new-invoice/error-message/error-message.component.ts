import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  template: `<span>{{ getErrorMessage() }}</span>`,
  styles: [
    `
      span {
        font-size: 11px;
        color: red;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
      }
    `,
  ],
})
export class ErrorMessageComponent {
  @Input() fControl!: AbstractControl;
  @Input() min = 0;
  @Input() max = 0;

  constructor() {}

  getErrorMessage(): string {
    if (this.fControl.hasError('required')) return 'This field is required';
    if (this.fControl.hasError('pattern'))
      return 'Insert correct (integer) value';
    if (
      this.fControl.hasError('minlength') ||
      this.fControl.hasError('maxlength')
    )
      return `Name length should be between ${this.min} and ${this.max} characters`;
    if (this.fControl.hasError('min') || this.fControl.hasError('max'))
      return `Value should be between ${this.min} and ${this.max}`;

    return 'Inserted value is not valid';
  }
}
