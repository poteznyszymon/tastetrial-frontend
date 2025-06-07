import { Component, signal } from '@angular/core';
import { LucideAngularModule, Search } from 'lucide-angular';
import { SwitchComponent } from '../../shared/switch/switch.component';
import { DropDownComponent } from '../../shared/drop-down/drop-down.component';

@Component({
  selector: 'app-filter',
  imports: [LucideAngularModule, SwitchComponent, DropDownComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  switchButtonValue = signal(true);

  handleSwitchButtonValueSwap(value: boolean) {
    this.switchButtonValue.set(value);
  }

  /// Icons
  SearchIcon = Search;
}
