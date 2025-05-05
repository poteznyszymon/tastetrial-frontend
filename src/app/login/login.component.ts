import { Component, signal } from '@angular/core';
import { CustomInputComponent } from '../components/custom-input/custom-input.component';
import { LoadingButtonComponent } from '../components/loading-button/loading-button.component';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Lock, LockOpen, LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    LoadingButtonComponent,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    LucideAngularModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  hideText = signal(true);
  isLoading$;

  constructor(private authService: AuthService) {
    this.isLoading$ = authService.getIsLogginInLoading();
  }

  handleSwitchHideText = () => {
    this.hideText.update((prev) => !prev);
  };

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  handleClick = () => {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    if (this.username && this.password) {
      this.authService.loginUser(this.username.value, this.password.value);
    }
  };

  Lock = Lock;
  LockOpen = LockOpen;
}
