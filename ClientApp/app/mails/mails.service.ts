import { Injectable } from '@angular/core';
import { DataService } from '../core/services/data.service';

import { Mail } from '../core/models/mail';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MailsService {
    constructor(public dataService: DataService) { }

    public getMails(): Observable<Array<Mail>> {
        return this.dataService.get('api/mail') as Observable<Array<Mail>>;
    }
}
