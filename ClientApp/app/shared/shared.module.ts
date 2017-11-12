import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { PageHeadingComponent } from './directives/page-heading.directive';
import { DynamicFormComponent } from './forms/dynamic-form.component';
import { DynamicFormControlComponent } from './forms/dynamic-form-control.component';
import { ErrorMessageComponent } from './forms/error-message.component';
import { ErrorSummaryComponent } from './forms/error-summary.component';
import { FormControlService } from './forms/form-control.service';


import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';

import { UppercasePipe } from './pipes/uppercase.pipe';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { addImap } from '../modal/addImap.component';

import { AddImapService } from "../modal/addImap.service";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    NgbModule.forRoot(),
    // No need to export as these modules don't expose any components/directive etc'
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    DynamicFormComponent,
    DynamicFormControlComponent,
    ErrorMessageComponent,
    ErrorSummaryComponent,
    FooterComponent,
    HeaderComponent,
    PageHeadingComponent,
    UppercasePipe,
    addImap
  ],
  entryComponents: [
      addImap
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // NgbModule,
    TranslateModule,
    // Providers, Components, directive, pipes
    DynamicFormComponent,
    DynamicFormControlComponent,
    ErrorSummaryComponent,
    ErrorMessageComponent,
    FooterComponent,
    HeaderComponent,
    PageHeadingComponent,
    UppercasePipe
  ],
  providers: [AddImapService]

})
export class SharedModule {


    constructor(private translate: TranslateService) {
        translate.addLangs(["pl", "en"]);
        translate.setDefaultLang('en');

        let browserLang = translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|pl/) ? browserLang : 'en');
    }

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        FormControlService
      ]
    };
  }
}
