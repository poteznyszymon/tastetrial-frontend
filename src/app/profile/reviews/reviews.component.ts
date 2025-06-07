import { Component } from '@angular/core';
import { UserReviewsService } from '../../service/reviews/user-reviews.service';
import { CommonModule } from '@angular/common';
import { ResourceErrorPageComponent } from '../../components/shared/resource-error-page/resource-error-page.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { ArrowLeft, LucideAngularModule } from 'lucide-angular';
import { ReviewComponentComponent } from '../../components/shared/review-component/review-component.component';

@Component({
  selector: 'app-reviews',
  imports: [
    CommonModule,
    ResourceErrorPageComponent,
    LucideAngularModule,
    RouterLink,
    ReviewComponentComponent,
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent {
  isLoading$;
  isError$;
  reviews$;

  isOwner = false;
  username = '';

  constructor(
    public userReviewsService: UserReviewsService,
    public route: ActivatedRoute,
    public authService: AuthService
  ) {
    this.isLoading$ = this.userReviewsService.getIsLoading();
    this.isError$ = this.userReviewsService.getIsError();
    this.reviews$ = this.userReviewsService.getReviews();
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((param) => {
      const username = param.get('username');
      if (username) {
        this.username = username;
        this.userReviewsService.fetchUserReviews({ username });
        this.authService.getCurrentUser().subscribe((authUser) => {
          this.isOwner = username === authUser?.username;
        });
      }
    });
  }

  /// Icons
  ArrowLeft = ArrowLeft;
}
