import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { DraftsService } from './drafts.service';
import { DraftsComponent } from './drafts.component';
import { routing } from './drafts.routes';
import { CommonModule } from "@angular/common";
import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [routing, CommonModule, SharedModule, NgbModule],
    declarations: [DraftsComponent],
    providers: [DraftsService]
})
export class DraftsModule { }
