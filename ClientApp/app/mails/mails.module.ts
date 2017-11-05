import { NgModule } from '@angular/core';

import { MailsComponent } from './mails.component';
import { routing } from './mails.routes';
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [routing, CommonModule],
    declarations: [MailsComponent]
})
export class MailsModule { }
