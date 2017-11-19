import { Routes, RouterModule } from '@angular/router';

import { LoggedUserComponent } from './logged-user.component';
import { NewMailComponent } from '../new-mail/new-mail.component';
import { MailsComponent } from '../mails/mails.component';
import { MailViewComponent } from '../mail-view/mail-view.component';

const routes: Routes = [
    { path: 'loggeduser', component: LoggedUserComponent, children: [
      { path: '',redirectTo:'loggeduser', pathMatch: 'full'},
      { path: 'newmail', component: NewMailComponent},
      { path: 'mails', component: MailsComponent },
      { path: 'mails/:id', component: MailViewComponent}
  ] }
];

export const routing = RouterModule.forChild(routes);
