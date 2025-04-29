import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrivateRouteGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = await firstValueFrom(this.auth.getCurrentUser());
    if (!user) {
      await this.router.navigate(['register']);
      return false;
    } else {
      return true;
    }
  }
}
