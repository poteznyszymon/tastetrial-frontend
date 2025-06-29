import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, Utensils } from 'lucide-angular';
import { DropDownComponent } from '../../shared/drop-down/drop-down.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-step-1',
  imports: [
    CommonModule,
    LucideAngularModule,
    DropDownComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './form-step-1.component.html',
  styleUrl: './form-step-1.component.css',
})
export class FormStep1Component {
  @Input() form!: FormGroup;
  @Input() cuisines: string[] = [];

  handleCuisineChange(cuisine: string) {
    this.form.get('cuisine')?.setValue(cuisine);
  }

  utensils = Utensils;
}
