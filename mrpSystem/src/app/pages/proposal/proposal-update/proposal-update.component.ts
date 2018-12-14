import { Component, OnInit } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { ToastrService, ToastrConfig } from 'toastr-ng2';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonService } from '../../../shared/services/common/common.service';

import { URL_CONST } from '../../../shared/config/url.constants';
import { AssureService } from '../../../shared/services/assure/assure.service';
import { QuotationService } from '../../../shared/services/quotation/quotation.service';

import { INationality } from '../../../shared/models/nationality.model';
import { IBank } from '../../../shared/models/bank.model';
import { IBankBranch } from '../../../shared/models/bankBranch.model';
import { IProposalStatus } from '../../../shared/models/proposalStatus.model';
import { ILoanType } from '../../../shared/models/loanType.model';
import { IMedicalType } from '../../../shared/models/medicalType.model';
import { IAssureDetail } from '../../../shared/models/assureDetail.model';




import { IHnbaBranch } from '../../../shared/models/hnbaBranch.model';
import { ICurrency } from '../../../shared/models/currency.model';
import { IReInsuranceCompany } from '../../../shared/models/reInsuranceCompany.model';
import { IBroker } from '../../../shared/models/broker.model';
import { IChannel } from '../../../shared/models/channel.model';
import { ITPDOption } from '../../../shared/models/tpdOption.model';


import { IMain } from '../../../shared/models/main.model';

import { IUploadedDocView } from '../../../shared/models/uploadDocView.model';



import { IMrpPolicyInfoSave } from '../../../shared/models/mrpPolicyInfoSave.model';
import { IMrpCustomerInfoSave } from '../../../shared/models/mrpCustomerInfoSave.model';
import { IMrpProposalRegSave } from '../../../shared/models/mrpProposalRegSave.model';

import { ICompanyBuffer } from '../../../shared/models/companyBuffer.model';
import { ActivatedRoute } from '@angular/router';


import { IUser } from '../../../shared/models/user/user.model';
import { COMMON_VALUES } from '../../../shared/config/commonValues';
import { ProposalRegisterService } from '../../../shared/services/proposal-register/proposal-register.service';



@Component({
  selector: 'app-proposal-update',
  templateUrl: './proposal-update.component.html',
  styleUrls: ['./proposal-update.component.css']
})
export class ProposalUpdateComponent implements OnInit {


  isLoading: boolean;

  User: IUser;

  SeqId: number = 0;
  JobNo: string = '';
  QuotationNo: string = '';
  RevisionNo: number = 0;
  ProposalNo: string = '';
  MedicalType: string = '';
  PolicyNo: string = '';
  LoanAmount: number = 0;
  Interest: number = 0;
  Term: number = 0;
  FullTermInMonths: number = 0;
  GracePeriod: number = 0;
  CompanyBufferId: number = 0;
  CompanyBufferValue: string = '';
  CurrentAwplr: number = 0;
  AdditionToAwplr: number = 0;
  TermOfFixedInterest: number = 0;
  BankId: number = 0;
  BranchId: number = 0;

  BankCode: string = '';
  CurrencyId: number = 0;
  InterestRateType: string = '';
  HnbaBranchCode: string = '';
  BrokerCode: number = 0;
  ChannelCode: number = 0;
  IsReInsurance: boolean = false;
  LoanTypeId: number = 0;
  LoanTypeName: string = '';
  ReInsCompanyId: number = 0;
  ExchangeRate: number = 0;
  DateOfCommence: string = '';
  DateOfProposal: string = '';
  Premium: number = 0;
  PremiumWithPolicyFee: number = 0;
  Status: string = '';
  UserId: string = '';
  ProposalSendingMethod: string = '';
  RegisterDate: string = '';


  Life1SeqId: number = 0;
  Life1MainSeqId: number = 0;
  Life1AssureType: string = COMMON_VALUES.LIFE_ASSURE_TYPE_1;
  Life1Name: string = '';
  Life1Dob: string = '';
  Life1Age: number = 0;
  Life1Gender: string = '';
  Life1Nic: string = '';
  Life1NationalityId: number = 0;
  Life1Occupation: string = '';
  Life1ContactNo: string = '';
  Life1Email: string = '';
  Life1Address: string = '';
  Life1HeightCm: number = 0;
  Life1HeightInch: number = 0;
  Life1WeightKg: number = 0;
  Life1WeightLbs: number = 0;
  Life1Bmi: number = 0;
  Life1HnbaRefNo: string = '';
  Life1RiRefNo: string = '';
  Life1PrevPolicyAmount: number = 0;
  Life1HealthExtraBasic: number = 0;
  Life1HealthExtraTpd: number = 0;
  Life1OccuExtraBasic: number = 0;
  Life1OccuExtraTpd: number = 0;
  Life1OccuExtraPerMileBasic: number = 0;
  Life1OccuExtraPerMileTpd: number = 0;
  Life1Discount: number = 0;
  Life1Loadings: number = 0;
  Life1IsAgeAdmitted: boolean = false;
  Life1IsSmoker: boolean = false;
  Life1IsFemaleRebate: boolean = false;
  Life1IsTpd: boolean = false;
  Life1TpdOption: number = 0;
  Life1SysDate: string = '';

  Life2SeqId: number = 0;
  Life2MainSeqId: number = 0;
  Life2AssureType: string = COMMON_VALUES.LIFE_ASSURE_TYPE_2;
  Life2Name: string = '';
  Life2Dob: string = '';
  Life2Age: number = 0;
  Life2Gender: string = '';
  Life2Nic: string = '';
  Life2NationalityId: number = 0;
  Life2Occupation: string = '';
  Life2ContactNo: string = '';
  Life2Email: string = '';
  Life2Address: string = '';
  Life2HeightCm: number = 0;
  Life2HeightInch: number = 0;
  Life2WeightKg: number = 0;
  Life2WeightLbs: number = 0;
  Life2Bmi: number = 0;
  Life2HnbaRefNo: string = '';
  Life2RiRefNo: string = '';
  Life2PrevPolicyAmount: number = 0;
  Life2HealthExtraBasic: number = 0;
  Life2HealthExtraTpd: number = 0;
  Life2OccuExtraBasic: number = 0;
  Life2OccuExtraTpd: number = 0;
  Life2OccuExtraPerMileBasic: number = 0;
  Life2OccuExtraPerMileTpd: number = 0;
  Life2Discount: number = 0;
  Life2Loadings: number = 0;
  Life2IsAgeAdmitted: boolean = false;
  Life2IsSmoker: boolean = false;
  Life2IsFemaleRebate: boolean = false;
  Life2IsTpd: boolean = false;
  Life2TpdOption: number = 0;
  Life2SysDate: string = '';


  // heightCm1: number = 0;
  // heightInch1: number = 0;
  // weightKg1: number = 0;
  // weightLbs1: number = 0;
  // heightCm2: number = 0;
  // heightInch2: number = 0;
  // weightKg2: number = 0;
  // weightLbs2: number = 0;


  isValidated: boolean = false;

