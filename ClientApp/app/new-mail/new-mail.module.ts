import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NewMailRoutingModule } from './new-mail-routing.module';
import { NewMailComponent } from './new-mail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NewMailRoutingModule,
    FormsModule
  ],
  declarations: [NewMailComponent]
})
export class NewMailModule { }
