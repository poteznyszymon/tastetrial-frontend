import { TestBed } from '@angular/core/testing';

import { PublicRouteGuardService } from './public-route-guard.service';

describe('PublicRouteGuardService', () => {
  let service: PublicRouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicRouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
