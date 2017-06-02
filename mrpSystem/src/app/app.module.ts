import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { MomentModule } from 'angular2-moment';
import { ToastrModule } from 'toastr-ng2';

import { NgUploaderModule } from 'ngx-uploader';
import { Ng2PaginationModule } from 'ng2-pagination';
import { ModalModule } from "ng2-modal";
// import { Md2DatepickerModule } from 'md2-datepicker';

import { routes } from './app.router';
import { QuotationService } from './shared/services/quotation/quotation.service';
import { CommonService } from './shared/services/common/common.service';
import { ProposalUpdateService } from './shared/services/proposal-update/proposal-update.service';
import { ProposalRegisterService } from './shared/services/proposal-register/proposal-register.service';
import { AssureService } from './shared/services/assure/assure.service';


import { QuotationAddComponent } from './pages/quotation/quotation-add/quotation-add.component';
import { ProposalRegisterComponent } from './pages/proposal/proposal-register/proposal-register.component';
import { UserLoginComponent } from './pages/user/user-login/user-login.component';
import { LayoutComponent } from './layout/layout/layout.component';

import { AuthenticationService } from './shared/services/user/authentication.service';
import { AuthGuard } from '../app/authGuard';
import { SpinnerLargeComponent } from './layout/spinner-large/spinner-large.component';
import { SpinnerTopComponent } from './layout/spinner-top/spinner-top.component';
import { QuotationSearchComponent } from './pages/quotation/quotation-search/quotation-search.component';
import { ProposalUpdateComponent } from './pages/proposal/proposal-update/proposal-update.component';
import { QuotationReviseComponent } from './pages/quotation/quotation-revise/quotation-revise.component';
import { PendingProposalsComponent } from './pages/proposal/pending-proposals/pending-proposals.component';
import { MainDashboardComponent } from './pages/dashboards/main-dashboard/main-dashboard.component';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuotationAddComponent,
    ProposalRegisterComponent,
    UserLoginComponent,
    LayoutComponent,
    SpinnerLargeComponent,
    SpinnerTopComponent,
    QuotationSearchComponent,
    ProposalUpdateComponent,
    QuotationReviseComponent,
    PendingProposalsComponent,
    MainDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    NKDatetimeModule,
    Ng2PaginationModule,
    ModalModule,
    MomentModule,
    ToastrModule.forRoot(),
    NgUploaderModule,
    Angular2FontawesomeModule 
    
  ],
  providers: [
    QuotationService,
    AuthenticationService,
    AuthGuard,
    CommonService,
    ProposalRegisterService,
    ProposalUpdateService,
    ProposalRegisterComponent,
    AssureService],



  bootstrap: [AppComponent]
})
export class AppModule { }
