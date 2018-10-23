import { TestBed, inject } from '@angular/core/testing';

import { IdleTimeoutService } from './idle-timeout-service.service';

describe('IdleTimeoutServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdleTimeoutService]
    });
  });

  it('should ...', inject([IdleTimeoutService], (service: IdleTimeoutService) => {
    expect(service).toBeTruthy();
  }));
});
