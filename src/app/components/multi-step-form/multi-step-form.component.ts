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
import { FormStep2Component } from '../forms/form-step-2/form-step-2.component';
import { FormStep3Component } from '../forms/form-step-3/form-step-3.component';

@Component({
  selector: 'app-multi-step-form',
  imports: [
    CurrentStepInfoComponent,
    LucideAngularModule,
    CommonModule,
    ReactiveFormsModule,
    FormStep1Component,
    FormStep2Component,
    FormStep3Component,
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
        phoneNumber: ['', Validators.pattern(/^[0-9\s\-]{9,15}$/)],
        website: [
          '',
          Validators.pattern(
            /^(https?:\/\/)?([\w\-]+\.)+[a-z]{2,6}([\/\w\-.~:?#[\]@!$&'()*+,;=]*)*\/?$/i
          ),
        ],

        description: ['', Validators.required],
      }),
      step2: this.formBuilder.group({
        streetName: ['', [Validators.required, Validators.minLength(2)]],
        streetNumber: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[0-9]+[a-zA-Z]?(\/[0-9]+[a-zA-Z]?)?$/),
          ],
        ],
        city: [
          '',
          [Validators.required, Validators.pattern(/^[\p{L} .'-]{2,}$/u)],
        ],
        state: [
          '',
          [Validators.required, Validators.pattern(/^[\p{L} .'-]{2,}$/u)],
        ],
        postalCode: [
          '',
          [Validators.required, Validators.pattern(/^\d{2}-?\d{3}$/)],
        ],
        country: [
          '',
          [Validators.required, Validators.pattern(/^[\p{L} .'-]{2,}$/u)],
        ],
        latitude: [
          10,
          [Validators.required, Validators.min(-90), Validators.max(90)],
        ],
        longitude: [
          10,
          [Validators.required, Validators.min(-180), Validators.max(180)],
        ],
      }),
      step3: this.formBuilder.group({
        monday: this.formBuilder.group({ openTime: null, closeTime: null }),
        tuesday: this.formBuilder.group({ openTime: null, closeTime: null }),
        wednesday: this.formBuilder.group({ openTime: null, closeTime: null }),
        thursday: this.formBuilder.group({ openTime: null, closeTime: null }),
        friday: this.formBuilder.group({ openTime: null, closeTime: null }),
        saturday: this.formBuilder.group({ openTime: null, closeTime: null }),
        sunday: this.formBuilder.group({ openTime: null, closeTime: null }),
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

  stepGroup(step: string): FormGroup {
    return this.form.get(step) as FormGroup;
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
