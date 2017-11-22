import { Component, OnInit } from '@angular/core';
import { MailsService } from "./mails.service";
import { Mail } from "../core/models/mail";
import { MailViewService } from '../mail-view/mail-view.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    public sortOrderTitle: SortOrder = SortOrder.asc;
    public currentSortOrderTitle: SortOrder = this.sortOrderTitle;
    public sortOrderDate: SortOrder = SortOrder.desc;
    public currentSortOrderDate: SortOrder = this.sortOrderDate;
    public loadingMails:boolean = false;
    public currentMailbox:String;

    constructor(private mailsService: MailsService,
                private mailViewService: MailViewService,
                private router: Router,
                private route: ActivatedRoute) {

      // tutaj dodajemy listenera na eventy
      // component lewego sidebaru po nacisnieciu danej skrzynki wysle poprzez
      // mailservice informacje o wybraniu mailboxa - w tym momencie tutaj wywolujemy
      // pobranie maili z wybranej skrzynki
      this.mailsService.listen().subscribe((m:any) => {
        this.getMailsFromMailbox(m);
      })
    }

    public ngOnInit() {
        this.loadingMails = true;
        this.mailsService.getMails().subscribe(mails => {
            this.loadingMails = false;
            // sprawdzenie czy pobrane maile nie sa puste, zeby uniknac bledow w widoku
            if (mails) {
              this.mailsFromServer = mails;
            } else {
              this.mailsFromServer = [];
            }
            this.searched = "";
            this.searchInMails();
            //sortowanie po dacie
            this.changeSortOrderDate();
        });
    }

    public changeSortOrderTitle() {
        let sort = this.currentSortOrderTitle = this.sortOrderTitle;

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

        if(this.sortOrderTitle as SortOrder == SortOrder.asc as SortOrder) {
          this.sortOrderTitle = SortOrder.desc;
        } else {
          this.sortOrderTitle = SortOrder.asc;
        }

    }

    public changeSortOrderDate() {
        let sort = this.currentSortOrderDate = this.sortOrderDate;

        this.mailsAfterSearch.sort(function (mail1, mail2) {
            switch (sort) {
                case SortOrder.asc: default: {
                    if (mail1.date < mail2.date) {
                        return -1;
                    } else if (mail1.date > mail2.date) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
                case SortOrder.desc: {
                    if (mail1.date > mail2.date) {
                        return -1;
                    } else if (mail1.date < mail2.date) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }

        });
        this.page = 1;
        this.getPartOfMails();

        if(this.sortOrderDate as SortOrder == SortOrder.asc as SortOrder) {
          this.sortOrderDate = SortOrder.desc;
        } else {
          this.sortOrderDate = SortOrder.asc;
        }

    }

    public searchInMails() {
        if (this.searched == "") {
            this.mailsAfterSearch = this.mailsFromServer;
        }
        else {
            this.mailsAfterSearch = [];
            for (var i = 0; i < this.mailsFromServer.length; i++) {
                if (this.mailsFromServer[i].title.toLowerCase().indexOf(this.searched.toString().toLowerCase()) !== -1) {
                    this.mailsAfterSearch.push(this.mailsFromServer[i]);
                }
            }
        }
        this.getPartOfMails();
    }

    public getPartOfMails() {
        this.mailsOnPage = this.mailsAfterSearch.slice((this.page - 1) * this.maxMailsOnPage, this.page * this.maxMailsOnPage);
    }

    public getMailsFromMailbox(mailbox:String) {
      this.loadingMails = true;
      this.currentMailbox = mailbox;
      this.mailsService.getMailsFromMailbox(mailbox).subscribe(mails => {
        this.loadingMails = false;
          if (mails) {
            this.mailsFromServer = mails;
          } else {
            this.mailsFromServer = [];
          }
          this.searched = "";
          this.searchInMails();
          //sortowanie po dacie
          this.changeSortOrderDate();
      });
    }

    public openMail(mail: Mail) {
      console.log("Execute: openMail");
      this.mailViewService.currentMail = mail;
      this.router.navigate([`../mails/${mail.uniqueID}`], { relativeTo: this.route });
    }
}
