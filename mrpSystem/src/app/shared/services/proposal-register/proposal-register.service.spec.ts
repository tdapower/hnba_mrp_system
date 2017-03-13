/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProposalRegisterService } from './proposal-register.service';

describe('ProposalRegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProposalRegisterService]
    });
  });

  it('should ...', inject([ProposalRegisterService], (service: ProposalRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
