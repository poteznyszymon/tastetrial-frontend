import { Component, Input, signal } from '@angular/core';
import { AlertCircle, LucideAngularModule, Star, X } from 'lucide-angular';
import { Review } from '../../../models/review';
import { CommonModule } from '@angular/common';
import { DialogMenuComponent } from '../dialog-menu/dialog-menu.component';
import { EditReviewsService } from '../../../service/reviews/edit-reviews.service';

@Component({
  selector: 'app-review-edit-menu',
  imports: [LucideAngularModule, CommonModule, DialogMenuComponent],
  templateUrl: './review-edit-menu.component.html',
  styleUrl: './review-edit-menu.component.css',
})
export class ReviewEditMenuComponent {
  @Input() review: Review | null = null;
  @Input() isOwner: boolean = false;

  isLoading$;

  contentValue = signal<string | null>(null);
  ratingValue = signal<number>(0);
  tempRatingValue = signal<number>(0);

  constructor(public editReviewsService: EditReviewsService) {
    this.isLoading$ = this.editReviewsService.getIsLoding();
  }

  async handleEditReview(reviewId: number): Promise<void> {
    await this.editReviewsService.editReviewData(
      reviewId,
      this.contentValue(),
      this.ratingValue()
    );
  }

  handleChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.contentValue.set(target.value);
  }

  onClose() {
    this.refreshContent();
  }

  clearContent() {
    this.contentValue.set('');
  }

  refreshContent() {
    if (this.review) {
      this.contentValue.set(this.review.content);
      this.ratingValue.set(this.review.rating);
      this.tempRatingValue.set(this.review.rating);
    }
  }

  ngOnInit(): void {
    this.refreshContent();
  }

  Star = Star;
  X = X;
  Alert = AlertCircle;
}
