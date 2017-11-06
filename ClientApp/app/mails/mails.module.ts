import { NgModule } from '@angular/core';

import { MailsComponent } from './mails.component';
import { routing } from './mails.routes';
import { CommonModule } from "@angular/common";
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [routing, CommonModule, SharedModule],
    declarations: [MailsComponent]
})
export class MailsModule { }
