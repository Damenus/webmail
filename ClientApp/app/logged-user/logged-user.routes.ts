import { Routes, RouterModule } from '@angular/router';

import { LoggedUserComponent } from './logged-user.component';
import {NewMailComponent} from '../new-mail/new-mail.component';
import {MailsComponent} from '../mails/mails.component';

const routes: Routes = [
    { path: 'loggeduser', component: LoggedUserComponent, children: [
      // { path: '', component: LoggedUserComponent},
      { path: '',redirectTo:'loggeduser', pathMatch: 'full'},
      { path: 'newmail', component: NewMailComponent},
      { path: 'mails', component: MailsComponent }
  ] }
];

export const routing = RouterModule.forChild(routes);
