import { TestBed } from '@angular/core/testing';

import { EditReviewsService } from './edit-reviews.service';

describe('EditReviewsService', () => {
  let service: EditReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditReviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
