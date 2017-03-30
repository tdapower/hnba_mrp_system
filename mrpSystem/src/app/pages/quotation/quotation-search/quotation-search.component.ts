import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { CommonService } from '../../../shared/services/common/common.service';
import { QuotationService } from '../../../shared/services/quotation/quotation.service';

import { IHnbaBranch } from '../../../shared/models/hnbaBranch.model';
import { ILoanType } from '../../../shared/models/loanType.model';
import { ISearchQuotations } from '../../../shared/models/quotationSearch.model';

@Component({
  selector: 'app-quotation-search',
  templateUrl: './quotation-search.component.html',
  styleUrls: ['./quotation-search.component.css']
})
export class QuotationSearchComponent implements OnInit {

  isLoading: boolean;
  hnbaBranchList: Array<IHnbaBranch> = [];
  loanTypeList: Array<ILoanType> = [];


  searchResults: Array<Object> = [];

  SeqId: number = 0;
  QuotationNo: string = '';
  RevisionNo: number = 0;
  LifeAss1Name: string = '';
  LifeAss1Nic: string = '';
  LifeAss2Name: string = '';
  LifeAss2Nic: string = '';
  LoanTypeId: number = 0;
  BranchCode: string = '';

  LoanTypeName: string = '';

  constructor(private quotationService: QuotationService,
    private commonService: CommonService, private router: Router) { }

  ngOnInit() {
    this.getHnbaBranches();
    this.getLoanTypes();
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


  getLoanTypes() {
    this.isLoading = true;
    this.commonService.getLoanTypes()
      .subscribe((data) => {
        this.loanTypeList = data
        this.isLoading = false;
      },
      (err) => console.log(err));
  }






  searchQuotations() {

    //this.LoanTypeName = this.loanTypeList.filter(item => item.LoanTypeId == this.LoanTypeId)[0]['LoanTypeName'];

    console.log(this.LoanTypeId);

    let objSearchQuotations: ISearchQuotations = {
      QuotationNo: this.QuotationNo,
      RevisionNo: Number(this.RevisionNo),
      LifeAss1Name: this.LifeAss1Name,
      LifeAss1Nic: this.LifeAss1Nic,
      LifeAss2Name: this.LifeAss2Name,
      LifeAss2Nic: this.LifeAss2Nic,
      LoanTypeId: Number(this.LoanTypeId),
      BranchCode: this.BranchCode
    }
    console.log(JSON.stringify(objSearchQuotations));
    this.quotationService.searchQuotationDetails(objSearchQuotations).subscribe((data: any) => {
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

    this.router.navigate(['/', 'reviseQuote', SeqId]);
  }


}
