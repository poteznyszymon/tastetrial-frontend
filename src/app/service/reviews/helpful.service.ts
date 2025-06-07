import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';
import { RecentReviewsService } from './recent-reviews.service';
import { Review } from '../../models/review';
import { UsersService } from '../users/users.service';
import { UserReviewsService } from './user-reviews.service';

@Injectable({
  providedIn: 'root',
})
export class HelpfulService {
  private isLoading = new BehaviorSubject<{ [revievId: number]: boolean }>({});
  private isError = new BehaviorSubject<Boolean>(false);

  constructor(
    public httpClient: HttpClient,
    public recentReviews: RecentReviewsService,
    public userReviews: UserReviewsService,
    public userService: UsersService
  ) {}

  public async toggleHelpfulVote(review: Review, isHelpful: boolean) {
    console.log(isHelpful);
    this.setLoading(review.id, true);
    try {
      this.recentReviews.updateHelpfulStatus(review.id, isHelpful);
      this.userReviews.updateHelpfulStatus(review.id, isHelpful);
      this.userService.handleChangeHelpfulReviews(
        review.createdBy.username,
        !isHelpful ? 'subtract' : 'add'
      );
      const response = await firstValueFrom(
        this.httpClient.post(`/api/review/${review.id}/helpful`, {})
      );
    } catch (error) {
      this.isError.next(true);
      this.recentReviews.updateHelpfulStatus(review.id, !isHelpful);
      this.userService.handleChangeHelpfulReviews(
        review.createdBy.username,
        isHelpful ? 'subtract' : 'add'
      );
    } finally {
      this.setLoading(review.id, false);
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
