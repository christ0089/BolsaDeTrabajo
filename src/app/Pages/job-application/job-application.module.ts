import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobApplicationRoutingModule } from './job-application-routing.module';
import { JobApplicationComponent } from './job-application.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from 'src/app/CommonComponents/components.module';
import { QuestionControlService } from 'src/app/Shared/QuestionsService/question-control-service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButton, MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [JobApplicationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ComponentModule,
    MatButtonModule,
    MatProgressBarModule,
    JobApplicationRoutingModule,
  ],
  providers: [QuestionControlService],
})
export class JobApplicationModule {}
