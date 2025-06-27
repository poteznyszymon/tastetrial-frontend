import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Check, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-current-step-info',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './current-step-info.component.html',
  styleUrl: './current-step-info.component.css',
})
export class CurrentStepInfoComponent {
  @Input() currentStep = 3;
  @Input() totalSteps = 4;

  createRange() {
    return Array.from({ length: this.totalSteps }, (_, i) => i);
  }

  Check = Check;
}
