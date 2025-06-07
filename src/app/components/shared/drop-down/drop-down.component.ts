import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  imports: [],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.css',
})
export class DropDownComponent {
  @Input() defaultValue = '';
}
