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
import {
  Check,
  ChevronDown,
  LucideAngularModule,
  LucideIconData,
  Utensils,
} from 'lucide-angular';

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
  @Input() multiple: boolean = false;
  @Input() icon!: LucideIconData;

  @Output() selectionChange = new EventEmitter<string>();
  @Output() selectedDefaultValue = new EventEmitter<void>();

  @Input() set externalValue(value: any) {
    if (value) {
      this.activeOption.set([value]);
    } else {
      this.activeOption.set([]);
    }
  }

  isOpen = signal(false);
  activeOption = signal<string[]>([]);

  constructor(private elementRef: ElementRef) {}

  handleOpenChange(event: Event) {
    event.preventDefault();
    this.isOpen.update((val) => !val);
  }

  handleCloseMenu() {
    this.isOpen.set(false);
  }

  selectOption(option: string) {
    if (this.multiple) {
      if (this.activeOption().includes(option)) {
        this.activeOption.update((prev) =>
          prev.filter((item) => item !== option)
        );
      } else {
        this.activeOption.update((prev) => [...prev, option]);
      }
    } else {
      this.activeOption.set(new Array(option));
    }
    this.selectionChange.emit(option);
  }

  reset() {
    this.selectedDefaultValue.emit();
    this.activeOption.set([]);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.handleCloseMenu();
    }
  }

  get displayValue(): string {
    if (this.activeOption().length === 0) {
      return this.defaultValue;
    } else if (this.activeOption().length === 1) {
      return this.activeOption()[0];
    }
    return `${this.activeOption().length} selected`;
  }

  readonly CheckIcon = Check;
  readonly ArrowDown = ChevronDown;
}
