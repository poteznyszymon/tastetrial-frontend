import { Component, HostListener, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoadingButtonComponent } from '../loading-button/loading-button.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { AuthService } from '../../auth/auth.service';
import { Loader2, LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    LoadingButtonComponent,
    IconButtonComponent,
    LucideAngularModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isMenuOpen = signal(false);
  isDropdownOpen = signal(false);

  user$;
  isLoading$;
  isLogginOutLoading$;

  Loader2 = Loader2;

  constructor(private authService: AuthService, private router: Router) {
    this.user$ = authService.getCurrentUser();
    this.isLoading$ = authService.getIsLoading();
    this.isLogginOutLoading$ = authService.getIsLogginOutLoading();
  }

  handleMenuClick = (close?: boolean) => {
    if (close) {
      this.isMenuOpen.set(false);
    } else this.isMenuOpen.update((prev) => !prev);
  };

  handleDropdownClick = () => {
    this.isDropdownOpen.update((prev) => !prev);
  };

  handleLogout = async () => {
    await this.authService.logoutUser();
    this.isMenuOpen.set(false);
  };

  onClick = async (location: 'login' | 'register') => {
    await this.router.navigate([location]);
    this.isMenuOpen.set(false);
  };

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInsideNavbar = target.closest('.navbar-container');
    const clickedInsideAvatar = target.closest('.avatar');

    if (!clickedInsideNavbar && this.isMenuOpen()) {
      this.isMenuOpen.set(false);
    }

    if (!clickedInsideAvatar) {
      this.isDropdownOpen.set(false);
    }
  }
}
