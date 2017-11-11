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
    onSubmit(form: any) {
        console.log("adding form values ");
        console.log(form.value);
        console.log(this.dataService.post('api/bla', form.value));
    }
    onEmailChange() {
        var email: string;
        var domain: string;
        var servers = require('./servers.json');

        email = (document.getElementById("MailAdress") as HTMLInputElement).value;

        if (email.indexOf("@") !== -1) {
            domain = email.substring(email.lastIndexOf("@") + 1);
            for (var server in servers) {
                if (server == domain) {
                    (document.getElementById("SmtpServerAdress") as HTMLInputElement).value = servers[server].smtp;
                    (document.getElementById("ImapServerAdress") as HTMLInputElement).value = servers[server].imap;
                }
            }
        }
        else {
            domain = "";
        }

    }
}
