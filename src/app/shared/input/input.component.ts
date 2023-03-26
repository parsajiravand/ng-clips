import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label: string = 'Test';
  @Input() type?: string = 'text';
  @Input() control: FormControl = new FormControl({});
  @Input() format= '';
}
