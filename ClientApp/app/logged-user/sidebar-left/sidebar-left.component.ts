import { Component } from '@angular/core';
import { MailAccountsService } from "../../mailAccounts/mailAccounts.service";
import { MailServerModel } from "../../core/models/mail-server-model";
import { MailsService } from "../../mails/mails.service";
import { TranslateService } from '@ngx-translate/core';
import { mailAccounts } from '../../mailAccounts/mailAccounts.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'appc-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent {

  constructor(private mailAccountsService: MailAccountsService,
    private translate: TranslateService,
    private mailsService: MailsService,
    private modalService: NgbModal
    // private router: Router,
    // private route: ActivatedRoute
  ) {
  }


  public ngOnInit() {
      this.mailAccountsService.refreshServers();
  }

  deleteServer(server: any) {
    this.translate.get('Confirm_delete_mailbox', { mailbox: server.mailAddress }).subscribe((res: string) => {
      if (confirm(res)) {
        this.mailAccountsService.deleteServer(server.mailAddress).subscribe(response => {
          console.log("Response: " + response);
          this.mailAccountsService.refreshServers();
        });
      }
    });
  }
  editServer(server: any) {
      console.log(server);
      this.mailAccountsService.serverToEdit = server;
      this.mailAccountsService.edit = true;
      this.modalService.open(mailAccounts);
  }

  public getMailsFromMailbox(mailbox: String) {
    // this.router.navigate([`../loggeduser/mails`], { relativeTo: this.route });
    this.mailsService.mailsFromMailbox(mailbox);
  }

  public setActive(server: MailServerModel) {
    this.mailAccountsService.currentMailbox = server;
    // let clickedElement = event.target || event.srcElement;
    //
    // if(clickedElement.nodeName === "SPAN" ) {
    //   let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".active");
    //   // if a Button already has Class: .active
    //   if( isCertainButtonAlreadyActive ) {
    //     isCertainButtonAlreadyActive.classList.remove("active");
    //   }
    //
    //   clickedElement.className += " active";
    // }
  }
}
