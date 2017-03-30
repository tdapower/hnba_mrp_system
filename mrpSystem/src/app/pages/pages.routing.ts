import { Routes } from '@angular/router';

import { QuotationAddComponent } from './quotation/quotation-add/quotation-add.component';
import { QuotationSearchComponent } from './quotation/quotation-search/quotation-search.component';

import { QuotationReviseComponent } from './quotation/quotation-revise/quotation-revise.component';

import { ProposalRegisterComponent } from './proposal/proposal-register/proposal-register.component';
import { ProposalUpdateComponent } from './proposal/proposal-update/proposal-update.component';




export const PAGE_ROUTES: Routes = [
    {
        path: 'add',
        component: QuotationAddComponent
    },
    {
        path: 'searchQuote',
        component: QuotationSearchComponent
    },
    {
        path: 'reviseQuote/:SeqId',
        component: QuotationReviseComponent
    },
    {
        path: 'proposalReg',
        component: ProposalRegisterComponent
    },
    {
        path: 'proposalUpdate',
        component: ProposalUpdateComponent
    }


];
