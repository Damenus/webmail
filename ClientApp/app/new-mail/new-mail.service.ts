import { Injectable } from '@angular/core';
import { Mail } from '../core/models/mail';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../core/services/data.service';

@Injectable()
export class NewMailService {

  constructor(private dataService: DataService) { }

  public sendMail(mail: Mail): Observable<any> {
    return this.dataService.post('');
  }

}
