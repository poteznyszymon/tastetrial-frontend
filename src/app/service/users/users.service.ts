import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../shared/toast.service';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private currentUser = new BehaviorSubject<User | null>(null);
  private isLoading = new BehaviorSubject<Boolean>(false);

  constructor(
    public httpClient: HttpClient,
    public toastService: ToastService
  ) {}

  public async findUserByUsername(username: string): Promise<void> {
    this.isLoading.next(true);
    try {
      const user = await firstValueFrom(
        this.httpClient.get<User>(`/api/user/${username}`)
      );
      this.currentUser.next(user);
    } catch (error) {
    } finally {
      this.isLoading.next(false);
    }
  }

  public getUser = (): Observable<User | null> => {
    return this.currentUser.asObservable();
  };

  public getIsLoading = (): Observable<Boolean> => {
    return this.isLoading.asObservable();
  };
}
