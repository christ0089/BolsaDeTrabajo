import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserJobApplicationsComponent } from './user-job-applications.component';

const routes: Routes = [
  {
    path: '',
    component: UserJobApplicationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserJobApplicationsRoutingModule {}
