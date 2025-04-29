import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, Menu, X } from 'lucide-angular';

@Component({
  selector: 'app-icon-button',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.css',
})
export class IconButtonComponent {
  @Input() type: 'menu' | 'x' = 'menu';

  Menu = Menu;
  X = X;
}
