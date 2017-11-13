import { Component } from '@angular/core';
import { MailServerModel } from "../../core/models/mail-server-model";
import { AddImapService } from '../../modal/addImap.service';

@Component({
  selector: 'appc-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent {

    constructor (private addImapService: AddImapService) { }

    public myServers: Array<MailServerModel>;

    public ngOnInit() {
        this.addImapService.getServers().subscribe(servers => {
            this.myServers = servers;
        });
    }

    deleteServer(server: any) {
        console.log(server);
        this.addImapService.deleteServer(server.mailAddress).subscribe(response => {
            console.log("Response: " + response);
        });
    }
}
