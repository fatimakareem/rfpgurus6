import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxCarouselModule } from 'ngx-carousel';
import { LoaderComponent } from './loader/loader.component';
import { ProgressHttpModule } from "angular-progress-http";
import { UsMapModule } from 'angular-us-map';
// import { InputModule } from 'voice-to-text';
// import { Nl2BrPipeModule } from 'nl2br-pipe';
// import { Ng2SmartTableModule } from 'ngx-smart-table';
/////////////////////////////////Service/////////////////////////////
import { UnsubscribeService } from './unsubscribe/unsubscribe.service';
import { RfpService } from './rfps/single-rfp/rfp.service';
import { LoginService } from './login/login.service';
// import { PricingService } from './pricing/pricing.service';
import { RegisterService } from './registered/register.service';
// import { ForgetPasswordService } from './admin/forget-password/forget-password.service';
// import { ChangedPasswordService } from './admin/changed-password/changed-password.service';
import { SidebarService } from './user-sidebar/sidebar.service';
// import { CategoryService } from './categories/category.service';
// import {AllAgenciesService} from './all/all-agencies/all-agencies.service';
import { StateService } from './rfps/state-rfp/state.service';
import { CategoryRfpService } from './rfps/category-rfp/category-rfp.service';
// import { AllCategoryService } from './all/all-category/all-category.service';
// import { AllStateService } from './all/all-state/all-state.service';
// import { ProfileService } from './admin/profile/profile.service';
import { HeaderService } from './header/header.service';
import { HomeService } from './home/home.service';
import { AdvanceService } from './advance-search/advance.service';
import { BlogService } from './blog/blog.service'
// import { ContactUsService } from './contact-us/contact-us.service';
import { FooterService } from './footer/footer.service';
import { PaymentmethodsService } from './admin/paymentmethods/paymentmethods.service';
// import { DateFormat } from './advance-search/date-format';
// import { UnsubscribeService } from './unsubscribe/unsubscribe.service';
import { SpeechRecognitionService } from './header/speechservice';

/////////////////////////////////End////////////////////////////////
///////////////////for loader//////////////////////////////
import { PreloaderFull } from './component/preloader-full/preloader-full';
import { PreloaderSmall } from './component/preloader-small/preloader-small';
import { BaseRequestOptions } from '@angular/http';
import { PreloaderService } from './serv/preloader-service';
import { XHRBackend, RequestOptions } from '@angular/http';
import { HttpService } from './serv/http-service';
// import { MainService } from './serv/main.service'
// import {AlertService} from './serv/alert.service';
//////////////////////////////////////////////////////////End//////////////////////////////////////////////
import 'hammerjs';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    DateAdapter,

} from '@angular/material';

import { AppComponent } from './app.component';
// import { PaymentmethodsComponent } from './admin/paymentmethods/paymentmethods.component';
import { AllnotificationComponent } from './allnotification/allnotification.component';
import { AppRoutes } from './app.routing';
// import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SingleRfpComponent } from './rfps/single-rfp/single-rfp.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
// import { PricingComponent } from './pricing/pricing.component';
import { TextMaskModule } from 'angular2-text-mask';
import { RfpComponent } from './rfps/rfp/rfp.component';
import { RegisteredComponent } from './registered/registered.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { LoginComponent } from './login/login.component';
// import { ForgetPasswordComponent } from './admin/forget-password/forget-password.component';
// import { StateRfpComponent } from './rfps/state-rfp/state-rfp.component';
// import { CategoryRfpComponent } from './rfps/category-rfp/category-rfp.component';
// import { AllCategoryComponent } from './all/all-category/all-category.component';
// import { AllStateComponent } from './all/all-state/all-state.component';
import { DialogOverviewExample } from './residential/residential.component';
// import { ProfileComponent } from './admin/profile/profile.component';
import { AuthGuard } from './_guards/auth.guard';
// import { ContactUsComponent } from './contact-us/contact-us.component';
import { AgmCoreModule } from '@agm/core';
import { FooterComponent } from './footer/footer.component';
// import { ChangedPasswordComponent } from './admin/changed-password/changed-password.component';
// import { AdvanceSearchComponent } from './advance-search/advance-search.component';
// import { RfpAsServiceComponent } from './rfp-as-service/rfp-as-service.component';
// import { BlogComponent } from './blog/blog.component';
// import { SingleblogComponent } from './singleblog/singleblog.component';
import { RecaptchaModule } from 'ng-recaptcha';
// import { PartnershipComponent } from './partnership/partnership.component';
// import { HistoryComponent } from './admin/history/history.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedData } from './shared-service'
import { DatePipe } from '@angular/common';
import { BlackgeeksRecaptchaModule } from './recaptcha/recaptcha.module';
import { RecaptchaComponent } from './recaptcha/recaptcha.component';
import { ResultsComponent } from './results/results.component';
import { ResultsService } from './results/results.service';
// import {PagerService} from './rfps/rfp/paginator.service';
// import {AllAgenciesComponent} from './all/all-agencies/all-agencies.component';
// import {AgencyRfpComponent} from './rfps/agency-rfp/agency-rfp.component';
import { AgencyService } from './rfps/agency-rfp/agency.service';
// import {BaseComponent} from './base/base.component';
// import {AllRfpsComponent} from './all/all-rfps/all-rfps.component';
// import {AllRfpsService} from './all/all-rfps/all-rfps.service';
import { AdminLayoutComponent } from './layouts/lyout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AdminComponent } from './layouts/superadmin/admin-layout.component'
import { SidebarComponent } from './sidebar/sidebar.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

