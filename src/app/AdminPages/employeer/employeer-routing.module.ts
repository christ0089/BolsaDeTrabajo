import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerInfoFormComponent } from 'src/app/EmployeerComponents/employer-info-form/employer-info-form.component';
import { JobPositionFormComponent } from 'src/app/EmployeerComponents/job-position-form/job-position-form.component';
import { EmployeeListingComponent } from '../employee-listing/employee-listing.component';
import { EmployeeApplicationsComponent } from '../employee-applications/employee-applications.component';
import { EmployeerComponent } from './employeer.component';
import { ReportedApplicationsComponent } from 'src/app/OperationsPages/reported-applications/reported-applications.component';
import { UserRolesComponent } from 'src/app/OperationsPages/user-roles/user-roles.component';
import { AdminGuard } from 'src/app/Guards/admin.guard';
import { DiscoverComponent } from '../discover/discover.component';

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
        path: "applicants/:id",
        component: EmployeeListingComponent,
      },
      {
        path: "discover",
        component: DiscoverComponent,
      },
      {
        path: "job_applications",
        component: EmployeeApplicationsComponent,
      },
      {
        path: "job_applications/:id",
        component: EmployeeApplicationsComponent,
      },
      {
        path: "reports",
        canActivate: [AdminGuard],
        component: ReportedApplicationsComponent
      }, 
      {
        path: "admin_users",
        canActivate: [AdminGuard],
        component:  UserRolesComponent
      }, 
      {
        path: "admin_company",
        canActivate: [AdminGuard],
        loadChildren: () =>
        import('../../OperationsPages/employeer-list/employeer-list.module').then(
          (m) => m.EmployeerListModule
        ),
      }, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeerRoutingModule { }
