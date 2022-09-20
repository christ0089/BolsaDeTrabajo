import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobListingRoutingModule } from './job-listing-routing.module';
import { JobItemComponent } from 'src/app/CommonComponents/job-item/job-item.component';
import { JobListingComponent } from './job-listing.component';
import { ToolbarComponent } from 'src/app/CommonComponents/toolbar/toolbar.component';
import { NgZorroAntdModule } from 'src/app/ng-zorro.module';

import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { ComponentModule } from 'src/app/CommonComponents/components.module';

@NgModule({
  declarations: [JobItemComponent, JobListingComponent],
  imports: [
    CommonModule,
    JobListingRoutingModule,
    MatChipsModule,
    MatButtonModule,
    NgZorroAntdModule,
    ComponentModule
  ],
})
export class JobListingModule {}
