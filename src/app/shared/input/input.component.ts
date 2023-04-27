import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label = 'Test';
  @Input() type?: string = 'text';
  @Input() control: FormControl = new FormControl({});
  @Input() format= '';
}
