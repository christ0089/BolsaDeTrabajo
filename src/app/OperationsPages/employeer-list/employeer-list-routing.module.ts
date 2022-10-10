import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeerListComponent } from './employeer-list.component';

const routes: Routes = [{
  path: "",
  component: EmployeerListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeerListRoutingModule { }
