import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { MomentModule } from 'angular2-moment';

import { ToastrModule } from 'toastr-ng2';

import { Ng2PaginationModule } from 'ng2-pagination';
import { ModalModule } from "ng2-modal";
import { Md2DatepickerModule } from 'md2-datepicker';

import { routes } from './app.router';
import { QuotationService } from './shared/services/quotation/quotation.service';
import { CommonService } from './shared/services/common/common.service';
import { ProposalUpdateService } from './shared/services/proposal-update/proposal-update.service';
import { ProposalRegisterService } from './shared/services/proposal-register/proposal-register.service';


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
    ProposalUpdateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    NKDatetimeModule,
    Ng2PaginationModule,
    ModalModule,
    Md2DatepickerModule.forRoot(),
    MomentModule,
    ToastrModule.forRoot()
    
  ],
  providers: [
    QuotationService,
    AuthenticationService,
    AuthGuard,
    CommonService,
    ProposalRegisterService,
    ProposalUpdateService,
    ProposalRegisterComponent],



  bootstrap: [AppComponent]
})
export class AppModule { }
