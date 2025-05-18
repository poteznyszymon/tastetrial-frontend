import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Loader2, LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-dialog-menu',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './dialog-menu.component.html',
  styleUrl: './dialog-menu.component.css',
})
export class DialogMenuComponent {
  @Input() openButtonText = 'Open';
  @Input() title = 'title';
  @Input() subTitle = 'subtitle';
  @Input() loading = false;

  @Output() onClick = new EventEmitter<void>();

  isOpen = signal(false);

  handleOpen() {
    this.isOpen.set(true);
  }

  handleClose() {
    if (!this.loading) {
      this.isOpen.set(false);
    } else return;
  }

  handleButtonClick() {
    this.onClick.emit();
  }

  /// Icons
  X = X;
  LoaderIcon = Loader2;
}
