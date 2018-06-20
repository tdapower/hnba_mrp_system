import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './pages/user/user-login/user-login.component';

import { PasswordChangeComponent } from './pages/user/password-change/password-change.component';

import { AuthGuard } from './authGuard';

import { PAGE_ROUTES } from './pages/pages.routing';
import { LayoutComponent } from './layout/layout/layout.component';

export const router: Routes = [
    { path: '', component: LayoutComponent, children: PAGE_ROUTES, canActivate: [AuthGuard] },
    { path: 'login', component: UserLoginComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);


