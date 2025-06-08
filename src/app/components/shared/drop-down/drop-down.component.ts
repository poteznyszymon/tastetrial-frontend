import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  signal,
} from '@angular/core';
import { ChevronDown, LucideAngularModule, Utensils } from 'lucide-angular';

@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.css',
})
export class DropDownComponent {
  @Input() defaultValue: string = '';
  @Input() options: string[] = [];

  @Output() selectionChange = new EventEmitter<string>();

  isOpen = signal(false);
  activeOption = signal('');

  ArrowDown = ChevronDown;
  Utensils = Utensils;

  constructor(private elementRef: ElementRef) {}

  handleOpenChange() {
    console.log('click');
    this.isOpen.update((val) => !val);
  }

  handleCloseMenu() {
    this.isOpen.set(false);
  }

  selectOption(option: string) {
    this.activeOption.set(option);
    this.selectionChange.emit(option);
  }

  reset() {
    this.activeOption.set('');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.handleCloseMenu();
    }
  }
}
