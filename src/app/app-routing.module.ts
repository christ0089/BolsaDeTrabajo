import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './Guards/admin.guard';
import { EmployerGuard } from './Guards/employer.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./Pages/job-listing/job-listing.module').then(
        (m) => m.JobListingModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./Pages/auth/auth.module').then(
        (m) => m.AuthModule
      ),
  },
  {
    path: 'user_applications',
    loadChildren: () =>
      import('./Pages/user-job-applications/user-job-applications.module').then(
        (m) => m.UserJobApplicationsModule
      ),
  },
  {
    path: "administration",
    canActivate: [AdminGuard],
    loadChildren: () =>
    import('./OperationsPages/operations/operations.module').then(
      (m) => m.OperationsModule
    ),
  },
  {
    path: 'user_info',
    loadChildren: () =>
      import('./Pages/user-info/user-info.module').then(
        (m) => m.UserInfoModule
      ),
  },
  {
    path: 'job_application/:id',
    loadChildren: () =>
      import('./Pages/job-application/job-application.module').then(
        (m) => m.JobApplicationModule
      ),
  },
  {
    path: 'employeer_registration',
    loadChildren: () =>
      import('./Pages/employeer-registration/employeer-registration.module').then(
        (m) => m.EmployeerRegistrationModule
      ),
  },
  {
    path: 'admin',
    canActivate: [EmployerGuard],
    loadChildren: () =>
      import('./AdminPages/employeer/employeer.module').then(
        (m) => m.EmployeerModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
