import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobApplicationComponent } from './job-application.component';

const routes: Routes = [
  {
    path: '',
    component: JobApplicationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobApplicationRoutingModule { }
