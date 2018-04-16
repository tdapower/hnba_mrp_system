import { TestBed, inject } from '@angular/core/testing';

import { MainDashboardService } from './main-dashboard.service';

describe('MainDashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainDashboardService]
    });
  });

  it('should ...', inject([MainDashboardService], (service: MainDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
