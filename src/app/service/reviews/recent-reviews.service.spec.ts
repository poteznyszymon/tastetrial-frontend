import { TestBed } from '@angular/core/testing';

import { RecentReviewsService } from './recent-reviews.service';

describe('RecentReviewsService', () => {
  let service: RecentReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentReviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
