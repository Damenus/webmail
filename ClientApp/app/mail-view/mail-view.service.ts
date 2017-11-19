import { Injectable } from '@angular/core';
import { Mail } from "../core/models/mail";


@Injectable()
export class MailViewService {
    public currentMail: Mail;
}
