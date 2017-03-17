import { Component, OnInit, AfterViewInit } from '@angular/core';


import { CommonService } from '../../../shared/services/common/common.service';
import { QuotationService } from '../../../shared/services/quotation/quotation.service';
import { IHnbaBranch } from '../../../shared/models/hnbaBranch.model';
import { ILoanType } from '../../../shared/models/loanType.model';
import { ICompanyBuffer } from '../../../shared/models/companyBuffer.model';
import { IQuotation } from '../../../shared/models/quotation.model';
import { IUser } from '../../../shared/models/user/user.model';
import { COMMON_VALUES } from '../../../shared/config/commonValues';
declare var jQuery: any;
@Component({
  selector: 'app-quotation-add',
  templateUrl: './quotation-add.component.html',
  styleUrls: ['./quotation-add.component.css']
})
export class QuotationAddComponent implements OnInit, AfterViewInit {

  isLoading: boolean;


  mode: string;

  User: IUser;

  SeqId: number = 0;
  QuotationNo: string = '';
  RevisionNo: number = 0;
  LifeAss1Name: string = '';
  LifeAss1Dob: string = '';
  LifeAss1Age: number;
  LifeAss1Gender: string = '';
  LifeAss1Nic: string = '';
  LifeAss2Name: string = '';
  LifeAss2Dob: string = '';
  LifeAss2Age: number;
  LifeAss2Gender: string = '';
  LifeAss2Nic: string = '';
  LoanAmount: number;
  Term: number;
  FixedInterest: number;
  CompanyBufferId: number;
  CurrentAwplr: number;
  AdditionalToAwplr: number;
  TermOfFixederest: number;
  Discount: number;
  Premium: number;
  LoanTypeId: number;
  BranchCode: string = '';
  UserId: string = '';
  Status: string = '';
  RegisterDate: string = '';



  hnbaBranchList: Array<IHnbaBranch> = [];
  loanTypeList: Array<ILoanType> = [];
  companyBufferList: Array<ICompanyBuffer> = [];


  constructor(private quotationService: QuotationService, private commonService: CommonService) { }

  ngOnInit() {

    // this.isLoading = true;
    this.getHnbaBranches();
    this.getLoanTypes();
    this.getCompanyBuffer();

    this.User = JSON.parse(localStorage.getItem('currentMRPUser'));


  }

  ngAfterViewInit() {

  }
  clearValues() {
    this.SeqId = 0;
    this.QuotationNo = '';
    this.RevisionNo = 0;
    this.LifeAss1Name = '';
    this.LifeAss1Dob = '';
    this.LifeAss1Age = null;
    this.LifeAss1Gender = '';
    this.LifeAss1Nic = '';
    this.LifeAss2Name = '';
    this.LifeAss2Dob = '';
    this.LifeAss2Age = null;
    this.LifeAss2Gender = '';
    this.LifeAss2Nic = '';
    this.LoanAmount = null;
    this.Term = null;
    this.FixedInterest = null;
    this.CompanyBufferId = null;
    this.CurrentAwplr = null;
    this.AdditionalToAwplr = null;
    this.TermOfFixederest = null;
    this.Discount = null;
    this.Premium = null;
    this.LoanTypeId = null;
    this.BranchCode = '';
    this.UserId = '';
    this.Status = '';
    this.RegisterDate = '';

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

  getCompanyBuffer() {
    this.isLoading = true;
    this.commonService.getCompanyBuffer()
      .subscribe((data) => {
        this.companyBufferList = data
        this.isLoading = false;
      },
      (err) => console.log(err));
  }


  public AddNewQuotation() {
    this.clearValues();
  }
  public SaveQuotation() {

    this.isLoading = true;

    if (this.LifeAss1Age == null) {
      this.LifeAss1Age = 0;
    }
    if (this.LifeAss2Age == null) {
      this.LifeAss2Age = 0;
    }
    if (this.LoanAmount == null) {
      this.LoanAmount = 0;
    }
    if (this.Term == null) {
      this.Term = 0;
    }
    if (this.FixedInterest == null) {
      this.FixedInterest = 0;
    }
    if (this.CompanyBufferId == null) {
      this.CompanyBufferId = 0;
    }
    if (this.CurrentAwplr == null) {
      this.CurrentAwplr = 0;
    }
    if (this.AdditionalToAwplr == null) {
      this.AdditionalToAwplr = 0;
    }
    if (this.TermOfFixederest == null) {
      this.TermOfFixederest = 0;
    }
    if (this.Discount == null) {
      this.Discount = 0;
    }
    if (this.Premium == null) {
      this.Premium = 0;
    }
    if (this.LoanTypeId == null) {
      this.LoanTypeId = 0;
    }

    let obj: IQuotation = {
      SeqId: 0,
      QuotationNo: '17MRP00001',
      RevisionNo: 0,
      LifeAss1Name: this.LifeAss1Name,
      LifeAss1Dob: new Date(this.LifeAss1Dob).toLocaleDateString("en-GB"),
      LifeAss1Age: this.LifeAss1Age,
      LifeAss1Gender: this.LifeAss1Gender,
      LifeAss1Nic: this.LifeAss1Nic,
      LifeAss2Name: this.LifeAss2Name,
      LifeAss2Dob: new Date(this.LifeAss2Dob).toLocaleDateString("en-GB"),
      LifeAss2Age: this.LifeAss2Age,
      LifeAss2Gender: this.LifeAss2Gender,
      LifeAss2Nic: this.LifeAss2Nic,
      LoanAmount: this.LoanAmount,
      Term: this.Term,
      FixedInterest: this.FixedInterest,
      CompanyBufferId: this.CompanyBufferId,
      CurrentAwplr: this.CurrentAwplr,
      AdditionalToAwplr: this.AdditionalToAwplr,
      TermOfFixederest: this.TermOfFixederest,
      Discount: 0,
      Premium: this.Premium,
      LoanTypeId: this.LoanTypeId,
      BranchCode: this.User.BranchCode,
      UserId: this.User.UserName,
      Status: COMMON_VALUES.QUOTATION_STATUS_INITIAL,
      RegisterDate: ''

    }

    console.log(obj);
    console.log(JSON.stringify(obj));
    this.quotationService.addQuotationDetails(obj).subscribe((data: any) => {

      this.isLoading = false;
    }),
      (err) => {
        // alert(err);
        console.log(err);

        this.isLoading = false;
      },
      () => console.log('done')


  }

  public Calculate() {

  }
  public PrintQuotation() {

  }
}
