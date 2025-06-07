import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { Review } from '../../models/review';

interface reviewsResponse {
  content: Review[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}

interface getReviewsInterface {
  username: string;
  page?: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserReviewsService {
  /// reviews values
  private reviews = new BehaviorSubject<Review[] | null>(null);
  private isLoading = new BehaviorSubject<boolean>(false);
  private isError = new BehaviorSubject<boolean>(true);

  /// pagination values
  private totalPages = new BehaviorSubject<number>(0);
  private totalElements = new BehaviorSubject<number>(0);
  private first = new BehaviorSubject<boolean>(false);
  private last = new BehaviorSubject<boolean>(false);
  private empty = new BehaviorSubject<boolean>(false);

  constructor(public httpClient: HttpClient) {}

  public async fetchUserReviews({ username, page }: getReviewsInterface) {
    this.isLoading.next(true);
    this.isError.next(false);
    try {
      const response = await firstValueFrom(
        this.httpClient.get<reviewsResponse>(
          `/api/review/${username}?size=6&page=${page || 0}`
        )
      );
      this.reviews.next(response.content);
      this.totalPages.next(response.totalPages);
    } catch (error) {
      this.isError.next(true);
    } finally {
      this.isLoading.next(false);
    }
  }

  public updateHelpfulStatus(reviewId: number, helpful: boolean) {
    const currentReviews = this.reviews.getValue();
    if (!currentReviews) return;

    const updatedReviews = currentReviews.map((review) => {
      if (review.id === reviewId) {
        return {
          ...review,
          votedHelpfulByCurrentUser: helpful,
          totalHelpfulVotes: helpful
            ? review.totalHelpfulVotes + 1
            : Math.max(0, review.totalHelpfulVotes - 1),
        };
      }
      return review;
    });
    this.reviews.next(updatedReviews);
  }

  public getReviews = (): Observable<Review[] | null> => {
    return this.reviews.asObservable();
  };

  public getIsLoading = (): Observable<boolean> => {
    return this.isLoading.asObservable();
  };

  public getIsError = (): Observable<boolean> => {
    return this.isError.asObservable();
  };
}
