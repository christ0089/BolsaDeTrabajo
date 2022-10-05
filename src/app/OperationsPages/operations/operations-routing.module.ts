import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportedApplicationsComponent } from '../reported-applications/reported-applications.component';
import { UserRolesComponent } from '../user-roles/user-roles.component';
import { OperationsComponent } from './operations.component';

const routes: Routes = [
  {
    path: '',
    component: OperationsComponent,
    children: [
      // {
      //   path: "company",
      //   component:  
      // }, 
      {
        path: "reported_applications",
        component: ReportedApplicationsComponent
      }, 
      {
        path: "job_applications",
        component:  UserRolesComponent
      }, 
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationsRoutingModule {}
