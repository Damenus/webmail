import { Injectable } from '@angular/core';
import { DataService } from '../core/services/data.service';

import { Mail } from '../core/models/mail';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DraftsService {
    private _listners = new Subject<any>();

    constructor(public dataService: DataService) { }

    listen(): Observable<any> {
       return this._listners.asObservable();
    }

    public getDrafts(): Observable<Array<Mail>> {
        return this.dataService.get('api/Mail/drafts') as Observable<Array<Mail>>;
    }

}
