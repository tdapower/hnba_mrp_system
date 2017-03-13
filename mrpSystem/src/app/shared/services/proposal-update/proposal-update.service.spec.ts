/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProposalUpdateService } from './proposal-update.service';

describe('ProposalAddService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProposalUpdateService]
    });
  });

  it('should ...', inject([ProposalUpdateService], (service: ProposalUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
