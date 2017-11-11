import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewMailComponent } from './new-mail.component';

const routes: Routes = [
  { path: 'newmail', component: NewMailComponent, data: { state: 'newmail' } }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewMailRoutingModule { }
