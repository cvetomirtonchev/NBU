import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileModalComponent } from './profile/edit-profile-modal/edit-profile-modal.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { AppComponent } from 'src/app/app.component';
import { AppModule } from 'src/app/app.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
    imports: [
        AccountRoutingModule,
        SharedModule
    ],
    declarations: [
        AccountComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        EditProfileModalComponent,
        VerifyEmailComponent,
        ResetPasswordComponent,
        ForgotPasswordComponent,
    ]
})
export class AccountModule { }
