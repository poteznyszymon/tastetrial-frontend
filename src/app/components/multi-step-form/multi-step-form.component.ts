import { Component, signal } from '@angular/core';
import { CurrentStepInfoComponent } from '../current-step-info/current-step-info.component';
import {
  ChevronLeft,
  ChevronRight,
  LucideAngularModule,
  Utensils,
} from 'lucide-angular';
import { DropDownComponent } from '../shared/drop-down/drop-down.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormStep1Component } from '../forms/form-step-1/form-step-1.component';

@Component({
  selector: 'app-multi-step-form',
  imports: [
    CurrentStepInfoComponent,
    LucideAngularModule,
    DropDownComponent,
    CommonModule,
    ReactiveFormsModule,
    FormStep1Component,
  ],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.css',
})
export class MultiStepFormComponent {
  form: FormGroup;
  step = signal(1);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      step1: this.formBuilder.group({
        name: ['', Validators.required],
        cuisine: ['', Validators.required],
        phoneNumber: [''],
        website: [''],
        description: ['', Validators.required],
      }),
    });
  }

  nextStep(event: Event) {
    event.preventDefault();
    if (this.step() <= 4 && this.isCurrentStepValid()) {
      console.log(this.form.value);
      this.step.update((prev) => prev + 1);
    }
  }

  prevStep(event: Event) {
    event.preventDefault();
    if (this.step() > 1) {
      this.step.update((prev) => prev - 1);
    }
  }

  isCurrentStepValid() {
    const stepGroup = this.getStepFormGroup();
    stepGroup.markAllAsTouched();
    return stepGroup.valid;
  }

  getStepFormGroup(): FormGroup {
    return this.form.get(`step${this.step()}`) as FormGroup;
  }

  handleCuisineChange(cuisine: string) {
    const step1 = this.form.get('step1') as FormGroup;
    step1.get('cuisine')?.setValue(cuisine);
  }

  get step1Group(): FormGroup {
    return this.form.get('step1') as FormGroup;
  }

  left = ChevronLeft;
  right = ChevronRight;
  utensils = Utensils;

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
}
