import { NgModule } from '@angular/core';
import { LoggedUserComponent } from './logged-user.component';
import { routing } from './logged-user.routes';
import { CommonModule } from "@angular/common";
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [routing, CommonModule, SharedModule],
    declarations: [LoggedUserComponent]
})
export class LoggedUserModule { }
