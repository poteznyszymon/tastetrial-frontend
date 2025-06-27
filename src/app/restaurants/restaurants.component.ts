import { Component, signal } from '@angular/core';
import { RestaurantsService } from '../service/restaurants/restaurants.service';
import { CommonModule } from '@angular/common';
import { ResourceErrorPageComponent } from '../components/shared/resource-error-page/resource-error-page.component';
import { FilterComponent } from '../components/restaurants/filter/filter.component';
import { RestaurantCardComponent } from '../components/shared/restaurant-card/restaurant-card.component';
import { SkeletonComponent } from '../components/skeleton/skeleton.component';

@Component({
  selector: 'app-restaurants',
  imports: [
    CommonModule,
    ResourceErrorPageComponent,
    FilterComponent,
    RestaurantCardComponent,
    SkeletonComponent,
  ],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css',
})
export class RestaurantsComponent {
  restaurants$;
  isLoading$;
  isError$;

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

  orderBy = [
    'Top rated',
    'Most revieved',
    'Newest',
    'Name (A-Z)',
    'Name (Z-A)',
  ];

  constructor(public restaurantService: RestaurantsService) {
    this.restaurants$ = this.restaurantService.getRestaurants();
    this.isLoading$ = this.restaurantService.getIsLoading();
    this.isError$ = this.restaurantService.getIsError();
  }

  ngOnInit(): void {
    this.restaurantService.fetchRestaurants();
  }
}
