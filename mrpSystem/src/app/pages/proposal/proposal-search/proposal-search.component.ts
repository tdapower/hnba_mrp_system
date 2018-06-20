import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { CommonService } from '../../../shared/services/common/common.service';
import { QuotationService } from '../../../shared/services/quotation/quotation.service';
import { ProposalRegisterService } from '../../../shared/services/proposal-register/proposal-register.service';
import { ISearchProposals } from '../../../shared/models/proposalSearch.model';






import { IHnbaBranch } from '../../../shared/models/hnbaBranch.model';
import { ILoanType } from '../../../shared/models/loanType.model';

import { IBank } from '../../../shared/models/bank.model';


@Component({
  selector: 'app-proposal-search',
  templateUrl: './proposal-search.component.html',
  styleUrls: ['./proposal-search.component.css']
})
export class ProposalSearchComponent implements OnInit {

  isLoading: boolean;
  hnbaBranchList: Array<IHnbaBranch> = [];
  loanTypeList: Array<ILoanType> = [];

  bankList: Array<IBank> = [];


  searchResults: Array<Object> = [];

  SeqId: number = 0;
  ProposalNo: string = '';
  QuotationNo: string = '';
  LifeAss1Name: string = '';
  LifeAss1Nic: string = '';
  LifeAss2Name: string = '';
  LifeAss2Nic: string = '';
  LoanTypeId: number = 0;
  Bank: string = '';
  HNBABranchCode: string = '';

  BranchCode: string = '';
  LoanTypeName: string = '';
  page: null;

  constructor(private quotationService: QuotationService,
    private commonService: CommonService,
    private proposalRegisterService: ProposalRegisterService, private router: Router) { }

  ngOnInit() {
    this.getHnbaBranches();
    this.getLoanTypes();
    this.getBanks();
  }


  getHnbaBranches() {
    this.isLoading = true;
    this.commonService.getHnbaBranch()
      .subscribe((data) => {
        this.hnbaBranchList = data
        this.isLoading = false;
      },
      (err) => console.log(err));
  }


  getBanks() {
    this.isLoading = true;
    this.commonService.getBank()
      .subscribe((data) => {
        this.bankList = data
        this.isLoading = false;
      },
      (err) => console.log(err));
  }
  getLoanTypes() {
    this.isLoading = true;
    this.commonService.getLoanTypes()
      .subscribe((data) => {
        this.loanTypeList = data
        this.isLoading = false;
      },
      (err) => console.log(err));
  }





  searchProposals() {


    console.log(this.LoanTypeId);

    let objSearchProposals: ISearchProposals = {
      ProposalNo: this.ProposalNo,
      QuotationNo: this.QuotationNo,
      LifeAss1Name: this.LifeAss1Name,
      LifeAss1Nic: this.LifeAss1Nic,
      LifeAss2Name: this.LifeAss2Name,
      LifeAss2Nic: this.LifeAss2Nic,
      LoanTypeId: Number(this.LoanTypeId),
      Bank: this.Bank,
      HNBABranchCode: this.HNBABranchCode
    }
    console.log(JSON.stringify(objSearchProposals));
    console.log('kkkkkk');
    this.proposalRegisterService.searchProposalDetails(objSearchProposals).subscribe((data: any) => {
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

    this.router.navigate(['/', 'proposalView', SeqId]);
  }



}
