import { Component, OnInit, NgZone, Inject, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MomentModule } from 'angular2-moment';
import { UUID } from 'angular2-uuid';
import { NgUploaderOptions, UploadedFile, UploadRejected } from 'ngx-uploader';
import { CommonService } from '../../../shared/services/common/common.service';
import { QuotationService } from '../../../shared/services/quotation/quotation.service';
import { ProposalRegisterService } from '../../../shared/services/proposal-register/proposal-register.service';
import { AssureService } from '../../../shared/services/assure/assure.service';
import { ToastrService, ToastrConfig } from 'toastr-ng2';
import { INationality } from '../../../shared/models/nationality.model';
import { IBank } from '../../../shared/models/bank.model';
import { IBankBranch } from '../../../shared/models/bankBranch.model';
import { IProposalStatus } from '../../../shared/models/proposalStatus.model';
import { IQuotation } from '../../../shared/models/quotation.model';
import { IMain } from '../../../shared/models/main.model';
import { IMainSaveReturn } from '../../../shared/models/mainSaveRturn.model';
import { IAssureDetail } from '../../../shared/models/assureDetail.model';
import { IMrpProposalRegSave } from '../../../shared/models/mrpProposalRegSave.model';
import { IUploadDocType } from '../../../shared/models/uploadDocType.model';
import { ILoanType } from '../../../shared/models/loanType.model';
import { IUser } from '../../../shared/models/user/user.model';
import { COMMON_VALUES } from '../../../shared/config/commonValues';
import { URL_CONST } from '../../../shared/config/url.constants';
import { IProposalEmailSend } from '../../../shared/models/proposalEmailSend.model';

import { IMrpCustomerInfoSave } from '../../../shared/models/mrpCustomerInfoSave.model';
declare var $: any;
@Component({
  selector: 'app-proposal-register',
  templateUrl: './proposal-register.component.html',
  styleUrls: ['./proposal-register.component.css']
})
export class ProposalRegisterComponent implements OnInit {

  isLoading: boolean;

  isProposalDetailsValid: boolean = false;
  mode: string;
  User: IUser;

  SeqId: number = 0;
  JobNo: string = '';
  QuotationNo: string = '';
  RevisionNo: number = 0;
  ProposalNo: string = '';
  
  WorkflowJobNo: string = '';
  MedicalType: string;
  PolicyNo: string;
  LoanAmount: number;
  Interest: number;
  Term: number;
  FullTermInMonths: number;
  GracePeriod: number;
  CompanyBufferId: number;
  CurrentAwplr: number;
  AdditionToAwplr: number;
  TermOfFixedInterest: number;
  BankId: number;
  BankCode: string;
  BranchId: number;
  CurrencyId: number;
  InterestRateType: string;
  HnbaBranchCode: string;
  BrokerCode: number;
  ChannelCode: number;
  LoanTypeId: number;


  DiscountRate: number = 0;
  DiscountRemark: string = '';

  LoanTypeName: string = '';
  selectedLoanTypeId: number;
  Premium: number;
  PremiumWithPolicyFee: number;
  Status: string;
  UserId: string;
  ProposalSendingMethod: string;
  isProposalSendByFax: boolean = true;
  IsValidated: boolean = true;

  Life1MainSeqId: number;
  Life1AssureType: string = 'Life1';
  Life1Name: string;
  Life1Dob: string;
  Life1Age: number;
  Life1Gender: string;
  Life1Nic: string;
  LifeAss1NationalityId: number;
  LifeAss1Occupation: string;
  LifeAss1ContactNo: string;
  LifeAss1Email: string;
  LifeAss1Address: string;
  LifeAss1HeightCm: number;
  LifeAss1HeightInch: number;
  LifeAss1WeightKg: number;
  LifeAss1WeightLbs: number;
  Life1Bmi: number;
  Life1HnbaRefNo: string = '';
  Life1RiRefNo: string = '';
  Life1PrevPolicyAmount: number;
  Life1HealthExtraBasic: number;
  Life1HealthExtraTpd: number;
  Life1OccuExtraBasic: number;
  Life1OccuExtraTpd: number;
  Life1OccuExtraPerMileBasic: number;
  Life1OccuExtraPerMileTpd: number;
  Life1Discount: number;
  Life1Loadings: number;
  Life1IsAgeAdmitted: number;
  Life1IsSmoker: number;
  Life1IsFemaleRebate: number;
  Life1IsTpd: number;
  Life1TpdOption: number;
  Life1BmiResult: string = '';


  Life2MainSeqId: number;
  Life2AssureType: string = 'Life2';
  Life2Name: string;
  Life2Dob: string;
  Life2Age: number;
  Life2Gender: string;
  Life2Nic: string;
  LifeAss2NationalityId: number;
  LifeAss2Occupation: string;
  LifeAss2ContactNo: string;
  LifeAss2Email: string;
  LifeAss2Address: string;
  LifeAss2HeightCm: number;
  LifeAss2HeightInch: number;
  LifeAss2WeightKg: number;
  LifeAss2WeightLbs: number;
  Life2Bmi: number;
  Life2HnbaRefNo: string = '';
  Life2RiRefNo: string = '';
  Life2PrevPolicyAmount: number;
  Life2HealthExtraBasic: number;
  Life2HealthExtraTpd: number;
  Life2OccuExtraBasic: number;
  Life2OccuExtraTpd: number;
  Life2OccuExtraPerMileBasic: number;
  Life2OccuExtraPerMileTpd: number;
  Life2Discount: number;
  Life2Loadings: number;
  Life2IsAgeAdmitted: number;
  Life2IsSmoker: number;
  Life2IsFemaleRebate: number;
  Life2IsTpd: number;
  Life2TpdOption: number;
  Life2BmiResult: string = '';

