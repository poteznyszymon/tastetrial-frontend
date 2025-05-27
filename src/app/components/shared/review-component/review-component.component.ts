import { Component, Input, signal } from '@angular/core';
import { Review } from '../../../models/review';
import { CommonModule } from '@angular/common';
import {
  AlertCircle,
  ChevronRight,
  Edit,
  Heart,
  LucideAngularModule,
  MapPin,
  Star,
  X,
} from 'lucide-angular';
import { HelpfulService } from '../../../service/reviews/helpful.service';
import { RouterLink } from '@angular/router';
import { DialogMenuComponent } from '../dialog-menu/dialog-menu.component';
import { timeout } from 'rxjs';
import { EditReviewsService } from '../../../service/reviews/edit-reviews.service';
import { ReviewEditMenuComponent } from '../review-edit-menu/review-edit-menu.component';

@Component({
  selector: 'app-review-component',
  imports: [
    CommonModule,
    LucideAngularModule,
    RouterLink,
    ReviewEditMenuComponent,
  ],
  templateUrl: './review-component.component.html',
  styleUrl: './review-component.component.css',
})
export class ReviewComponentComponent {
  @Input() review: Review | null = null;
  @Input() isOwner = false;

  isLoading$;

  openDetailsMenu = signal(false);

  handleReviewsMenuClose() {
    this.openDetailsMenu.set(false);
  }

  handleReviewsMenuOpen() {
    this.openDetailsMenu.set(true);
  }

  constructor(
    public helpfulService: HelpfulService,
    public editReviewsService: EditReviewsService
  ) {
    this.isLoading$ = editReviewsService.getIsLoding();
  }

  toggleHelpfulVote(review: Review, isHelpful: boolean) {
    this.helpfulService.toggleHelpfulVote(review, isHelpful);
  }

  /// Icons
  Star = Star;
  Heart = Heart;
  Edit = Edit;
  Arrow = ChevronRight;
  X = X;
  Alert = AlertCircle;
  Pin = MapPin;
}
