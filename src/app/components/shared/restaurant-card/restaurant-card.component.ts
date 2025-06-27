import { Component, Input } from '@angular/core';
import { Restaurant } from '../../../models/restaurant';
import { CommonModule } from '@angular/common';
import { ChevronRight, Heart, LucideAngularModule, Star } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-restaurant-card',
  imports: [CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.css',
})
export class RestaurantCardComponent {
  @Input() restaurant!: Restaurant;

  /// Icons
  StarIcon = Star;
  Arrow = ChevronRight;
  HeartIcon = Heart;
}
