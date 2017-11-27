import { Component, OnInit } from '@angular/core';
import { NewMailService } from './new-mail.service';
import { Mail } from '../core/models/mail';

function getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

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

  onAttachmentChange(event: EventTarget) {
      console.log(event);
      let event1: MSInputMethodContext = <MSInputMethodContext>event;
      let target: HTMLInputElement = <HTMLInputElement>event1.target;
      if (target.files != null) {
          let files: FileList = target.files;
          let file = files.item(0);
          if (file != null) {
              getBase64(file).then(data => {
                  this.model.attachment = data.split(',')[1];
                  this.model.attachmentName = file.name;
              });
          }
      }
  }

  onSubmit() {
      console.log(this.model);
      this.newMailService.sendMail(this.model).subscribe(response => {
          console.log("Response: " + response);
      });;
  }

}
