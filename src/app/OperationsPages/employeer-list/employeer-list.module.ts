import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeerListRoutingModule } from './employeer-list-routing.module';
import { EmployeerListComponent } from './employeer-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    EmployeerListComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatChipsModule,
    MatListModule,
    MatButtonModule,
    EmployeerListRoutingModule
  ]
})
export class EmployeerListModule { }
