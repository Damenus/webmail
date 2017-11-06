import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import { routerTransition } from './router.animations';
import { ExternalLoginStatus } from './app.models';

@Component({
  selector: 'appc-root',
  animations: [routerTransition],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    public titleService: Title,
    private router: Router,
    private route: ActivatedRoute) {
      translate.addLangs(["pl", "en"]);
      translate.setDefaultLang('en');

      let browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|pl/) ? browserLang : 'en');
  }

  public ngOnInit() {
    this.translate.onLangChange.subscribe((lan: string) => {
      this.translate.get('Title')
        .subscribe((title: string) => this.setTitle(title));
    });

    this.route.queryParams.subscribe((params: Params) => {
      const param = params['externalLoginStatus'];
      if (param) {
        const status = <ExternalLoginStatus>+param;
        switch (status) {
          case ExternalLoginStatus.CreateAccount:
            this.router.navigate(['createaccount']);
            break;

          default:
            break;
        }
      }
    });
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }

}
