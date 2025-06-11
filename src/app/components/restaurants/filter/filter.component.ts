import {
  Component,
  Input,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
import {
  ArrowUpDown,
  DollarSign,
  LucideAngularModule,
  Search,
  Utensils,
  X,
} from 'lucide-angular';
import { SwitchComponent } from '../../shared/switch/switch.component';
import { DropDownComponent } from '../../shared/drop-down/drop-down.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  imports: [
    LucideAngularModule,
    SwitchComponent,
    DropDownComponent,
    CommonModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  @ViewChildren(DropDownComponent) dropdowns!: QueryList<DropDownComponent>;

  @Input() cuisines: string[] = [];
  @Input() orderBy: string[] = [];

  switchButtonValue = signal(true);

  textValue = signal('');

  handleChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.textValue.set(target.value);
  }

  handleReset() {
    this.textValue.set('');
  }

  resetAllDropdowns() {
    this.dropdowns.forEach((dropdown) => dropdown.reset());
    this.handleReset();
  }

  handleSwitchButtonValueSwap(value: boolean) {
    this.switchButtonValue.set(value);
  }

  /// Icons
  readonly SearchIcon = Search;
  readonly Utensils = Utensils;
  readonly DolarIcon = DollarSign;
  readonly Arrows = ArrowUpDown;
  readonly XIcon = X;
}
