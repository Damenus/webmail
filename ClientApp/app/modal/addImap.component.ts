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
    public ImapServerAddress: String;
    public SmtpServerAddress: String;
    public MailAddress: String;

    public ngOnInit() {
        this.servers = require('./servers.json');
        this.addImapService.getServers().subscribe(servers => {
            this.myServers = servers;
        });
    }
    onSubmit(form: any) {
        var tmp: MailServerModel = {
            imapServerAddress: form.value.ImapServerAddress,
            smtpServerAddress: form.value.SmtpServerAddress,
            password: form.value.Password,
            mailAddress: form.value.MailAddress,

        };
        this.addImapService.setServers(tmp).subscribe(response => {
            console.log("Response: " + response);
        });
        
    }
    deleteServer(server: any) {
        console.log(server);
        this.addImapService.deleteServer(server.mailAddress).subscribe(response => {
            console.log("Response: " + response);
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