////////////////////////for loader/////////////////////////
export function httpServiceFactory(backend: XHRBackend, defaultOptions: RequestOptions, preloaderService: PreloaderService) {
    return new HttpService(backend, defaultOptions, preloaderService);
}
////////////////////////end///////////////////////
//////////////////////////// Live Chat ////////////////////////////
// import { LivechatWidgetModule } from '@livechat/angular-widget';

/////////////////////////// End //////////////////////////////////
/////////////////////////Social login//////////////////////////////
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
// import { partnershipservice } from './partnership/partnership.service';
// import { SlickModule } from 'ngx-slick';
let config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("210115018603-187b6essbhk7booo33ab36d1u8cn3jpp.apps.googleusercontent.com")
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("692540294438102")
    }
]);
export function provideConfig() {
    return config;
}

///////////////////////// END ////////////////////////////////////

@NgModule({
    exports: [

        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatStepperModule,
        BlackgeeksRecaptchaModule
    ],
    declarations: [],

})
export class MaterialModule { }
@NgModule({
    imports: [
        // Nl2BrPipeModule,
        // Ng2SmartTableModule,
        CommonModule,
        UsMapModule,
        BrowserAnimationsModule,
        FormsModule,
        TextMaskModule,
        RouterModule.forRoot(AppRoutes),
        HttpModule,
        MaterialModule,
        MatNativeDateModule,
        ProgressHttpModule,
        Ng2SearchPipeModule,
        NgxCarouselModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDPnJ0zatoiPOI1GOeeS7HCj7AxIW183tg'
        }),
        ReactiveFormsModule,
        RecaptchaModule.forRoot(),
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatStepperModule,
        SocialLoginModule,
    ],
    declarations: [
        AdminComponent,
        // UnsubscribeComponent,
        AllnotificationComponent,
        // PaymentmethodsComponent,
        SidebarComponent,
        AppComponent,
        AuthLayoutComponent,
        AdminLayoutComponent,
        HomeComponent,
        HeaderComponent,
        SingleRfpComponent,
        UserSidebarComponent,
        // PricingComponent,
        RfpComponent,
        PreloaderFull,
        PreloaderSmall,
        LoaderComponent,
        RegisteredComponent,
        AuthenticateComponent,
        LoginComponent,
        // ForgetPasswordComponent,
        RecaptchaComponent,
        // StateRfpComponent,
        // CategoryRfpComponent,
        // AllCategoryComponent,
        // AllStateComponent,
        DialogOverviewExample,
        // ProfileComponent,
        // AllRfpsComponent,
        FooterComponent,
        // ChangedPasswordComponent,
        // AdvanceSearchComponent,
        // BlogComponent,
        // BlogComponent,
        // SingleblogComponent,
        // PartnershipComponent,
        // BaseComponent,
        ResultsComponent,
        // HistoryComponent,
        // AllAgenciesComponent,
        // AgencyRfpComponent,
        WatchlistComponent
    ],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        },
        DatePipe,
        // MainService,
        // AllStateService,
        SharedData,
        AdvanceService,
        HomeService,
        HeaderService,
        // ChangedPasswordService,
        // AllCategoryService,
        CategoryRfpService,
        StateService,
        RfpService,
        SidebarService,
        LoginService,
        // PricingService,
        RegisterService,
        // AllRfpsService,
        // ForgetPasswordService,
        PreloaderService,
        // PagerService,
        AuthGuard,
        BaseRequestOptions,
        // ProfileService,
        // ContactUsService,
        FooterService,
        ResultsService,
        // AllAgenciesService,
        AgencyService,
        BlogService,
        // partnershipservice,
        SpeechRecognitionService,
        PaymentmethodsService, UnsubscribeService,
        {
            provide: HttpService,
            useFactory: httpServiceFactory,
            deps: [XHRBackend, RequestOptions, PreloaderService]
        },
    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule {
    constructor(private dateAdapter: DateAdapter<Date>) {
        dateAdapter.setLocale('en-us'); // DD/MM/YYYY
      }
    
}
