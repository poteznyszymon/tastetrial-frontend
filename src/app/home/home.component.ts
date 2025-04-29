import { Component, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  text = signal('home component');
  isLoading$;

  constructor(private authService: AuthService) {
    this.isLoading$ = this.authService.getIsLoading();
  }
}
