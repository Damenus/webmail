import { Component, OnInit } from '@angular/core';
import { MailsService } from "./mails.service";
import { Mail } from "../core/models/mail";

export enum SortOrder {
  asc,
  desc
}

@Component({
  selector: 'appc-mails-component',
  styleUrls: ['./mails.component.scss'],
  templateUrl: './mails.component.html'
})
export class MailsComponent implements OnInit {
    public mailsFromServer: Array<Mail> = [];
    public mailsAfterSearch: Array<Mail> = [];
    public mailsOnPage: Array<Mail> = [];
    public maxMailsOnPage = 5;
    public page = 1;
    public searched: String;
    public sortOrder: SortOrder = SortOrder.asc;
    public currentSortOrder: SortOrder = this.sortOrder;
    constructor(private mailsService: MailsService) {}

    public ngOnInit() {
        this.mailsService.getMails().subscribe(mails => {
            this.mailsFromServer = mails;
            this.searched = "";
            this.searchInMails();
        });
    }

    public changeSortOrderTitle() {
        let sort = this.currentSortOrder = this.sortOrder;

        this.mailsAfterSearch.sort(function (mail1, mail2) {
            switch (sort) {
                case SortOrder.asc: default: {
                    if (mail1.title.toLowerCase() < mail2.title.toLowerCase()) {
                        return -1;
                    } else if (mail1.title.toLowerCase() > mail2.title.toLowerCase()) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
                case SortOrder.desc: {
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

        if(this.sortOrder as SortOrder == SortOrder.asc as SortOrder) {
          this.sortOrder = SortOrder.desc;
        } else {
          this.sortOrder = SortOrder.asc;
        }

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
