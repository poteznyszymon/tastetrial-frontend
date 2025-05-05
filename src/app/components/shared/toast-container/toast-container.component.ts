import { Component } from '@angular/core';
import { ToastService } from '../../../service/shared/toast.service';
import { ToastComponent } from '../toast/toast.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast-container',
  imports: [ToastComponent, CommonModule],
  standalone: true,
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css',
})
export class ToastContainerComponent {
  messages$;

  constructor(private toastService: ToastService) {
    this.messages$ = this.toastService.messages$;
  }

  handleDismiss = (id: number) => {
    this.toastService.dismiss(id);
  };
}
