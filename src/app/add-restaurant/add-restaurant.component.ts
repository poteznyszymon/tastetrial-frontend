import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MultiStepFormComponent } from '../components/multi-step-form/multi-step-form.component';
import { CurrentStepInfoComponent } from '../components/current-step-info/current-step-info.component';

@Component({
  selector: 'app-add-restaurant',
  imports: [CommonModule, MultiStepFormComponent, CurrentStepInfoComponent],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.css',
})
export class AddRestaurantComponent {}
