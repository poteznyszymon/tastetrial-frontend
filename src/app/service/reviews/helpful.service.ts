import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';
import { RecentReviewsService } from './recent-reviews.service';

@Injectable({
  providedIn: 'root',
})
export class HelpfulService {
  private isLoading = new BehaviorSubject<{ [revievId: number]: boolean }>({});
  private isError = new BehaviorSubject<Boolean>(false);

  constructor(
    public httpClient: HttpClient,
    public recentReviews: RecentReviewsService
  ) {}

  public async toggleHelpfulVote(reviewId: number, isHelpful: boolean) {
    console.log(isHelpful);
    this.setLoading(reviewId, true);
    try {
      this.recentReviews.updateHelpfulStatus(reviewId, isHelpful);
      const response = await firstValueFrom(
        this.httpClient.post(`/api/review/${reviewId}/helpful`, {})
      );
    } catch (error) {
      this.isError.next(true);
    } finally {
      this.setLoading(reviewId, false);
    }
  }

  public getIsLoading(reviewId: number): Observable<boolean> {
    return this.isLoading
      .asObservable()
      .pipe(map((loadingMap) => loadingMap[reviewId] ?? false));
  }

  public getIsError = (): Observable<Boolean> => {
    return this.isError.asObservable();
  };

  private setLoading(reviedId: number, loadingState: boolean) {
    const current = this.isLoading.getValue();
    this.isLoading.next({
      ...current,
      [reviedId]: loadingState,
    });
  }
}
