import { Component } from '@angular/core';
import { mailAccountsService } from "../../mailAccounts/mailAccounts.service";
import { MailsService } from "../../mails/mails.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'appc-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent {

    constructor(private mailAccountsService: mailAccountsService,
                private translate: TranslateService,
                private mailsService: MailsService) {
    }


    public ngOnInit() {
        this.mailAccountsService.getServers();
    }

    deleteServer(server: any) {
      this.translate.get('Confirm_delete_mailbox', {mailbox: server.mailAddress}).subscribe((res:string) => {
          if(confirm(res)) {
          this.mailAccountsService.deleteServer(server.mailAddress).subscribe(response => {
              console.log("Response: " + response);
              this.mailAccountsService.getServers();
          });
        }
      });
    }

    public getMailsFromMailbox(mailbox:String) {
      this.mailsService.mailsFromMailbox(mailbox);
    }

    public setActive(event:any) {
      console.log(this);
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
