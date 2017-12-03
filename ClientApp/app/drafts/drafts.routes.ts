import { Routes, RouterModule } from '@angular/router';

import { DraftsComponent } from './drafts.component';

const routes: Routes = [
    { path: 'drafts', component: DraftsComponent, data: { state: 'drafts' } }
];

export const routing = RouterModule.forChild(routes);
