import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { SharedModule } from '../../shared/shared.module';
import { SocialLoginComponent } from './sociallogin/social-login.component';
import { LoginComponent } from './login.component';
import { routing } from './login.routes';

@NgModule({
    imports: [routing,CommonModule, SharedModule],
    declarations: [LoginComponent, SocialLoginComponent]
})
export class LoginModule { }
