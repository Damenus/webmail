import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginModel } from '../../core/models/login-model';
import { ControlBase } from '../../shared/forms/control-base';
import { ControlTextbox } from '../../shared/forms/control-textbox';
import { UtilityService } from '../../core/services/utility.service';
import { AccountService } from '../../core/services/account.service';
import { TranslateService } from '@ngx-translate/core'

@Component({
    selector: 'appc-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    public loginModel: LoginModel;
    public errors: string[] = [];
    public controls: any;
    public login_button_translation: string;

    constructor(
        public accountService: AccountService,
        public router: Router,
        public utilityService: UtilityService,
        private translate: TranslateService
    ) { }

    public login(model: LoginModel): void {
        this.errors = [];
        this.accountService.login(model)
            .subscribe(() => {
                this.utilityService.navigate('');
            },
            (errors: any) => {
                this.errors.push(errors['error_description']);
            });
    };

    public ngOnInit() {

        //Get the translated strings
        let login_translation: any;
        this.translate.get('LOGIN_FORM').subscribe(result => {
            login_translation = result;
        });

        this.login_button_translation = login_translation.Login;


        const controls: Array<ControlBase<any>> = [
            new ControlTextbox({
                key: 'username',
                label: login_translation.Email,
                placeholder: login_translation.Email,
                value: '',
                type: 'email',
                required: true,
                order: 1
            }),
            new ControlTextbox({
                key: 'password',
                label: login_translation.Password,
                placeholder: login_translation.Password,
                value: '',
                type: 'password',
                required: true,
                order: 2
            })
        ];

        this.controls = controls;
    }
}
