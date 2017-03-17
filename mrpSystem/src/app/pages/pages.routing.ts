import { Routes } from '@angular/router';

import { QuotationAddComponent } from './quotation/quotation-add/quotation-add.component';
import { QuotationSearchComponent } from './quotation/quotation-search/quotation-search.component';
import { ProposalRegisterComponent } from './proposal/proposal-register/proposal-register.component';


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
        path: 'proposalReg',
        component: ProposalRegisterComponent
    }

];
