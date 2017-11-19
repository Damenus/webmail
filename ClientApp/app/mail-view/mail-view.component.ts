import { Component, OnInit } from '@angular/core';
import { MailsService } from "../mails/mails.service";
import { MailViewService } from '../mail-view/mail-view.service';
import { MailAccountsService } from "../mailAccounts/mailAccounts.service";
// import { Mail } from "../core/models/mail";

@Component({
  selector: 'appc-mail-view',
  templateUrl: './mail-view.component.html',
  styleUrls: ['./mail-view.component.scss']
})
export class MailViewComponent implements OnInit {
  public currentMail: any;
  public loadingMail: boolean = false;
  public errorWithGettingMail: boolean = false;

  constructor(private mailsService: MailsService,
    private mailViewService: MailViewService,
    private mailAccountsService: MailAccountsService) { }

  ngOnInit() {
    this.loadingMail = true;
    this.mailsService.getMail(this.mailAccountsService.currentMailbox.mailAddress,
      this.mailViewService.currentMail.uniqueID).subscribe(mail => {
        this.loadingMail = false;
        this.currentMail = mail[0];
      });
  }

}
