import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProposalUpdateService } from '../../../shared/services/proposal-update/proposal-update.service';

import { IPendingProposal } from '../../../shared/models/pendingProposal.model';

@Component({
  selector: 'app-pending-proposals',
  templateUrl: './pending-proposals.component.html',
  styleUrls: ['./pending-proposals.component.css']
})
export class PendingProposalsComponent implements OnInit {

  isLoading: boolean;

  searchResults: Array<Object> = [];
  constructor(private proposalUpdateService: ProposalUpdateService, private router: Router) {
    this.saerchPendingProposals();
   }

  ngOnInit() {
  
  }


  saerchPendingProposals() {

    this.isLoading = true;

    this.proposalUpdateService.searchPendingProposals().subscribe((data: any) => {
      console.log(data);
      this.searchResults = data;
      this.isLoading = false;
    },
      (err) => {
        console.log(err);
        this.isLoading = false;
      },
      () => console.log('done'));

  }

  setClickedRow = function (index, SeqId) {
    console.log(SeqId);

    this.router.navigate(['/', 'proposalUpdate', SeqId]);
  }

}
