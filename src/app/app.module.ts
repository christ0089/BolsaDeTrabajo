import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobListingComponent } from './Pages/job-listing/job-listing.component';
import { JobApplicationComponent } from './Pages/job-application/job-application.component';
import { JobStatusComponent } from './Pages/job-status/job-status.component';
import { JobFavoritesComponent } from './Pages/job-favorites/job-favorites.component';
import { EmpleeListingsComponent } from './AdminPages/emplee-listings/emplee-listings.component';
import { EmployeeListingComponent } from './AdminPages/employee-listing/employee-listing.component';
import { EmployerDescriptionComponent } from './AdminPages/employer-description/employer-description.component';
import { JobItemComponent } from './CommonComponents/job-item/job-item.component';
import { JobDescriptionComponent } from './CommonComponents/job-description/job-description.component';
import { UserToolbarComponent } from './CommonComponents/user-toolbar/user-toolbar.component';
import { AdminToolbarComponent } from './CommonComponents/admin-toolbar/admin-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    JobListingComponent,
    JobApplicationComponent,
    JobStatusComponent,
    JobFavoritesComponent,
    EmpleeListingsComponent,
    EmployeeListingComponent,
    EmployerDescriptionComponent,
    JobItemComponent,
    JobDescriptionComponent,
    UserToolbarComponent,
    AdminToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
