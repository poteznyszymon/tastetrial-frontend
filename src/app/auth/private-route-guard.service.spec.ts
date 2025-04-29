import { TestBed } from '@angular/core/testing';

import { PrivateRouteGuardService } from './private-route-guard.service';

describe('PrivateRouteGuardService', () => {
  let service: PrivateRouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateRouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
