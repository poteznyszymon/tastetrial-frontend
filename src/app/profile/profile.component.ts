import { Component } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user$;

  constructor(private authService: AuthService) {
    this.user$ = authService.getCurrentUser();
  }
}
