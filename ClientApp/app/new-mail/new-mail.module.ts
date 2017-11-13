import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NewMailRoutingModule } from './new-mail-routing.module';
import { NewMailComponent } from './new-mail.component';
import { NewMailService } from './new-mail.service'
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NewMailRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    NewMailComponent
  ],
  providers: [
    NewMailService
  ]
})
export class NewMailModule { }
