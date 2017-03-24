import { Component, OnInit } from '@angular/core';

import { MomentModule } from 'angular2-moment';

import { CommonService } from '../../../shared/services/common/common.service';

import { QuotationService } from '../../../shared/services/quotation/quotation.service';

import { ProposalRegisterService } from '../../../shared/services/proposal-register/proposal-register.service';

import { ToastrService, ToastrConfig } from 'toastr-ng2';
import { INationality } from '../../../shared/models/nationality.model';
import { IBank } from '../../../shared/models/bank.model';
import { IBankBranch } from '../../../shared/models/bankBranch.model';
import { IProposalStatus } from '../../../shared/models/proposalStatus.model';

import { IQuotation } from '../../../shared/models/quotation.model';
import { IMain } from '../../../shared/models/main.model';

import { ILoanType } from '../../../shared/models/loanType.model';
import { IUser } from '../../../shared/models/user/user.model';
import { COMMON_VALUES } from '../../../shared/config/commonValues';


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
  BranchId: number;
  CurrencyId: number;
  InterestRateType: string;
  HnbaBranchCode: string;
  BrokerCode: string;
  ChannelCode: number;
  LoanTypeId: number;

  LoanTypeName: string = '';
  selectedLoanTypeId: number;
  Premium: number;
  PremiumWithPolicyFee: number;
  Status: string;
  UserId: string;
  ProposalSendingMethod: string;
  isProposalSendByFax: boolean = true;

  Life1MainSeqId: number;
  Life1AssureType: string = 'Life1';
  Life1Name: string;
  Life1Dob: Date;
  Life1Age: number;
  Life1Gender: string;
  Life1Nic: string;
  Life1NationalityId: number;
  Life1Occupation: string;
  Life1ContactNo: string;
  Life1Email: string;
  Life1Address: string;
  Life1HeightCm: number;
  Life1HeightInch: number;
  Life1WeightKg: number;
  Life1WeightLbs: number;
  Life1Bmi: number;
  Life1HnbaRefNo: string;
  Life1RiRefNo: string;
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

  Life2MainSeqId: number;
  Life2AssureType: string = 'Life2';
  Life2Name: string;
  Life2Dob: Date;
  Life2Age: number;
  Life2Gender: string;
  Life2Nic: string;
  Life2NationalityId: number;
  Life2Occupation: string;
  Life2ContactNo: string;
  Life2Email: string;
  Life2Address: string;
  Life2HeightCm: number;
  Life2HeightInch: number;
  Life2WeightKg: number;
  Life2WeightLbs: number;
  Life2Bmi: number;
  Life2HnbaRefNo: string;
  Life2RiRefNo: string;
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


  nationalityList: Array<INationality> = [];
  bankList: Array<IBank> = [];
  bankBranchList: Array<IBankBranch> = [];
  loanTypeList: Array<ILoanType> = [];
  proposalStatusList: Array<IProposalStatus> = [];




  constructor(private commonService: CommonService, private quotationService: QuotationService, private proposalRegisterService:ProposalRegisterService,moment: MomentModule,
    private toastrService: ToastrService,
    toastrConfig: ToastrConfig) {

    toastrConfig.timeOut = 0;
    toastrConfig.closeButton = true;
    toastrConfig.tapToDismiss = true;
  }

  ngOnInit() {
    this.User = JSON.parse(localStorage.getItem('currentMRPUser'));


    this.getBanks();
    this.getLoanTypes();
    this.getNationalities();
    this.getProposalStatuses();
    this.QuotationNo = '17MAMT00005';
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

  onSelectOfBankId(bankId) {
    this.commonService.getBankBranchByBankId(bankId)
      .subscribe((data) => { this.bankBranchList = data },
      (err) => {
        console.log(err);

        this.isLoading = false;
        this.showError("Error loading Bank Branches");

      });
  }




  public LoadFromQuotationNo() {
    if (this.QuotationNo != null && this.QuotationNo != "") {
      this.loadQuotationDetailsFromQuotationNo(this.QuotationNo);
    } else {
      this.showWarning("Please enter Quotation No. to load");
    }
  }



  loadQuotationDetailsFromQuotationNo(quotationNo) {
    this.quotationService.getQuotationByQuotationId(quotationNo)
      .subscribe((data) => {
        console.log(data);

        let obj: IQuotation = JSON.parse(data);


        this.LoanAmount = obj.LoanAmount;
        this.Interest = obj.FixedInterest;
        this.Term = obj.Term;
        this.FullTermInMonths = obj.TermOfFixederest;
        this.GracePeriod = 0;
        this.CompanyBufferId = obj.CompanyBufferId;
        this.CurrentAwplr = obj.CurrentAwplr;
        this.AdditionToAwplr = obj.AdditionalToAwplr;
        this.TermOfFixedInterest = obj.TermOfFixederest;
        this.BankId = 0;
        this.BranchId = 0;
        this.CurrencyId = 0;
        this.InterestRateType = '';
        this.HnbaBranchCode = obj.HnbaBranchCode;
        this.BrokerCode = '';
        this.ChannelCode = 0;
        this.LoanTypeId = obj.LoanTypeId;
        this.selectedLoanTypeId = obj.LoanTypeId;

        this.Life1Name = obj.LifeAss1Name;
        this.Life1Dob = new Date(obj.LifeAss1Dob);
        this.Life1Age = obj.LifeAss1Age;
        this.Life1Gender = obj.LifeAss1Gender;
        this.Life1Nic = obj.LifeAss1Nic;

        this.Life2Name = obj.LifeAss2Name;
        this.Life2Dob = new Date(obj.LifeAss2Dob);
        this.Life2Age = obj.LifeAss2Age;
        this.Life2Gender = obj.LifeAss2Gender;
        this.Life2Nic = obj.LifeAss2Nic;

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



      let obj: IMain = {
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
        BrokerCode: '',
        ChannelCode: 0,
        IsReInsurance: 0,
        LoanTypeId: this.LoanTypeId,
        ReInsCompanyId: 0,
        ExchangeRate: 0,
        DateOfCommence: '01/01/1970',
        DateOfProposal: '01/01/1970',
        Premium: this.Premium,
        PremiumWithPolicyFee: 0,
        Status: this.Status,
        UserId: this.User.UserName,
        ProposalSendingMethod: this.ProposalSendingMethod,
        RegisterDate: ''
      }

      console.log(obj);
      console.log(JSON.stringify(obj));
      this.proposalRegisterService.saveProposalDetails(obj).subscribe((data: any) => {
        console.log(data);
        this.showSuccess("Proposal Successfully Saved.");
        this.isLoading = false;
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
}



