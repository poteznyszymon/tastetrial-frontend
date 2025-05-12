import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  RefreshCcw,
  TriangleAlert,
  UserX,
} from 'lucide-angular';

@Component({
  selector: 'app-resource-not-found-page',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './resource-not-found-page.component.html',
  styleUrl: './resource-not-found-page.component.css',
})
export class ResourceNotFoundPageComponent {
  @Input() title = '';
  @Input() subtitle = '';

  /// Icons
  User = UserX;
  RetryIcon = RefreshCcw;
}
