import { Component, signal, ViewChild } from '@angular/core';
import { ChevronDown, LucideAngularModule, Search } from 'lucide-angular';
import { SwitchComponent } from '../../shared/switch/switch.component';
import { DropDownComponent } from '../../shared/drop-down/drop-down.component';

@Component({
  selector: 'app-filter',
  imports: [LucideAngularModule, SwitchComponent, DropDownComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  @ViewChild(DropDownComponent) dropdown!: DropDownComponent;

  switchButtonValue = signal(true);

  cuisines = ['Italian', 'Japanese', 'American'];

  handleSwitchButtonValueSwap(value: boolean) {
    this.switchButtonValue.set(value);
  }

  /// Icons
  SearchIcon = Search;
}
