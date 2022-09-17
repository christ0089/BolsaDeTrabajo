import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobListingComponent } from './Pages/job-listing/job-listing.component';
import { JobApplicationComponent } from './Pages/job-application/job-application.component';
import { JobStatusComponent } from './Pages/job-status/job-status.component';
import { JobFavoritesComponent } from './Pages/job-favorites/job-favorites.component';
import { EmployeeListingComponent } from './AdminPages/employee-listing/employee-listing.component';
import { EmployerDescriptionComponent } from './AdminPages/employer-description/employer-description.component';
import { JobItemComponent } from './CommonComponents/job-item/job-item.component';
import { JobDescriptionComponent } from './CommonComponents/job-description/job-description.component';
import { UserToolbarComponent } from './CommonComponents/user-toolbar/user-toolbar.component';
import { AdminToolbarComponent } from './CommonComponents/admin-toolbar/admin-toolbar.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './CommonComponents/toolbar/toolbar.component';

import { NgZorroAntdModule } from './ng-zorro.module';
import { ChipsComponent } from './CommonComponents/chips/chips.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    JobListingComponent,
    JobApplicationComponent,
    JobStatusComponent,
    JobFavoritesComponent,
    EmployeeListingComponent,
    EmployerDescriptionComponent,
    JobItemComponent,
    JobDescriptionComponent,
    UserToolbarComponent,
    AdminToolbarComponent,
    ChipsComponent
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule
  ],
  providers: [ScreenTrackingService, UserTrackingService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
