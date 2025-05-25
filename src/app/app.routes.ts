import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PrivateRouteGuardService } from './service/auth/private-route-guard.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PublicRouteGuardService } from './service/auth/public-route-guard.service';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ReviewsComponent } from './profile/reviews/reviews.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'profile/:username',
    component: ProfileComponent,
    //canActivate: [PrivateRouteGuardService],
  },
  {
    path: 'profile/:username/reviews',
    component: ReviewsComponent,
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    canActivate: [PublicRouteGuardService],
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [PublicRouteGuardService],
  },
  {
    path: 'restaurants',
    component: RestaurantsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
