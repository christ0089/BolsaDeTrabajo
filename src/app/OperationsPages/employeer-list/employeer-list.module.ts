import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeerListRoutingModule } from './employeer-list-routing.module';
import { EmployeerListComponent } from './employeer-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    EmployeerListComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    EmployeerListRoutingModule
  ]
})
export class EmployeerListModule { }
