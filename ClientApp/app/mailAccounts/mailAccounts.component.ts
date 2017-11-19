import { Component, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MailServerModel } from "../core/models/mail-server-model";
import { MailAccountsService } from "./mailAccounts.service";


@Component({
    selector: 'mailAccounts',
    templateUrl: './mailAccounts.component.html',
    styleUrls: ['./mailAccounts.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class mailAccounts {

    constructor(public activeModal: NgbActiveModal, private manageMailBoxService: MailAccountsService) { }

    public servers: any;
    public ImapServerAddress: String;
    public SmtpServerAddress: String;
    public MailAddress: String;

    public ngOnInit() {
        this.servers = require('./servers.json');
    }
    onSubmit(form: any) {
        var tmp: MailServerModel = {
            imapServerAddress: form.value.ImapServerAddress,
            smtpServerAddress: form.value.SmtpServerAddress,
            password: form.value.Password,
            mailAddress: form.value.MailAddress,

        };
        this.manageMailBoxService.setServers(tmp).subscribe(response => {
            console.log("Response: " + response);
            this.activeModal.close();
            this.manageMailBoxService.getServers();
        });

    }

    onEmailChange() {
        var domain: string;
        var founded: boolean;

        if (this.MailAddress.indexOf("@") !== -1) {
            founded = false;
            domain = this.MailAddress.substring(this.MailAddress.lastIndexOf("@") + 1);
            for (var server in this.servers) {
                if (server == domain) {
                    this.SmtpServerAddress = this.servers[server].smtp;
                    (document.getElementById("SmtpServerAddress") as HTMLInputElement).disabled = true;
                    this.ImapServerAddress = this.servers[server].imap;
                    (document.getElementById("ImapServerAddress") as HTMLInputElement).disabled = true;
                    founded = true;
                }
            }
            if (!founded) {
                (document.getElementById("SmtpServerAddress") as HTMLInputElement).disabled = false;
                (document.getElementById("ImapServerAddress") as HTMLInputElement).disabled = false;
            }
        }
        else {
            domain = "";
        }

    }
}
