import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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

import { IUploadedDocView } from '../../../shared/models/uploadDocView.model';


import { IMainView } from '../../../shared/models/mainView.model';

@Component({
  selector: 'app-proposal-view',
  templateUrl: './proposal-view.component.html',
  styleUrls: ['./proposal-view.component.css']
})


export class ProposalViewComponent implements OnInit {


  isLoading: boolean;
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


  BankName: string = '';
  BankBranchName: string = '';
  HnbaBranch: string = '';
  LoanType: string = '';

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



  uploadedDocViewList: Array<IUploadedDocView> = [];


  constructor(private activatedRoute: ActivatedRoute,
    private proposalRegisterService: ProposalRegisterService,
    private assureService: AssureService) {




    this.SeqId = activatedRoute.snapshot.params['SeqId'];

    console.log('SeqId by view ' + this.SeqId);

    this.loadProposalToView();
  }

  ngOnInit() {
  }


  loadProposalToView() {

    this.proposalRegisterService.getProposalToView(this.SeqId)
      .subscribe((data) => {
        console.log('awaaaaa');
        console.log(data);




        let obj: IMainView = JSON.parse(data);


        this.SeqId = obj.SeqId;
        this.JobNo = obj.JobNo;
        this.QuotationNo = obj.QuotationNo;
        this.RevisionNo = obj.RevisionNo;
        this.ProposalNo = obj.ProposalNo;
        this.MedicalType = obj.MedicalType;
        this.PolicyNo = obj.PolicyNo;
        this.LoanAmount = obj.LoanAmount;
        this.Interest = obj.Interest;
        this.Term = obj.Term;
        this.FullTermInMonths = obj.FullTermInMonths;
        this.GracePeriod = obj.GracePeriod;
        this.CompanyBufferId = obj.CompanyBufferId;
        this.CurrentAwplr = obj.CurrentAwplr;
        this.AdditionToAwplr = obj.AdditionToAwplr;
        this.TermOfFixedInterest = obj.TermOfFixedInterest;
        this.BankId = obj.BankId;

        this.BranchId = obj.BranchId;
        this.CurrencyId = obj.CurrencyId;
        this.InterestRateType = obj.InterestRateType;
        this.HnbaBranchCode = obj.HnbaBranchCode;
        this.BrokerCode = obj.BrokerCode;
        this.ChannelCode = obj.ChannelCode;

        let bIsReInsurance: boolean;

        if (obj.IsReInsurance) {
          bIsReInsurance = true;
        } else {
          bIsReInsurance = false;
        }

        this.IsReInsurance = bIsReInsurance;
        this.LoanTypeId = obj.LoanTypeId;
        this.ReInsCompanyId = obj.ReInsCompanyId;
        this.ExchangeRate = obj.ExchangeRate;

        this.DateOfCommence = obj.DateOfCommence;

        this.DateOfProposal = obj.DateOfProposal;

        this.Premium = obj.Premium;
        this.PremiumWithPolicyFee = obj.PremiumWithPolicyFee;
        this.Status = obj.Status;
        this.UserId = obj.UserId;
        this.ProposalSendingMethod = obj.ProposalSendingMethod;
        this.RegisterDate = obj.RegisterDate;

        this.LoanType = obj.LoanType;
        this.BankName = obj.BankName;
        this.BankBranchName = obj.BankBranchName;
        this.HnbaBranch = obj.HnbaBranch;



        console.log(' this.LoanType = '+ this.LoanType);
        
        this.loadAssure1Details();

        this.loadAssure2Details();

        this.getUploadedDocViewList(this.SeqId);
      },
      (err) => {

        console.log(err);

      });

  }



