import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicRouteGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  async canActivate(): Promise<boolean> {
    const currentUser = await firstValueFrom(this.auth.getCurrentUser());

    if (!currentUser) {
      await this.auth.authorizeUser('revalidate');
    }

    const updatedUser = await firstValueFrom(this.auth.getCurrentUser());

    if (updatedUser) {
      await this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
