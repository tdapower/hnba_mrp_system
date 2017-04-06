import { TestBed, inject } from '@angular/core/testing';

import { AssureService } from './assure.service';

describe('AssureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssureService]
    });
  });

  it('should ...', inject([AssureService], (service: AssureService) => {
    expect(service).toBeTruthy();
  }));
});
