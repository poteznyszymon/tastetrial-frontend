import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { RecentReviewsService } from './recent-reviews.service';
import { Review } from '../../models/review';
import { ToastService } from '../shared/toast.service';

@Injectable({
  providedIn: 'root',
})
export class EditReviewsService {
  private isLoading = new BehaviorSubject<boolean>(false);
  private isError = new BehaviorSubject<boolean>(false);

  constructor(
    public httpClient: HttpClient,
    public recentReviewsService: RecentReviewsService,
    public toastService: ToastService
  ) {}

  public editReviewData = async (
    reviewId: number,
    content: string | null,
    rating: number | null
  ) => {
    this.isLoading.next(true);
    this.isError.next(false);
    try {
      const response = await firstValueFrom(
        this.httpClient.put<Review>(`/api/review/${reviewId}`, {
          content,
          rating,
        })
      );
      this.recentReviewsService.updateReviewData(response);
      this.toastService.show('Review sucessfully updated.', 'primary');
    } catch (error) {
      this.isError.next(true);
      this.toastService.show(
        'Something went wrong. Please try again.',
        'destructive'
      );
    } finally {
      this.isLoading.next(false);
    }
  };

  public getIsLoding = (): Observable<boolean> => {
    return this.isLoading.asObservable();
  };

  public getIsError = (): Observable<boolean> => {
    return this.isError.asObservable();
  };
}
