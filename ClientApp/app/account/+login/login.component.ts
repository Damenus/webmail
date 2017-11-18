import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginModel } from '../../core/models/login-model';
import { ControlBase } from '../../shared/forms/control-base';
import { ControlTextbox } from '../../shared/forms/control-textbox';
import { UtilityService } from '../../core/services/utility.service';
import { AccountService } from '../../core/services/account.service';
import { TranslateService } from '@ngx-translate/core';

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
                this.utilityService.navigate('loggeduser/mails');
            },
            (errors: any) => {
                this.errors.push(errors['error_description']);
            });
    };

    public ngOnInit() {

        let translation: Array<string>;
        if (this.translate.getBrowserLang().match(/pl/)) {
            translation = ['Email', 'Hasło', 'Zaloguj'];
        } else {
            translation = ['Email', 'Password', 'Login'];
        }

        this.login_button_translation = translation[2];

        const controls: Array<ControlBase<any>> = [
            new ControlTextbox({
                key: 'username',
                label: translation[0],
                placeholder: translation[0],
                value: '',
                type: 'email',
                required: true,
                order: 1
            }),
            new ControlTextbox({
                key: 'password',
                label: translation[1],
                placeholder: translation[1],
                value: '',
                type: 'password',
                required: true,
                order: 2
            })
        ];

        this.controls = controls;

    }
}
