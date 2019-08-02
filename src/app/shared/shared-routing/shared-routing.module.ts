import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from "./../../shared/admin/admin.component";
import { CleanDrainComponent } from './../../shared/drains/clean-drain/clean-drain.component';
import { DashboardComponent } from './../../shared/dashboard/dashboard.component';
import { DirtyDrainComponent } from './../../shared/drains/dirty-drain/dirty-drain.component';
import { DrainListComponent } from './../../shared/drains/all-drains/all-drains.component';
import { FilterDrainsComponent } from './../../shared/drains/filter-drains/filter-drains.component';
import { HelpDrainComponent } from './../../shared/drains/help-drain/help-drain.component';
import { NotFoundComponent } from './../../shared/not-found/not-found.component';
import { NotifyComponent } from './../../shared/notify/notify.component';
import { RanksComponent } from './../../shared/ranks/ranks.component';
import { ReportComponent } from './../../shared/reports/general/reports.component';
import { StreetReportComponent } from './../../shared/reports/street-report/street-report.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponent } from "./../../shared/shared.component";
import { UnknownDrainsComponent } from './../../shared/drains/unknown-drains/unknown-drains.component';
import { UsersComponent } from "./../../shared/users/users/users.component";
import { UsersListComponent } from './../../shared/users/users-list/users-list.component';
import { UserDetailComponent } from './../../shared/users/user-detail/user-detail.component';
import { VerifyLeaderComponent } from "./../../shared/verify-leader/verify-leader.component";

import { AuthGuard } from "./../../core/auth.guard";
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'dashboard',
        component: SharedComponent,
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: DashboardComponent },
          { path: 'admin', component: AdminComponent, canActivate:[AuthGuard]  },
          { path: 'clean-drains', component: CleanDrainComponent },
          { path: 'dirty-drains', component: DirtyDrainComponent },
          { path: 'drain-list', component: DrainListComponent },
          { path: 'filter-drains', component: FilterDrainsComponent }, 
          { path: 'help-drains', component: HelpDrainComponent },
          { path: 'notify-citizens', component: NotifyComponent },
          { path: 'ranks', component: RanksComponent },  
          { path: 'reports', component: ReportComponent },
          { path: 'reports/street-report/:id', component: StreetReportComponent },
          { path: 'unknown-drains', component: UnknownDrainsComponent },
          { path: 'user-details/:id', component: UserDetailComponent },
          { path: 'users', component: UsersComponent },
          { path: 'users-list', component: UsersListComponent },
          { path: 'verify', component: VerifyLeaderComponent }, 
          { path: '*', component: NotFoundComponent },
        ] ,    
      }, 
    ]),

  ],
  exports: [
    RouterModule
  ]
})
export class SharedRoutingModule { }
