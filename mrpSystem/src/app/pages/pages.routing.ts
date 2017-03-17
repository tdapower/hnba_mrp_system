import { Routes } from '@angular/router';

import { QuotationAddComponent } from './quotation/quotation-add/quotation-add.component';
import { ProposalRegisterComponent } from './proposal/proposal-register/proposal-register.component';


export const PAGE_ROUTES: Routes = [
    {
        path: 'add',
        component: QuotationAddComponent
    },
    {
        path: 'proposalReg',
        component: ProposalRegisterComponent
    }

];
