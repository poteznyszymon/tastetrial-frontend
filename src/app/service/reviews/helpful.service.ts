import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { RecentReviewsService } from './recent-reviews.service';

@Injectable({
  providedIn: 'root',
})
export class HelpfulService {
  private isLoading = new BehaviorSubject<Boolean>(false);
  private isError = new BehaviorSubject<Boolean>(false);

  constructor(
    public httpClient: HttpClient,
    public recentReviews: RecentReviewsService
  ) {}

  public async toggleHelpfulVote(reviewId: number, isHelpful: boolean) {
    console.log(isHelpful);
    this.isLoading.next(true);
    try {
      this.recentReviews.updateHelpfulStatus(reviewId, isHelpful);
      const response = await firstValueFrom(
        this.httpClient.post(`/api/review/${reviewId}/helpful`, {})
      );
    } catch (error) {
      this.isError.next(true);
    } finally {
      this.isLoading.next(false);
    }
  }

  public getIsLoading = (): Observable<Boolean> => {
    return this.isLoading.asObservable();
  };

  public getIsError = (): Observable<Boolean> => {
    return this.isError.asObservable();
  };
}
