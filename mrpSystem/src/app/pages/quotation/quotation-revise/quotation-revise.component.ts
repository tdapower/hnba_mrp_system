import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MomentModule } from 'angular2-moment';

import { Router } from '@angular/router';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService, ToastrConfig } from 'toastr-ng2';

import { CommonService } from '../../../shared/services/common/common.service';
import { QuotationService } from '../../../shared/services/quotation/quotation.service';
import { IHnbaBranch } from '../../../shared/models/hnbaBranch.model';
import { ILoanType } from '../../../shared/models/loanType.model';
import { ICompanyBuffer } from '../../../shared/models/companyBuffer.model';
import { IQuotation } from '../../../shared/models/quotation.model';
import { IQuotationCalculation } from '../../../shared/models/quotationCalculate.model';
import { INICExtractedData } from '../../../shared/models/nICExtractedData.model';

import { IQuotationEmailSend } from '../../../shared/models/quotationEmailSend.model';
import { IBank } from '../../../shared/models/bank.model';
import { IBankBranch } from '../../../shared/models/bankBranch.model';

import { IBusinessChannel } from '../../../shared/models/businessChannel.model';
import { IUser } from '../../../shared/models/user/user.model';
import { COMMON_VALUES } from '../../../shared/config/commonValues';
import { URL_CONST } from '../../../shared/config/url.constants';
declare var jQuery: any;
@Component({
  selector: 'app-quotation-revise',
  templateUrl: './quotation-revise.component.html',
  styleUrls: ['./quotation-revise.component.css']
})
export class QuotationReviseComponent implements OnInit, AfterViewInit {

  isLoading: boolean;


  mode: string;

  User: IUser;
  isUserBranchHDO: boolean = false;


  SeqId: number = 0;
  QuotationNo: string = '';
  BaseQuotationNo: string = '';
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
  FullTermOfLoanMonthly: number;
  FixedInterest: number;
  CompanyBufferId: number;
  CompanyBufferValue: string = '';
  CompanyBufferName: string = '';
  CurrentAwplr: number;
  AdditionalToAwplr: number;
  TermOfFixedInterest: number;
  Premium: number;
  PremiumWithPolicyFee: number;
  BankId: number;
  BankBranchId: number;
  BusinessChannelID: number;
  DiscountRate: number = 0;
  DiscountRemark: string = '';

  LoanTypeId: number;
  LoanTypeName: string = '';
  HnbaBranchCode: string = '';
  UserId: string = '';
  Status: string = '';
  RegisterDate: string = '';

  LifeAss1NameClass: string;
  LifeAss1DobClass: string;
  LifeAss1AgeClass: string;
  LifeAss1GenderClass: string;
  LifeAss1NicClass: string;
  LoanAmountClass: string;
  TermClass: string;
  FixedInterestClass: string;
  LoanTypeIdClass: string;
  BranchCodeClass: string;
  CompanyBufferClass: string;
  BusinessChannelClass: string;

  BankIdClass: string;
  BankBranchIdClass: string;

  DiscountRemarkClass: string;

  QuotationDocURL: any;

  isQuotationDetailsValid: boolean = false;

  isQuotationCalculated: boolean = false;

  isEditable: boolean = false;


  hnbaBranchList: Array<IHnbaBranch> = [];
  loanTypeList: Array<ILoanType> = [];
  companyBufferList: Array<ICompanyBuffer> = [];

  bankList: Array<IBank> = [];
  bankBranchList: Array<IBankBranch> = [];

  businessChannelList: Array<IBusinessChannel> = [];

  NIC1ExtractedData: INICExtractedData = null;
  NIC2ExtractedData: INICExtractedData = null;
  emailReceivers: string = '';

  datepickerOpts = {
    format: 'dd/mm/yyyy'
  }

  constructor(private quotationService: QuotationService,
    private commonService: CommonService, moment: MomentModule,
    private toastrService: ToastrService,
    toastrConfig: ToastrConfig,
    private activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer, private router: Router) {
    toastrConfig.timeOut = 10000;
    toastrConfig.closeButton = true;
    toastrConfig.tapToDismiss = true;


    this.SeqId = activatedRoute.snapshot.params['SeqId'];

    console.log('SeqId by view ' + this.SeqId);


    this.loadQuotationDetails();


    this.User = JSON.parse(localStorage.getItem('currentMRPUser'));


    if (this.User.BranchCode == 'HDO') {
      this.isUserBranchHDO = true;
    } else {
      this.isUserBranchHDO = false;
    }

    if (this.User.Password == COMMON_VALUES.COMMON_PWD) {
      this.router.navigate(['/', 'passwordChange']);
    }

  }

