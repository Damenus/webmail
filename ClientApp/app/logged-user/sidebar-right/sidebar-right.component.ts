import { Component } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { mailAccounts } from '../../mailAccounts/mailAccounts.component';

@Component({
  selector: 'appc-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.scss']
})
export class SidebarRightComponent {

    constructor(private modalService: NgbModal) { }

    public open() {
        this.modalService.open(mailAccounts);
    }

}
