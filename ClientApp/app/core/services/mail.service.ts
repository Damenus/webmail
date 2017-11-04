import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Mail } from '../models/mail';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MailService {
    constructor(private http: HttpClient) { }

    public getMails(): Observable<Array<Mail>> {
        return this.http.get('api/mail') as Observable<Array<Mail>>;
    }
}
