import { Component, OnInit } from '@angular/core';
import { DraftsService } from "./drafts.service";
import { Mail } from "../core/models/mail";
import { Router, ActivatedRoute } from '@angular/router';

export enum SortOrder {
  asc,
  desc
}

@Component({
  selector: 'appc-drafts-component',
  styleUrls: ['./drafts.component.scss'],
  templateUrl: './drafts.component.html'
})
export class DraftsComponent implements OnInit {
    public draftsFromServer: Array<Mail> = [];
    public draftsAfterSearch: Array<Mail> = [];
    public draftsOnPage: Array<Mail> = [];
    public maxDraftsOnPage = 5;
    public page = 1;
    public searched: String;
    public sortOrderTitle: SortOrder = SortOrder.asc;
    public currentSortOrderTitle: SortOrder = this.sortOrderTitle;
    public sortOrderDate: SortOrder = SortOrder.desc;
    public currentSortOrderDate: SortOrder = this.sortOrderDate;
    public loadingMails:boolean = false;
    public currentMailbox:String;

    constructor(private draftsService: DraftsService,
                private router: Router,
                private route: ActivatedRoute) {

    }

    public ngOnInit() {
        this.loadingMails = true;
        this.draftsService.getDrafts().subscribe(drafts => {
            this.loadingMails = false;
            // sprawdzenie czy pobrane maile nie sa puste, zeby uniknac bledow w widoku
            if (drafts) {
                this.draftsFromServer = drafts;
            } else {
                this.draftsFromServer = [];
            }
            this.searched = "";
            this.searchInDrafts();
            //sortowanie po dacie
            this.changeSortOrderDate();
        });
    }

    public changeSortOrderTitle() {
        let sort = this.currentSortOrderTitle = this.sortOrderTitle;

        this.draftsAfterSearch.sort(function (draft1, draft2) {
            switch (sort) {
                case SortOrder.asc: default: {
                    if (draft1.title.toLowerCase() < draft2.title.toLowerCase()) {
                        return -1;
                    } else if (draft1.title.toLowerCase() > draft2.title.toLowerCase()) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
                case SortOrder.desc: {
                    if (draft1.title.toLowerCase() > draft2.title.toLowerCase()) {
                        return -1;
                    } else if (draft1.title.toLowerCase() < draft2.title.toLowerCase()) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }

        });
        this.page = 1;
        this.getPartOfDrafts();

        if(this.sortOrderTitle as SortOrder == SortOrder.asc as SortOrder) {
          this.sortOrderTitle = SortOrder.desc;
        } else {
          this.sortOrderTitle = SortOrder.asc;
        }

    }

    public changeSortOrderDate() {
        let sort = this.currentSortOrderDate = this.sortOrderDate;

        this.draftsAfterSearch.sort(function (draft1, draft2) {
            switch (sort) {
                case SortOrder.asc: default: {
                    if (draft1.date < draft2.date) {
                        return -1;
                    } else if (draft1.date > draft2.date) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
                case SortOrder.desc: {
                    if (draft1.date > draft2.date) {
                        return -1;
                    } else if (draft1.date < draft2.date) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }

        });
        this.page = 1;
        this.getPartOfDrafts();

        if(this.sortOrderDate as SortOrder == SortOrder.asc as SortOrder) {
          this.sortOrderDate = SortOrder.desc;
        } else {
          this.sortOrderDate = SortOrder.asc;
        }

    }

    public searchInDrafts() {
        if (this.searched == "") {
            this.draftsAfterSearch = this.draftsFromServer;
        }
        else {
            this.draftsAfterSearch = [];
            for (var i = 0; i < this.draftsFromServer.length; i++) {
                if (this.draftsFromServer[i].title.toLowerCase().indexOf(this.searched.toString().toLowerCase()) !== -1) {
                    this.draftsAfterSearch.push(this.draftsFromServer[i]);
                }
            }
        }
        this.getPartOfDrafts();
    }

    public getPartOfDrafts() {
        this.draftsOnPage = this.draftsAfterSearch.slice((this.page - 1) * this.maxDraftsOnPage, this.page * this.maxDraftsOnPage);
    }

    public openMail(draft: any) {
        console.log(draft);
        this.router.navigate(['../newmail'], { queryParams: { draftId: draft.id },relativeTo: this.route });
    }
}
