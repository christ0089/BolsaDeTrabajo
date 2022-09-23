import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerInfoFormComponent } from 'src/app/EmployeerComponents/employer-info-form/employer-info-form.component';
import { JobPositionFormComponent } from 'src/app/EmployeerComponents/job-position-form/job-position-form.component';
import { EmployeeListingComponent } from '../employee-listing/employee-listing.component';
import { EmployeeApplicationsComponent } from '../employee-applications/employee-applications.component';
import { EmployeerComponent } from './employeer.component';

const routes: Routes = [
  {
    path: "",
    component: EmployeerComponent,
    children: [
      {
        path: "company",
        component: EmployerInfoFormComponent,
      },
      {
        path: "applicants",
        component: EmployeeListingComponent,
      },
      {
        path: "job_applications",
        component: EmployeeApplicationsComponent,
      },
      {
        path: "job_applications/:id",
        component: JobPositionFormComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeerRoutingModule { }
