import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './service/auth/auth.service'; // <- zaimportuj
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { ToastContainerComponent } from './components/shared/toast-container/toast-container.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    CookieBannerComponent,
    ToastContainerComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = signal('tastetrial');

  constructor(private authService: AuthService) {
    this.authService.authorizeUser();
  }
}
