import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginModel } from '../../core/models/login-model';
// import { ControlBase } from '../../shared/forms/control-base';
// import { ControlTextbox } from '../../shared/forms/control-textbox';
import { UtilityService } from '../../core/services/utility.service';
import { AccountService } from '../../core/services/account.service';

@Component({
    selector: 'appc-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    public errors: string[] = [];
    public controls: any;
    public login_button_translation: string;

    constructor(
        public accountService: AccountService,
        public router: Router,
        public utilityService: UtilityService
    ) {
    console.log(this.loginModel);
  }

    loginModel: LoginModel = new LoginModel();

    public login() {
        console.log(this.loginModel);
        this.errors = [];
        this.accountService.login(this.loginModel)
            .subscribe(() => {
                this.utilityService.navigate('loggeduser/mails');
            },
            (errors: any) => {
              console.log("error");
              console.log(errors);
                this.errors.push(errors['error_description']);
            });
    };

    public ngOnInit() {      

    }
}
