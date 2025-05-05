import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authorizedUser = new BehaviorSubject<User | null>(null);
  private isLoading = new BehaviorSubject<boolean>(false);
  private isLogginInLoading = new BehaviorSubject<boolean>(false);
  private isLoggingoutLoading = new BehaviorSubject<boolean>(false);

  constructor(public httpClient: HttpClient, public router: Router) {}

  public async authorizeUser(): Promise<void> {
    this.isLoading.next(true);
    try {
      const user = await firstValueFrom(
        this.httpClient.get<User>('/api/auth/me')
      );
      this.authorizedUser.next(user);
    } catch (error: any) {
      console.log(error);
    } finally {
      this.isLoading.next(false);
    }
  }

  public async loginUser(username: string, password: string): Promise<void> {
    this.isLogginInLoading.next(true);
    const headers = { 'Content-Type': 'application/json' };
    try {
      const response = await firstValueFrom(
        this.httpClient.post(
          '/api/auth/login',
          {
            username,
            password,
          },
          { headers }
        )
      );
      await this.authorizeUser();
      this.isLogginInLoading.next(false);
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
      this.isLogginInLoading.next(false);
    } finally {
      this.isLogginInLoading.next(false);
    }
  }

  public async logoutUser(): Promise<void> {
    this.isLoggingoutLoading.next(true);
    try {
      const respone = await firstValueFrom(
        this.httpClient.post('/api/auth/logout', {})
      );
      this.authorizedUser.next(null);
    } catch (error) {
      this.isLoggingoutLoading.next(true);
    } finally {
      this.isLoggingoutLoading.next(false);
    }
  }

  public getCurrentUser = (): Observable<User | null> => {
    return this.authorizedUser.asObservable();
  };

  public getIsLoading = (): Observable<boolean> => {
    return this.isLoading.asObservable();
  };

  public getIsLogginInLoading = (): Observable<boolean> => {
    return this.isLogginInLoading.asObservable();
  };

  public getIsLogginOutLoading = (): Observable<boolean> => {
    return this.isLoggingoutLoading.asObservable();
  };
}
