import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginModel } from '../../core/models/login-model';
// import { ControlBase } from '../../shared/forms/control-base';
// import { ControlTextbox } from '../../shared/forms/control-textbox';
import { UtilityService } from '../../core/services/utility.service';
import { AccountService } from '../../core/services/account.service';
import { FormGroup, Validators, FormControl} from "@angular/forms";

@Component({
    selector: 'appc-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    public errors: string[] = [];
    public controls: any;
    public loginForm: FormGroup;

    constructor(
        public accountService: AccountService,
        public router: Router,
        public utilityService: UtilityService
    ){}

    loginModel: LoginModel = new LoginModel();

    public login() {
        if (this.password && this.username) {
            this.loginModel.password = this.password.value;
            this.loginModel.username = this.username.value;

            console.log(this.loginModel);
            this.errors = [];
            this.accountService.login(this.loginModel)
                .subscribe(() => {
                    this.utilityService.navigate('loggeduser/mails');
                },
                (errors: any) => {
                    let error = JSON.parse(errors.error);
                    this.errors.push(error['error_description']);
                });
        }      
    };

    public ngOnInit() {      
        this.loginForm = new FormGroup({
            'username': new FormControl("", [
                Validators.required,
            ]),
            'password': new FormControl("", [
                Validators.required
            ])
        });
    }
    get username() { return this.loginForm.get('username'); }
    get password() { return this.loginForm.get('password'); }
}
