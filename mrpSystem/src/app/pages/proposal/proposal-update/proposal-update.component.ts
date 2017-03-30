import { Component, OnInit } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { ToastrService, ToastrConfig } from 'toastr-ng2';

import { CommonService } from '../../../shared/services/common/common.service';
import { INationality } from '../../../shared/models/nationality.model';
import { IBank } from '../../../shared/models/bank.model';
import { IBankBranch } from '../../../shared/models/bankBranch.model';
import { IProposalStatus } from '../../../shared/models/proposalStatus.model';
import { ILoanType } from '../../../shared/models/loanType.model';
import { IHnbaBranch } from '../../../shared/models/hnbaBranch.model';
import { ICurrency } from '../../../shared/models/currency.model';
import { IReInsuranceCompany } from '../../../shared/models/reInsuranceCompany.model';
import { IBroker } from '../../../shared/models/broker.model';
import { IChannel } from '../../../shared/models/channel.model';
import { ITPDOption } from '../../../shared/models/tpdOption.model';

import { ICompanyBuffer } from '../../../shared/models/companyBuffer.model';


import { IUser } from '../../../shared/models/user/user.model';
import { COMMON_VALUES } from '../../../shared/config/commonValues';



@Component({
  selector: 'app-proposal-update',
  templateUrl: './proposal-update.component.html',
  styleUrls: ['./proposal-update.component.css']
})
export class ProposalUpdateComponent implements OnInit {


  isLoading: boolean;

  User: IUser;

  medicalType: string = '';
  revisionNo: number = 0;
  customerName1: string = '';
  customerName2: string = '';
  nic1: string = '';
  nic2: string = '';
  occupation1: string = '';
  occupation2: string = '';
  dob1: string = '';
  dob2: string = '';
  age1: number;
  age2: number;
  gender1: string = '';
  gender2: string = '';
  nationality1: string = '';
  nationality2: string = '';
  heightCm1: number = 0;
  heightInch1: number = 0;
  weightKg1: number = 0;
  weightLbs1: number = 0;
  heightCm2: number = 0;
  heightInch2: number = 0;
  weightKg2: number = 0;
  weightLbs2: number = 0;
  bmi1: number = 0;
  bmi2: number = 0;
  address: string = '';
  contact1: number = 0;
  contact2: number = 0;
  email1: string = '';
  email2: string = '';

  loanType: string = '';
  loanAmount: number = 0;
  interest: number = 0;
  term: number = 0;
  termOfFixedInterest: number = 0;
  fullTermInMonths: number = 0;
  gracePeriodInMonths: number = 0;
  companyBuffer: string = '';
  currentAwplr: number = 0;
  additionToAwplr: number = 0;
  currency: string = '';
  bank: string = '';
  bankBranch: string = '';
  hnbaBranch: string = '';
  hnbaCode: string = '';
  brokerCode: string = '';
  channelCode: string = '';
  isReinsurance: number = 0;
  reInsuranceCompanyName: string = '';
  hnbaRefNoLife1: string = '';
  hnbaRefNoLife2: string = '';
  riRefNoLife1: string = '';
  riRefNoLife2: string = '';
  exchangeRate: number = 0;

  policyNo: number = 0;
  dateOfCommence: string = '';
  dateOfProposal: string = '';
  previousPolicies1: string = '';
  previousPolicies2: string = '';
  healthBasic1: number = 0;
  healthTpd1: number = 0;
  healthBasic2: number = 0;
  healthTpd2: number = 0;
  occExtraBasic1: number = 0;
  occExtraTpd1: number = 0;
  occExtraBasic2: number = 0;
  occExtraTpd2: number = 0;
  occExtraPerMileBasic1: number = 0;
  occExtraPerMileTpd1: number = 0;
  occExtraPerMileBasic2: number = 0;
  occExtraPerMileTpd2: number = 0;
  discount1: number = 0;
  discount2: number = 0;
  loading1: number = 0;
  loading2: number = 0;
  isAgeAdmitted: number = 0;
  isSmoker: number = 0;
  isFemaleRebate: number = 0;
  tpd1: number = 0;
  tpd2: number = 0;
  tpdOption1: number = 0;
  tpdOption2: number = 0;

  isValidated: number = 0;

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

  bmi1Color: string = '';
  bmi2Color: string = '';

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






  constructor(private commonService: CommonService, private toastrService: ToastrService, toastrConfig: ToastrConfig) {

    toastrConfig.timeOut = 10000;
    toastrConfig.closeButton = true;
    toastrConfig.tapToDismiss = true;
  }

