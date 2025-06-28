import { Component, signal } from '@angular/core';
import { CurrentStepInfoComponent } from '../current-step-info/current-step-info.component';
import {
  ChevronLeft,
  ChevronRight,
  LucideAngularModule,
  Utensils,
} from 'lucide-angular';
import { DropDownComponent } from '../shared/drop-down/drop-down.component';

@Component({
  selector: 'app-multi-step-form',
  imports: [CurrentStepInfoComponent, LucideAngularModule, DropDownComponent],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.css',
})
export class MultiStepFormComponent {
  step = signal(1);

  cuisines = [
    'American',
    'Chinese',
    'French',
    'Indian',
    'Italian',
    'Japanese',
    'Mediterranean',
    'Mexican',
    'Spanish',
    'Thai',
    'vegan',
    'other',
  ];

  nextStep(event: Event) {
    event.preventDefault();
    if (this.step() <= 4) {
      this.step.update((prev) => prev + 1);
    }
  }

  prevStep(event: Event) {
    event.preventDefault();
    if (this.step() > 1) {
      this.step.update((prev) => prev - 1);
    }
  }

  left = ChevronLeft;
  right = ChevronRight;
  utensils = Utensils;
}
