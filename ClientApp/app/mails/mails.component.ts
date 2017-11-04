import { Component, OnInit } from '@angular/core';
import { MailService } from "../core/services/mail.service";
import { Mail } from "../core/models/mail";

@Component({
  selector: 'appc-mails-component',
  templateUrl: './mails.component.html'
})
export class MailsComponent implements OnInit {
    public mails: Iterable<Mail> = [];

    constructor(private mailService: MailService) {}

    public ngOnInit() {
        this.mailService.getMails().subscribe(mails => {
            this.mails = mails;
        });
    }
}
