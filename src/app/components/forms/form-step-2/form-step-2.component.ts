import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, MapPin } from 'lucide-angular';

@Component({
  selector: 'app-form-step-2',
  imports: [LucideAngularModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form-step-2.component.html',
  styleUrl: './form-step-2.component.css',
})
export class FormStep2Component {
  @Input() form!: FormGroup;

  location = MapPin;
}
