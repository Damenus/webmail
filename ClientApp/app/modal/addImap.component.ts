import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from '../core/services/data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

    constructor(public activeModal: NgbActiveModal, public dataService: DataService) { }

    public servers: any;

    public ngOnInit() {
        this.servers = require('./servers.json');
    }
    onSubmit(form: any) {
        console.log(this.dataService.post('api/bla', form.value));
    }
    onEmailChange() {
        var email: string;
        var domain: string;
        var founded: boolean;

        email = (document.getElementById("MailAdress") as HTMLInputElement).value;

        if (email.indexOf("@") !== -1) {
            founded = false;
            domain = email.substring(email.lastIndexOf("@") + 1);
            for (var server in this.servers) {
                if (server == domain) {
                    (document.getElementById("SmtpServerAdress") as HTMLInputElement).value = this.servers[server].smtp;
                    (document.getElementById("SmtpServerAdress") as HTMLInputElement).disabled = true;
                    (document.getElementById("ImapServerAdress") as HTMLInputElement).value = this.servers[server].imap;
                    (document.getElementById("ImapServerAdress") as HTMLInputElement).disabled = true;
                    founded = true;
                }
            }
            if (!founded) {
                (document.getElementById("SmtpServerAdress") as HTMLInputElement).disabled = false;
                (document.getElementById("ImapServerAdress") as HTMLInputElement).disabled = false;
            }
        }
        else {
            domain = "";
        }

    }
}