  private loading: Object = {
    loading1: true,
    loading2: true,
    loading3: true,
    loading4: true
  }

  TempSeqId: string;
  UploadDocTypeId: number;

  nationalityList: Array<INationality> = [];
  bankList: Array<IBank> = [];
  bankBranchList: Array<IBankBranch> = [];
  loanTypeList: Array<ILoanType> = [];
  proposalStatusList: Array<IProposalStatus> = [];


  uploadDocTypeList: Array<IUploadDocType> = [];

  DocUploadUrl: any;

  datepickerOpts = {
    format: 'dd/mm/yyyy'
  }

  uploaderOptions: NgUploaderOptions;
  response: any;
  sizeLimit: number = 10000000; // 10MB
  previewData: any;
  errorMessage: string;
  inputUploadEvents: EventEmitter<string>;

  constructor(private commonService: CommonService, private quotationService: QuotationService,
    private assureService: AssureService,
    private proposalRegisterService: ProposalRegisterService, moment: MomentModule,
    private toastrService: ToastrService,
    toastrConfig: ToastrConfig,
    @Inject(NgZone) private zone: NgZone,
    public sanitizer: DomSanitizer, private router: Router) {

    toastrConfig.timeOut = 10000;
    toastrConfig.closeButton = true;
    toastrConfig.tapToDismiss = true;

    this.TempSeqId = UUID.UUID();

    //  // this.DocUploadUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL_CONST.URL_PREFIX + 'api/Main/UploadDocument');
    //     this.DocUploadUrl = 'http://localhost:46817/api/Main/UploadDocument';



    //     console.log('url - ' + this.DocUploadUrl);

    //     this.uploaderOptions = new NgUploaderOptions({
    //       url: this.DocUploadUrl,
    //       filterExtensions: true,
    //       allowedExtensions: ['jpg', 'pdf'],
    //       data: { },
    //       autoUpload: false,
    //       fieldName: 'file',
    //       fieldReset: true,
    //       maxUploads: 2,
    //       method: 'POST',
    //       previewUrl: true,
    //       withCredentials: false
    //     });

    this.inputUploadEvents = new EventEmitter<string>();

  }

  startUpload() {
    this.inputUploadEvents.emit('startUpload');
  }

