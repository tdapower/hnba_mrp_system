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



  searchResults: Array<Object> = [];
  constructor(private proposalUpdateService: ProposalUpdateService, private router: Router) { }

  ngOnInit() {
    this.saerchPendingProposals();
  }


  saerchPendingProposals() {



    this.proposalUpdateService.searchPendingProposals().subscribe((data: any) => {
      console.log(data);
      this.searchResults = data;
    },
      (err) => {
        console.log(err);
      },
      () => console.log('done'));

  }

  setClickedRow = function (index, SeqId) {
    console.log(SeqId);

    this.router.navigate(['/', 'proposalUpdate', SeqId]);
  }

}
