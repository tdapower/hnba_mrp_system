import { Component, OnInit } from '@angular/core';


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
  LoanTypeId: number;


  constructor(private quotationService: QuotationService,
    private commonService: CommonService) { }

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



    let objSearchQuotations: ISearchQuotations = {
      QuotationNo: this.QuotationNo,
      LifeAss1Name: this.LifeAss1Name,
      LifeAss1Nic: this.LifeAss1Nic,
      LifeAss2Name: this.LifeAss2Name,
      LifeAss2Nic: this.LifeAss2Nic,
      LoanTypeId: this.LoanTypeId
    }

    this.quotationService.searchQuotationDetails(objSearchQuotations).subscribe((data: any) => {
      console.log(data);
      this.searchResults = data;
    }),
      (err) => {
        console.log(err);
      },
      () => console.log('done');



  }

  setClickedRow = function (index, JobId) {
    console.log(JobId);

    //   this.router.navigate(['/', 'view', JobId]);
  }


}
