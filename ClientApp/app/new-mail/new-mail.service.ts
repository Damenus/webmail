import { Injectable } from '@angular/core';
import { Mail } from '../core/models/mail';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../core/services/data.service';

@Injectable()
export class NewMailService {

  constructor(private dataService: DataService) { }

  sendMail(mail: Mail): Observable<any> {
      return this.dataService.post('/api/Mail/SendMail', {
          receiver: mail.to,
          subject: mail.title,
          body: mail.body,
          attachment: mail.attachment,
          attachmentName: mail.attachmentName
    });
  }

  saveDraft(mail: Mail): Observable<any> {
      return this.dataService.post('/api/Mail/SaveDraft', {
          receiver: mail.to,
          subject: mail.title,
          body: mail.body,
          attachment: mail.attachment,
          attachmentName: mail.attachmentName
      });
  }

  getDraft( id: number): Observable<Array<any>> {
      return this.dataService.get('api/Mail/Drafts?messageID=' + id) as Observable<Array<any>>;
  }

}
