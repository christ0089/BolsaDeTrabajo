import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListingComponent } from './Pages/job-listing/job-listing.component';

const routes: Routes = [{ path: '', component: JobListingComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
