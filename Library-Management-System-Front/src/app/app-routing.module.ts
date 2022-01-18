import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './core/helpers/guards/auth.guard';
import { RoleGuardService } from './core/helpers/guards/role.guard';
import { LibraryComponent } from './pages/library/library.component';

const usersModule = () => import('./pages/users/users.module').then(x => x.UsersModule);
const accountModule = () => import('./pages/account/account.module').then(x => x.AccountModule);
const libraryModule = () => import('./pages/library/library.module').then(x => x.LibraryModule);
const routes: Routes = [
    { path: '', component: DashboardComponent },
    {
        path: 'users',
        loadChildren: usersModule,
        canActivate: [AuthGuard, RoleGuardService],
        data: { userType: 1 }
    },
    {
        path: 'account',
        loadChildren: accountModule
    },
    {
        path: 'library',
        loadChildren: libraryModule,
        canActivate: [AuthGuard],
        // data: { userType: 1 }
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }