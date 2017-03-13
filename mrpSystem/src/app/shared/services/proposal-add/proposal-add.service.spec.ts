/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProposalAddService } from './proposal-add.service';

describe('ProposalAddService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProposalAddService]
    });
  });

  it('should ...', inject([ProposalAddService], (service: ProposalAddService) => {
    expect(service).toBeTruthy();
  }));
});