  loadAssure1Details() {

    this.assureService.getAssureDetailsByMainSeqId(this.SeqId, "Life1")
      .subscribe((data) => {
        console.log(data);

        let obj: IAssureDetail = JSON.parse(data);


        // this.Life1AssureType = obj.AssureType
        // this.Life1Name = obj.Name
        // this.Life1Dob = obj.Dob
        // this.Life1Age = obj.Age
        // this.Life1Gender = obj.Gender
        // this.Life1Nic = obj.Nic
        // this.Life1NationalityId = obj.NationalityId
        // this.Life1Occupation = obj.Occupation
        // this.Life1ContactNo = obj.ContactNo
        // this.Life1Email = obj.Email
        // this.Life1Address = obj.Address
        // this.Life1HeightCm = obj.HeightCm
        // this.Life1HeightInch = obj.HeightInch
        // this.Life1WeightKg = obj.WeightKg
        // this.Life1WeightLbs = obj.WeightLbs
        // this.Life1Bmi = obj.Bmi
        // this.Life1HnbaRefNo = obj.HnbaRefNo
        // this.Life1RiRefNo = obj.ReInsuranceRefNo
        // this.Life1PrevPolicyAmount = obj.PreviousPolicyAmount
        // this.Life1HealthExtraBasic = obj.HealthExtraBasic
        // this.Life1HealthExtraTpd = obj.HealthExtraTpd
        // this.Life1OccuExtraBasic = obj.OccupationExtraBasic
        // this.Life1OccuExtraTpd = obj.OccupationExtraTpd
        // this.Life1OccuExtraPerMileBasic = obj.OccupationExtraPerMileBasic
        // this.Life1OccuExtraPerMileTpd = obj.OccupationExtraPerMileTpd
        // this.Life1Discount = obj.Discount
        // this.Life1Loadings = obj.Loadings

        // this.Life1TpdOption = obj.TpdOption
        // this.Life1SysDate = obj.RegisterDate




      },
      (err) => {

        console.log(err);

      });

  }


  loadAssure2Details() {

    this.assureService.getAssureDetailsByMainSeqId(this.SeqId, "Life2")
      .subscribe((data) => {
        console.log('awaaaaa');
        console.log(data);

        console.log('p2');

        let obj: IAssureDetail = JSON.parse(data);



        if (obj != null) {



          // this.Life2AssureType = obj.AssureType
          // this.Life2Name = obj.Name
          // this.Life2Dob = obj.Dob
          // this.Life2Age = obj.Age
          // this.Life2Gender = obj.Gender
          // this.Life2Nic = obj.Nic
          // this.Life2NationalityId = obj.NationalityId
          // this.Life2Occupation = obj.Occupation
          // this.Life2ContactNo = obj.ContactNo
          // this.Life2Email = obj.Email
          // this.Life2Address = obj.Address
          // this.Life2HeightCm = obj.HeightCm
          // this.Life2HeightInch = obj.HeightInch
          // this.Life2WeightKg = obj.WeightKg
          // this.Life2WeightLbs = obj.WeightLbs
          // this.Life2Bmi = obj.Bmi
          // this.Life2HnbaRefNo = obj.HnbaRefNo
          // this.Life2RiRefNo = obj.ReInsuranceRefNo
          // this.Life2PrevPolicyAmount = obj.PreviousPolicyAmount
          // this.Life2HealthExtraBasic = obj.HealthExtraBasic
          // this.Life2HealthExtraTpd = obj.HealthExtraTpd
          // this.Life2OccuExtraBasic = obj.OccupationExtraBasic
          // this.Life2OccuExtraTpd = obj.OccupationExtraTpd
          // this.Life2OccuExtraPerMileBasic = obj.OccupationExtraPerMileBasic
          // this.Life2OccuExtraPerMileTpd = obj.OccupationExtraPerMileTpd
          // this.Life2Discount = obj.Discount
          // this.Life2Loadings = obj.Loadings

          // this.Life2TpdOption = obj.TpdOption
          // this.Life2SysDate = obj.RegisterDate
        }







      },
      (err) => {

        console.log(err);

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

  setDocumentPath = function (index, DocPath) {
    
    
        window.open(URL_CONST.HOSTED_URL_PREFIX + DocPath);
    
      }

}



