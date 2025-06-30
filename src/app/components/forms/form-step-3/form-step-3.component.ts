import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Clock, LucideAngularModule } from 'lucide-angular';
import { OperatingHoursSelectorComponent } from '../../shared/operating-hours-selector/operating-hours-selector.component';

@Component({
  selector: 'app-form-step-3',
  imports: [
    ReactiveFormsModule,
    LucideAngularModule,
    CommonModule,
    OperatingHoursSelectorComponent,
  ],
  templateUrl: './form-step-3.component.html',
  styleUrl: './form-step-3.component.css',
})
export class FormStep3Component {
  @Input() form!: FormGroup;

  stepGroup(step: string): FormGroup {
    return this.form.get(step) as FormGroup;
  }

  clock = Clock;
}
