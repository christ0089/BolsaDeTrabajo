import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitsPipe } from './benefits.pipe';
import { BonusPipe } from './bonus.pipe';
import { WorkHoursPipe } from './work-hours.pipe';
import { StatusPipe } from './status.pipe';



@NgModule({
  declarations: [
    BenefitsPipe,
    BonusPipe,
    WorkHoursPipe,
    StatusPipe
  ],
  imports: [
    CommonModule
  ], exports: [
    BenefitsPipe,
    BonusPipe,
    StatusPipe,
    WorkHoursPipe
  ]
})
export class PipesModule { }
