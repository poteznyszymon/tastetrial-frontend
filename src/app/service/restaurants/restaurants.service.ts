import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { Restaurant } from '../../models/restaurant';

interface RestaurantsResponse {
  content: Restaurant[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private restaurants = new BehaviorSubject<Restaurant[] | null>(null);
  private isLoading = new BehaviorSubject<boolean>(false);
  private isError = new BehaviorSubject<boolean>(true);

  /// pagination values
  private totalPages = new BehaviorSubject<number>(0);
  private totalElements = new BehaviorSubject<number>(0);
  private first = new BehaviorSubject<boolean>(false);
  private last = new BehaviorSubject<boolean>(false);
  private empty = new BehaviorSubject<boolean>(false);

  public async fetchRestaurants() {
    this.isError.next(false);
    this.isLoading.next(true);
    try {
      const response = await firstValueFrom(
        this.httpClient.get<RestaurantsResponse>('/api/restaurant')
      );
      this.restaurants.next(response.content);
      this.totalPages.next(response.totalPages);
      this.totalElements.next(response.totalElements);
    } catch (error) {
      console.log(error);
      this.isError.next(true);
    } finally {
      this.isLoading.next(false);
    }
  }

  constructor(public httpClient: HttpClient) {}

  public getRestaurants(): Observable<Restaurant[] | null> {
    return this.restaurants.asObservable();
  }

  public getIsLoading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  public getIsError(): Observable<boolean> {
    return this.isError.asObservable();
  }
}
