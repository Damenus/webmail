import { Component, ViewEncapsulation } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-customclass',
    templateUrl: './addImap.html',
    encapsulation: ViewEncapsulation.None,
    styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;   
    }
  `]
})
export class NgbdModalCustomclass {
    closeResult: string;

    constructor(private modalService: NgbModal) { }

    open(content: any) {
        this.modalService.open(content, { windowClass: 'dark-modal' });
    }

}
