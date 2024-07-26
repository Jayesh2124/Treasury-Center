import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionEntryComponent } from './Pages/transaction-entry/transaction-entry.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'Dashboard',
        component: DashboardComponent
    },
    {
        path: 'Profile',
        component: ProfileComponent
    },
    {
        path: 'Transaction-Entry',
        component: TransactionEntryComponent
    },
];
