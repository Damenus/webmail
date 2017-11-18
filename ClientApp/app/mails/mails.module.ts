import { NgModule } from '@angular/core';
import { MailsService } from './mails.service';
import { MailsComponent } from './mails.component';
import { routing } from './mails.routes';
import { CommonModule } from "@angular/common";
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [routing, CommonModule, SharedModule, NgbModule],
    declarations: [MailsComponent],
    providers: [MailsService]
})
export class MailsModule { }