  beforeUpload(uploadingFile: UploadedFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      this.errorMessage = 'File is too large!';
    }
  }

  handleUpload(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        // this.response = data;
        if (data && data.response) {
          // this.response = JSON.parse(data.response);
          console.log(JSON.parse(data.response));
          this.showSuccess("Document Successfully Uploaded.");

        }
      });
    });
  }

  handlePreviewData(data: any) {
    this.previewData = data;
  }

  ngOnInit() {
    this.User = JSON.parse(localStorage.getItem('currentMRPUser'));
    if (this.User.Password == COMMON_VALUES.COMMON_PWD) {
      this.router.navigate(['/', 'passwordChange']);
    }


    this.getUploadDocumentTypes();
    this.getBanks();

    this.getBankBranches();
    this.getLoanTypes();
    this.getNationalities();
    this.getProposalStatuses();
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

  getUploadDocumentTypes() {
    this.isLoading = true;
    this.commonService.getUploadDocType()
      .subscribe((data) => {
        this.uploadDocTypeList = data
        this.isLoading = false;

      },
        (err) => {
          console.log(err);

          this.isLoading = false;
          this.showError("Error loading Upload Document Types");

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

  onSelectOfUploadDocTypeId(docTypeId) {



    this.UploadDocTypeId = docTypeId;
    console.log('doc type-' + this.UploadDocTypeId);


    // this.DocUploadUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL_CONST.URL_PREFIX + 'api/Main/UploadDocument');
    // this.DocUploadUrl = 'http://localhost:46817/api/Main/UploadDocument?sTempSeqId=' + this.TempSeqId;
    this.DocUploadUrl = URL_CONST.URL_PREFIX + 'api/Main/UploadDocument?sTempSeqId=' + this.TempSeqId;



    console.log('url - ' + this.DocUploadUrl);

    this.uploaderOptions = new NgUploaderOptions({
      url: this.DocUploadUrl,
      filterExtensions: true,
      allowedExtensions: ['jpg', 'pdf'],
      data: { tempSeqId: this.TempSeqId, docTypeId: this.UploadDocTypeId },
      autoUpload: false,
      fieldName: 'file',
      fieldReset: true,
      maxUploads: 2,
      method: 'POST',
      previewUrl: true,
      withCredentials: false
    });


    console.log('options - ' + JSON.stringify(this.uploaderOptions));
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



  onSelectOfBankBranchId(bankBranchId) {

    this.BankCode = this.bankBranchList.filter(item => item.BankBranchId == bankBranchId)[0]['BankCode'];

  }


  public clearFields() {
    this.SeqId = 0;
    this.JobNo = '';
    //this.QuotationNo= '';
    this.RevisionNo = 0;
    // this.ProposalNo = '';
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
    this.LoanTypeId = 0;
    this.LoanTypeName = '';
    this.selectedLoanTypeId = 0;
    this.Premium = 0;
    this.PremiumWithPolicyFee = 0;
    this.Status = '';
    this.UserId = '';
    this.ProposalSendingMethod = '';
    this.isProposalSendByFax = true;
    this.Life1MainSeqId = 0;
    this.Life1AssureType = COMMON_VALUES.LIFE_ASSURE_TYPE_1;
    this.Life1Name = '';
    this.Life1Dob = '';
    this.Life1Age = 0;
    this.Life1Gender = '';
    this.Life1Nic = '';
    this.LifeAss1NationalityId = 0;
    this.LifeAss1Occupation = '';
    this.LifeAss1ContactNo = '';
    this.LifeAss1Email = '';
    this.LifeAss1Address = '';
    this.LifeAss1HeightCm = 0;
    this.LifeAss1HeightInch = 0;
    this.LifeAss1WeightKg = 0;
    this.LifeAss1WeightLbs = 0;
    this.Life1Bmi = 0;
    this.Life1HnbaRefNo = '';
    this.Life1RiRefNo = '';
    this.Life1PrevPolicyAmount = 0;
    this.Life1HealthExtraBasic = 0;
    this.Life1HealthExtraTpd = 0;
    this.Life1OccuExtraBasic = 0;
    this.Life1OccuExtraTpd = 0;
    this.Life1OccuExtraPerMileBasic = 0;
    this.Life1OccuExtraPerMileTpd = 0;
    this.Life1Discount = 0;
    this.Life1Loadings = 0;
    this.Life1IsAgeAdmitted = 0;
    this.Life1IsSmoker = 0;
    this.Life1IsFemaleRebate = 0;
    this.Life1IsTpd = 0;
    this.Life1TpdOption = 0;
    this.Life1BmiResult = '';

    this.Life2MainSeqId = 0;
    this.Life2AssureType = COMMON_VALUES.LIFE_ASSURE_TYPE_2;
    this.Life2Name = '';
    this.Life2Dob = '';
    this.Life2Age = 0;
    this.Life2Gender = '';
    this.Life2Nic = '';
    this.LifeAss2NationalityId = 0;
    this.LifeAss2Occupation = '';
    this.LifeAss2ContactNo = '';
    this.LifeAss2Email = '';
    this.LifeAss2Address = '';
    this.LifeAss2HeightCm = 0;
    this.LifeAss2HeightInch = 0;
    this.LifeAss2WeightKg = 0;
    this.LifeAss2WeightLbs = 0;
    this.Life2Bmi = 0;
    this.Life2HnbaRefNo = '';
    this.Life2RiRefNo = '';
    this.Life2PrevPolicyAmount = 0;
    this.Life2HealthExtraBasic = 0;
    this.Life2HealthExtraTpd = 0;
    this.Life2OccuExtraBasic = 0;
    this.Life2OccuExtraTpd = 0;
    this.Life2OccuExtraPerMileBasic = 0;
    this.Life2OccuExtraPerMileTpd = 0;
    this.Life2Discount = 0;
    this.Life2Loadings = 0;
    this.Life2IsAgeAdmitted = 0;
    this.Life2IsSmoker = 0;
    this.Life2IsFemaleRebate = 0;
    this.Life2IsTpd = 0;
    this.Life2TpdOption = 0;
    this.Life2BmiResult = '';




  }

  public LoadFromQuotationNo() {

    this.clearFields();
    this.ProposalNo = '';
    
    this.WorkflowJobNo = '';


    if (this.QuotationNo != null && this.QuotationNo != "") {
      this.checkAndLoadQuotationDetailsFromQuotationNo(this.QuotationNo);
    } else {
      this.showWarning("Please enter Quotation No. to load");
    }
  }



  checkAndLoadQuotationDetailsFromQuotationNo(quotationNo) {

    this.clearFields();
    this.isLoading = true;

    this.validateAndLoadDetails(quotationNo);


    // this.quotationService.checkIsLoanTypeMRPStandard(quotationNo)
    //   .subscribe((data) => {
    //     if (data == "false") {
    //       this.showError("Only MRP STD (Home Loans) allowed here");
    //     } else {
    //       this.validateAndLoadDetails(quotationNo);

    //     }


    //     this.isLoading = false;
    //   },
    //   (err) => {
    //     console.log(err);

    //     this.isLoading = false;
    //     this.showError("Error loading quotation details");

    //   });








  }


  validateAndLoadDetails(quotationNo) {
    this.quotationService.checkQuotationAlreadyProcessed(quotationNo)
      .subscribe((data) => {
        if (data == "false") {

          this.loadQuotationDetailsFromQuotationNo(quotationNo);
        } else {

          this.showError("This quotation no already processed");

        }


        this.isLoading = false;
      },
        (err) => {
          console.log(err);

          this.isLoading = false;
          this.showError("Error loading quotation details");

        });

  }

  loadQuotationDetailsFromQuotationNo(quotationNo) {

    this.isLoading = true;
    this.quotationService.getQuotationByQuotationId(quotationNo)
      .subscribe((data) => {
        console.log(data);

        let obj: IQuotation = JSON.parse(data);


        this.LoanAmount = obj.LoanAmount;
        this.Interest = obj.FixedInterest;
        this.Term = 0;
        this.FullTermInMonths = obj.FullTermOfLoanMonthly;
        this.GracePeriod = 0;
        this.CompanyBufferId = obj.CompanyBufferId;
        this.CurrentAwplr = obj.CurrentAwplr;
        this.AdditionToAwplr = obj.AdditionalToAwplr;
        this.TermOfFixedInterest = obj.TermOfFixedInterest;
        this.BankId = obj.BankId;
        this.BranchId = obj.BankBranchId;

        this.onSelectOfBankId(this.BankId);
        this.onSelectOfBankBranchId(this.BranchId);
        this.CurrencyId = 0;
        this.InterestRateType = '';
        this.HnbaBranchCode = obj.HnbaBranchCode;
        this.BrokerCode = 0;
        this.ChannelCode = 0;
        this.LoanTypeId = obj.LoanTypeId;
        this.selectedLoanTypeId = obj.LoanTypeId;


        var moment = require('moment');
        var momentDateLife1Dob = moment(obj.LifeAss1Dob.substr(0, 10), 'DD/MM/YYYY').toDate();

        this.Life1Name = obj.LifeAss1Name;

        this.Life1Dob = momentDateLife1Dob;
        this.Life1Age = obj.LifeAss1Age;
        this.Life1Gender = obj.LifeAss1Gender;
        this.Life1Nic = obj.LifeAss1Nic;

        this.Life2Name = obj.LifeAss2Name;

        console.log('sss' + obj.LifeAss2Dob);

        var momentDateLife2Dob = moment(obj.LifeAss2Dob.substr(0, 10), 'DD/MM/YYYY').toDate();

        console.log('momentDateLife2Dobsss' + momentDateLife2Dob);
        this.Life2Dob = momentDateLife2Dob;
        this.Life2Age = obj.LifeAss2Age;
        this.Life2Gender = obj.LifeAss2Gender;
        this.Life2Nic = obj.LifeAss2Nic;
        this.DiscountRate = obj.DiscountRate;
        this.DiscountRemark = obj.DiscountRemark;

        this.Premium = obj.Premium;
        this.PremiumWithPolicyFee = obj.PremiumWithPolicyFee;

        this.isLoading = false;

      },
        (err) => {
          console.log(err);

          this.isLoading = false;
          this.showError("Error loading quotation details");

        });
  }


  public validateFields() {
    this.isProposalDetailsValid = true;


    // if (this.LifeAss1Name == "") {
    //   this.LifeAss1NameClass = "has-error";
    //   this.isQuotationDetailsValid = false;
    // }

    // if (this.LifeAss1Dob == null) {
    //   this.LifeAss1DobClass = "has-error";
    //   this.isQuotationDetailsValid = false;
    // }

    // if (this.LifeAss1Age == null) {
    //   this.LifeAss1AgeClass = "has-error";
    //   this.isQuotationDetailsValid = false;
    // }

    // if (this.LifeAss1Gender == null || this.LifeAss1Gender == "") {
    //   this.LifeAss1GenderClass = "has-error";
    //   this.isQuotationDetailsValid = false;
    // }

    // if (this.LifeAss1Nic == "") {
    //   this.LifeAss1NicClass = "has-error";
    //   this.isQuotationDetailsValid = false;
    // }

    // if (this.LoanAmount == null) {
    //   this.LoanAmountClass = "has-error";
    //   this.isQuotationDetailsValid = false;
    // }

    // if (this.TermOfFixederest == null) {
    //   this.TermClass = "has-error";
    //   this.isQuotationDetailsValid = false;
    // }

    // if (this.FixedInterest == null) {
    //   this.FixedInterestClass = "has-error";
    //   this.isQuotationDetailsValid = false;
    // }

    // if (this.LoanTypeId == null) {
    //   this.LoanTypeIdClass = "has-error";
    //   this.isQuotationDetailsValid = false;
    // }
    // if (this.HnbaBranchCode == "") {
    //   this.BranchCodeClass = "has-error";
    //   this.isQuotationDetailsValid = false;
    // }

  }

  public Test() {

  }

  public SaveProposal() {

    if (this.isProposalSendByFax) {
      this.ProposalSendingMethod = "fax";
    } else {

      this.ProposalSendingMethod = "upload";
    }


    this.validateFields();
    console.log(this.isProposalDetailsValid);
    if (this.isProposalDetailsValid) {
      this.isLoading = true;

      document.getElementById('openProposalNoModalButton').click();



      this.isLoading = false;



      let proposalObj: IMain = {
        TempMainSeqId: this.TempSeqId,
        SeqId: 0,
        JobNo: '',
        QuotationNo: this.QuotationNo,
        RevisionNo: 0,
        ProposalNo: this.ProposalNo,
        MedicalType: '',
        PolicyNo: '',
        LoanAmount: this.LoanAmount,
        Interest: this.Interest,
        Term: this.Term,
        FullTermInMonths: this.FullTermInMonths,
        GracePeriod: 0,
        CompanyBufferId: this.CompanyBufferId,
        CurrentAwplr: this.CurrentAwplr,
        AdditionToAwplr: this.AdditionToAwplr,
        TermOfFixedInterest: this.TermOfFixedInterest,
        BankId: this.BankId,
        BranchId: this.BranchId,
        CurrencyId: 0,
        InterestRateType: '',
        HnbaBranchCode: this.HnbaBranchCode,
        BrokerCode: 0,
        ChannelCode: 0,
        IsReInsurance: 0,
        LoanTypeId: this.LoanTypeId,
        ReInsCompanyId: 0,
        ExchangeRate: 0,
        DateOfCommence: '01/01/1970',
        DateOfProposal: '01/01/1970',
        Premium: this.Premium,
        PremiumWithPolicyFee: this.PremiumWithPolicyFee,
        Status: this.Status,
        UserId: this.User.UserName,
        ProposalSendingMethod: this.ProposalSendingMethod,
        SystemDate: '01/01/1970',
        IsValidated: 0,
        Life1HnbaRefNo: '',
        Life1RiRefNo: '',
        Life1HealthExtraBasic: 0,
        Life1HealthExtraTpd: 0,
        Life1OccuExtraBasic: 0,
        Life1OccuExtraTpd: 0,
        Life1OccuExtraPmileBasic: 0,
        Life1OccuExtraPmileTpd: 0,
        Life1Discount: 0,
        Life1Loadings: 0,
        Life1IsTpd: 0,
        Life1TpdOption: 0,
        Life2HnbaRefNo: '',
        Life2RiRefNo: '',
        Life2HealthExtraBasic: 0,
        Life2HealthExtraTpd: 0,
        Life2OccuExtraBasic: 0,
        Life2OccuExtraTpd: 0,
        Life2OccuExtraPMileBasic: 0,
        Life2OccuExtraPMileTpd: 0,
        Life2Discount: 0,
        Life2Loadings: 0,
        Life2IsTpd: 0,
        Life2TpdOption: 0,
        LifeAssure1Id: 0,
        LifeAssure2Id: 0

      }


      var moment = require('moment');
      var formatted_dob_life1 = moment(this.Life1Dob).format('DD/MM/YYYY');


      let assure1Obj: IAssureDetail = {
        SeqId: 0,
        AssureType: this.Life1AssureType,
        Name: this.Life1Name,
        DOB: formatted_dob_life1,
        Age: this.Life1Age,
        Gender: this.Life1Gender,
        NIC: this.Life1Nic,
        NationalityId: this.LifeAss1NationalityId,
        Occupation: this.LifeAss1Occupation,
        ContactNo: this.LifeAss1ContactNo,
        Email: this.LifeAss1Email,
        Address: this.LifeAss1Address,
        HeightCm: this.LifeAss1HeightCm,
        HeightInch: this.LifeAss1HeightInch,
        WeightKg: this.LifeAss1WeightKg,
        WeightLbs: this.LifeAss1WeightLbs,
        BMI: this.Life1Bmi,
        PreviousPolicyAmount: 0,
        IsAgeAdmitted: this.Life1IsAgeAdmitted,
        IsSmoker: this.Life1IsSmoker,
        IsFemaleRebate: this.Life1IsFemaleRebate,
        IsVIP: 0,
        RegisterDate: '01/01/1970'

      }



      var formatted_dob_life2 = moment(this.Life2Dob).format('DD/MM/YYYY');

      let assure2Obj: IAssureDetail = {
        SeqId: 0,
        AssureType: this.Life2AssureType,
        Name: this.Life2Name,
        DOB: formatted_dob_life2,
        Age: this.Life2Age,
        Gender: this.Life2Gender,
        NIC: this.Life2Nic,
        NationalityId: this.LifeAss2NationalityId,
        Occupation: this.LifeAss2Occupation,
        ContactNo: this.LifeAss2ContactNo,
        Email: this.LifeAss2Email,
        Address: this.LifeAss2Address,
        HeightCm: this.LifeAss2HeightCm,
        HeightInch: this.LifeAss2HeightInch,
        WeightKg: this.LifeAss2WeightKg,
        WeightLbs: this.LifeAss2WeightLbs,
        BMI: this.Life2Bmi,
        PreviousPolicyAmount: 0,
        IsAgeAdmitted: this.Life2IsAgeAdmitted,
        IsSmoker: this.Life2IsSmoker,
        IsFemaleRebate: this.Life2IsFemaleRebate,
        IsVIP: 0,
        RegisterDate: '01/01/1970'

      }


      let mainData: any = {};
      mainData.proposalData = proposalObj;
      mainData.assure1Data = assure1Obj;
      mainData.assure2Data = assure2Obj;



      this.proposalRegisterService.saveProposalDetails(mainData).subscribe((data: any) => {
 
        this.loading['loading1'] = false;

        let obj: IMainSaveReturn = JSON.parse(data);

        this.SeqId = obj.SeqId;
        this.JobNo = obj.JobNo;
        this.ProposalNo=obj.ProposalNo;
        this.WorkflowJobNo=obj.WorkflowJobNo;



        this.showSuccess("Proposal Successfully Saved. Job  Number is " + this.JobNo);



        // this.SaveDataToMRP();

      },
        (err) => {
          // alert(err);
          console.log(err);

          this.isLoading = false;
          this.showError("Error while saving Proposal.");
        },
        () => console.log('done'));
    }






  }

  // public SaveProposal() {

  //   if (this.isProposalSendByFax) {
  //     this.ProposalSendingMethod = "fax";
  //   } else {

  //     this.ProposalSendingMethod = "upload";
  //   }


  //   this.validateFields();
  //   console.log(this.isProposalDetailsValid);
  //   if (this.isProposalDetailsValid) {
  //     this.isLoading = true;

  //     console.log('bank   -' + this.BankId);


  //     console.log('bank code   - ' + this.BankCode);


  //     console.log('pro no 0 - ' + this.ProposalNo);

  //     document.getElementById('openProposalNoModalButton').click();
  //     this.proposalRegisterService.generateProposalNo(this.BankCode).subscribe((data: any) => {

  //       console.log('data   = ' + data);
  //       this.ProposalNo = data.toString().replace(/"/g, '');

  //       if (this.ProposalNo == '' || this.ProposalNo == null) {


  //         this.showError("Error while generating proposal No");
  //         return;


  //       } else {
  //         console.log('pro no - ' + this.ProposalNo);
  //         this.isLoading = false;
  //         let obj: IMain = {
  //           TempSeqId: this.TempSeqId,
  //           SeqId: 0,
  //           JobNo: '',
  //           QuotationNo: this.QuotationNo,
  //           RevisionNo: 0,
  //           ProposalNo: this.ProposalNo,
  //           MedicalType: '',
  //           PolicyNo: '',
  //           LoanAmount: this.LoanAmount,
  //           Interest: this.Interest,
  //           Term: this.Term,
  //           FullTermInMonths: this.FullTermInMonths,
  //           GracePeriod: 0,
  //           CompanyBufferId: this.CompanyBufferId,
  //           CurrentAwplr: this.CurrentAwplr,
  //           AdditionToAwplr: this.AdditionToAwplr,
  //           TermOfFixedInterest: this.TermOfFixedInterest,
  //           BankId: this.BankId,
  //           BranchId: this.BranchId,
  //           CurrencyId: 0,
  //           InterestRateType: '',
  //           HnbaBranchCode: this.HnbaBranchCode,
  //           BrokerCode: 0,
  //           ChannelCode: 0,
  //           IsReInsurance: 0,
  //           LoanTypeId: this.LoanTypeId,
  //           ReInsCompanyId: 0,
  //           ExchangeRate: 0,
  //           DateOfCommence: '01/01/1970',
  //           DateOfProposal: '01/01/1970',
  //           Premium: this.Premium,
  //           PremiumWithPolicyFee: this.PremiumWithPolicyFee,
  //           Status: this.Status,
  //           UserId: this.User.UserName,
  //           ProposalSendingMethod: this.ProposalSendingMethod,
  //           RegisterDate: '01/01/1970',
  //           IsValidated: 0,
  //           IsVIP: 0
  //         }

  //         console.log(obj);
  //         console.log(JSON.stringify(obj));
  //         this.proposalRegisterService.saveProposalDetails(obj).subscribe((data: any) => {
  //           console.log('data    =' + data);

  //           this.loading['loading1'] = false;
  //           this.loadingComplete();

  //           let obj: IMainSaveReturn = JSON.parse(data);
  //           //  let obj: IMainSaveReturn = data.toString().replace(/"/g, '');

  //           this.SeqId = obj.SeqId;
  //           this.JobNo = obj.JobNo;
  //           console.log(' this.SeqId =' + this.SeqId);


  //           console.log(' this.JobNo =' + this.JobNo);

  //           this.showSuccess("Proposal Successfully Saved. Job  Number is " + this.JobNo);


  //           // this.SaveAssureDetails1();
  //           // if (this.Life2Name != "" && this.Life2Nic != "") {

  //           //   this.SaveAssureDetails2();
  //           // }


  //           // this.SaveDataToMRP();

  //         },
  //           (err) => {
  //             // alert(err);
  //             console.log(err);

  //             this.isLoading = false;
  //             this.showError("Error while saving Proposal.");
  //           },
  //           () => console.log('done'));
  //       }


  //     },
  //       (err) => {
  //         console.log(err);
  //         this.isLoading = false;
  //         this.showError("Error while generating proposal No");
  //       },
  //       () => console.log('done'));







  //   }

  // }



  // public SaveAssureDetails1() {


  //   this.isLoading = true;


  //   var moment = require('moment');
  //   var formatted_dob_life1 = moment(this.Life1Dob).format('DD/MM/YYYY');

  //   let obj: IAssureDetail = {
  //     SeqId: 0,
  //     MainSeqId: this.SeqId,
  //     AssureType: this.Life1AssureType,
  //     Name: this.Life1Name,
  //     Dob: formatted_dob_life1,
  //     Age: this.Life1Age,
  //     Gender: this.Life1Gender,
  //     Nic: this.Life1Nic,
  //     NationalityId: this.LifeAss1NationalityId,
  //     Occupation: this.LifeAss1Occupation,
  //     ContactNo: this.LifeAss1ContactNo,
  //     Email: this.LifeAss1Email,
  //     Address: this.LifeAss1Address,
  //     HeightCm: this.LifeAss1HeightCm,
  //     HeightInch: this.LifeAss1HeightInch,
  //     WeightKg: this.LifeAss1WeightKg,
  //     WeightLbs: this.LifeAss1WeightLbs,
  //     Bmi: this.Life1Bmi,
  //     HnbaRefNo: this.Life1HnbaRefNo,
  //     ReInsuranceRefNo: this.Life1RiRefNo,
  //     PreviousPolicyAmount: this.Life1PrevPolicyAmount,
  //     HealthExtraBasic: this.Life1HealthExtraBasic,
  //     HealthExtraTpd: this.Life1HealthExtraTpd,
  //     OccupationExtraBasic: this.Life1OccuExtraBasic,
  //     OccupationExtraTpd: this.Life1OccuExtraTpd,
  //     OccupationExtraPerMileBasic: this.Life1OccuExtraPerMileBasic,
  //     OccupationExtraPerMileTpd: this.Life1OccuExtraPerMileTpd,
  //     Discount: this.Life1Discount,
  //     Loadings: this.Life1Loadings,
  //     IsAgeAdmitted: this.Life1IsAgeAdmitted,
  //     IsSmoker: this.Life1IsSmoker,
  //     IsFemaleRebate: this.Life1IsFemaleRebate,
  //     IsTpd: this.Life1IsTpd,
  //     TpdOption: this.Life1TpdOption,
  //     RegisterDate: '01/01/1970'

  //   }

  //   console.log(obj);
  //   console.log(JSON.stringify(obj));
  //   this.assureService.saveAssureDetails(obj).subscribe((data: any) => {
  //     console.log(data);


  //     this.loading['loading2'] = false;
  //     this.loadingComplete();

  //     if (data.status == 200) {

  //       this.showSuccess(" Assure 1 Details Successfully Saved.");
  //     } else {
  //       this.showError("Error while saving Assure 1 Details.");


  //     }
  //   },
  //     (err) => {
  //       // alert(err);
  //       console.log(err);

  //       this.isLoading = false;
  //       this.showError("Error while saving Assure 1 Details.");
  //     },
  //     () => console.log('done'));


  // }

  // public SaveAssureDetails2() {


  //   this.isLoading = true;

  //   var moment = require('moment');
  //   var formatted_dob_life2 = moment(this.Life2Dob).format('DD/MM/YYYY');

  //   let obj: IAssureDetail = {
  //     SeqId: 0,
  //     MainSeqId: this.SeqId,
  //     AssureType: this.Life2AssureType,
  //     Name: this.Life2Name,
  //     Dob: formatted_dob_life2,
  //     Age: this.Life2Age,
  //     Gender: this.Life2Gender,
  //     Nic: this.Life2Nic,
  //     NationalityId: this.LifeAss2NationalityId,
  //     Occupation: this.LifeAss2Occupation,
  //     ContactNo: this.LifeAss2ContactNo,
  //     Email: this.LifeAss2Email,
  //     Address: this.LifeAss2Address,
  //     HeightCm: this.LifeAss2HeightCm,
  //     HeightInch: this.LifeAss2HeightInch,
  //     WeightKg: this.LifeAss2WeightKg,
  //     WeightLbs: this.LifeAss2WeightLbs,
  //     Bmi: this.Life2Bmi,
  //     HnbaRefNo: this.Life2HnbaRefNo,
  //     ReInsuranceRefNo: this.Life2RiRefNo,
  //     PreviousPolicyAmount: this.Life2PrevPolicyAmount,
  //     HealthExtraBasic: this.Life2HealthExtraBasic,
  //     HealthExtraTpd: this.Life2HealthExtraTpd,
  //     OccupationExtraBasic: this.Life2OccuExtraBasic,
  //     OccupationExtraTpd: this.Life2OccuExtraTpd,
  //     OccupationExtraPerMileBasic: this.Life2OccuExtraPerMileBasic,
  //     OccupationExtraPerMileTpd: this.Life2OccuExtraPerMileTpd,
  //     Discount: this.Life2Discount,
  //     Loadings: this.Life2Loadings,
  //     IsAgeAdmitted: this.Life2IsAgeAdmitted,
  //     IsSmoker: this.Life2IsSmoker,
  //     IsFemaleRebate: this.Life2IsFemaleRebate,
  //     IsTpd: this.Life2IsTpd,
  //     TpdOption: this.Life2TpdOption,
  //     RegisterDate: '01/01/1970'

  //   }

  //   console.log(obj);
  //   console.log(JSON.stringify(obj));
  //   this.assureService.saveAssureDetails(obj).subscribe((data: any) => {
  //     console.log(data);


  //     if (data.status == 200) {
  //       this.showError("Error while saving Assure 2 Details.");
  //     } else {
  //       this.showSuccess(" Assure 2 Details Successfully Saved.");


  //     }
  //   },
  //     (err) => {
  //       // alert(err);
  //       console.log(err);

  //       this.isLoading = false;
  //       this.showError("Error while saving Assure 2 Details.");
  //     },
  //     () => console.log('done'));


  // }

  private valueChangeHeightCm1(height) {
    if (this.LifeAss1HeightCm != null && this.LifeAss1WeightKg != null) {

      this.LifeAss1HeightInch = Number((height * 0.3937008).toFixed(2));
      this.Life1Bmi = this.calculateBMI(this.LifeAss1HeightCm, this.LifeAss1WeightKg);

      if (this.Life1Bmi > 0) {
        if (this.Life1Bmi <= 18) {
          this.Life1BmiResult = "Under Weight";
        } else if (this.Life1Bmi > 18 && this.Life1Bmi <= 30) {
          this.Life1BmiResult = "STD";
        } else if (this.Life1Bmi > 30) {
          this.Life1BmiResult = "Over Weight";
        }
      }
    }

  }
  private valueChangeWeightKg1(weight) {
    if (this.LifeAss1HeightCm != null && this.LifeAss1WeightKg != null) {

      this.LifeAss1WeightLbs = Number((weight * 2.20462).toFixed(2));
      this.Life1Bmi = this.calculateBMI(this.LifeAss1HeightCm, this.LifeAss1WeightKg);

      if (this.Life1Bmi > 0) {
        if (this.Life1Bmi <= 18) {
          this.Life1BmiResult = "Under Weight";
        } else if (this.Life1Bmi > 18 && this.Life1Bmi <= 30) {
          this.Life1BmiResult = "STD";
        } else if (this.Life1Bmi > 30) {
          this.Life1BmiResult = "Over Weight";
        }
      }
    }
  }

  private valueChangeHeightCm2(height) {
    if (this.LifeAss2HeightCm != null && this.LifeAss2WeightKg != null) {
      this.LifeAss2HeightInch = Number((height * 0.3937008).toFixed(2));
      this.Life2Bmi = this.calculateBMI(this.LifeAss2HeightCm, this.LifeAss2WeightKg);

      if (this.Life2Bmi > 0) {
        if (this.Life2Bmi <= 18) {
          this.Life2BmiResult = "Under Weight";
        } else if (this.Life2Bmi > 18 && this.Life2Bmi <= 30) {
          this.Life2BmiResult = "STD";
        } else if (this.Life2Bmi > 30) {
          this.Life2BmiResult = "Over Weight";
        }
      }

    }
  }

  private valueChangeWeightKg2(weight) {
    if (this.LifeAss2HeightCm != null && this.LifeAss2WeightKg != null) {
      this.LifeAss2HeightInch = Number((weight * 2.20462).toFixed(2));
      this.Life2Bmi = this.calculateBMI(this.LifeAss2HeightCm, this.LifeAss2WeightKg);
      if (this.Life2Bmi > 0) {
        if (this.Life2Bmi <= 18) {
          this.Life2BmiResult = "Under Weight";
        } else if (this.Life2Bmi > 18 && this.Life2Bmi <= 30) {
          this.Life2BmiResult = "STD";
        } else if (this.Life2Bmi > 30) {
          this.Life2BmiResult = "Over Weight";
        }
      }
    }
  }

  private calculateBMI(height, weight): any {

    // console.log('height = ' + height);
    // console.log('weight = ' + weight);
    var finalBmi = weight / (height / 100 * height / 100)
    // console.log('BMI = ' + finalBmi.toFixed(2));

    return finalBmi.toFixed(2);

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
      DiscountRate: this.DiscountRate.toString()
    }

    console.log(obj);
    console.log(JSON.stringify(obj));
    this.proposalRegisterService.updateProposalToMRP(obj).subscribe((data: any) => {

      console.log("updateProposalToMRP Done");


      this.loading['loading3'] = false;

      this.loadingComplete();


      if (data.status == 200) {

        this.showSuccess("Data Successfully Saved to MRP.");
        this.SaveCustomerDataToMRP();


      } else {

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

    if (this.LifeAss1NationalityId > 0) {
      Life1Nationality = this.nationalityList.filter(item => item.Id == this.LifeAss1NationalityId)[0]['Adjective'];
    }
    if (this.LifeAss2NationalityId > 0) {
      Life2Nationality = this.nationalityList.filter(item => item.Id == this.LifeAss2NationalityId)[0]['Adjective'];
    }






    let obj: IMrpCustomerInfoSave = {
      NIC1: this.Life1Nic,
      NIC2: this.Life2Nic,
      Life1: this.Life1Name,
      Life2: this.Life2Name,
      LifeDOB1: this.Life1Dob,
      LifeDOB2: this.Life2Dob,
      addrs: this.LifeAss1Address,
      Height1: this.LifeAss1HeightCm.toString(),
      Height2: this.LifeAss2HeightCm.toString(),
      Weight1: this.LifeAss1WeightKg.toString(),
      Weight2: this.LifeAss2WeightKg.toString(),
      Sex1: this.Life1Gender,
      Sex2: this.Life2Gender,
      Occupt1: this.LifeAss1Occupation,
      Occupt2: this.LifeAss2Occupation,
      PropNo: this.ProposalNo,
      LoanAmt1: this.LoanAmount.toString(),
      LoanAmt2: "0",
      LoanAmt3: "0",
      Inst1: this.Interest.toString(),
      Inst2: "0",
      Inst3: "0",
      Term1: this.Term.toString(),
      Term2: "0",
      Term3: "0",
      Age1: this.Life1Age.toString(),
      Age2: this.Life2Age.toString(),
      HeightIn1: this.LifeAss1HeightInch.toString(),
      HeightIn2: this.LifeAss2HeightInch.toString(),
      WeightLbs1: this.LifeAss1WeightLbs.toString(),
      WeightLbs2: this.LifeAss2WeightLbs.toString(),
      DecisionLife1: "",
      DecisionLife2: "",
      Premium: this.PremiumWithPolicyFee.toString(),
      Rptdate: "",
      Channelcode: "",
      Contactno1: this.LifeAss1ContactNo,
      Contactno2: this.LifeAss2ContactNo,
      Email1: this.LifeAss1Email,
      Email2: this.LifeAss2Email,
      Nationality1: Life1Nationality,
      Nationality2: Life2Nationality,
      Hnbarefno1: "",
      Hnbarefno2: "",
      Rirefno1: "",
      Rirefno2: "",
      Combuffer: "0",
      Curawplr: this.CurrentAwplr.toString(),
      Addawplr: this.AdditionToAwplr.toString(),
      Termfixedrate: this.TermOfFixedInterest.toString(),
      Intoption: this.InterestRateType

    }

    console.log(obj);
    console.log(JSON.stringify(obj));
    this.proposalRegisterService.saveCustomerInfoToMRP(obj).subscribe((data: any) => {
      console.log("saveCustomerInfoToMRP Done");

      this.SendMail();
      this.loading['loading4'] = false;

      this.loadingComplete();

      this.clearFields();

      this.QuotationNo = '';
    },
      (err) => {
        // alert(err);
        console.log(err);

        this.isLoading = false;
        this.showError("Error while saving");
      },
      () => console.log('done'));


  }

  public test() {
    // $("#proposalNoModal").modal('show');

    // $("#proposalNoModal").open();
    // document.getElementById("openProposalNoModalButton").click();

    document.getElementById('openProposalNoModalButton').click();
  }

  public SendMail() {
    console.log('rrrr');
    console.log('seeee ' + this.SeqId);

    let BankName = this.bankList.filter(item => item.BankId == this.BankId)[0]['BankName'];
    let BankBranchName = this.bankBranchList.filter(item => item.BankBranchId == this.BranchId)[0]['BankBranchName'];


    let obj: IProposalEmailSend = {


      SeqId: this.SeqId,
      LifeAss1Name: this.Life1Name,
      LifeAss2Name: this.Life2Name,
      LifeAss1Nic: this.Life1Nic,
      LifeAss2Nic: this.Life2Nic,
      BankName: BankName,
      BankBranch: BankBranchName,
      ProposalNo: this.ProposalNo,
      EmailAddresses: COMMON_VALUES.CUSTOMER_CARE_EMAIL,
      SenderUserCode: this.User.UserName
    }



    this.isLoading = true;

    this.proposalRegisterService.SendProposalAsEmail(obj).subscribe((data: any) => {
      console.log(data);


      if (data.status == 200) {
        this.showSuccess("Proposal Successfully E-mailed. ");
      }
      this.isLoading = false;
    },
      (err) => {
        console.log(err);

        this.isLoading = false;
        this.showError("Error sending proposal");
      },
      () => console.log('done'));

  }

  loadingComplete() {

    if (!this.loading['loading1'] && !this.loading['loading2'] && !this.loading['loading3'] && !this.loading['loading4']) {

      this.isLoading = false;
    }

  }




}



