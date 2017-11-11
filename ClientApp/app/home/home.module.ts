import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { routing } from './home.routes';
import { SharedModule } from '../shared/shared.module';

import { NgbdModalCustomclass } from '../modal/addImap.component';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [HomeComponent, NgbdModalCustomclass]
})
export class HomeModule { }