  revisionNoClass: string = '';
  customerName1Class: string = '';
  nic1Class: string = '';
  occupation1Class: string = '';
  dob1Class: string = '';
  age1Class: string = '';
  gender1Class: string = '';
  nationality1Class: string = '';
  heightCm1Class: string = '';
  heightInch1Class: string = '';
  weightKg1Class: string = '';
  weightLbs1Class: string = '';
  addressClass: string = '';
  contact1Class: string = '';
  email1Class: string = '';
  loanAmountClass: string = '';
  interestClass: string = '';
  termClass: string = '';
  termOfFixedInterestClass: string = '';
  fullTermInMonthsClass: string = '';
  gracePeriodInMonthsClass: string = '';
  currentAwplrClass: string = '';
  addtitionToAwplrClass: string = '';
  bankClass: string = '';
  bankBranchClass: string = '';
  hnbaCodeClass: string = '';
  hnbaRefnoLife1Class: string = '';
  RiRefnoLife1Class: string = '';
  exchangeRateClass: string = '';
  policyNoClass: string = '';
  dateOfCommenceClass: string = '';
  dateOfProposalClass: string = '';
  previousPolicies1Class: string = '';
  healthBasic1Class: string = '';
  healthTpd1Class: string = '';
  occExtraBasic1Class: string = '';
  occExtraTpd1Class: string = '';
  occuExtraPerMileBasic1Class: string = '';
  occuExtraPerMileTpd1: string = '';
  discount1Class: string = '';
  loading1Class: string = '';
  tpd1Class: string = '';
  tpdOption1Class: string = '';


  DiscountRate: string = '0';
  DiscountRemark: string = '';

  SelectedDocumentViewPath: SafeUrl;

  nationalityList: Array<INationality> = [];
  bankList: Array<IBank> = [];
  bankBranchList: Array<IBankBranch> = [];
  loanTypeList: Array<ILoanType> = [];
  proposalStatusList: Array<IProposalStatus> = [];


  hnbaBranchList: Array<IHnbaBranch> = [];
  currencyList: Array<ICurrency> = [];
  reInsuranceCompanyList: Array<IReInsuranceCompany> = [];
  channelList: Array<IChannel> = [];
  brokerList: Array<IBroker> = [];
  companyBufferList: Array<ICompanyBuffer> = [];
  tpdOptionList: Array<ITPDOption> = [];
  medicallTypeList: Array<IMedicalType> = [];
  uploadedDocViewList: Array<IUploadedDocView> = [];


  isProposalDetailsValid: boolean = false;

  datepickerOpts = {
    format: 'dd/mm/yyyy'
  }



  constructor(private proposalRegisterService: ProposalRegisterService,
    private assureService: AssureService, private quotationService: QuotationService,
    private commonService: CommonService, private toastrService: ToastrService,
    toastrConfig: ToastrConfig, private activatedRoute: ActivatedRoute) {

    toastrConfig.timeOut = 10000;
    toastrConfig.closeButton = true;
    toastrConfig.tapToDismiss = true;


    this.SeqId = activatedRoute.snapshot.params['SeqId'];

  }

