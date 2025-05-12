import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-toast',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  @Input() message = '';
  @Input() type: 'primary' | 'destructive' = 'destructive';
  @Output() handleClick = new EventEmitter<void>();

  X = X;

  onClick = () => {
    this.handleClick.emit();
  };
}
