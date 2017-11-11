import { NgModule } from '@angular/core';
import { LoggedUserComponent } from './logged-user.component';
import { routing } from './logged-user.routes';
import { CommonModule } from "@angular/common";
import { SharedModule } from '../shared/shared.module';
import { SidebarLeftComponent } from './sidebar-left/sidebar-left.component';
@NgModule({
    imports: [routing, CommonModule, SharedModule],
    declarations: [LoggedUserComponent, SidebarLeftComponent]
})
export class LoggedUserModule { }
