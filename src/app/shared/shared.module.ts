import { DataService } from './../core/data.service';

import { CleanDrainComponent } from './drains/clean-drain/clean-drain.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DirtyDrainComponent } from './drains/dirty-drain/dirty-drain.component';
import { DrainListComponent } from './drains/all-drains/all-drains.component';
import { FilterDrainsComponent } from './drains/filter-drains/filter-drains.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HelpDrainComponent } from './drains/help-drain/help-drain.component';
import { LeftSideComponent } from './left-side/left-side.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotificationBarComponent } from "./notification-bar/notification-bar.component";
import { RanksComponent } from './ranks/ranks.component';
import { ReportComponent } from './reports/general/reports.component';
import { SharedComponent } from "./shared.component";
import { UnknownDrainsComponent } from './drains/unknown-drains/unknown-drains.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserSearchComponent } from './users/user-search/user-search.component';
import { UsersComponent } from './users/users/users.component';

import { Directive } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SharedRoutingModule } from './../shared/shared-routing/shared-routing.module';

import { AdminRoutingModule } from './admin/admin-routing/admin-routing.module';
import { CleanDrainModule } from './drains/clean-drain/clean-drain.module';
import { DirtyDrainModule } from './../shared/drains/dirty-drain/dirty-drain.module';
import { HelpDrainModule } from './../shared/drains/help-drain/help-drain.module';
import { DrainListModule } from './../shared/drains/all-drains/all-drains.module';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ReportModule } from './../shared/reports/general/reports.module';
import { FilterDrainsModule } from './../shared/drains/filter-drains/filter-drains.module';

import { NotificationBarModule } from "./notification-bar/notification-bar.module";

import { DrainsService } from './../core/drains.service';
import { HeaderModule } from "./header/header.module";
import { PagerService } from './../core/paging.service';
import { StreetService } from "./../core/streets.service";
import { TranslateService } from "../translate/translate.service";
import { TranslateModule } from "../translate/translate.module";
import { TranslatePipe } from "../translate/translate.pipe";
import { TRANSLATION_PROVIDERS } from "../translate/translation/translation.component";
import { UserService } from './../core/user.service';
import { DatePipe } from '@angular/common';

import { StreetVEOPipe, UserStreetPipe } from "./../core/user.pipe";
import { NotifyComponent } from './notify/notify.component';
import { RegisterComponent } from './register/register.component';
import { VerifyLeaderComponent } from './verify-leader/verify-leader.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { StreetReportComponent } from './reports//street-report/street-report.component';
import { RegionalFiltersComponent } from './regional-filters/regional-filters.component';
import { StatusFiltersComponent } from './status-filters/status-filters.component';
import { NeedHelpGraphComponent } from './need-help-graph/need-help-graph.component';
import { TimeFilterComponent } from './time-filter/time-filter.component';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { YearPickerComponent } from './year-picker/year-picker.component';
import { DrainsSearchComponent } from './drains/drains-search/drains-search.component';
import { NeedhelpSearchComponent } from './needhelp-search/needhelp-search.component';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { UrlService} from '../core/url.service'

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    Ng2GoogleChartsModule,
    DrainListModule,
    DirtyDrainModule,
    CleanDrainModule,
    HelpDrainModule,
    ReportModule,
  //UserDetailModule,
    ReactiveFormsModule,
    FormsModule,
    NotificationBarModule,
    HeaderModule,
    TranslateModule,
    SharedRoutingModule,
    NguiAutoCompleteModule,
  ],
  declarations: [
    CleanDrainComponent,
    DashboardComponent,
    DirtyDrainComponent,
    DrainListComponent,
    FilterDrainsComponent,
    FooterComponent,
    HeaderComponent,
    HelpDrainComponent,
    LeftSideComponent,
    LoginComponent,
    MonthPickerComponent,
    NeedHelpGraphComponent,
    NotFoundComponent,
    NotificationBarComponent,
    NotifyComponent,
    RanksComponent,
    RegionalFiltersComponent,
    RegisterComponent,
    ReportComponent,
    SharedComponent,
    StatusFiltersComponent,
    StreetReportComponent,
    TranslatePipe,
    TimeFilterComponent,
    UnknownDrainsComponent,
    UsersComponent,
    UserDetailComponent,
    UserSearchComponent,
    UsersListComponent,
    VerifyLeaderComponent,
    YearPickerComponent,
    DrainsSearchComponent,
    NeedhelpSearchComponent,
  ],
  exports: [SharedComponent],
  providers: [
    DrainsService,
    PagerService,
    ReactiveFormsModule,
    StreetService,
    TRANSLATION_PROVIDERS,
    TranslateService,
    UserService,
    DatePipe,
    UrlService,
    DataService
  ],
})


export class SharedModule { }
