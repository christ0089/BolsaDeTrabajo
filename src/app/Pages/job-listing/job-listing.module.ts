import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { JobListingRoutingModule } from './job-listing-routing.module';
import { JobItemComponent } from 'src/app/CommonComponents/job-item/job-item.component';
import { JobListingComponent } from './job-listing.component';
import { NgZorroAntdModule } from 'src/app/ng-zorro.module';

import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { ComponentModule } from 'src/app/CommonComponents/components.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PipesModule } from 'src/app/Pipes/pipes.module';
import { MobileJobDescriptionComponent } from './mobile-job-description/mobile-job-description.component';
import { MatTabsModule } from '@angular/material/tabs';
import { JobListingFilterComponent } from './job-listing-filter/job-listing-filter.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [JobListingComponent, MobileJobDescriptionComponent, JobListingFilterComponent],
  imports: [
    CommonModule,
    ComponentModule,
    JobListingRoutingModule,
    MatChipsModule,
    MatButtonModule,
    NgZorroAntdModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    PipesModule,
    MatIconModule,
    ComponentModule
  ],
  providers: [CurrencyPipe]
})
export class JobListingModule {}
