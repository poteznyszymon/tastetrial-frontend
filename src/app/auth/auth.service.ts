import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authorizedUser = new BehaviorSubject<User | null>(null);
  private isLoading = new BehaviorSubject<boolean>(false);

  constructor(public httpClient: HttpClient) {}

  public async authorizeUser(): Promise<void> {
    this.isLoading.next(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const user = await firstValueFrom(
        this.httpClient.get<User>('/api/auth/me')
      );
      this.authorizedUser.next(user);
      this.authorizedUser.next(null);
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading.next(false);
    }
  }

  public getCurrentUser = (): Observable<User | null> => {
    return this.authorizedUser.asObservable();
  };

  public getIsLoading = (): Observable<boolean> => {
    return this.isLoading.asObservable();
  };
}
