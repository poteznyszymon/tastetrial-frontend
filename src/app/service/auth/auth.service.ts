import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../shared/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authorizedUser = new BehaviorSubject<User | null>(null);
  private isLoading = new BehaviorSubject<boolean>(false);
  private isRevalidating = new BehaviorSubject<boolean>(false);
  private isLogginInLoading = new BehaviorSubject<boolean>(false);
  private isLoggingoutLoading = new BehaviorSubject<boolean>(false);

  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public toastService: ToastService
  ) {}

  public async authorizeUser(
    mode: 'initial' | 'revalidate' = 'initial'
  ): Promise<void> {
    const loadingMap = {
      initial: this.isLoading,
      revalidate: this.isRevalidating,
    };

    const loadingState = loadingMap[mode];
    loadingState.next(true);

    try {
      const user = await firstValueFrom(
        this.httpClient.get<User>('/api/auth/me')
      );
      this.authorizedUser.next(user);
    } catch (error: any) {
      if (error.status === 500 && this.isLoading) {
        this.toastService.show('Something went wrong. Please try again.');
      }
    } finally {
      loadingState.next(false);
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
      await this.authorizeUser('revalidate');
      this.router.navigate(['/']);
    } catch (error: any) {
      console.log(error);
      if (error.status === 401) {
        this.toastService.show('Invalid credentials.');
      }
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
      if (location.pathname === '/profile') {
        await this.router.navigate(['/']);
      }
    } catch (error) {
      console.log(error);
      this.toastService.show('Something went wrong. Please try again.');
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
