import { Component } from '@angular/core';
import { mailAccountsService } from "../../mailAccounts/mailAccounts.service";

@Component({
  selector: 'appc-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent {

    constructor(private mailAccountsService: mailAccountsService) {
    }


    public ngOnInit() {
        this.mailAccountsService.getServers();
    }

    deleteServer(server: any) {
        console.log(server);
        this.mailAccountsService.deleteServer(server.mailAddress).subscribe(response => {
            console.log("Response: " + response);
            this.mailAccountsService.getServers();
        });
    }
}
