import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { Review } from '../../models/review';

@Injectable({
  providedIn: 'root',
})
export class RecentReviewsService {
  private reviews = new BehaviorSubject<Review[] | null>(null);
  private isLoading = new BehaviorSubject<Boolean>(false);
  private isError = new BehaviorSubject<Boolean>(false);

  constructor(public httpClient: HttpClient) {}

  public async findReviewsByUsername(username: string) {
    this.isLoading.next(true);
    try {
      const reviews = await firstValueFrom(
        this.httpClient.get<Review[]>(`/api/review/${username}/recent`)
      );
      this.reviews.next(reviews.reverse());
    } catch (error) {
      this.isError.next(true);
    } finally {
      this.isLoading.next(false);
    }
  }

  public getRecentReview = (): Observable<Review[] | null> => {
    return this.reviews.asObservable();
  };

  public getIsLoading = (): Observable<Boolean> => {
    return this.isLoading.asObservable();
  };

  public getIsError = (): Observable<Boolean> => {
    return this.isError.asObservable();
  };
}
