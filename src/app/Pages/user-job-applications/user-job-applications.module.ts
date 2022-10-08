import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserJobApplicationsRoutingModule } from './user-job-applications-routing.module';
import { UserJobApplicationsComponent } from './user-job-applications.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    UserJobApplicationsComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    UserJobApplicationsRoutingModule
  ]
})
export class UserJobApplicationsModule { }
