import { Component, OnInit } from '@angular/core';
import { NewMailService } from './new-mail.service';
import { Mail } from '../core/models/mail';

@Component({
  selector: 'appc-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.scss']
})
export class NewMailComponent implements OnInit {

  constructor(private newMailService: NewMailService) { }

  model = new Mail();

  ngOnInit() {
  }

  onSubmit() {
      console.log(this.model);
    this.newMailService.sendMail(this.model);
  }

}
