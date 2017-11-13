import { Component } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { addImap } from '../../modal/addImap.component';

@Component({
  selector: 'appc-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent {

    constructor(private modalService: NgbModal) { }
    public open() {
        this.modalService.open(addImap);
    }

}
