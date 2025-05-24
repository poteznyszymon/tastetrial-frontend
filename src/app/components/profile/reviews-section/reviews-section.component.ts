import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  LucideAngularModule,
  RefreshCcw,
  TriangleAlertIcon,
} from 'lucide-angular';
import { RecentReviewsService } from '../../../service/reviews/recent-reviews.service';
import { ReviewComponentComponent } from '../../shared/review-component/review-component.component';

@Component({
  selector: 'app-reviews-section',
  imports: [
    LucideAngularModule,
    RouterModule,
    CommonModule,
    ReviewComponentComponent,
  ],
  templateUrl: './reviews-section.component.html',
  styleUrl: './reviews-section.component.css',
})
export class ReviewsSectionComponent {
  @Input() isOwner = false;

  reviews$;
  isLoading$;
  isError$;

  constructor(
    public recentReviewsService: RecentReviewsService,
    public route: ActivatedRoute
  ) {
    this.reviews$ = recentReviewsService.getRecentReview();
    this.isLoading$ = recentReviewsService.getIsLoading();
    this.isError$ = recentReviewsService.getIsError();
  }

  handleReload() {
    this.route.paramMap.subscribe((param) => {
      const username = param.get('username');
      if (username) {
        this.recentReviewsService.findReviewsByUsername(username);
      }
    });
  }

  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.handleReload();
  }

  /// Icons
  Arrow = ChevronRight;
  LoaderIcon = Loader2;
  ErrorIcon = TriangleAlertIcon;
  Refresh = RefreshCcw;
}
