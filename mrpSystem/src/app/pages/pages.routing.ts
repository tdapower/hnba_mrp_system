import { Routes } from '@angular/router';

import { QuotationAddComponent } from './quotation/quotation-add/quotation-add.component';
import { QuotationSearchComponent } from './quotation/quotation-search/quotation-search.component';

import { QuotationReviseComponent } from './quotation/quotation-revise/quotation-revise.component';

import { ProposalRegisterComponent } from './proposal/proposal-register/proposal-register.component';
import { ProposalSearchComponent } from './proposal/proposal-search/proposal-search.component';

import { ProposalViewComponent } from './proposal/proposal-view/proposal-view.component';


import { ProposalUpdateComponent } from './proposal/proposal-update/proposal-update.component';
import { PendingProposalsComponent } from './proposal/pending-proposals/pending-proposals.component';


import { MainDashboardComponent } from './dashboards/main-dashboard/main-dashboard.component';


import { PasswordChangeComponent } from './user/password-change/password-change.component';




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
        path: 'proposalUpdate/:SeqId',
        component: ProposalUpdateComponent
    },
    {
        path: 'pendingProposals',
        component: PendingProposalsComponent
    },
    {
        path: 'mainDashboard',
        component: MainDashboardComponent
    },

    {
        path: 'proposalSearch',
        component: ProposalSearchComponent
    },

    {
        path: 'proposalView/:SeqId',
        component: ProposalViewComponent
    }

    ,

    {
        path: 'passwordChange',
        component: PasswordChangeComponent
    }



];





