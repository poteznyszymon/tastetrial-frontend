import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
  @Input() isOwner = false;

  isOpen = signal(false);

  handleOpen() {
    this.isOpen.set(true);
  }

  handleCloce() {
    this.isOpen.set(false);
  }
}
