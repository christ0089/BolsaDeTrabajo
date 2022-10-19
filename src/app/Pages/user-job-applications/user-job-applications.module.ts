import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserJobApplicationsRoutingModule } from './user-job-applications-routing.module';
import { UserJobApplicationsComponent } from './user-job-applications.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { PipesModule } from 'src/app/Pipes/pipes.module';


@NgModule({
  declarations: [
    UserJobApplicationsComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    PipesModule,
    UserJobApplicationsRoutingModule
  ]
})
export class UserJobApplicationsModule { }
