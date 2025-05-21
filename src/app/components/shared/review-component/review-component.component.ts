import { Component, Input } from '@angular/core';
import { Review } from '../../../models/review';
import { CommonModule } from '@angular/common';
import { Edit, Heart, LucideAngularModule, Star } from 'lucide-angular';

@Component({
  selector: 'app-review-component',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './review-component.component.html',
  styleUrl: './review-component.component.css',
})
export class ReviewComponentComponent {
  @Input() review: Review | null = null;

  /// Icons
  Star = Star;
  Heart = Heart;
  Edit = Edit;
}
