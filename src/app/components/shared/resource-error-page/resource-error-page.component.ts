import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, TriangleAlert } from 'lucide-angular';
import { RefreshCcw } from 'lucide-angular/src/icons';

@Component({
  selector: 'app-resource-error-page',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './resource-error-page.component.html',
  styleUrl: './resource-error-page.component.css',
})
export class ResourceErrorPageComponent {
  @Input() title = '';
  @Input() subtitle = '';

  @Output() onClick = new EventEmitter<void>();

  handleOnClick = () => {
    this.onClick.emit();
  };

  /// Icons
  Alert = TriangleAlert;
  RetryIcon = RefreshCcw;
}
