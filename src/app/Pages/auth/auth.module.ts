import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { LoginComponent } from 'src/app/CommonComponents/login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from 'src/app/Shared/Auth/auth.service';
import { ComponentModule } from 'src/app/CommonComponents/components.module';
import { NgZorroAntdModule } from 'src/app/ng-zorro.module';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatGridListModule,
    MatSelectModule,
    NgZorroAntdModule,
    MatProgressBarModule,
    MatTabsModule,
    MatButtonModule,
    ComponentModule,
    MatInputModule,
    MatGridListModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AuthComponent, LoginComponent],
  providers: [AuthService],
})
export class AuthModule {}
