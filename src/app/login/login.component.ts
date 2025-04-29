import { Component, signal } from '@angular/core';
import { CustomInputComponent } from '../components/custom-input/custom-input.component';
import { LoadingButtonComponent } from '../components/loading-button/loading-button.component';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    CustomInputComponent,
    LoadingButtonComponent,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = signal('');
  password = signal('');

  handleClick = () => {
    alert(this.username() + this.password());
  };

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
}
