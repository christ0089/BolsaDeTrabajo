import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInfoRoutingModule } from './user-info-routing.module';
import { MatListModule } from '@angular/material/list';
import { UserInfoComponent } from './user-info.component';
import { ComponentModule } from 'src/app/CommonComponents/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [UserInfoComponent],
  imports: [
    CommonModule,
    UserInfoRoutingModule,
    ComponentModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatListModule
  ],
})
export class UserInfoModule {}
