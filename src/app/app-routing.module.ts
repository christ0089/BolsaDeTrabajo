import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: 'job_application/:id',
    loadChildren: () =>
      import('./Pages/job-application/job-application.module').then(
        (m) => m.JobApplicationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
