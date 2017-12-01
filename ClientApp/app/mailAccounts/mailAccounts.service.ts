import { Injectable } from '@angular/core';
import { DataService } from '../core/services/data.service';

import { MailServerModel } from "../core/models/mail-server-model";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MailAccountsService {
    public servers: Array<MailServerModel>;
    public currentMailbox: MailServerModel;
    public serverToEdit: MailServerModel;
    public edit: boolean;

    constructor(public dataService: DataService) {
        this.edit = false;
    }

    public getServers(): Observable<any> {
        return this.dataService.get('/api/MailAccounts') as Observable<Array<MailServerModel>>;
    }

    public refreshServers() {
        this.dataService.get('/api/MailAccounts').subscribe(servers => {
                this.servers = servers as Array<MailServerModel>;
                if (this.servers.length > 0) {
                    this.currentMailbox = this.servers[0];
                }
            });
    }

    public setServers(toSend: MailServerModel): Observable<Array<MailServerModel>> {

        return this.dataService.post('/api/MailAccounts', toSend) as Observable<Array<MailServerModel>>;
    }
    public deleteServer(mailAddress: String): Observable<Array<MailServerModel>> {
        return this.dataService.delete('/api/MailAccounts/' + mailAddress) as Observable<Array<MailServerModel>>;
    }

}
