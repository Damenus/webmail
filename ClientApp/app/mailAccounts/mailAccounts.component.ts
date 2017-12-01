import { Component, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MailServerModel } from "../core/models/mail-server-model";
import { MailAccountsService } from "./mailAccounts.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { serverAddress } from "../shared/validators";


@Component({
    selector: 'mailAccounts',
    templateUrl: './mailAccounts.component.html',
    styleUrls: ['./mailAccounts.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class mailAccounts {

    constructor(public activeModal: NgbActiveModal, private manageMailBoxService: MailAccountsService) { }

    public mailAccountForm: FormGroup;
    public servers: any;
    public errors: string[] = [];
    private id: number;

    public ngOnInit() {
        this.id = -1;
        this.servers = require('./servers.json');
        this.mailAccountForm = new FormGroup({
            'mailAddress': new FormControl("", [
                Validators.required,
                Validators.email
            ]),
            'password': new FormControl("", [
                Validators.required
            ]),
            'imapServerAddress': new FormControl("", [
                Validators.required,
                serverAddress
            ]),
            'smtpServerAddress': new FormControl("", [
                Validators.required,
                serverAddress
            ]),
        });

        if (this.manageMailBoxService.edit && this.mailAddress && this.smtpServerAddress && this.imapServerAddress) {         
            this.mailAddress.setValue( this.manageMailBoxService.serverToEdit.mailAddress);
            this.imapServerAddress.setValue( this.manageMailBoxService.serverToEdit.imapServerAddress);
            this.smtpServerAddress.setValue( this.manageMailBoxService.serverToEdit.smtpServerAddress);
            this.id = this.manageMailBoxService.serverToEdit.id;
        }
    }
    onSubmit(form: any) {
        if (this.mailAddress && this.smtpServerAddress && this.imapServerAddress && this.password) {

            var tmp: MailServerModel = {
                id: this.id,
                imapServerAddress: this.imapServerAddress.value,
                smtpServerAddress: this.smtpServerAddress.value,
                password: this.password.value,
                mailAddress: this.mailAddress.value,

            };

            if (this.manageMailBoxService.edit) {
                this.activeModal.close();
                this.manageMailBoxService.refreshServers();
            }
            else {
                this.manageMailBoxService.setServers(tmp).subscribe(response => {
                    this.activeModal.close();
                    this.manageMailBoxService.refreshServers();
                },
                    (errors: any) => {
                        let error = JSON.parse(errors.error);
                        this.errors = error;
                    });
            }
            this.manageMailBoxService.edit = false;
        }
    }

    onEmailChange() {
        var domain: string;
        var founded: boolean;
        if (this.mailAddress && this.smtpServerAddress && this.imapServerAddress) {
            if (this.mailAddress.value.indexOf("@") !== -1) {
                founded = false;
                domain = this.mailAddress.value.substring(this.mailAddress.value.lastIndexOf("@") + 1);
                for (var server in this.servers) {
                    if (server == domain) {
                        this.smtpServerAddress.setValue(this.servers[server].smtp);
                        this.smtpServerAddress.disable();
                        this.imapServerAddress.setValue(this.servers[server].imap);
                        this.imapServerAddress.disable();
                        founded = true;
                    }
                }
                if (!founded) {
                    this.imapServerAddress.enable();
                    this.smtpServerAddress.enable();
                }
            }
            else {
                domain = "";
            }
        }      
    }

    close() {
        this.manageMailBoxService.edit = false;
    }

    get mailAddress() { return this.mailAccountForm.get('mailAddress'); }
    get password() { return this.mailAccountForm.get('password'); }
    get imapServerAddress() { return this.mailAccountForm.get('imapServerAddress'); }
    get smtpServerAddress() { return this.mailAccountForm.get('smtpServerAddress'); }
}
