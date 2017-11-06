import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { routing } from './home.routes';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [routing, SharedModule],
    declarations: [HomeComponent]
})
export class HomeModule { }
