import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  input,
  Input,
  Output,
  signal,
} from '@angular/core';
import { Loader2, LucideAngularModule, SquarePen, X } from 'lucide-angular';

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
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() showEditIcon = true;
  @Input() disabled = false;

  @Input() action: () => Promise<void> = async () => {};
  @Output() onClose = new EventEmitter<void>();

  isOpen = signal(false);

  handleOpen(event: Event) {
    event.stopPropagation();
    this.isOpen.set(true);
  }

  handleClose() {
    if (!this.loading) {
      this.isOpen.set(false);
      this.onClose.emit();
    } else return;
  }

  async handleButtonClick() {
    await this.action();
    this.isOpen.set(false);
  }

  /// Icons
  X = X;
  LoaderIcon = Loader2;
  Edit = SquarePen;
}
