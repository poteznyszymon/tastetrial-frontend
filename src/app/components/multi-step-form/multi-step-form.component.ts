import { Component, signal } from '@angular/core';
import { CurrentStepInfoComponent } from '../current-step-info/current-step-info.component';
import { ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-multi-step-form',
  imports: [CurrentStepInfoComponent, LucideAngularModule],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.css',
})
export class MultiStepFormComponent {
  step = signal(1);

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
}
