import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeerRegistrationComponent } from './employeer-registration.component';

const routes: Routes = [
  { path: '', component: EmployeerRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeerRegistrationRoutingModule {}
