import { NgModule } from '@angular/core';
import { MailsService } from './mails.service';
import { MailsComponent } from './mails.component';
import { routing } from './mails.routes';
import { CommonModule } from "@angular/common";
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [routing, CommonModule, SharedModule],
    declarations: [MailsComponent],
    providers: [MailsService]
})
export class MailsModule { }