  ngOnInit() {

    this.getHnbaBranches();
    this.getLoanTypes();
    this.getCompanyBuffer();

    this.getBanks();

    this.getBusinessChannels();

    this.User = JSON.parse(localStorage.getItem('currentMRPUser'));


    if (this.User.BranchCode == 'HDO') {
      this.isUserBranchHDO = true;
    } else {
      this.isUserBranchHDO = false;
    }


  }

  ngAfterViewInit() {

  }



  showSuccess(message) {
    this.toastrService.success(message, 'Success!');
  }

  showError(message) {
    this.toastrService.error(message, 'Oops!');
  }

  showWarning(message) {
    this.toastrService.warning(message, 'Alert!');
  }

  showInfo(message) {
    this.toastrService.info(message);
  }



  clearValues() {
    this.SeqId = 0;
    this.QuotationNo = '';
    this.BaseQuotationNo = '';
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
    this.FullTermOfLoanMonthly = null;
    this.FixedInterest = null;
    this.CompanyBufferId = null;
    this.CurrentAwplr = null;
    this.AdditionalToAwplr = null;
    this.TermOfFixedInterest = null;
    this.DiscountRate = null;
    this.DiscountRemark = '';
    this.Premium = null;
    this.LoanTypeId = null;
    this.HnbaBranchCode = '';
    this.BankId = null;
    this.BankBranchId = null;
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
        (err) => {
          console.log(err);
          this.isLoading = false;
          this.showError("Error loading Hnba Branches");
        });
  }


  getLoanTypes() {
    this.isLoading = true;
    this.commonService.getLoanTypes()
      .subscribe((data) => {
        this.loanTypeList = data
        this.isLoading = false;
      },
        (err) => {
          console.log(err);

          this.isLoading = false;
          this.showError("Error loading Loan Types");

        });
  }

  getCompanyBuffer() {
    this.isLoading = true;
    this.commonService.getCompanyBuffer()
      .subscribe((data) => {
        this.companyBufferList = data
        this.isLoading = false;
      },
        (err) => {
          console.log(err);
          this.isLoading = false;
          this.showError("Error loading Company Buffer");

        });
  }

  getBanks() {
    this.isLoading = true;
    this.commonService.getBank()
      .subscribe((data) => {
        this.bankList = data
        this.isLoading = false;
      },
        (err) => {
          console.log(err);

          this.isLoading = false;
          this.showError("Error loading Banks");

        });
  }

  
  getBusinessChannels() {
    this.isLoading = true;
    this.commonService.getBusinessChannels()
      .subscribe((data) => {
        this.businessChannelList = data
        this.isLoading = false;
      },
        (err) => {
          console.log(err);

          this.isLoading = false;
          this.showError("Error loading Banks");

        });
  }


  onSelectOfBankId(bankId) {
    this.BankId = bankId;
    this.isLoading = true;
    this.commonService.getBankBranchByBankId(bankId)
      .subscribe((data) => {
        this.bankBranchList = data;

        this.isLoading = false;
      },
        (err) => {
          console.log(err);

          this.isLoading = false;
          this.showError("Error loading Bank Branches");

        });
  }

  // onSelectOfLoanType(loanType) {

  //   console.log('onchange');
  //   console.log(this.LoanTypeId);
  //   console.log(this.LoanTypeName);
  //   console.log(loanType);


  //   this.LoanTypeId = loanType.LoanTypeId;
  //   this.LoanTypeName = this.loanTypeList.filter(item => item.LoanTypeId == loanType)[0]['LoanTypeName'];

  // }


  // onSelectOfCompanyBuffer(companyBuffer) {
  //   this.CompanyBufferId = companyBuffer.ComapnyBufferId;
  //   this.CompanyBufferValue = this.companyBufferList.filter(item => item.CompanyBufferId == companyBuffer)[0]['CompanyBufferName'];

  // }








  public AddNewQuotation() {
    this.clearValues();
  }
  public SaveQuotation() {

    if (!this.isQuotationCalculated) {
      this.showWarning("Please calculate before saving quotation");
      return;
    }


    this.validateFields();
    console.log(this.isQuotationDetailsValid);
    if (this.isQuotationDetailsValid) {
      this.isLoading = true;

      if (this.LifeAss1Age == null) {
        this.LifeAss1Age = 0;
      }
      if (this.LifeAss2Age == null || isNaN(this.LifeAss2Age)) {
        this.LifeAss2Age = 0;
      }
      if (this.LoanAmount == null || isNaN(this.LoanAmount)) {
        this.LoanAmount = 0;
      }
      if (this.FullTermOfLoanMonthly == null || isNaN(this.FullTermOfLoanMonthly)) {
        this.FullTermOfLoanMonthly = 0;
      }
      if (this.FixedInterest == null) {
        this.FixedInterest = 0;
      }
      if (this.CompanyBufferId == null) {
        this.CompanyBufferId = 0;
      }
      if (this.CurrentAwplr == null || isNaN(this.CurrentAwplr)) {
        this.CurrentAwplr = 0;
      }
      if (this.AdditionalToAwplr == null || isNaN(this.AdditionalToAwplr)) {
        this.AdditionalToAwplr = 0;
      }
      if (this.TermOfFixedInterest == null || isNaN(this.TermOfFixedInterest)) {
        this.TermOfFixedInterest = 0;
      }
      if (this.DiscountRate == null || isNaN(this.DiscountRate)) {
        this.DiscountRate = 0;
      }

      if (this.LoanTypeId == null || isNaN(this.LoanTypeId)) {
        this.LoanTypeId = 0;
      }

      if (this.BusinessChannelID == null || isNaN(this.BusinessChannelID)) {
        this.BusinessChannelID = 0;
      }


      var moment = require('moment');

      var formatted_dob_life1 = moment(this.LifeAss1Dob).format('DD/MM/YYYY');
      var formatted_dob_life2;

      if (this.LifeAss2Dob == "") {
        formatted_dob_life2 = "01/01/1900";
      } else {
        formatted_dob_life2 = moment(this.LifeAss2Dob).format('DD/MM/YYYY');
      }




      let obj: IQuotation = {
        SeqId: 0,
        QuotationNo: this.QuotationNo,
        BaseQuotationNo: this.BaseQuotationNo,
        RevisionNo: this.RevisionNo,
        LifeAss1Name: this.LifeAss1Name,
        LifeAss1Dob: formatted_dob_life1,
        LifeAss1Age: this.LifeAss1Age,
        LifeAss1Gender: this.LifeAss1Gender,
        LifeAss1Nic: this.LifeAss1Nic,
        LifeAss2Name: this.LifeAss2Name,
        LifeAss2Dob: formatted_dob_life2,
        LifeAss2Age: this.LifeAss2Age,
        LifeAss2Gender: this.LifeAss2Gender,
        LifeAss2Nic: this.LifeAss2Nic,
        LoanAmount: this.LoanAmount,
        FullTermOfLoanMonthly: this.FullTermOfLoanMonthly,
        FixedInterest: this.FixedInterest,
        CompanyBufferId: this.CompanyBufferId,
        CurrentAwplr: this.CurrentAwplr,
        AdditionalToAwplr: this.AdditionalToAwplr,
        TermOfFixedInterest: this.TermOfFixedInterest,
        DiscountRate: this.DiscountRate,
        DiscountRemark: this.DiscountRemark,
        Premium: this.Premium,
        PremiumWithPolicyFee: this.PremiumWithPolicyFee,
        LoanTypeId: this.LoanTypeId,
        HnbaBranchCode: this.HnbaBranchCode,
        UserId: this.User.UserName,
        Status: COMMON_VALUES.QUOTATION_STATUS_REVISED,
        BankId: this.BankId,
        BankBranchId: this.BankBranchId,
        RegisterDate: '',
        BusinessChannelID:this.BusinessChannelID

      }

      console.log(obj);
      console.log(JSON.stringify(obj));
      this.quotationService.reviseQuotation(obj).subscribe((data: any) => {


        console.log('data 1 =' + data);
        if (data != "error") {

          this.SeqId = Number(data.toString().replace(/"/g, ''));

          console.log('data 2=' + data);

          console.log('this.SeqId =' + this.SeqId);

          this.showSuccess("Revised Quotation Successfully Saved.");


          this.router.navigate(['/', 'reviseQuote', this.SeqId]);


          this.isEditable = false;
          console.log(this.isEditable);


          this.generateQuotationDocument();


        }

        // if (data.status == 200) {
        //   this.showSuccess("Revised Quotation Successfully Saved.");
        //   this.isEditable = false;
        //   console.log(this.isEditable);


        //   this.generateQuotationDocument();

        // }
        this.isLoading = false;
      },
        (err) => {

          console.log(err);

          this.isLoading = false;
          this.showError("Error saving quotation");
        },
        () => console.log('done'));

    }



  }

  public generateQuotationDocument() {
    this.quotationService.getQuotationDocument(this.SeqId).subscribe((data: any) => {

    },
      (error) => {
        console.log("Error happened" + error);
      }
    );
  }

  public validateFields() {



    this.isQuotationDetailsValid = true;
    if (this.LifeAss1Name == "") {
      this.LifeAss1NameClass = "has-error";
      this.isQuotationDetailsValid = false;
    } else {
      this.LifeAss1NameClass = "form-group";
    }

    if (this.LifeAss1Dob == null) {
      this.LifeAss1DobClass = "has-error";
      this.isQuotationDetailsValid = false;
    } else {
      this.LifeAss1DobClass = "form-group";
    }

    if (this.LifeAss1Age == null || isNaN(this.LifeAss1Age)) {
      this.LifeAss1AgeClass = "has-error";
      this.isQuotationDetailsValid = false;
    } else {
      this.LifeAss1AgeClass = "form-group";
    }
    if (this.LifeAss1Age < 18) {
      this.LifeAss1AgeClass = "has-error";
      this.isQuotationDetailsValid = false;
    } else {
      this.LifeAss1AgeClass = "form-group";
    }
    if (this.LifeAss1Gender == null || this.LifeAss1Gender == "") {
      this.LifeAss1GenderClass = "has-error";
      this.isQuotationDetailsValid = false;
    } else {
      this.LifeAss1GenderClass = "form-group";
    }

    if (this.User.Company == "Life") {
      if (this.LifeAss1Nic == "") {
        this.LifeAss1NicClass = "has-error";
        this.isQuotationDetailsValid = false;
      } else {
        this.LifeAss1NicClass = "form-group";
      }
    }
    if (this.LoanAmount == null || isNaN(this.LoanAmount)) {
      this.LoanAmountClass = "has-error";
      this.isQuotationDetailsValid = false;
    } else {
      this.LoanAmountClass = "form-group";
    }

    if (this.FullTermOfLoanMonthly == null || isNaN(this.FullTermOfLoanMonthly)) {
      this.TermClass = "has-error";
      this.isQuotationDetailsValid = false;
    } else {
      this.TermClass = "form-group";
    }

    if (this.FixedInterest == null || isNaN(this.FixedInterest)) {
      this.FixedInterestClass = "has-error";
      this.isQuotationDetailsValid = false;
    } else {
      this.FixedInterestClass = "form-group";
    }

    if (this.LoanTypeId == null || isNaN(this.LoanTypeId)) {
      this.LoanTypeIdClass = "has-error";
      this.isQuotationDetailsValid = false;
    } else {
      this.LoanTypeIdClass = "form-group";
    }
    if (this.HnbaBranchCode == "") {
      this.BranchCodeClass = "has-error";
      this.isQuotationDetailsValid = false;
    } else {
      this.BranchCodeClass = "form-group";
    }
    if (this.CompanyBufferId == null || isNaN(this.CompanyBufferId)) {
      this.CompanyBufferClass = "has-error";
      this.isQuotationDetailsValid = false;
    } else {
      this.CompanyBufferClass = "form-group";
    }
    if (this.BankId == null || isNaN(this.BankId)) {
      this.BankIdClass = "has-error";
      this.isQuotationDetailsValid = false;
    } else {
      this.BankIdClass = "form-group";
    }
    if (this.BankBranchId == null || isNaN(this.BankBranchId)) {
      this.BankBranchIdClass = "has-error";
      this.isQuotationDetailsValid = false;
    } else {
      this.BankBranchIdClass = "form-group";
    }
    if (this.LifeAss2Name == null || this.LifeAss2Name == "") { //if life 2 name is missing, then dob is reset
      this.LifeAss2Dob = "01/01/1900";
    }

    if (this.DiscountRate > 0) {
      if (this.DiscountRemark == "") {
        this.DiscountRemarkClass = "has-error";
        this.isQuotationDetailsValid = false;


        this.showWarning("Remark for Discount is mandatory if discount is given");
      } else {
        this.DiscountRemarkClass = "form-group";
      }
    }
    console.log('validated');
  }

  public calculateLife1Age(life1Dob: Date) {
    if (life1Dob != null) {
      var moment = require('moment');
      //  this.LifeAss1Age = Math.round(this.commonService.Days360(this.LifeAss1Dob, moment()) / 360);
      this.LifeAss1Age = Math.round(this.commonService.CalculateAge(this.LifeAss1Dob, moment()));
    } else {
      this.LifeAss1Age = 0;
    }
  }

  public calculateLife2Age(life2Dob: Date) {
    if (life2Dob != null) {
      var moment = require('moment');
      // this.LifeAss2Age = Math.round(this.commonService.Days360(this.LifeAss2Dob, moment()) / 360);
      this.LifeAss2Age = Math.round(this.commonService.CalculateAge(this.LifeAss2Dob, moment()));
    } else {
      this.LifeAss2Age = 0;
    }
  }

  public Calculate() {


    this.validateFields();
    if (this.isQuotationDetailsValid) {
      this.isLoading = true;

      this.isQuotationCalculated = false;

      // if (this.BankId == COMMON_VALUES.HNB_BANK_CODE) {
      //   this.calculatePremiumWithOldCalculation();
      // } else {
      //   this.calculatePremiumWithNewCalculation();
      // }
      this.calculatePremiumWithNewCalculation();
    }
  }

  // public calculatePremiumWithOldCalculation() {
  //   this.LoanTypeName = this.loanTypeList.filter(item => item.LoanTypeId == this.LoanTypeId)[0]['LoanTypeName'];

  //   console.log('CompanyBufferId   ' + this.CompanyBufferId);

  //   if (this.CompanyBufferId > 0) {
  //     console.log('tttttttttt');

  //     this.CompanyBufferValue = this.companyBufferList.filter(item => item.CompanyBufferId == this.CompanyBufferId)[0]['CompanyBufferName'];
  //   }




  //   var moment = require('moment');


  //   if (this.LifeAss1Age == null) {
  //     this.LifeAss1Age = 0;
  //   }
  //   if (this.LifeAss2Age == null) {
  //     this.LifeAss2Age = 0;
  //   }
  //   if (this.LoanAmount == null) {
  //     this.LoanAmount = 0;
  //   }
  //   if (this.FullTermOfLoanMonthly == null) {
  //     this.FullTermOfLoanMonthly = 0;
  //   }
  //   if (this.FixedInterest == null) {
  //     this.FixedInterest = 0;
  //   }
  //   if (this.CompanyBufferId == null) {
  //     this.CompanyBufferId = 0;
  //   }
  //   if (this.CurrentAwplr == null) {
  //     this.CurrentAwplr = 0;
  //   }
  //   if (this.AdditionalToAwplr == null) {
  //     this.AdditionalToAwplr = 0;
  //   }
  //   if (this.TermOfFixedInterest == null) {
  //     this.TermOfFixedInterest = 0;
  //   }
  //   if (this.DiscountRate == null) {
  //     this.DiscountRate = 0;
  //   }

  //   if (this.LoanTypeId == null) {
  //     this.LoanTypeId = 0;
  //   }


  //   var formatted_dob_life1 = moment(this.LifeAss1Dob).format('YYYY/MM/DD');
  //   var formatted_dob_life2;

  //   if (this.LifeAss2Dob == "01/01/1900") {
  //     formatted_dob_life2 = "";
  //   } else {
  //     formatted_dob_life2 = moment(this.LifeAss2Dob).format('YYYY/MM/DD');
  //   }

  //   var formattedLifeAss2Gender;
  //   if (this.LifeAss2Gender == null || this.LifeAss2Gender == "") {
  //     formattedLifeAss2Gender = "N/A";
  //   } else {
  //     formattedLifeAss2Gender = this.LifeAss2Gender;
  //   }

  //   if (this.BusinessChannelID == null || isNaN(this.BusinessChannelID)) {
  //     this.BusinessChannelID = 0;
  //   }


  //   var FullTermOfLoanYearly = 0;
  //   FullTermOfLoanYearly = this.FullTermOfLoanMonthly / 12;

  //   var quotationCalcServiceLoanType = "";
  //   if (this.LoanTypeName == "MRP STD (Home Loans)") {
  //     quotationCalcServiceLoanType = "type1";
  //   } else if (this.LoanTypeName == "CAR/Education Loans") {
  //     quotationCalcServiceLoanType = "type2";
  //   }
  //   else if (this.LoanTypeName == "Business Loan") {
  //     quotationCalcServiceLoanType = "type3";
  //   }
  //   else if (this.LoanTypeName == "Personal Loan/Commercial Vehicle") {
  //     quotationCalcServiceLoanType = "type4";
  //   }


  //   var obj = {
  //     username: this.User.UserName,
  //     term: FullTermOfLoanYearly.toString(),
  //     loan_interest: this.FixedInterest.toString(),
  //     loan_amount: this.LoanAmount.toString(),
  //     grace_period: 0,
  //     dob_life1: formatted_dob_life1,
  //     dob_life2: formatted_dob_life2,
  //     loan_type: quotationCalcServiceLoanType,
  //     gender_life1: this.LifeAss1Gender,
  //     gender_life2: formattedLifeAss2Gender,
  //     Company_Buffer: this.CompanyBufferId,
  //     Current_AWPLR: this.CurrentAwplr.toString(),
  //     Addition_to_AWPLR: this.AdditionalToAwplr.toString(),
  //     life1_discount: 0,
  //     life2_discount: 0,
  //     basic_healthExtraPecentage_life1: 0,
  //     basic_healthExtraPecentage_life2: 0,
  //     tpd_healthExtraPecentage_life1: 0,
  //     tpd_healthExtraPecentage_life2: 0,
  //     basic_healthExtraPermile_life1: 0,
  //     basic_healthExtraPermile_life2: 0,
  //     tpd_healthExtraPermile_life1: 0,
  //     tpd_healthExtraPermile_life2: 0,
  //     term_fixed_interest: this.TermOfFixedInterest

  //   };


  //   //   console.log(obj);
  //   //  console.log(JSON.stringify(obj));

  //   var data = obj;
  //   var keyValPairString = "?";
  //   for (var key in data) {
  //     //   console.log(key + ' : ' + data[key]);
  //     keyValPairString = keyValPairString + key + '=' + data[key] + '&';
  //     // alert(key + ' --> ' + data[key]);
  //   }

  //   keyValPairString = keyValPairString.slice(0, -1);
  //   this.quotationService.calculateQuotation(keyValPairString).subscribe((data: any) => {
  //     if (data.data.premium != 'N/A') {


  //       this.isQuotationCalculated = true;
  //       this.Premium = data.data.premium;
  //       this.PremiumWithPolicyFee = data.data.premium_with_policy_fee;

  //       if (this.DiscountRate > 0) {

  //         var premiumWithDiscount = 0;
  //         premiumWithDiscount = Math.ceil(Number(data.data.premium.toString().replace(/,/g, '')) * ((100 - this.DiscountRate) / 100));


  //         this.Premium = premiumWithDiscount;
  //         this.PremiumWithPolicyFee = premiumWithDiscount + COMMON_VALUES.POLICY_FEE;

  //       }
  //     } else {
  //       this.Premium = 0.00;
  //       this.PremiumWithPolicyFee = 0.00;

  //     }
  //     this.isLoading = false;

  //     this.showInfo("Premium: " + this.PremiumWithPolicyFee);

  //   },
  //     (err) => {

  //       this.isLoading = false;
  //       this.showError("Error calculating premium");
  //     },
  //     () => console.log('done')
  //   );
  // }


  public calculatePremiumWithNewCalculation() {
    var moment = require('moment');



    this.LoanTypeName = this.loanTypeList.filter(item => item.LoanTypeId == this.LoanTypeId)[0]['LoanTypeName'];


    if (this.CompanyBufferId > 0) {
      this.CompanyBufferValue = this.companyBufferList.filter(item => item.CompanyBufferId == this.CompanyBufferId)[0]['CompanyBufferName'];
    } else {
      this.CompanyBufferValue = "0";
    }


    if (this.LifeAss1Age == null) {
      this.LifeAss1Age = 0;
    }
    if (this.LifeAss2Age == null) {
      this.LifeAss2Age = 0;
    }
    if (this.LoanAmount == null) {
      this.LoanAmount = 0;
    }
    if (this.FullTermOfLoanMonthly == null) {
      this.FullTermOfLoanMonthly = 0;
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
    if (this.TermOfFixedInterest == null) {
      this.TermOfFixedInterest = 0;
    }
    if (this.DiscountRate == null) {
      this.DiscountRate = 0;
    }

    if (this.LoanTypeId == null) {
      this.LoanTypeId = 0;
    }

    var formatted_dob_life1 = moment(this.LifeAss1Dob).format('YYYY/MM/DD');
    var formatted_dob_life2;

    if (this.LifeAss2Dob == "01/01/1900") {
      formatted_dob_life2 = "";
    } else {
      formatted_dob_life2 = moment(this.LifeAss2Dob).format('YYYY/MM/DD');
    }

    var formattedLifeAss2Gender;
    if (this.LifeAss2Gender == null || this.LifeAss2Gender == "") {
      formattedLifeAss2Gender = "";
    } else {
      formattedLifeAss2Gender = this.LifeAss2Gender;
    }

    // var FullTermOfLoanYearly = 0;
    // FullTermOfLoanYearly = this.FullTermOfLoanMonthly / 12;

    if (this.BusinessChannelID == null || isNaN(this.BusinessChannelID)) {
      this.BusinessChannelID = 0;
    }


    var obj = {

      Term: this.FullTermOfLoanMonthly,
      FixedInterestTerm: this.TermOfFixedInterest,
      CommencementDate: moment().format('YYYY/MM/DD'),
      DOBL1: formatted_dob_life1,
      DOBL2: formatted_dob_life2,
      Currency: "LKR",
      ExchangeRate: 1,
      LoanAmount: this.LoanAmount.toString(),
      FixedInterest: this.FixedInterest.toString(),
      AWPLR: this.CurrentAwplr.toString(),
      AdditionToAWPLR: this.AdditionalToAwplr.toString(),
      CompanyBuffer: this.CompanyBufferValue,
      GracePeriod: 0,
      LoanType: this.LoanTypeName,
      GenderL1: this.LifeAss1Gender,
      GenderL2: formattedLifeAss2Gender,
      TPDDeclineL1: "N",
      TPDDeclineL2: "N",
      RIComapny: COMMON_VALUES.DEFAULT_RI_COMPANY,
      IncludeSV: "Yes",
      ExpenseAssumption: "Normal",
      HealthExtraDeathL1: 0,
      HealthExtraDeathL2: 0,
      HealthExtraTPDL1: 0,
      HealthExtraTPDL2: 0,
      OccupationExtraDeathL1: 0,
      OccupationExtraDeathL2: 0,
      OccupationExtraTPDL1: 0,
      OccupationExtraTPDL2: 0,
      OtherLoadingDeathL1: 0,
      OtherLoadingDeathL2: 0,
      OtherLoadingTPDL1: 0,
      OtherLoadingTPDL2: 0,
      RILoadDeathL1: 0,
      RILoadDeathL2: 0,
      RILoadTPDL1: 0,
      RILoadTPDL2: 0
    };
    console.log(obj);
    console.log("------------------");

    console.log(JSON.stringify(obj));


    this.quotationService.calculateQuotationUsingNewCalculation(obj).subscribe((data: any) => {
      console.log(data.toString().replace(/"/g, ''));

      this.isQuotationCalculated = true;

      this.Premium = data.toString().replace(/"/g, '');
      this.PremiumWithPolicyFee = Number(this.Premium) + Number(COMMON_VALUES.POLICY_FEE);


      if (this.DiscountRate > 0) {

        var premiumWithDiscount = 0;
        premiumWithDiscount = Math.ceil(Number(this.Premium.toString().replace(/,/g, '')) * ((100 - this.DiscountRate) / 100));


        this.Premium = premiumWithDiscount;
        this.PremiumWithPolicyFee = premiumWithDiscount + COMMON_VALUES.POLICY_FEE;

      }

      this.isLoading = false;


      this.showInfo("Premium: " + this.PremiumWithPolicyFee);
    },
      (err) => {

        this.isLoading = false;
        this.showError("Error calculating premium");
      },
      () => console.log('done')
    );



  }

  public ViewQuotation() {
    let url: any;
    url = URL_CONST.URL_PREFIX + 'api/Quotation/GetQuotationDocument/' + this.SeqId;
    console.log('url ---' + url);

    this.QuotationDocURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    document.getElementById("openQuotationModalButton").click();

  }



  loadQuotationDetails() {


    this.User = JSON.parse(localStorage.getItem('currentMRPUser'));

    console.log('this.isUserBranchHDO ' + this.isUserBranchHDO);

    if (this.User.BranchCode == 'HDO') {
      this.isUserBranchHDO = true;
    } else {
      this.isUserBranchHDO = false;
    }

    console.log('this.isUserBranchHDO ' + this.isUserBranchHDO);

    this.isLoading = true;

    this.quotationService.getQuotationBySeqId(this.SeqId)
      .subscribe((data) => {
        this.isLoading = false;


        let obj: IQuotation = JSON.parse(data);


        this.SeqId = obj.SeqId;
        this.QuotationNo = obj.QuotationNo;
        this.BaseQuotationNo = obj.BaseQuotationNo;
        this.RevisionNo = obj.RevisionNo;
        this.LifeAss1Name = obj.LifeAss1Name;

        var moment = require('moment');
        var momentDateLife1Dob = moment(obj.LifeAss1Dob.substr(0, 10), 'DD/MM/YYYY').toDate();

        this.LifeAss1Dob = momentDateLife1Dob;
        this.LifeAss1Age = obj.LifeAss1Age;
        this.LifeAss1Gender = obj.LifeAss1Gender;
        this.LifeAss1Nic = obj.LifeAss1Nic;
        this.LifeAss2Name = obj.LifeAss2Name;

        var moment = require('moment');
        // var momentDateLife2Dob = moment(obj.LifeAss2Dob.substr(0, 10), 'DD/MM/YYYY').toDate();

        // if (momentDateLife2Dob == "01/01/1900") {
        //   momentDateLife2Dob = "";
        // } 


        var momentDateLife2Dob;
        if (obj.LifeAss2Dob.substr(0, 10) == "01/01/1900") {
          momentDateLife2Dob = "";
        } else {
          momentDateLife2Dob = moment(obj.LifeAss2Dob.substr(0, 10), 'DD/MM/YYYY').toDate();
        }

        this.LifeAss2Dob = momentDateLife2Dob;
        this.LifeAss2Age = obj.LifeAss2Age;
        this.LifeAss2Gender = obj.LifeAss2Gender;
        this.LifeAss2Nic = obj.LifeAss2Nic;
        this.LoanAmount = obj.LoanAmount;
        this.FullTermOfLoanMonthly = obj.FullTermOfLoanMonthly;
        this.FixedInterest = obj.FixedInterest;
        this.CompanyBufferId = obj.CompanyBufferId;
        this.CurrentAwplr = obj.CurrentAwplr;
        this.AdditionalToAwplr = obj.AdditionalToAwplr;
        this.TermOfFixedInterest = obj.TermOfFixedInterest;
        this.DiscountRate = obj.DiscountRate;
        this.DiscountRemark = obj.DiscountRemark;
        this.Premium = obj.Premium;
        this.PremiumWithPolicyFee = obj.PremiumWithPolicyFee;
        this.LoanTypeId = obj.LoanTypeId;
        this.HnbaBranchCode = obj.HnbaBranchCode;
        this.BankId = obj.BankId;
        this.onSelectOfBankId(this.BankId);
        this.BankBranchId = obj.BankBranchId;

        this.UserId = obj.UserId;
        this.Status = obj.Status;
        this.RegisterDate = obj.RegisterDate;
        this.BusinessChannelID=obj.BusinessChannelID;


        console.log(this.LifeAss1Dob);



        this.generateQuotationDocument();
      },
        (err) => {

          console.log(err);
          this.isLoading = false;

        });

  }


  public ReviseQuotation() {
    //chck is this quotation is revised here
    this.isLoading = true;

    this.quotationService.getMaxRevisionNo(this.BaseQuotationNo)
      .subscribe((data) => {
        this.isLoading = false;

        if (data.toString().replace(/"/g, '') == this.RevisionNo.toString()) {

          this.RevisionNo = this.RevisionNo + 1;

          this.QuotationNo = this.BaseQuotationNo + 'R' + this.zeroPad(this.RevisionNo, 2);

          this.isEditable = true;
        } else {
          this.showWarning("This quotation is revised and this is not the latest revision.");

        }


      },
        (err) => {
          console.log(err);
          this.isLoading = false;
        }
      );



  }

  public ExtractDataFromNIC1() {
    if (this.LifeAss1Nic != "" && this.LifeAss1Nic != null) {


      this.NIC1ExtractedData = this.commonService.extractDataFromNIC(this.LifeAss1Nic);
      var moment = require('moment');
      var momentDateLife1Dob = moment(this.NIC1ExtractedData.DOB.substr(0, 10), 'DD/MM/YYYY').toDate();

      this.LifeAss1Dob = momentDateLife1Dob;
      this.LifeAss1Gender = this.NIC1ExtractedData.Gender;
      //this.LifeAss1Age = Math.round(this.commonService.Days360(this.LifeAss1Dob, moment()) / 360);

      this.LifeAss1Age = Math.round(this.commonService.CalculateAge(this.LifeAss1Dob, moment()));

    }
  }

  public ExtractDataFromNIC2() {

    if (this.LifeAss2Nic != "" && this.LifeAss2Nic != null) {



      this.NIC2ExtractedData = this.commonService.extractDataFromNIC(this.LifeAss2Nic);
      var moment = require('moment');
      var momentDateLife2Dob = moment(this.NIC2ExtractedData.DOB.substr(0, 10), 'DD/MM/YYYY').toDate();

      this.LifeAss2Dob = momentDateLife2Dob;
      this.LifeAss2Gender = this.NIC2ExtractedData.Gender;
      // this.LifeAss2Age = Math.round(this.commonService.Days360(this.LifeAss2Dob, moment()) / 360);
      this.LifeAss2Age = Math.round(this.commonService.CalculateAge(this.LifeAss2Dob, moment()));

    }
  }

  public zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }



  public SendMail() {
    console.log('rrrr');
    console.log('seeee ' + this.SeqId);



    let obj: IQuotationEmailSend = {
      SenderUserCode: this.User.UserName,
      SeqId: this.SeqId,
      EmailAddresses: this.emailReceivers

    }

    if (this.emailReceivers != '') {

      this.isLoading = true;

      this.quotationService.sendQuotationAsEmail(obj).subscribe((data: any) => {
        console.log(data);


        if (data.status == 200) {
          this.showSuccess("Quotation Successfully E-mailed. ");
        }
        this.isLoading = false;
      },
        (err) => {
          console.log(err);

          this.isLoading = false;
          this.showError("Error sending quotation");
        },
        () => console.log('done'));
    } else {

      this.showWarning("Enter customer e-mail address");
    }




  }


}