  ngOnInit() {

    this.getNationalities();
    this.getBanks();
    this.getHNBABranches();
    this.getCurrencies();
    this.getReInsuranceCompanies();
    this.getLoanTypes();
    this.getChannels();
    this.getBrokers();
    this.getCompanyBuffer();
    this.getTPDOptions();

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

    this.bmi1Color = 'red';
    this.bmi2Color = 'green';

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


  onSelectOfBankId(bankId) {
    this.commonService.getBankBranchByBankId(bankId)
      .subscribe((data) => { this.bankBranchList = data },
      (err) => {
        console.log(err);

        this.isLoading = false;
        this.showError("Error loading Bank Branches");

      });
  }

  clearValues() {
    this.medicalType = '';
    this.revisionNo = 0;
    this.customerName1 = '';
    this.customerName2 = '';
    this.nic1 = '';
    this.nic2 = '';
    this.occupation1 = '';
    this.occupation2 = '';
    this.dob1 = '';
    this.dob2 = '';
    this.age1 = 0;
    this.age2 = 0;
    this.gender1 = '';
    this.gender2 = '';
    this.nationality1 = '';
    this.nationality2 = '';
    this.heightCm1 = 0;
    this.heightCm2 = 0;
    this.heightInch1 = 0;
    this.heightInch2 = 0;
    this.weightKg1 = 0;
    this.weightKg2 = 0;
    this.weightLbs1 = 0;
    this.weightLbs2 = 0;
    this.bmi1 = 0;
    this.bmi2 = 0;
    this.address = '';
    this.contact1 = 0;
    this.contact2 = 0;
    this.email1 = '';
    this.email2 = '';
    this.loanType = '';
    this.loanAmount = 0;
    this.interest = 0;
    this.term = 0;
    this.termOfFixedInterest = 0;
    this.fullTermInMonths = 0;
    this.gracePeriodInMonths = 0;
    this.companyBuffer = '';
    this.currentAwplr = 0;
    this.additionToAwplr = 0;
    this.currency = '';
    this.bank = '';
    this.bankBranch = '';
    this.hnbaBranch = '';
    this.hnbaCode = '';
    this.brokerCode = '';
    this.channelCode = '';
    this.isReinsurance = 0;
    this.reInsuranceCompanyName = '';
    this.hnbaRefNoLife1 = '';
    this.hnbaRefNoLife2 = '';
    this.riRefNoLife1 = '';
    this.riRefNoLife2 = '';
    this.exchangeRate = 0;
    this.policyNo = 0;
    this.dateOfCommence = '';
    this.dateOfProposal = '';
    this.previousPolicies1 = '';
  }


  private valueChangeHeightInch1(height) {
    if (this.heightInch1 != null && this.weightLbs1 != null) {
      this.heightCm1 = Number((height / 0.3937008).toFixed(2)) ;
      this.bmi1 = this.calculateBMI(this.heightCm1, this.weightKg1);
    }
  }
  private valueChangeWeightLbs1(weight) {
    if (this.heightInch1 != null && this.weightLbs1 != null) {

      this.weightKg1 = Number((weight / 2.20462).toFixed(2)) ;

       this.bmi1 = this.calculateBMI(this.heightCm1, this.weightKg1);
    }
  }
  private valueChangeHeightInch2(height) {
    if (this.heightInch2 != null && this.weightLbs2 != null) {
      this.heightCm2 = Number((height / 0.3937008).toFixed(2));
      this.bmi2 = this.calculateBMI(this.heightCm2, this.weightKg2);

    }

  }

  private valueChangeWeightLbs2(weight) {
    if (this.heightInch2 != null && this.weightLbs2 != null) {
      this.weightKg2 = Number((weight / 2.20462).toFixed(2));
      this.bmi2 = this.calculateBMI(this.heightCm2, this.weightKg2);
    }
  }




  private valueChangeHeightCm1(height) {
    if (this.heightCm1 != null && this.weightKg1 != null) {

      this.heightInch1 = Number((height *0.3937008).toFixed(2));
      this.bmi1 = this.calculateBMI(this.heightCm1, this.weightKg1);

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
  private valueChangeHeightCm2(height) {
    if (this.heightCm2 != null && this.weightKg2 != null) {
      this.heightInch2 = Number((height * 0.3937008).toFixed(2));
      this.bmi2 = this.calculateBMI(this.heightCm2, this.weightKg2);
    }
  }
  private valueChangeWeightKg1(weight) {
    if (this.heightCm1 != null && this.weightKg1 != null) {

      this.weightLbs1 = Number((weight * 2.20462).toFixed(2));
      this.bmi1 = this.calculateBMI(this.heightCm1, this.weightKg1);
    }
  }
  private valueChangeWeightKg2(weight) {
    if (this.heightCm2 != null && this.weightKg2 != null) {
      this.weightLbs2= Number((weight * 2.20462).toFixed(2));
      this.bmi2 = this.calculateBMI(this.heightCm2, this.weightKg2);
    }
  }

  private calculateBMI(height, weight): any {

    console.log('height = ' + height);
    console.log('weight = ' + weight);
    var finalBmi = weight / (height / 100 * height / 100)
    console.log('BMI = ' + finalBmi.toFixed(2));

    return finalBmi.toFixed(2);

  }
}