  ngOnInit() {


    this.User = JSON.parse(localStorage.getItem('currentMRPUser'));

    this.getNationalities();
    this.getBanks();
    this.getBankBranches();
    this.getHNBABranches();
    this.getCurrencies();
    this.getReInsuranceCompanies();
    this.getLoanTypes();
    this.getChannels();
    this.getBrokers();
    this.getCompanyBuffer();
    this.getTPDOptions();
    this.getMedicalTypes();


    this.revisionNoClass = "form-group";
    this.customerName1Class = "form-group";
    this.nic1Class = "form-group";
    this.occupation1Class = "form-group";
    this.dob1Class = "form-group";
    this.age1Class = "form-group";
    this.gender1Class = "form-group";
    this.nationality1Class = "form-group";
    this.heightCm1Class = "form-group";
    this.heightInch1Class = "form-group";
    this.weightKg1Class = "form-group";
    this.weightLbs1Class = "form-group";
    this.addressClass = "form-group";
    this.contact1Class = "form-group";
    this.email1Class = "form-group";
    this.loanAmountClass = "form-group";
    this.interestClass = "form-group";
    this.termClass = "form-group";
    this.termOfFixedInterestClass = "form-group";
    this.fullTermInMonthsClass = "form-group";
    this.gracePeriodInMonthsClass = "form-group";
    this.currentAwplrClass = "form-group";
    this.addtitionToAwplrClass = "form-group";
    this.bankClass = "form-group";
    this.bankBranchClass = "form-group";
    this.hnbaCodeClass = "form-group";
    this.hnbaRefnoLife1Class = "form-group";
    this.RiRefnoLife1Class = "form-group";
    this.exchangeRateClass = "form-group";
    this.policyNoClass = "form-group";
    this.dateOfCommenceClass = "form-group";
    this.dateOfProposalClass = "form-group";
    this.previousPolicies1Class = "form-group";
    this.healthBasic1Class = "form-group";
    this.healthTpd1Class = "form-group";
    this.occExtraBasic1Class = "form-group";
    this.occExtraTpd1Class = "form-group";
    this.occuExtraPerMileBasic1Class = "form-group";
    this.occuExtraPerMileTpd1 = "form-group";
    this.discount1Class = "form-group";
    this.loading1Class = "form-group";
    this.tpd1Class = "form-group";
    this.tpdOption1Class = "form-group";



    this.loadProposalDetails();

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
  getProposalStatuses() {
    this.isLoading = true;
    this.commonService.getProposalStatuses()
      .subscribe((data) => {
        this.proposalStatusList = data
        this.isLoading = false;
      },
      (err) => {
        console.log(err);

        this.isLoading = false;
        this.showError("Error loading Statuses");

      });
  }


  getNationalities() {
    this.isLoading = true;
    this.commonService.getNationality()
      .subscribe((data) => {
        this.nationalityList = data
        this.isLoading = false;
      },
      (err) => {
        console.log(err);

        this.isLoading = false;
        this.showError("Error loading Nationalities");

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
  getHNBABranches() {
    this.isLoading = true;
    this.commonService.getHnbaBranch()
      .subscribe((data) => {
        this.hnbaBranchList = data
        this.isLoading = false;
      },
      (err) => {
        console.log(err);

        this.isLoading = false;
        this.showError("Error loading HNBA Branches");

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
  getBankBranches() {
    this.isLoading = true;
    this.commonService.getBankBranch()
      .subscribe((data) => {
        this.bankBranchList = data
        this.isLoading = false;


      },
      (err) => {
        console.log(err);

        this.isLoading = false;
        this.showError("Error loading Banks");

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



  getChannels() {
    this.isLoading = true;
    this.commonService.getChannel()
      .subscribe((data) => {
        this.channelList = data
        this.isLoading = false;
      },
      (err) => {
        console.log(err);

        this.isLoading = false;
        this.showError("Error loading Channels");

      });
  }


  getBrokers() {
    this.isLoading = true;
    this.commonService.getBroker()
      .subscribe((data) => {
        this.brokerList = data
        this.isLoading = false;
      },
      (err) => {
        console.log(err);

        this.isLoading = false;
        this.showError("Error loading Brokers");

      });
  }


  getTPDOptions() {
    this.isLoading = true;
    this.commonService.getTPDOption()
      .subscribe((data) => {
        this.tpdOptionList = data
        this.isLoading = false;
      },
      (err) => {
        console.log(err);

        this.isLoading = false;
        this.showError("Error loading TPD Options");

      });
  }

  getMedicalTypes() {
    this.isLoading = true;
    this.commonService.getMedicalTypes()
      .subscribe((data) => {
        this.medicallTypeList = data
        this.isLoading = false;
      },
      (err) => {
        console.log(err);

        this.isLoading = false;
        this.showError("Error loading Medical Types");

      });
  }


  getReInsuranceCompanies() {
    this.isLoading = true;
    this.commonService.getReInsuranceCompany()
      .subscribe((data) => {
        this.reInsuranceCompanyList = data
        this.isLoading = false;
      },
      (err) => {
        console.log(err);

        this.isLoading = false;
        this.showError("Error loading Re Insurance Companies");

      });
  }


  getCurrencies() {
    this.isLoading = true;
    this.commonService.getCurrency()
      .subscribe((data) => {
        this.currencyList = data
        this.isLoading = false;
      },
      (err) => {
        console.log(err);

        this.isLoading = false;
        this.showError("Error loading Currencies");

      });
  }




  getUploadedDocViewList(MainSeqId) {
    console.log('seq id from doc view' + MainSeqId);

    this.proposalRegisterService.getUploadedDocViewListByMainSeqId(MainSeqId)
      .subscribe((data) => {
        console.log('uploaded docs' + data);

        this.uploadedDocViewList = data

      },
      (err) => console.log(err));
  }



  onSelectOfBankId(bankId) {


    this.commonService.getBankBranchByBankId(bankId)
      .subscribe((data) => {
        this.bankBranchList = data;


        console.log(this.bankBranchList);

      },
      (err) => {
        console.log(err);

        this.isLoading = false;
        this.showError("Error loading Bank Branches");

      });
  }

  onSelectOfBankBranchId(bankBranchId) {


    this.BankCode = this.bankBranchList.filter(item => item.BankBranchId == bankBranchId)[0]['BankCode'];

  }


  clearValues() {
    this.SeqId = 0;
    this.JobNo = '';
    this.QuotationNo = '';
    this.RevisionNo = 0;
    this.ProposalNo = '';
    this.MedicalType = '';
    this.PolicyNo = '';
    this.LoanAmount = 0;
    this.Interest = 0;
    this.Term = 0;
    this.FullTermInMonths = 0;
    this.GracePeriod = 0;
    this.CompanyBufferId = 0;
    this.CurrentAwplr = 0;
    this.AdditionToAwplr = 0;
    this.TermOfFixedInterest = 0;
    this.BankId = 0;
    this.BranchId = 0;
    this.CurrencyId = 0;
    this.InterestRateType = '';
    this.HnbaBranchCode = '';
    this.BrokerCode = 0;
    this.ChannelCode = 0;
    this.IsReInsurance = false;
    this.LoanTypeId = 0;
    this.ReInsCompanyId = 0;
    this.ExchangeRate = 0;
    this.DateOfCommence = '';
    this.DateOfProposal = '';
    this.Premium = 0;
    this.PremiumWithPolicyFee = 0;
    this.Status = '';
    this.UserId = '';
    this.ProposalSendingMethod = '';
    this.RegisterDate = '';

    // this.heightCm1 = 0;
    // this.heightCm2 = 0;
    // this.heightInch1 = 0;
    // this.heightInch2 = 0;
    // this.weightKg1 = 0;
    // this.weightKg2 = 0;
    // this.weightLbs1 = 0;
    // this.weightLbs2 = 0;
    this.Life1Bmi = 0;
    this.Life2Bmi = 0;
  }


  private valueChangeHeightInch1(height) {
    if (this.Life1HeightInch != null && this.Life1WeightLbs != null) {
      this.Life1HeightCm = Number((height / 0.3937008).toFixed(2));
      this.Life1Bmi = this.calculateBMI(this.Life1HeightCm, this.Life1WeightKg);
    }
  }
  private valueChangeWeightLbs1(weight) {
    if (this.Life1HeightInch != null && this.Life1WeightLbs != null) {

      this.Life1WeightKg = Number((weight / 2.20462).toFixed(2));

      this.Life1Bmi = this.calculateBMI(this.Life1HeightCm, this.Life1WeightKg);
    }
  }
  private valueChangeHeightInch2(height) {
    if (this.Life2HeightInch != null && this.Life2WeightLbs != null) {
      this.Life2HeightCm = Number((height / 0.3937008).toFixed(2));
      this.Life2Bmi = this.calculateBMI(this.Life2HeightCm, this.Life2WeightKg);

    }

  }

  private valueChangeWeightLbs2(weight) {
    if (this.Life2HeightInch != null && this.Life2WeightLbs != null) {
      this.Life2WeightKg = Number((weight / 2.20462).toFixed(2));
      this.Life2Bmi = this.calculateBMI(this.Life2HeightCm, this.Life2WeightKg);
    }
  }




  private valueChangeHeightCm1(height) {
    if (this.Life1HeightCm != null && this.Life1WeightKg != null) {

      this.Life1HeightInch = Number((height * 0.3937008).toFixed(2));
      this.Life1Bmi = this.calculateBMI(this.Life1HeightCm, this.Life1WeightKg);

      // if (this.bmi1 < 18.5) {
      //   document.bmiForm.meaning.value = "That you are too thin."

      // }
      // if (this.bmi1 > 18.5 && finalBmi < 25) {
      //   document.bmiForm.meaning.value = "That you are healthy."
      // }
      // if (this.bmi1 > 25) {
      //   document.bmiForm.meaning.value = "That you have overweight."
      // }
    }

  }
  private valueChangeWeightKg1(weight) {
    if (this.Life1HeightCm != null && this.Life1WeightKg != null) {

      this.Life1WeightLbs = Number((weight * 2.20462).toFixed(2));
      this.Life1Bmi = this.calculateBMI(this.Life1HeightCm, this.Life1WeightKg);
    }
  }

  private valueChangeHeightCm2(height) {
    if (this.Life2HeightCm != null && this.Life2WeightKg != null) {
      this.Life2HeightInch = Number((height * 0.3937008).toFixed(2));
      this.Life2Bmi = this.calculateBMI(this.Life2HeightCm, this.Life2WeightKg);
    }
  }

  private valueChangeWeightKg2(weight) {
    if (this.Life2HeightCm != null && this.Life2WeightKg != null) {
      this.Life2HeightInch = Number((weight * 2.20462).toFixed(2));
      this.Life2Bmi = this.calculateBMI(this.Life2HeightCm, this.Life2WeightKg);
    }
  }

  private calculateBMI(height, weight): any {

    // console.log('height = ' + height);
    // console.log('weight = ' + weight);
    var finalBmi = weight / (height / 100 * height / 100)
    // console.log('BMI = ' + finalBmi.toFixed(2));

    return finalBmi.toFixed(2);

  }


  loadProposalDetails() {
    console.log('seeeeqqqq' + this.SeqId);

    // this.proposalRegisterService.getProposalDetailsBySeqId(this.SeqId)
    //   .subscribe((data) => {
    //     console.log(data);

    //     var moment = require('moment');
    //     let obj: IMain = JSON.parse(data);


    //     this.SeqId = obj.SeqId;
    //     this.JobNo = obj.JobNo;
    //     this.QuotationNo = obj.QuotationNo;
    //     this.RevisionNo = obj.RevisionNo;
    //     this.ProposalNo = obj.ProposalNo;
    //     this.MedicalType = obj.MedicalType;
    //     this.PolicyNo = obj.PolicyNo;
    //     this.LoanAmount = obj.LoanAmount;
    //     this.Interest = obj.Interest;
    //     this.Term = obj.Term;
    //     this.FullTermInMonths = obj.FullTermInMonths;
    //     this.GracePeriod = obj.GracePeriod;
    //     this.CompanyBufferId = obj.CompanyBufferId;
    //     this.CurrentAwplr = obj.CurrentAwplr;
    //     this.AdditionToAwplr = obj.AdditionToAwplr;
    //     this.TermOfFixedInterest = obj.TermOfFixedInterest;
    //     this.BankId = obj.BankId;
    //     this.onSelectOfBankId(this.BankId)

    //     this.BranchId = obj.BranchId;
    //     this.onSelectOfBankBranchId(this.BranchId);
    //     this.CurrencyId = obj.CurrencyId;
    //     this.InterestRateType = obj.InterestRateType;
    //     this.HnbaBranchCode = obj.HnbaBranchCode;
    //     this.BrokerCode = obj.BrokerCode;
    //     this.ChannelCode = obj.ChannelCode;

    //     let bIsReInsurance: boolean;

    //     if (obj.IsReInsurance) {
    //       bIsReInsurance = true;
    //     } else {
    //       bIsReInsurance = false;
    //     }

    //     this.IsReInsurance = bIsReInsurance;
    //     this.LoanTypeId = obj.LoanTypeId;
    //     this.ReInsCompanyId = obj.ReInsCompanyId;
    //     this.ExchangeRate = obj.ExchangeRate;

    //     var momentDateOfCommence = moment(obj.DateOfCommence.substr(0, 10), 'DD/MM/YYYY').toDate();

    //     this.DateOfCommence = momentDateOfCommence;

    //     var momentDateOfProposal = moment(obj.DateOfProposal.substr(0, 10), 'DD/MM/YYYY').toDate();

    //     this.DateOfProposal = momentDateOfProposal;

    //     this.Premium = obj.Premium;
    //     this.PremiumWithPolicyFee = obj.PremiumWithPolicyFee;
    //     this.Status = obj.Status;
    //     this.UserId = obj.UserId;
    //     this.ProposalSendingMethod = obj.ProposalSendingMethod;
    //    // this.RegisterDate = obj.RegisterDate;



    //     let bIsValidated: boolean;
    //     if (obj.IsValidated) {
    //       bIsValidated = true;
    //     } else {
    //       bIsValidated = false;
    //     }
    //     this.isValidated = bIsValidated;

    //     this.loadLife1Details();
    //     this.loadLife2Details();


    //     this.getUploadedDocViewList(this.SeqId);
    //   },
    //   (err) => console.log(err));

  }

  loadLife1Details() {
    // this.assureService.getAssureDetailsByMainSeqId(this.SeqId, COMMON_VALUES.LIFE_ASSURE_TYPE_1)
    //   .subscribe((data) => {
    //     console.log(data);

    //     if (data != null) {


    //       var moment = require('moment');
    //       let obj: IAssureDetail = JSON.parse(data);

    //       this.Life1SeqId = obj.SeqId;
    //    //   this.Life1MainSeqId = obj.MainSeqId;
    //       this.Life1AssureType = obj.AssureType;
    //       this.Life1Name = obj.Name;

    //    //   var momentDateLife1Dob = moment(obj.Dob.substr(0, 10), 'DD/MM/YYYY').toDate();


    //       this.Life1Dob = momentDateLife1Dob;
    //       this.Life1Age = obj.Age;
    //       this.Life1Gender = obj.Gender;
    //     //  this.Life1Nic = obj.Nic;
    //       this.Life1NationalityId = obj.NationalityId;
    //       this.Life1Occupation = obj.Occupation;
    //       this.Life1ContactNo = obj.ContactNo;
    //       this.Life1Email = obj.Email;
    //       this.Life1Address = obj.Address;
    //       this.Life1HeightCm = obj.HeightCm;
    //       this.Life1HeightInch = obj.HeightInch;
    //       this.Life1WeightKg = obj.WeightKg;
    //       this.Life1WeightLbs = obj.WeightLbs;

    //       // this.Life1HnbaRefNo = obj.HnbaRefNo;
    //       // this.Life1RiRefNo = obj.ReInsuranceRefNo;
    //       // this.Life1PrevPolicyAmount = obj.PreviousPolicyAmount;
    //       // this.Life1HealthExtraBasic = obj.HealthExtraBasic;
    //       // this.Life1HealthExtraTpd = obj.HealthExtraTpd;
    //       // this.Life1OccuExtraBasic = obj.OccupationExtraBasic;
    //       // this.Life1OccuExtraTpd = obj.OccupationExtraTpd;
    //       // this.Life1OccuExtraPerMileBasic = obj.OccupationExtraPerMileBasic;
    //       // this.Life1OccuExtraPerMileTpd = obj.OccupationExtraPerMileTpd;
    //       // this.Life1Discount = obj.Discount;
    //       // this.Life1Loadings = obj.Loadings;

    //       let bIsAgeAdmitted: boolean;
    //       let bIsSmoker: boolean;
    //       let bIsFemaleRebate: boolean;
    //       let bIsTpd: boolean;

    //       if (obj.IsAgeAdmitted) {
    //         bIsAgeAdmitted = true;
    //       } else {
    //         bIsAgeAdmitted = false;
    //       }
    //       if (obj.IsSmoker) {
    //         bIsSmoker = true;
    //       } else {
    //         bIsSmoker = false;
    //       }
    //       if (obj.IsFemaleRebate) {
    //         bIsFemaleRebate = true;
    //       } else {
    //         bIsFemaleRebate = false;
    //       }
    //       if (obj.IsTpd) {
    //         bIsTpd = true;
    //       } else {
    //         bIsTpd = false;
    //       }



    //       this.Life1IsAgeAdmitted = bIsAgeAdmitted;
    //       this.Life1IsSmoker = bIsSmoker;
    //       this.Life1IsFemaleRebate = bIsFemaleRebate;
    //       this.Life1IsTpd = bIsTpd;


    //     //  this.Life1TpdOption = obj.TpdOption;


    //       var momentDateLife1SysDate = moment(obj.RegisterDate.substr(0, 10), 'DD/MM/YYYY').toDate();

    //       this.Life1SysDate = momentDateLife1SysDate;

    //       this.Life1Bmi = this.calculateBMI(this.Life1HeightCm, this.Life1WeightKg);

    //     }

    //   },
    //   (err) => console.log(err));
  }



  loadLife2Details() {
    // this.assureService.getAssureDetailsByMainSeqId(this.SeqId, COMMON_VALUES.LIFE_ASSURE_TYPE_2)
    //   .subscribe((data) => {
    //     console.log(data);
    //     if (data != null) {
    //       var moment = require('moment');
    //       let obj: IAssureDetail = JSON.parse(data);


    //       this.Life2SeqId = obj.SeqId;
    //       // this.Life2MainSeqId = obj.MainSeqId;
    //       this.Life2AssureType = obj.AssureType;
    //       this.Life2Name = obj.Name;


    //       // var momentDateLife2Dob = moment(obj.Dob.substr(0, 10), 'DD/MM/YYYY').toDate();



    //       this.Life2Dob = momentDateLife2Dob;
    //       this.Life2Age = obj.Age;
    //       this.Life2Gender = obj.Gender;
    //       // this.Life2Nic = obj.Nic;
    //       this.Life2NationalityId = obj.NationalityId;
    //       this.Life2Occupation = obj.Occupation;
    //       this.Life2ContactNo = obj.ContactNo;
    //       this.Life2Email = obj.Email;
    //       this.Life2Address = obj.Address;
    //       this.Life2HeightCm = obj.HeightCm;
    //       this.Life2HeightInch = obj.HeightInch;
    //       this.Life2WeightKg = obj.WeightKg;
    //       this.Life2WeightLbs = obj.WeightLbs;
    //       // this.Life2HnbaRefNo = obj.HnbaRefNo;
    //       // this.Life2RiRefNo = obj.ReInsuranceRefNo;
    //       // this.Life2PrevPolicyAmount = obj.PreviousPolicyAmount;
    //       // this.Life2HealthExtraBasic = obj.HealthExtraBasic;
    //       // this.Life2HealthExtraTpd = obj.HealthExtraTpd;
    //       // this.Life2OccuExtraBasic = obj.OccupationExtraBasic;
    //       // this.Life2OccuExtraTpd = obj.OccupationExtraTpd;
    //       // this.Life2OccuExtraPerMileBasic = obj.OccupationExtraPerMileBasic;
    //       // this.Life2OccuExtraPerMileTpd = obj.OccupationExtraPerMileTpd;
    //       // this.Life2Discount = obj.Discount;
    //       // this.Life2Loadings = obj.Loadings;

    //       let bIsAgeAdmitted: boolean;
    //       let bIsSmoker: boolean;
    //       let bIsFemaleRebate: boolean;
    //       let bIsTpd: boolean;

    //       if (obj.IsAgeAdmitted) {
    //         bIsAgeAdmitted = true;
    //       } else {
    //         bIsAgeAdmitted = false;
    //       }
    //       if (obj.IsSmoker) {
    //         bIsSmoker = true;
    //       } else {
    //         bIsSmoker = false;
    //       }
    //       if (obj.IsFemaleRebate) {
    //         bIsFemaleRebate = true;
    //       } else {
    //         bIsFemaleRebate = false;
    //       }
    //       // if (obj.IsTpd) {
    //       //   bIsTpd = true;
    //       // } else {
    //       //   bIsTpd = false;
    //       // }


    //       this.Life2IsAgeAdmitted = bIsAgeAdmitted;
    //       this.Life2IsSmoker = bIsSmoker;
    //       this.Life2IsFemaleRebate = bIsFemaleRebate;
    //       this.Life2IsTpd = bIsTpd;
    //       this.Life2TpdOption = obj.TpdOption;


    //       var momentDateLife2SysDate = moment(obj.RegisterDate.substr(0, 10), 'DD/MM/YYYY').toDate();

    //       this.Life2SysDate = momentDateLife2SysDate;



    //       this.Life2Bmi = this.calculateBMI(this.Life2HeightCm, this.Life2WeightKg);

    //     }



    //   },
    //   (err) => console.log(err));

  }




  public validateFields() {



    this.isProposalDetailsValid = true;
    //implement validations here - TDA

    console.log('validated');
  }


  public Calculate() {


    this.validateFields();
    if (this.isProposalDetailsValid) {

      console.log('point 1');

      this.isLoading = true;
      this.LoanTypeName = this.loanTypeList.filter(item => item.LoanTypeId == this.LoanTypeId)[0]['LoanTypeName'];

      this.CompanyBufferValue = this.companyBufferList.filter(item => item.CompanyBufferId == this.CompanyBufferId)[0]['CompanyBufferName'];




      var moment = require('moment');


      if (this.Life1Age == null) {
        this.Life1Age = 0;
      }
      if (this.Life2Age == null) {
        this.Life2Age = 0;
      }
      if (this.LoanAmount == null) {
        this.LoanAmount = 0;
      }
      if (this.FullTermInMonths == null) {
        this.FullTermInMonths = 0;
      }
      if (this.Interest == null) {
        this.Interest = 0;
      }
      if (this.CompanyBufferId == null) {
        this.CompanyBufferId = 0;
      }
      if (this.CurrentAwplr == null) {
        this.CurrentAwplr = 0;
      }
      if (this.AdditionToAwplr == null) {
        this.AdditionToAwplr = 0;
      }
      if (this.TermOfFixedInterest == null) {
        this.TermOfFixedInterest = 0;
      }
      if (this.Life1Discount == null) {
        this.Life1Discount = 0;
      }

      if (this.LoanTypeId == null) {
        this.LoanTypeId = 0;
      }


      var formatted_dob_life1 = moment(this.Life1Dob).format('YYYY/MM/DD');
      var formatted_dob_life2;

      if (this.Life2Dob == null || this.Life2Dob == "01/01/1900") {
        formatted_dob_life2 = "N/A";
      } else {
        formatted_dob_life2 = moment(this.Life2Dob).format('YYYY/MM/DD');
      }

      console.log('this.Life2Gender = ' + this.Life2Gender);

      var formattedLifeAss2Gender;
      if (this.Life2Gender == null || this.Life2Gender == "") {
        formattedLifeAss2Gender = "N/A";
      }

      console.log('point 2');

      // console.log('this.User.UserName-' + this.User.UserName);
      // console.log('this.FullTermInMonths.toString()-' + this.FullTermInMonths.toString());
      // console.log('this.Interest.toString()-' + this.Interest.toString());
      // console.log('this.LoanAmount.toString()-' + this.LoanAmount.toString());
      // console.log('this.GracePeriod-' + this.GracePeriod);
      // console.log('formatted_dob_life1-' + formatted_dob_life1);
      // console.log('formatted_dob_life2-' + formatted_dob_life2);
      // console.log('this.LoanTypeName-' + this.LoanTypeName);
      // console.log('this.Life1Gender-' + this.Life1Gender);
      // console.log('formattedLifeAss2Gender-' + formattedLifeAss2Gender);
      // console.log('this.CompanyBufferId-' + this.CompanyBufferId);
      // console.log('this.CurrentAwplr.toString()-' + this.CurrentAwplr.toString());
      // console.log('this.AdditionToAwplr.toString()-' + this.AdditionToAwplr.toString());
      // console.log('this.Life1Discount-' + this.Life1Discount);
      // console.log('this.Life2Discount-' + this.Life2Discount);
      // console.log('this.Life1HealthExtraBasic-' + this.Life1HealthExtraBasic);
      // console.log('this.Life2HealthExtraBasic-' + this.Life2HealthExtraBasic);
      // console.log('this.Life1HealthExtraTpd-' + this.Life1HealthExtraTpd);
      // console.log('this.Life2HealthExtraTpd-' + this.Life2HealthExtraTpd);
      // console.log('this.Life1OccuExtraPerMileBasic-' + this.Life1OccuExtraPerMileBasic);
      // console.log('this.Life2OccuExtraPerMileBasic-' + this.Life2OccuExtraPerMileBasic);
      // console.log('this.Life1OccuExtraPerMileTpd-' + this.Life1OccuExtraPerMileTpd);
      // console.log('this.Life2OccuExtraPerMileTpd-' + this.Life2OccuExtraPerMileTpd);
      // console.log('this.TermOfFixedInterest-' + this.TermOfFixedInterest);


      console.log('point 2.1');
      var obj = {
        username: this.User.UserName,
        term: this.FullTermInMonths.toString(),
        loan_interest: this.Interest.toString(),
        loan_amount: this.LoanAmount.toString(),
        grace_period: this.GracePeriod,
        dob_life1: formatted_dob_life1,
        dob_life2: formatted_dob_life2,
        loan_type: this.LoanTypeName,
        gender_life1: this.Life1Gender,
        gender_life2: formattedLifeAss2Gender,
        Company_Buffer: this.CompanyBufferId,
        Current_AWPLR: this.CurrentAwplr.toString(),
        Addition_to_AWPLR: this.AdditionToAwplr.toString(),
        life1_discount: this.Life1Discount,
        life2_discount: this.Life2Discount,
        basic_healthExtraPecentage_life1: this.Life1HealthExtraBasic,
        basic_healthExtraPecentage_life2: this.Life2HealthExtraBasic,
        tpd_healthExtraPecentage_life1: this.Life1HealthExtraTpd,
        tpd_healthExtraPecentage_life2: this.Life2HealthExtraTpd,
        basic_healthExtraPermile_life1: this.Life1OccuExtraPerMileBasic,
        basic_healthExtraPermile_life2: this.Life2OccuExtraPerMileBasic,
        tpd_healthExtraPermile_life1: this.Life1OccuExtraPerMileTpd,
        tpd_healthExtraPermile_life2: this.Life2OccuExtraPerMileTpd,
        term_fixed_interest: this.TermOfFixedInterest

      };


      console.log(obj);
      console.log(JSON.stringify(obj));

      var data = obj;
      var keyValPairString = "?";
      for (var key in data) {
        console.log(key + ' : ' + data[key]);
        keyValPairString = keyValPairString + key + '=' + data[key] + '&';
        // alert(key + ' --> ' + data[key]);
      }


      keyValPairString = keyValPairString.slice(0, -1);
      console.log('point 3');
      console.log(keyValPairString);
      // this.quotationService.calculateQuotation(keyValPairString).subscribe((data: any) => {
      //   console.log(data);
      //   console.log('Premium = ' + data.data.premium);


      //   this.Premium = data.data.premium;
      //   this.PremiumWithPolicyFee = data.data.premium_with_policy_fee;


      //   this.isLoading = false;


      // },
      //   (err) => {

      //     this.isLoading = false;
      //     this.showError("Error calculating premium");
      //   },
      //   () => console.log('done')
      // );
    }
  }




  public SaveProposal() {


    // this.validateFields();
    // console.log(this.isProposalDetailsValid);
    // if (this.isProposalDetailsValid) {
    //   this.isLoading = true;

    //   console.log('bank   -' + this.BankId);


    //   var moment = require('moment');

    //   var formattedDateOfCommence = moment(this.DateOfCommence).format('DD/MM/YYYY');
    //   var formattedDateOfProposal = moment(this.DateOfProposal).format('DD/MM/YYYY');

    //   var formattedRegisterDate = moment(this.RegisterDate).format('DD/MM/YYYY');

    //   let nIsReInsurance: number;
    //   if (this.IsReInsurance) {
    //     nIsReInsurance = 1;
    //   } else {
    //     nIsReInsurance = 0;
    //   }

    //   let nIsValidated: number;
    //   if (this.isValidated) {
    //     nIsValidated = 1;
    //   } else {
    //     nIsValidated = 0;
    //   }


    //   let obj: IMain = {
    //     // TempSeqId: '',
    //     SeqId: this.SeqId,
    //     JobNo: this.JobNo,
    //     QuotationNo: this.QuotationNo,
    //     RevisionNo: this.RevisionNo,
    //     ProposalNo: this.ProposalNo,
    //     MedicalType: this.MedicalType,
    //     PolicyNo: this.PolicyNo,
    //     LoanAmount: this.LoanAmount,
    //     Interest: this.Interest,
    //     Term: this.Term,
    //     FullTermInMonths: this.FullTermInMonths,
    //     GracePeriod: this.GracePeriod,
    //     CompanyBufferId: this.CompanyBufferId,
    //     CurrentAwplr: this.CurrentAwplr,
    //     AdditionToAwplr: this.AdditionToAwplr,
    //     TermOfFixedInterest: this.TermOfFixedInterest,
    //     BankId: this.BankId,
    //     BranchId: this.BranchId,
    //     CurrencyId: this.CurrencyId,
    //     InterestRateType: this.InterestRateType,
    //     HnbaBranchCode: this.HnbaBranchCode,
    //     BrokerCode: this.BrokerCode,
    //     ChannelCode: this.ChannelCode,
    //     IsReInsurance: nIsReInsurance,
    //     LoanTypeId: this.LoanTypeId,
    //     ReInsCompanyId: this.ReInsCompanyId,
    //     ExchangeRate: this.ExchangeRate,
    //     DateOfCommence: formattedDateOfCommence,
    //     DateOfProposal: formattedDateOfProposal,
    //     Premium: this.Premium,
    //     PremiumWithPolicyFee: this.PremiumWithPolicyFee,
    //     Status: this.Status,
    //     UserId: this.User.UserName,
    //     ProposalSendingMethod: this.ProposalSendingMethod,
    //     // RegisterDate: formattedRegisterDate,
    //     IsValidated: nIsValidated,
    //     IsVIP: 0
    //   }

    //   console.log(obj);
    //   console.log(JSON.stringify(obj));
    //   this.proposalRegisterService.updateProposalDetails(obj).subscribe((data: any) => {

    //     if (data.status == 200) {
    //       this.showSuccess("Proposal Details Successfully Saved.");

    //       this.SaveDataToMRP();
    //       this.SaveAssureDetails1();
    //       if (this.Life2Name != "" && this.Life2Nic != "") {

    //         this.SaveAssureDetails2();
    //       }
    //     }
    //     this.isLoading = false;



    //   },
    //     (err) => {
    //       // alert(err);
    //       console.log(err);

    //       this.isLoading = false;
    //       this.showError("Error while saving Proposal.");
    //     },
    //     () => console.log('done'));

    // }

  }



  public SaveAssureDetails1() {


    // this.isLoading = true;


    // var moment = require('moment');
    // var formatted_dob_life1 = moment(this.Life1Dob).format('DD/MM/YYYY');

    // var formattedLife1SysDate = moment(this.Life1SysDate).format('DD/MM/YYYY');


    // let nIsAgeAdmitted: number;
    // let nIsSmoker: number;
    // let nIsFemaleRebate: number;
    // let nIsTpd: number;

    // if (this.Life1IsAgeAdmitted) {
    //   nIsAgeAdmitted = 1;
    // } else {
    //   nIsAgeAdmitted = 0;
    // }
    // if (this.Life1IsSmoker) {
    //   nIsSmoker = 1;
    // } else {
    //   nIsSmoker = 0;
    // }
    // if (this.Life1IsFemaleRebate) {
    //   nIsFemaleRebate = 1;
    // } else {
    //   nIsFemaleRebate = 0;
    // }
    // if (this.Life1IsTpd) {
    //   nIsTpd = 1;
    // } else {
    //   nIsTpd = 0;
    // }

    // let obj: IAssureDetail = {
    //   SeqId: this.Life1SeqId,
    //   // MainSeqId: this.SeqId,
    //   AssureType: this.Life1AssureType,
    //   Name: this.Life1Name,
    //   Dob: formatted_dob_life1,
    //   Age: this.Life1Age,
    //   Gender: this.Life1Gender,
    //   Nic: this.Life1Nic,
    //   NationalityId: this.Life1NationalityId,
    //   Occupation: this.Life1Occupation,
    //   ContactNo: this.Life1ContactNo,
    //   Email: this.Life1Email,
    //   Address: this.Life1Address,
    //   HeightCm: this.Life1HeightCm,
    //   HeightInch: this.Life1HeightInch,
    //   WeightKg: this.Life1WeightKg,
    //   WeightLbs: this.Life1WeightLbs,
    //   Bmi: this.Life1Bmi,
    //   HnbaRefNo: this.Life1HnbaRefNo,
    //   ReInsuranceRefNo: this.Life1RiRefNo,
    //   PreviousPolicyAmount: this.Life1PrevPolicyAmount,
    //   HealthExtraBasic: this.Life1HealthExtraBasic,
    //   HealthExtraTpd: this.Life1HealthExtraTpd,
    //   OccupationExtraBasic: this.Life1OccuExtraBasic,
    //   OccupationExtraTpd: this.Life1OccuExtraTpd,
    //   OccupationExtraPerMileBasic: this.Life1OccuExtraPerMileBasic,
    //   OccupationExtraPerMileTpd: this.Life1OccuExtraPerMileTpd,
    //   Discount: this.Life1Discount,
    //   Loadings: this.Life1Loadings,
    //   IsAgeAdmitted: nIsAgeAdmitted,
    //   IsSmoker: nIsSmoker,
    //   IsFemaleRebate: nIsFemaleRebate,
    //   IsTpd: nIsTpd,
    //   TpdOption: this.Life1TpdOption,
    //   RegisterDate: formattedLife1SysDate

    // }

    // console.log(obj);
    // console.log(JSON.stringify(obj));
    // this.assureService.updateAssureDetail(obj).subscribe((data: any) => {
    //   console.log(data);

    //   this.isLoading = false;


    //   if (data.status == 200) {
    //     this.showSuccess("Assure 1 Details Successfully Saved.");
    //   } else {
    //     this.showError("Error while saving Assure 1 Details.");


    //   }
    // },
    //   (err) => {
    //     // alert(err);
    //     console.log(err);

    //     this.isLoading = false;
    //     this.showError("Error while saving Assure 1 Details.");
    //   },
    //   () => console.log('done'));


  }

  public SaveAssureDetails2() {


    // this.isLoading = true;

    // var moment = require('moment');
    // var formatted_dob_life2 = moment(this.Life2Dob).format('DD/MM/YYYY');
    // var formattedLife2SysDate = moment(this.Life2SysDate).format('DD/MM/YYYY');

    // let nIsAgeAdmitted: number;
    // let nIsSmoker: number;
    // let nIsFemaleRebate: number;
    // let nIsTpd: number;

    // if (this.Life1IsAgeAdmitted) {
    //   nIsAgeAdmitted = 1;
    // } else {
    //   nIsAgeAdmitted = 0;
    // }
    // if (this.Life2IsSmoker) {
    //   nIsSmoker = 1;
    // } else {
    //   nIsSmoker = 0;
    // }
    // if (this.Life2IsFemaleRebate) {
    //   nIsFemaleRebate = 1;
    // } else {
    //   nIsFemaleRebate = 0;
    // }
    // if (this.Life2IsTpd) {
    //   nIsTpd = 1;
    // } else {
    //   nIsTpd = 0;
    // }



    // let obj: IAssureDetail = {
    //   SeqId: this.Life2SeqId,
    //   // MainSeqId: this.SeqId,
    //   AssureType: this.Life2AssureType,
    //   Name: this.Life2Name,
    //   Dob: formatted_dob_life2,
    //   Age: this.Life2Age,
    //   Gender: this.Life2Gender,
    //   Nic: this.Life2Nic,
    //   NationalityId: this.Life2NationalityId,
    //   Occupation: this.Life2Occupation,
    //   ContactNo: this.Life2ContactNo,
    //   Email: this.Life2Email,
    //   Address: this.Life2Address,
    //   HeightCm: this.Life2HeightCm,
    //   HeightInch: this.Life2HeightInch,
    //   WeightKg: this.Life2WeightKg,
    //   WeightLbs: this.Life2WeightLbs,
    //   Bmi: this.Life2Bmi,
    //   HnbaRefNo: this.Life2HnbaRefNo,
    //   ReInsuranceRefNo: this.Life2RiRefNo,
    //   PreviousPolicyAmount: this.Life2PrevPolicyAmount,
    //   HealthExtraBasic: this.Life2HealthExtraBasic,
    //   HealthExtraTpd: this.Life2HealthExtraTpd,
    //   OccupationExtraBasic: this.Life2OccuExtraBasic,
    //   OccupationExtraTpd: this.Life2OccuExtraTpd,
    //   OccupationExtraPerMileBasic: this.Life2OccuExtraPerMileBasic,
    //   OccupationExtraPerMileTpd: this.Life2OccuExtraPerMileTpd,
    //   Discount: this.Life2Discount,
    //   Loadings: this.Life2Loadings,
    //   IsAgeAdmitted: nIsAgeAdmitted,
    //   IsSmoker: nIsSmoker,
    //   IsFemaleRebate: nIsFemaleRebate,
    //   IsTpd: nIsTpd,
    //   TpdOption: this.Life2TpdOption,
    //   RegisterDate: formattedLife2SysDate
    // }

    // console.log(obj);
    // console.log(JSON.stringify(obj));
    // this.assureService.updateAssureDetail(obj).subscribe((data: any) => {
    //   console.log(data);

    //   this.isLoading = false;


    //   if (data.status == 200) {
    //     this.showSuccess("Assure 2 Details Successfully Saved.");


    //   } else {
    //     this.showError("Error while saving Assure 2 Details.");
    //   }
    // },
    //   (err) => {
    //     // alert(err);
    //     console.log(err);

    //     this.isLoading = false;
    //     this.showError("Error while saving Assure 2 Details.");
    //   },
    //   () => console.log('done'));


  }




  public SaveDataToMRP() {

    let BankName = this.bankList.filter(item => item.BankId == this.BankId)[0]['BankName'];
    let BankBranchName = this.bankBranchList.filter(item => item.BankBranchId == this.BranchId)[0]['BankBranchName'];

    let obj: IMrpProposalRegSave = {
      ProposalNo: this.ProposalNo,
      Assure1Nic: this.Life1Nic,
      Assure2Nic: this.Life2Nic,
      BankCode: this.BankCode,
      PolicyNo: this.PolicyNo,
      Description: "",
      BankName: BankName,
      Assure1Name: this.Life1Name,
      Assure2Name: this.Life2Name,
      BankBranchName: BankBranchName,
      OtherBankName: BankName,
      RptDate: "",
      Status: "1",
      HnbaBranchCode: this.HnbaBranchCode,
      VIP: "NO",
      PremiumFee: this.PremiumWithPolicyFee,
      Premium: this.Premium,
      Fullterm: this.FullTermInMonths,
      Loantype: this.LoanTypeName,
      DiscountRate:this.DiscountRate
    }

console.log('----------------------------------');

    console.log(' obj lt '+obj.Loantype);
    
console.log(' this lt '+this.LoanTypeName);

    console.log(obj);
    console.log(JSON.stringify(obj));
    this.proposalRegisterService.saveProposalToMRP(obj).subscribe((data: any) => {

      console.log("saveProposalToMRP Done");

      this.isLoading = false;



      if (data.status == 200) {
        console.log('cvcvcvcvc');

        this.SavePolicyDataToMRP();
      } else {
        console.log('zxzxzxz');

        this.showError("Error while saving data to MRP.");
      }

    },
      (err) => {
        // alert(err);
        console.log(err);

        this.isLoading = false;
        this.showError("Error while saving");
      },
      () => console.log('done'));
  }




  public SavePolicyDataToMRP() {

    console.log('came to SavePolicyDataToMRP');


    let BankName = this.bankList.filter(item => item.BankId == this.BankId)[0]['BankName'];
    console.log(BankName);

    let BankBranchName = this.bankBranchList.filter(item => item.BankBranchId == this.BranchId)[0]['BankBranchName'];
    console.log(BankBranchName);
    let CurrencySymbol = "";
    let CurrencyDescription = "";

    console.log('ccc' + this.CurrencyId);

    if (this.CurrencyId != 0) {

      console.log('p ccc1');

      CurrencySymbol = this.currencyList.filter(item => item.CurrencyId == this.CurrencyId)[0]['CurrencySymbol'];
      console.log(CurrencySymbol);
      console.log('p ccc2');
      CurrencyDescription = this.currencyList.filter(item => item.CurrencyId == this.CurrencyId)[0]['CurrencyDescription'];
      console.log(CurrencyDescription);
      console.log('p ccc3');
    }

    console.log('pppp22');

    let ReInsCompanyName = "";
    if (this.ReInsCompanyId > 0) {

      console.log('ppp ri1');
      console.log('id ' + this.ReInsCompanyId);

      ReInsCompanyName = this.reInsuranceCompanyList.filter(item => item.ReInsuranceCompanyId == this.ReInsCompanyId)[0]['ReInsuranceCompanyName'];
      console.log(ReInsCompanyName);
      console.log('ppp ri2');
    }
    console.log('ppp333');


    let obj: IMrpPolicyInfoSave = {
      PolicyNo: this.PolicyNo,
      DateOfComm: "",
      PropNo: this.ProposalNo,
      DateOfProp: "",
      PrevsPolcy1: "",
      PrevsPolcy2: "",
      BNKCode: this.BankCode,
      HeltLodBasic1: this.Life1HealthExtraBasic.toString(),
      HeltLodBasic2: this.Life2HealthExtraBasic.toString(),
      HeltLodTPD1: this.Life1HealthExtraTpd.toString(),
      HeltLodTPD2: this.Life2HealthExtraTpd.toString(),
      OccupLoadBasic1: this.Life1OccuExtraBasic.toString(),
      OccupLoadBasic2: this.Life2OccuExtraBasic.toString(),
      OccupLoadTPD1: this.Life1OccuExtraTpd.toString(),
      OccupLoadTPD2: this.Life2OccuExtraTpd.toString(),
      DicuntLoadLife1: this.Life1Discount.toString(),
      DicuntLoadLife2: this.Life2Discount.toString(),
      TPDDeclin: "0",
      IsAgeAdmited: (this.Life1IsAgeAdmitted == true ? 'Y' : 'N'),
      PremiumFee: this.PremiumWithPolicyFee.toString(),
      LfLoad1: this.Life1Loadings.toString(),
      LfLoad2: this.Life2Loadings.toString(),
      Smoker: (this.Life1IsSmoker == true ? 'Y' : 'N'),
      Debate: (this.Life1IsFemaleRebate == true ? 'Y' : 'N'),
      Tpdlife1: (this.Life1IsTpd == true ? 'Y' : 'N'),
      Tpdlife2: (this.Life2IsTpd == true ? 'Y' : 'N'),
      Tpdoption1: this.Life1TpdOption.toString(),
      Tpdoption2: this.Life2TpdOption.toString(),
      Reinsu: (this.IsReInsurance == true ? 'Y' : 'N'),
      Exchangerate: "",
      Currency: CurrencySymbol,
      Rptdate: "",
      Premium: this.Premium.toString(),
      Fullterm: this.FullTermInMonths.toString(),
      Graceterm: this.GracePeriod.toString(),
      Loantype: this.LoanTypeName,
      Recompany: ReInsCompanyName,
      Currencyformat: CurrencyDescription,
      OccupLoadBasicpermile1: this.Life1OccuExtraPerMileBasic.toString(),
      OccupLoadBasicpermile2: this.Life2OccuExtraPerMileBasic.toString(),
      OccupLoadTPDpermile1: this.Life1OccuExtraPerMileTpd.toString(),
      OccupLoadTPDpermile2: this.Life2OccuExtraPerMileTpd.toString(),
      Brockercode: ""


    }


    console.log('after vvv');

    console.log(obj);
    console.log(JSON.stringify(obj));




    this.proposalRegisterService.savePolicyInfoToMRP(obj).subscribe((data: any) => {
      console.log("savePolicyInfoToMRP Done");
      console.log(data.status);

      this.isLoading = false;

      if (data.status == 200) {
        console.log('trtrtrtrtr');

        this.SaveCustomerDataToMRP();
      } else {
        console.log('uiuiuiuiuiuiu');

        this.showError("Error while saving data to MRP.");
      }


    },
      (err) => {
        // alert(err);
        console.log(err);

        this.isLoading = false;
        this.showError("Error while saving");
      },
      () => console.log('done'));
  }



  public SaveCustomerDataToMRP() {

    let BankName = this.bankList.filter(item => item.BankId == this.BankId)[0]['BankName'];
    let BankBranchName = this.bankBranchList.filter(item => item.BankBranchId == this.BranchId)[0]['BankBranchName'];

    let Life1Nationality = "";
    let Life2Nationality = "";

    if (this.Life1NationalityId > 0) {
      Life1Nationality = this.nationalityList.filter(item => item.Id == this.Life1NationalityId)[0]['Adjective'];
    }
    if (this.Life2NationalityId > 0) {
      Life2Nationality = this.nationalityList.filter(item => item.Id == this.Life2NationalityId)[0]['Adjective'];
    }



    let CompanyBuffer = "";
    if (this.CompanyBufferId > 0) {
      CompanyBuffer = this.companyBufferList.filter(item => item.CompanyBufferId == this.CompanyBufferId)[0]['CompanyBufferName'];
    }


    let obj: IMrpCustomerInfoSave = {
      NIC1: this.Life1Nic,
      NIC2: this.Life2Nic,
      Life1: this.Life1Name,
      Life2: this.Life2Name,
      LifeDOB1: this.Life1Dob,
      LifeDOB2: this.Life2Dob,
      addrs: this.Life1Address,
      Height1: this.Life1HeightCm.toString(),
      Height2: this.Life2HeightCm.toString(),
      Weight1: this.Life1WeightKg.toString(),
      Weight2: this.Life2WeightKg.toString(),
      Sex1: this.Life1Gender,
      Sex2: this.Life2Gender,
      Occupt1: this.Life1Occupation,
      Occupt2: this.Life2Occupation,
      PropNo: this.ProposalNo,
      LoanAmt1: this.LoanAmount.toString(),
      LoanAmt2: "0",
      LoanAmt3: "0",
      Inst1: "0",
      Inst2: "0",
      Inst3: "0",
      Term1: this.Term.toString(),
      Term2: "0",
      Term3: "0",
      Age1: this.Life1Age.toString(),
      Age2: this.Life2Age.toString(),
      HeightIn1: this.Life1HeightInch.toString(),
      HeightIn2: this.Life2HeightInch.toString(),
      WeightLbs1: this.Life1WeightLbs.toString(),
      WeightLbs2: this.Life2WeightLbs.toString(),
      DecisionLife1: "",
      DecisionLife2: "",
      Premium: this.PremiumWithPolicyFee.toString(),
      Rptdate: "",
      Channelcode: "",
      Contactno1: this.Life1ContactNo,
      Contactno2: this.Life2ContactNo,
      Email1: this.Life1Email,
      Email2: this.Life2Email,
      Nationality1: Life1Nationality,
      Nationality2: Life2Nationality,
      Hnbarefno1: "",
      Hnbarefno2: "",
      Rirefno1: "",
      Rirefno2: "",
      Combuffer: CompanyBuffer,
      Curawplr: this.CurrentAwplr.toString(),
      Addawplr: this.AdditionToAwplr.toString(),
      Termfixedrate: this.TermOfFixedInterest.toString(),
      Intoption: this.InterestRateType

    }

    console.log(obj);
    console.log(JSON.stringify(obj));
    this.proposalRegisterService.saveCustomerInfoToMRP(obj).subscribe((data: any) => {
      console.log("saveCustomerInfoToMRP Done");

      this.isLoading = false;

    },
      (err) => {
        // alert(err);
        console.log(err);

        this.isLoading = false;
        this.showError("Error while saving");
      },
      () => console.log('done'));
  }




  setDocumentPath = function (index, DocPath) {


    window.open(URL_CONST.HOSTED_URL_PREFIX + DocPath);

  }


}
