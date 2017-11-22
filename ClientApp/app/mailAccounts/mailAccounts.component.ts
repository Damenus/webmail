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
    public errors: string[] = [];
    private id: number;

    public ngOnInit() {
        this.id = -1;
        this.servers = require('./servers.json');
        if (this.manageMailBoxService.edit) {         
            this.MailAddress = this.manageMailBoxService.serverToEdit.mailAddress;
            this.ImapServerAddress = this.manageMailBoxService.serverToEdit.imapServerAddress;
            this.SmtpServerAddress = this.manageMailBoxService.serverToEdit.smtpServerAddress;
            this.id = this.manageMailBoxService.serverToEdit.id;
        }
    }
    onSubmit(form: any) {
        var tmp: MailServerModel = {
            id: this.id,
            imapServerAddress: form.value.ImapServerAddress,
            smtpServerAddress: form.value.SmtpServerAddress,
            password: form.value.Password,
            mailAddress: form.value.MailAddress,

        };

        if (this.manageMailBoxService.edit) {
            console.log("powinienem edytowac: " + tmp);
            this.activeModal.close();
            this.manageMailBoxService.refreshServers();
        }
        else {
            this.manageMailBoxService.setServers(tmp).subscribe(response => {
                console.log("Response: " + response);
                this.activeModal.close();
                this.manageMailBoxService.refreshServers();
            },
            (errors: any) => {
                let error = JSON.parse(errors.error);
                this.errors=error;
            });
        }  
        this.manageMailBoxService.edit = false;

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

    close() {
        this.manageMailBoxService.edit = false;
    }
}
