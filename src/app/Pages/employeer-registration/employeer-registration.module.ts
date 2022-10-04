import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeerRegistrationRoutingModule } from './employeer-registration-routing.module';
import { EmployeerRegistrationComponent } from './employeer-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployerInfoFormComponent } from 'src/app/EmployeerComponents/employer-info-form/employer-info-form.component';
import { EmployeerComponentModule } from 'src/app/EmployeerComponents/employeer.components.module';


@NgModule({
  declarations: [
    EmployeerRegistrationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EmployeerRegistrationRoutingModule,
    EmployeerComponentModule
  ]
})
export class EmployeerRegistrationModule { }
