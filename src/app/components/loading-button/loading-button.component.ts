import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, Loader2 } from 'lucide-angular';

@Component({
  selector: 'app-loading-button',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './loading-button.component.html',
  styleUrl: './loading-button.component.css',
})
export class LoadingButtonComponent {
  Loader2 = Loader2;

  @Input() text: string = 'Click';
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() loading: boolean = false;

  @Output() clicked = new EventEmitter<void>();

  onClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (!this.loading) {
      this.clicked.emit();
    }
  };
}
