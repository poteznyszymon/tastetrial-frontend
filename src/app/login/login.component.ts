import { Component, signal } from '@angular/core';
import { CustomInputComponent } from '../components/custom-input/custom-input.component';
import { LoadingButtonComponent } from '../components/loading-button/loading-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CustomInputComponent, LoadingButtonComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = signal('');
  password = signal('');

  handleClick = () => {
    alert(this.email() + this.password());
  };
}
