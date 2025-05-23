import { Component, Input } from '@angular/core';
import { Review } from '../../../models/review';
import { CommonModule } from '@angular/common';
import {
  ChevronRight,
  Edit,
  Heart,
  LucideAngularModule,
  Star,
} from 'lucide-angular';
import { HelpfulService } from '../../../service/reviews/helpful.service';
import { RouterLink } from '@angular/router';
import { DialogMenuComponent } from '../dialog-menu/dialog-menu.component';

@Component({
  selector: 'app-review-component',
  imports: [CommonModule, LucideAngularModule, RouterLink, DialogMenuComponent],
  templateUrl: './review-component.component.html',
  styleUrl: './review-component.component.css',
})
export class ReviewComponentComponent {
  @Input() review: Review | null = null;
  @Input() isOwner = false;

  isHelpfulToggleLoading$;

  constructor(public helpfulService: HelpfulService) {
    this.isHelpfulToggleLoading$ = this.helpfulService.getIsLoading();
  }

  toggleHelpfulVote(reviewId: number, isHelpful: boolean) {
    this.helpfulService.toggleHelpfulVote(reviewId, isHelpful);
  }

  /// Icons
  Star = Star;
  Heart = Heart;
  Edit = Edit;
  Arrow = ChevronRight;
}
