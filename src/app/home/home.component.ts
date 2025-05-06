import { Component, signal } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../service/shared/toast.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  text = signal('home component');
  isLoading$;

  handleClick = () => {
    this.toastService.show('Something went wrong. Please try again.');
  };

  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.isLoading$ = this.authService.getIsLoading();
  }
}
