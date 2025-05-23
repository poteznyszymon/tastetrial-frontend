import { TestBed } from '@angular/core/testing';

import { HelpfulService } from './helpful.service';

describe('HelpfulService', () => {
  let service: HelpfulService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpfulService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
