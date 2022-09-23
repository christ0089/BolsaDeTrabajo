import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeerRoutingModule } from './employeer-routing.module';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { EmployeerComponent } from './employeer.component';
import { EmployeeListingComponent } from '../employee-listing/employee-listing.component';
import { EmployeeApplicationsComponent } from '../employee-applications/employee-applications.component';
import { EmployerInfoFormComponent } from 'src/app/EmployeerComponents/employer-info-form/employer-info-form.component';
import { JobPositionFormComponent } from 'src/app/EmployeerComponents/job-position-form/job-position-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from 'src/app/CommonComponents/components.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { MatButtonModule } from '@angular/material/button';
import { EmployeerService } from 'src/app/Shared/employeer.service';

@NgModule({
  declarations: [
    EmployeerComponent,
    EmployeeListingComponent,
    EmployeeApplicationsComponent,
    EmployerInfoFormComponent,
    JobPositionFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentModule,
    NzPageHeaderModule,
    NzGridModule,
    NzLayoutModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    EmployeerRoutingModule,
  ],
  providers: [
    EmployeerService
  ]
})
export class EmployeerModule {}
