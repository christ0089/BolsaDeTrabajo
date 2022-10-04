import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsComponent } from './operations.component';
import { MatListModule } from '@angular/material/list';
import { UserRolesComponent } from '../user-roles/user-roles.component';
import { ReportedApplicationsComponent } from '../reported-applications/reported-applications.component';


@NgModule({
  declarations: [
    OperationsComponent,
    UserRolesComponent,
    ReportedApplicationsComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    OperationsRoutingModule
  ]
})
export class OperationsModule { }
