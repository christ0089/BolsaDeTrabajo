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

@NgModule({
  declarations: [JobListingComponent],
  imports: [
    CommonModule,
    JobListingRoutingModule,
    MatChipsModule,
    MatButtonModule,
    NgZorroAntdModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    ComponentModule
  ],
  providers: [CurrencyPipe]
})
export class JobListingModule {}
