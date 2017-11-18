import { Component, OnInit } from '@angular/core';
import { MailsService } from "./mails.service";
import { Mail } from "../core/models/mail";

@Component({
  selector: 'appc-mails-component',
  templateUrl: './mails.component.html'
})
export class MailsComponent implements OnInit {
    public mailsFromServer: Array<Mail> = [];
    public mailsAfterSearch: Array<Mail> = [];
    public mailsOnPage: Array<Mail> = [];
    public maxMailsOnPage = 5;
    public page = 1;
    public searched: String;

    constructor(private mailsService: MailsService) {}

    public ngOnInit() {
        this.mailsService.getMails().subscribe(mails => {
            this.mailsFromServer = mails;
            this.searched = "";
            this.searchInMails();
        });
    }

    public sortBy(order: String) {
        this.mailsAfterSearch.sort(function (mail1, mail2) {
            switch (order) {
                case "Title_Down": default: {
                    if (mail1.title.toLowerCase() < mail2.title.toLowerCase()) {
                        return -1;
                    } else if (mail1.title.toLowerCase() > mail2.title.toLowerCase()) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
                case "Title_Up": {
                    if (mail1.title.toLowerCase() > mail2.title.toLowerCase()) {
                        return -1;
                    } else if (mail1.title.toLowerCase() < mail2.title.toLowerCase()) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            } 
            
        });
        this.page = 1;
        this.getPartOfMails();
    }

    public searchInMails() {
        if (this.searched == "") {
            this.mailsAfterSearch = this.mailsFromServer;
        }
        else {
            this.mailsAfterSearch = [];
            console.log(this.searched);
            for (var i = 0; i < this.mailsFromServer.length; i++) {
                if (this.mailsFromServer[i].title.indexOf(this.searched.toString()) !== -1) {
                    this.mailsAfterSearch.push(this.mailsFromServer[i]);
                }
            }
        }
        this.getPartOfMails();
    }

    public getPartOfMails() {
        this.mailsOnPage = this.mailsAfterSearch.slice((this.page - 1) * this.maxMailsOnPage, this.page * this.maxMailsOnPage);
    }
}
