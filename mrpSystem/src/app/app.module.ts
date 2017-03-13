import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';

import { QuotationService } from './shared/services/quotation/quotation.service';
import { UserService } from './shared/services/user/user.service';
import { CommonService } from './shared/services/common/common.service';


import { QuotationAddComponent } from './pages/quotation/quotation-add/quotation-add.component';
import { ProposalAddComponent } from './pages/proposal/proposal-add/proposal-add.component';
import { ProposalRegisterComponent } from './pages/proposal/proposal-register/proposal-register.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuotationAddComponent,
    ProposalAddComponent,
    ProposalRegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
<<<<<<< .mine
  providers: [QuotationService, UserService, CommonService] ,
=======
  providers: [QuotationService, UserService, CommonService],
>>>>>>> .theirs
  bootstrap: [AppComponent]
})
export class AppModule { }
