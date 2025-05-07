import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PrivateRouteGuardService } from './service/auth/private-route-guard.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PublicRouteGuardService } from './service/auth/public-route-guard.service';

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
    path: '**',
    redirectTo: '',
  },
];
