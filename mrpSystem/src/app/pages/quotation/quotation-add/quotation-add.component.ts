import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MomentModule } from 'angular2-moment';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService, ToastrConfig } from 'toastr-ng2';

import { CommonService } from '../../../shared/services/common/common.service';
import { QuotationService } from '../../../shared/services/quotation/quotation.service';
import { IHnbaBranch } from '../../../shared/models/hnbaBranch.model';
import { ILoanType } from '../../../shared/models/loanType.model';
import { ICompanyBuffer } from '../../../shared/models/companyBuffer.model';
import { IQuotation } from '../../../shared/models/quotation.model';
import { IQuotationCalculation } from '../../../shared/models/quotationCalculate.model';

import { IBank } from '../../../shared/models/bank.model';
import { IBankBranch } from '../../../shared/models/bankBranch.model';

import { IUser } from '../../../shared/models/user/user.model';
import { COMMON_VALUES } from '../../../shared/config/commonValues';

import { URL_CONST } from '../../../shared/config/url.constants';
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
  CurrentAwplr: number;
  AdditionalToAwplr: number;
  TermOfFixedInterest: number;
  Discount: number;
  Premium: number;
  PremiumWithPolicyFee: number;
  BankId: number;
  BankBranchId: number;

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
  BankIdClass: string;
  BankBranchIdClass: string;

  QuotationDocURL: any;

  isQuotationDetailsValid: boolean = false;

  hnbaBranchList: Array<IHnbaBranch> = [];
  loanTypeList: Array<ILoanType> = [];
  companyBufferList: Array<ICompanyBuffer> = [];

  bankList: Array<IBank> = [];
  bankBranchList: Array<IBankBranch> = [];


  datepickerOpts = {
    format: 'dd/mm/yyyy'
  }

  constructor(private quotationService: QuotationService,
    private commonService: CommonService, moment: MomentModule,
    private toastrService: ToastrService,
    toastrConfig: ToastrConfig,
    public sanitizer: DomSanitizer) {
    toastrConfig.timeOut = 10000;
    toastrConfig.closeButton = true;
    toastrConfig.tapToDismiss = true;


  }

  ngOnInit() {

    this.getHnbaBranches();
    this.getLoanTypes();
    this.getCompanyBuffer();

    this.getBanks();

    this.User = JSON.parse(localStorage.getItem('currentMRPUser'));
    this.mode = "new";
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
    this.LifeAss1Dob ='';
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
    this.Discount = null;
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
    console.log(this.mode);

    if (this.mode == "new") {
      this.saveNewQuotation();
    } else if (this.mode == "saved") {
      this.updateQuotation();
    }


  }


  public saveNewQuotation() {
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
      if (this.Discount == null || isNaN(this.Discount)) {
        this.Discount = 0;
      }

      if (this.LoanTypeId == null || isNaN(this.LoanTypeId)) {
        this.LoanTypeId = 0;
      }

      var moment = require('moment');

      var formatted_dob_life1 = moment(this.LifeAss1Dob).format('DD/MM/YYYY');
      var formatted_dob_life2 = moment(this.LifeAss2Dob).format('DD/MM/YYYY');


      let obj: IQuotation = {
        SeqId: 0,
        QuotationNo: '',
        BaseQuotationNo: '',
        RevisionNo: 0,
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
        Discount: 0,
        Premium: this.Premium,
        PremiumWithPolicyFee: this.PremiumWithPolicyFee,
        LoanTypeId: this.LoanTypeId,
        HnbaBranchCode: this.HnbaBranchCode,
        UserId: this.User.UserName,
        Status: COMMON_VALUES.QUOTATION_STATUS_INITIAL,
        BankId: this.BankId,
        BankBranchId: this.BankBranchId,
        RegisterDate: ''

      }

      console.log(obj);
      // console.log(JSON.stringify(obj));
      this.quotationService.addQuotationDetails(obj).subscribe((data: any) => {
        // console.log('bbbbb  ' + data.toString().replace(/"/g, ''));
        // console.log('bbbbbttttt  ' + data.text().toString().replace(/"/g, ''));
        this.isLoading = false;

        if (data == "error") {
          this.showError("Error saving quotation");

        } else {
          this.SeqId = data.toString().replace(/"/g, '');
          this.showSuccess("Quotation Successfully Saved.");

          this.mode = "saved";



          this.quotationService.getQuotationNoBySeqId(this.SeqId).subscribe((data: any) => {
            if (data != "error") {
              this.QuotationNo = data.toString().replace(/"/g, '');
            }
          },
            (err) => {

              console.log(err);

              // this.showError("Error saving quotation");
            },
            () => console.log('done'));


          this.generateQuotationDocument();
        }


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


  public generateQuotationDocument() {
    this.quotationService.getQuotationDocument(this.SeqId).subscribe((data: any) => {

    },
      (error) => {
        console.log("Error happened" + error);
      }
    );
  }
  public updateQuotation() {
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
      if (this.Discount == null || isNaN(this.Discount)) {
        this.Discount = 0;
      }
      if (this.LoanTypeId == null || isNaN(this.LoanTypeId)) {
        this.LoanTypeId = 0;
      }

      var moment = require('moment');

      var formatted_dob_life1 = moment(this.LifeAss1Dob).format('DD/MM/YYYY');
      var formatted_dob_life2 = moment(this.LifeAss2Dob).format('DD/MM/YYYY');

      let obj: IQuotation = {
        SeqId: this.SeqId,
        QuotationNo: this.QuotationNo,
        BaseQuotationNo: this.QuotationNo,
        RevisionNo: 0,
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
        Discount: 0,
        Premium: this.Premium,
        PremiumWithPolicyFee: this.PremiumWithPolicyFee,
        LoanTypeId: this.LoanTypeId,
        HnbaBranchCode: this.HnbaBranchCode,
        UserId: this.User.UserName,
        Status: COMMON_VALUES.QUOTATION_STATUS_INITIAL,
        BankId: this.BankId,
        BankBranchId: this.BankBranchId,
        RegisterDate: ''

      }

      console.log(obj);
      console.log(JSON.stringify(obj));
      this.quotationService.updateQuotationDetails(obj).subscribe((data: any) => {
        console.log(data);


        if (data.status == 200) {
          this.showSuccess("Quotation Successfully Updated. ");

          this.mode = "saved";

        }
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
      this.LifeAss2Dob = "01/01/1900" ;
    }

    console.log('validated');
  }

  public calculateLife1Age(life1Dob: Date) {


    var moment = require('moment');
    this.LifeAss1Age = moment().diff(moment(life1Dob, 'DD/MM/YYYY'), 'years');
  }

  public calculateLife2Age(life2Dob: Date) {

    var moment = require('moment');
    this.LifeAss2Age = moment().diff(moment(life2Dob, 'DD/MM/YYYY'), 'years');
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
      if (this.Discount == null) {
        this.Discount = 0;
      }

      if (this.LoanTypeId == null) {
        this.LoanTypeId = 0;
      }


      var formatted_dob_life1 = moment(this.LifeAss1Dob).format('YYYY/MM/DD');
      var formatted_dob_life2;
     
      if (this.LifeAss2Dob == "01/01/1900") {
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
        term: this.FullTermOfLoanMonthly.toString(),
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


      keyValPairString = keyValPairString.slice(0, -1);

      //console.log('http://mobileapps.hnbassurance.com/quotation_calculation/webservice/mrptest.php' + keyValPairString);
      //  console.log(keyValPairString);
      this.quotationService.calculateQuotation(keyValPairString).subscribe((data: any) => {
        console.log(data);
        console.log('Premium = ' + data.data.premium);


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




  public ViewQuotation() {
    let url: any;
    url = URL_CONST.URL_PREFIX + 'api/Quotation/GetQuotationDocument/' + this.SeqId;
    console.log('url ---' + url);

    this.QuotationDocURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    document.getElementById("openQuotationModalButton").click();

  }
}
