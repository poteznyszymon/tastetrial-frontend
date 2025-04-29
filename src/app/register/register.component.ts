import { Component, signal } from '@angular/core';
import { CustomInputComponent } from '../components/custom-input/custom-input.component';
import { LoadingButtonComponent } from '../components/loading-button/loading-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CustomInputComponent, LoadingButtonComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username = signal('');
  firstName = signal('');
  lastName = signal('');
  password = signal('');
}
