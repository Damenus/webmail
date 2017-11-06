import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { RegisterModel } from '../../../core/models/register-model';
import { ControlBase } from '../../../shared/forms/control-base';
import { ControlTextbox } from '../../../shared/forms/control-textbox';
import { AccountService } from '../../../core/services/account.service';
import { TranslateService } from '@ngx-translate/core'

@Component({
    selector: 'appc-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    public errors: string[] = [];
    public controls: Array<ControlBase<any>>;
    public register_button_translation: string;

    constructor(public accountService: AccountService, public router: Router, public route: ActivatedRoute, private translate: TranslateService) { }

    public register(model: RegisterModel): void {
        this.accountService.register(model)
            .subscribe((res: Response) => {
                this.router.navigate(['../registerconfirmation'], { relativeTo: this.route, queryParams: { emailConfirmed: true } });
            },
            (errors: string[]) => {
                this.errors = errors;
            });
    };

    public ngOnInit() {

        //Get the translated strings
        let register_translation: any;
        this.translate.get('REGISTER_FORM').subscribe(result => {
            register_translation = result;
        });
                
        this.register_button_translation = register_translation.Register;
        
        const controls: Array<ControlBase<any>> = [
            new ControlTextbox({
                key: 'username',
                label: register_translation.Username,
                placeholder: register_translation.Username,
                value: '',
                type: 'textbox',
                required: true,
                order: 1
            }),
            new ControlTextbox({
                key: 'firstname',
                label: register_translation.Firstname,
                placeholder: register_translation.Firstname,
                value: '',
                type: 'textbox',
                required: true,
                order: 2
            }),
            new ControlTextbox({
                key: 'lastname',
                label: register_translation.Lastname,
                placeholder: register_translation.Lastname,
                value: '',
                type: 'textbox',
                required: true,
                order: 3
            }),
            new ControlTextbox({
                key: 'email',
                label: register_translation.Email,
                placeholder: register_translation.Email,
                value: '',
                type: 'email',
                required: true,
                order: 4
            }),
            new ControlTextbox({
                key: 'password',
                label: register_translation.Password,
                placeholder: register_translation.Password,
                value: '',
                type: 'password',
                required: true,
                order: 5
            })
        ];

        this.controls = controls;
    }

}
