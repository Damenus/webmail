import { Component, OnInit } from '@angular/core';
import { MailService } from "../core/services/mail.service";
import { Mail } from "../core/models/mail";

@Component({
  selector: 'appc-mails-component',
  templateUrl: './mails.component.html'
})
export class MailsComponent implements OnInit {
    public mails: Array<Mail> = [];
    //public order: String= "mail.title";

    constructor(private mailService: MailService) {}

    public ngOnInit() {
        this.mailService.getMails().subscribe(mails => {
            this.mails = mails;
        });
    }

    public sortBy(order: String) {

        this.mails.sort(function (mail1, mail2) {
            switch (order) {
                case "Title_Down": default: {
                    if (mail1.title < mail2.title) {
                        return -1;
                    } else if (mail1.title > mail2.title) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
                case "Title_Up": {
                    if (mail1.title > mail2.title) {
                        return -1;
                    } else if (mail1.title < mail2.title) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            } 
            
        });     
    }

}
