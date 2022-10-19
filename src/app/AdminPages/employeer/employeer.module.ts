import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { EmployeerRoutingModule } from './employeer-routing.module';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeerComponent } from './employeer.component';
import { EmployeeListingComponent } from '../employee-listing/employee-listing.component';
import { EmployeeApplicationsComponent } from '../employee-applications/employee-applications.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from 'src/app/CommonComponents/components.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { MatButtonModule } from '@angular/material/button';
import { EmployeerService } from 'src/app/Shared/employeer.service';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { UserRolesComponent } from 'src/app/OperationsPages/user-roles/user-roles.component';
import { ReportedApplicationsComponent } from 'src/app/OperationsPages/reported-applications/reported-applications.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PipesModule } from 'src/app/Pipes/pipes.module';

@NgModule({
  declarations: [
    EmployeeListingComponent,
    EmployeeApplicationsComponent,
    EmployeerComponent,
    UserRolesComponent,
    ReportedApplicationsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentModule,
    NzPageHeaderModule,
    NzGridModule,
    MatInputModule,
    NzLayoutModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatTabsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    NzStepsModule,
    MatDialogModule,
    EmployeerRoutingModule,
    PipesModule
  ],
  providers: [EmployeerService, CurrencyPipe],
})
export class EmployeerModule {}
