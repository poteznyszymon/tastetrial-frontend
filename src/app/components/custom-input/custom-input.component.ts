import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
} from '@angular/core';
import { LoadingButtonComponent } from '../loading-button/loading-button.component';
import { Lock, LucideAngularModule, LockOpen } from 'lucide-angular';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  imports: [CommonModule, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css',
})
export class CustomInputComponent {
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() labelText: string = '';
  @Input() id: string = '';
  @Input() type: 'email' | 'text' = 'text';
  @Input() showHidePasswordButton: boolean = false;

  @Output() onValueChange = new EventEmitter<string>();

  onChange = (event: Event) => {
    this.onValueChange.emit((event.target as HTMLInputElement).value);
  };

  hideText = signal(true);

  handleSwitchHideText = () => {
    this.hideText.update((prev) => !prev);
  };

  Lock = Lock;
  LockOpen = LockOpen;
}
