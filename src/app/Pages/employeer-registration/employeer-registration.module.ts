import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeerRegistrationRoutingModule } from './employeer-registration-routing.module';
import { EmployeerRegistrationComponent } from './employeer-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from 'src/app/CommonComponents/components.module';


@NgModule({
  declarations: [
    EmployeerRegistrationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EmployeerRegistrationRoutingModule,
    ComponentModule
  ]
})
export class EmployeerRegistrationModule { }
