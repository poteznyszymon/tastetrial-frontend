import { Component, Input, signal } from '@angular/core';
import { Review } from '../../../models/review';
import { CommonModule } from '@angular/common';
import {
  AlertCircle,
  ChevronRight,
  Edit,
  Heart,
  LucideAngularModule,
  Star,
  X,
} from 'lucide-angular';
import { HelpfulService } from '../../../service/reviews/helpful.service';
import { RouterLink } from '@angular/router';
import { DialogMenuComponent } from '../dialog-menu/dialog-menu.component';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-review-component',
  imports: [CommonModule, LucideAngularModule, RouterLink, DialogMenuComponent],
  templateUrl: './review-component.component.html',
  styleUrl: './review-component.component.css',
})
export class ReviewComponentComponent {
  @Input() review: Review | null = null;
  @Input() isOwner = false;

  contentValue = signal<string | null>(null);
  ratingValue = signal<number>(0);
  tempRatingValue = signal<number>(0);

  constructor(public helpfulService: HelpfulService) {}

  async handleEditReview(): Promise<void> {
    console.log(this.contentValue(), this.ratingValue());
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  toggleHelpfulVote(review: Review, isHelpful: boolean) {
    this.helpfulService.toggleHelpfulVote(review, isHelpful);
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

  /// Icons
  Star = Star;
  Heart = Heart;
  Edit = Edit;
  Arrow = ChevronRight;
  X = X;
  Alert = AlertCircle;
}
