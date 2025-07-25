import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrivateRouteGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  async canActivate(): Promise<boolean> {
    const currentUser = await firstValueFrom(this.auth.getCurrentUser());

    if (!currentUser) {
      await this.auth.authorizeUser('revalidate');
    }

    const updatedUser = await firstValueFrom(this.auth.getCurrentUser());

    if (!updatedUser) {
      await this.router.navigate(['auth/login']);
      return false;
    } else {
      return true;
    }
  }
}
