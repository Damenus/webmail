import { Routes, RouterModule } from '@angular/router';

import { MailsComponent } from './mails.component';

const routes: Routes = [
    { path: 'mails', component: MailsComponent, data: { state: 'mails' } }
];

export const routing = RouterModule.forChild(routes);
