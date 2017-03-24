import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MomentModule } from 'angular2-moment';

import { ToastrService, ToastrConfig } from 'toastr-ng2';

import { CommonService } from '../../../shared/services/common/common.service';
import { QuotationService } from '../../../shared/services/quotation/quotation.service';
import { IHnbaBranch } from '../../../shared/models/hnbaBranch.model';
import { ILoanType } from '../../../shared/models/loanType.model';
import { ICompanyBuffer } from '../../../shared/models/companyBuffer.model';
import { IQuotation } from '../../../shared/models/quotation.model';
import { IQuotationCalculation } from '../../../shared/models/quotationCalculate.model';

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
  CompanyBufferValue: string = '';
  CurrentAwplr: number;
  AdditionalToAwplr: number;
  TermOfFixederest: number;
  Discount: number;
  Premium: number;
  PremiumWithPolicyFee: number;

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


  isQuotationDetailsValid: boolean = false;

  hnbaBranchList: Array<IHnbaBranch> = [];
  loanTypeList: Array<ILoanType> = [];
  companyBufferList: Array<ICompanyBuffer> = [];


  constructor(private quotationService: QuotationService,
    private commonService: CommonService, moment: MomentModule,
    private toastrService: ToastrService,
    toastrConfig: ToastrConfig) {
    toastrConfig.timeOut = 0;
    toastrConfig.closeButton = true;
    toastrConfig.tapToDismiss = true;
  }

  ngOnInit() {

    this.getHnbaBranches();
    this.getLoanTypes();
    this.getCompanyBuffer();

    this.User = JSON.parse(localStorage.getItem('currentMRPUser'));


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
    this.HnbaBranchCode = '';
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
      if (this.LoanAmount == null || isNaN(this.LifeAss2Age)) {
        this.LoanAmount = 0;
      }
      if (this.Term == null || isNaN(this.LifeAss2Age)) {
        this.Term = 0;
      }
      if (this.FixedInterest == null) {
        this.FixedInterest = 0;
      }
      if (this.CompanyBufferId == null) {
        this.CompanyBufferId = 0;
      }
      if (this.CurrentAwplr == null || isNaN(this.LifeAss2Age)) {
        this.CurrentAwplr = 0;
      }
      if (this.AdditionalToAwplr == null || isNaN(this.LifeAss2Age)) {
        this.AdditionalToAwplr = 0;
      }
      if (this.TermOfFixederest == null || isNaN(this.LifeAss2Age)) {
        this.TermOfFixederest = 0;
      }
      if (this.Discount == null || isNaN(this.LifeAss2Age)) {
        this.Discount = 0;
      }
      if (this.Premium == null || isNaN(this.LifeAss2Age)) {
        this.Premium = 0;
      }
      if (this.LoanTypeId == null || isNaN(this.LifeAss2Age)) {
        this.LoanTypeId = 0;
      }

      let obj: IQuotation = {
        SeqId: 0,
        QuotationNo: '',
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
        HnbaBranchCode: this.HnbaBranchCode,
        UserId: this.User.UserName,
        Status: COMMON_VALUES.QUOTATION_STATUS_INITIAL,
        RegisterDate: ''

      }

      console.log(obj);
      console.log(JSON.stringify(obj));
      this.quotationService.addQuotationDetails(obj).subscribe((data: any) => {
        console.log(data);
        this.showSuccess("Quotation Successfully Saved. Quotation Number - " + data);
        this.isLoading = false;
      },
        (err) => {
          // alert(err);
          console.log(err);

          this.isLoading = false;
          this.showError("Error saving quotation");
        },
        () => console.log('done'));

    }



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

    if (this.LifeAss1Nic == "") {
      this.LifeAss1NicClass = "has-error";
      this.isQuotationDetailsValid = false;
    } else {
      this.LifeAss1NicClass = "form-group";
    }

    if (this.LoanAmount == null || isNaN(this.LoanAmount)) {
      this.LoanAmountClass = "has-error";
      this.isQuotationDetailsValid = false;
    } else {
      this.LoanAmountClass = "form-group";
    }

    if (this.Term == null || isNaN(this.Term)) {
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

    console.log('validated');
  }

  public calculateLife1Age(life1Dob: Date) {

    var moment = require('moment');
    this.LifeAss1Age = moment().diff(moment(life1Dob, 'DD/DD/YYYY'), 'years');
  }

  public calculateLife2Age(life2Dob: Date) {

    var moment = require('moment');
    this.LifeAss2Age = moment().diff(moment(life2Dob, 'DD/DD/YYYY'), 'years');
  }

  public Calculate() {


    this.validateFields();
    if (this.isQuotationDetailsValid) {
      this.isLoading = true;
      this.LoanTypeName = this.loanTypeList.filter(item => item.LoanTypeId == this.LoanTypeId)[0]['LoanTypeName'];

      this.CompanyBufferValue = this.companyBufferList.filter(item => item.CompanyBufferId == this.CompanyBufferId)[0]['CompanyBufferName'];




      var moment = require('moment');


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


      var formatted_dob_life1 = moment(this.LifeAss1Dob).format('YYYY/MM/DD');
      var formatted_dob_life2;

      if (this.LifeAss2Dob == null) {
        formatted_dob_life2 = "N/A";
      } else {
        formatted_dob_life2 = moment(this.LifeAss2Dob).format('YYYY/MM/DD');
      }

      var formattedLifeAss2Gender;
      if (this.LifeAss2Gender == null) {
        formattedLifeAss2Gender = "N/A";
      }



      var obj = {
        username: this.User.UserName,
        term: this.Term.toString(),
        loan_interest: this.FixedInterest.toString(),
        loan_amount: this.LoanAmount.toString(),
        grace_period: 0,
        dob_life1: formatted_dob_life1,
        dob_life2: formatted_dob_life2,
        loan_type: this.LoanTypeName,
        gender_life1: this.LifeAss1Gender,
        gender_life2: formattedLifeAss2Gender,
        Company_Buffer: this.CompanyBufferId,
        Current_AWPLR: this.CurrentAwplr.toString(),
        Addition_to_AWPLR: this.AdditionalToAwplr.toString(),
        life1_discount: 0,
        life2_discount: 0,
        basic_healthExtraPecentage_life1: 0,
        basic_healthExtraPecentage_life2: 0,
        tpd_healthExtraPecentage_life1: 0,
        tpd_healthExtraPecentage_life2: 0,
        basic_healthExtraPermile_life1: 0,
        basic_healthExtraPermile_life2: 0,
        tpd_healthExtraPermile_life1: 0,
        tpd_healthExtraPermile_life2: 0,
        term_fixed_interest: 0

      };


      //   console.log(obj);
      //  console.log(JSON.stringify(obj));

      var data = obj;
      var keyValPairString = "?";
      for (var key in data) {
        //   console.log(key + ' : ' + data[key]);
        keyValPairString = keyValPairString + key + '=' + data[key] + '&';
        // alert(key + ' --> ' + data[key]);
      }
      //console.log('http://mobileapps.hnbassurance.com/quotation_calculation/webservice/mrptest.php' + keyValPairString);
      //  console.log(keyValPairString);
      this.quotationService.calculateQuotation(keyValPairString).subscribe((data: any) => {
        console.log(data);
        //  console.log('Premium = ' + data.data.premium);


        this.Premium = data.data.premium;
        this.PremiumWithPolicyFee = data.data.premium_with_policy_fee;


        this.isLoading = false;


      },
        (err) => {

          this.isLoading = false;
          this.showError("Error calculating premium");
        },
        () => console.log('done')
      );
    }
  }
  public PrintQuotation() {
    this.isLoading = true;
    console.log('is loading- ' + this.isLoading);

    this.quotationService.getQuotationDocument(123).subscribe(




      (response) => {
        console.log("Success Response" + response);
        console.log('came here 1');
        console.log('status - ' + response);



        this.isLoading = false;
        this.showError("Successfully loaded");

      },
      (error) => {
        console.log("Error happened" + error);

        this.isLoading = false;
        this.showSuccess("Error loading quotation document");
      },
      () => {
        console.log("the subscription is completed");
        this.isLoading = false;
      }
    );


  }
}
