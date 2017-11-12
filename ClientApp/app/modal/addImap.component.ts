import { Component, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MailServerModel } from "../core/models/mail-server-model";
import { AddImapService } from "./addImap.service";

@Component({
    selector: 'addImap',
    templateUrl: './addImap.html',
    encapsulation: ViewEncapsulation.None,
    styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;   
    }
  `]
})
export class addImap {

    constructor(public activeModal: NgbActiveModal, private addImapService: AddImapService) { }

    public servers: any;
    public myServers: Array<MailServerModel>;

    public ngOnInit() {
        this.servers = require('./servers.json');
        this.addImapService.getServers().subscribe(servers => {
            this.myServers = servers;
        });
        console.log("z serwera " + this.myServers);
    }
    onSubmit(form: any) {
        var tmp: MailServerModel = {
            imapServerAddress: form.value.ImapServerAddress,
            smtpServerAddress: form.value.SmtpServerAddress,
            password: form.value.Password,
            mailAddress: form.value.MailAddress,

        };
        console.log(tmp);
        this.addImapService.setServers(tmp).subscribe(response => {
            console.log("Response: " + response);
        });
        
    }
    onEmailChange() {
        var email: string;
        var domain: string;
        var founded: boolean;

        email = (document.getElementById("MailAddress") as HTMLInputElement).value;

        if (email.indexOf("@") !== -1) {
            founded = false;
            domain = email.substring(email.lastIndexOf("@") + 1);
            for (var server in this.servers) {
                if (server == domain) {
                    (document.getElementById("SmtpServerAddress") as HTMLInputElement).value = this.servers[server].smtp;
                    (document.getElementById("SmtpServerAddress") as HTMLInputElement).disabled = true;
                    (document.getElementById("ImapServerAddress") as HTMLInputElement).value = this.servers[server].imap;
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
