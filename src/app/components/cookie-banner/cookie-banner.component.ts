import { Component, signal } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.css'],
})
export class CookieBannerComponent {
  X = X;
  visible = signal(false);
  translateX = signal(0);
  isDragging = false;
  startX = 0;

  constructor() {
    const accepted = localStorage.getItem('cookieConsent');
    if (!accepted) {
      this.visible.set(true);
    }
  }

  handleAcceptClick = () => {
    localStorage.setItem('cookieConsent', 'true');
    this.visible.set(false);
  };

  onDragStart(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.startX =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
  }

  onDragMove(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    const currentX =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const deltaX = currentX - this.startX;
    this.translateX.set(Math.max(0, deltaX));
  }

  onDragEnd() {
    this.isDragging = false;
    if (this.translateX() > 150) {
      this.visible.set(false);
    } else {
      this.translateX.set(0);
    }
  }
}
